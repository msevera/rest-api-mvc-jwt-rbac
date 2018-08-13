const BookRepository = require('./bookRepository');
const UserRepository = require('./userRepository');

class Repository {
  constructor(db) {
    this._db = db;
  }

  registerRepositories() {
    this.book = new BookRepository(this._db);
    this.user = new UserRepository(this._db);
  }
}

module.exports = Repository;
