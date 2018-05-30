<template>
  <div class="home">
    <Header/>
    <el-row>
      <el-col :span="4">
        <Aside/>
      </el-col>
      <el-col :span="20">
        <movie-list/>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/header'
  import Aside from 'components/aside'
  import MovieList from 'components/movie-list'

  export default {
    components: {
      Header,
      Aside,
      MovieList
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">

</style>
