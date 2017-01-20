'use strict'
// const fs = require('fs')

class aiml {
  constructor (options) {
    options = options || {}
    console.log(options)
  }
  quit () {
    return 'bye bye'
  }
}

module.exports = aiml
