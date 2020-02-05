'use strict';

const connector = require('./connector');
const { cardsByNumber } = require('./callbacks');

const getparameters = (param, table, callback) =>
  connector('database', table, callback.bind(param));

const serializer = {
  '/getnumber': number => getparameters(
    { number }, 'cards', cardsByNumber
  ) || [],
  '/addcard': data => {
    console.log(data);
    return ['hello'];
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
