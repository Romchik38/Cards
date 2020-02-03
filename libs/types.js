'use strict';

const getTemplate = require('./gettemplate');
const path = require('path');
const fs = require('fs');
const { projectPath } = require('./projectPath')
const { bigintFns } = require('./urlsBigint');

const DIR_PATH = projectPath;

const types = {
  'string': (param) => {
    const writeHead = [
      301,
      { 'Location': `${param}` },
    ];
    return { writeHead, data: '' };
  },
  'bigint': (param, page) => {
    const key = param.toString();
    const fn = bigintFns[key];
    fn(page);
    const response = JSON.stringify('working');
    const writeHead = [200];
    return { writeHead, data: response };
  },
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
