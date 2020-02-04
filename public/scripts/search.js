'use strict';

const btnSearch = document.querySelector('#btnSearch');
const inpSearch = document.querySelector('#inpSearch');
const spanResult = document.querySelector('#spanResult');
const tableResult = document.querySelector('#tableResult');

const hideButton = param => {
  if (param === true) {
    btnSearch.disabled = 1;
    inpSearch.disabled = 1;
  } else {
    btnSearch.disabled = 0;
    inpSearch.disabled = 0;
  }
};

const createElem = (tag, value = '') => {
  const element = document.createElement(tag);
  element.innerText = value;
  return element;
};

const removeTr = () => {
  const trDel = tableResult.querySelectorAll("tr[name='trIsAdded']");
  for (const val of trDel) {
    val.remove();
  }
};

const fillTable = obj => {
  removeTr();
  if (obj) {
    for (const val of obj) {
      const tableTr = createElem('tr');
      tableTr.setAttribute('name', `trIsAdded`);
      const tableTdNumber = createElem('td', val.number);
      tableTr.appendChild(tableTdNumber);
      const tableTdName = createElem('td', val.name);
      tableTr.appendChild(tableTdName);
      tableResult.appendChild(tableTr);
    }
  }
};

const parseData = data => {
  const len = data.length;
  if (len === 0) {
    spanResult.innerText = 'any results';
    fillTable();
  } else {
    spanResult.innerText = `found ${len} result(s)`;
    fillTable(data);
  }
  hideButton(false);
};

btnSearch.addEventListener('click', () => {
  const data = inpSearch.value;
  if (data.length === 0) return;
  hideButton(true);
  fetch('/getnumber', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
    'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(json => {
    parseData(json);
  });
});
