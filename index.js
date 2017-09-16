const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const { path: phantomjs } = require('phantomjs')
const { Buffer } = require('safe-buffer')

const If = (cond, val) => (cond ? val : '')

module.exports = ({
  url,
  width: width = 1024,
  height: height = 768,
  timeout: timeout = 0,
  format: format = 'png',
  clip: clip = true,
  ignoreSSLErrors: ignoreSSLErrors = false,
  SSLCertificatesPath,
  SSLProtocol
}) =>
  exec(
    `${phantomjs} ${[
      `--ignore-ssl-errors=${ignoreSSLErrors}`,
      If(SSLCertificatesPath, `--ssl-certificates-path=${SSLCertificatesPath}`),
      If(SSLProtocol, `--ssl-protocol=${SSLProtocol}`),
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
