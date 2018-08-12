const Model = require('./model');
const URIGenerator = require('../routing/uriGenerator');

class BookModel extends Model {
  constructor(data, uriGenerator) {
    super(uriGenerator);
    this.uriGenerator = URIGenerator;
    this.id = data._id;
    this.name = data.name;
    this.author = data.author;
    this.language = data.language;
    this.rating = data.rating;
  }

  async getResource() {
    const resource = super.getResource({
      id: this.id,
      name: this.name,
      author: this.author,
      language: this.language,
      rating: this.rating,
    });

    await this.addLinks(resource);
    return resource;
  }

  async addLinks(resource) {
    const removeURI = await this.uriGenerator.getURI(
        'BooksListController_removeBook',
        { id: this.id },
    );
    if (removeURI) {
      resource.addLink(removeURI.id, removeURI);
    }

    const rateURI = await this.uriGenerator.getURI(
        'BooksListController_rateBook',
        { id: this.id },
    );
    if (rateURI) {
      resource.addLink(rateURI.id, rateURI);
    }
  }
}

module.exports = BookModel;
