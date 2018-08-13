const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const URIGenerator = require('./routing/uriGenerator');

class App {
  constructor(router, repository, security) {
    this.router = router;
    this.repository = repository;
    this.security = security;
    this.port = config.get('api.port');
    this.host = config.get('api.host');
    this.express = express();
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.expressRouter = express.Router();
    this._registerRoute = this._registerRoute.bind(this);
    this._createRouteBoundAction = this._createRouteBoundAction.bind(this);
  }

  _registerRoute(uri, httpMethod, boundAction) {
    this.expressRouter.route(uri)[httpMethod](boundAction);
  }

  _createRouteBoundAction(controllerClass, method, isSecure) {
    const result = [
      (req, res) => {
        this._buildControllerInstance(controllerClass, req, res)[method]();
      }];

    if (isSecure) {
      result.unshift(
          this.security.authenticate(),
          this.security.authorise(controllerClass.name, method),
      );
    }

    return result;
  }

  _buildControllerInstance(ControllerClass, req, res) {
    return new ControllerClass(
        {
          params: req.params,
          query: req.query,
          body: req.body,
          user: req.user,
          uriGenerator: new URIGenerator(this.security, req.user.role),
          repository: this.repository,
          send: (statusCode, resource) => {
            res.status(statusCode).send(resource);
          },
        },
    );
  }

  run() {
    this.repository.registerRepositories();
    this.router.registerRoutes(this._registerRoute, this._createRouteBoundAction);
    this.expressRouter.use('/auth/token', this.security.issueToken());
    this.express.use('/api/v1', this.expressRouter);
    this.express.use((req, res) => {
      res.status(404).send({ url: `${req.originalUrl} not found` });
    });
    this.express.listen(this.port, this.host);
    console.log(`RESTful API server started on: ${this.port}`);
  }
}

module.exports = App;
