const IndexController = require('../../controllers/indexController');
const RoutesBase = require('./routesBuilderBase');

class IndexRoutesBuilder extends RoutesBase {
  constructor() {
    super(IndexController);
  }

  getRoutes() {
    this.buildRoute('/', 'get', 'index');
    return this.routes;
  }
}

module.exports = IndexRoutesBuilder;
