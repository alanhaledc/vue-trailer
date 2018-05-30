<template>
  <div class="aside">
    <el-menu default-active="2">
      <el-menu-item :index="item.idx" v-for="item in years" :key="item.type">{{item.type}}年上映</el-menu-item>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        years: [
          {
            type: '2020',
            idx: '0'
          },
          {
            type: '2019',
            idx: '1'
          },
          {
            type: '2018',
            idx: '2'
          }
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">

</style>
