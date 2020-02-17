<template>
  <div class="landing-page" itemscope itemtype="http://schema.org/Brand">

    <div class="landing-page__banner">
      <div class="landing-page__logo">
        <img itemprop="logo" class="brush" alt="Sweepsteaks" src="../assets/icons/broom.svg" />
        <img itemprop="logo" class="steak" alt="Sweepsteaks" src="../assets/icons/meat.svg" />
        <img itemprop="logo" class="steak" alt="Sweepsteaks" src="../assets/icons/meat.svg" />
      </div>

      <h1 class="landing-page__title" itemprop="name" v-if="$sweepAccessAllowed">Sweepsteaks</h1>

      <button class="landing-page__login" v-if="$sweepAccessAllowed">
        <router-link v-if="!allwd" to="/login">Login</router-link>
        <router-link v-else to="/dashboard">Dashboard</router-link>
      </button>
    </div>

    <LandingPageContent v-if="$sweepAccessAllowed"></LandingPageContent>
   
    <div v-else class="coming-soon">
      <h1 itemprop="name">Sweepsteaks, Coming soon!!</h1>
      <p>Online sweepstakes for you and your mates!</p>
    </div>
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

  &__banner {
    position: relative;
    display: flex;
    background: rgba($yellow, 0.4);
    backdrop-filter: blur(5px);
    align-items: center;
    justify-content: space-around;
    height: 100px;
  }

  &__logo {
    position: relative;
    display: flex;
    flex-direction: row;
    margin: 0;
    height: 100px;
    width: 100px;
  }
  
  &__login {
    height: 42px;
    width: 90px;
    background-color: #ff8d8d;
    border-radius: 5px;
    transition-duration: 200ms;

    @include breakpoint(tablet) {
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
    color: #ff8d8d;
    border-radius: 5px;
    transition-duration: 200ms;

    @include breakpoint(tablet) {
      text-decoration: none;
      line-height: 45px;
      font-size: 20px;
    }

    &:hover,
    :active,
    :focus {
      background-color: #5684b8;
      outline: none !important;
      text-decoration: underline;
    }
  }

  &__title {
    color: $red;
    font-size: 1.2rem;
    position: relative;
    left: -10px;

    @include breakpoint(tablet) {
      font-size: 3em;
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
  bottom: 16px;
  right: 30px;
  width: 40px;
  height: 30px;

  @include breakpoint(tablet) {
  }

  &:last-of-type {
    right: 10px;

    @include breakpoint(tablet) {
    }
  }
}

.coming-soon {
  background: rgba($yellow, 0.4);
  backdrop-filter: blur(5px);
  margin: 0 auto;
  max-width: 600px;
  margin-top: 100px;
  padding: 50px;

  h1 {
    color: $red;
    font-size: 1.2rem;

    @include breakpoint(tablet) {
      font-size: 3em;
    }
  }

  p {
    margin-top: 20px;
  }
}
</style>
