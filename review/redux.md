### Redux

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。 惟一改变 state 的办法是触发 action，一个描述发生什么的对象。 为了描述 action 如何改变 state 树，你需要编写 reducers。

严格的单向数据流是 Redux 架构的设计核心：

- 调用 store.dispatch(action)
- Redux store 调用传入的 reducer 函数
- 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树
- Redux store 保存了根 reducer 返回的完整 state 树

### react-redux 工作机制

- Provider: Provider 的作用是从最外部封装了整个应用，并向 connect 模块传递 store
- connect: 负责连接 React 和 Redux
  - 获取 state: connect 通过 context 获取 Provider 中的 store，通过 store.getState()获取整个 store tree 上所有 state
  - 包装原组件: 将 state 和 action 通过 props 的方式传入到原组件内部 wrapWithConnect 返回一个 ReactComponent 对象 Connect，Connect 重新 render 外部传入的原组件 WrappedComponent，并把 connect 中传入的`mapStateToProps`, `mapDispatchToProps`与组件上原有的 props 合并后，通过属性的方式传给 WrappedComponent
  - 监听 store tree 变化: connect 缓存了 store tree 中 state 的状态,通过当前 state 状态和变更前 state 状态进行比较,从而确定是否调用 this.setState()方法触发 Connect 及其子组件的重新渲染
