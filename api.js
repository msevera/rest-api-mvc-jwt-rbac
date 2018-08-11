const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const Router = require('./routing/router');

class API {
  constructor() {
    this.app = express();
    this.router = new Router(this.app);

    this.port = config.get('api.port');
    this.host = config.get('api.host');
  }

  start() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.router.registerRoutes();
    this.app.listen(this.port, this.host);

    console.log(`RESTful API server started on: ${this.port}`);
  }
}

module.exports = API;
