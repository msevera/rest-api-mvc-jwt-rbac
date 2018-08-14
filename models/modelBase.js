const halson = require('halson');

class ModelBase {
  getResource(data) {
    return halson(data);
  }
}

module.exports = ModelBase;
