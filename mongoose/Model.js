// 保存此文档
Model.save(function(err, doc) {
  if (err) {
    return handleError(err)
  }
  console.log(doc)
})

// 从集合中删除所有匹配conditions的文档。要仅删除匹配conditions的第一个文档，请将single选项设置为true
Model.remove({name: 'chen'}, function(err) {})

// 从集合中删除匹配conditions的第一个文档。行为类似于remove()，但是无论single选择什么，最多删除一个文档
Model.deleteOne({name: 'chen'}, function(err) {})

// 从集合中删除所有匹配conditions的文档。行为类似于remove()，但conditions无论single选择什么选项，都删除所有匹配的文档
Model.deleteMany({name: 'chen'}, function(err) {})

// 查找文件
Model.find({ name: 'chen' }, 'name age', { skip: 10 }, function (err, docs) {})

// 通过其_id字段查找单个文档
Model.findById(id, 'name, age', { lean: true }, function (err, doc) {})

// 查找一个文档
Model.findOne({name: 'chen'}, 'name, age', { lean: true }, function (err, doc) {})

// 计算数据库集合中匹配文档的数量
Model.count({name: 'chen'}, function (err, count) {})

// 查找一个文档然后更新
/**
 * new：bool-如果为true，则返回修改后的文档，而不是原始文档。默认为false（在4.0中更改）
 * upsert：bool-创建对象（如果不存在）。默认为false。
 * fields：{Object | String}-字段选择。相当于.select(fields).findOneAndUpdate()
 * maxTimeMS：对查询设置时间限制-需要mongodb> = 2.6.0
 * sort：如果条件找到多个文档，请设置排序顺序以选择要更新的文档
 * runValidators：如果为true，则对此命令运行更新验证程序。更新验证器根据模型的架构验证更新操作。
 * setDefaultsOnInsert：如果upsert为true，则在创建新文档时，猫鼬将应用模型模式中指定的默认值。此选项仅在MongoDB> = 2.4上有效，因为它依赖于MongoDB的$setOnInsertoperator。
 * rawResult：如果为true，则返回MongoDB驱动程序的原始结果
 * strict：覆盖此更新的架构的严格模式选项
 */
Model.findOneAndUpdate({name: 'chen'}, {name: 'li'}, options, { lean: true }, callback)

// 通过id查找一个文档然后更新
/**
 * new：bool-如果为true，则返回修改后的文档，而不是原始文档。默认为false（在4.0中更改）
 * upsert：bool-创建对象（如果不存在）。默认为false。
 * sort：如果条件找到多个文档，请设置排序顺序以选择要更新的文档
 * runValidators：如果为true，则对此命令运行更新验证程序。更新验证器根据模型的架构验证更新操作。
 * setDefaultsOnInsert：如果upsert为true，则在创建新文档时，猫鼬将应用模型模式中指定的默认值。此选项仅在MongoDB> = 2.4上有效，因为它依赖于MongoDB的$setOnInsertoperator。
 * select：设置要返回的文档字段
 * rawResult：如果为true，则返回MongoDB驱动程序的原始结果
 * strict：覆盖此更新的架构的严格模式选项
 */
Model.findByIdAndUpdate(id, { name: 'chen' }, options, { lean: true }, callback)

// 查找一个文档然后删除
/**
 * sort：如果条件找到多个文档，请设置排序顺序以选择要更新的文档
 * maxTimeMS：对查询设置时间限制-需要mongodb> = 2.6.0
 * select：设置要返回的文档字段
 * rawResult：如果为true，则返回MongoDB驱动程序的原始结果
 * strict：覆盖此更新的架构的严格模式选项
 */
Model.findOneAndRemove({ name: 'chen' }, options, callback)

// 通过id查找一个文档然后删除
/**
 * sort：如果条件找到多个文档，请设置排序顺序以选择要更新的文档
 * maxTimeMS：对查询设置时间限制-需要mongodb> = 2.6.0
 * select：设置要返回的文档字段
 * rawResult：如果为true，则返回MongoDB驱动程序的原始结果
 * strict：覆盖此更新的架构的严格模式选项
 */
Model.findByIdAndRemove(id, options, callback)

// 更新数据库中的一个文档而不返回它
/**
 * sort：如果条件找到多个文档，请设置排序顺序以选择要更新的文档
 * upsert （布尔值）是否创建不匹配的文档（假）
 * multi （布尔值）是否应更新多个文档（假）
 * runValidators：如果为true，则对此命令运行更新验证程序。更新验证器根据模型的架构验证更新操作。
 * setDefaultsOnInsert：如果upsert为true，则在创建新文档时，猫鼬将应用模型模式中指定的默认值。此选项仅在MongoDB> = 2.4上有效，因为它依赖于MongoDB的$setOnInsertoperator。
 * strict（布尔值）会覆盖strict此更新的选项
 * overwrite （布尔值）禁用仅更新模式，从而允许您覆盖文档（false）
 */
Model.update({ name: 'chen' }, { name: 'li' }, options, function (err, doc) {})

// 与update()相同，除了MongoDB会更新所有匹配的文档（而不是第一个），无论该multi选项的值如何
/**
 * sort：如果条件找到多个文档，请设置排序顺序以选择要更新的文档
 * upsert （布尔值）是否创建不匹配的文档（假）
 * multi （布尔值）是否应更新多个文档（假）
 * runValidators：如果为true，则对此命令运行更新验证程序。更新验证器根据模型的架构验证更新操作。
 * setDefaultsOnInsert：如果upsert为true，则在创建新文档时，猫鼬将应用模型模式中指定的默认值。此选项仅在MongoDB> = 2.4上有效，因为它依赖于MongoDB的$setOnInsertoperator。
 * strict（布尔值）会覆盖strict此更新的选项
 * overwrite （布尔值）禁用仅更新模式，从而允许您覆盖文档（false）
 */
Model.updateMany({ name: 'chen' }, { name: 'li' }, options, function (err, doc) {})

// 与update()相同，除了MongoDB 仅更新匹配的第一个文档，而不管该multi选项的值如何
/**
 * sort：如果条件找到多个文档，请设置排序顺序以选择要更新的文档
 * upsert （布尔值）是否创建不匹配的文档（假）
 * multi （布尔值）是否应更新多个文档（假）
 * runValidators：如果为true，则对此命令运行更新验证程序。更新验证器根据模型的架构验证更新操作。
 * setDefaultsOnInsert：如果upsert为true，则在创建新文档时，猫鼬将应用模型模式中指定的默认值。此选项仅在MongoDB> = 2.4上有效，因为它依赖于MongoDB的$setOnInsertoperator。
 * strict（布尔值）会覆盖strict此更新的选项
 * overwrite （布尔值）禁用仅更新模式，从而允许您覆盖文档（false）
 */
Model.updateOne({ name: 'chen' }, { name: 'li' }, options, function (err, doc) {})

// 与update()相同，除了MongoDB用给定的文档替换现有文档（没有像$set的原子运算符）
Model.replaceOne({ name: 'chen' }, { name: 'li' }, options, function (err, doc) {})

// 执行mapReduce命令
/**
 * query {Object}查询过滤器对象。
 * sort {Object}使用此键对输入对象进行排序
 * limit {Number}个最大文件数
 * keeptemp {Boolean，default：false}保留临时数据
 * finalize {Function}完成函数
 * scope 在执行期间暴露给map / reduce / finalize的{Object}作用域变量
 * jsMode{Boolean，default：false}可以使执行停留在JS中。在MongoDB> 2.0.X中提供
 * verbose {Boolean，default：false}提供有关作业执行时间的统计信息。
 * readPreference {串}
 * out* {Object，默认：{inline：1}}设置地图缩小作业的输出目标。
 */

// out
/**
 * {inline:1} 结果以数组形式返回
 * {replace: 'collectionName'} 将结果添加到collectionName：结果替换集合
 * {reduce: 'collectionName'} 将结果添加到collectionName：如果检测到重复，则使用reducer / finalize函数
 * {merge: 'collectionName'} 将结果添加到collectionName：如果存在重复，则新文档将覆盖旧文档
 */
var o = {};
o.map = function () { emit(this.name, 1) }
o.reduce = function (k, vals) { return vals.length }
Model.mapReduce(o, function (err, results) {})

// 填充文档
Model.populate()