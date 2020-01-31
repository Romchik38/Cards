'use strict';

const headTemplate = require('./heads/head');
const headerTemplate = require('./headers/header');
const footerTemplate = require('./footers/footer.js');

const tem = parameters => {
  const head = headTemplate(parameters);
  const header = headerTemplate(parameters);
  const footer = footerTemplate(parameters);
  const data = `
   <body>
     <section>
       <h1>Adding Cards</h1>
       <p>You can find a card by number. Please fill the form below</p>
      </section>
      </br>${footer}
   </body>
  `;
  const html = head.concat(header).concat(data);
  return html;
};

module.exports = tem;
