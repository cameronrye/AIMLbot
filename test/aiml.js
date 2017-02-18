'use strict'

const test = require('ava')
const AIML = require('../lib/aiml')

let name = 'zia'
let bot = new AIML({ 'name': name })

test('Bot Name', t => {
  t.is(bot.name(), name)
})

test('Bot Termination', t => {
  t.is(bot.quit(), 'bye bye')
})
