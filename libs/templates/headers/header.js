'use strict';

const templateHeader = parameters => {
  const data = `
    <header>
      <h2>Adding and viewing cards</h1>
      <p>Wellcome to our site</p>
      <hr/>
    </header>
    <nav>
       <h2>Menu</h2>
       <ul>
         <li><a href="/" target="_self">Main page</a></li>
         <li><a href="/search" target="_self">Search</a></li>
         <li><a href="/add" target="_self">Add</a></li>
       </ul>
    </nav>
  `;
  return data;
};

module.exports = templateHeader;
