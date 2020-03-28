<template>
  <q-page class="user-data row">
    <section class="user-data__container col-8" v-if="myMatch">
      <div v-html="$t('userStart')"></div>
      <ul>
      <!-- <p>Имя:</p> --> <li>{{ myName }}</li>
      <!-- <p>Город: </p> --><li>{{ myMatch.city }}</li>
      <!-- <p>Адрес: </p> --><li>{{ myMatch.adress }}</li>
      <!-- <p>Вид спорта: </p> --><li>{{ myMatch.sport }}</li>
      <!-- <p>Дата: </p> --><li>{{ myMatch.date }}</li>
      <!-- <p>Время матча:</p> --> <li>{{ myMatch.time }}</li>
      </ul>
      <p>{{ $t('userFinal') }}</p>
      <q-btn
        color="primary"
        class="btn"
        :label="$t('refuse')"
        @click="deletePlayer"
      />
    </section>
    <div class="user-data__container col-8" v-if="!myMatch" v-html="$t('noReg')">
    </div>
  </q-page>
</template>

<script>
// import Matches from '../components/main/Matches.vue'
export default {
  components: {
  },
  data () {
    return {
      myMatch: null,
      myName: null,
      myRandom: null,
      nextDay: '',
      nextTime: new Date()
    }
  },
  methods: {
    deletePlayer () {
      const data = {
        myRandom: this.myRandom,
        matchID: this.myMatch.id,
        team: this.myMatch.team
      }
      this.$store.dispatch('module1/deletePlayer', data)
      this.myMatch = null
      localStorage.removeItem('myMatch')
      localStorage.removeItem('myName')
      localStorage.removeItem('myRandom')
      this.myName = null
      // localStorage.removeItem('expirationDate')
    }
  },
  computed: {
    // myMatches () {
    //   let myMatch = localStorage.getItem('myMatch')
    //   console.log(myMatch)
    //   return myMatch
    // }
  },
  created () {
    this.$store.dispatch('module1/getMatches')
    let matchStorage = JSON.parse(localStorage.getItem('myMatch'))
    let nameStorage = JSON.parse(localStorage.getItem('myName'))
    let randomStorage = JSON.parse(localStorage.getItem('myRandom'))
    if (matchStorage) {
      this.myMatch = matchStorage
    }
    if (matchStorage) {
      this.myName = nameStorage
    }
    if (matchStorage) {
      this.myRandom = randomStorage
    }
    // let now = Date.now()
    let expirationDate = JSON.parse(localStorage.getItem('expirationDate'))
    // if (expirationDate !== null && now < expirationDate) {
    //   console.log('disable btn')
    //   this.$store.dispatch('module1/globalBtnsDisable')
    // }
    // let nextDate = Date(expirationDate).toString()
    if (expirationDate) {
      this.nextDay = new Date(expirationDate)
    }

    // let expirationDate = Date.now() + (1000 * 60 * 60 * 24)
    // let test = new Date(expirationDate)
    // console.log(test)
  }
}
</script>

<style lang="stylus">
  .user-data__container
    margin: 50px auto 0
    max-width: 900px
    ul li
      color: $primary
      font-size: $font-size-h5
      padding-bottom: 30px
</style>
