<template>
  <div class="landing-page" itemscope itemtype="http://schema.org/Brand">

    <div class="landing-page__splash">
      <div class="landing-page__banner">
        <div class="landing-page__logo">
          <img itemprop="logo" class="brush" alt="Sweepsteaks" src="../assets/icons/broom.svg" />
          <img itemprop="logo" class="steak" alt="Sweepsteaks" src="../assets/icons/meat.svg" />
          <img itemprop="logo" class="steak" alt="Sweepsteaks" src="../assets/icons/meat.svg" />
        </div>

        <div  class="landing-page__title-wrapper">
          <h1 class="landing-page__title">- welcome to -<br/> <span itemprop="name">SWEEP-STEAKS</span></h1>
        </div>

        <div class="landing-page__ctas" v-if="$sweepAccessAllowed">
          <button class="landing-page__ctas-login">
            <router-link v-if="!allwd" to="/login">Login</router-link>
            <router-link v-else to="/dashboard">Dashboard</router-link>
          </button>

          <a
            v-if="!allwd"
            class="landing-page__ctas-sign-up"
            href="#signup">
            Sign-up
          </a>
        </div>
      </div>
    </div>

    <LandingPageContent v-if="$sweepAccessAllowed"></LandingPageContent>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LandingPageContent from '@/components/landingPageContent.vue'

export default {
  name: 'home',
  components: {
    LandingPageContent
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
  min-height: 100vh;

  &__splash {
    min-height: 100vh;

    @include breakpoint(desktop) {
      padding: 5% 0 0 0;
    }
  }

  &__banner {
    position: relative;
    min-height: 440px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    @include breakpoint(tablet) {
      justify-content: start;
    }

    @include breakpoint(desktop) {
      flex-direction: row;
      justify-content: center;
      align-items: baseline;
      min-height: 440px;
    }
  }

  &__logo {
    display: flex;
    flex-direction: row;
    position: relative;
    left: -16px;

    @include breakpoint(tablet) {
      margin: 100px 30px 90px 0;
    }
 
    @include breakpoint(desktop) {
      margin: 100px 100px 90px 0;
    }
  }

  &__ctas {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    @include breakpoint(tablet) {
      margin-top: 20px;
    }

    @include breakpoint(desktop) {
      position: absolute;
      bottom: 130px;
      right: 385px;
    }
  }
  
  &__ctas-login {
    height: 45px;
    width: 100px;
    background-color: #ff8d8d;
    border-radius: 5px;
    transition-duration: 200ms;
    margin-right: 10px;

    @include breakpoint(tablet) {
      height: 65px;
      width: 130px;
    }

    &:hover,
    :active,
    :focus {
      background-color: #fda0a0;
      outline: none !important;
      border:1px solid #2d69ad;

      a {
        text-decoration: underline;
      }
    }

    a {
      font-family: $font;
      font-size: 16px;
      font-weight: 500;
      color: #2d69ad;
      text-decoration: none;

      @include breakpoint(tablet) {
        font-size: 20px;
      }
    }
  }

  &__ctas-sign-up {
    height: 45px;
    width: 100px;
    line-height: 45px;
    background-color: #2d69ad;
    border-radius: 5px;
    transition-duration: 200ms;

    @include breakpoint(tablet) {
      height: 65px;
      line-height: 65px;
      width: 130px;
      font-size: 20px;
    }

    &:hover,
    :active,
    :focus {
      background-color: #5684b8;
      outline: none !important;
      border: 1px solid #ff8d8d;
      text-decoration: underline;
    }
  }

  &__title-wrapper {
    color: $red;

    @include breakpoint(tablet) {
      font-size: 1.5em;
    }

    @include breakpoint(desktop) {
      font-size: 3em;
      position: relative;
      top: -110px;
    }
  }

  &__title {
    @include breakpoint(tablet) {
      font-size: 3em;
    }

    @include breakpoint(desktop) {
      font-size: 1em;
      background: rgba($yellow, 0.7);
      backdrop-filter: blur(2px);
      padding: 0 10px;
      border-radius: 10px;
    }
  }
}

.brush {
  transform: scale(1.5);

  @include breakpoint(tablet) {
    transform: scale(2);
  }

  @include breakpoint(desktop) {
    max-width: 200px
  }
}

.steak {
  position: relative;
  top: 95px;
  left: -32%;
  height: 105px;

  @include breakpoint(tablet) {
    height: 145px;
    left: -22%;
  }

  &:last-of-type {
    left: -42%;

    @include breakpoint(tablet) {
      left: -32%;
    }
  }
}
</style>
