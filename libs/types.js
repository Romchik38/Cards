'use strict';

const getTemplate = require('./gettemplate');
const path = require('path');
const fs = require('fs');

// Заплатка для windows. в linux нужно по другому
const HOME_DRIVE = process.env.HOMEDRIVE;
const HOME_PATH = process.env.HOMEPATH;
const DIR_PATH = HOME_DRIVE + HOME_PATH + '/Projects/cards/';

const types = {
  'string': (param) => {
    const writeHead = [
      301,
      { 'Location': `${param}` },
    ];
    return { writeHead, data: '' };
  },
  'bigint': () => {},
  'boolean': () => {},
  'function': (param, page) => {
    getTemplate(page);
    param(page);
    const html = page.htmlTemplate(page.parameters);
    const writeHead = [200];
    return { writeHead, data: html };
  },
  'number': () => {},
  'object': (param, page) => {
    const url = page.url;
    const ext = path.extname(url);
    const folder = param[ext];
    if (folder) {
      const filePath = `${DIR_PATH}${folder}${url}`;
      console.log(filePath);
      try {
        const data = fs.readFileSync(filePath);
        return { writeHead: [200], data };
      } catch (e) {
        console.log('Error', e);
        return { writeHead: [404], data: '<h1>File not found</h1>' };
      }
    } else {
      const writeHead = [404];
      return {
        writeHead,
        data: `<h1>Not Found</h1>\nThe Url ${page.url} was not found on our
          site`,
      };
    }
  },
  undefined: (param, page) => {
    getTemplate(page);
    const html = page.htmlTemplate();
    const writeHead = [404];
    return { writeHead, data: html };
  },
};

module.exports = types;
