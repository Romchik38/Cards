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
       <h2>Adding Cards</h2>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
       eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
       minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
       ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
       sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
       mollit anim id est laborum.</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
       eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
       minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
       ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
       sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
       mollit anim id est laborum.</p>
      </section>
      </br>${footer}
   </body>
  `;
  const html = head.concat(header).concat(data);
  return html;
};

module.exports = tem;
