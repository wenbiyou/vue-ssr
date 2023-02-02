<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <input v-model="message" />
    <button @click="clickFunc">click12121212</button>
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
