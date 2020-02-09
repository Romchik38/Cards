'use strict';

const templateHeader = parameters => {
  const { menu, url } = parameters;
  let data = `
    <body>
      <div class="container">
      <header>
        <h2>Adding and viewing cards</h1>
        <p>Wellcome to our site</p>
        <hr/>
      </header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">`;
          for (const page of menu) {
            let active = '';
            if (page.url === url) active = 'active';
            data += `<li class="nav-item ${active}"><a href="${page.url}" target="_self" class="nav-link">${page.name}</a></li>`;
          }
          data += `
          </ul>
        </div>
      </nav>
  `;
  return data;
};

module.exports = templateHeader;
