<template>
  <footer class="footer row">
    <div class="footer__content col-11">
      <div class="footer__logo">
        <router-link to="/"
           tag="p"
           >
          Volunteer
        </router-link>
        <!-- <div class="header__logo-icon">
        </div> -->
      </div>
      <p  class="footer__desc">{{ $t('footer') }}</p>
    </div>
  </footer>
</template>

<style lang="sass">
.footer
  display: flex
  position: relative
  z-index: 3
  background-color: #fff
  color: $color-main
  border-top: 1px solid $color-dark
  margin-top: auto
  font-weight: 700
  height: 50px
.footer__content
  display: flex
  justify-content: space-between
  margin: auto
  p
    display: block
    align-self: center
    width: $col-9
    text-align: center
    margin: auto
.footer__logo
  max-width: 167px
  position: relative
  display: flex
  cursor: pointer
  p
    margin: auto
    font-style: italic
    font-size: $font-size-h3
    text-align: center
.footer__desc
  max-width: 60%
</style>
