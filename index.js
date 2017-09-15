const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const { path: phantomjs } = require('phantomjs')
const { Buffer } = require('safe-buffer')

module.exports = ({
  url,
  width: width = 1024,
  height: height = 768,
  timeout: timeout = 0,
  format: format = 'png',
  clip: clip = true,
  ignoreSSLErrors: ignoreSSLErrors = false
}) =>
  exec(
    `${phantomjs} ${[
      `--ignore-ssl-errors=${ignoreSSLErrors}`,
      `${__dirname}/script/render.js`,
      url,
      width,
      height,
      timeout,
      format.toUpperCase(),
      clip
    ].join(' ')}`,
    { maxBuffer: Infinity }
  ).then(({ stdout }) => Buffer.from(stdout, 'base64'))
