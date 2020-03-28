<template>
  <q-layout view="hHh Lpr fFf"  class="shadow-2 rounded-borders">
    <q-header elevated class="header row">
      <section class="header-container col-11">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
          >
            <q-icon name="menu"
            />
          </q-btn>
          <q-toolbar-title class="gt-xs">
            {{ $t('menu') }}
          </q-toolbar-title>
        </q-toolbar>
        <div class="header__logo">
          <router-link to="/"
             tag="p"
             >
            inCitySport
          </router-link>
          <div class="header__logo-icon">
          </div>
        </div>
        <q-select
          v-model="lang"
          class="header__find"
          :options="langOptions"
          label="Language"
          dense
          borderless
          emit-value
          map-options
          options-dense
          style="min-width: 80px"
        />
        <!-- <q-item clickable class="header__find">
          <q-item-section>
            <router-link to="/findPlayers"
               tag="a"
               >
              Найти игроков
            </router-link>
          </q-item-section>
        </q-item> -->
        <!-- <div class="header__rules">
          <router-link to="/rules"
             tag="p"
             >
            Правила
          </router-link>
        </div> -->
      </section>
    </q-header>

    <q-drawer
      behavior="mobile"
      v-model="leftDrawerOpen"
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <router-link to="/"
               tag="p"
               >
              {{ $t('main') }}
            </router-link>
          </q-item-section>
        </q-item>
        <!-- <q-item clickable>
          <q-item-section avatar>
            <q-icon name="person_add" />
          </q-item-section>
          <q-item-section>
            <router-link to="/findPlayers"
               tag="p"
               >
              {{ $t('find') }}
            </router-link>
          </q-item-section>
        </q-item> -->
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="priority_high" />
          </q-item-section>
          <q-item-section>
            <router-link to="/rules"
               tag="p"
               >
              {{ $t('rules') }}
            </router-link>
          </q-item-section>
        </q-item>
        <!-- <q-item clickable>
          <q-item-section avatar>
            <q-icon name="perm_identity" />
          </q-item-section>
          <q-item-section>
            <router-link to="/userData"
               tag="p"
               >
              {{ $t('userData') }}
            </router-link>
          </q-item-section>
        </q-item> -->
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="mail_outline" />
          </q-item-section>
          <q-item-section>
              <router-link to="/contacts"
                 tag="p"
                 >
                {{ $t('contacts') }}
              </router-link>
            <!-- <q-item-label caption>incitysport@gmail.com</q-item-label> -->
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false,
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'ua', label: 'Українська' },
        { value: 'ru', label: 'Русский' },
        { value: 'en-us', label: 'English' }
      ]
    }
  },
  watch: {
    lang (lang) {
      this.$i18n.locale = lang
    }
  },
  methods: {
    openURL
  }
}
</script>

<style lang="stylus">
  body
    font-family: $font-base
    color: $color-base
    background-color: #fff
    position: relative
    z-index: 3
  html
    box-sizing: border-box
    font-size-adaptive(14px,16px,18px)
    font-family: $font-base
  *,
  *::before,
  *::after
    box-sizing: inherit
  .main
    margin-bottom: 0
  img
    width: 100%
    max-width: 100%
    height: auto
  q
    line-height: $line-height-h4
  a
    text-decoration: none
  h1,h2,h3,h4,h5,h6
    font-family: $font-heading
    font-style: normal
    font-weight: 400
    margin: 0 0 1rem 0
    text-align: center
    text-transform: none
    padding: 0 20px
  h1,h2
    text-transform: uppercase
    color: $color-dark
  ul
    padding-left: 25px
  ul li,
  ol li
    font-size: $font-size-h6
    line-height: $line-height-h6
  h1
    font-size: $font-size-h1
    line-height: $line-height-h1
  h2
    font-size: $font-size-h2
    line-height: $line-height-h2
    margin-top: 1.618rem
  h3
    font-size: $font-size-h3
    line-height: $line-height-h3
    margin-top: 1.618rem
  h4
    font-size: $font-size-h4
    line-height: $line-height-h4
    color: $color-main
  h5
    font-size: $font-size-h5
    line-height: $line-height-h5
  h6
    font-size: $font-size-base
    line-height: $line-height-base
  p
    font-size: $font-size-h5
    line-height: $line-height-h5
    width: 100%
  .btn
    display: block
    font-size: $font-size-h6
    font-weight: bold
    text-align: center
    min-width: 50%
    max-width: 500px
    background-color: $darkgreen
    border-radius: 5px
    color: #fff
    padding: 15px
    text-transform: uppercase
    margin: 20px auto 10px auto
    &:hover
      background-color: $green
    &:disabled
      background-color: $color-light
      border: 1px solid $color-main
      color: grey
    &--container
      container( $col-11, $col-9, $col-9, 500px )
      margin-bottom: 20px
  .private-projects__project-btn
    width: 100%
  .msg-error
    color: #ff5252
    text-align: center
  .header
    background: #fff
    color: $primary
  .header-container
    max-width: 1100px
    display: flex
    justify-content: space-between
    flex-wrap: no-wrap
    margin: 0 auto
  .header__logo-icon
    width: 30px
    background: url('../statics/icons/ball.svg') no-repeat
    background-size: 20px
    background-position: 5px 15px
  .header__rules,
  .header__logo
    max-width: 167px
    position: relative
    display: flex
    width: 30%
    @media (max-width $breakpoint-xs-max)
      width: 50%
    margin: 0
    cursor: pointer
    p
      margin: auto
      font-size: $font-size-h4
      font-family: Arial,Helvetica Neue,Helvetica,sans-serif
  .header__logo p
    font-style: italic
    font-size: $font-size-h2
    text-align: center
  .header__rules
    text-align: right
    padding-right: 5px
  .q-toolbar
    max-width: 200px
    @media (max-width $breakpoint-xs-max)
      max-width: 50px
  .q-toolbar__title
    font-size: $font-size-h4
    font-family: Arial,Helvetica Neue,Helvetica,sans-serif
  .q-toolbar:hover .q-btn
    box-shadow: 0 0 1px 2px #fff
  .q-item__section p
    margin-bottom: 0
    color: $primary
    font-size: $font-size-h4
  .q-layout-padding
    padding: 0
  .header__find
    padding: 0 0 0 10px
    @media (max-width $breakpoint-xs-max)
      max-width: 90px
    a
      color: $color-main
      font-size: $font-size-h5
      text-decoration: underline
  .header__find .q-field__control-container
    min-width: 50px
</style>
