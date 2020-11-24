/**
 * 快速排序
 */
function fastSort(array) {
  if (array.length <= 1) return array
  let index = Math.floor(array.length / 2),
    template = array.splice(index, 1),
    left = [],
    right = []
  for (let i = 0; i < array.length; i++) {
    if (array[i] < template[0]) {
      left.push(array[i])
    }
    if (array[i] >= template[0]) {
      right.push(array[i])
    }
  }
  return fastSort(left).concat(template, fastSort(right))
}

/**
 * 冒泡排序
 */
function bubbleSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
  return array
}

/**
 * 数组去重
 */
function uniqueOfReduce(arr) {
  const newObj = {}
  return arr.reduce((res, cur) => {
    newObj[cur.key] ? '' : (newObj[cur.key] = true && res.push(cur))
    return res
  }, [])
}

function uniqueOfFor(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i].id === arr[j].id) {
        arr.splice(j, 1)
        j -= 1
      }
    }
  }
  return arr
}

// 只有完全相同的对象才会去除
function uniqueOfJSON(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (JSON.stringify(arr[i]) === JSON.stringify(arr[j])) {
        arr.splice(j, 1)
      }
    }
  }
  return arr
}

/**
 * reduce 实现 map
 */
Array.prototype.map = function(cb) {
  const arrPrototype = this
  return arrPrototype.reduce((result, current, index, arr) => {
    result.push(cb(current, index, arr))
    return result
  }, [])
}