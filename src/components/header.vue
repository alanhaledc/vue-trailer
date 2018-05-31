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
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <div class="dl-container">
        <h1 class="dl-title">用户登录</h1>
        <el-form :model="ruleForm" label-width="55px" :rules="rules" ref="ruleForm" status-icon>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱名" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入密码" size="medium" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain>取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
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
        ruleForm: {
          email: '',
          password: ''
        },
        rules: {
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
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
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this._login()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      _login() {
        this.$axios.post('/admin/login', {
          email: this.ruleForm.email,
          password: this.ruleForm.password
        }).then(res => {
          if (res.data.success === true) {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.dialogVisible = false
            this.$router.push('/admin/movie/list')
          } else if (res.data.success === false) {
            this.$message({
              message: '帐号或者密码，请重新输入',
              type: 'warning'
            })
          }
        })
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
    right 30px
    top 15px

  .dl-container
    .dl-title
      text-align center
      font-size 20px
      margin-bottom 20px
</style>
