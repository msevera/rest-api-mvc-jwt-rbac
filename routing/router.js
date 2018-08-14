const RoutesCollection = require('./routesCollection');

class Router {
  constructor(routes) {
    this.routes = routes;
  }

  registerRoutes(registerRoute, createRouteBoundAction) {
    this.routes.forEach((builder) => {
      const routes = builder.getRoutes();
      routes.forEach((routeData) => {
        RoutesCollection.addRouteData(routeData.controllerClass, routeData.action,
            { uri: routeData.uri, httpMethod: routeData.httpMethod });
        const boundAction = createRouteBoundAction(routeData.controllerClass, routeData.action);
        registerRoute(routeData.uri, routeData.httpMethod, boundAction);
      });
    });
  }
}

module.exports = Router;
