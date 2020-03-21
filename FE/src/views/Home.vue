<template>
  <div class="landing-page" itemscope itemtype="http://schema.org/Brand">
    <header class="header">
      <div class="header__logo">
        <img itemprop="logo" class="brush" alt="Sweepsteaks" src="../assets/icons/broom.svg" />
        <img itemprop="logo" class="steak" alt="Sweepsteaks" src="../assets/icons/meat.svg" />
        <img itemprop="logo" class="steak" alt="Sweepsteaks" src="../assets/icons/meat.svg" />
      </div>

      <h1 itemprop="name" v-if="$sweepAccessAllowed">Sweepsteaks</h1>

      <div v-if="$sweepAccessAllowed">
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

    <LandingPageContent v-if="$sweepAccessAllowed"></LandingPageContent>
   
    <div v-else class="coming-soon">
      <h1 itemprop="name">Sweepsteaks, Coming soon!!</h1>
      <p>Online sweepstakes for you and your mates!</p>
    </div>
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
  min-height: 100vh;
}
  
.header {
  position: relative;
  display: flex;
  background: rgba($yellow, 0.4);
  backdrop-filter: blur(5px);
  align-items: center;
  justify-content: space-around;
  height: 100px;

  &__logo {
    position: relative;
    display: flex;
    flex-direction: row;
    margin: 0;
    height: 100px;
    width: 100px;
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
