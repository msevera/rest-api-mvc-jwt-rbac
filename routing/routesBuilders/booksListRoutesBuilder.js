const BooksListController = require('../../controllers/booksListController');
const RoutesBase = require('./routesBuilderBase');

class BooksListRoutesBuilder extends RoutesBase {
  constructor() {
    super(BooksListController);
  }

  getRoutes() {
    this.buildRoute('/books/:id', 'get', 'getBook');
    this.buildRoute('/books/:id', 'delete', 'removeBook');
    this.buildRoute('/books/:id/rate', 'post', 'rateBook');

    return this.routes;
  }
}

module.exports = BooksListRoutesBuilder;
