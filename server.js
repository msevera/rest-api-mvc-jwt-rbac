const config = require('config');
const App = require('./app');
const Router = require('./routing/router');
const Repository = require('./repositories/repository');
const IndexRoutesBuilder = require('./routing/routesBuilders/indexRoutesBuilder');
const BooksListRoutesBuilder = require('./routing/routesBuilders/booksListRoutesBuilder');
const db = require('./mock/db');
const Security = require('./security/security');

class Server {
  constructor() {
    this.repository = new Repository(db);
    this.security = new Security(this.repository, config.get('api.security.jwtSecret'));
    this.router = new Router([
      new IndexRoutesBuilder(),
      new BooksListRoutesBuilder(),
    ], this.router);

    this.app = new App(this.router, this.repository, this.security);
  }

  start() {
    this.app.run();
  }
}

const server = new Server();
server.start();
