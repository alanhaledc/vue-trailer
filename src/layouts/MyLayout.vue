<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          电影预告片网站
        </q-toolbar-title>
        <q-tabs
          class="row"
          v-model="selectTab"
        >
          <q-tab
            v-for="category in categories"
            :key="category"
            slot="title"
            :label="category"
            :name="category"
            @click.native="goCategory(category)"
          ></q-tab>
        </q-tabs>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      overlay
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>按年份查询</q-list-header>
        <q-item
          v-for="year in  years"
          :key="year"
          @click.native="goYear(year)"
        >
          <q-item-side icon="history"></q-item-side>
          <q-item-main>{{year}}年上映</q-item-main>
        </q-item>
        <q-item class="q-mt-md">
          <q-btn
            icon-right="send"
            color="teal"
            @click="$router.push('/admin/login')"
          >后台登陆</q-btn>
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <transition
        appear
        mode="out-in"
        enter-active-class="animated slideInLeft"
        leave-active-class="animated slideOutRight"
      >
        <router-view :key="key" />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      selectTab: '',
      years: ['2018', '2019', '2020'],
      categories: [
        '全部',
        '动作',
        '科幻',
        '惊悚',
        '喜剧',
        '冒险',
        '剧情',
        '奇幻',
        '古装',
        '犯罪',
        '动画',
        '爱情',
        '悬疑',
        '武侠',
        '运动'
      ]
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  created() {
    this.selectTab = this.$route.params.category
  },
  methods: {
    goCategory(category) {
      this.$router.push(`/list/${category}`)
    },
    goYear(year) {
      this.$router.push(`/year/${year}`)
    }
  }
}
</script>

<style>
</style>
