const express = require('express');
const bodyParser = require('body-parser');

class App {
  constructor(host, port) {
    this.express = express();
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.host = host;
    this.port = port;
    this.expressRouter = express.Router();
  }

  registerRoute(uri, httpMethod, boundAction) {
    this.expressRouter.route(uri)[httpMethod](boundAction);
  }

  run() {
    this.express.use('/api/v1', this.expressRouter);
    this.express.use((req, res) => {
      res.status(404).send({ url: `${req.originalUrl} not found` });
    });
    this.express.listen(this.port, this.host);
    console.log(`RESTful API server started on: ${this.port}`);
  }
}

module.exports = App;
