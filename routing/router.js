const RoutesCollection = require('./routesCollection');

class Router {
  constructor(routeBuilders) {
    this.routeBuilders = routeBuilders;
  }

  registerRoutes(registerRouteCallback, createRouteBoundAction) {
    this.routeBuilders.forEach((builder) => {
      const routes = builder.getRoutes();
      routes.forEach((routeData) => {
        RoutesCollection.addRouteData(routeData.controllerClass, routeData.action,
            { uri: routeData.uri, httpMethod: routeData.httpMethod });
        const boundAction = createRouteBoundAction(routeData.controllerClass, routeData.action,
            routeData.isSecure);
        registerRouteCallback(routeData.uri, routeData.httpMethod, boundAction);
      });
    });
  }
}

module.exports = Router;
