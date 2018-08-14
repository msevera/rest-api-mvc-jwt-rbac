const ExpressApp = require('./expressApp');
const Router = require('./routing/router');
const Repository = require('./repositories/repository');
const db = require('./mock/db');
const IndexRoutes = require('./routing/routes/indexRoutes');
const BooksListRoutes = require('./routing/routes/booksListRoutes');

const router = new Router(
    [
      new IndexRoutes(),
      new BooksListRoutes(),
    ],
);

const repository = new Repository(db);
const expressApp = new ExpressApp(router, repository);

expressApp.run();
