/**
 * 节流函数
 */
function throttle(fn, time) {
  var canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      canRun = true;
      fn();
    }, time || 2000);
  };
}

/**
 * 防抖函数
 */
function debounce(cb, time) {
  var timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb();
    }, time || 2000);
  };
}