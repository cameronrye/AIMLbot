'use strict'

const test = require('ava')
const AIML = require('../lib/aiml')

let bot = new AIML()

test('Bot Termination', t => {
  t.is(bot.quit(), 'bye bye')
})
