import Vue from 'vue'
import Vuex from 'vuex'
import module1 from './module'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      module1
    },
    strict: process.env.DEV
  })
  if (process.env.DEV && module.hot) {
    module.hot.accept(['./module'], () => {
      const newShowcase = require('./module').default
      Store.hotUpdate({ modules: { module1: newShowcase } })
    })
  }
  return Store
}
