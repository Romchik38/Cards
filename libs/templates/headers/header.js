'use strict';

const templateHeader = parameters => {
  const data = `
    <header>
      <h1>Adding and viewing cards</h1>
      <h2>Wellcome to our site</h2>
      <hr />
    </header>
    <nav>
       <h2>Menu</h2>
       <ul>
         <li><a href="/" target="_self">Main page</a></li>
       </ul>
    </nav>
  `;
  return data;
};

module.exports = templateHeader;
