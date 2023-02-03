import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "@/router/index"
import VueMeta from 'vue-meta'
import  { createStore } from '@/store/index'

Vue.use(VueMeta)

Vue.mixin({
  metaInfo: {
    titleTemplate: "%s - SSR"
  }
})

export function createApp() {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });
  return { app, router, store };
}
