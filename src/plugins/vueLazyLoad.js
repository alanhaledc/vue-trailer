import VueLazyLoad from 'vue-lazyload'

// leave the export, even if you don't use it
export default ({ Vue }) => {
  Vue.use(VueLazyLoad, {
    loading: require('../statics/loading.gif')
  })
}
