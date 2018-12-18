import api from '../../assets/api'

import { normalizeAdminMovies } from '../../assets/utils'

const state = {
  adminMovieList: []
}
const getters = {
  adminMovieList: state => state.adminMovieList
}
const mutations = {
  setAdminMovieList: (state, list) => (state.adminMovieList = list)
}
const actions = {
  login: ({ commit }, { email, password }) => {
    return api.login(email, password)
  },
  logout: ({ commit }) => {
    return api.logout()
  },
  getAdminMovies: ({ commit }) => {
    api.getAdminMovies()
      .then(res => {
        if (res.data.success) {
          commit('setAdminMovieList', normalizeAdminMovies(res.data.data))
        }
      })
  },
  deleteMovie: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      api.deleteMovie(id)
        .then(res => {
          if (res.data.success) {
            commit('setAdminMovieList', normalizeAdminMovies(res.data.data))
          }
          resolve(res)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
