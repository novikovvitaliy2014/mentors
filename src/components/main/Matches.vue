<template>
  <div flex-center class="main row">
    <h2 v-if="!totalMatches" class="main__container col-11">Loading</h2>
    <section class="filters row">
      <h3 class="center">{{ $t('chooseMatch') }}</h3>
      <q-form class="filters__container">
        <q-select
          @input="filterActiv()"
          v-for="selector in filters"
          :value="selector.value"
          :key="selector.name"
          v-model="selector.value"
          :options="unique(selector.getter)"
          :label="selector.name"
          clearable
          dark
          bg-color="transparent"
        >
          <template v-if="selector.value" v-slot:append>
            <q-icon name="cancel" @click.stop="selector.value = null" class="cursor-pointer" />
          </template>
        </q-select>
        <!-- <q-select
          @input="filterActiv()"
          :value="filters[0].value"
          v-model="filters[0].value"
          :options="unique(filters[0].getter)"
          :label="filters[0].name"
          clearable
          dark
          bg-color="transparent"
        >
          <template v-if="filters[0].value" v-slot:append>
            <q-icon name="cancel" @click.stop="selector.value = null" class="cursor-pointer" />
          </template>
        </q-select> -->
      </q-form>
      <section class="filters__subscriber">
        <h4>{{ $t('chooseChanel') }} </h4>
        <h3 v-if="cityFiltered() || sportFiltered()">{{ cityFiltered() }}/ {{ sportFiltered() }} </h3>
      </section>
      <section class="filters__contacts">
        <div class="filters__contact filters__contact--bots">
          <div class="filters__contact--bots--fb">
             <a href="https://m.me/incitysport?ref=w8847762"
                class="btn__contact"
                target="_blank"
                >
                 <q-btn color="#027BE3"
                   :label="$t('notificationFb')"
                   title="Откроется в новой вкладке"
                   >
                 </q-btn>
             </a>
             <!-- <p>Также, здесь Вы можете задать вопрос менеджеру</p> -->
          </div>
          <div>
             <div class="filters__contact--bots--tg">
               <!-- <a href="https://m.me/incitysport?ref=w8847762"
                  class="btn__contact"
                  target="_blank"
                  > -->
                   <q-btn color="#027BE3"
                     :label="$t('notificationTg')"
                     class="btn__contact"
                     title="Откроется в новой вкладке"
                     @click="openTelegramLink()"
                     >
                   </q-btn>
               <!-- </a> -->
            </div>
          </div>
        </div>

        <div class="filters__contact">
          <div class="filters__contact--msg">
            <q-checkbox v-model="viber" label="Viber" color="accent" />
            <q-checkbox v-model="telegram" label="Telegram" color="blue" />
            <q-checkbox v-model="whatsapp" label="WhatsApp" color="green" />
            <q-checkbox v-model="sms" label="SMS" color="black" />
          </div>
          <q-input
            filled
            v-model="tel"
            :label="$t('telephone')"
            lazy-rules
            bg-color="white"
            :rules="telephoneRules"
          />
          <q-btn color="primary"
             class="btn__contact"
             :label="$t('send')"
             @click="sendTelephone()"
             id="btn__tlf">
          </q-btn>
        </div>
        <div class="filters__contact filters__contact--email">
          <q-input
            filled
            type="email"
            :rules="emailRules"
            :label="$t('email')"
            v-model='email'
            bg-color="white"
          />
          <q-btn color="primary"
             class="btn__contact"
             :label="$t('send')"
             @click="sendEmail()"
             id="btn__email">
          </q-btn>
        </div>
      </section>
      <q-toggle
                v-model="accept"
                >
                  <!-- <div slot="label"> -->
                    <router-link to="/terms"
                       class="subscribe__terms"
                       >
                    {{ $t('terms') }}
                    </router-link>
                 <!-- </div> -->
      </q-toggle>

      <!-- <h3>Выберите удобный Вам способ получения уведомлений о доступных матчах {{ selector.value }}</h3> -->
    </section>
    <section v-if="filterActivated" class="matches">
    <!-- <section v-if="true" class="matches"> -->
      <h2 v-if="filteredMatches.length === 0" class="matches__title">{{ $t('noMatches') }}</h2>
      <h2 v-if="filteredMatches.length > 0" class="matches__title">{{ $t('openMatches') }}</h2>
      <!-- <h2 v-if="true" class="matches__title">Открытые матчи для регистрации</h2> -->
      <div
               v-for="match in filteredMatches"
               :key="match.id"
               class="match__wrapper row">
        <!-- <div  class="match match_id row match__container col-11"> -->
        <div v-if="formatDate(match.date)" class="match match_id row match__container col-11">
          <div class="match__data">
            <p class="match__data-item">{{ match.sport }}</p>
            <p class="match__data-item">{{ match.city }}</p>
            <p class="match__data-item">{{ match.adress }}</p>
            <div class="match__data-item">
              <p v-if="formatDate(match.date)">{{ formatDate(match.date) }}</p>
              <p v-if="weekDay(match.date)">{{ weekDay(match.date) }}</p>
            </div>
            <p class="match__data-item">{{ match.time }}</p>
          </div>
          <!-- <div> -->
          <section class="match__description col-md-10 col-sm-10 col-xs-12" >
            <h3>{{ $t('description') }}</h3>
            <!-- <p>Услуги сервиса InCitySport бесплатные.</p> -->
            <!-- <p>Оплату равномерно рассчитывают и оплачивают непосредственно перед матчем сами игроки исходя из количества игроков и цены аренды зала. </p> -->
            <p>{{ $t('matchPrice') }} {{ match.desc }}</p>
            <img :src="match.img" class="match__img" alt="" width="300px">
            <p>{{ $t('shirts') }}</p>
            <!-- <p>В случае, если зарегистрированный пользователь не пришёл на матч и не проинформировал сервис (не позже, чем за 3 часа до игры), аккаунт пользователя в сервисе будет заблокирован на 3 месяца. </p> -->
            <p>{{ $t('places') }} </p>
          </section>
          <!-- </div> -->
          <section class="teams">
            <team1 :match="match" :matchIndex="match.id"/>
            <team2 :match="match" :matchIndex="match.id"/>
            <team3 v-if="match.teamsNumber > 2" :match="match" :matchIndex="match.id"/>
          </section>
          <!-- <sendMail :match="match"/> -->
        </div>
      </div>
    </section>
    <!-- <section class="comment">
      <h3>Оставьте, пожалуйста, комментарий для улучшения сервиса.</h3>
      <q-input
        filled
        type="text"
        v-model="comment"
        label="Комментарий"
        lazy-rules
        :rules="commentRules"
      />
      <q-btn color="primary"
           class="btn__contact"
           label="Отправить"
           @click="sendComment()"
           >
        </q-btn>
    </section> -->
  </div>
</template>

<script>
import Team1 from 'components/main/Team1.vue'
import Team2 from 'components/main/Team2.vue'
import Team3 from 'components/main/Team3.vue'
// import sendMail from 'components/main/sendMail.vue'

export default {
  // props: ['match'],
  components: {
    Team1,
    Team2,
    Team3
    // sendMail
  },
  data () {
    return {
      // totalMatches: [],
      // matchesActive: [],
      viber: false,
      telegram: false,
      whatsapp: false,
      sms: false,
      subscribeTel: true,
      subscribeEmail: true,
      accept: false,
      filterActivated: true,
      email: null,
      tel: null,
      comment: null,
      // sport: this.$t('sport'),
      filters: [
        { name: 'Sport', value: '', getter: obj => obj.sport },
        { name: 'City', value: '', getter: obj => obj.city },
        { name: 'Date', value: '', getter: obj => obj.date },
        { name: 'Address', value: '', getter: obj => obj.adress }
      ],
      emailRules: [
        v => !!v || this.$t('field'),
        v => /.+@.+/.test(v) || this.$t('format'),
        v => (v && v.length >= 8) || this.$t('min8')
      ],
      telephoneRules: [
        v => !!v || this.$t('field'),
        v => (v && v.length >= 10) || this.$t('min10')
      ]
      // commentRules: [
      //   v => !!v || 'Заполните поле',
      //   v => (v && v.length >= 5) || 'Минимальное количество символов - 5'
      // ]
    }
  },
  methods: {
    openTelegramLink () {
      if (this.filters[0].value === '') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: this.$t('noSport')
        })
      } else if (this.filters[1].value === '') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: this.$t('noCity')
        })
      } else if (this.filters[0].value === 'Football' && this.filters[1].value === 'Kiev') {
        window.open('https://t.me/joinchat/AAAAAFjeU40u4gK__rGRLA')
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: this.$t('error')
        })
      }
    },
    sendTelephone () {
      if (!this.tel || this.tel.length < 10) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: this.$t('min10')
        })
      } else if (this.subscribeTel !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: this.$t('extraTel')
        })
      } else if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: this.$t('noTerms')
        })
      } else if (this.filters[0].value === '') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: this.$t('noSport')
        })
      } else if (this.filters[1].value === '') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: this.$t('noCity')
        })
      } else if (this.sms === false && this.whatsapp === false && this.telegram === false && this.viber === false) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: this.$t('noMSG')
        })
      } else {
        const telData = {
          viber: this.viber,
          telegram: this.telegram,
          whatsapp: this.whatsapp,
          sms: this.sms,
          tel: this.tel,
          sport: this.filters[0].value,
          city: this.filters[1].value
        }
        this.$store.dispatch('module1/subscribeTel', telData)
        this.subscribeTel = false
        const expirationDate = Date.now() + (1000 * 60 * 60 * 24)
        localStorage.setItem('expirationTelDate', JSON.stringify(expirationDate))
        localStorage.setItem('myTel', JSON.stringify(this.tel))
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: this.$t('subscribed') + this.tel
        })
      }
    },
    sendEmail () {
      if (this.email.length < 8) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: this.$t('min8')
        })
      } else if (this.subscribeEmail !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: this.$t('extraMail')
        })
      } else if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: this.$t('noTerms')
        })
      } else if (this.filters[0].value === '') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: this.$t('noSport')
        })
      } else if (this.filters[1].value === '') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: this.$t('noCity')
        })
      } else {
        const emailData = {
          email: this.email,
          sport: this.filters[0].value,
          city: this.filters[1].value
        }
        this.$store.dispatch('module1/subscribeEmail', emailData)
        const expirationDate = Date.now() + (1000 * 60 * 60 * 24)
        localStorage.setItem('expirationEmailDate', JSON.stringify(expirationDate))
        this.subscribeEmail = false
        localStorage.setItem('myEmail', JSON.stringify(this.email))
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: this.$t('subscribedMail') + this.email
        })
      }
    },
    sportFiltered () {
      return this.filters[0].value
    },
    cityFiltered () {
      return this.filters[1].value
    },
    // matches () {
    //   console.log(this.totalMatches)
    //   let activeMatches = this.totalMatches.filter((match) =>
    //     new Date(match.date) > new Date()
    //   )
    //   return activeMatches
    // },
    formatDate (day) {
      const now = new Date()
      const date = new Date(day)
      const dt = date.getDate()
      // let dtNow = now.getDate()
      if (day === '' || date <= now) {
      // if (day === '') {
        return false
      }
      const year = date.getFullYear()
      const month = date.getMonth()
      let monthRus = month + 1
      if (month === 0) {
        monthRus = 'January'
      }
      if (month === 1) {
        monthRus = 'February'
      }
      if (month === 2) {
        monthRus = 'March'
      }
      if (month === 3) {
        monthRus = 'April'
      }
      if (month === 4) {
        monthRus = 'May'
      }
      if (month === 5) {
        monthRus = 'June'
      }
      if (month === 6) {
        monthRus = 'July'
      }
      if (month === 7) {
        monthRus = 'August'
      }
      if (month === 8) {
        monthRus = 'September'
      }
      if (month === 9) {
        monthRus = 'October'
      }
      if (month === 10) {
        monthRus = 'November'
      }
      if (month === 11) {
        monthRus = 'December'
      }
      return dt + ' ' + monthRus + ' ' + year
    },
    weekDay (day) {
      const dayDate = new Date(day)
      const dayNumber = dayDate.getDay()
      if (dayNumber === 0) {
        return 'Воскресенье'
      }
      if (dayNumber === 1) {
        return 'Понедельник'
      }
      if (dayNumber === 2) {
        return 'Вторник'
      }
      if (dayNumber === 3) {
        return 'Среда'
      }
      if (dayNumber === 4) {
        return 'Четверг'
      }
      if (dayNumber === 5) {
        return 'Пятница'
      }
      if (dayNumber === 6) {
        return 'Суббота'
      }
      return ' '
    },
    filterActiv () {
      this.filterActivated = true
      const margin = document.querySelector('.filters')
      margin.classList.add('up')
      // return this.filterActivated
    },
    unique (getter) {
      // console.log(this.matches)
      // let matchesArray = this.matches
      // this.matchesActive = this.totalMatches.filter((match) =>
      //   new Date(match.date) > new Date()
      // )
      return [...new Set(this.matchesActive.map(getter))]
      // return [...new Set(this.matchesActive.map(getter))]
      // return [...new Set(matches.map(obj => obj.city))]
    }
    // sendComment () {
    //   if (this.comment.length < 5) {
    //     this.$q.notify({
    //       color: 'red-5',
    //       textColor: 'white',
    //       icon: 'warning',
    //       message: 'Минимальное количество символов - 5'
    //     })
    //   } else {
    //     const comment = this.comment
    //     this.$store.dispatch('module1/sendComment', comment)
    //     this.$q.notify({
    //       color: 'green-4',
    //       textColor: 'white',
    //       icon: 'cloud_done',
    //       message: 'Спасибо, Ваш комментарий отправлен руководству сервиса'
    //     })
    //   }
    // }
  },

  computed: {
    // subscribeBtnTel () {
    //   let now = Date.now()
    //   let expirationTelDate = localStorage.getItem('expirationTelDate')
    //   if (expirationTelDate !== null && now < expirationTelDate) {
    //     return false
    //   }
    //   return true
    // },
    // subscribeBtnEmail () {
    //   let now = Date.now()
    //   let expirationEmailDate = localStorage.getItem('expirationEmailDate')
    //   if (expirationEmailDate !== null && now < expirationEmailDate) {
    //     return false
    //   }
    //   return true
    //   // return this.$store.getters['module1/subscribeBtnEmail']
    // },
    totalMatches () {
      return this.$store.getters['module1/getMatches'].matchesUpdated
    },
    matchesActive () {
      // return this.totalMatches
      return this.totalMatches.filter((match) =>
        new Date(match.date) >= new Date()
        // new Date(match.date).getDate() >= new Date().getDate()
      )
    },
    filteredMatches () {
      // let matchesArray = this.totalMatches.filter((match) =>
      //   new Date(match.date) > new Date()
      // )
      // this.matchesActive = this.totalMatches.filter((match) =>
      //   new Date(match.date) > new Date()
      // )
      return this.filters.reduce((matchesActive, { value, getter }) => {
        if (value) {
          return matchesActive.filter(match => getter(match) === value)
          // return matchesActive.filter(match => getter(match) === value && new Date(match.date) > new Date())
        } else {
          return matchesActive
        }
      }, this.matchesActive)
    }
  },
  beforeCreate () {
    this.$store.dispatch('module1/getMatches')
  },
  created () {
    // this.totalMatches = this.$store.getters['module1/getMatches'].matchesUpdated
    const now = Date.now()
    const expirationDate = localStorage.getItem('expirationDate')
    if (expirationDate !== null && now < expirationDate) {
      this.$store.dispatch('module1/globalBtnsDisable')
    }
    const expirationTelDate = localStorage.getItem('expirationTelDate')
    if (expirationTelDate !== null && now < expirationTelDate) {
      this.subscribeTel = false
    }
    const expirationEmailDate = localStorage.getItem('expirationEmailDate')
    if (expirationEmailDate !== null && now < expirationEmailDate) {
      this.subscribeEmail = false
    }
    // let expirationEmailDate = localStorage.getItem('expirationEmailDate')
    // if (expirationEmailDate !== null && now < expirationEmailDate) {
    //   this.$store.dispatch('module1/globalBtnsDisable')
    // }
  },
  mounted () {
  }
}
</script>
<style lang="sass">
  .up
    margin-top: -50px
    transition: 1s linear
  .main
    background: #fff
  .filters
    display: flex
    flex-direction: column
    transition: 1s linear
    padding: 10px 0 70px 0
    color: $darkgreen
    width: 100%
    background: linear-gradient(to right top, lighten($primary, 20%), lighten($primary, 60%), lighten($secondary, 60%))
    background: linear-gradient(to right bottom, $lightgreen, $green)
    background-size: cover

    h3
      font-weight: bold
      font-size: $font-size-h3
      font-family: Arial,Helvetica Neue,Helvetica,sans-serif
      text-transform: uppercase
      margin-top: 10px

  .filters__subscriber
    margin: auto
    margin-top: 20px
    h4
      color: $color-dark
  .filters__contacts
    width: $col-11
    max-width: 1300px
    display: flex
    justify-content: space-between
    margin: auto
    background: linear-gradient(to right bottom, $green, $darkgreen)
    background: transparent
  .filters__contact q-field__label
    text-transform: capitalize
  .filters__contact
    align-self: bottom
    margin-top: 10px
    min-height: 120px
    width: 32%
    q-btn
      text-transform: lowercase
    label
      color: #fff
      text-transform: lowercase
    &--msg
      display: flex
      justify-content: center
      flex-wrap: wrap
      margin: auto
    &--bots
      display: flex
      flex-direction: column
      justify-content: flex-end
      button
        width: 100%
        min-height: 50px
        background-color: $facebook
        margin-top: 10px
      p
        text-align: center
        font-size: $font-size-h6
        margin-bottom: 0
      &--tg button
        background-color: $telegram
    &--email
      display: flex
      flex-direction: column
      justify-content: flex-end
      button
        width: 100%
  .btn__contact
    width: 100%
    margin-top: 10px
  .subscribe__terms
    color: $color-dark
  .filters__container
    background: linear-gradient(to right bottom, $green, $darkgreen)
    padding: 10px 20px 30px
    box-shadow: -20px 30px 80px 0px grey
    color: #fff
    margin: 0 auto 20px
    width: 400px
  .matches
    width: 100%
    h2
      font-weight: bold
      font-size: $font-size-h3
      font-family: Arial,Helvetica Neue,Helvetica,sans-serif
      text-transform: uppercase
      color: $darkgreen
      width: 100%
      text-align: center
      margin: 30px auto 0
  .matches__title
    border-top: none
  .match__wrapper
    width: 100%
    background: linear-gradient(to bottom, $green 0% 10%, $darkgreen 10% 30%, $green 30% 50%, $darkgreen 50% 70%, $green 70% 90%, $darkgreen 90% 100%)
    background: linear-gradient(to right bottom, $lightgreen, $green)
    margin: 30px auto 0
  .match__container
    padding-top: 20px
    max-width: 1100px
    margin: 0 auto
    h3
      margin: 20px auto 0
  .match
    margin-bottom: 10px
    padding: 10px
    max-width: 1300px
  .match__description
    margin: 0 auto 30px
    color: $darkgreen
    h3
      margin-bottom: 20px
  .match__data
    width: 100%
    display: flex
    flex-wrap: wrap
    justify-content: center
    background: lightgrey
  .match__data .match__data-item
    display: flex
    margin: auto
    flex-wrap: wrap
    font-weight: bold
    color: $darkgreen
    min-height: 40px
    justify-content: center
    text-align: center
    align-self: center
    align-items: center
    width: 15%
    min-width: 140px
    p
      margin-bottom: 0
      color: $secondary
  .match__img
    width: 300px
    display: flex
    margin: 10px auto
  .teams
    width: 100%
    display: flex
    justify-content: space-around
  .team
    width: 30%
    overflow: hidden
    display: flex
    flex-direction: column
    background: linear-gradient(to right bottom, $green, $darkgreen)
    padding: 5px 0
    min-height: 100px
    box-shadow: -20px 30px 80px 0px grey
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
  .booking
    padding: 0 5px
  .q-form .q-field__label
    color: #fff
    font-size: $font-size-h5
    min-height: 30px
  .q-field--standard .q-field__control:after
    color: #fff
  .q-form .q-field
    margin-left: 5px
  .q-btn-toggle, .q-toggle
    margin: 5px auto
  .comment
    display: block
    margin:  30px auto
    width: $col-11
    max-width: 900px

</style>
