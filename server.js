const config = require('config');
const ExpressApp = require('./expressApp');
const Router = require('./routing/router');
const Repository = require('./repositories/repository');
const db = require('./mock/db');
const IndexRoutes = require('./routing/routes/indexRoutes');
const BooksListRoutes = require('./routing/routes/booksListRoutes');
const Security = require('./security/security');

const router = new Router(
    [
      new IndexRoutes(),
      new BooksListRoutes(),
    ],
);

const repository = new Repository(db);
const security = new Security(this.repository, config.get('api.security.jwtSecret'));
const expressApp = new ExpressApp(router, repository, security);

expressApp.run();
