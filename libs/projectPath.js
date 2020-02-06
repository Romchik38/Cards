'use strict';

const { OS } = require('./consts.js');

const paths = {
  'linux': () => process.env.PWD,
  'win': () => {
    const HOME_DRIVE = process.env.HOMEDRIVE;
    const HOME_PATH = process.env.HOMEPATH;
    return HOME_DRIVE + HOME_PATH + '/Projects/cards';
  },
};

const path = os => {
  const makePath = paths[os];
  if (makePath) return makePath();
  else {
    throw new Error('##Check const \'os\' or code at projectPath.js');
  }
};

const projectPath = path(OS);

module.exports = { projectPath };
