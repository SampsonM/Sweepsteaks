<template>
  <main class="landing-content">
    <transition name="slide-in">
      <SignupForm v-if="signUpOpen" @closeSignUp="closeSignUp" />
    </transition>

    <section class="main-content">
      <h1 class="main-content__title">
        Sweep Steaks
      </h1>

      <h2 class="main-content__sub-title">
        <span class="main-content__sub-title-sub-text">
          Sweepsteaks, Coming soon!!
        </span>

        <br />

        Free online sweepstakes for you and your mates, set up a group
        sweepstakes for the horses, World Cup or Premier League!
      </h2>
    </section>

    <MyButton
      v-if="!signUpOpen"
      type="button"
      btn-style="cta-1"
      @click="openSignUp"
    >
      Sign up
    </MyButton>
  </main>
</template>

<script>
import { SignUpForm, MyButton } from '@/components'

export default {
  components: {
    SignupForm,
		MyButton
  },
  data() {
    return {
			signUpOpen: false
    }
  },
  methods: {
    openSignUp() {
      this.signUpOpen = true
    },
    closeSignUp(e) {
      e.preventDefault()
      this.signUpOpen = false
    }
  }
}
</script>

<style lang="scss">
.landing-content {
  width: 95%;
  height: 80%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;

  @include breakpoint(tablet) {
    height: 100%;
    justify-content: start;
  }
}

.main-content {
  padding: 10px;

  @include breakpoint(tablet) {
    margin-bottom: 30px;
  }

  @include breakpoint(desktop) {
    margin-bottom: 0;
    padding: 10px 10px 10px 60px;
  }

  &__title {
    padding: 0 0 5px 0;

    @include breakpoint(desktop) {
      max-width: 50%;
    }
  }

  &__sub-title {
    padding-left: 5px;

    @include breakpoint(desktop) {
      max-width: 80%;
    }
  }

  &__sub-title-sub-text {
    color: $blue;
  }
}
</style>
