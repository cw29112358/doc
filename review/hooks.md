### React Hooks 的优势

- 函数组件不能使用 state，遇到交互更改状态等复杂逻辑时不能更好地支持，hooks 让函数组件更靠近 class 组件，拥抱函数式编程。
- 解决副作⽤问题，hooks 出现可以处理数据获取、订阅、定时执行任务、手动修改 ReactDOM 这些⾏为副作用，进行副作用逻辑。比如 useEffect。
- 不相关的逻辑可以分不同的 useEffect
- 更好写出有状态的逻辑重用组件。
- 让复杂逻辑简单化，比如状态管理：useReducer、useContext。
- 函数式组件比 class 组件简洁，开发的体验更好，效率更⾼，性能更好。
- 更容易发现无用的状态和函数。

### Hooks 放在函数顶层

因为我们只能通过 Hooks 调用的顺序来与实际保存的数据结构来关联

### useState 如何保存和更新状态

#### 保存

- 两者的状态值都被挂载在组件实例对象 FiberNode 的 memoizedState 属性中
- 两者保存状态值的数据结构完全不同；类组件是直接把 state 属性中挂载的这个开发者自定义的对象给保存到 memoizedState 属性中；而 React Hooks 是用链表来保存状态的，memoizedState 属性保存的实际上是这个链表的头指针

```ts
export type Hook = {
  memoizedState: any; // 最新状态值
  baseState: any; // 初始状态值
  baseUpdate: Update<any, any> | null; //
  queue: UpdateQueue<any, any> | null; // 临时保存对状态值的操作，更准确来说是一个链表数据结构中的一个指针
  next: Hook | null; // 指向下一个链表节点
};
```

#### 更新

当我们在每次调用 dispatcher 时，并不会立刻对状态值进行修改（对的，状态值的更新是异步的），而是创建一条修改操作——在对应 Hook 对象的 queue 属性挂载的链表上加一个新节点。

在下次执行函数组件，再次调用 useState 时， React 才会根据每个 Hook 上挂载的更新操作链表来计算最新的状态值。

你也许会好奇，为什么要把更新操作都保存起来呢，只保存最新的一次更新操作不就行了吗？这是因为 useState 还有这样的语法

```js
const [name, setName] = useState("");
setName((name) => name + "a");
setName((name) => name + "b");
setName((name) => name + "c");

// 下次执行时就可以得到 name 的最新状态值为'abc'啦
```

### useEffect 如何保存和更新状态

#### 保存

useEffect 的保存方式与 useState / useReducer 类似，也是以链表的形式挂载在 FiberNode.updateQueue 中

#### 更新

##### mount 阶段

1. 根据函数组件函数体中依次调用的 useEffect 语句，构建成一个链表并挂载在 FiberNode.updateQueue 中，链表节点的数据结构为：

```js
const effect: Effect = {
  tag, // 用来标识依赖项有没有变动
  create, // 用户使用useEffect传入的函数体
  destroy, // 上述函数体执行后生成的用来清除副作用的函数
  deps, // 依赖项列表
  next: (null: any),
};
```

2. 组件完成渲染后，遍历链表执行

##### update 阶段

同样在依次调用 useEffect 语句时，判断此时传入的依赖列表，与链表节点 Effect.deps 中保存的是否一致（基本数据类型的值是否相同；对象的引用是否相同），如果一致，则在 Effect.tag 标记上 NoHookEffect

- 遍历链表
- 如果遇到 Effect.tag 被标记上 NoHookEffect 的节点则跳过。
- 如果 Effect.destroy 为函数类型，则需要执行该清除副作用的函数（至于这 Effect.destroy 是从哪里来的，下面马上说到）
- 执行 Effect.create，并将执行结果保存到 Effect.destroy（如果开发者没有配置 return，那得到的自然是 undefined 了，也就是说，开发者认为对于当前 useEffect 代码段，不存在需要清除的副作用）；注意由于闭包的缘故，Effect.destroy 实际上可以访问到本次 Effect.create 函数作用域内的变量。

> 我们重点请注意到：是先清除上一轮的副作用，然后再执行本轮的 effect 的。
