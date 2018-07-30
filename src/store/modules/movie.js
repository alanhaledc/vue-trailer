import api from '../../assets/api'

import {normalizeMovieDetail, normalizeMovies, normalizeRelativeMovies} from '../../assets/utils'

const state = {
  movieList: [],
  movieDetail: {},
  relativeMovies: []
}
const getters = {
  movieList: state => state.movieList,
  movieDetail: state => state.movieDetail,
  relativeMovies: state => state.relativeMovies
}
const mutations = {
  setMovieList: (state, list) => (state.movieList = list),
  setMovieDetail: (state, data) => (state.movieDetail = data),
  setRelativeMovies: (state, list) => (state.relativeMovies = list)
}
const actions = {
  getMovies: ({commit}, {type, year}) => {
    api.getMovies(type, year)
      .then(data => {
        if (data.status === 0) {
          commit('setMovieList', normalizeMovies(data.result))
        }
      })
  },
  getMovieDetail: ({commit}, id) => {
    api.getMovieDetail(id)
      .then(data => {
        if (data.status === 0) {
          commit('setMovieDetail', normalizeMovieDetail(data.result.movie))
          commit('setRelativeMovies', normalizeRelativeMovies(data.result.relativeMovies))
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
