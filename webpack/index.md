# package.json

> "start": "webpack-dev-server --config scripts/webpack.dev.js -w"

+ --config: 指定配置文件
+ --watch|-w: 启动监听模式
+ --progress: 编译输出内容带进度
+ --colors: 编译输出内容带颜色
+ --hot: 开启模块热修复功能
+ --content-base ./dist: 设置webpack-dev-server运行的根目录是 ./dist
+ --inline: 使用inline的方式进行页面自动刷新
+ --quiet: 控制台中不输出打包信息
+ --compress: 开启gzip压缩