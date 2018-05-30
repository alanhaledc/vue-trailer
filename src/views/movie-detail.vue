<template>
  <div class="movie-detail">
    <div class="play-container">
      <d-player :options="playOptions" ref="player"/>
    </div>
    <div class="detail">
      <router-link class="head" to="/">回到首页</router-link>
      <el-tabs v-model="cartActive" class="tabs">
        <el-tab-pane label="关于本片" name="1" class="text">
          <h3 class="title">{{movie.title}}</h3>
          <div class="rate">豆瓣评分: {{movie.rate}}</div>
          <div class="tags">电影分类: {{movie.tags && movie.tags.join(' ')}}</div>
          <div class="time">更新时间: {{updateTime}}前更新</div>
          <div class="summary">影片介绍：</div>
          {{movie.summary}}
        </el-tab-pane>
        <el-tab-pane label="同类电影" name="2" class="relative" tag="ul">
          <li class="container" v-for="item in relativeMovies" :key="item._id">
            <img :src="site + item.posterKey" width="70" height="100">
            <div class="date-country">
              <h4>{{item.title}}</h4>
              <div>{{pubDate(item.pubdate.date)}} {{item.pubdate.country}}</div>
            </div>
          </li>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  import DPlayer from 'vue-dplayer'
  import 'vue-dplayer/dist/vue-dplayer.css'

  export default {
    data() {
      return {
        movie: {},
        relativeMovies: [],
        site: 'http://p9bh93etu.bkt.clouddn.com/',
        cartActive: '1'
      }
    },
    created() {
      this._getMovieDetail()
    },
    mounted() {
      // this.player = this.$refs.player
    },
    computed: {
      playOptions() {
        let options = {
          video: {
            url: this.site + this.movie.videoKey,
            pic: this.site + this.movie.coverKey
          }
        }
        return options
      },
      updateTime() {
        return moment(this.movie.meta.createdAt).fromNow(true)
      }
    },
    methods: {
      _getMovieDetail() {
        this.$axios.get(`/api/v0/movies/${this.$route.params.id}`).then(res => {
          if (res.data.success === true) {
            this.movie = res.data.data.movie
            this.relativeMovies = res.data.data.relativeMovies
          }
        })
      },
      pubDate(time) {
        return moment(time).format('YYYY.MM')
      }
    },
    components: {
      DPlayer
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .movie-detail
    display flex
    .play-container
      flex 0 0 calc(100% - 320px)
      width calc(100% - 320px)
    .detail
      flex 1
      padding 10px
      text-align center
      .head
        display inline-block
        font-size 20px
        text-decoration none
      .tabs
        .text
          text-align left
          padding 10px
          box-sizing border-box
          .rate, .tags, .time, .summary
            margin-bottom 10px
        .relative
          text-align left
          .container
            display flex
            margin-bottom 10px
            img
              flex 0 0 80px
              width 80px
              margin-right 20px
            .date-country
              flex 1

</style>
