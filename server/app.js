const Koa = require('koa')
const logger = require('koa-logger')
const serve = require('koa-static')
const history = require('koa2-connect-history-api-fallback')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const path = require('path')
const { failureResponse } = require('./utils')

const isProd = process.env.NODE_ENV === 'production'

const routers = require('./routes')
require('./database/index')

const CONFIG = {
  key: 'trailer-session',
  maxAge: 1000 * 60 * 60 * 24,
  overwrite: true,
  httpOnly: false,
  signed: true,
  rolling: false
}

const app = new Koa()

app.keys = ['vue koa trailer']

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log('error:', err.message)
    if (err.status === 401) {
      failureResponse(ctx, 401, '没有权限，请重新登录')
    } else {
      isProd
        ? failureResponse(ctx, 500, '服务器内部错误')
        : failureResponse(ctx, 500, err.message)
    }
  }
})

app.use(session(CONFIG, app))
app.use(history())
app.use(logger())
app.use(bodyParser())
app.use(
  serve(path.join(__dirname, './static'), {
    maxage: 1000 * 60 * 60 * 24 * 7
  })
)

app.use(routers.routes()).use(routers.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 9093

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}!`)
})
