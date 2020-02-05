'use strict';

const connector = require('./connector');
const { cardsByNumber } = require('./callbacks.js');

const getparameters = (param, table, callback) =>
  connector('database', table, callback.bind(param));

const bigintNumbers = {
  'first': () => 1n,
};

const response = (res, status, data) => {
  res.writeHead(status);
  res.end(data);
};

const bigintFns = {
  '1': (page, cards) => {
    if (page.method !== 'POST') {
      response(page.res, 400, '');
      return;
    }
    let body = [];
    page.req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body);
      body = JSON.parse(body).trim();
      if (body) {
        const result = getparameters(
          {number: body}, 'cards', cardsByNumber
        ) || [];
        const responseData = JSON.stringify(result);
        response(page.res, 200, responseData)
      } else {
        response(page.res, 400, '');
        return;
      }
    });
  },
};

module.exports = { bigintNumbers, bigintFns };
