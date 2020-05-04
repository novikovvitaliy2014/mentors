<template>
  <div>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section class="success-icon">
          <q-icon name="img:statics/icons/success.svg"/>
        </q-card-section>
        <q-card-section>
          <div v-html="$t('booked')"></div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      alert: true
    }
  }
}
</script>

<style lang="sass">
.success-icon
  width: 80px
  height: 80px
  margin: auto
  img
    width: 100%
    height: 100%
</style>
