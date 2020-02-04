'use strict';

const callbacks = Object.create(null);

callbacks.url = function(elem) {
  const url = elem.url;
  if (url === this.url) {
    return elem;
  }
};

callbacks.cardsAll = function(elem) {
  return elem;
};

callbacks.cardsByNumber = function(elem) {
  const number = elem.number;
  if (number === this.number) {
    return elem;
  }
};

module.exports = callbacks;
