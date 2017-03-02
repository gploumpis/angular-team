'use strict'

module.exports = require('angular')
.module('app.core',[
  require('../blocks/router/router.module.js').name
])
.config(require('./core.config.js'))
.config(require('./core.route.js'));
