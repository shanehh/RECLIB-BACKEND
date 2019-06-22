/* eslint-env node */
const { log } = require('./src/utils')

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
// 引入插件
const compression = require('compression')
const cors = require('cors')
// 启动服务
const app = express()
// !使用 gzip 压缩, 要写最上面
app.use(compression())
// 非生产环境允许跨域
if (!process.env.NODE_ENV === 'production') {
  log('okay')
  app.use(cors())
}
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 设置路由
app.use('/', require('./routes/'))
app.use('/signup', require('./routes/signup.js'))
app.use('/login', require('./routes/login.js'))
app.use('/api', require('./routes/api.js'))
app.use('/comment', require('./routes/comment.js'))
app.use('/stock', require('./routes/stock.js'))
app.use('/logout', require('./routes/logout.js'))
app.use('/profile', require('./routes/profile.js'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
// log(process.env)
log('1. Server starts to run')
log(`2. State: ${process.env.NODE_ENV}`)
log(`3. IP: ${'http://127.0.0.1:3000'}`)
module.exports = app
