const express = require("express");
const fs = require("fs");
const Vue = require("vue");
const vueServerRenderer = require("vue-server-renderer");

// 生成一個渲染器
const renderer = vueServerRenderer.createRenderer({
  template: fs.readFileSync("./index.template.html", "utf-8"),
});

// 創建一個express實例
const server = express();

const createApp = () => {
  const app = new Vue({
    template: `
      <div id="app">
        <h1>Hello {{ message }}</h1>
        <input v-model="message">
      </div>
    `,
    data: {
      message: "world",
    },
  });
  return app;
};

server.get("/foo", (req, res) => {
  const app = createApp();

  app.message = "世界";
  res.send("foo");
});

server.get("/", async (req, res) => {
  try {
    const app = createApp();
    const ret = await renderer.renderToString(app, {
      title: "自定义页面标题",
      meta: `
        <meta name="description" content="hello world">
      `,
    });
    res.end(ret);
  } catch (err) {
    res.status(500).end("Internal Server Error.");
  }
});

server.listen(3000, function () {
  console.log("server running at port 3000.");
});
