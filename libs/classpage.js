'use strict';

class Page {
  constructor(req, res) {
    this.url = req.url;
    this.host = req.headers.host;
    this.method = req.method;
    this.req = req;
    this.res = res;
    this.htmlTemplate = '';
    this.parameters = Object.create(null);
  }
}

module.exports = Page;
