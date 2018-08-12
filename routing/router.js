const RoutesCollection = require('./routesCollection');

class Router {
  constructor(routeBuilders) {
    this.routeBuilders = routeBuilders;
  }

  registerRoutes(registerRouteCallback, buildControllerInstanceCallback) {
    this.routeBuilders.forEach((builder) => {
      const routes = builder.getRoutes();
      routes.forEach((routeData) => {
        RoutesCollection.addRouteData(routeData.controllerClass, routeData.action,
            { uri: routeData.uri, httpMethod: routeData.httpMethod });
        const boundAction = this._bindRouteTo(routeData.controllerClass, routeData.action,
            buildControllerInstanceCallback);
        registerRouteCallback(routeData.uri, routeData.httpMethod, boundAction);
      });
    });
  }

  _bindRouteTo(controllerClass, method, buildControllerInstanceCallback) {
    const result = [
      (req, res) => {
        buildControllerInstanceCallback(controllerClass, req, res)[method]();
      }];

    return result;
  }
}

module.exports = Router;
