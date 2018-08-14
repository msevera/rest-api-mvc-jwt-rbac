const ExpressApp = require('./expressApp');
const Router = require('./routing/router');
const IndexRoutes = require('./routing/routes/indexRoutes');
const BooksListRoutes = require('./routing/routes/booksListRoutes');

const router = new Router(
    [
      new IndexRoutes(),
      new BooksListRoutes(),
    ],
);

const expressApp = new ExpressApp(router);

expressApp.run();
