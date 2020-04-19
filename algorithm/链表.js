/**
 * 实现简单的单向链表
 */
class LinkedList {
  header = null
  node = (element) => ({ element, next: null })
  length = 0
  append = (element) => {
    const newNode = this.node(element)
    if (this.header === null) {
      this.header = newNode
    } else {
      let current = this.header
      while (current.next) {
        current = current.next
      }
      current.next = newNode
    }
    this.length++
    return newNode
  }
}

/**
 * 含有增删查方法的单向链表
 */
function Node(element) {
  var obj = {
    element,
    next: null,
  }
  return obj
}

function LinkedList() {
  this.header = Node('header')
  this.length = 0
  this.find = function (target) {
    var current = this.header
    while (current && current.element !== target) {
      current = current.next
    }
    return current
  }
  this.insert = (element, target) => {
    var newNode = Node(element),
      current = this.find(target)
    if (!current) {
      current = this.header
      while (current.next !== null) {
        current = current.next
      }
      current.next = newNode
      return
    }
    newNode.next = current.next
    current.next = newNode
    return newNode
  }
  this.display = function () {
    var res = [],
      current = this.header
    while (current.next !== null) {
      res.push(current.element)
      current = current.next
    }
    res.push(current.element)
    return res
  }
  this.findPre = function (target) {
    var current = this.header
    while (current.next && current.next.element !== target) {
      current = current.next
    }
    if (current.next === null) {
      return {}
    }
    return current
  }
  this.remove = function (element) {
    var current = this.find(element),
      pre = this.findPre(element)
    if (current) {
      pre.next = current.next
    }
    return current
  }
  this.revert = function (header) {
    var list = JSON.parse(JSON.stringify(header)),
      current = list,
      template = null
    if (!current) return list
    while (current.next !== null) {
      template = current.next
      current.next = template.next
      template.next = list
      list = template
    }
    return list
  }
}