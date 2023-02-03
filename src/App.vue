<template>
  <div id="app">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </ul>
    <!-- 路由出口 -->
   <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "hello world",
    };
  },
  methods: {
    clickFunc() {
      console.log("ngz-ceshi", `click it!`);
    },
  },
};
</script>

<style></style>
