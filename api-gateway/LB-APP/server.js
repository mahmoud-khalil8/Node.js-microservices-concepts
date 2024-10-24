//round robin load balancing 
const path = require('path');
const gateway = require('express-gateway');
require('./app1')
require('./app2')
require('./app3')
gateway()
  .load(path.join(__dirname, 'config'))
  .run();
