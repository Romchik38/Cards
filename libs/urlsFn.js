'use strict';

const connector = require('./connector');

const { cardsAll, url, urlsMenu } = require('./callbacks.js');

const getparameters = (param, table, operation, callback) =>
  connector('database', table, operation, callback.bind(param));

const generalParameters = page => {
  const data = getparameters({ url: page.url }, 'pages', 'select', url)[0];
  page.parameters['title'] = data.title;
  page.parameters['url'] = page.url;
  const menu = getparameters({}, 'pages', 'select', urlsMenu);
  page.parameters['menu'] = menu;
};

const urlsFn = {
  'main': page => {
    generalParameters(page);
  },
  'add': page => {
    generalParameters(page);
    const selectedCards = getparameters({}, 'cards', 'select', cardsAll);
    page.parameters['lastTen'] = selectedCards.slice(-10).reverse();
  },
};

module.exports = urlsFn;
