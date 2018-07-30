import api from '../../assets/api'

import {normalizeAdminMovies} from '../../assets/utils'

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
  login: ({commit}, {email, password}) => {
    return new Promise((resolve, reject) => {
      api.login(email, password)
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getAdminMovies: ({commit}) => {
    api.getAdminMovies()
      .then(data => {
        if (data.status === 0) {
          commit('setAdminMovieList', normalizeAdminMovies(data.result))
        }
      })
  },
  deleteMovie: ({commit}, id) => {
    api.deleteMovie(id)
      .then(data => {
        if (data.status === 0) {
          commit('setAdminMovieList', normalizeAdminMovies(data.result))
        }
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
