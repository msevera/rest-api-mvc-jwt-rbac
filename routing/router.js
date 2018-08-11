const express = require('express');
const IndexRoutes = require('./routes/indexRoutes');
const BooksListRoutes = require('./routes/booksListRoutes');

class Router {
  constructor(app) {
    this.app = app;
    this.router = express.Router();
    this.routes = [
      new IndexRoutes(this.router),
      new BooksListRoutes(this.router),
    ];
  }

  registerRoutes() {
    this.routes.forEach(route => route.register());
    this.app.use('/api/v1', this.router);
    this.app.use((req, res) => {
      res.status(404).send({ url: `${req.originalUrl} not found` });
    });
  }
}

module.exports = Router;
