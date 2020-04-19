### React 生命周期

React 16.3 之后有三个生命周期被废弃(但并未删除)

    componentWillMount
    componentWillReceiveProps
    componentWillUpdate


目前React 16.4+ 的生命周期分为三个阶段,分别是挂载阶段、更新阶段、卸载阶段

挂载阶段:

`constructor`: 构造函数，最先被执行,我们通常在构造函数里初始化state对象或者给自定义方法绑定this

`getDerivedStateFromProps`:  *static getDerivedStateFromProps(nextProps, prevState)*, 这是个静态方法,当我们接收到新的属性想去修改我们state，可以使用getDerivedStateFromProps

`render`: render函数是纯函数，只返回需要渲染的东西，不应该包含其它的业务逻辑,可以返回原生的DOM、React组件、Fragment、Portals、字符串和数字、Boolean和null等内容

`componentDidMount`: 组件装载之后调用，此时我们可以获取到DOM节点并操作，比如对canvas，svg的操作，服务器请求，订阅都可以写在这个里面，但是记得在componentWillUnmount中取消订阅
更新阶段:

`getDerivedStateFromProps`: 此方法在更新个挂载阶段都可能会调用

`shouldComponentUpdate`: *shouldComponentUpdate(nextProps, nextState)*,有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true,我们通常利用此生命周期来优化React程序性能

`render`: 更新阶段也会触发此生命周期

`getSnapshotBeforeUpdate`: *getSnapshotBeforeUpdate(prevProps, prevState)*,这个方法在render之后，componentDidUpdate(更新 DOM 和 refs 之前)之前调用，有两个参数prevProps和prevState，表示之前的属性和之前的state，这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，如果你不想要返回值，可以返回null，此生命周期必须与componentDidUpdate搭配使用

`componentDidUpdate`: componentDidUpdate(prevProps, prevState, snapshot),该方法在getSnapshotBeforeUpdate方法之后被调用，有三个参数prevProps，prevState，snapshot，表示之前的props，之前的state，和snapshot。第三个参数是getSnapshotBeforeUpdate返回的,如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或计算的过程迁移至 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或更新状态。

卸载阶段:

`componentWillUnmount`: 当我们的组件被卸载或者销毁了就会调用，我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作

### setState机制

setState到底是异步还是同步？ 结论： 有时表现出异步,有时表现出同步

setState只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout中都是同步的。

setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。

setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout中不会批量更新，在“异步”中如果对同一个值进行多次setState，setState的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时setState多个不同的值，在更新时会对其进行合并批量更新。

### React diff策略

React用 三大策略 将O(n^3)复杂度 转化为 O(n)复杂度。React通过updateDepth对Virtual DOM树进行层级控制。对树分层比较，两棵树只对同一层次节点进行比较。如果该节点不存在时，则该节点及其子节点会被完全删除，不会再进一步比较。只需遍历一次，就能完成整棵DOM树的比较。

+ 策略一（tree diff）：
  
  - Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计。

+ 策略二（component diff）：

  - 拥有相同类的两个组件 生成相似的树形结构，
  
  - 拥有不同类的两个组件 生成不同的树形结构。

+ 策略三（element diff）：

  - 对于同一层级的一组子节点，通过唯一id区分。

### react-redux工作机制

+ Provider: Provider的作用是从最外部封装了整个应用，并向connect模块传递store

+ connect: 负责连接React和Redux

  - 获取state: connect通过context获取Provider中的store，通过store.getState()获取整个store tree 上所有state

  - 包装原组件: 将state和action通过props的方式传入到原组件内部wrapWithConnect返回一个ReactComponent对象Connect，Connect重新render外部传入的原组件WrappedComponent，并把connect中传入的`mapStateToProps`, `mapDispatchToProps`与组件上原有的props合并后，通过属性的方式传给WrappedComponent

  - 监听store tree变化: connect缓存了store tree中state的状态,通过当前state状态和变更前state状态进行比较,从而确定是否调用this.setState()方法触发Connect及其子组件的重新渲染