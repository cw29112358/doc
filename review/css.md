### css 规范

- 相关属性声明归为一组（布局类属性、盒模型、文本类属性、修饰类属性）
- 以 - 或者驼峰形式命名，表示层级关系，超过四级以上采用缩写
- 避免多个页面样式写在同一个文件中，复用性高的样式没有写在同一个文件中
- 表现与结构没有分离，频繁使用行业样式和 style

### 盒模型

width、height、content、padding、border、margin

- 标准盒子模型中，width 和 height 指的是内容区域的宽度和高度。增加内边距、边框和外边距不会影响内容区域的尺寸，但是会增加元素框的总尺寸。
- IE 盒子模型中，width 和 height 指的是内容区域+border+padding 的宽度和高度。
- box-sizing: content-box|border-box|inherit:

### link 和 @import 的区别

- 从属关系: @import 是 CSS 提供的语法规则，只有导入样式表的作用；link 是 HTML 提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等
- 加载顺序: 加载页面时，link 标签引入的 CSS 被同时加载；@import 引入的 CSS 将在页面加载完毕后被加载
- 兼容性: @import 是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；link 标签作为 HTML 元素，不存在兼容性问题
- DOM 可控性: 可以通过 JS 操作 DOM ，插入 link 标签来改变样式；由于 DOM 方法是基于文档的，无法使用@import 的方式插入样式
- 权重: link 引入的样式权重大于 @import 引入的样式

!important > 行内样式 > ID > 类、伪类、属性 > 标签名 > 继承 > 通配符

### css 使 div 水平垂直居中

> position + transform

```css
.parent {
  position: relative;
  height: 200px;
}
.child {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

> position + margin

```css
.parent {
  position: relative;
  width: 500px;
  height: 500px;
}
.child {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

> flex + margin

```css
.parent {
  display: flex;
}
.child {
  margin: auto;
}
```

- vertical-align + margin

```css
.parent {
  display: table-cell;
  vertical-align: middle;
}
.child {
  margin: 0 auto;
}
```

- flex

```css
.parent {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}
```

### 三角形

```css
.triangle {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-left-color: red;
}
```

### 单行和多行截断

```css
.line {
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

```css
.line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  width: 100px;
  overflow: hidden;
}
```

```css
.text {
  display: inline-block;
  width: 100px;
  height: 40px;
  line-height: 20px;
  overflow: hidden;
  word-break: break-all;
}
.sibling::after {
  display: inline;
  content: "...";
}
```

```css
.parent {
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 20px;
  overflow: hidden;
  word-break: break-all;
  padding-right: 10px;
}
.child {
  position: absolute;
  right: 0;
  bottom: 0;
}
```

### 实现布局 header,content,footer，上中下布局；当 content 超出窗口可视区，不显示 footer；当 content 没超出可视区时，固定 footer 在最下面

padding-bottom + margin-top

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.header {
  height: 200px;
}
.content {
  min-height: calc(100% - 400px);
  padding-bottom: 200px;
}
.footer {
  height: 200px;
  margin-top: -200px;
}
```

position: absolute;

```css
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
body {
  position: relative;
  min-height: calc(100% - 400px);
}
.header {
  height: 200px;
}
.content {
  padding-bottom: 200px;
}
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 200px;
}
```

display: flex;

```css
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  flex-shrink: 0;
  height: 200px;
}
.content {
  flex: 1;
}
.footer {
  flex-shrink: 0;
  height: 200px;
}
```

### -webkit-overflow-scrolling: touch; 流畅滚动

### 改变输入框内提示文字颜色

::-webkit-input-placeholder { /_ WebKit browsers _/
color: #999; }
:-moz-placeholder { /_ Mozilla Firefox 4 to 18 _/
color: #999; }
::-moz-placeholder { /_ Mozilla Firefox 19+ _/
color: #999; }
:-ms-input-placeholder { /_ Internet Explorer 10+ _/
color: #999; }
input:focus::-webkit-input-placeholder{ color:#999; }
