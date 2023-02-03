// entry-server.js
import { createApp } from "./app";

export default async (context) => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  const { app, router } = createApp();

  const meta = app.$meta()

  router.push(context.url);

  context.meta = meta

  // 等 router 将可能的异步组件和钩子函数解析完
  await new Promise(router.onReady.bind(router));


  return app;
};

// export default (context) => {
//   // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
//   // 以便服务器能够等待所有的内容在渲染前，
//   // 就已经准备就绪。
//   return new Promise((resolve, reject) => {
//     const { app, router } = createApp();

//     // 设置服务器端 router 的位置
//     router.push(context.url);

//     // 等到 router 将可能的异步组件和钩子函数解析完
//     router.onReady(() => {
//       // 路由已处理404
//       // const matchedComponents = router.getMatchedComponents()
//       // 匹配不到的路由，执行 reject 函数，并返回 404
//       // if (!matchedComponents.length) {
//       //   return reject({ code: 404 })
//       // }

//       // Promise 应该 resolve 应用程序实例，以便它可以渲染
//       resolve(app);
//     }, reject);
//   });
// };
