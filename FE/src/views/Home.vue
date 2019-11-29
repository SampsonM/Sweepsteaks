<template>
  <div class="landing-page">

    <Header />

    <div :class="['animated-image', { 'animated-image__animate': !hasSeenAnimation }]">
      <img class="brush" alt="Sweepstakes" src="../assets/broom.svg" />
      <img class="steak" alt="Sweepstakes" src="../assets/meat.svg" />
      <img class="steak" alt="Sweepstakes" src="../assets/meat.svg" />
    </div>

    <div class="landing-page__content">
      <h1 class="landing-page__title">- welcome to -<br/>SWEEP-STEAKS</h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapFields } from 'vuex-map-fields'
import Header from '@/components/header.vue'

export default {
  name: 'home',
  components: {
    Header
  },
  computed: {
    ...mapFields([
      'hasSeenAnimation'
    ])
  },
  beforeDestroy() {
    this.hasSeenAnimation = true
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/_mixins.scss";
@import "../styles/_vars.scss";

.landing-page {
  padding: 20px;
  min-height: 100vh;

  &__content {
    margin-top: 28%;
    left:0;
    right:0;
    color: $red;

    @include breakpoint(mobileL) {
      position: absolute;
      top: 0;
      margin: 20% 0 0 50%;
    }

    @include breakpoint(desktop) {
      position: absolute;
      bottom: 36%;
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
  margin: 150px 0 0 20%;

  &__animate {
    -webkit-animation: animateCloud 1.4s ease-in-out 1;
    -moz-animation: animateCloud 1.4s ease-in-out 1;
    animation: animateCloud 1.4s ease-in-out 1;
  }

  @include breakpoint(tablet) {
    margin-top: 18%;
  }

  @include breakpoint(desktop) {
    margin-top: 24%;
  }

  @include breakpoint(mobileL) {
    margin-top: 52px;
  }
}

.brush {
  -webkit-transform: scale(2.2);
	-moz-transform: scale(2.2);
  transform: scale(2.2);
  
  @include breakpoint(tablet) {
    -webkit-transform: scale(3.3);
    -moz-transform: scale(3.3);
    transform: scale(3.3);
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

  @include breakpoint(tablet) {
    top: 240px;
  }

  @include breakpoint(desktop) {
    left: -10%;
  }
}
</style>
