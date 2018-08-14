class ControllerBase {
  constructor({ params, query, body, send, uriGenerator, repository }) {
    this.uriGenerator = uriGenerator;
    this.params = params;
    this.query = query;
    this.body = body;
    this.send = send;
    this.repository = repository;
  }

  error(err) {
    const status = err.statusCode || err.status;
    const statusCode = status || 500;
    this.send(statusCode, err);
  }

  created(location, data) {
    if (location) {
      this.send(201, null, location);
    }

    this.send(201, data);
  }

  ok(data) {
    this.send(200, data);
  }

  noContent() {
    this.send(204);
  }
}

module.exports = ControllerBase;
