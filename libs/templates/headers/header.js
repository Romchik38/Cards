'use strict';

const templateHeader = parameters => {
  const { menu, url } = parameters;
  let data = `
    <body>
      <div class="container">
        <div class="container">
          <header class="row align-items-center">
            <div class="col-sm-2">
              <img src="/cards-logo.jpg" alt="Cards - manage your clients easily">
            </div>
            <div class="col-sm-10">
              <h2 class="text-center">Cards - manage your client easily</h2>
              <p class="text-center">Wellcome to our site</p>
            </div>
            <hr/>
          </header>
        </div>
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
