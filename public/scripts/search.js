'use strict';

const btnSearch = document.querySelector('#btnSearch');
const inpSearch = document.querySelector('#inpSearch');
const spanNumber = document.querySelector('#spanNumber');
const spanName = document.querySelector('#spanName');

const hideButton = param => {
  if (param === true) {
    btnSearch.disabled = 1;
    inpSearch.disabled = 1;
  } else {
    btnSearch.disabled = 0;
    inpSearch.disabled = 0;
  }
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
  .then(json => spanNumber.innerText = json);
});
