// useState,useReducer,useEffect
let memoState
function useState(initState) {
  memoState = memoState || initState
  function setState(newState) {
    memoState = newState
    render()
  }
  return [memoState, setState]
}

let memoState
function useReducer(reducer, initArg, initFunc) {
  let initState
  if (initFunc) {
    initState = initFunc(initArg)
  } else {
    initState = initArg
  }
  memoState = memoState || initState
  function dispatch(action) {
    memoState = reducer(memoState, action)
    render()
  }
  return [memoState, dispatch]
}

let watchArr
function useEffect(callback, watch) {
  if (!watch) callback()
  const hasWatchChanged = watchArr
    ? watchArr.every((item, index) => item !== watch[index])
    : true
  if (hasWatchChanged) {
    callback()
    watchArr = watch
  }
}