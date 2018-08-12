const BookRepository = require('./bookRepository');

class Repository {
  constructor(db) {
    this._db = db;
  }

  registerRepositories() {
    this.book = new BookRepository(this._db);
  }
}

module.exports = Repository;
