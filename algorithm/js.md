### call(), apply()和bind()

js中的call(), apply()和bind()是Function.prototype下的方法，都是用于改变函数运行时上下文，最终的返回值是你调用的方法的返回值，若该方法没有返回值，则返回undefined。

+ apply()

使用 apply， 你可以继承其他对象的方法：注意这里apply()的第一个参数是null，在非严格模式下，第一个参数为null或者undefined时会自动替换为指向全局对象，apply()的第二个参数为`数组或类数组`。

```javascript
const arr = [1,2,3,4,9,8,7]
const max = Math.max.apply(Math, arr)
```

+ call()

call()是apply()的一颗语法糖，作用和apply()一样，同样可实现继承，唯一的区别就在于call()接收的是`参数列表`，而apply()则接收参数数组。

```javascript
const arr = [1,2,3,4,9,8,7]
const max = Math.max.apply(Math, ...arr)
```

+ bind()

bind()的作用与call()和apply()一样，都是可以改变函数运行时上下文，区别是call()和apply()在调用函数之后会立即执行，而bind()方法调用并改变函数运行时上下文后， `返回一个新的函数，供我们需要时再调用`。


### javascript数据类型

+ 值类型(基本类型)：字符串（String）、数字(Number)、布尔(Boolean)、对空（Null）、未定义（Undefined）、Symbol、BigInt

+ 引用数据类型：对象(Object)、数组(Array)、函数(Function)、Date、Map、Set、WeakMaps、WeakSets、类数组

### 回流和重绘

+ html 加载时发生了什么
  
在页面加载时，浏览器把获取到的HTML代码解析成1个DOM树，DOM树里包含了所有HTML标签，包括display:none隐藏，还有用JS动态添加的元素等。
浏览器把所有样式(用户定义的CSS和用户代理)解析成样式结构体
DOM Tree 和样式结构体组合后构建render tree, render tree类似于DOM tree，但区别很大，因为render tree能识别样式，render tree中每个NODE都有自己的style，而且render tree不包含隐藏的节点(比如display:none的节点，还有head节点)，因为这些节点不会用于呈现，而且不会影响呈现的，所以就不会包含到 render tree中。我自己简单的理解就是DOM Tree和我们写的CSS结合在一起之后，渲染出了render tree。

+ 什么是回流
  
当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流(reflow)。每个页面至少需要一次回流，就是在页面第一次加载的时候，这时候是一定会发生回流的，因为要构建render tree。在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程成为重绘。

+ 什么是重绘
  
当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就叫称为重绘。

+ 区别：

他们的区别很大：回流必将引起重绘，而重绘不一定会引起回流。比如：只有颜色改变的时候就只会发生重绘而不会引起回流。当页面布局和几何属性改变时就需要回流。比如：添加或者删除可见的DOM元素，元素位置改变，元素尺寸改变——边距、填充、边框、宽度和高度，内容改变

### `new`的实现过程

+ 创建一个空对象，将它的引用赋给 this，继承函数的原型。

+ 通过 this 将属性和方法添加至这个对象

+ 最后返回 this 指向的新对象，也就是实例（如果没有手动返回其他的对象）

### `__proto__`和`prototype`

+ __proto__是每个对象都有的一个属性，而prototype是函数才会有的属性。

+ __proto__指向的是当前对象的原型对象，而prototype指向的，是以当前函数作为构造函数构造出来的对象的原型对象

+ 在JS里，万物皆对象。方法（Function）是对象，方法的原型(Function.prototype)是对象。因此，它们都会具有对象共有的特点。即：对象具有属性__proto__，可称为隐式原型，一个对象的隐式原型指向构造该对象的构造函数的原型，这也保证了实例能够访问在构造函数原型中定义的属性和方法。

+ 方法(Function)方法这个特殊的对象，除了和其他对象一样有上述_proto_属性之外，还有自己特有的属性——原型属性（prototype），这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。原型对象也有一个属性，叫做constructor，这个属性包含了一个指针，指回原构造函数。

### Node进程间通信有4种方式

通过stdin/stdout传递json：最直接的方式，适用于能够拿到“子”进程handle的场景，适用于关联进程之间通信，无法跨机器

Node原生IPC支持：最native（地道？）的方式，比上一种“正规”一些，具有同样的局限性

通过sockets：最通用的方式，有良好的跨环境能力，但存在网络的性能损耗

借助message queue：最强大的方式，既然要通信，场景还复杂，不妨扩展出一层消息中间件，漂亮地解决各种通信问题

### 布隆过滤器

高效地插入和查询，可以用来告诉你 “某样东西一定不存在或者可能存在”。

布隆过滤器可以用于检索一个元素是否在一个集合中。
+ 一个很长的二进制向量
+ 和一系列随机映射函数。
是一个占用空间很小、效率很高的随机数据结构，它由一个bit数组和一组Hash算法构成。
可用于判断一个元素是否在一个集合中，查询效率很高（1-N，最优能逼近于1）

### cookie属性:

document.cookie="key=value;expires=失效时间;path=路径;domain=域名;secure;(secure表安全级别）

+ name字段 ：一个cookie的名称。

+ value字段 ：一个cookie的值。

+ domain字段 ：可以访问此cookie的域名

+ path字段：可以访问此cookie的页面路径。

+ Size字段 ：此cookie大小。

+ http字段 ：cookie的httponly属性。若此属性为true，则只有在http请求头中会带有此cookie的信息，而不能通过document.cookie来访问此cookie。

+ secure 字段 ：设置是否只能通过https来传递此条cookie

### 正则添加逗号分隔符

```js 
str.replace(/\B(?=(?:\d{3})+\b)/g, ',');
```