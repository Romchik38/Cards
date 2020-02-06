'use strict';

const fs = require('fs');
const path = require('path');

const { projectPath } = require('./projectPath');

const DIR_PATH = projectPath + '/database/';

const dir = fs.readdirSync(DIR_PATH);
const base = Object.create(null);

const addTable = (name, table) => {
  base[name] = table;
};

const read = fileName => JSON.parse(fs.readFileSync(DIR_PATH + fileName));

for (const fileName of dir) {
  const data = read(fileName);
  const tableName = path.parse(fileName)['name'];
  addTable(tableName, data);
}

const write = (fileName, arr) => {
  const data = JSON.stringify(arr);
  fs.writeFileSync(DIR_PATH + fileName, data);
};

const serializer = {
  'select': (name, callback) => {
    const table = base[name];
    const result = [];
    for (const item of table) {
      const res = callback(item);
      if (res) result.push(res);
    }
    if (result.length > 0) return result;
  },
  'insert': (name, callback) => {
    const table = base[name];
    const item = callback();
    table.push(item);
    const fileName = name + '.json';
    write(fileName, table);
    const data = read(fileName);
    base[name] = data;
  }
};

const database = (name, operation, callback) => {
  const serialize = serializer[operation];
  return serialize(name, callback);
};

module.exports = database;
