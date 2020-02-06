'use strict';

const headTemplate = require('./heads/head');
const headerTemplate = require('./headers/header');
const footerTemplate = require('./footers/footer.js');

const tem = parameters => {
  const head = headTemplate(parameters);
  const header = headerTemplate(parameters);
  const footer = footerTemplate(parameters);
  const { lastTen } = parameters;
  let counter = 0;
  let data = `
   <body>
     <section>
       <h1>Adding Cards</h1>
       <p>You can add a card. Please fill the form below</p>
       <div>
         <textarea id="textArea1" value="" placeholder="Name, tel, email" maxlength="100" autofocus cols="50" rows
="3"></textarea>
         </br>
         <input type="button" id="btnAdd" value="Add">
         </br>
       </div>
      </section>
      <section>
        <div>
          <span id="spanResult">Last 10 cards</span>
        </div>
        <table id=tableResult>
        <tr>
          <td>#</td>
          <td>Number</td>
          <td>Name</td>
        <tr/>
        `;
        for (const item of lastTen) {
          data += `
            <tr>
              <td>${++counter}</td>
              <td>${item.number}</td>
              <td>${item.name}</td>
            <tr/>
          `;
        }
        data += `
        </table>
      </section>
      </br>${footer}
      <script src="/add.js"></script>
   </body>
  `;
  const html = head.concat(header).concat(data);
  return html;
};

module.exports = tem;
