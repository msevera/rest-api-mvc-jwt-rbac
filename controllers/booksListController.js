const halson = require('halson');
const ControllerBase = require('./controllerBase');

class BooksListController extends ControllerBase {
  async getBook() {
    try {
      const { id } = this.params;

      const resource = halson({ id });

      const removeURI = await this.uriGenerator.getURI(
          this.controllers.BooksListController.removeBook,
          { id },
      );
      if (removeURI) {
        resource.addLink(removeURI.id, removeURI);
      }

      const rateURI = await this.uriGenerator.getURI(
          this.controllers.BooksListController.rateBook,
          { id },
      );
      if (rateURI) {
        resource.addLink(rateURI.id, rateURI);
      }

      this.ok(resource);
    } catch (err) {
      this.error(err);
    }
  }

  async rateBook() {
    try {
      const { id } = this.params;
      const { rating } = this.body;

      const resource = halson({ id, rating });

      this.ok(resource);
    } catch (err) {
      this.error(err);
    }
  }

  async removeBook() {
    try {
      const { id } = this.params;

      const resource = halson({ id });

      this.ok(resource);
    } catch (err) {
      this.error(err);
    }
  }
}

module.exports = BooksListController;
