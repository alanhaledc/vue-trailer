import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home'
import MovieDetail from 'views/movie-detail'
import MovieTable from 'views/movie-table'

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
    },
    {
      path: '/admin/movie/list',
      name: 'MovieTable',
      component: MovieTable
    }
  ]
})
