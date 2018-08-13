const halson = require('halson');

class Model {
  getResource(data) {
    return halson(data);
  }
}

module.exports = Model;
