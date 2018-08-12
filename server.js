const App = require('./app');
const Router = require('./routing/router');
const IndexRoutesBuilder = require('./routing/routesBuilders/indexRoutesBuilder');
const BooksListRoutesBuilder = require('./routing/routesBuilders/booksListRoutesBuilder');

class Server {
  constructor() {
    this.router = new Router([
      new IndexRoutesBuilder(),
      new BooksListRoutesBuilder(),
    ]);

    this.app = new App(this.router);
  }

  start() {
    this.app.run();
  }
}

const server = new Server();
server.start();
