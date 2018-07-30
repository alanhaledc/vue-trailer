import axios from 'axios'
import {createError} from '../utils'

const adminRequest = axios.create({
  baseURL: '/admin'
})

const movieRequest = axios.create({
  baseURL: '/movie'
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request
      .then(res => {
        const data = res.data
        if (!data) {
          return reject(createError(400, 'no result'))
        }
        if (!data.success) {
          resolve({
            status: 1,
            message: data.message
          })
        }
        resolve({
          status: 0,
          result: data.result
        })
      })
      .catch(err => {
        const res = err.response
        if (res.status === 401) {
          reject(createError(401, 'need auth'))
        }
      })
  })
}

export default {
  getAdminMovies(type, year) {
    return handleRequest(adminRequest.get('/movie/list', {params: {type, year}}))
  },
  deleteMovie(id) {
    return handleRequest(adminRequest.delete('/movies', {params: {id}}))
  },
  login(email, password) {
    return handleRequest(adminRequest.post('/login', {email, password}))
  },
  getMovies(type, year) {
    return handleRequest(movieRequest.get('/list', {params: {type, year}}))
  },
  getMovieDetail(id) {
    return handleRequest(movieRequest.get('/:id', {params: {id}}))
  }
}
