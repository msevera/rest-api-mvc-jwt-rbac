const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

class App {
  constructor(router, repository) {
    this.router = router;
    this.repository = repository;
    this.port = config.get('api.port');
    this.host = config.get('api.host');
    this.express = express();
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.expressRouter = express.Router();
    this._registerRoute = this._registerRoute.bind(this);
    this._buildControllerInstance = this._buildControllerInstance.bind(this);
  }

  _registerRoute(uri, httpMethod, boundAction) {
    this.expressRouter.route(uri)[httpMethod](boundAction);
  }

  _buildControllerInstance(ControllerClass, req, res) {
    return new ControllerClass(
        {
          params: req.params,
          query: req.query,
          body: req.body,
          repository: this.repository,
          send: (statusCode, resource) => {
            res.status(statusCode).send(resource);
          },
        },
    );
  }

  run() {
    this.repository.registerRepositories();
    this.router.registerRoutes(this._registerRoute, this._buildControllerInstance);
    this.express.use('/api/v1', this.expressRouter);
    this.express.use((req, res) => {
      res.status(404).send({ url: `${req.originalUrl} not found` });
    });
    this.express.listen(this.port, this.host);
    console.log(`RESTful API server started on: ${this.port}`);
  }
}

module.exports = App;
