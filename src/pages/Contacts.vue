<template>
  <q-page class="contacts row">
    <section class="contacts__container col-8">
      <h1>{{ $t('contacts') }}</h1>
      <p>Email:  <span>incitysport.com@gmail.com</span></p>
      <p>Telegram:  <a href="https://t.me/findplayers">https://t.me/findplayers</a></p>
      <p>Tel:  <a href="tel:+380997342723">+38(099) 734 27 23</a></p>
    </section>
  </q-page>
</template>

<script>
// import Matches from '../components/main/Matches.vue'
export default {
  components: {
  }
}
</script>

<style lang="stylus">
.contacts__container
  margin: 50px auto auto
  h1
    margin: 0 auto 30px
  p
    text-align: center
    font-size: $font-size-h2
    span
      color: $darkgreen

</style>
