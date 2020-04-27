'use strict';

const assert = require('assert').strict;

const { cardsAll } = require('../libs/callbacks');

const ca1 = cardsAll({})
assert.strictEqual(typeof ca1, 'object',
  'Callbacks/CardsAll returned type should be an object');

try {
  cardsAll();
} catch(e) {
  assert.strictEqual(e.message,
    'Element shouldn\'t be undefined, null or boolean');
}

try {
  cardsAll();
  throw new Error('Callback/cardsAll should throw an error');
} catch(e) {
  if (e.message === 'Callback/cardsAll should throw an error') {
    console.log(e);
  }
}
