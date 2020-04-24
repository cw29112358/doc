/**
 * js 原生实现 bind
 */
Function.prototype.bind = function () {
  var _self = this
  var context = Array.prototype.shift.call(arguments)
  var args = Array.prototype.slice.call(arguments)
  return function () {
    var innerArgs = Array.prototype.slice.call(arguments)
    var finalArgs = Array.prototype.concat(args, innerArgs)
    _self.apply(context, finalArgs)
  }
}