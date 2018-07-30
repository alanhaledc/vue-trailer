const Koa = require('koa')
const logger = require('koa-logger')
const serve = require('koa-static')
const history = require('koa2-connect-history-api-fallback')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const path = require('path')

const routers = require('./routes')
require('./db/index')

const CONFIG = {
  key: 'koa:trailer',
  maxAge: 1000 * 60 * 60 * 24,
  overwrite: true,
  httpOnly: false,
  signed: true,
  rolling: false
}

const app = new Koa()
app.keys = ['vue koa trailer']
app.use(session(CONFIG, app))
app.use(history())
app.use(logger())
app.use(bodyParser())
app.use(serve(path.join(__dirname, './static')))

app.use(routers.routes()).use(routers.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 9093

app.listen(PORT, HOST, () => {
  console.log(`Server started at ${HOST}:${PORT} at ${new Date()}`)
})
