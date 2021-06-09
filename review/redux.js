export default function createStore(reducer, preloadedState, enhancer) {
    let currentReducer = reducer
    let currentState = preloadedState
    let currentListeners = []
    let nextListeners = currentListeners
    let isDispatching = false
  
    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice()
      }
    }
  
    function getState() {
      if (isDispatching) {}
      return currentState
    }
  
    function subscribe(listener) {
      if (isDispatching) {}
      let isSubscribed = true
      ensureCanMutateNextListeners()
      nextListeners.push(listener)
  
      return function unsubscribe() {
        if (!isSubscribed) return
        if (isDispatching) {}
        isSubscribed = false
  
        ensureCanMutateNextListeners()
        const index = nextListeners.indexOf(listener)
        nextListeners.splice(index, 1)
      }
    }
  
    function dispatch(action) {
      if (typeof action.type === 'undefined') {}
      if (isDispatching) {}
  
      try {
        isDispatching = true
        currentState = currentReducer(currentState, action)
      } finally {
        isDispatching = false
      }
  
      const listeners = (currentListeners = nextListeners)
      for (let i = 0; i < listeners.length; i++) {
        const listener = listeners[i]
        listener()
      }
  
      return action
    }
  
    function replaceReducer(nextReducer) {
      currentReducer = nextReducer
      dispatch({ type: ActionTypes.REPLACE })
    }
  
    dispatch({ type: ActionTypes.INIT })
  
    return {
      dispatch,
      subscribe,
      getState,
      replaceReducer,
    }
  }
  
  export default function combineReducers(reducers) {
    const reducerKeys = Object.keys(reducers)
    const finalReducers = {}
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]
      if (typeof reducers[key] === 'function') {
        finalReducers[key] = reducers[key]
      }
    }
    const finalReducerKeys = Object.keys(finalReducers)
  
    return function combination(state = {}, action) {
      let hasChanged = false
      const nextState = {}
      for (let i = 0; i < finalReducerKeys.length; i++) {
        const key = finalReducerKeys[i]
        const reducer = finalReducers[key]
        const previousStateForKey = state[key]
        const nextStateForKey = reducer(previousStateForKey, action)
        nextState[key] = nextStateForKey
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey
      }
      return hasChanged ? nextState : state
    }
  }
  
  function bindActionCreator(actionCreator, dispatch) {
    return function() {
      return dispatch(actionCreator.apply(this, arguments))
    }
  }
  
  // 官网是这样介绍 bindActionCreators。大家可以仔细品味
  // 把一个 value 为不同 action creator 的对象，转成拥有同名 key 的对象。同时使用 dispatch 对每个 action creator 进行包装，以便可以直接调用它们。
  // 一般情况下你可以直接在 Store 实例上调用 dispatch。如果你在 React 中使用 Redux，react-redux 会提供 dispatch 函数让你直接调用它 。
  // 惟一会使用到 bindActionCreators 的场景是当你需要把 action creator 往下传到一个组件上，却不想让这个组件觉察到 Redux 的存在，而且不希望把 dispatch 或 Redux store 传给它。
  export default function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
      return bindActionCreator(actionCreators, dispatch)
    }
    const boundActionCreators = {}
    for (const key in actionCreators) {
      const actionCreator = actionCreators[key]
      if (typeof actionCreator === 'function') {
        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
      }
    }
    return boundActionCreators
  }
  
  export default function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
      const store = createStore(...args)
      let dispatch = () => {
        throw new Error(/** error */)
      }
  
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args)
      }
      const chain = middlewares.map(middleware => middleware(middlewareAPI))
      dispatch = compose(...chain)(store.dispatch)
  
      return {
        ...store,
        dispatch
      }
    }
  }
  
  export default function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
  }