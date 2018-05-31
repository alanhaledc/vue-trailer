<template>
  <div class="movie-list">
    <el-row :gutter="20">
      <el-col :sm="12" :md="8" :lg="6" v-for="movie in movieList" :key="movie._id" :gutter="20">
        <el-card :body-style="{ padding: '10px'}" shadow="hover">
          <img :src="site + movie.posterKey" width="280" height="420" @click="showDialog(movie.videoKey)">
          <div class="text" @click="goDetail(movie._id)">
            <div class="title">{{movie.title}}</div>
            <div class="summary">{{movie.summary}}
            </div>
            <div class="description">
              <span class="el-icon-info">{{updateTime(movie.meta.createdAt)}}前更新</span>
              <span class="el-icon-star-on">{{movie.rate}}分</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose">
      <d-player :options="playOptions" ref="player"></d-player>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  import 'moment/locale/zh-cn'

  import DPlayer from 'vue-dplayer'
  import 'vue-dplayer/dist/vue-dplayer.css'

  moment.locale('zh-cn')

  export default {
    data() {
      return {
        movieList: [],
        site: 'http://p9bh93etu.bkt.clouddn.com/',
        dialogVisible: false,
        currentKey: ''
      }
    },
    created() {
      this._getMovieList()
    },
    computed: {
      playOptions() {
        let option = {
          video: {
            url: this.site + this.currentKey
          },
          screenshot: true,
          autoplay: true
        }
        return option
      }
    },
    methods: {
      _getMovieList() {
        this.$axios.get('/api/v0/movies').then(res => {
          if (res.data.success === true) {
            this.movieList = res.data.data
          }
        })
      },
      updateTime(time) {
        return moment(time).fromNow(true)
      },
      goDetail(id) {
        this.$router.push({
          path: `/movie/${id}`
        })
      },
      showDialog(videoKey) {
        this.dialogVisible = true
        this.currentKey = videoKey
      },
      handleClose(done) {
        done()
        this.$refs.player.dp.pause()
      }
    },
    components: {
      DPlayer
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .el-col
    margin-bottom 20px

  .title
    font-size 18px
    margin 10px 0

  .summary
    font-size 16px
    margin 10px 0 20px
    height 190px
    overflow hidden
    text-overflow: ellipsis

  .description
    display flex
    justify-content space-between
</style>
