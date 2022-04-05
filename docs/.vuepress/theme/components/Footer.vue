<template>
  <div class="footer">
    <div class="columns" v-if="config.columns && config.columns.length">
      <img class="column-opener" src="/icon-512x512.png">
      <div class="column-wrapper">
        <div class="column" v-for="(column, i) in config.columns" :key="i">
          <span class="col-title">{{ column.title }}</span>
          <div class="links" v-if="column.rows">
            <NavLink v-for="(cell, ii) in column.rows" :item="cell" :key="ii" />
          </div>
        </div>
      </div>
    </div>
    <div class="fine-print" v-if="config.finePrint"><p>{{ config.finePrint.replace('{year}', new Date().getFullYear().toString()) }}</p></div>
  </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'
export default {
  name: 'Footer',
  components: { NavLink },
  computed: {
    data () {
      return this.$page.frontmatter
    },
    config () {
      return this.$site.themeConfig.footer || {}
    },
  }
}
</script>

<style lang="stylus">
.footer
  background-color #000
  padding 40px
  width calc(100% - 80px)
  margin-top 5rem
  .columns
    display flex
    justify-content space-between
    gap 50px
    .column-opener
      width 100px
      height 100px
      object-fit contain
    .column-wrapper
      display flex
      gap 30px
      flex-wrap wrap
    .column
      display flex
      flex-direction column
      .col-title
        margin-bottom 10px
        font-weight 500
        font-size 24px
        color #fff
      .links
        display flex
        align-items flex-start
        flex-direction column
        a
          font-weight normal
          color #f2f2f2
          font-size 18px
          &.nav-link
            & + a.nav-link
              margin-top 10px
          &:hover
            text-decoration underline
  .fine-print
    color var(--text)
    font-size 16px
    margin 0
    p 
      margin .25rem 0
@media (max-width: $MQMobile)
  .footer
    .columns
      flex-wrap wrap
      .column-opener
        max-width none
      .column
        align-self flex-start
        .links
          justify-content center
    .fine-print
      margin-top 2rem
@media (max-width: $MQMobileNarrow)
  .footer .columns
    flex-direction column
    gap 20px
    justify-content center
    align-items center
</style>