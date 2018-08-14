const ModelBase = require('./modelBase');

class BookModel extends ModelBase {
  constructor(data) {
    super();
    this.id = data._id;
    this.name = data.name;
    this.author = data.author;
    this.language = data.language;
    this.rating = data.rating;
  }

  async getResource(uriGenerator) {
    const resource = super.getResource({
      id: this.id,
      name: this.name,
      author: this.author,
      language: this.language,
      rating: this.rating,
    });

    await this.addLinks(resource, uriGenerator);
    return resource;
  }

  async addLinks(resource, uriGenerator) {
    const removeURI = await uriGenerator.getURI(
        'BooksListController_removeBook',
        { id: this.id },
    );
    if (removeURI) {
      resource.addLink(removeURI.id, removeURI);
    }

    const rateURI = await uriGenerator.getURI(
        'BooksListController_rateBook',
        { id: this.id },
    );
    if (rateURI) {
      resource.addLink(rateURI.id, rateURI);
    }
  }
}

module.exports = BookModel;
