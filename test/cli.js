'use strict'

const path = require('path')
const test = require('ava')

const cliPath = path.join(__dirname, '../cli.js')

console.log(cliPath)

function execCli () {

}

test('Bot Termination', (t) => {
//  t.is(bot.quit(), 'bye bye')
  execCli()
})
