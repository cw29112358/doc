### React 生命周期

React 16.3 之后有三个生命周期被废弃(但并未删除)
componentWillMount
componentWillReceiveProps
componentWillUpdate
目前 React 16.4+ 的生命周期分为三个阶段,分别是挂载阶段、更新阶段、卸载阶段
挂载阶段:
`constructor`: 构造函数，最先被执行,我们通常在构造函数里初始化 state 对象或者给自定义方法绑定 this
`getDerivedStateFromProps`: _static getDerivedStateFromProps(nextProps, prevState)_, 这是个静态方法,当我们接收到新的属性想去修改我们 state，可以使用 getDerivedStateFromProps
`render`: render 函数是纯函数，只返回需要渲染的东西，不应该包含其它的业务逻辑,可以返回原生的 DOM、React 组件、Fragment、Portals、字符串和数字、Boolean 和 null 等内容
`componentDidMount`: 组件装载之后调用，此时我们可以获取到 DOM 节点并操作，比如对 canvas，svg 的操作，服务器请求，订阅都可以写在这个里面，但是记得在 componentWillUnmount 中取消订阅
更新阶段:
`getDerivedStateFromProps`: 此方法在更新个挂载阶段都可能会调用
`shouldComponentUpdate`: _shouldComponentUpdate(nextProps, nextState)_,有两个参数 nextProps 和 nextState，表示新的属性和变化之后的 state，返回一个布尔值，true 表示会触发重新渲染，false 表示不会触发重新渲染，默认返回 true,我们通常利用此生命周期来优化 React 程序性能
`render`: 更新阶段也会触发此生命周期
`getSnapshotBeforeUpdate`: _getSnapshotBeforeUpdate(prevProps, prevState)_,这个方法在 render 之后，componentDidUpdate(更新 DOM 和 refs 之前)之前调用，有两个参数 prevProps 和 prevState，表示之前的属性和之前的 state，这个函数有一个返回值，会作为第三个参数传给 componentDidUpdate，如果你不想要返回值，可以返回 null，此生命周期必须与 componentDidUpdate 搭配使用
`componentDidUpdate`: componentDidUpdate(prevProps, prevState, snapshot),该方法在 getSnapshotBeforeUpdate 方法之后被调用，有三个参数 prevProps，prevState，snapshot，表示之前的 props，之前的 state，和 snapshot。第三个参数是 getSnapshotBeforeUpdate 返回的,如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或计算的过程迁移至 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或更新状态。
卸载阶段:
`componentWillUnmount`: 当我们的组件被卸载或者销毁了就会调用，我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的 DOM 元素等垃圾清理工作

### setState 机制

setState 到底是异步还是同步？ 结论： 有时表现出异步,有时表现出同步
setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。
setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState，setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

### React diff 策略

React 用 三大策略 将 O(n^3)复杂度 转化为 O(n)复杂度。React 通过 updateDepth 对 Virtual DOM 树进行层级控制。对树分层比较，两棵树只对同一层次节点进行比较。如果该节点不存在时，则该节点及其子节点会被完全删除，不会再进一步比较。只需遍历一次，就能完成整棵 DOM 树的比较。

- 策略一（tree diff）：
  - Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
- 策略二（component diff）：
  - 拥有相同类的两个组件 生成相似的树形结构，
  - 拥有不同类的两个组件 生成不同的树形结构。
- 策略三（element diff）：
  - 对于同一层级的一组子节点，通过唯一 id 区分。

### React 中的 XSS 攻击

XSS（跨站脚本攻击），是一种代码注入攻击。XSS 攻击通常指的是利用网页的漏洞，攻击者通过巧妙的方法注入 XSS 代码到网页，因为浏览器无法分辨哪些脚本是可信的，导致 XSS 脚本被执行。XSS 脚本通常能够窃取用户数据并发送到攻击者的网站，或者冒充用户，调用目标网站接口并执行攻击者指定的操作。

- 自动转义：React 在渲染 HTML 内容和渲染 DOM 属性时都会将 "'&<> 这几个字符进行转义
- JSX 语法：$$typeof 是个 Symbol 类型，进行 JSON 转换后 Symbol 值会丢失，无法在前后端进行传输。如果用户提交了特殊的 Children，也无法进行渲染
- 尽量不要使用 dangerouslySetInnerHTML：React 将不会对输入进行任何处理并直接渲染到 HTML 中
- 不要通过用户提供的对象来创建 React 组件
- 不要使用用户输入的值来渲染 a 标签的 href 属性，或类似 img 标签的 src 属性等

### React Fiber

在 react v16 版本前，react 的渲染机制是同步进行的，如果渲染的组件比较庞大，那么 js 就会占据主线程太久的时间而导致页面的响应较差从而影响用户体验

考虑以下因素：

- 并不是所有的 state 更新都需要立即显示出来，比如屏幕之外的部分的更新
- 并不是所有的更新优先级都是一样的，比如用户输入的响应优先级要比通过请求填充内容的响应优先级更高
- 理想情况下，对于某些高优先级的操作，应该是可以打断低优先级的操作执行的，比如用户输入时，页面的某个评论还在 reconciliation，应该优先响应用户输入

在 react v16 版本后为了解决这些问题，react 重写了核心 diff 算法，简称 Fiber

在 fiber 算法下，更新任务是可以被拆分的，并且可以被中断的。对于每个节点来说，其不光存储了对应元素的基本信息，还要保存一些用于任务调度的信息。因此，fiber 仅仅是一个对象，表征 reconciliation 阶段所能拆分的最小工作单元。通过 stateNode 属性管理 Instance 自身的特性。通过 child 和 sibling 代表当前工作单元的下一个工作单元，return 表示处理完成后返回结果所要合并的目标，通常指向父节点。整个结构是一个链表树。每个工作单元（fiber）执行完成后，都会查看是否还继续拥有主线程时间片，如果有继续下一个，如果没有则先处理其他高优先级事务，等主线程空闲下来继续执行。

### React Hooks

- 函数组件不能使用 state，遇到交互更改状态等复杂逻辑时不能更好地支持，hooks 让函数组件更靠近 class 组件，拥抱函数式编程。
- 解决副作⽤问题，hooks 出现可以处理数据获取、订阅、定时执行任务、手动修改 ReactDOM 这些⾏为副作用，进行副作用逻辑。比如 useEffect。
- 不相关的逻辑可以分不同的 useEffect
- 更好写出有状态的逻辑重用组件。
- 让复杂逻辑简单化，比如状态管理：useReducer、useContext。
- 函数式组件比 class 组件简洁，开发的体验更好，效率更⾼，性能更好。
- 更容易发现无用的状态和函数。
