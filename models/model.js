const halson = require('halson');

class Model {
  constructor(uriGenerator) {
    this.uriGenerator = uriGenerator;
  }

  getResource(data) {
    return halson(data);
  }
}

module.exports = Model;
