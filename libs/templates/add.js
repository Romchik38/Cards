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
     <header>
       <div class="row justify-content-center">
         <h1>Adding Cards</h1>
       </div>
        <p>You can add a card. Please fill the form below</p>
     </header>
     <div class="row">
       <section class="col-sm">
         <div>
           <textarea id="textArea1" value="" placeholder="Name, tel, email" maxlength="100" autofocus cols="50" rows
  ="3"></textarea>
           </br>
           <input type="button" id="btnAdd" value="Add" class="btn btn-primary">
           </br>
         </div>
        </section>
        <section class="col-sm">
          <div>
            <span id="spanResult">Last 10 cards</span>
          </div>
          <table class="table table-bordered table-hover table-striped">
          <thead class="table-dark">
          <tr>
            <td>#</td>
            <td>Number</td>
            <td>Name</td>
          <tr/>
          </thead>
          <tbody id="tableResult" class="table-striped">
          `;
          for (const item of lastTen) {
            data +=
            `<tr name="trIsLoaded">
                <td>${++counter}</td>
                <td>${item.number}</td>
                <td>${item.name}</td>
              </tr>`;
          }
          data += `
          </tbody>
          </table>
        </section>
      </div>
      <script src="/add.js"></script>
      </br>${footer}
  `;
  const html = head.concat(header).concat(data);
  return html;
};

module.exports = tem;
