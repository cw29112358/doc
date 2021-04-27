// 处理异步请求并重试
function retry(asyncRequest, times = 3) {
  return asyncRequest()
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      times--
      if (times === 0) {
        throw new Error(error)
      } else {
        retry(asyncRequest, times)
      }
    })
}

// 邮箱验证
var pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;

// 链式调用
function Test() {
  this.stack = []
  setTimeout(() => {
    this.next()
  }, 0)
  return this
}
Test.prototype.eat = function (something) {
  const _self = this
  const fn = function () {
    console.log(something)
    _self.next()
  }
  this.stack.push(fn)
  return this
}
Test.prototype.sleep = function (time) {
  const _self = this
  const fn = function () {
    setTimeout(() => {
      _self.next()
    }, time * 1000)
  }
  this.stack.push(fn)
  return this
}
Test.prototype.next = function () {
  const fn = this.stack.shift()
  fn && fn()
}
new Test().eat('apple').sleep(3).eat('rice').sleep(3).eat('bread')