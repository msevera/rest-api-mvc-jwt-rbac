const halson = require('halson');
const ControllerBase = require('./controllerBase');

class IndexController extends ControllerBase {
  async index() {
    const getBookURI = this.uriGenerator.getURI(
        'BooksListController_getBook',
    );

    const rateBookURI = this.uriGenerator.getURI(
        'BooksListController_rateBook',
    );

    const removeBookURI = this.uriGenerator.getURI(
        'BooksListController_removeBook',
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
