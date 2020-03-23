<template>
  <div class="landing-page" itemscope itemtype="http://schema.org/Brand">
    <header class="header">
      <div class="header__logo">
        <img itemprop="logo" class="brush" alt="Sweepsteaks" src="../assets/icons/broom.svg" />
        <img itemprop="logo" class="steak" alt="Sweepsteaks" src="../assets/icons/meat.svg" />
        <img itemprop="logo" class="steak" alt="Sweepsteaks" src="../assets/icons/meat.svg" />
      </div>

      <div class="header__ctas">
        <router-link
          to="/login"
          v-if="!allwd">
          <MyButton>Login</MyButton>
        </router-link>
        <router-link
          v-else
          to="/dashboard">
          <MyButton>Dashboard</MyButton>
        </router-link>
      </div>
    </header>

    <LandingPageContent></LandingPageContent>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MyButton from '../components/button'
import LandingPageContent from '@/components/landingPageContent.vue'

export default {
  name: 'home',
  components: {
    LandingPageContent,
    MyButton
  },
  computed: {
    ...mapState([
      'allwd'
    ])
  }
}
</script>

<style lang="scss" scoped>
.landing-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  position: relative;
  display: flex;
  background: rgba($yellow, 0.6);
  backdrop-filter: blur(4px);
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  min-height: 80px;

  @include breakpoint(tablet) {
    height: 100px;
    padding: 0 60px;
  }

@include breakpoint(desktop) {
    padding: 0 110px;
  }

  &__logo {
    position: relative;
    display: flex;
    flex-direction: row;
    margin: 0;
    height: 60px;
    width: 88px;

    @include breakpoint(tablet) {
      height: 100px;
      width: 100px;
    }
  }

  &__title {
    display: none;

    @include breakpoint(tablet) {
      display: inline;
    }
  }
}

.brush {
  width: 60px;

  @include breakpoint(tablet) {
    width: 70px;
  }
}

.steak {
  position: absolute;
  bottom: 0;
  right: 30px;
  width: 40px;
  height: 30px;

  @include breakpoint(tablet) {
    bottom: 16px;
  }

  &:last-of-type {
    right: 10px;

    @include breakpoint(tablet) {
    }
  }
}
</style>
