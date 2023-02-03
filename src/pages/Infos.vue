<template>
  <div>
    <h1>Post List</h1>
    <ul>
      <li v-for="item in posts" :key="item.id">{{  item.title }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "Info",
  metaInfo: {
    title: "信息"
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['posts'])
  },
  // Vue SSR 为服务端渲染提供的生命周期钩子函数
  serverPrefetch() {
    return this.getPosts()
  },
  methods: {
    ...mapActions(['getPosts'])
  }
}
</script>

<style>

</style>