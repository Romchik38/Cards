'use strict';

const { main, add } = require('./urlsFn');
const { bigintNumbers } = require('./urlsBigint');

const urls = {
  '/': main,
  '/search': main,
  '/add': add,
  '/getnumber': bigintNumbers.first(),
  '/getname': bigintNumbers.first(),
  '/addcard': bigintNumbers.first(),
  '/update': bigintNumbers.first(),
  '/*\\.*': {
    '.css': '/public/css',
    '.ico': '/public/img',
    '.jpg': '/public/img',
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
