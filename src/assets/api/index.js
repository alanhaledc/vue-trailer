import axios from 'axios'
import { Notify } from 'quasar'
import router from '../../router'

const adminRequest = axios.create({
  baseURL: '/api/admin'
})

adminRequest.interceptors.response.use(null, error => {
  const res = error.response
  if (res.status === 401) {
    Notify.create({
      message: '没有权限，请登录',
      type: 'warning',
      position: 'top'
    })
    router().push('/admin/login')
  }
})

const movieRequest = axios.create({
  baseURL: '/api/movie'
})

export default {
  getAdminMovies(type, year) {
    return adminRequest.get('/movie/list', { params: { type, year } })
  },
  deleteMovie(id) {
    return adminRequest.delete('/movies', { params: { id } })
  },
  login(email, password) {
    return adminRequest.post('/login', { email, password })
  },
  logout() {
    return adminRequest.post('/logout')
  },
  getMovies(type, year) {
    return movieRequest.get('/list', { params: { type, year } })
  },
  getMovieDetail(id) {
    return movieRequest.get('/:id', { params: { id } })
  }
}
