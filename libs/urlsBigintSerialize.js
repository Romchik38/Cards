'use strict';

const connector = require('./connector');
const { cardsByNumber, cardsAll, insert } = require('./callbacks');
const { PREFIX } = require('./consts');

const getparameters = (param, table, operation, callback) =>
  connector('database', table, operation, callback.bind(param));

const serializer = {
  '/getnumber': number => getparameters(
    { number }, 'cards', 'select', cardsByNumber
  ) || [],
  '/addcard': name => {
    const cards = getparameters({}, 'cards', 'select', cardsAll);
    const size = cards.length;
    const number = PREFIX.concat(size);
    getparameters({ number, name }, 'cards', 'insert', insert);
    const cardsUpdated = getparameters({}, 'cards', 'select', cardsAll);
    return cardsUpdated.slice(-10).reverse();
  }
};

const bigintSerialize = (data, url) => {
  const fn = serializer[url];
  if (fn) return fn(data);
  else {
    throw new Error(`##Check serializer in urlsBigintSerialize for
      ${url}`);
  }
};

module.exports = { bigintSerialize };
