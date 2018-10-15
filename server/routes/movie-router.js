const Router = require('koa-router')
const Movie = require('../db/models/movie')

const {successResponse, failResponse} = require('../utils')

const router = new Router({
  prefix: '/movie'
})

router.get('/list', async ctx => {
  try {
    const {type, year} = ctx.query
    let query = {}
    if (type) {
      // { movieTypes: $in: [type] }
      query.movieTypes = {$in: [type]}
    }
    if (year) {
      // { year: year }
      query.year = year
    }
    const movies = await Movie.find(query)
    ctx.body = successResponse(movies)
  } catch (err) {
    ctx.status = 500
    ctx.body = failResponse(err.message)
  }
})

router.get('/:id', async ctx => {
  try {
    const id = ctx.query.id
    const movie = await Movie.findOne({
      _id: id
    })
    const relativeMovies = await Movie.find({
      movieTypes: {
        $in: movie.movieTypes
      }
    })
    ctx.body = successResponse({
      movie,
      relativeMovies
    })
  } catch (err) {
    ctx.status = 500
    ctx.body = failResponse(err.message)
  }
})

module.exports = router
