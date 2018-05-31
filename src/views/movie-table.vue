<template>
  <div class="admin-movie-list">
    <el-table :data="movieList" border style="width:100%">
      <el-table-column label="海报" width="160">
        <template slot-scope="scope">
          <img :src="scope.row.poster" width="140" height="210">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名字" width="100"></el-table-column>
      <el-table-column prop="pubdate" label="上映时间" width="80"></el-table-column>
      <el-table-column prop="rate" label="评分" width="60"></el-table-column>
      <el-table-column prop="update" label="更新时间" width="60"></el-table-column>
      <el-table-column prop="id" label="电影ID" width="100"></el-table-column>
      <el-table-column prop="types" label="类型" width="80">
        <template slot-scope="scope">
          <el-tag v-for="type in scope.row.types" v-text="type" :key="type" type="success" style="margin-bottom: 5px"></el-tag>
        </template>
      </el-table-column>
      <el-table-column label="标签" width="100">
        <template slot-scope="scope">
          <el-tag v-for="tag in scope.row.tags" v-text="tag" :key="tag" style="margin-bottom: 5px"></el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="summary" label="简要" width="600"></el-table-column>
      <el-table-column label="详情" width="60">
        <template slot-scope="scope">
          <router-link :to="'/movie/' + scope.row._id">详情</router-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click.stop.prevent="deleteItem(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  import 'moment/locale/zh-cn'

  export default {
    data() {
      return {
        movieList: [],
        site: 'http://p9bh93etu.bkt.clouddn.com/'
      }
    },
    created() {
      this._getAllMovies()
    },
    methods: {
      _getAllMovies() {
        this.$axios.get('/api/v0/movies').then(res => {
          if (res.data.success === true) {
            this.movieList = this._normalizeMovies(res.data.data)
          }
        })
      },
      _normalizeMovies(data) {
        let movies = []
        data.forEach(item => {
          let movie = {
            poster: this.site + item.posterKey,
            title: item.title,
            pubdate: moment(item.pubdate.time).format('YYYY.MM'),
            rate: item.rate,
            update: moment(item.meta.createdAt).fromNow(true),
            id: item.movieId,
            _id: item._id,
            types: item.movieTypes,
            tags: item.tags,
            summary: item.summary
          }
          movies.push(movie)
        })
        return movies
      },
      deleteItem(id) {
        this._deleteMovie(id)
      },
      _deleteMovie(id) {
        console.log(id)
        this.$axios.delete('/admin/movies', {
          params: {
            id
          }
        }).then(res => {
          if (res.data.success === true) {
            this._getAllMovies(res.data.data)
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">

</style>
