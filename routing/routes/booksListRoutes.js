const BooksListController = require('../../controllers/booksListController');
const RoutesBase = require('../routesBase');

class BooksListRoutes extends RoutesBase {
  constructor(app, repository) {
    super(app, repository, BooksListController);
  }

  register() {
    this.registerRoute('/books/:id', 'get', 'getBook');
    this.registerRoute('/books/:id', 'delete', 'removeBook');
    this.registerRoute('/books/:id/rate', 'post', 'rateBook');
  }
}

module.exports = BooksListRoutes;
