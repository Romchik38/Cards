'use strict';

const { main } = require('./urlsfn');

const urls = {
  '/': main,
  '/*\\.*': {
    '.ico': 'img',
    '.jpeg': 'img',
    '.js': 'scripts',
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
