'use strict';

const btnAdd = document.querySelector('#btnAdd');
const textArea1 = document.querySelector('#textArea1');
const spanResult = document.querySelector('#spanResult');
const tableResult = document.querySelector('#tableResult');

const hideButton = param => {
  if (param === true) {
    btnAdd.disabled = 1;
    textArea1.disabled = 1;
  } else {
    btnAdd.disabled = 0;
    textArea1.disabled = 0;
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
    spanResult.innerText = 'error, new card wasn\'t created';
    fillTable();
  } else {
    spanResult.innerText = `new card added`;
    fillTable(data);
  }
  hideButton(false);
};

btnAdd.addEventListener('click', () => {
  const data = textArea1.value;
  if (data.length === 0) return;
  hideButton(true);
  fetch('/addcard', {
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
