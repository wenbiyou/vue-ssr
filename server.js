const express = require('express')
const fs = require('fs')
const Vue = require('vue')

const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./index.template.html', 'utf-8')
})

const server = express()

server.get('/', (req, res) => {
  const app = new Vue({
    template: `<div>{{ message }}</div>`,
    data: {
      message: "hello vue-ssr"
    }
  })
  
  renderer.renderToString(app, (err, html) => {
    if (err) {
      return res.status(500).send('Internal Server Error!')
    }
    res.send(html)
  })
})

server.listen(3000, function() {
  console.log('server running at port 3000.')
})


