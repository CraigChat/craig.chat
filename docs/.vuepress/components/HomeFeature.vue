<template>
  <div class="home-feature">
    <iconify-icon :icon="icon" />
    <div class="home-feature-content">
      <h4 class="title">{{ title }}</h4>
      <p class="description"><slot/></p>
    </div>
  </div>
</template>

<style lang="stylus">
.home-feature
  margin .5em 0
  display flex
  flex-direction row
  align-items flex-start
  .title
    font-weight 500
    font-size 36px
    line-height 42px
    font-feature-settings 'liga' off
    margin 10px 0px
  .title, .description, .description p
    margin 0
  svg
    height 48px
    width 48px
    flex none
    color var(--accent)
    & + .person-content
      margin-left 1em
  .home-feature-content
    display flex
    flex-direction column
    align-items flex-start
    padding 5px
    margin-left 10px
    .description
      color var(--secondaryText)
</style>

<script>
export default {
  name: 'HomeFeature',
  props: ['icon', 'title'],
};
</script>