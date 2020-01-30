'use strict';

const templateHead = parameters => {
  const { title } = parameters;
  const data = `
  <!DOCTYPE html>
  <html lang="ru">
    <head>
      <title>${title}</title>
      
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
      <link rel="icon" href="/favicon.ico" type="image/x-icon">
    </head>
  `;
  return data;
};

module.exports = templateHead;
