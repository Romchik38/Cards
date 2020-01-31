'use strict';

const connector = require('./connector');

const { url } = require('./callbacks.js');

const getparameters = (param, table, callback) =>
  connector('database', table, callback.bind(param));

const urlsFn = {
  'main': page => {
    const data = getparameters({ url: page.url }, 'pages', url)[0];
    page.parameters['title'] = data.title;
  },
  'search': page => {
    const data = getparameters({ url: page.url }, 'pages', url)[0];
    page.parameters['title'] = data.title;
  },
};

module.exports = urlsFn;
