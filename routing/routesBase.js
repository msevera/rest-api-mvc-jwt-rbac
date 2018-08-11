const URIGenerator = require('./uriGenerator');
const RoutesCollection = require('./routesCollection');

class RoutesBase {
  constructor(router, repository, controllerClass) {
    this.router = router;
    this.repository = repository;
    this.ControllerClass = controllerClass;
    this.uriGenerator = new URIGenerator(RoutesCollection);
  }

  register() {
    throw new Error('Not Implemented exception');
  }

  getControllerInstance(req, res) {
    return new this.ControllerClass(
        {
          repository: this.repository,
          uriGenerator: this.uriGenerator,
          req,
          res,
        },
    );
  }

  registerRoute(uri, httpMethod, action, isSecure = true) {
    RoutesCollection.addRouteData(this.ControllerClass, action, { uri, httpMethod });
    this.router.route(uri)[httpMethod](this.bindRouteTo(action, isSecure));
  }

  bindRouteTo(method) {
    const result = [
      (req, res) => {
        this.getControllerInstance(req, res)[method]();
      }];

    return result;
  }
}

module.exports = RoutesBase;
