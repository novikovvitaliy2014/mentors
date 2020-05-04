<template>
  <div class="row forAdmin">
    <section class="forAdmin-password col-4">
      <p>{{ $t('forAdmin') }}</p>
      <q-form  @submit="onSubmit" class="password" v-if="!passwordCorrect">
        <q-input
          type="password"
          :rules="passwordRules"
          :label="$t('password')"
          v-model='password'
        />
        <q-btn
          type="Submit"
          class="btn__send"
          :label="$t('open')"
          @click="checkPassword"
        />
      </q-form>
    </section>
    <section v-if="passwordCorrect" class="data">
      <section class="data__tables__description" v-html="$t('dataTablesDescription')"></section>
      <div class="data-toggle-fixed">
        <q-btn-toggle
          v-model="toggle"
          spread
          class="my-custom-toggle"
          rounded
          push
          @click="changeToggle"
          toggle-color="green"
          color="white"
          text-color="green"
          :options="[
            {label: this.$t('volunteers'), value: this.$t('volunteers')},
            {label: this.$t('both'), value: this.$t('both')},
            {label: this.$t('receivers'), value: this.$t('receivers')}
          ]"
        />
      </div>
      <section class="data__tables" >
        <section class="data-volunteers" v-if="toggleVolTrue">
          <h2>{{ $t('registeredVol') }}</h2>
          <div>
            <q-input
              class="data__search-number"
              :label="$t('searchByNumber')"
              v-model="filterVolTel"
              @input-value="filterVolunteerTel"
              >
            </q-input>
          </div>
          <div class="search-geo">
            <q-input
              :label="$t('searchByCity')"
              class="data__search-city"
              v-model="filterVolCity"
              @input-value="filterVolunteerCity"
              >
            </q-input>
            <q-input
              :label="$t('searchByStreet')"
              class="data__search-street"
              v-model="filterVolStreet"
              @input-value="filterVolunteerStreet"
              >
            </q-input>
          </div>
          <div class="data__row data__row--head">
            <span>{{ $t('name') }}</span>
            <span>{{ $t('phoneNumber') }}</span>
            <span>{{ $t('city') }}</span>
            <span>{{ $t('apt') }}</span>
            <span>{{ $t('street') }}</span>
            <span>{{ $t('freePlaces') }}</span>
          </div>
          <ol>
            <li v-for="(volunteer,index) in registeredVol" :key="volunteer.tel" @click="chosenVolunteer(index)" >
              <div class="data__row data__row--li">
                <span>{{ volunteer.name }}</span>
                <span>{{ volunteer.tel }}</span>
                <span>{{ volunteer.city }}</span>
                <span>{{ volunteer.apt }}</span>
                <span>{{ volunteer.street }}</span>
                <span>{{ restOfPlaces (volunteer.quantity, volunteer.receivers) }}</span>
              </div>
              <ol class="matchedReceiverTel" onclick="event.stopPropagation()">
                <li v-for="receiver in volunteer.receivers" :key="receiver" >{{ $t('fixedRec') }} {{ receiver }}</li>
              </ol>
            </li>
          </ol>
        </section>
        <section class="data-receivers" v-if="toggleRecTrue">
          <h2>{{ $t('registeredRec') }}</h2>
          <div>
            <q-input
              :label="$t('searchByNumber')"
              class="data__search-number"
              v-model="filterRecTel"
              @input-value="filterReceiverTel"
              >
            </q-input>
          </div>
          <div class="search-geo">
            <q-input
              :label="$t('searchByCity')"
              class="data__search-city"
              v-model="filterRecCity"
              @input-value="filterReceiverCity"
              >
            </q-input>
            <q-input
              :label="$t('searchByStreet')"
              class="data__search-street"
              v-model="filterRecStreet"
              @input-value="filterReceiverStreet"
              >
            </q-input>
          </div>
          <div class="data__row data__row--head">
            <span>{{ $t('name') }}</span>
            <span>{{ $t('phoneNumber') }}</span>
            <span>{{ $t('city') }}</span>
            <span>{{ $t('apt') }}</span>
            <span>{{ $t('street') }}</span>
          </div>
          <ol>
            <li v-for="(receiver,index) in registeredRec" :key="receiver.tel" @click="chosenReceiver(index)" class="data-receivers-receiver " :class="{ colored: receiver.matched }">
              <div class="data__row data__row--li">
                <span>{{ receiver.name }}  </span>
                <span>{{ receiver.tel }}  </span>
                <span>{{ receiver.city }} </span>
                <span>{{ receiver.apt }} </span>
                <span>{{ receiver.street }} </span>
              </div>
               <div>{{ $t('volunteer') }} : {{ receiver.volunteer }}</div>
            </li>
          </ol>
        </section>
      </section>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      toggleRecTrue: true,
      toggleVolTrue: true,
      toggle: this.$t('both'),
      filterVolTel: null,
      filterVolCity: null,
      filterVolStreet: null,
      filterRecTel: null,
      filterRecCity: null,
      filterRecStreet: null,
      receiverTel: null,
      volunteerTel: null,
      isMatched: false,
      chosen: null,
      password: null,
      passwordCorrect: false,
      passwordRules: [
        v => !!v || this.$i18n.t('enter-data'),
        v => (v && v.length >= 3) || this.$i18n.t('min-6')
      ]
    }
  },
  computed: {
    registeredVolunteers () {
      return this.$store.getters['module1/getVolunteers'].volunteersUpdated
    },
    registeredReceivers () {
      return this.$store.getters['module1/getReceivers'].receiversUpdated
    },
    getChosenReceiverTel () {
      return this.$store.getters['module1/getReceiverTel']
    },
    getChosenVolunteerTel () {
      return this.$store.getters['module1/getVolunteerTel']
    },
    registeredVol () {
      if (this.filterVolTel) {
        return this.registeredVolunteers.filter((volunteer) => {
          return Number(volunteer.tel) === Number(this.filterVolTel)
        })
      } else if (this.filterVolCity && !this.filterVolStreet) {
        return this.registeredVolunteers.filter((elem) => {
          return elem.city.toLowerCase().indexOf(this.filterVolCity.toLowerCase()) > -1
        })
      } else if (this.filterVolCity && this.filterVolStreet) {
        const filterByCity = this.registeredVolunteers.filter((elem) => {
          return elem.city.toLowerCase().indexOf(this.filterVolCity.toLowerCase()) > -1
        })
        // console.log(filterByCity)
        return filterByCity.filter((elem) => {
          return elem.street.toLowerCase().indexOf(this.filterVolStreet.toLowerCase()) > -1
        })
      } else if (!this.filterVolCity && this.filterVolStreet) {
        return this.registeredVolunteers.filter((elem) => {
          return elem.street.toLowerCase().indexOf(this.filterVolStreet.toLowerCase()) > -1
        })
      }
      return this.registeredVolunteers
    },
    registeredRec () {
      if (this.filterRecTel) {
        return this.registeredReceivers.filter((elem) => {
          return Number(elem.tel) === Number(this.filterRecTel)
        })
      } else if (this.filterRecCity && !this.filterRecStreet) {
        return this.registeredReceivers.filter((elem) => {
          return elem.city.toLowerCase().indexOf(this.filterRecCity.toLowerCase()) > -1
        })
      } else if (this.filterRecCity && this.filterRecStreet) {
        const filterByCity = this.registeredReceivers.filter((elem) => {
          return elem.city.toLowerCase().indexOf(this.filterRecCity.toLowerCase()) > -1
        })
        return filterByCity.filter((elem) => {
          return elem.street.toLowerCase().indexOf(this.filterRecStreet.toLowerCase()) > -1
        })
      } else if (!this.filterRecCity && this.filterRecStreet) {
        return this.registeredReceivers.filter((elem) => {
          return elem.street.toLowerCase().indexOf(this.filterRecStreet.toLowerCase()) > -1
        })
      }
      return this.registeredReceivers
    }
  },
  methods: {
    changeToggle () {
      if (this.toggle === this.$t('volunteers')) {
        this.toggleVolTrue = true
        this.toggleRecTrue = false
      } else if (this.toggle === this.$t('receivers')) {
        this.toggleRecTrue = true
        this.toggleVolTrue = false
      } else if (this.toggle === this.$t('both')) {
        this.toggleRecTrue = true
        this.toggleVolTrue = true
      }
    },
    checkPassword () {
      const passwordNumber = Number(this.password)
      if (passwordNumber === 111) {
        this.passwordCorrect = true
      }
      return false
    },
    filterVolunteerTel (value) {
      this.filterVolTel = value
    },
    filterVolunteerCity (value) {
      this.filterVolCity = value
    },
    filterVolunteerStreet (value) {
      this.filterVolStreet = value
    },
    filterReceiverTel (value) {
      this.filterRecTel = value
    },
    filterReceiverCity (value) {
      this.filterRecCity = value
    },
    filterReceiverStreet (value) {
      this.filterRecStreet = value
    },
    onSubmit () {
      return true
    },
    restOfPlaces (quantity, receivers) {
      const volQuantity = quantity
      if (receivers) {
        const volTakedRecievers = Object.values(receivers).length
        return volQuantity - volTakedRecievers
      } else {
        return volQuantity
      }
    },
    chosenReceiver (index) {
      const target = event.target
      if (this.chosen) {
        this.chosen.parentNode.style.border = 'none'
      }
      this.chosen = target
      this.chosen.parentNode.style.border = '2px solid darkgreen'
      this.receiverTel = this.registeredRec[index].tel
      this.$store.dispatch('module1/chosenReceiverTel', this.receiverTel)
    },
    chosenVolunteer (index) {
      const chosenReceiverTel = this.receiverTel
      this.volunteerTel = this.registeredVol[index].tel
      const chosenVolunteerTel = this.volunteerTel
      if (this.receiverTel) {
        this.$store.dispatch('module1/addReceiverTel', { chosenReceiverTel, chosenVolunteerTel })
        const target = event.target
        target.closest('li').style.border = '2px solid darkgreen'
        target.closest('li').style.color = '2px solid darkgreen'
        setTimeout(() => {
          target.closest('li').style.border = 'none'
          target.closest('li').style.color = 'inherit'
        }, 3000)
      }
    }
  },
  beforeCreate () {
    this.$store.dispatch('module1/getVolunteers')
    this.$store.dispatch('module1/getReceivers')
  }
}
</script>

<style lang="sass">
.titles
  margin: 0 auto
.matchedReceiverTel
  cursor: default
.matchedReceiverTel li
  color: $darkgreen
.colored
  background-color: $lightgreen
  padding: 5px 10px
.forAdmin
  @include container($col-12, $col-12, $col-12, $max-width: 1400px)
  display: flex
  flex-direction: column
.forAdmin-password
  margin: 50px auto 0
  color: $darkgreen
.forAdmin-password .q-form .btn__send
  display: flex
  background: $darkgreen
  color: #fff
  width: 50%
  margin: 20px auto
.forAdmin-password .q-field__label
  color: $darkgreen
.forAdmin-password .q-field__control-container .q-field__label
  color: $darkgreen
  font-size: $font-size-h3
  min-height: 30px
.forAdmin-password .q-field--standard .q-field__control:after
  color: $darkgreen
.data-toggle-fixed
  width: 360px
  margin: 30px auto 0
.data__tables
  display: flex
  flex-wrap: no-wrap
  justify-content: space-around
  margin: 20px auto 100px auto
  border-top: 1px solid $color-main
  ol
    padding-left: 20px
  @include mobile-tab
    flex-wrap: wrap
    flex-direction: column
    align-self: center
.data__tables__description
  margin:  30px auto 20px
  width: $col-10
  max-width: 900px
  min-width: 320px
.data__search-number
  width: 50%
  min-width: 300px
  margin: auto
.search-geo
  display: flex
  justify-content: space-around
  margin-bottom: 30px
.data__search-city
  width: 40%
.data__search-street
  width: 40%
.data-volunteers ol li span
  cursor: pointer
  margin-top: 10px
.data-volunteers,
.data-receivers
  margin: 0 10px
  width: 48%
  @include mobile-tab
    margin: 0 auto
    width: $col-12
.data-receivers
  padding-left: 5px
.data-volunteers h2,
.data-receivers h2
  min-height: 90px
.data-receivers-receiver
  cursor: pointer
  margin-bottom: 10px
  p
    font-size: $font-size-h6
.data__row
  display: flex
  justify-content: space-between
  width: 100%
  flex-wrap: no-wrap
  align-items: center
  height: auto
  span
    padding:  0 5px
    flex-grow: 1
    width: $col-1
    text-align: center
    align-items: stretch
    line-height: $line-height-h3
    &:first-child
      width: $col-3
    &:nth-child(2)
      width: $col-3
    &:nth-child(3)
      width: $col-2
    &:nth-child(5)
      width: $col-2
  &--li
    flex-wrap: wrap
.data__row--li span
  border-bottom: 1px dashed $color-dark
  height: 80px
  display: flex
  align-self: center
  flex-direction: column
  justify-content: center
  &:first-child
    max-width: 160px
    min-width: 100px
.data__row--head span
  height: 80px
  display: flex
  align-self: center
  flex-direction: column
  justify-content: center
  background: $color-main
  border-right: 1px solid white
  font-weight: bold
  color: white
  &:last-child
    padding: 0 1px
    min-width: 49px
    border: none
</style>
