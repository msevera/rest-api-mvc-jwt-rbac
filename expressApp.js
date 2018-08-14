const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const AppBase = require('./appBase');

class ExpressApp extends AppBase {
  constructor(router) {
    super(router);
    this.port = config.get('api.port');
    this.host = config.get('api.host');
    this.express = express();
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.expressRouter = express.Router();
  }

  _registerRoute(uri, httpMethod, boundAction) {
    this.expressRouter.route(uri)[httpMethod](boundAction);
  }

  run() {
    super.run();
    this.express.use('/api/v1', this.expressRouter);
    this.express.use((req, res) => {
      res.status(404).send({ url: `${req.originalUrl} not found` });
    });
    this.express.listen(this.port, this.host);
    console.log(`RESTful API server started on ${this.host}:${this.port}`);
  }
}

module.exports = ExpressApp;
