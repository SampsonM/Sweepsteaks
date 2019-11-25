<template>
  <div class="landing-page">
    <div class="animated-image">
      <img class="brush" alt="Sweepsteaks" src="../assets/broom.svg" />
      <img class="steak" src="../assets/meat.svg" />
      <img class="steak" src="../assets/meat.svg" />
    </div>
    <div class="landing-page__content">
      <h1 class="landing-page__title">- welcome to -<br/>SWEEP-STEAKS</h1>

      <div class="landing-page__ctas" v-if="$sweepAccessAllowed">
        <button class="landing-page__ctas-login">
          <router-link to="/login">Login</router-link>
        </button>
        <button class="landing-page__ctas-sign-up">
          <router-link to="/signup">Sign-up</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  components: {},
  methods: {
    login() {
    }
  },
  // async fetch() {
  //   // const res = await axios.get('https://baconipsum.com/api/?type=meat-and-filler')

  //   // console.log(res)
  // }
}
</script>

<style lang="scss" scoped>
@import "../styles/_mixins.scss";
@import "../styles/_vars.scss";

.landing-page {
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

  &__ctas {
    color: white;
    display: flex;
    justify-content: center;
    padding-top: 10px;
  }
  
  &__ctas-login {
    height: 45px;
    width: 100px;
    background-color: #ff8d8d;
    margin-right: 10px;
    border-radius: 5px;
    transition-duration: 200ms;

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
  margin: 80px 0 0 20%;

	-webkit-animation: animateCloud 1.4s ease-in-out 1;
	-moz-animation: animateCloud 1.4s ease-in-out 1;
  animation: animateCloud 1.4s ease-in-out 1;

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
  };

  @include breakpoint(desktop) {
    left: -10%;
  }
}
</style>
