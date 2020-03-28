<template>
  <div class="row">
    <section class="match__sender col-10 col-xs-12">
      <p>Вы можете подписаться на все матчи, открываемые по этому адресу, и не пропустить свободные места. Вы будете получать информацию о каждом матче сразу после открытия регистрации на него.</p>
      <q-form  @submit="onSubmit">
        <q-input
          type="email"
          :rules="emailRules"
          label="Электронная почта *"
          v-model='email'
        />
        <q-btn
          type="Submit"
          class="btn__send"
          label="Подписаться"/>
      </q-form>
    </section>
  </div>
</template>

<script>
export default {
  props: ['match'],
  data () {
    return {
      email: null,
      emailRules: [
        v => !!v || 'Заполните поле',
        v => /.+@.+/.test(v) || 'Неверный формат',
        v => (v && v.length >= 8) || 'Минимальное количество символов - 8'
      ]
    }
  },
  computed: {
  },
  methods: {
    onSubmit () {
      let mailData = {
        email: this.email,
        matchData: {
          city: this.match.city,
          adress: this.match.adress,
          sport: this.match.sport
        }
      }
      console.log(this.match)
      console.log(mailData)
      this.$store.dispatch('module1/sendMail', mailData)
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Вы подписаны на уведомления о матчах.'
      })
    }
  }
}
</script>

<style lang="stylus">
  .match__sender
    margin: 50px auto 0
    border-top: 2px dashed $darkgreen
    color: $darkgreen
    p
      padding: 10px
      width: 100%
    .match__sender .q-form
      display: flex
  .match__sender .q-form .btn__send
    display: flex
    background: $darkgreen
    color: #fff
    width: 50%
    margin: 0 auto
  .match__sender .q-field__label
    color: $darkgreen
  .match__sender .q-field__control-container .q-field__label
    color: $darkgreen
    font-size: $font-size-h3
    min-height: 30px
  .match__sender .q-field--standard .q-field__control:after
    color: $darkgreen
</style>
