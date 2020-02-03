'use strict';

const bigintNumbers = {
  'first': () => 1n,
};

const bigintFns = {
  '1': page => {
    if (page.method === 'POST') {
      page.req.on('data', data => {
        console.log(data.toString());
      });
    }
  },
};

module.exports = { bigintNumbers, bigintFns };
