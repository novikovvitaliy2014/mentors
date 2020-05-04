<template>
  <section class="about">
    <h2 class="about__title">{{ $t('title') }}</h2>
    <h2 class="about__title">0 800 438 73 73</h2>
    <section class="about__descriptions">
      <div>
        <img src="../../statics/img/courier2.jpg" alt="courier supermen" height="100" width="100">
        <div class="about__descriptions--receivers" v-html="$t('recieverDescription')"></div>
      </div>
      <div class="about__descriptions--volunteers" v-html="$t('volunteerDescription')"></div>
    </section>
    <router-link to="/rules"
       tag="a"
       class="btn btn--rules"
       >
      {{ $t('rules') }}
    </router-link>
  </section>
</template>

<style lang="sass">
.about
  display: flex
  flex-direction: column
  min-height: 400px
  @include container($col-12, $col-12, col-10, $max-width: 1200px)
  @include mobile-tab
    padding-top: 20px
    padding-bottom: 35px
    background: linear-gradient(to right top, lighten($primary, 50%), lighten($primary, 90%))
    background-size: cover
  padding-top: 40px
  padding-bottom: 50px
  h2
    color: #fff
    color: $color-main
    margin-top: 0
    display: block
    text-align: center
    padding-left: 0
    font-weight: bold
    @include mobile-tab
      margin: 0px auto 10px
  p
    display: block
    padding: 0
    color: #fff
    color: $gray
    margin-bottom: 8px
    font-size: $font-size-h4
    line-height: $line-height-h4
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif
.about__descriptions
  display: flex
  justify-content: space-around
  width: 100%
  margin-top: 30px
  @include mobile-tab
    flex-direction: column
  img
    display: flex
    width: 50%
    margin: auto
  h3
    margin-top: 10px
  p
    text-align: center
    padding: 0 30px
.about__descriptions--volunteers
  align-self: center
.about__descriptions--receivers
  display: flex
  flex-direction: column
  justify-content: space-around
.about__title
  margin: 0 auto
  text-align: center
.about .btn--rules
  align-self: center
  font-size: $font-size-h5
  background: $green
  @include mobile-tab
    margin: 10px auto
  &:hover
    background: $darkgreen
</style>
