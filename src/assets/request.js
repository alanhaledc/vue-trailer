import axios from 'axios'
import { Notify } from 'quasar'
import createRouter from '../router'

const routers = createRouter()

const adminRequest = axios.create({
  baseURL: '/api/admin'
})

// 登录权限拦截
adminRequest.interceptors.response.use(null, error => {
  const res = error.response
  if (res.status === 401) {
    Notify.create({
      message: '没有权限，请登录',
      type: 'warning',
      position: 'top'
    })
    routers.replace('/admin/login')
  }
})

const movieRequest = axios.create({
  baseURL: '/api/movie'
})

export const getAdminMovies = () => {
  return adminRequest.get('/movie/list')
}
export const deleteMovie = id => {
  return adminRequest.delete('/movies', { params: { id } })
}
export const login = ({ email, password }) => {
  return adminRequest.post('/login', { email, password })
}
export const logout = () => {
  return adminRequest.post('/logout')
}
export const getMovies = ({ type, year }) => {
  return movieRequest.get('/list', { params: { type, year } })
}
export const getMovieDetail = id => {
  return movieRequest.get('/detail', { params: { id } })
}
