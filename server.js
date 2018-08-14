const ExpressApp = require('./expressApp');
const Router = require('./routing/router');
const IndexRoutesBuilder = require('./routing/routes/indexRoutes');
const BooksListRoutesBuilder = require('./routing/routes/booksListRoutes');

const expressApp = new ExpressApp(
    new Router([
      new IndexRoutesBuilder(),
      new BooksListRoutesBuilder(),
    ]),
);

expressApp.run();
