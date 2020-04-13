### 引入 mongoose，连接数据库

[mongooseOptions](http://mongodb.github.io/node-mongodb-native/2.2/api/MongoClient.html)

bufferCommands - 这是 mongoose 特有的选项 (不传到 MongoDB) ，禁用 mongoose 缓存机制
user/pass - 用于认证的用户名和密码。mongoose 特有，等价于 MongoDB 驱动的 auth.user 和 auth.password 选项
autoIndex - 默认情况下，mongoose 在连接时会自动建立 schema 的索引。这有利于开发，但是在大型生产环境下不是十分理想，因为索引建立会导致性能下降。如果 autoIndex 设为 false，mongoose 将不会自动建立索引
dbName - 指定要连接的数据库名称（覆盖连接字符串）。 如果你使用 mongodb+srv 语法连接 MongoDB Atlas, 你 需要使用 dbName 指定数据库

以下是一些重要选项
autoReconnect - 底层 MongoDB 驱动在连接丢失后将自动重连。除非你是可以自己管理连接池的高手，否则不要把这个选项设为 false
reconnectTries - If you're connected to a single server or mongos proxy (as opposed to a replica set), the MongoDB driver will try to reconnect every reconnectInterval milliseconds for reconnectTries times, and give up afterward. When the driver gives up, the mongoose connection emits a reconnectFailed event. This option does nothing for replica set connections.
reconnectInterval - 见 reconnectTries
promiseLibrary - 设定底层 promise 库
poolSize - MongoDB 保持的最大 socket 连接数。 poolSize 的默认值是 5。注意，MongoDB 3.4 之前， MongoDB 只允许每个 socket 同时进行一个操作，所以如果你有几个缓慢请求卡着后面快的请求，可以尝试增加连接数。
bufferMaxEntries - MongoDB 驱动同样有自己的离线时缓存机制。如果你希望链接错误时终止数据库操作，请将此选项设为 0 以及把 bufferCommands 设为 false 。

以下只是一个栗子，可以根据实际情况修改值。

const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:8000/test'
mongoose.connect(url, mongooseOptions)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error.'))
db.once('open', () => console.log(`connected at ${url}`))

### 定义mongoose

const schemaOptions = {
  autoIndex: null,
  bufferCommands: true, // 缓存
  capped: false, // 最大容量
  collection: 'data', // 自定义collection的名称
  id: true,
  _id: true, // document的唯一id
  minimize: true, // 默认不保存空对象
  read: // 
  safe: true, // 
  shardKey: null, // 分片相关
  strict: true, // 不能 save schema 里没有声明的属性
  strictQuery: // 
  toJSON: // 
  toObject: // 
  typeKey: 'type', // 
  validateBeforeSave：true, // 
  versionKey: '__v', // 这个值包含文件的内部修订号
  collation: null, // 
  skipVersioning: // 
  timestamps: { timestamps: { createdAt: 'created_at' } }, // 可以通过设定 timestamps.createdAt 和 timestamps.updatedAt 自定义字段名称。
  useNestedStrict: 'false', // 
}

const Schema = mongoose.Schema
const exampleSchema = new Schema(
  {
    name: String,
    age: Number,
    date: Date, // 用内建 Date 方法， 请手动调用 doc.markModified('pathToYourDate') 告诉 mongoose 你修改了数据。
    hidden: Boolean,
    // mongoose 无法自动检测并保存你的修改。 调用 文档的 .markModified(path) 方法， 传入你的 Mixed 字段路径
    mixed: {},
    mixed: Object,
    mixed: Schema.Types.Mixed,
    id: Schema.Types.ObjectId,
    // 指定空数组相当于 Mixed，以下操作相当于创建 Mixed 数组。数组的默认值是 [] （空数组）。要手动把默认值设置为 undefined，从而覆盖 []。
    array: [],
    array: Array,
    array: [Schema.Types.Mixed],
    array: [{}],
    binary: Buffer,
    // 全部可用的选项
    string: {
      type: String, // 定义类型
      required: 布尔值或函数 如果值为真，为此属性添加 required 验证器
      default: 任何值或函数 设置此路径默认值。如果是函数，函数返回值为默认值
      select: 布尔值 指定 query 的默认 projections
      validate: 函数 adds a validator function for this property
      get: 函数 使用 Object.defineProperty() 定义自定义 getter
      set: 函数 使用 Object.defineProperty() 定义自定义 setter
      alias: 字符串 仅mongoose >= 4.10.0。 为该字段路径定义虚拟值 gets/sets
    },
    // 索引可用的选项
    index: {
      type: String,
      index: 布尔值 是否对这个属性创建索引
      unique: 布尔值 是否对这个属性创建唯一索引
      sparse: 布尔值 是否对这个属性创建稀疏索引
    },
    // String可用的选项
    string: {
      type: String,
      lowercase: 布尔值 是否在保存前对此值调用 .toLowerCase()
      uppercase: 布尔值 是否在保存前对此值调用 .toUpperCase()
      trim: 布尔值 是否在保存前对此值调用 .trim()
      match: 正则表达式 创建验证器检查这个值是否匹配给定正则表达式
      enum: 数组 创建验证器检查这个值是否包含于给定数组
    },
    // Number可用的选项
    number: {
      typpe: Number,
      min: 数值 创建验证器检查属性是否大于或等于该值
      max: 数值 创建验证器检查属性是否小于或等于该值
    }
    // Date可用的选项
    date: {
      type: Date,
      min: 数值 创建验证器检查属性是否大于或等于该值
      max: 数值 创建验证器检查属性是否小于或等于该值
    }
  },
  schemaOptions,
)

const examples = mongoose.model('example', exampleSchema)