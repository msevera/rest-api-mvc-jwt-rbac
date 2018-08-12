const App = require('./app');
const Router = require('./routing/router');
const Repository = require('./repositories/repository');
const IndexRoutesBuilder = require('./routing/routesBuilders/indexRoutesBuilder');
const BooksListRoutesBuilder = require('./routing/routesBuilders/booksListRoutesBuilder');

class Server {
  constructor() {
    this.repository = new Repository();
    this.router = new Router(this.app, [
      new IndexRoutesBuilder(),
      new BooksListRoutesBuilder(),
    ]);

    this.app = new App(this.router, this.repository);
  }

  start() {
    this.app.run();
  }
}

const server = new Server();
server.start();
