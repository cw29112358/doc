### loader
+ happypack: 通过多进程允许并行转换多个文件，从而加快 webpack 的构建速度
+ cache-loader：在一些性能开销较大的 loader 之前添加此 loader，以将结果缓存到磁盘里
+ @svgr/webpack：支持 webpack 加载 svg 文件
+ url-loader：将文件加载为 base64 编码的 URL
+ file-loader：指示 webpack 将所需的对象作为文件发出并返回其公共 URL
+ style-loader：通过注入 <style> 标签将 CSS 添加到 DOM
+ css-loader: 解释(interpret) @import 和 url()，会 import/require() 后再解析(resolve)它们
+ sass-loader: 加载 SASS/SCSS 文件并将其编译为 CSS
+ fast-sass-loader
  + 在大型 SASS 项目中，比 sass-loader 快 5〜10 倍
  + 支持 sass 文件重复数据删除，永远不用担心在不同地方 @import 同一文件
  + 支持 url 解析，永远不用担心这个问题url(...)
+ postcss-loader: Loader for webpack to process CSS with PostCSS
  + postcss-flexbugs-fixes: PostCSS 插件,试图解决所有 flex-bug
  + postcss-remove-google-fonts：PostCSS 插件,移除 google 字体的导入
  + autoprefixer：PostCSS 插件,用于解析 CSS 并使用 Can I Use 中的值向 CSS 规则添加前缀

### plugins
+ happypack: 通过多进程允许并行转换多个文件，从而加快 webpack 的构建速度
+ webpackbar：用于 Webpack 的优雅 ProgressBar 和 Profiler
+ webpack-notifier：使用 node-notifier 包向用户显示构建状态系统通知，从构建失败中恢复后，该插件将通知您有关第一次运行(成功/失败)，所有失败的运行以及第一次成功运行的信息。换句话说：如果您的构建一切正常，它将保持沉默
+ webpack-chunk-rename-plugin: 有助于 Webpack 中的块命名
+ copy-webpack-plugin: 将单个文件或整个目录（已存在）复制到构建目录
+ mini-css-extract-plugin：将 CSS 提取到单独的文件中。它为每个包含 CSS 的 JS 文件创建一个 CSS 文件。它支持 CSS 和 SourceMap 的按需加载
+ optimize-css-assets-webpack-plugin: 在 webpack 构建期间搜索 CSS 文件，并优化/最小化 CSS
+ webpack-bundle-analyzer：使用交互式可缩放树图可视化 webpack 输出文件的大小

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