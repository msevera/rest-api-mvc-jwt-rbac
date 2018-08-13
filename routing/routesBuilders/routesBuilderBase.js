class RoutesBuilderBase {
  constructor(controllerClass) {
    this.routes = [];
    this.ControllerClass = controllerClass;
  }

  buildRoute(uri, httpMethod, action, isSecure = true) {
    this.routes.push({
      controllerClass: this.ControllerClass,
      action,
      uri,
      httpMethod,
      isSecure,
    });
  }
}

module.exports = RoutesBuilderBase;
