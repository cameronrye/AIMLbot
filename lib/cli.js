'use strict'
const arrify = require('arrify')
// const fs = require('fs')
const meow = require('meow')
const pkgConf = require('pkg-conf')

exports.run = () => {
  const conf = pkgConf.sync('aiml')
  const cli = meow(`
    Usage
        aimlbot [<file|directory> ...]
  
      Options
        --help                 This help screen
  
      Examples
        aimlbot
        aimlbot bot.aiml
        aimlbot /aiml
        
  `)

  const files = cli.input.length ? cli.input : arrify(conf.files)
  console.log('files', files)
}
