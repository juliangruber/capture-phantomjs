/* global phantom */

var webpage = require('webpage')
var args = require('system').args
var noop = function () {}

var url = args[1]
var width = args[2]
var height = args[3]
var wait = Number(args[4])
var format = args[5]
var clip = args[6] === 'true'
var cookies = JSON.parse(args[7])

var page = webpage.create()
page.viewportSize = {
  width: width,
  height: height
}
page.clipRect = {
  top: 0,
  left: 0,
  width: clip ? width : 0,
  height: clip ? height : 0
}

cookies.forEach(function (cookie) {
  phantom.addCookie(cookie)
})

page.onConsoleMessage = page.onConfirm = page.onPrompt = page.onError = noop

page.open(url, function (status) {
  if (status !== 'success') {
    console.error('Unable to load')
    phantom.exit()
  }
  window.setTimeout(function () {
    page.evaluate(function () {
      if (!document.body.style.background) {
        document.body.style.backgroundColor = 'white'
      }
    })
    console.log(page.renderBase64(format))
    phantom.exit()
  }, wait)
})
