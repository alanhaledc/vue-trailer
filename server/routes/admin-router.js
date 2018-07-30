const Router = require('koa-router')
const Movie = require('../db/models/movie')
const User = require('../db/models/user')
const {successResponse, failResponse, md5Pwd} = require('../utils')

const router = new Router({
  prefix: '/admin'
})

router.get('/movie/list', async ctx => {
  try {
    const {type, year} = ctx.query
    let query = {}
    if (type) {
      query.movieTypes = {$in: [type]}
    }
    if (year) {
      query.year = year
    }
    const movies = await Movie.find(query)
    ctx.body = successResponse(movies)
  } catch (err) {
    ctx.status = 500
    ctx.body = failResponse(err.message)
  }
})

router.delete('/movies', async ctx => {
  try {
    const id = ctx.query.id
    const movie = await Movie.findOne({
      _id: id
    })
    if (movie) {
      await movie.remove()
    }
    const movies = await Movie.find()
    ctx.body = successResponse(movies)
  } catch (err) {
    ctx.status = 500
    ctx.body = failResponse(err.message)
  }
})

router.post('/login', async ctx => {
  try {
    const {email, password} = ctx.request.body
    const user = await User.findOne({
      email
    })
    if (!user) {
      ctx.body = failResponse('用户不存在')
    } else {
      const match = await User.findOne({
        email,
        password: md5Pwd(password)
      })
      if (match) {
        ctx.session.user = {
          _id: match._id,
          email: match.email,
          role: match.role,
          username: match.username
        }
        ctx.body = successResponse(match)
      } else {
        ctx.body = failResponse('用户名或者密码不正确')
      }
    }
  } catch (err) {
    ctx.status = 500
    ctx.body = failResponse(err.message)
  }
})

module.exports = router
