<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <q-table
          title="电影数据表"
          :columns="columns"
          :data="adminMovieList"
          row-key="name"
          color="secondary"
        >
          <q-td slot="body-cell-poster" slot-scope="props" :props="props">
            <img :src="props.row.poster" alt="poster" width="60" height="90">
          </q-td>
          <q-td slot="body-cell-type" slot-scope="props" :props="props">
            <q-chip
              color="primary"
              v-for="type in props.row.type"
              :key="type"
            >{{type}}
            </q-chip>
          </q-td>
          <q-td slot="body-cell-tags" slot-scope="props" :props="props">
            <q-chip
              color="secondary"
              v-for="tag in props.row.tags.slice(0,5)"
              :key="tag"
            >{{tag}}
            </q-chip>
          </q-td>
          <q-td slot="body-cell-detail" slot-scope="props" :props="props">
            <q-btn color="info" rounded @click.native="goDetail(props.row._id)">详情</q-btn>
          </q-td>
          <q-td slot="body-cell-delete" slot-scope="props" :props="props">
            <q-btn color="negative" round @click.native="deleteItem(props.row._id)" icon="delete"></q-btn>
          </q-td>
        </q-table>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'MovieTab',
    data() {
      return {
        columns: [
          {name: 'poster', label: '海报', field: 'poster'},
          {name: 'title', label: '名称', field: 'title'},
          {
            name: 'pubdate',
            label: '上映时间',
            field: 'pubdate',
            sortable: true,
            sort: (a, b) => parseFloat(a, 10) - parseFloat(b, 10)
          },
          {
            name: 'rate',
            label: '评分',
            field: 'rate',
            sortable: true,
            sort: (a, b) => parseFloat(a, 10) - parseFloat(b, 10)
          },
          {
            name: 'update',
            label: '更新时间',
            field: 'update',
            sortable: true,
            sort: (a, b) => parseFloat(a, 10) - parseFloat(b, 10)
          },

          {name: 'id', label: '电影id', field: 'id'},
          {name: 'type', label: '类型', field: 'type'},
          {name: 'tags', label: '标签', field: 'tags'},
          {name: 'detail', label: '详情', field: 'detail'},
          {name: 'delete', label: '删除', field: 'delete'}
        ],
        selected: [
          {name: '口袋宇宙'}
        ]
      }
    },
    created() {
      this.getAdminMovies()
    },
    computed: {
      ...mapGetters('admin', ['adminMovieList'])
    },
    methods: {
      goDetail(id) {
        this.$router.push(`/detail/${id}`)
      },
      deleteItem(id) {
        this.$q.dialog({
          title: '警告',
          message: '确定要删除吗？',
          cancel: '取消',
          ok: '确认',
          color: 'negative'
        })
          .then(() => {
            this.deleteMovie(id)
            this.$q.notify({
              message: '你删除了一部电影',
              color: 'negative',
              icon: 'done'
            })
          })
          .catch(() => {
            this.$q.notify({
              message: '已取消',
              color: 'positive',
              icon: 'done'
            })
          })
      },
      ...mapActions('admin', ['getAdminMovies', 'deleteMovie'])
    }
  }
</script>

<style>
</style>
