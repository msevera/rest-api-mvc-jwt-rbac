class RoutesBuilderBase {
  constructor(controllerClass) {
    this.routes = [];
    this.ControllerClass = controllerClass;
  }

  buildRoute(uri, httpMethod, action) {
    this.routes.push({
      controllerClass: this.ControllerClass,
      action,
      uri,
      httpMethod,
    });
  }
}

module.exports = RoutesBuilderBase;
