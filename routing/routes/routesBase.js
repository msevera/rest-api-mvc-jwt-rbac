class RoutesBase {
  constructor(controllerClass) {
    this.routes = [];
    this.ControllerClass = controllerClass;
  }

  addRoute(uri, httpMethod, action) {
    this.routes.push({
      controllerClass: this.ControllerClass,
      action,
      uri,
      httpMethod,
    });
  }
}

module.exports = RoutesBase;
