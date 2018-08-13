const BookListController = require('./booksListController');
const Router = require('../routing/router');
const BooksListRoutesBuilder = require('../routing/routesBuilders/booksListRoutesBuilder');
const URIGenerator = require('../routing/uriGenerator');

beforeEach(() => {
  const router = new Router([
    new BooksListRoutesBuilder(),
  ]);
  router.registerRoutes(jest.fn(), jest.fn());
});

describe('testing BooksListController controller', () => {
  test('GetBook action success', async (done) => {
    const id = 0;
    const sendFunc = (status, resource) => {
      expect(status).toBe(200);
      expect(resource.id).toBe(id);
      done();
    };
    const controller = new BookListController(
        { params: { id }, send: sendFunc, uriGenerator: new URIGenerator() },
    );
    await controller.getBook();
  });

  test('RateBook action success', async (done) => {
    const id = 0;
    const sendFunc = (status, resource) => {
      expect(status).toBe(200);
      expect(resource.id).toBe(id);
      expect(resource.rating).toBe(5);
      done();
    };
    const controller = new BookListController(
        { params: { id }, body: { rating: 5 }, send: sendFunc, uriGenerator: new URIGenerator() },
    );
    await controller.rateBook();
  });

  test('RemoveBook action success', async (done) => {
    const sendFunc = (status) => {
      expect(status).toBe(204);
      done();
    };
    const controller = new BookListController({ send: sendFunc, uriGenerator: new URIGenerator() });
    await controller.removeBook();
  });
});
