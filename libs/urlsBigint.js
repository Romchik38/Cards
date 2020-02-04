'use strict';

const connector = require('./connector');
const { cardsByNumber } = require('./callbacks.js');

const getparameters = (param, table, callback) =>
  connector('database', table, callback.bind(param));

const bigintNumbers = {
  'first': () => 1n,
};

const bigintFns = {
  '1': (page, cards) => {
    if (page.method !== 'POST') return;  //добавить bad request
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
        const response = JSON.stringify(result);
        const writeHead = [200];
        page.res.end(response);
      }
    });

  },
};

module.exports = { bigintNumbers, bigintFns };
