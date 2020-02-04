'use strict';

const http = require('http');
const libs = require('./libs');

const types = libs.types;
const Page = libs.classpage;
const { urls, matching } = libs.urls;

const routing = url => {
  const urlValue = urls[url];
  if (!urlValue) {
    for (const route of matching) {
      const match = url.match(route[0]);
      if (match) return route[1];
    }
  }
  return urlValue;
};

const serialize = (req, res) => {
  const urlValue = routing(req.url);
  const type = typeof urlValue;
  const result = types[type];
  return result(urlValue, new Page(req, res));
};

const server = http.createServer((req, res) => {
  const result = serialize(req, res);
  if (result) {
    const { writeHead, data } = result;
    res.writeHead(...writeHead);
    res.end(data);
  }
});

server.listen(8080);

server.on('error', err => {
  console.log(err);
});
