const ControllerBase = require('./controllerBase');
const BookModel = require('../models/bookModel');

class BooksListController extends ControllerBase {
  async getBook() {
    try {
      const { id } = this.params;
      const bookModel = new BookModel({ _id: id });
      const resource = await bookModel.getResource();
      this.ok(resource);
    } catch (err) {
      this.error(err);
    }
  }

  async rateBook() {
    try {
      const { id } = this.params;
      const { rating } = this.body;
      const bookModel = new BookModel({ _id: id, rating });
      const resource = await bookModel.getResource();
      this.ok(resource);
    } catch (err) {
      this.error(err);
    }
  }

  async removeBook() {
    try {
      this.noContent();
    } catch (err) {
      this.error(err);
    }
  }
}

module.exports = BooksListController;
