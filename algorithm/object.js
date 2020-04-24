/**
 * 深拷贝简单版
 */
const newObj = JSON.parse(JSON.stringify(obj))

/**
 * 深拷贝复杂版
 */
function deepClone(data) {
  if (!data) return data
  if (Object.prototype.toString.call(data) === '[object Number]') return data
  if (Object.prototype.toString.call(data) === '[object String]') return data
  if (Object.prototype.toString.call(data) === '[object Boolean]') return data
  if (Object.prototype.toString.call(data) === '[object Symbol]') return data
  if (Object.prototype.toString.call(data) === '[object Undefined]') return undefined
  if (Object.prototype.toString.call(data) === '[object Null]') return null
  if (Object.prototype.toString.call(data) === '[object RegExp]') {
    var pattern = data.valueOf();
    var flags = (pattern.global ? 'g' : '') +
      (pattern.ignorecase ? 'i' : '') + (pattern.multiline ? 'm' : '');
    var reg = new RegExp(pattern.source, flags);
    return reg;
  }
  if (Object.prototype.toString.call(data) === '[object Date]') return new Date(data)
  if (Object.prototype.toString.call(data) === '[object Set]') return new Set(data)
  if (Object.prototype.toString.call(data) === '[object Map]') return new Map(data)
  if (Object.prototype.toString.call(data) === '[object Math]') return JSON.parse(JSON.stringify(data))
  if (Object.prototype.toString.call(data) === '[object Function]') return JSON.parse(JSON.stringify(data))
  if (Object.prototype.toString.call(data) === '[object Promise]') return JSON.parse(JSON.stringify(data))
  const clone = Array.isArray(data) ? [] : {}
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (typeof data[key] === 'object') {
        clone[key] = deepClone(data[key])
      } else {
        clone[key] = data[key]
      }
    }
  }
  return clone
}