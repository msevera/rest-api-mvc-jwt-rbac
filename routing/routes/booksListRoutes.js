const BooksListController = require('../../controllers/booksListController');
const RoutesBase = require('./routesBase');

class BooksListRoutes extends RoutesBase {
  constructor() {
    super(BooksListController);
  }

  getRoutes() {
    this.addRoute('/books', 'get', 'getBooks');
    this.addRoute('/books/:id', 'get', 'getBook');
    this.addRoute('/books/:id', 'delete', 'removeBook');
    this.addRoute('/books/:id/rate', 'put', 'rateBook');
    return this.routes;
  }
}

module.exports = BooksListRoutes;
