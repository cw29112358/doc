/**
 * 节流函数
 */
const throttle = (cb, time) => {
  let canrun = true
  return () => {
    if (!canrun) return null
    canrun = false
    setTimeout(() => {
      cb()
      canrun = true
    }, time || 1000)
  }
}

/**
 * 防抖函数
 */
const debounce = (cb, time) => {
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb();
    }, time || 1000);
  }
}