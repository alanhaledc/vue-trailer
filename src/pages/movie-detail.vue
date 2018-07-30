<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="row">
        <div class="col-9">
          <div id="video-player"></div>
        </div>
        <div class="col-3">
          <div class="text-center">
            <q-btn class="q-headline" flat @click.native="goHome">
              回到首页
            </q-btn>
          </div>
          <q-item>
            <q-tabs
              inverted
              v-model="selectTab"
              align="justify"
              style="width: 100%"
              no-pane-border
            >
              <q-tab slot="title" name="tab-1" label="关于本片"></q-tab>
              <q-tab slot="title" name="tab-2" label="同类电影"></q-tab>
              <q-tab-pane name="tab-1">
                <q-list-header class="text-center q-title">
                  {{movieDetail.title}}
                </q-list-header>
                <q-item>
                  <q-item-side>豆瓣评分</q-item-side>
                  <q-item-main>{{movieDetail.rate}}分</q-item-main>
                </q-item>
                <q-item>
                  <q-item-side>电影分类</q-item-side>
                  <q-item-main>{{movieDetail.tags}}</q-item-main>
                </q-item>
                <q-item>
                  <q-item-side>更新时间</q-item-side>
                  <q-item-main>{{movieDetail.update}}前更新</q-item-main>
                </q-item>
                <q-item>
                  <q-item-side>影片介绍</q-item-side>
                  <q-item-main>{{movieDetail.summary}}</q-item-main>
                </q-item>
              </q-tab-pane>
              <q-tab-pane name="tab-2">
                <q-item
                  v-for="movie in relativeMovies"
                  :key="movie._id"
                  @click.native="goMovieDetail(movie._id)"
                >
                  <q-item-side>
                    <img :src="movie.poster" width="60" height="90">
                  </q-item-side>
                  <q-item-main>
                    <q-item class="q-title">{{movie.title}}</q-item>
                    <q-item>{{movie.pubdate}}/{{movie.country}}</q-item>
                  </q-item-main>
                </q-item>
              </q-tab-pane>
            </q-tabs>
          </q-item>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import 'dplayer/dist/DPlayer.min.css'
  import DPlayer from 'dplayer'

  export default {
    name: 'MovieDetail',
    // props: {
    //   id: String
    // },
    data() {
      return {
        selectTab: 'tab-1'
      }
    },
    computed: {
      ...mapGetters('movie', ['movieDetail', 'relativeMovies'])
    },
    /**
     * 同页面切换重新获取数据，并且重置播放器
     * @param to
     * @param from
     * @param next
     */
    beforeRouteUpdate(to, from, next) {
      this.id = to.params.id
      this.getMovieDetail(this.id)
      this.setPlayer()
      next()
    },
    created() {
      this.id = this.$route.params.id
      this.getMovieDetail(this.id)
      this.setPlayer()
    },
    methods: {
      goHome() {
        this.$router.push('/')
      },
      goMovieDetail(id) {
        this.$router.push(`/detail/${id}`)
      },
      setPlayer() {
        setTimeout(() => {
          this.player = new DPlayer({
            container: document.getElementById('video-player'),
            screenshot: true,
            video: {
              url: this.movieDetail.url,
              pic: this.movieDetail.pic,
              thumbnails: this.movieDetail.pic
            }
          })
        }, 200)
      },
      ...mapActions('movie', ['getMovieDetail'])
    }
    // watch: {
    //   'id'(newId) {
    //     this.getMovieDetail(newId)
    //   }
    // }
  }
</script>

<style>
</style>
