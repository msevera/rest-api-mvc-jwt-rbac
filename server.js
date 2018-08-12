const config = require('config');
const App = require('./app');
const Router = require('./routing/router');
const IndexRoutesBuilder = require('./routing/routesBuilders/indexRoutesBuilder');
const BooksListRoutesBuilder = require('./routing/routesBuilders/booksListRoutesBuilder');

class Server {
  constructor() {
    this.port = config.get('api.port');
    this.host = config.get('api.host');
    this.app = new App(this.host, this.port);
    this.router = new Router(this.app, [
      new IndexRoutesBuilder(),
      new BooksListRoutesBuilder(),
    ]);
  }

  start() {
    this.router.registerRoutes();
    this.app.run();
  }
}

const server = new Server();
server.start();
