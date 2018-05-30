<template>
  <div class="header">
    <el-row>
      <el-col :span="4" class="title">预告片网站</el-col>
      <el-col :span="20">
        <el-menu mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
                 default-active="0">
          <el-menu-item :index="item.idx"
                        v-for="item in category"
                        v-text="item.type"
                        :key="item.type"
                        @select="selectItem"></el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-button type="primary" size="medium" class="login" @click="showLogin">登录</el-button>
    <el-dialog :visible.sync="dialogVisible" width="220">
      <el-form :model="form" label-width="80px">
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱名" size="medium" icon=""></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码" size="medium"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain>取消</el-button>
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        category: [
          {
            type: '全部',
            idx: '0'
          },
          {
            type: '科幻',
            idx: '1'
          },
          {
            type: '惊悚',
            idx: '2'
          },
          {
            type: '冒险',
            idx: '3'
          },
          {
            type: '奇幻',
            idx: '4'
          },
          {
            type: '悬疑',
            idx: '5'
          },
          {
            type: '剧情',
            idx: '6'
          },
          {
            type: '犯罪',
            idx: '7'
          },
          {
            type: '灾难',
            idx: '8'
          },
          {
            type: '恐怖',
            idx: '9'
          },
          {
            type: '战争',
            idx: '10'
          },
          {
            type: '喜剧',
            idx: '11'
          },
          {
            type: '音乐',
            idx: '12'
          },
          {
            type: '文艺',
            idx: '13'
          },
          {
            type: '励志',
            idx: '14'
          }
        ],
        currentIndex: '1',
        dialogVisible: false,
        form: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      selectItem(index) {
        console.log(index)
        this.currentIndex = toString(index)
      },
      showLogin() {
        this.dialogVisible = true
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .title
    text-align center
    font-size 28px
    vertical-align center
    line-height 61px
    background #545c64
  .login
    position absolute
    right 20px
    top 20px
</style>
