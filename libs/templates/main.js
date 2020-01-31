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
       <h2>Main Page</h2>
       <p>On this site you can find a card by it number.</p>
       <p>Visit Search page to find, and Add page to add the number.</p>
      </section>
      </br>${footer}
   </body>
  `;
  const html = head.concat(header).concat(data);
  return html;
};

module.exports = tem;
