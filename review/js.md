### 虚拟列表

虚拟列表是按需显示的一种技术，可以根据用户的滚动，不必渲染所有列表项，而只是渲染可视区域内的一部分列表元素的技术。

### js 继承

- 原型链继承
- 借用构造函数继承
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合式继承

### 线程和进程的区别

- 一个程序至少有一个进程，一个进程至少有一个线程。线程的划分尺度小于进程，使得多线程程序的并发性高。
- 另外，进程在执行过程中有独立的内存单元，而多个线程共享内存，从而极大地提高了程序的运行效率
- 线程在执行过程中与线程还是有区别的。每个独立的进程有一个程序运行的入口、顺序执行序列和程序的出口。但是线程不能够独立执行，必须依存在应用程序中，由应用程序提供多个线程执行控制。
- 从逻辑角度来看，多线程的意义在于一个应用程序中，有多个执行部分可以同时执行。但是操作系统并没有将多个线程看作多个独立的应用，来实现进程的调度和管理以及资源分配。这就是进程和线程的重要区别。

### call(), apply()和 bind()

js 中的 call(), apply()和 bind()是 Function.prototype 下的方法，都是用于改变函数运行时上下文，最终的返回值是你调用的方法的返回值，若该方法没有返回值，则返回 undefined。

- apply()
  使用 apply， 你可以继承其他对象的方法：注意这里 apply()的第一个参数是 null，在非严格模式下，第一个参数为 null 或者 undefined 时会自动替换为指向全局对象，apply()的第二个参数为`数组或类数组`。
- call()
  call()是 apply()的一颗语法糖，作用和 apply()一样，同样可实现继承，唯一的区别就在于 call()接收的是`参数列表`，而 apply()则接收参数数组。
- bind()
  bind()的作用与 call()和 apply()一样，都是可以改变函数运行时上下文，区别是 call()和 apply()在调用函数之后会立即执行，而 bind()方法调用并改变函数运行时上下文后， `返回一个新的函数，供我们需要时再调用`。

### javascript 数据类型

- 栈：有结构，用于存放基本类型和指向堆中的引用地址的指针
- 堆：无结构，用于存放引用类型
- 值类型(基本类型)：字符串（String）、数字(Number)、布尔(Boolean)、对空（Null）、未定义（Undefined）、Symbol、BigInt
- 引用数据类型：对象(Object)、数组(Array)、函数(Function)、Date、Map、Set、WeakMaps、WeakSets、类数组

### `new`的实现过程

- 创建一个新的对象
- 将构造函数的作用域赋值给新的对象（因此 this 就指向了这个新的对象）
- 执行构造函数中的代码
- 返回新对象

### DOM 事件机制

DOM 事件流分为三个阶段：捕获阶段、目标阶段、冒泡阶段。先调用捕获阶段的处理函数，其次调用目标阶段的处理函数，最后调用冒泡阶段的处理函数。
事件代理: 使用事件代理，我们可以把事件处理器添加到一个元素上，等待一个事件从它的子级元素里冒泡上来，并且可以得知这个事件是从哪个元素开始的。避免对列表中大量元素依次添加事件

### js 任务队列

- 宏任务：js、setTimeout、setInterval
- 微任务：process.nextTick(),promise.then().catch().finally()
  js 是单线程，首先会执行同步任务，异步任务会进入任务队列，同步任务完成后清空所有微任务，之后再去任务队列中找是否有已经完成的异步任务，执行已经完成的异步任务，清空所有微任务...

```
console.log(1)
setTimeout(() => {
  console.log(2)
  process.nextTick(() => {
    console.log(3)
  })
  new Promise(resolve => {
    console.log(4)
    resolve()
  }).then(() => {
    console.log(5)
  })
})
new Promise(resolve => {
  console.log(7)
  resolve()
}).then(() => {
  console.log(8)
})
process.nextTick(() => {
  console.log(6)
})
setTimeout(() => {
  console.log(9)
  process.nextTick(() => {
    console.log(10)
  })
  new Promise(resolve => {
    console.log(11)
    resolve()
  }).then(() => {
    console.log(12)
  })
})

// 1 7 8 2 4 5 6 3 9 11 12 10
```

nodejs 事件循环：https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/

### js 兼容性问题

- 事件对象： e || window.event
- 事件目标对象： e.target || e.srcElement
- 阻止默认行为： e.preventDefault() || e.returnValue = false
- 阻止事件冒泡： e.stopPropagation() || e.cancelBubble = true
- 事件监听： addEventListener() || attacheEvent()
  removeEventListener() || detachEvent()

### js 闭包

闭包是指有权访问另一个函数作用域中的变量的函数。
缺点：

- 常驻内存，增大内存使用量，使用不当很容易造成内存泄漏
- 可以改变父函数的变量，所以使用时要谨慎
  优点：
- 可以避免全局变量的污染
- 可以突破作用链域，将函数内部的变量和方法传递到外部
- 保护函数内部变量的安全，加强了封装性
- 在内存中维持一个变量
- 设计私有方法和变量
-

以下操作会造成内存泄漏：

- 意外的全部变量
- 闭包
- 被遗忘的定时器

### 伪数组（arguments,document.getElementsByTagName(),document.childNodes,上传文件时选择的 files 对象...）

具有 length 属性，按索引方式存储数据，但不具备数组方法

const obj = {length: 3}

Array.from(obj)
Array.apply(null, obj)
Array.prototype.concat.apply([], obj)

Array.prototype.filter.call(obj, () => 1)
Array.prototype.map.call(obj, x => x)

[...obj] // 注意是否具有 iterable object

### cookies、localSorage、sessionStorage 区别

- cookies 是为了标识用户身份而存储在用户本地终端上的数据，始终在同源 http 请求中携带，即 cookies 在浏览器和服务器间来回传递，而 sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存
- 存储大小的限制不同。cookie 保存的数据很小，不能超过 4k，而 sessionStorage 和 localStorage 保存的数据很大，可达 5M
- 数据的有效期不同。cookie 在设置 cookie 过期时间之前一直有效，即使窗口或者浏览器关闭。sessionStorage 仅在浏览器窗口关闭之前有效。localStorage 始终有效，用于存放长久数据
- 作用域不同。cookie 在所有的同源窗口都是共享的；sessionStorage 不在不同的浏览器共享，即使是同一页面；localStorage 在所有的同源窗口都是共享的

### 不冒泡的事件

- window 上的事件，因为没有可以网上冒的对象了(load,unload,scroll,resize,focus,blur...)
- onmouseenter,onmouseleave,onmousemove...

### import 和 requre 的区别

- require 是 commonjs 的规范，在 node 中实现的 api，import 是 es 的语法，由编译器处理。所以 import 可以做模块依赖的静态分析，配合 webpack、rollup 等可以做 treeshaking
- commonjs 导出的值会复制一份，require 引入的是复制之后的值（引用类型只复制引用），es module 导出的值是同一份（不包括 export default），不管是基础类型还是引用类型
- 写法上有差别，import 可以使用 import \* 引入全部的 export，也可以使用 import aaa, { bbb } 的方式分别引入 default 和非 default 的 export，相比 require 更灵活

### instanceof

检查构造函数的原型是否在实例的原型链上

### 谈谈 This 对象的理解

this 总是指向函数的直接调用者（而非间接调用者）；如果有 new 关键字，this 指向 new 出来的那个对象；在事件中，this 指向触发这个事件的对象，特殊的是，IE 中的 attachEvent 中的 this 总是指向全局对象 Window；

### eval 是做什么的？

它的功能是把对应的字符串解析成 JS 代码并运行；应该避免使用 eval，不安全，非常耗性能（2 次，一次解析成 js 语句，一次执行）。由 JSON 字符串转换为 JSON 对象的时候可以用 eval，var obj =eval('('+ str +')');

### 什么是 window 对象? 什么是 document 对象?

window 对象是指浏览器打开的窗口。document 对象是 Documentd 对象（HTML 文档对象）的一个只读引用，window 对象的一个属性。

### javascript 代码中的"use strict";是什么意思 ? 使用它区别是什么？

- 消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为
- 消除代码运行的一些不安全处，保证代码运行的安全,限制函数中的 arguments 修改
- 提高编译器效率，增加运行速度
- 为未来新版本的 js 做好铺垫

### 如何判断当前脚本运行在浏览器还是 node 环境中

this === 'window' ? 'browser' : 'node'

### 实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应。给出你的技术实现方案？

参考链接: https://www.haorooms.com/post/ajax_historybackprev

history.pushState(state, title[, url])
history.replaceState(stateObj, title[, url])

### 把 Script 标签放在页面的最底部的 body 封闭之前和封闭之后有什么区别？浏览器会如何解析它们？

之前推荐的方法（已过时）：之前解决这个问题的方法是把 script 标签放到 body 标签之后 ，这确保了解析到</body>之前都不会被 script 终端。这个方法是有问题的: 浏览器在整个文档解析完成之前都不能下载 script 文件，如果文档很大的话，解析完 HTML，用户依然要等待 script 文件下载并执行完成之后，才能操作这个网站。

现在推荐的解决方案：现在浏览器 script 标签支持 async 和 defer 属性. 应用这些属性当 script 被下载时，浏览器更安全而且可以并行下载（下载 script 并不阻断 HTML 解析）。1.async 标记的 Script 异步执行下载，并执行。这意味着 script 下载时并不阻塞 HTML 的解析，并且下载结束 script 马上执行。2.defer 标签的 script 顺序执行。这种方式也不会阻断浏览器解析 HTML。跟 async 不同, defer scripts 在整个文档里的 script 都被下载完才顺序执行。

### 什么是前端路由？前端路由的实现原理

参考链接: http://www.voidcn.com/article/p-fowvpjan-dx.html

### 什么是 Polyfill?

polyfill 是“在旧版浏览器上复制标准 API 的 JavaScript 补充”,可以动态地加载 JavaScript 代码或库，在不支持这些标准 API 的浏览器中模拟它们。例如，geolocation（地理位置）polyfill 可以在 navigator 对象上添加全局的 geolocation 对象，还能添加 getCurrentPosition 函数以及“坐标”回调对象， 所有这些都是 W3C 地理位置 API 定义的对象和函数。因为 polyfill 模拟标准 API，所以能够以一种面向所有浏览器未来的方式针对这些 API 进行开发， 一旦对这些 API 的支持变成绝对大多数，则可以方便地去掉 polyfill，无需做任何额外工作。

### 页面重构怎么操作？

网站重构：

1. 在不改变外部行为的前提下，简化结构、添加可读性，而在网站前端保持一致的行为。也就是说是在不改变 UI 的情况下，对网站进行优化，在扩展的同时保持一致的 UI。

对于传统的网站来说重构通常是：

1. 表格(table)布局改为 DIV+CSS 使网站前端兼容于现代浏览器(针对于不合规范的 CSS、如对 IE6 有效的) 对于移动平台的优化 针对于 SEO 进行优化 深层次的网站重构应该考虑的方面
2. 减少代码间的耦合 让代码保持弹性 严格按规范编写代码 设计可扩展的 API 代替旧有的框架、语言(如 VB) 增强用户体验 通常来说对于速度的优化也包含在重构中
3. 压缩 JS、CSS、image 等前端资源(通常是由服务器来解决) 程序的性能优化(如数据读写) 采用 CDN 来加速资源加载 对于 JS DOM 的优化 HTTP 服务器的文件缓存

### 对 Node 的优点和缺点提出了自己的看法？

优点：因为 Node 是基于事件驱动和无阻塞的，所以非常适合处理并发请求， 因此构建在 Node 上的代理服务器相比其他技术实现（如 Ruby）的服务器表现要好得多。此外，与 Node 代理服务器交互的客户端代码是由 javascript 语言编写的， 因此客户端和服务器端都用同一种语言编写，这是非常美妙的事情。

缺点：Node 是一个相对新的开源项目，所以不太稳定，它总是一直在变， 而且缺少足够多的第三方库支持。看起来，就像是 Ruby/Rails 当年的样子。

### canvas 和 svg 区别

1. 从图像类别区分，Canvas 是基于像素的位图，而 SVG 却是基于矢量图形。可以简单的把两者的区别看成 photoshop 与 illustrator 的区别。

2. 从结构上说，Canvas 没有图层的概念，所有的修改整个画布都要重新渲染，而 SVG 则可以对单独的标签进行修改。

3. 从操作对象上说，Canvas 是基于 HTML canvas 标签，通过宿主提供的 Javascript API 对整个画布进行操作的，而 SVG 则是基于 XML 元素的。

4. 从功能上讲，SVG 发布日期较早，所以功能相对 Canvas 比较完善。

5. 关于动画，Canvas 更适合做基于位图的动画，而 SVG 则适合图表的展示。

6. 从搜索引擎角度分析，由于 svg 是有大量标签组成，所以可以通过给标签添加属性，便于爬虫搜索

### fetch 取消

```
const controller = new AbortControl()
const signal = controller.signal

const downloadBtn = document.querySelector('.download');
const abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', function() {
  controller.abort();
  console.log('Download aborted');
});

function fetchVideo() {
  //...
  fetch(url, {signal}).then(function(response) {
    //...
  }).catch(function(e) {
    reports.textContent = 'Download error: ' + e.message;
  })
}
```
