'use strict';

const headTemplate = require('./heads/head');
const headerTemplate = require('./headers/header');
const footerTemplate = require('./footers/footer.js');

const tem = parameters => {
  const head = headTemplate(parameters);
  const header = headerTemplate(parameters);
  const footer = footerTemplate(parameters);
  const data = `
    <div class="jumbotron">
      <h1 class="display-4">Main Page</h1>
      <p class="lead">On this site you can find a card by it number or name.</p>
      <hr class="my-4">
      <p>Visit Search page to find or update and Add page to add the number.</p>
      <p>Have a nice day!</p>
    </div>
    ${footer}
  `;
  const html = head.concat(header).concat(data);
  return html;
};

module.exports = tem;
