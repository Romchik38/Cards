'use strict';

const connector = require('./connector');
const { cardsByNumber, cardsByName, cardsAll, insert, update
} = require('./callbacks');

const { PREFIX } = require('./consts');

const getparameters = (param, table, operation, callback) =>
  connector('database', table, operation, callback.bind(param));

const serializer = {
  '/getnumber': number => getparameters(
    { number }, 'cards', 'select', cardsByNumber
  ),
  '/getname': name => getparameters(
    { name }, 'cards', 'select', cardsByName
  ),
  '/addcard': str => {
    const name = str.trim();
    const cards = getparameters({}, 'cards', 'select', cardsAll);
    const size = cards.length;
    const number = PREFIX.concat(size);
    getparameters({ number, name }, 'cards', 'insert', insert);
    const cardsUpdated = getparameters({}, 'cards', 'select', cardsAll);
    return cardsUpdated.slice(-10).reverse();
  },
  '/update': card => {
    if (typeof card !== 'object') return [];
    const { number, name } = card;
    if (!number || !name) return [];
    getparameters({ number, name }, 'cards', 'update', update);
    const res = getparameters({ number }, 'cards', 'select', cardsByNumber);
    return res;
  },
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
