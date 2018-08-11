class ControllerBase {
  constructor({ uriGenerator, repository, req, res }) {
    this.repository = repository;
    this.uriGenerator = uriGenerator;
    this.req = req;
    this.res = res;
    this.params = this.req.params;
    this.query = this.req.query;
    this.body = this.req.body;
  }

  error(err) {
    const status = err.statusCode || err.status;
    const statusCode = status || 500;
    this.res.status(statusCode).send(err);
  }

  created(location, data) {
    if (location) {
      this.res.location(location);
    }

    this.res.status(201).send(data);
  }

  ok(data) {
    this.res.status(200).send(data);
  }

  noContent() {
    this.res.status(204).send();
  }
}

module.exports = ControllerBase;
