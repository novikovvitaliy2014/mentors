<template>
  <div id="q-app">
    <router-view />
    <app-footer></app-footer>
  </div>
</template>

<script>
import Footer from 'components/footer/Footer.vue'

export default {
  components: {
    'app-footer': Footer
  },
  computed: {
  },
  created () {
  }
}
</script>

<style lang="stylus">
</style>
