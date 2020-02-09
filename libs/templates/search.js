'use strict';

const headTemplate = require('./heads/head');
const headerTemplate = require('./headers/header');
const footerTemplate = require('./footers/footer.js');

const tem = parameters => {
  const head = headTemplate(parameters);
  const header = headerTemplate(parameters);
  const footer = footerTemplate(parameters);
  const data = `
    <header>
      <h1>Searching Cards</h1>
      <p>You can find a card by number. Please fill the form below</p>
    </header>
    <div class="row">
     <section class="col-sm">
     <input type="radio" data-field="number" name="radio" checked>number
     <input type="radio" data-field="name" name="radio">name
         <div>
           <input type="text" id="inpSearch" value="" placeholder="Input a number" autofocus>
           <input type="button" id="btnSearch" value="search">
         </div>
         <div>
           <span id="spanResult">add number</span>
         </div>
      </section>
      <section class="col-sm">
        <table id=tableResult>
          <tr>
            <td>#</td>
            <td>Number</td>
            <td>Name</td>
            <td><span id="spanUpdate">Update</td>
          <tr/>
        </table>
        <div style="display:none" id="divUpdate">
        <p id="pUpdate"></p>
        <textarea id="textAreaUpdate" value="" maxlength="100" cols="50" rows="3">
        </textarea></br>
        <input type="button" id="btnSave" value="save">
        </div>
      </section>
     </div>
      <script src="/search.js"></script>
      </br>${footer}
  `;
  const html = head.concat(header).concat(data);
  return html;
};

module.exports = tem;
