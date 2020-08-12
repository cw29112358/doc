# webpack 性能优化

Optimization

+ minimize：告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer 定义的插件压缩 bundle

+ minimizer: 允许你通过提供一个或多个定制过的 TerserPlugin 实例， 覆盖默认压缩工具(minimizer)

+ splitChunks: 对于动态导入模块，默认使用 webpack v4+ 提供的全新的通用分块策略(common chunk strategy)

  + automaticNameDelimiter: 默认情况下，webpack将使用块的来源和名称生成名称（例如vendors~main.js）。此选项使您可以指定用于生成名称的定界符

  + chunks: 这表明将选择哪些块进行优化。当提供一个字符串，有效值为all，async和initial。提供all可能特别强大，因为它意味着即使在异步和非异步块之间也可以共享块

  + maxAsyncRequests: 按需加载时并行请求的最大数量

  + maxInitialRequests: 入口点的最大并行请求数

  + minChunks: 拆分前必须共享模块的最小块数

  + minSize: 生成块的最小大小（以字节为单位）

  + enforceSizeThreshold: 强制执行拆分的大小阈值和其他限制

  + minRemainingSize: splitChunks.minRemainingSize option was introduced in webpack 5 to avoid zero sized modules by ensuring that the minimum size of the chunk which remains after splitting is above a limit. Defaults to 0 in 'development' mode. For other cases splitChunks.minRemainingSize defaults to the value of splitChunks.minSize so it doesn't need to be specified manually except for the rare cases where deep control is required

  + maxSize: 告诉webpack尝试将大于maxSize字节的块拆分为较小的部分

  + maxAsyncSize: 告诉webpack尝试将大于maxSize字节的块拆分为较小的部分, 只会影响按需加载块

  + maxInitialSize: 告诉webpack尝试将大于maxSize字节的块拆分为较小的部分, 仅会影响初始加载块

  + name: 拆分块的名称。提供true将基于块和缓存组密钥自动生成一个名称

  + automaticNamePrefix: 为创建的块设置名称前缀

  + cacheGroups: 缓存组可以继承和/或覆盖splitChunks.*;中的任何选项。但是test，priority并且reuseExistingChunk只能在缓存组级别上配置。要禁用任何默认缓存组，请将它们设置为false

    + priority: 一个模块可以属于多个缓存组。priority优化将首选具有更高缓存的缓存组。默认组的优先级为负，以允许自定义组获得更高的优先级（默认值0, 适用于自定义组）

    + reuseExistingChunk: 如果当前块包含已从主捆绑包中拆分出的模块，则它将被重用，而不是生成新的模块。这可能会影响块的结果文件名

    + type: 允许按模块类型将模块分配给缓存组

    + test: 控制此缓存组选择的模块。省略它会选择所有模块。它可以匹配绝对模块资源路径或块名称。匹配块名称时，将选择块中的所有模块

    + filename: 当且仅当它是初始块时，才允许覆盖文件名

    + enforce: 讲述的WebPack忽略splitChunks.minSize，splitChunks.minChunks，splitChunks.maxAsyncRequests和splitChunks.maxInitialRequests选项，只为这个高速缓存组创建块

    + idHint: 设置块ID的提示。它将被添加到块的文件名中

+ runtimeChunk: 设置为 true 或 "multiple"，会为每个仅含有 runtime 的入口起点添加一个额外 chunk

+ noEmitOnErrors: 在编译出错时，来跳过生成阶段。这可以确保没有生成出错误资源。而 stats 中所有 assets 中的 emitted 标记都是 false

+ namedModules: 告知 webpack 使用可读取模块标识符，来帮助更好地调试

+ namedChunks: 告知 webpack 使用可读取 chunk 标识符，来帮助更好地调试

+ moduleIds: 告知 webpack 当选择模块 id 时需要使用哪种算法

+ chunkIds: 告知 webpack 当选择模块 id 时需要使用哪种算法

+ nodeEnv: 告知 webpack 将 process.env.NODE_ENV 设置为一个给定字符串

+ mangleWasmImports: 在设置为 true 时，告知 webpack 通过将导入修改为更短的字符串，来减少 WASM 大小。这会破坏模块和导出名称。

+ removeAvailableModules: 如果模块已经包含在所有父级模块中，告知 webpack 从 chunk 中检测出这些模块，或移除这些模块

+ removeEmptyChunks: 如果 chunk 为空，告知 webpack 检测或移除这些 chunk

+ mergeDuplicateChunks: 告知 webpack 合并含有相同模块的 chunk

+ flagIncludedChunks: 告知 webpack 确定和标记出作为其他 chunk 子集的那些 chunk，其方式是在已经加载过较大的 chunk 之后，就不再去加载这些 chunk 子集

+ occurrenceOrder: 告知 webpack 去确定那些会引致更小的初始化文件 bundle 的模块顺序

+ providedExports: 告知 webpack 去确定那些由模块提供的导出内容

+ usedExports: 告知 webpack 去决定每个模块使用的导出内容

+ concatenateModules: 告知 webpack 去寻找模块图形中的片段，哪些是可以安全地被合并到单一模块中

+ sideEffects: 告知 webpack 去辨识 package.json 中的 副作用 标记或规则，以跳过那些当导出不被使用且被标记不包含副作用的模块

+ portableRecords: 告知 webpack 生成带有相对路径的记录(records)使得可以移动上下文目录

+ mangleExports: 允许控制导出处理

+ innerGraph: 告知 webpack 是否对未使用的导出内容，实施内部图形分析