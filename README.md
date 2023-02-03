# vue-ssr

基于Vue2的同构应用

## 编写通用应用注意事项

服务器上的数据响应？

每个请求应该是全新的、独立的应用程序实例；

禁止响应式数据，避免将数据转换为响应式对象的性能开销；

生命周期函数？

只有beforeCreate 和 created 会在SSR过程被调用，其他生命周期钩子只会在客户端执行

特定平台的Api？

如window或document只能在浏览器使用的全局变量，在node中会报错；

用于不同平台Api的任务，讲义讲平台特定实现包含在通用Api中，如axios是http客户端，向服务器和客户端都暴露相同的api;

自定义指令

大多自定义指令直接操作Dom,因此会在SSR中导致错误；

1.推荐组件作为抽象机制，并运行在 虚拟dom层级，如使用渲染函数；

2.在创建服务器renderer时，使用directives选项提供‘服务器端版本’

## 管理不同页面Head内容

[VueMeta](https://vue-meta.nuxtjs.org/)

## 数据预取和状态管理

Vuex
