const RepositoryBase = require('./repositoryBase');

class BookRepository extends RepositoryBase {
  constructor(db) {
    super();
    this.booksCollection = db.books;
  }

  getAllBooks() {
    return this.booksCollection;
  }

  getById(id) {
    return this.booksCollection.find(book => book._id == id);
  }

  removeById(id) {
    this.booksCollection = this.booksCollection.filter(book => book._id != id);
  }

  rateBook(id, rating) {
    const book = this.getById(id);
    book.rating = rating;
  }
}

module.exports = BookRepository;
