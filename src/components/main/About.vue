<template>
  <section class="about row">
    <!-- <h1 class="about__container row col-6">{{ $t('failed') }}</h1> -->
    <div class="about__container row col-11">
      <section class="about__desc col-sm-8 col-xs-12 col-md-5 col-lg-6 col-xl-6">
        <h2>{{ title }}</h2>
        <div  v-html="$t('about')">
          <!-- <p>Вы можете принять участие в любительской игре, не собирая команду. </p>
          <p>Забронируйте место в команде из таких же, как Вы, активных игроков-любителей в подходящем для Вас матче и приходите на игру.</p>
          <p>Цена участия игрока в матче - от 50 до 200 гривен, в зависимости от матча. Без предоплаты.</p> -->
        </div>
        <!-- <p>Услуги сервиса бесплатные, игрок платит только свою долю аренды зала на матч (от 40 до 80 гривен).</p> -->
        <router-link to="/rules"
           tag="a"
           class="btn btn--rules"
           >
          {{ $t('rules') }}
        </router-link>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    title () {
      if (this.$i18n.locale === 'ru') {
        const random = this.getRandomInt(13)
        if (random === 0) {
          return 'Блестящих побед!'
        } else if (random === 1) {
          return 'Спортивное настроение'
        } else if (random === 2) {
          return 'Физкульт - Привет!'
        } else if (random === 3) {
          return 'В здоровом теле - здоровый дух'
        } else if (random === 4) {
          return 'Бей. Беги. Худей.'
        } else if (random === 5) {
          return 'Радость спорта'
        } else if (random === 6) {
          return 'Блестящих побед!'
        } else if (random === 7) {
          return 'Каждому по команде!'
        } else if (random === 8) {
          return 'Дух соревнования'
        } else if (random === 9) {
          return 'Играй. Кайфуй. Худей.'
        } else if (random === 10) {
          return 'Играй. Кайфуй. Худей.'
        } else if (random === 11) {
          return 'Играй. Кайфуй. Худей.'
        } else if (random === 12) {
          return 'Генератор эндорфинов'
        } else if (random === 13) {
          return 'Заряд бодрости'
        }
      } else if (this.$i18n.locale === 'en-us') {
        return 'Sport spirit'
      } else if (this.$i18n.locale === 'ua') {
        const random = this.getRandomInt(2)
        if (random === 0) {
          return 'Блискучих перемог!'
        } else if (random === 1) {
          return 'Дух змагання'
        } else if (random === 2) {
          return 'Грай. Кайфуй. Біжи.'
        }
      }
      return 'inCitySport'
    }
  },
  methods: {
    getRandomInt (max) {
      return Math.floor(Math.random() * Math.floor(max))
    }
  }
}
</script>

<style lang="stylus">
  .about
    display: flex
    min-height: 400px
    background: linear-gradient(to right, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.0) ), url('../../statics/img/hit.png') no-repeat 70% center
    background: #fff url('../../statics/img/players.jpg') no-repeat 90% center
    background-size: 30% auto
    @media (max-width $breakpoint-xs-max)
      padding-top: 20px
      padding-bottom: 35px
      background: linear-gradient(to right top, lighten($primary, 50%), lighten($primary, 90%))
      background-size: cover
    padding-top: 40px
    padding-bottom: 50px
    h2
      color: #fff
      color: $primary
      margin-top: 0
      display: block
      text-align: left
      padding-left: 0
      font-weight: bold
      @media (max-width $breakpoint-xs-max)
        margin: 0px auto 10px
    p
      display: block
      padding: 0
      color: #fff
      color: $gray
      margin-bottom: 8px
      font-size: $font-size-h4
      line-height: $line-height-h4
      font-family: Arial,Helvetica Neue,Helvetica,sans-serif
  .about__container
    padding: 0 10px
    max-width: 1100px
    margin: 20px auto 10px
  .about__desc
    display: flex
    flex-direction: column
    justify-content: space-around
  .about__desc .btn--rules
    margin-left: 0
    font-size: $font-size-h5
  .about__desc .btn--rules
    background: $green
    @media (max-width $breakpoint-xs-max)
      margin: 10px auto
    &:hover
      background: $darkgreen
</style>
