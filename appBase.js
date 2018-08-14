const URIGenerator = require('./routing/uriGenerator');

class AppBase {
  constructor(router, repository, security) {
    this.router = router;
    this.repository = repository;
    this.security = security;
    this._registerRoute = this._registerRoute.bind(this);
    this._createRouteBoundAction = this._createRouteBoundAction.bind(this);
  }

  _registerRoute(uri, httpMethod, boundAction) { // eslint-disable-line no-unused-vars
    throw new Error('Not Implemented Exception');
  }

  _registerAuthRoute() {
    throw new Error('Not Implemented Exception');
  }

  _createRouteBoundAction(controllerClass, method) {
    const result = [
      (req, res) => {
        this._buildControllerInstance(controllerClass, req, res)[method]();
      }];

    result.unshift(
        this.security.authenticate(),
        this.security.authorise(controllerClass.name, method),
    );

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
          send: (statusCode, resource, location) => {
            if (location) {
              res.location(location);
            }
            res.status(statusCode).send(resource);
          },
        },
    );
  }

  run() {
    this.repository.registerRepositories();
    this.router.registerRoutes(this._registerRoute, this._createRouteBoundAction);
    this._registerAuthRoute(this.security.issueToken());
  }
}

module.exports = AppBase;
