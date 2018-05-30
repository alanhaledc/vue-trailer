import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home'
import MovieDetail from 'views/movie-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/movie/:id',
      name: 'MovieDetail',
      component: MovieDetail
    }
  ]
})
