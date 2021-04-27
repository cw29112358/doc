### loader

- happypack: 通过多进程允许并行转换多个文件，从而加快 webpack 的构建速度
- cache-loader：在一些性能开销较大的 loader 之前添加此 loader，以将结果缓存到磁盘里
- @svgr/webpack：支持 webpack 加载 svg 文件
- url-loader：将文件加载为 base64 编码的 URL
- file-loader：指示 webpack 将所需的对象作为文件发出并返回其公共 URL
- style-loader：通过注入 <style> 标签将 CSS 添加到 DOM
- css-loader: 解释(interpret) @import 和 url()，会 import/require() 后再解析(resolve)它们
- sass-loader: 加载 SASS/SCSS 文件并将其编译为 CSS
- fast-sass-loader
  - 在大型 SASS 项目中，比 sass-loader 快 5〜10 倍
  - 支持 sass 文件重复数据删除，永远不用担心在不同地方 @import 同一文件
  - 支持 url 解析，永远不用担心这个问题 url(...)
- postcss-loader: Loader for webpack to process CSS with PostCSS
  - postcss-flexbugs-fixes: PostCSS 插件,试图解决所有 flex-bug
  - postcss-remove-google-fonts：PostCSS 插件,移除 google 字体的导入
  - autoprefixer：PostCSS 插件,用于解析 CSS 并使用 Can I Use 中的值向 CSS 规则添加前缀

### plugins

- happypack: 通过多进程允许并行转换多个文件，从而加快 webpack 的构建速度
- webpackbar：用于 Webpack 的优雅 ProgressBar 和 Profiler
- webpack-notifier：使用 node-notifier 包向用户显示构建状态系统通知，从构建失败中恢复后，该插件将通知您有关第一次运行(成功/失败)，所有失败的运行以及第一次成功运行的信息。换句话说：如果您的构建一切正常，它将保持沉默
- webpack-chunk-rename-plugin: 有助于 Webpack 中的块命名
- copy-webpack-plugin: 将单个文件或整个目录（已存在）复制到构建目录
- mini-css-extract-plugin：将 CSS 提取到单独的文件中。它为每个包含 CSS 的 JS 文件创建一个 CSS 文件。它支持 CSS 和 SourceMap 的按需加载
- optimize-css-assets-webpack-plugin: 在 webpack 构建期间搜索 CSS 文件，并优化/最小化 CSS
- webpack-bundle-analyzer：使用交互式可缩放树图可视化 webpack 输出文件的大小

### Webpack 的 Bundle Split 和 Code Split

Webpack 文件分离包括两个部分，一个是 Bundle 的分离，一个是 Code 代码的分离:

- Bundle splitting: 实际上就是创建多个更小的文件，并行加载，以获得更好的缓存效果；主要的作用就是使浏览器并行下载，提高下载速度。并且运用浏览器缓存，只有代码被修改，文件名中的哈希值改变了才会去再次加载。

- Code splitting: 只加载用户最需要的部分，其余的代码都遵从懒加载的策略；主要的作用就是加快页面加载速度，不加载不必要加载的东西。

### Webpack 热更新实现原理分析

- Webpack-complier ：webpack 的编译器，将 JavaScript 编译成 bundle（就是最终的输出文件）
- Bunble Server：提供文件在浏览器的访问，也就是我们平时能够正常通过 localhost 访问我们本地网站的原因
- HMR Server：将热更新的文件输出给 HMR Runtime
- HMR Runtime：开启了热更新的话，在打包阶段会被注入到浏览器中的 bundle.js，这样 bundle.js 就可以使用 websocket  跟服务器建立连接，当收到服务器的更新指令的时候，就去更新文件的变化
- bundle.js：构建输出的文件

### 基本概念

- Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
- Plugin：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情

### 流程概括

- 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
- 确定入口：根据配置中的 entry 找出所有的入口文件；
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
- 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

### 编写 Loader

Loader 就像是一个翻译员，能把源文件经过转化后输出新的结果，并且一个文件还可以链式的经过多个翻译员翻译。

以处理 SCSS 文件为例：

- SCSS 源代码会先交给 sass-loader 把 SCSS 转换成 CSS；
- 把 sass-loader 输出的 CSS 交给 css-loader 处理，找出 CSS 中依赖的资源、压缩 CSS 等；
- 把 css-loader 输出的 CSS 交给 style-loader 处理，转换成通过脚本加载的 JavaScript 代码；

可以看出以上的处理过程需要有顺序的链式执行，先 sass-loader 再 css-loader 再 style-loader。

### Loader 的职责

一个 Loader 的职责是单一的，只需要完成一种转换。 如果一个源文件需要经历多步转换才能正常使用，就通过多个 Loader 去转换。 在调用多个 Loader 去转换一个文件时，每个 Loader 会链式的顺序执行， 第一个 Loader 将会拿到需处理的原内容，上一个 Loader 处理后的结果会传给下一个接着处理，最后的 Loader 将处理后的最终结果返回给 Webpack。

所以，在你开发一个 Loader 时，请保持其职责的单一性，你只需关心输入和输出。

### webpack 配置优化

- 优化 Loader 配置：Loader 处理文件的转换操作是很耗时的，所以需要让尽可能少的文件被 Loader 处理（include、exclude）
- 优化 resolve.modules 配置：resolve.modules 用于配置 webpack 去哪些目录下寻找第三方模块，默认是['node_modules']，但是，它会先去当前目录的./node_modules 查找，没有的话再去../node_modules 最后到根目录；所以当安装的第三方模块都放在项目根目录时，就没有必要安默认的一层一层的查找，直接指明存放的绝对位置
- 优化 resolve.extensions 配置：
  - 在导入没带文件后缀的路径时，webpack 会自动带上后缀去尝试询问文件是否存在，而 resolve.extensions 用于配置尝试后缀列表；默认为 extensions:['js','json'];
  - 及当遇到 require('./data')时 webpack 会先尝试寻找 data.js，没有再去找 data.json；如果列表越长，或者正确的后缀越往后，尝试的次数就会越多；
  - 所以在配置时为提升构建优化需遵守：
    - 频率出现高的文件后缀优先放在前面；
    - 列表尽可能的小；
    - 书写导入语句时，尽量写上后缀名
- HappyPack 并行构建优化：将 webpack 中最耗时的 loader 文件转换操作任务，分解到多个进程中并行处理，从而减少构建时间。
- 代码压缩用 ParallelUglifyPlugin 代替自带的 UglifyJsPlugin 插件：自带的 JS 压缩插件是单线程执行的，而 webpack-parallel-uglify-plugin 可以并行的执行
- webpack-bundle-analyzer、webpack-dashboard 等

### 介绍下 loader/plugin

loader
webpack 允许我们使用 loader 来处理文件，loader 是一个导出为 function 的 node 模块。可以将匹配到的文件进行一次转换，同时 loader 可以链式传递。
plugin
webpack 的 plugin 比 loader 强大，通过钩子可以涉及整个构建流程，可以做一些在构建范围内的事情。
