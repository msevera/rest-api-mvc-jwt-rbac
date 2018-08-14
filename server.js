const ExpressApp = require('./expressApp');
const Router = require('./routing/router');
const Repository = require('./repositories/repository');
const IndexRoutesBuilder = require('./routing/routesBuilders/indexRoutesBuilder');
const BooksListRoutesBuilder = require('./routing/routesBuilders/booksListRoutesBuilder');
const db = require('./mock/db');
const IndexRoutesBuilder = require('./routing/routes/indexRoutes');
const BooksListRoutesBuilder = require('./routing/routes/booksListRoutes');

const expressApp = new ExpressApp(
    new Router([
      new IndexRoutesBuilder(),
      new BooksListRoutesBuilder(),
    ]),
);

expressApp.run();
