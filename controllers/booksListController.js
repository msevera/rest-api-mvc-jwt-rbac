const ControllerBase = require('./controllerBase');
const BookModel = require('../models/bookModel');

class BooksListController extends ControllerBase {
  async getBooks() {
    try {
      const books = this.repository.book.getAll();
      const resources = await Promise.all(books.map(async (book) => {
        const model = new BookModel(book);
        const resource = await model.getResource(this.uriGenerator);
        return resource;
      }));

      this.ok(resources);
    } catch (err) {
      this.error(err);
    }
  }

  async getBook() {
    const { id } = this.params;

    try {
      const book = this.repository.book.getById(id);
      const bookModel = new BookModel(book);
      const resource = await bookModel.getResource(this.uriGenerator);
      this.ok(resource);
    } catch (err) {
      this.error(err);
    }
  }

  async rateBook() {
    const { id } = this.params;
    const { rating } = this.body;

    try {
      this.repository.book.rateBook(id, rating);
      const book = this.repository.book.getById(id);
      const bookModel = new BookModel(book);
      const resource = await bookModel.getResource(this.uriGenerator);
      this.ok(resource);
    } catch (err) {
      this.error(err);
    }
  }

  async removeBook() {
    const { id } = this.params;

    try {
      this.repository.book.removeById(id);
      this.noContent();
    } catch (err) {
      this.error(err);
    }
  }
}

module.exports = BooksListController;
