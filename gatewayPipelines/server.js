const path = require('path');
const gateway = require('express-gateway');
require('./user')
require('./class')
gateway()
  .load(path.join(__dirname, 'config'))
  .run();
