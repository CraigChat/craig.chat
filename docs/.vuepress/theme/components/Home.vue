<template>
  <main
    class="home"
    :class="`home${data.giarc ? ' giarc' : ''}`"
    role="main"
    v-show-on-load
  >
    <div class="outer-banner">
      <div class="banner">
        <img src="/icon-512x512.png" no-zoom draggable="false">
        <div class="banner-main">
          <div class="banner-text">
            <h1>{{ data.title || $title }}</h1>
            <p>{{ data.tagline }}</p>
          </div>
          <div class="banner-buttons">
            <NavLink
              class="action-button"
              v-for="abtn in data.actionButtons"
              :key="abtn.text"
              :class="abtn.primary ? 'primary': ''"
              :item="abtn"
            />
          </div>
        </div>
      </div>
    </div>

    <Content class="theme-default-content custom" />
  </main>
</template>

<script>
import Animate from '@theme/animate_scroll.js'
import ShowOnLoad from '@theme/show_on_load.js'
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: 'Home',
  components: { NavLink },
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
    @media (max-width: $MQNarrow)
      height unset
    .banner
      display flex
      align-items center
      max-width 1200px
      margin 0 auto
      padding 20px 50px
      gap 50px
      @media (max-width: $MQNarrow)
        flex-direction column
        gap 5px
      img
        width 300px
        height 300px
        filter drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25))
        @media (max-width: $homePageWidth)
          width 200px
          height 200px
      .banner-main
        display flex
        flex-direction column
        justify-content center
        gap 20px
        @media (max-width: $MQNarrow)
          gap 10px
        .banner-text
          display flex
          flex-direction column
          filter drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5))
          color #FFFFFF
          h1
            font-weight 500
            font-size 64px
            margin 0
            @media (max-width: $MQNarrow)
              text-align center
          p
            font-size 24px
            margin 0
        .banner-buttons
          display flex
          gap 10px
          @media (max-width: $MQNarrow)
            justify-content center
          .action-button
            padding 10px 15px
            filter drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))
            color #FFFFFF
            svg
              display none
            &.primary
              background #007171
              border-radius 5px
              filter none
  .theme-default-content
    max-width 1200px
    margin 0 auto
    padding 2rem 2.5rem
    @media (max-width: $MQNarrow)
      padding 2rem
    @media (max-width: $MQMobileNarrow)
      padding 1.5rem

.home.giarc .outer-banner
  background-color #A02B11
  .banner .banner-main .banner-buttons .action-button.primary
    background #711C08
</style>