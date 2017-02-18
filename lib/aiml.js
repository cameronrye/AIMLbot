'use strict'
// const fs = require('fs')

let options = {
  name: 'bot'
}

class aiml {
  constructor (opt) {
    options = opt || {}
  }
  name () {
    return options.name
  }
  quit () {
    return 'bye bye'
  }
}

module.exports = aiml

