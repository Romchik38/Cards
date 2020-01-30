'use strict';

const fs = require('fs');
const path = require('path');

// Заплатка для windows. в linux нужно по другому
const HOME_DRIVE = process.env.HOMEDRIVE;
const HOME_PATH = process.env.HOMEPATH;
const DIR_PATH = HOME_DRIVE + HOME_PATH + '/Projects/cards/database/';

const dir = fs.readdirSync(DIR_PATH);
const base = Object.create(null);
const addTable = (name, table) => {
  base[name] = table;
};

for (const fileName of dir) {
  const table = JSON.parse(fs.readFileSync(DIR_PATH + fileName));
  const onlyName = path.parse(fileName)['name'];
  addTable(onlyName, table);
}

const database = (name, callback) => {
  const table = base[name];
  const result = [];
  for (const item of table) {
    const res = callback(item);
    if (res) result.push(res);
  }
  if (result.length > 0) return result;
};

module.exports = database;
