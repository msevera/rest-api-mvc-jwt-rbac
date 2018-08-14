const IndexController = require('../../controllers/indexController');
const RoutesBase = require('./routesBase');

class IndexRoutes extends RoutesBase {
  constructor() {
    super(IndexController);
  }

  getRoutes() {
    this.addRoute('/', 'get', 'index');
    return this.routes;
  }
}

module.exports = IndexRoutes;
