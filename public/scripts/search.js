'use strict';

const btnSearch = document.querySelector('#btnSearch');
const inpSearch = document.querySelector('#inpSearch');

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
  if (inpSearch.value.length === 0) return;
  hideButton(true);
});
