const halson = require('halson');
const ControllerBase = require('./controllerBase');

class IndexController extends ControllerBase {
  async index() {
    const getBookURI = this.uriGenerator.getURI(
        this.uriGenerator.controllers.BooksListController.getBook,
    );

    const rateBookURI = this.uriGenerator.getURI(
        this.uriGenerator.controllers.BooksListController.rateBook,
    );

    const removeBookURI = this.uriGenerator.getURI(
        this.uriGenerator.controllers.BooksListController.removeBook,
    );

    const resource = halson({ api: 'api v1' });
    try {
      const links = await Promise.all([
        getBookURI,
        rateBookURI,
        removeBookURI,
      ]);

      links.forEach((link) => {
        if (link) {
          resource.addLink(link.id, link);
        }
      });

      super.ok(resource);
    } catch (err) {
      super.error(err);
    }
  }
}

module.exports = IndexController;
