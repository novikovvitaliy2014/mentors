<template>
  <div class="registration">
    <h2 class="title">{{ $t('receiverRegistration') }}</h2>
    <section class="registration__form">
      <booked v-if="bookedAlert"></booked>
      <q-form
        @submit="onSubmit"
        class="booking q-gutter-md"
      >
        <q-input
          filled
          v-model="name"
          :label="$t('name')"
          lazy-rules
          :rules="nameRules"
        />
        <q-input
          filled
          v-model="city"
          :label="$t('city')"
          lazy-rules
          :rules="nameRules"
        />
        <q-input
          filled
          v-model="street"
          :label="$t('street')"
          lazy-rules
          :rules="nameRules"
        />
        <q-input
          filled
          v-model="apt"
          :label="$t('apt')"
          lazy-rules
          :rules="nameRules"
        />
        <q-input
          filled
          v-model="tel"
          :label="$t('telephone')"
          lazy-rules
          :rules="telephoneRules"
        />
        <q-toggle v-model="accept">
          <router-link to="/rules" class="header__top-link">
          {{ $t('terms') }}
          </router-link>
        </q-toggle>
        <q-btn color="primary"
           class="btn__takePart"
           type="submit"
           :label="$t('book')"
           id="submitButton2"
           v-if="btnBooked"
            />
      </q-form>
    </section>
  </div>
</template>

<script>
import Booked from '../dialogs/Booked.vue'
export default {
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
      name: null,
      city: null,
      street: null,
      apt: null,
      tel: null,
      nameRules: [
        v => !!v || this.$t('field')
      ],
      telephoneRules: [
        v => !!v || this.$t('field'),
        v => (v && v.length >= 10) || this.$t('min10')
      ],
      newReceiver: {},
      fullTeam: false,
      playersQuantity: 6,
      registeredPlayersArray: []
    }
  },
  computed: {
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
        this.bookedAlert = true
        this.newReceiver.name = this.name
        this.newReceiver.city = this.city
        this.newReceiver.tel = this.tel
        this.newReceiver.street = this.street
        this.newReceiver.apt = this.apt
        this.$store.dispatch('module1/registerReceiver', this.newReceiver)
      }
    }
  }
}
</script>

<style lang="sass">
.registration
  width: 45%
  @include mobile-tab
    margin: auto
    width: 70%
    min-width: 360px
  h2
    padding: 0
    min-height: 86px
.registration__form
  width: 100%
  overflow: hidden
  display: flex
  flex-direction: column
  background: linear-gradient(to right bottom, $green, $darkgreen)
  padding: 5px 0
  min-height: 100px
  box-shadow: -20px 30px 80px 0px grey
  margin-bottom: 50px
  ol
    color: #fff
    border-bottom: 1px solid #fff
    border-top: 1px solid #fff
    padding: 15px 20px
    li
      padding: 5px 0
  p, a
    text-align: center
    color: #fff
    margin: 5px auto 0

.q-form .q-field__label
  color: #fff
  font-size: $font-size-h6
  min-height: 30px
.q-field--standard .q-field__control:after
  color: #fff
.q-form .q-field
  margin-left: 5px
.q-btn-toggle, .q-toggle
  margin: 5px auto
</style>
