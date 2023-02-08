# vue-ssr

基于Vue2的同构应用

## 基本使用

***将一个vue实例渲染为HTML字符串***

* 使用vue-server-renderer创建一个渲染renderer
* 调用renderer内部的renderToString方法将vue实例渲染为html

***与服务器集成***

* 使用express创建一个基本的web服务器
* 在web服务器中渲染vue实例

## 构建同构渲染

* 客户端应用程序和服务器端应用程序都要用webpack打包
* 服务器需要服务器bundle用于服务端渲染SSR
* 客户端的bundle会发送给浏览器，用于混合静态标记

***源码结构***

* app.js 通用入口
* entry-client.js 客户端入口，创建应用程序，并将其挂载到DOM中
* entry-server.js 服务端入口，创建和返回应用程序、服务器端路由匹配和数据预取逻辑
* server.js 通用web服务启动脚本

***解析渲染流程***

服务端渲染

* renderer.renderToString 渲染数据
* 用createBundleRenderer 传入serverBundle创建一个renderer
* 把渲染结果注入到模版中

客户端渲染

* vue-ssr-client-manifest.json
  * publicPath: 静态资源的根相对路径
  * all: 打包后所有静态资源文件路径
  * initial: 页面初始化要加载的文件，配置到preload中，提前加载
  * async: 页面跳转时要加载的文件，配置到prefecth中，空闲时加载
  * modules: 项目的各个模块包含文件的序号

***打包问题***

生成模式：先构建，再启动应用

```
npm run build

node server.js
```

开发模式: 监视代码变动自动构建实现热更新，再启动应用

***将打包结果存储到内存中***

webpack默认会把打包后的bundle存储在磁盘中，在生产环境没有问题；但在开发环境由于频繁操作磁盘会极大的影响开发效率，所以开发环境需要将打包后的bundle存储在内存中。

* 使用webpack-dev-middleware，以监听模式启动webpack,将编译结果输出到内存中，再将内存文件输出到express服务中
* 使用memfs实现将webpack打包结果输出到内存中进行管理

***热更新***

使用webpack-hot-middleware，

* webpack-hot-middleware 侦听编译器事件
* 每个连接的客户端都有一个 Server Send Events 连接，服务器将在编译器事件上向连接的客户端发布通知
* 当客户端接收到消息时，它将检查本地代码是否为最新。如果不是，将触发webpack热模块重新加载

## 编写通用应用注意事项

***服务器上的数据响应？***

每个请求应该是全新的、独立的应用程序实例；

禁止响应式数据，避免将数据转换为响应式对象的性能开销；

***生命周期函数？***

只有beforeCreate 和 created 会在SSR过程被调用，其他生命周期钩子只会在客户端执行

***特定平台的Api？***

如window或document只能在浏览器使用的全局变量，在node中会报错；

用于不同平台Api的任务，平台特定实现包含在通用Api中，如axios是http客户端，向服务器和客户端都暴露相同的api;

***自定义指令***

大多自定义指令直接操作Dom,因此会在SSR中导致错误；

1.推荐组件作为抽象机制，并运行在 虚拟dom层级，如使用渲染函数；

2.在创建服务器renderer时，使用directives选项提供‘服务器端版本’

## 管理不同页面Head内容

[VueMeta](https://vue-meta.nuxtjs.org/)

## 数据预取和状态管理

Vuex
