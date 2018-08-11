const UserRepository = require('./userRepository');
const BookRepository = require('./bookRepository');

class Repository {
  constructor(db) {
    this._db = db;
  }

  registerRepositories() {
    this.user = new UserRepository(this._db);
    this.book = new BookRepository(this._db);
  }
}

module.exports = Repository;
