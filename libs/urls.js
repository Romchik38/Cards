'use strict';

const { main, search } = require('./urlsfn');

const urls = {
  '/': main,
  '/search': search,
  '/*\\.*': {
    '.ico': '/public/img',
    '.jpeg': '/public/img',
    '.js': '/public/scripts',
  },
};

const matching = [];
for (const key in urls) {
  if (key.includes('*')) {
    const rx = new RegExp(key.replace(/\*/g, '(.*)'));
    const value = urls[key];
    matching.push([rx, value]);
    delete urls[key];
  }
}

module.exports = { urls, matching };
