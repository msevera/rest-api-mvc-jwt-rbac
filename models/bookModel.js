const Model = require('./model');

class BookModel extends Model {
  constructor(data, uriGenerator) {
    super(uriGenerator);
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
        this.uriGenerator.controllers.BooksListController.removeBook,
        { id: this.id },
    );
    if (removeURI) {
      resource.addLink(removeURI.id, removeURI);
    }

    const rateURI = await this.uriGenerator.getURI(
        this.uriGenerator.controllers.BooksListController.rateBook,
        { id: this.id },
    );
    if (rateURI) {
      resource.addLink(rateURI.id, rateURI);
    }
  }
}

module.exports = BookModel;
