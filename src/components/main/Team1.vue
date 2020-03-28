<template>
  <section class="team">
    <booked :match="match" :team="1" v-if="bookedAlert"></booked>
    <p>{{ $t('team1') }}</p>
    <p class="team__shirt">{{ $t('lightShirts') }}</p>
    <ol>
      <li v-for="player in registeredPlayersArray" :key="player.tel">
        <span>{{ player.name }} / </span>
        <span>{{ player.profi }} / </span>
        <span>{{ player.age }}</span>
      </li>
    </ol>
    <p v-if="freePlaces" class="team__freePlaces">{{ $t('freePlaces') }}  <span>{{ freePlaces }}</span></p>
    <p v-if="freePlaces <= null">{{ $t('noPlaces') }} </p>
    <q-form v-if="btnBooked"
      @submit="onSubmit"
      class="booking q-gutter-md"
    >
      <q-input
        filled
        v-model="pseudo"
        :label="$t('name')"
        lazy-rules
        :rules="nameRules"
      />
      <q-input
        filled
        type="email"
        :rules="emailRules"
        :label="$t('email')"
        v-model='email'
      />
      <q-input
        filled
        v-model="tel"
        :label="$t('telephone')"
        lazy-rules
        :rules="telephoneRules"
      />
      <h6 class="booking__title">
        {{ $t('chooseLevel') }}
      </h6>
      <q-btn-toggle
        v-model="profi"
        spread
        class="my-custom-toggle"
        rounded
        push
        toggle-color="green"
        color="white"
        text-color="green"
        :options="[
          {label: this.$t('profi'), value: this.$t('profi')},
          {label: this.$t('amator'), value: this.$t('amator')}
        ]"
      />
      <h6 class="booking__title booking__title--age">
        {{ $t('chooseAge') }}
      </h6>
      <q-btn-toggle
        v-model="age"
        spread
        class="my-custom-toggle"
        rounded
        push
        toggle-color="green"
        color="white"
        text-color="green"
        :options="[
          {label: this.$t('young'), value: this.$t('young')},
          {label: this.$t('old'), value: this.$t('old')}
        ]"
      />
      <q-toggle
                v-model="accept"
                >
                  <!-- <div slot="label"> -->
                    <router-link to="/terms"
                       class="header__top-link"
                       >
                    {{ $t('terms') }}
                    </router-link>
                 <!-- </div> -->
      </q-toggle>
      <q-btn color="primary"
             class="btn__takePart"
             type="submit"
             :label="$t('book')"
             id="submitButton1"
             v-if="btnBooked && freePlaces && globalBtns"
              />
    </q-form>
    <!-- <q-btn
           @click="openForm"
           class="btn__takePart"
           label="Участвовать"
           v-if="btnForm && freePlaces > null && globalBtns" /> -->
  </section>
</template>

<script>
import Booked from '../dialogs/Booked.vue'
export default {
  props: ['match', 'matchIndex'],
  components: {
    Booked
  },
  data () {
    return {
      matchData: {},
      accept: false,
      bookedAlert: false,
      btnBooked: true,
      placesQuantity: 6,
      form: false,
      btnForm: true,
      profi: this.$t('amator'),
      age: this.$t('young'),
      pseudo: null,
      email: null,
      tel: null,
      nameRules: [
        v => !!v || this.$t('field')
      ],
      telephoneRules: [
        v => !!v || this.$t('field'),
        v => (v && v.length >= 10) || this.$t('min10')
      ],
      emailRules: [
        v => !!v || 'Заполните поле',
        v => /.+@.+/.test(v) || this.$t('format'),
        v => (v && v.length >= 8) || 'Минимальное количество символов - 8'
      ],
      newPlayer: {},
      fullTeam: false,
      playersQuantity: 6,
      registeredPlayersArray: []
    }
  },
  computed: {
    freePlaces () {
      if (this.registeredPlayersArray) {
        return this.playersQuantity - this.registeredPlayersArray.length
      }
      return this.playersQuantity
    },
    globalBtns () {
      return this.$store.getters['module1/globalBtns']
    }
  },
  methods: {
    openForm () {
      this.btnForm = false
      this.btnBooked = true
    },
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: this.$t('noTerms')
        })
      } else {
        // this.$q.notify({
        //   color: 'green-4',
        //   textColor: 'white',
        //   icon: 'cloud_done',
        //   message: 'Submitted'
        // })
        this.bookedAlert = true
        this.btnBooked = false
        this.newPlayer.name = this.pseudo
        this.newPlayer.email = this.email
        this.newPlayer.tel = this.tel
        this.newPlayer.profi = this.profi
        this.newPlayer.age = this.age
        this.newPlayer.random = this.pseudo + Math.random()
        this.registeredPlayersArray.push(this.newPlayer)
        this.$store.dispatch('module1/globalBtnsDisable')
        const newPlayerData = {
          newPlayer: this.newPlayer,
          matchIndex: this.matchIndex,
          teamIndex: '0',
          match: this.match
        }
        this.$store.dispatch('module1/registerPlayer', newPlayerData)
        const expirationDate = Date.now() + (1000 * 60 * 60 * 24)
        localStorage.setItem('expirationDate', JSON.stringify(expirationDate))
        this.matchData.city = this.match.city
        this.matchData.adress = this.match.adress
        this.matchData.date = this.match.date
        this.matchData.time = this.match.time
        this.matchData.sport = this.match.sport
        this.matchData.id = this.match.id
        this.matchData.team = '0'
        localStorage.setItem('myMatch', JSON.stringify(this.matchData))
        localStorage.setItem('myName', JSON.stringify(this.newPlayer.name))
        localStorage.setItem('myRandom', JSON.stringify(this.newPlayer.random))
      }
    }
  },
  created () {
    if (this.match.teams) {
      if (this.match.teams[0]) {
        this.registeredPlayersArray = Object.values(this.match.teams[0].players)
      }
    }
    this.matchData.city = this.match.city
    this.matchData.adress = this.match.adress
    this.matchData.date = this.match.date
    this.matchData.time = this.match.time
    this.matchData.sport = this.match.sport
  }
}
</script>

<style lang="stylus">
  .team__freePlaces span
    font-size: $font-size-h1
    font-weight: bold
    color: $secondary
  .team__shirt
    font-size: $font-size-h6
  .btn__takePart
    display: flex
    align-items: center
    align-self: center
    background: $primary
    margin: auto auto 0
    width: 90%
    color: #fff
    @media (max-width $breakpoint-xs-max)
      margin 0 auto
      width: 70%
  .booking
    margin-left: 0
  .booking__title
    color: #fff
    margin-top: 20px
    &--age
      margin-top: 10px
</style>
