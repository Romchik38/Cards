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
      <div class="row justify-content-center">
        <h1>Searching Cards</h1>
      </div>
      <p>You can find a card by it number or name. Please fill the form below</p>
    </header>
    <div class="row">
     <section class="col-sm-4">
     <input type="radio" data-field="number" name="radio" checked>number
     <input type="radio" data-field="name" name="radio">name
         <div>
           <input type="text" id="inpSearch" value="" placeholder="Input a number" autofocus class="form-control">
           <span id="spanResult">add number</span></br>
           <input type="button" id="btnSearch" value="search" class="btn btn-primary">
         </div>
         <div>

         </div>
      </section>
      <section class="col-sm-8">
        <table class="table table-hover table-striped table-bordered">
         <thead class="table-dark">
            <tr>
              <td class="text-center">#</td>
              <td class="text-center">Number</td>
              <td class="text-center">Name</td>
              <td class="text-center"><span id="spanUpdate">Update</td>
            <tr/>
          </thead>
          <tbody id="tableResult" class="table-striped">
          </tbody>
        </table>
        <div style="display:none" id="divUpdate">
        <p id="pUpdate"></p>
        <textarea id="textAreaUpdate" value="" maxlength="100" cols="50" rows="3">
        </textarea></br>
        <input type="button" id="btnSave" value="save" class="btn btn-warning">
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
