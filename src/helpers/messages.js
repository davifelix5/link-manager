const messages = require('../config/messages.json')

const getMessage = path => messages[path]

module.exports = { getMessage }
