<template>
  <div>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section class="success-icon">
          <!-- <div class="flex flex-center" width="100px" height="100px" > -->
            <q-icon name="img:statics/icons/success.svg"/>
          <!-- </div> -->
        </q-card-section>

        <q-card-section>
          <p>{{ $t('booked1') }}  {{ team }} / {{ match.city }} / {{ match.adress }} / {{ match.date }} / {{ match.time }}</p>
          <div v-html="$t('booked2')"></div>
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
  props: ['match', 'team'],
  data () {
    return {
      alert: true
      // teamNumber: 1
    }
  },
  computed: {
  },
  methods: {
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
