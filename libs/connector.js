'use strict';

const database = require('./database');

const databases = Object.create(null);

Object.assign(databases, { database });

const connector = (name, ...args) => {
  const base = databases[name];
  return base(...args);
};

module.exports = connector;
