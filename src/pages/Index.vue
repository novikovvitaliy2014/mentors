<template>
  <q-page >
    <about/>
    <registrations/>
    <data-admin/>
  </q-page>
</template>

<script>
import Registrations from '../components/main/Registrations.vue'
import About from '../components/main/About.vue'
import DataAdmin from '../components/main/Data.vue'
export default {
  components: {
    Registrations,
    About,
    DataAdmin
  }
}
</script>
