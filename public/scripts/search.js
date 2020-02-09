'use strict';

const btnSearch = document.querySelector('#btnSearch');
const divUpdate = document.querySelector('#divUpdate');
const inpSearch = document.querySelector('#inpSearch');
const pUpdate = document.querySelector('#pUpdate');
const spanResult = document.querySelector('#spanResult');
const spanUpdate = document.querySelector('#spanUpdate');
const tableResult = document.querySelector('#tableResult');
const textAreaUpdate = document.querySelector('#textAreaUpdate');
const btnSave = document.querySelector('#btnSave');
const radios = document.querySelectorAll("input[name='radio']");

let visibleCount = 0;

const urls = {
  'number': '/getnumber',
  'name': '/getname'
};

const hideButton = (param, arr) => {
  for (const item of arr) {
    item.disabled = param;
  }
};

const display = (param, arr) => {
  for (const item of arr) {
    item.style.display = param;
  }
};

const getChecked = arr => {
  for (const checkbox of arr) {
    if (checkbox.checked === true) return checkbox.dataset.field;
  };
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
  visibleCount = 0;
};

const addClick = element => {
  element.addEventListener('click', () => {
    const counter = element.dataCounter;
    const tdNumber = document.querySelector('#tdNumber' + counter);
    const tdName = document.querySelector('#tdName' + counter);
    pUpdate.innerText = tdNumber.innerText;
    textAreaUpdate.value = tdName.innerText;
    display('block', [divUpdate]);
  });
};

const fillTable = obj => {
  let counter = 0;
  removeTr();
  if (obj) {
    for (const val of obj) {
      const tableTr = createElem('tr');
      tableTr.setAttribute('name', 'trIsAdded');
      const tableTdCounter = createElem('td', ++counter);
      tableTdCounter.classList.add('text-center');
      tableTr.appendChild(tableTdCounter);
      const tableTdNumber = createElem('td', val.number);
      tableTdNumber.id = 'tdNumber' + counter;
      tableTdNumber.classList.add('text-center');
      tableTr.appendChild(tableTdNumber);
      const tableTdName = createElem('td', val.name);
      tableTdName.id = 'tdName' + counter;
      tableTr.appendChild(tableTdName);
      const tableTdUpdate = createElem('td', '');
      tableTdUpdate.classList.add('text-center');
      tableTr.appendChild(tableTdUpdate);
      const tdUpdateButton = createElem('input');
      tdUpdateButton.type = 'button';
      tdUpdateButton.name = 'btnUpdate';
      tdUpdateButton.value = 'update';
      tdUpdateButton.dataCounter = counter;
      tdUpdateButton.classList.add('btn-secondary');
      tdUpdateButton.style.visibility = 'hidden';

      addClick(tdUpdateButton);
      tableTdUpdate.appendChild(tdUpdateButton);
      tableResult.appendChild(tableTr);
    }
  }
};

const parseData = (data, hidden) => {
  const len = data.length;
  if (len === 0) {
    spanResult.innerText = 'any results';
    fillTable();
  } else {
    spanResult.innerText = `found ${len} result(s)`;
    fillTable(data);
  }
  hideButton(0, hidden);
};

btnSearch.addEventListener('click', () => {
  const field = getChecked(radios);
  const url = urls[field];
  const data = inpSearch.value;
  if (data.length === 0) return;
  display('none', [divUpdate]);
  hideButton(1, [btnSearch]);
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())
    .then(json => {
      parseData(json, [btnSearch]);
    });
});

spanUpdate.addEventListener('mouseover', e => {
  if (visibleCount > 0) return;
  const buttons = document.querySelectorAll("input[name='btnUpdate']");
  for (const button of buttons) {
    button.style.visibility = 'visible';
    visibleCount++;
    setTimeout(() => {
      button.style.visibility = 'hidden';
      if (visibleCount > 0) {
        visibleCount--;
      }
    }, 10000);
  }
});

btnSave.addEventListener('click', () => {
  const number = pUpdate.innerText.trim();
  const name = textAreaUpdate.value.trim();
  if (number.length > 0 && name.length > 0) {
    const data = { number, name };
    hideButton(1, [btnSave, textAreaUpdate]);
    fetch('/update', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(json => {
        textAreaUpdate.value = '';
        display('none', [divUpdate]);
        parseData(json, [btnSave, textAreaUpdate]);
      });
  }
});
