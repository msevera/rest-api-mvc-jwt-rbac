const RoutesCollection = require('./routesCollection');

class Router {
  constructor(app, routeBuilders) {
    this.routeBuilders = routeBuilders;
    this.app = app;
  }

  registerRoutes() {
    this.routeBuilders.forEach((builder) => {
      const routes = builder.getRoutes();
      routes.forEach((routeData) => {
        RoutesCollection.addRouteData(routeData.controllerClass, routeData.action,
            { uri: routeData.uri, httpMethod: routeData.httpMethod });
        const boundAction = this._bindRouteTo(routeData.controllerClass, routeData.action);
        this.app.registerRoute(routeData.uri, routeData.httpMethod, boundAction);
      });
    });
  }

  _bindRouteTo(controllerClass, method) {
    const result = [
      (req, res) => {
        this._getControllerInstance(controllerClass, req, res)[method]();
      }];

    return result;
  }

  _getControllerInstance(ControllerClass, req, res) {
    return new ControllerClass(
        {
          params: req.params,
          query: req.query,
          body: req.body,
          send: (statusCode, resource) => {
            res.status(statusCode).send(resource);
          },
        },
    );
  }
}

module.exports = Router;
