const msw = require('msw/node');
const handlers = require('./handlers.js')

const server = msw.setupServer(...handlers)

module.exports = server
