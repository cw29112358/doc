/**
 * 快速排序
 */
function fastSort(array) {
  if (array.length <= 1) return array
  var index = Math.floor(array.length / 2),
    template = array.splice(index, 1),
    left = [],
    right = []
  for (var i = 0; i < array.length; i++) {
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
  for (var i = 0; i < array.length - 1; i++) {
    for (var j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        var temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
  return array
}