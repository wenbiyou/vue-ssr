import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "@/router/index"
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

Vue.mixin({
  metaInfo: {
    titleTemplate: "%s - SSR"
  }
})

export function createApp() {
  const router = createRouter()
  const app = new Vue({
    router,
    render: (h) => h(App),
  });
  return { app, router };
}
