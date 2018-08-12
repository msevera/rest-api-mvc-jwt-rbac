const halson = require('halson');

class Model {
  constructor(uriGenerator, controllers) {
    this.uriGenerator = uriGenerator;
    this.controllers = controllers;
  }

  getResource(data) {
    return halson(data);
  }
}

module.exports = Model;
