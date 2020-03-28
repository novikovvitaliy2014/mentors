<template>
  <footer class="footer row">
    <div class="footer__content col-11">
      <div class="footer__logo">
        <router-link to="/"
           tag="p"
           >
          inCitySport
        </router-link>
        <div class="header__logo-icon">
        </div>
      </div>
      <p  class="footer__desc">{{ $t('footer') }}</p>
      <!-- <p>Cooperative sport</p> -->
    </div>
  </footer>
</template>

<script>

</script>

<style lang="stylus" scoped>
  .footer
    display: flex
    position: relative
    font-family: $font-base
    z-index: 3
    background-color: #fff
    color: $primary
    border-top: 1px solid $color-dark
    margin-top: auto
    height: 50px
  .footer__content
    display: flex
    justify-content: space-between
    margin: auto
    p
      display: block
      align-self: center
      width: $col-9
      color: darken($primary, 20%)
      text-align: center
      font-weight: 400
      margin: auto
  .footer__logo
    max-width: 167px
    position: relative
    display: flex
    cursor: pointer
    p
      margin: auto
      font-style: italic
      font-size: $font-size-h4
      text-align: center
  .header__logo-icon
    width: 30px
    background: url('../../statics/icons/ball.svg') no-repeat
    background-size: 20px
    background-position: 10px center
  .footer__desc
    max-width: 60%

</style>
