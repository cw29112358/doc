/**
 * 实现简单的单向链表
 */
class LinkedList {
  header = null
  node = value => ({ value, next: null })
  length = 0
  append = value => {
    const newNode = this.node(value)
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
 * 反转链表
 * 1 -> 2 -> 3 -> 4
 * 2 -> 1 -> 3 -> 4
 * 3 -> 2 -> 1 -> 4
 * 4 -> 3 -> 2 -> 1
 */
function reverseList(head) {
  let list = head
  const cur = list
  let tmp = null
  if (!cur) {
    return null
  }
  while (cur.next !== null) {
    tmp = cur.next
    cur.next = tmp.next
    tmp.next = list
    list = tmp
  }
  return list
}

/**
 * 合并链表
 */
function mergeLinks(l1, l2) {
  if (!l1) {
    return l2
  }
  if (!l2) {
    return l1
  }
  if (l1.value < l2.value) {
    l1.next = mergeLinks(l1.next, l2)
    return l1
  }
  l2.next = mergeLinks(l1, l2.next)
  return l2
}

/**
 * 含有增删查方法的单向链表
 */
function Node(value) {
  const obj = {
    value,
    next: null,
  }
  return obj
}

function LinkedList() {
  this.header = Node('header')
  this.length = 0
  this.find = function(target) {
    let current = this.header
    while (current && current.value !== target) {
      current = current.next
    }
    return current
  }
  this.insert = (value, target) => {
    const newNode = Node(value)
    let current = this.find(target)
    if (!current) {
      current = this.header
      while (current.next !== null) {
        current = current.next
      }
      current.next = newNode
      this.length++
      return
    }
    newNode.next = current.next
    current.next = newNode
    this.length++
    return newNode
  }
  this.display = function() {
    const res = []
    let current = this.header
    while (current.next !== null) {
      res.push(current.value)
      current = current.next
    }
    res.push(current.value)
    return res
  }
  this.findPre = function(target) {
    let current = this.header
    while (current.next && current.next.value !== target) {
      current = current.next
    }
    if (current.next === null) {
      return {}
    }
    return current
  }
  this.remove = function(value) {
    const current = this.find(value)
    const pre = this.findPre(value)
    if (current) {
      pre.next = current.next
    }
    return current
  }
  this.revert = function(header) {
    let list = JSON.parse(JSON.stringify(header))
    const current = list
    let template = null
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

/**
 * 双向链表
 */
function LinkedList() {
  const node = function(value) {
    const obj = {
      value,
      next: null,
      prev: null,
    }
    return obj
  }
  this.header = node('header')
  this.length = 0
  this.find = function(tartet) {
    let curNode = this.header
    while (curNode && curNode.value !== tartet) {
      curNode = curNode.next
    }
    if (!curNode) return null
    return curNode
  }
  this.append = function(value) {
    const newNode = node(value)
    let curNode = this.header
    while (curNode.next) {
      curNode = curNode.next
    }
    newNode.prev = curNode
    curNode.next = newNode
    this.length++
    return true
  }
  this.remove = function(value) {
    const cur = this.find(value)
    const pre = this.findPre(value)
    if (!cur) {
      return null
    } else {
      if (!pre) {
        this.header = null
      } else {
        pre.next = cur.next
        cur.next.prev = pre
      }
      this.length--
      return cur
    }
  }
  this.insert = function(value, target) {
    const newNode = node(value)
    const curNode = this.find(target)
    if (curNode) {
      if (curNode.next) {
        newNode.next = cur.next
        cur.next.prev = newNode
        cur.next = newNode
        newNode.prev = cur
      } else {
        newNode.prev = curNode
        curNode.next = newNode
      }
    } else {
      this.append(value)
    }
    this.length++
    return newNode
  }
  this.revert = function(header) {
    if (!header) return null
    let list = header
    const cur = list
    let tmp = null
    while (cur.next) {
      tmp = cur.next
      cur.next = tmp.next
      tmp.next = list
      list = tmp
    }
    return list
  }
  this.display = function() {
    const res = []
    let curNode = this.header
    while (curNode.next) {
      res.push(curNode.value)
      curNode = curNode.next
    }
    res.push(curNode.value)
    return res
  }
  this.findPre = function(target) {
    let curNode = this.header
    while (curNode.next && curNode.next.value !== target) {
      curNode = curNode.next
    }
    if (curNode.next) return curNode
    return null
  }
}