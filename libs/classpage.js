'use strict';

class Page {
  constructor(req) {
    this.url = req.url;
    this.host = req.headers.host;
    this.htmlTemplate = '';
    this.parameters = Object.create(null);
  }
}

module.exports = Page;
