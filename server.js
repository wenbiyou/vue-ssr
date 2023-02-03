const express = require("express");
const fs = require("fs");
const { createBundleRenderer } = require("vue-server-renderer");
const setupDevServer = require("./build/setup-dev-server");

const server = express();

// express.static 处理物理磁盘
server.use("/dist", express.static("./dist"));

const isProd = process.env.NOD_ENV === "production";
let renderer;
let onReady;
if (isProd) {
  const serverBundle = require("./dist/vue-ssr-server-bundle.json");
  const template = fs.readFileSync("./index.template.html", "utf-8");
  const clientManifest = require("./dist/vue-ssr-client-manifest.json");

  renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
  });
} else {
  // 开发模式 -》监视打包构建 -》重新生成 Renderer 渲染器
  onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
    renderer = createBundleRenderer(serverBundle, {
      template,
      clientManifest,
    });
  });
}

const render = async (req, res) => {
  try {
    const html = await renderer.renderToString({
      url: req.url,
      title: "服务端渲染",
      meta: `
        <meta name="description" content="hello ssr">`,
    });
    res.setHeader("Content-Type", "text/html; charset=utf8");
    res.end(html);
  } catch (err) {
    res.status(500).end("Internal Server Error.");
  }
};
server.get(
  "*",
  isProd
    ? render
    : async (req, res) => {
        await onReady;
        render(req, res);
      }
);
server.listen(3000, () => {
  console.log("server running at port 3000.");
});
