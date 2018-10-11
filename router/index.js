const payment = require('../services/controller/payment')
const ratelimit = require('koa-ratelimit')
const Redis = require('ioredis')

module.exports = function(routers) {
  // button
  routers.get('/:symbol/:amount/:text', payment.create)
}