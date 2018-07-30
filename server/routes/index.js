const Router = require('koa-router')
const adminRouter = require('./admin-router')
const movieRouter = require('./movie-router')

const router = new Router()

router.use(adminRouter.routes()).use(adminRouter.allowedMethods())
router.use(movieRouter.routes()).use(movieRouter.allowedMethods())

module.exports = router
