import api from '../../assets/api'

import { normalizeMovieDetail, normalizeMovies, normalizeRelativeMovies } from '../../assets/utils'

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
  getMovies: ({ commit }, { type, year }) => {
    api.getMovies(type, year)
      .then(res => {
        if (res.data.success) {
          commit('setMovieList', normalizeMovies(res.data.data))
        }
      })
  },
  getMovieDetail: ({ commit }, id) => {
    api.getMovieDetail(id)
      .then(res => {
        if (res.data.success) {
          commit('setMovieDetail', normalizeMovieDetail(res.data.data.movie))
          commit('setRelativeMovies', normalizeRelativeMovies(res.data.data.relativeMovies))
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
