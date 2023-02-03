import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      posts: []
    }),
    mutations: {
      setPosts(state, data) {
        state.posts = data
      }
    },
    actions: {
      async getPosts({ commit }) {
       const { data } = await axios.get('https://cnodejs.org/api/v1/topics')
       commit('setPosts', data.data)
      }
    }
  })
}