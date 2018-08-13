const RepositoryBase = require('./repositoryBase');

class UserRepository extends RepositoryBase {
  constructor(db) {
    super();
    this.usersCollection = db.users;
  }

  getById(id) {
    return this.usersCollection.find(user => user._id == id);
  }

  getByEmail(email) {
    return this.usersCollection.find(user => user.email == email);
  }
}

module.exports = UserRepository;
