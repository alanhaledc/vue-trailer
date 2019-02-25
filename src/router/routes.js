const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', redirect: 'list/全部' },
      {
        path: 'list/:category',
        component: () => import('pages/movie-list.vue')
      },
      { path: 'year/:year', component: () => import('pages/movie-list.vue') }
    ]
  },
  {
    path: '/detail/:id',
    props: true,
    component: () => import('pages/movie-detail.vue')
  },
  {
    path: '/admin/login',
    component: () => import('pages/login.vue')
  },
  {
    path: '/admin/movie/list',
    component: () => import('pages/movie-tab.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
