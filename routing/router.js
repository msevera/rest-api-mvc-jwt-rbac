const express = require('express');
const IndexRoutes = require('./routes/indexRoutes');
const BooksListRoutes = require('./routes/booksListRoutes');

class Router {
  constructor(app, repository) {
    this.app = app;
    this.repository = repository;
    this.router = express.Router();
    this.routes = [
      new IndexRoutes(this.router, this.repository),
      new BooksListRoutes(this.router, this.repository),
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
