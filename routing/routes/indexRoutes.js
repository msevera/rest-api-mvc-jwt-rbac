const IndexController = require('../../controllers/indexController');
const RoutesBase = require('../routesBase');

class IndexRoutes extends RoutesBase {
  constructor(app) {
    super(app, IndexController);
  }

  register() {
    this.registerRoute('/', 'get', 'index');
  }
}

module.exports = IndexRoutes;
