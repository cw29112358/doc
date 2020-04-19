### Webpack的Bundle Split和Code Split

Webpack 文件分离包括两个部分，一个是 Bundle 的分离，一个是 Code 代码的分离:

+ Bundle splitting: 实际上就是创建多个更小的文件，并行加载，以获得更好的缓存效果；主要的作用就是使浏览器并行下载，提高下载速度。并且运用浏览器缓存，只有代码被修改，文件名中的哈希值改变了才会去再次加载。

+ Code splitting: 只加载用户最需要的部分，其余的代码都遵从懒加载的策略；主要的作用就是加快页面加载速度，不加载不必要加载的东西。

### Webpack 热更新实现原理分析

+ Webpack编译期，为需要热更新的 entry 注入热更新代码(EventSource通信)

+ 页面首次打开后，服务端与客户端通过 EventSource 建立通信渠道，把下一次的 hash 返回前端

+ 客户端获取到hash，这个hash将作为下一次请求服务端 hot-update.js 和 hot-update.json的hash

+ 修改页面代码后，Webpack 监听到文件修改后，开始编译，编译完成后，发送 build 消息给客户端

+ 客户端获取到hash，成功后客户端构造hot-update.js script链接，然后插入主文档

+ hot-update.js 插入成功后，执行hotAPI 的 createRecord 和 reload方法，获取到 Vue 组件的 render方法，重新 render 组件， 继而实现 UI 无刷新更新。