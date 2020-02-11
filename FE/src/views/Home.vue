<template>
  <div class="landing-page" itemscope itemtype="http://schema.org/Brand">

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

    <div class="landing-page__banner">
      <div :class="['animated-image', { 'animated-image__animate': !hasSeenAnimation }]">
        <img itemprop="logo" class="brush" alt="Sweepsteaks" src="../assets/icons/broom.svg" />
        <img itemprop="logo" class="steak" alt="Sweepsteaks" src="../assets/icons/meat.svg" />
        <img itemprop="logo" class="steak" alt="Sweepsteaks" src="../assets/icons/meat.svg" />
      </div>

      <div  class="landing-page__title-wrapper">
        <h1 class="landing-page__title">- welcome to -<br/> <span itemprop="name">SWEEP-STEAKS</span></h1>
      </div>
    </div>

    <LandingPageContent v-if="$sweepAccessAllowed"></LandingPageContent>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapState } from 'vuex'
import LandingPageContent from '@/components/landingPageContent.vue'

export default {
  name: 'home',
  components: {
    LandingPageContent
  },
  computed: {
    ...mapFields([
      'hasSeenAnimation'
    ]),
    ...mapState([
      'allwd'
    ])
  },
  beforeDestroy() {
    this.hasSeenAnimation = true
  }
}
</script>

<style lang="scss" scoped>
.landing-page {
  padding: 20px;
  min-height: 100vh;

  &__banner {
    position: relative;
    min-height: 100vh;
    padding-top: 55%;

    @include breakpoint(tablet) {
      padding-top: 10%;
    }
  }

  &__ctas {
    z-index: 10;
    position: absolute;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    &--open {
      margin-right: 0;
      transition: 0.5s;
    }
  }
  
  &__ctas-login {
    height: 45px;
    width: 100px;
    background-color: #ff8d8d;
    border-radius: 5px;
    transition-duration: 200ms;
    margin-right: 10px;

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
    }
  }

  &__ctas-sign-up {
    height: 45px;
    width: 100px;
    line-height: 45px;
    background-color: #2d69ad;
    border-radius: 5px;
    transition-duration: 200ms;

    &:hover,
    :active,
    :focus {
      background-color: #5684b8;
      outline: none !important;
      border: 1px solid #ff8d8d;

      a {
        text-decoration: underline;
      }
    }

    a {
      font-family: $font;
      font-size: 16px;
      font-weight: 500;
      color: #ff8d8d;
      text-decoration: none;
    }
  }

  &__title-wrapper {
    margin-top: 34%;
    left:0;
    right:0;
    color: $red;

    @include breakpoint(desktop) {
      position: absolute;
      bottom: 43%;
      margin-left: 38%;
      font-size: 5em;
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

@keyframes animateCloud {
  0% {
    margin-left: -1100px;
  }
  100% {
    margin-left: 20%;
  }
}

.animated-image {
  display: flex;
  margin: 0 0 0 20%;

  &__animate {
    -webkit-animation: animateCloud 1.4s ease-in-out 1;
    -moz-animation: animateCloud 1.4s ease-in-out 1;
    animation: animateCloud 1.4s ease-in-out 1;
  }

  @include breakpoint(tablet) {
    margin-top: 10%;
  }
}

.brush {
  -webkit-transform: scale(2.2);
	-moz-transform: scale(2.2);
  transform: scale(2.2);
  max-width: 312px;
  
  @include breakpoint(tablet) {
    -webkit-transform: scale(3.3);
    -moz-transform: scale(3.3);
    transform: scale(3.3);
    max-width: none;
  }
  
  @include breakpoint(desktop) {
    -webkit-transform: scale(4.3);
    -moz-transform: scale(4.3);
    transform: scale(4.3);
  }
}

.steak {
  position: relative;
  top: 110px;
  left: -20%;
  max-width: 150px;

  @include breakpoint(tablet) {
    top: 240px;
    max-width: none;
  }

  @include breakpoint(desktop) {
    left: -10%;
  }
}
</style>
