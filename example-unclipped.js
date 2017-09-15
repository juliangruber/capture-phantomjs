const capture = require('.')
const fs = require('fs')

capture({
  url: 'https://twitter.com/',
  width: 1024,
  height: 768,
  clip: false
}).then(screenshot => {
  fs.writeFileSync(`${__dirname}/example-unclipped.png`, screenshot)
  console.log('open example-unclipped.png')
})
