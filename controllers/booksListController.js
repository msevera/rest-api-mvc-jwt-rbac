const ControllerBase = require('./controllerBase');
const BookModel = require('../models/bookModel');

class BooksListController extends ControllerBase {
  async getBook() {
    try {
      const { id } = this.params;
      const book = this.repository.book.getById(id);
      const bookModel = new BookModel(book, this.uriGenerator);
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
      this.repository.book.rateBook(id, rating);
      const book = this.repository.book.getById(id);
      const bookModel = new BookModel(book, this.uriGenerator);
      const resource = await bookModel.getResource();

      this.ok(resource);
    } catch (err) {
      this.error(err);
    }
  }

  async removeBook() {
    try {
      const { id } = this.params;

      this.repository.book.removeById(id);
      this.noContent();
    } catch (err) {
      this.error(err);
    }
  }
}

module.exports = BooksListController;
