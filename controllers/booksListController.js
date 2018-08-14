const ControllerBase = require('./controllerBase');
const BookModel = require('../models/bookModel');

class BooksListController extends ControllerBase {
  async getBooks() {
    try {
      const books = [{ _id: 0 }, { _id: 1 }, { _id: 2 }];
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
      const bookModel = new BookModel({ _id: id });
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
      const bookModel = new BookModel({ _id: id, rating });
      const resource = await bookModel.getResource(this.uriGenerator);
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
