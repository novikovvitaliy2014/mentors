<template>
  <section class="rules row">
    <div class="rules__container col-md-8 col-lg-8 col-xl-6 col-sm-10 col-xs-12">
      <h1>{{ $t('rules') }}</h1>
      <div v-html="$t('rulesStart')"></div>

      <ol class="rules__steps" v-html="$t('rulesSteps')">
      </ol>
      <div v-html="$t('rulesDetails')"></div>
      <!-- <p>Идентификация игроков одной команды происходит с помощью жилеток-накидок, которые выдаются администратором зала.</p> -->
      <!-- <p>Услуги сервиса бесплатные, игрок платит только свою долю аренды зала на матч (от 40 до 80 гривен в зависимости от зала и количества игроков). Аренда мяча входит в стоимость аренды зала (иногда, манишки тоже), но если у Вас есть свой подходящий мяч, то лучше взять и его.</p>
      <p>В каждой команде 6 игроков (если не смогут прийти 2 человека из зарегистрированных, то матч состоится в формате 5*5).</p> -->
      <!-- <p>Первыми играют команда 1 с командой 2.</p> -->
      <!-- <p>Смена вратаря после каждого забитого гола.</p> -->
      <!-- <p>Вылет команды в зону ожидания после 2-х пропущенных голов или 3-х подряд выигранных игр.</p> -->
      <!-- <p>В случае отсутствия свободных мест на участие в игре Вы можете подписаться на рассылку уведомлений о каждой открывающейся игре в выбранном спортзале. </p> -->
      <!-- <p>Важно! Просим отнестись ответственно к бронированию участия, т.к. если несколько человек забронируют, но не придут, то матч может быть сорван для ВСЕХ участников.</p> -->
      <div class="rules__ban" v-html="$t('rulesBun')">
      </div>
      <!-- <p>После регистрации Вы получаете на указанный номер шаблон сообщения для приглашения друзей в мессенджере или по СМС.</p> -->
      <!-- <p class="rules__final">Приятной игры!</p> -->
    </div>
  </section>
</template>

<script>
// import Matches from '../components/main/Matches.vue'
export default {
  components: {
  }
}
</script>

<style lang="stylus">
  .rules
    padding: 0 15px
  .rules__container
    max-width: 1100px
    margin: 30px auto 50px
  .rules__steps
    padding-bottom: 20px
    border-bottom: 1px dashed $color-dark
    li
      font-size: $font-size-h5
      line-height: $line-height-h5
      color: $color-dark
  .rules__final
    text-align: center
    color: $color-dark
  .rules__ban, .rules__ban li
    font-size: $font-size-h5
    line-height: $line-height-h5
  .rules__ban p
    margin-top: 30px
    color: $color-dark

</style>
