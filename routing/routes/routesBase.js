class RoutesBase {
  constructor(controllerClass) {
    this.routes = [];
    this.ControllerClass = controllerClass;
  }

  addRoute(uri, httpMethod, action, isSecure = true) {
    this.routes.push({
      controllerClass: this.ControllerClass,
      action,
      uri,
      httpMethod,
      isSecure,
    });
  }
}

module.exports = RoutesBase;
