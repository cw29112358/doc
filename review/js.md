### call(), apply()和bind()
js中的call(), apply()和bind()是Function.prototype下的方法，都是用于改变函数运行时上下文，最终的返回值是你调用的方法的返回值，若该方法没有返回值，则返回undefined。
+ apply()
使用 apply， 你可以继承其他对象的方法：注意这里apply()的第一个参数是null，在非严格模式下，第一个参数为null或者undefined时会自动替换为指向全局对象，apply()的第二个参数为`数组或类数组`。
+ call()
call()是apply()的一颗语法糖，作用和apply()一样，同样可实现继承，唯一的区别就在于call()接收的是`参数列表`，而apply()则接收参数数组。
+ bind()
bind()的作用与call()和apply()一样，都是可以改变函数运行时上下文，区别是call()和apply()在调用函数之后会立即执行，而bind()方法调用并改变函数运行时上下文后， `返回一个新的函数，供我们需要时再调用`。

### javascript数据类型
+ 栈：有结构，用于存放基本类型和指向堆中的引用地址的指针
+ 堆：无结构，用于存放引用类型
+ 值类型(基本类型)：字符串（String）、数字(Number)、布尔(Boolean)、对空（Null）、未定义（Undefined）、Symbol、BigInt
+ 引用数据类型：对象(Object)、数组(Array)、函数(Function)、Date、Map、Set、WeakMaps、WeakSets、类数组

### `new`的实现过程
+ 创建一个新的对象
+ 将构造函数的作用域赋值给新的对象（因此this就指向了这个新的对象）
+ 执行构造函数中的代码
+ 返回新对象

### DOM事件机制
DOM 事件流分为三个阶段：捕获阶段、目标阶段、冒泡阶段。先调用捕获阶段的处理函数，其次调用目标阶段的处理函数，最后调用冒泡阶段的处理函数。
事件代理: 使用事件代理，我们可以把事件处理器添加到一个元素上，等待一个事件从它的子级元素里冒泡上来，并且可以得知这个事件是从哪个元素开始的。避免对列表中大量元素依次添加事件

### js 任务队列
+ 宏任务：js、setTimeout、setInterval
+ 微任务：process.nextTick(),promise.then().catch().finally()
js 是单线程，首先会执行同步任务，异步任务会进入任务队列，同步任务完成后清空所有微任务，之后再去任务队列中找是否有已经完成的异步任务，执行已经完成的异步任务，清空所有微任务...

### js 兼容性问题
+ 事件对象：       e || window.event
+ 事件目标对象：   e.target || e.srcElement
+ 阻止默认行为：   e.preventDefault() || e.returnValue = false
+ 阻止事件冒泡：   e.stopPropagation() || e.cancelBubble = true
+ 事件监听：       addEventListener() || attacheEvent()
                  removeEventListener() || detachEvent()

### js 闭包
闭包是指有权访问另一个函数作用域中的变量的函数。
缺点：常驻内存，增大内存使用量，使用不当很容易造成内存泄漏
优点：可以避免全局变量的污染

以下操作会造成内存泄漏：
+ 意外的全部变量
+ 闭包
+ 被遗忘的定时器

### 伪数组（arguments,document.getElementsByTagName(),document.childNodes,上传文件时选择的 files 对象...）
具有 length 属性，按索引方式存储数据，但不具备数组方法
Array.from(),[...伪数组],Array.prototype.slice.call(伪数组)

### cookies、localSorage、sessionStorage 区别
+ cookies 是为了标识用户身份而存储在用户本地终端上的数据，始终在同源 http 请求中携带，即 cookies 在浏览器和服务器间来回传递，而 sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存
+ 存储大小的限制不同。cookie 保存的数据很小，不能超过 4k，而 sessionStorage 和 localStorage 保存的数据很大，可达 5M
+ 数据的有效期不同。cookie 在设置 cookie 过期时间之前一直有效，即使窗口或者浏览器关闭。sessionStorage 仅在浏览器窗口关闭之前有效。localStorage 始终有效，用于存放长久数据
+ 作用域不同。cookie 在所有的同源窗口都是共享的；sessionStorage 不在不同的浏览器共享，即使是同一页面；localStorage 在所有的同源窗口都是共享的

### 不冒泡的事件
+ window 上的事件，因为没有可以网上冒的对象了(load,unload,scroll,resize,focus,blur...)
+ onmouseenter,onmouseleave,onmousemove...

### import 和 requre 的区别
+ require 是 commonjs 的规范，在 node 中实现的 api，import 是 es 的语法，由编译器处理。所以 import 可以做模块依赖的静态分析，配合 webpack、rollup 等可以做 treeshaking
+ commonjs 导出的值会复制一份，require 引入的是复制之后的值（引用类型只复制引用），es module 导出的值是同一份（不包括 export default），不管是基础类型还是应用类型
+ 写法上有差别，import 可以使用 import * 引入全部的 export，也可以使用 import aaa, { bbb } 的方式分别引入 default 和非 default 的 export，相比 require 更灵活