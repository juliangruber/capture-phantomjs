const capture = require('.')
const fs = require('fs')

capture({
  url: 'https://twitter.com/',
  width: 1024,
  height: 768
}).then(screenshot => {
  fs.writeFileSync(`${__dirname}/example.png`, screenshot)
  console.log('open example.png')
})
