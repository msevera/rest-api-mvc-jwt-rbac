const URIGenerator = require('./uriGenerator');
const RoutesCollection = require('./routesCollection');

class RoutesBase {
  constructor(router, controllerClass) {
    this.router = router;
    this.ControllerClass = controllerClass;
    this.uriGenerator = new URIGenerator();
  }

  register() {
    throw new Error('Not Implemented exception');
  }

  getControllerInstance(req, res) {
    return new this.ControllerClass(
        {
          uriGenerator: this.uriGenerator,
          controllers: RoutesCollection,
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
