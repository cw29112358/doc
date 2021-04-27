### redux-saga

redux-saga 是一个 redux 中间件，意味着它可以通过正常的 redux action 从主应用程序启动，暂停和取消，它能访问完整的 redux state，也可以 dispatch redux action。

redux-saga 是用于更容易、更高效地管理应用程序 Side Effect（副作用）。这些 sagas 都是基于生成器（Generator）函数实现的，从生成器函数中我们可以声明式地 yield 纯 js 对象（Effect），这些对象包含了给 middleware 解释执行的信息。

```
import { take, fork, cancel } from 'redux-saga/effects'

const takeEvery = (pattern, saga, ...args) => fork(function*() {
    while(true) {
        const action = yield take(pattern)
        yield fork(saga, ...args.concat(action))
    }
})

const takeLatest = (pattern, saga, ...args) => fork(function*() {
    let lastTask
    while(true) {
        const action = yield take(pattern)
        if (lastTask) {
            yield cancel(lastTask)
        }
        lastTask = yield fork(saga, ...args.concat(action))
    }
})
```
