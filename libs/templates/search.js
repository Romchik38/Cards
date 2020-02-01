'use strict';

const headTemplate = require('./heads/head');
const headerTemplate = require('./headers/header');
const footerTemplate = require('./footers/footer.js');

const tem = parameters => {
  const head = headTemplate(parameters);
  const header = headerTemplate(parameters);
  const footer = footerTemplate(parameters);
  const { cardsAll } = parameters;
  let counter = 0;
  let data = `
   <body>
     <section>
       <h1>Adding Cards</h1>
       <p>You can find a card by number. Please fill the form below</p>
       <div>
         <input type="text" id="inpSearch" value="" placeholder="Input a number" autofocus>
         <input type="button" id="btnSearch" value="search">
         </br>
       </div>
      </section>
      <section>
        <div>
          <span id="spanNumber">number</span>: <span id="spanName">name</span>
        </div>
        <table>
          <tr>
            <td>#</td>
            <td>Number</td>
            <td>Name</td>
          <tr/>`;
          for (const val of cardsAll) {
            data += `
              <tr>
              <td>${++counter}</td>
              <td>${val['number']}</td>
              <td>${val['name']}</td>
              <tr/>
            `
          }
        data += `
        </table>
      </section>
      </br>${footer}
      <script src="/search.js"></script>
   </body>
  `;
  const html = head.concat(header).concat(data);
  return html;
};

module.exports = tem;
