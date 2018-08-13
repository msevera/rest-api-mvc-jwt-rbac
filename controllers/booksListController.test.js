const BookListController = require('./booksListController');
const Router = require('../routing/router');
const BooksListRoutesBuilder = require('../routing/routesBuilders/booksListRoutesBuilder');
const Repository = require('../repositories/repository');
const URIGenerator = require('../routing/uriGenerator');

let repository;

beforeEach(() => {
  const router = new Router([
    new BooksListRoutesBuilder(),
  ]);
  router.registerRoutes(jest.fn(), jest.fn());

  repository = new Repository({
    books: [
      {
        _id: 0,
        name: 'Letters from Father Christmas',
        author: 'John Ronald Ruel Tolkien',
        language: 'English',
        rating: 0,
      }],
  });
  repository.registerRepositories();
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
        { params: { id }, send: sendFunc, repository, uriGenerator: new URIGenerator() },
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
        { params: { id }, body: { rating: 5 }, send: sendFunc, repository, uriGenerator: new URIGenerator() },
    );
    await controller.rateBook();
  });

  test('RemoveBook action success', async (done) => {
    const allBooksLength = repository.book.getAllBooks().length;
    const expectedResult = allBooksLength - 1;
    const sendFunc = (status) => {
      expect(status).toBe(204);
      expect(repository.book.getAllBooks().length).toBe(expectedResult);
      done();
    };
    const controller = new BookListController({ send: sendFunc, repository, uriGenerator: new URIGenerator() });
    await controller.removeBook();
  });
});
