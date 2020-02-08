'use strict';

const { bigintSerialize } = require('./urlsBigintSerialize');

const bigintNumbers = {
  'first': () => 1n,
};

const response = (res, status, data) => {
  res.writeHead(status);
  res.end(data);
};

const bigintFns = {
  '1': page => {
    if (page.method !== 'POST') {
      response(page.res, 400, '');
      return;
    }
    let body = [];
    page.req.on('data', chunk => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body);
      body = JSON.parse(body);
      if (body) {
        const result = bigintSerialize(body, page.req.url);
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
