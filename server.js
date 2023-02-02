const express = require('express')
const fs = require('fs')
const Vue = require('vue')

const server = express()

const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./index.template.html', 'utf-8')
})

const context = {
  title: 'vue ssr',
  metas: `
      <meta name="keyword" content="vue,ssr">
      <meta name="description" content="vue srr demo">
  `,
};


server.get('/', (req, res) => {
  const app = new Vue({
    template: `<div>{{ message }}</div>`,
    data: {
      message: "hello vue-ssr"
    }
  })
  
  renderer.renderToString(app, context, (err, html) => {
    console.log('ngz-ceshi', `${err}`)
    if (err) {
      return res.status(500).send('Internal Server Error!')
    }
    res.send(html)
  })
})

server.listen(3000, function() {
  console.log('server running at port 3000.')
})


