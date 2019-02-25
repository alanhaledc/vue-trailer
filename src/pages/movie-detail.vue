<template>
  <q-layout>
    <q-page-container>
      <q-page
        padding
        class="row"
      >
        <div class="col-9">
          <div id="video-player"></div>
        </div>
        <div class="col-3">
          <div class="text-center">
            <q-btn
              class="q-headline"
              flat
              @click.native="goHome"
            >
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
              <q-tab
                slot="title"
                name="tab-1"
                label="关于本片"
              ></q-tab>
              <q-tab
                slot="title"
                name="tab-2"
                label="同类电影"
              ></q-tab>
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
                  style="cursor: pointer"
                >
                  <q-item-side>
                    <img
                      :src="movie.poster"
                      width="60"
                      height="90"
                    >
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
import 'dplayer/dist/DPlayer.min.css'
import DPlayer from 'dplayer'
import { getMovieDetail } from '../assets/request'
import { normalizeMovieDetail, normalizeRelativeMovies } from '../assets/utils'

export default {
  name: 'MovieDetail',
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      selectTab: 'tab-1',
      movieDetail: {},
      relativeMovies: []
    }
  },
  created() {
    this.id = this.$route.params.id
    this._getmovieData(this.id)
    setTimeout(() => {
      this.setPlayer()
    }, 200)
  },
  /**
   * 同页面切换重新获取数据，并且重置播放器
   */
  beforeRouteUpdate(to, from, next) {
    const id = to.params.id
    this._getmovieData(id)
    setTimeout(() => {
      if (this.player) {
        this.player.destroy()
        this.setPlayer()
      }
    }, 500)
    next()
  },
  methods: {
    _getmovieData(id) {
      getMovieDetail(id).then(res => {
        if (res.data.success) {
          this.movieDetail = normalizeMovieDetail(res.data.data.movie)
          this.relativeMovies = normalizeRelativeMovies(
            res.data.data.relativeMovies
          )
        }
      })
    },
    goHome() {
      this.$router.push('/')
    },
    goMovieDetail(id) {
      this.$router.push(`/detail/${id}`)
    },
    setPlayer() {
      this.player = new DPlayer({
        container: document.getElementById('video-player'),
        screenshot: true,
        video: {
          url: this.movieDetail.url,
          pic: this.movieDetail.pic,
          thumbnails: this.movieDetail.pic
        }
      })
    }
  }
}
</script>

<style>
</style>
