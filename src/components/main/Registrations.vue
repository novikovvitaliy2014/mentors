<template>
  <div flex-center class="main">
    <section class="registrations">
      <ReceiverRegistration/>
      <VolunteerRegistration/>
    </section>
  </div>
</template>

<script>
import VolunteerRegistration from 'components/main/VolunteerRegistration.vue'
import ReceiverRegistration from 'components/main/ReceiverRegistration.vue'

export default {
  components: {
    VolunteerRegistration,
    ReceiverRegistration
  }
}
</script>
<style lang="sass">
.registrations
  @include container($col-10, $col-10, col-10, $max-width: 1200px)
  display: flex
  justify-content: space-around
  @include mobile-tab
    flex-direction: column
.up
  margin-top: -50px
  transition: 1s linear
.main
  background: #fff
</style>
