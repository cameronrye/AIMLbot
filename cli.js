#!/usr/bin/env node
'use strict'

try {
  require('./lib/cli').run()
} catch (err) {
  console.error(`\n ${err.message}`)
  process.exit(1)
}
