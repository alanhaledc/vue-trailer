<template>
  <q-page padding>
    <div class="row">
      <q-item
        v-for="movie in movieList"
        :key="movie._id"
        class="col-lg-3 col-md-6 col-sm-6 col-xs-12 q-mb-md"
      >
        <q-card>
          <q-card-media @click.native="playVideo(movie.url)" style="cursor: pointer">
            <img :src="movie.poster" height="600">
          </q-card-media>
          <q-card-title>
            {{movie.title}}
            <span slot="subtitle">{{movie.subtitle}}</span>
          </q-card-title>
          <q-card-main style="height: 155px; overflow: hidden; text-overflow: ellipsis">
            {{movie.summary}}
          </q-card-main>
          <q-card-separator></q-card-separator>
          <q-card-actions>
            <q-btn icon="history" flat color="positive">{{movie.update}}前更新</q-btn>
            <q-btn icon="star" flat color="pink">{{movie.rate}}分</q-btn>
            <q-btn rounded flat color="primary" @click.native="goDetail(movie._id)" icon="details">详情</q-btn>
          </q-card-actions>
        </q-card>
      </q-item>
    </div>
    <q-modal
      v-model="opened"
      @show="modalShow"
      @hide="modalHide"
    >
      <div id="dplayer"></div>
    </q-modal>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import 'dplayer/dist/DPlayer.min.css'
import DPlayer from 'dplayer'

export default {
  name: 'MovieList',
  data() {
    return {
      opened: false,
      category: '',
      year: ''
    }
  },
  computed: {
    ...mapGetters('movie', ['movieList'])
  },
  beforeRouteUpdate(to, from, next) {
    this.category = to.params.category
    this.year = to.params.year
    this.getMovies({
      type: this.category === '全部' ? null : this.category,
      year: this.year
    })
    next()
  },
  created() {
    this.category = this.$route.params.category
    this.year = this.$route.params.year
    this.getMovies({
      type: this.category === '全部' ? '' : this.category,
      year: this.year
    })
  },
  methods: {
    playVideo(url) {
      this.opened = true
      if (!this.player) {
        setTimeout(() => {
          this.player = new DPlayer({
            container: document.getElementById('dplayer'),
            screenshot: true,
            autoplay: true,
            video: {
              url: url
            }
          })
        }, 200)
      } else {
        if (this.player.video.currentSrc !== url) {
          this.player.switchVideo({
            url: url,
            autoplay: true,
            type: 'auto'
          })
        }
        this.player.play()
      }
    },
    modalShow() {
      if (this.player) {
        this.player.play()
      }
    },
    modalHide() {
      if (this.player) {
        this.player.pause()
      }
    },
    goDetail(id) {
      this.$router.push(`/detail/${id}`)
    },
    ...mapActions('movie', ['getMovies'])
  }
}
</script>

<style>
</style>
