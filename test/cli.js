'use strict'

const childProcess = require('child_process')
const getStream = require('get-stream')
const path = require('path')
const test = require('ava')

const cliPath = path.join(__dirname, '../cli.js')

function execCli (args, opts, cb) {
  let dirname
  let env

  if (typeof opts === 'function') {
    cb = opts
    dirname = __dirname
    env = {}
  } else {
    dirname = path.join(__dirname, opts.dirname ? opts.dirname : '')
    env = opts.env || {}
  }

  let child
  let stdout
  let stderr

  const processPromise = new Promise(resolve => {
    child = childProcess.spawn(process.execPath, [path.relative(dirname, cliPath)].concat(args), {
      cwd: dirname,
      env,
      stdio: [null, 'pipe', 'pipe']
    })

    child.on('close', (code, signal) => {
      if (code) {
        const err = new Error(`test-worker exited with a non-zero exit code: ${code}`)
        err.code = code
        err.signal = signal
        resolve(err)
        return
      }

      resolve(code)
    })

    stdout = getStream(child.stdout)
    stderr = getStream(child.stderr)
  })

  Promise.all([processPromise, stdout, stderr]).then(args => {
    cb.apply(null, args)
  })

  return child
}

test('resolves files from package.json if none are specified on cli', t => {
  execCli([], {dirname: 'pkg-conf/resolve-files'}, (err, stdout, stderr) => {
    t.ifError(err)
    t.match(stderr, /a.aiml.js/)
    t.match(stderr, /b.aiml.js/)
    t.notMatch(stderr, /c.aiml.js/)
    t.notMatch(stdout, /c.aiml.js/)
    t.end()
  })
})

test('pkg-conf(resolve-dir): resolves tests from the package.json dir if none are specified on cli', t => {
  execCli([], {dirname: 'pkg-conf/resolve-dir/dir-a-wrapper'}, (err, stdout, stderr) => {
    t.ifError(err)
    t.match(stderr, /dir-a-base-1/)
    t.notmatch(stderr, /dir-a-base-2/)
    t.notMatch(stderr, /dir-a-wrapper/)
    t.notMatch(stdout, /dir-a-wrapper/)
    t.end()
  })
})

