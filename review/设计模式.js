// 订阅发布者模式 EventEmitter
class EventEmitter {
    constructor() {
      this.quene = {}
    }
    on(event, callback) {
      this.quene[event]
        ? this.quene[event].push(callback)
        : (this.quene[event] = [callback])
    }
    emit(event, ...args) {
      this.quene[event] && this.quene[event].forEach(cb => cb(...args))
    }
    off(event) {
      if (this.quene[event]) {
        delete this.quene[event]
      }
    }
    once(event, callback) {
      this.on(event, (...args) => {
        callback(...args)
        this.off(event)
      })
    }
  }

// js 实现依赖注入
