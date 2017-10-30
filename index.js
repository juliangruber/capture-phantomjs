const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const { path: phantomjs } = require('phantomjs')
const { Buffer } = require('safe-buffer')
const escape = require('shell-escape')

const If = (cond, val) => (cond ? val : '')

module.exports = ({
  url,
  width: width = 1024,
  height: height = 768,
  wait: wait = 0,
  format: format = 'png',
  clip: clip = true,
  cookies: cookies = [],
  ignoreSSLErrors: ignoreSSLErrors = false,
  SSLCertificatesPath,
  SSLProtocol
}) =>
  exec(
    escape([
      phantomjs,
      `--ignore-ssl-errors=${ignoreSSLErrors}`,
      If(SSLCertificatesPath, `--ssl-certificates-path=${SSLCertificatesPath}`),
      If(SSLProtocol, `--ssl-protocol=${SSLProtocol}`),
      `${__dirname}/script/render.js`,
      url,
      width,
      height,
      wait,
      format.toUpperCase(),
      clip,
      JSON.stringify(cookies)
    ]),
    { maxBuffer: Infinity }
  ).then(({ stdout }) => Buffer.from(stdout, 'base64'))
