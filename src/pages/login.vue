<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <q-card style="width: 500px; margin: 0 auto; padding: 20px">
          <q-list-header class="q-headline text-center text-primary">预告片后台管理</q-list-header>
          <q-field
            class="q-mb-md"
            :error="$v.form.email.$error"
            helper="请输入你的邮箱 测试邮箱test@test.com"
            error-label="请输入正确的邮箱地址"
          >
            <q-input
              float-label="邮箱"
              @blur="$v.form.email.$touch"
              v-model="form.email"
            />
          </q-field>
          <q-field
            class="q-mb-md"
            :error="$v.form.password.$error"
            helper="请输入你的密码 测试密码：123456"
            error-label="请输入6位以上的密码"
          >
            <q-input
              float-label="密码"
              v-model="form.password"
              type="password"
              @blur="$v.form.password.$touch"
            />
          </q-field>
          <q-btn class="full-width" @click.native="OnLogin" color="primary">登录</q-btn>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  data() {
    return {
      form: {
        email: 'test@test.com',
        password: '123456'
      }
    }
  },
  methods: {
    OnLogin() {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('请检查输入的内容')
        return
      }
      this.login({
        email: this.form.email,
        password: this.form.password
      })
        .then(res => {
          if (res.data.success) {
            this.$router.push('/admin/movie/list')
            this.$q.notify({
              message: '登录成功',
              color: 'positive',
              icon: 'done',
              position: 'top'
            })
          } else {
            this.$q.notify({
              message: res.data.msg,
              color: 'negative',
              icon: 'priority_high',
              position: 'top'
            })
          }
        })
    },
    ...mapActions('admin', ['login'])
  }
}
</script>

<style>
</style>
