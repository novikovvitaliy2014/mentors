<template>
  <div class="registration">
    <h2 class="title">{{ $t('volunteerRegistration') }}</h2>
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
          :rules="quantityRules"
          :label="$t('reciepentsQuantity')"
          v-model='quantity'
        />
        <q-input
          filled
          v-model="tel"
          :label="$t('telephone')"
          lazy-rules
          :rules="telephoneRules"
        />
        <q-toggle
          v-model="accept"
          >
              <router-link to="/terms"
                 class="header__top-link"
                 >
              {{ $t('terms') }}
              </router-link>
        </q-toggle>
        <q-btn color="primary"
               class="btn__takePart"
               type="submit"
               :label="$t('book')"
               id="submitButton1"
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
      accept: false,
      bookedAlert: false,
      btnBooked: true,
      form: false,
      btnForm: true,
      name: null,
      city: null,
      street: null,
      apt: null,
      quantity: null,
      tel: null,
      nameRules: [
        v => !!v || this.$t('field')
      ],
      telephoneRules: [
        v => !!v || this.$t('field'),
        v => (v && v.length >= 10) || this.$t('min10')
      ],
      quantityRules: [
        v => !!v || this.$t('field'),
        v => (v && v >= 2) || this.$t('Not less than 2')
      ],
      newVolunteer: {}
    }
  },
  methods: {
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
        this.newVolunteer.name = this.name
        this.newVolunteer.city = this.city
        this.newVolunteer.tel = this.tel
        this.newVolunteer.street = this.street
        this.newVolunteer.apt = this.apt
        this.newVolunteer.quantity = this.quantity
        this.$store.dispatch('module1/registerVolunteer', this.newVolunteer)
      }
    }
  }
}
</script>

<style lang="sass">
.btn__takePart
  display: flex
  align-items: center
  align-self: center
  background: $primary
  margin: auto auto 0
  width: 90%
  color: #fff
  @include mobile-tab
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
