<template>
  <main
    class="home"
    role="main"
    v-show-on-load
  >
    <div class="outer-banner">
      <div class="banner">
        <img src="/icon-512x512.png" no-zoom draggable="false">
        <div class="banner-text"><!-- TODO banner text and buttons --></div>
      </div>
    </div>

    <Content class="theme-default-content custom" />
  </main>
</template>

<script>
import Animate from '@theme/animate_scroll.js'
import ShowOnLoad from '@theme/show_on_load.js'

export default {
  name: 'Home',
  directives: {
    animate: Animate(),
    showOnLoad: ShowOnLoad()
  },
  computed: {
    data () {
      return this.$page.frontmatter
    }
  }
}
</script>

<style lang="stylus">
hero-collapse-point = 1000px

.theme-default-content.custom
  .header-anchor
    display none
  h1
    color var(--accent)

.home
  padding $navbarHeight 0 0
  margin 0 auto
  display block
  @media (max-width: $MQMobile)
    padding $navbarHeight 0 0
  .outer-banner
    height 300px
    background-color #00AAAA
    position relative
    overflow hidden
    display flex
    align-items center
    justify-content center
    & > *
      filter drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25))
    @media (max-width: $MQMobile)
      flex-direction column
      height unset
    .banner
      display flex
      align-items center
      max-width 1200px
      margin 0 auto
      img
        width 300px
        height 300px
  .theme-default-content
    max-width 1200px
    margin 0 auto
    padding 2rem 2.5rem
    @media (max-width: $MQNarrow)
      padding 2rem
    @media (max-width: $MQMobileNarrow)
      padding 1.5rem
  .features
    display flex
    flex-direction column
    justify-content center
    align-items center
    padding 20px 0px
    width 100%
    & > * + *
      margin-top 10px
    .feature
      display flex
      flex-direction row
      justify-content center
      align-items center
      padding 10px
      width 100%
      @media (max-width: $MQMobile)
        flex-direction column
      &.gilded
        border 3px solid rgba(255, 184, 0, 0.5)
        box-sizing border-box
        border-radius 5px
        display none
      img
        -webkit-user-drag none
        object-fit cover
        margin-right 40px
        width 150px
        height 150px
        border-radius 15px
        filter drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25))
        @media (max-width: $MQMobile)
          margin-right 0
          margin-bottom 10px
      .feature-text
        display flex
        flex-direction column
        align-items flex-start
        padding 0px
        width 100%
        h2
          font-style normal
          font-weight 500
          font-size 36px
          line-height 42px
          font-feature-settings 'liga' off
          color #f2f2f2
          border none
          margin 0
          @media (max-width: $MQMobile)
            font-size 20px
          .header-anchor
            display none
          strong
            font-weight 900
            color #fff
        p
          font-style normal
          font-weight normal
          font-size 18px
          line-height 21px
          color #ddd
          margin 0 0 10px 0
          @media (max-width: $MQMobile)
            font-size 16px
@media (max-width: $MQNarrow)
  .home
    .features .feature
      h2
        font-size 1.2rem
      p
        font-size 0.8rem
@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
      width unset
      .feature
        max-width 100%
        for i in (feature-delay-range)
          &:nth-child({i})
            animation-delay 0s
        h2
          font-size 1.5rem
        p
          font-size 1rem
</style>