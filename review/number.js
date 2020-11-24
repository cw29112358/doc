/**
 * 数字千分位的处理
 */
// 方法一:正则
str.replace(/\B(?=(?:\d{3})+\b)/g, ',')
// 方法二
function transform(data) {
  let newDate
  if (typeof data === 'number') {
    newDate = String(data)
  } else if (typeof data !== 'string') {
    return data
  }
  const index = newDate.indexOf('.')
  const after = newDate.slice(index)
  let integer = newDate.slice(0, index)
  let temp = ''
  while (integer.length > 3) {
    temp = `,${integer.slice(-3)}${temp}`
    integer = integer.slice(0, -3)
  }
  if (integer) {
    temp = integer + temp
  }
  return temp + after
}