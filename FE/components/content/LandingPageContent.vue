<template>
  <main class="landing-content">
    <transition name="slide-in">
      <SignUpForm v-if="signUpOpen" @closeSignUp="closeSignUp" />
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
      v-if="!signUpOpen && !allwd"
      type="button"
      btn-style="cta-1"
      size="large"
      @click="openSignUp"
    >
      Sign up
    </MyButton>

    <section class="how-to-content">
      <h2>How to start sweeping steaks!!</h2>
      <div class="how-to-content__step">
        <div class="how-to-content__sign-up-step">

          <h3 class="how-to-content__sign-up-step-header">1. Create an account</h3>
        </div>
        <img src="@/assets/img/sign-up-form.png" alt="sign up form">
      </div>
      <div class="how-to-content__step">
        <h3>2. Create or join as many groups for different friend groups as you like!</h3>
        <img src="@/assets/img/join-or-create-group.png" alt="join or create group">
      </div>
      <div class="how-to-content__step">
        <h3>3. Convince your friends to sign up and join your groups...</h3>
        <img src="@/assets/img/insecurity.gif" alt="insecure friends">
      </div>
      <div class="how-to-content__step">
        <h3>4. Choose a competition to start a <strike>sweepstake</strike> sweepsteak!</h3>
        <p>You can create as many sweepstakes for different competitions as you like with your group.</p>
      </div>
      </div>
    </section>
  </main>
</template>

<script>
import SignUpForm from '@/components/forms/SignUpForm.vue'
import MyButton from '@/components/elements/button.vue'
import { mapState } from 'vuex'

export default {
  components: {
    SignUpForm,
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
  },
  computed: {
    ...mapState(['allwd']),
  }
}
</script>

<style lang="scss">
.landing-content {
  width: 95%;
  max-width: 1450px;
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

.how-to-content {
  text-align: left;
  margin-bottom: 100px;
  margin-top: 50px;
  padding: 35px;
  background: rgba($dark-yellow, 0.6);
	backdrop-filter: blur(4px);
  border-radius: 6px;
  max-width: 100%;
  
  &__step {
    margin-bottom: 25px;
  }

  &__sign-up-step {
    display: flex;
  }

  &__sign-up-step-header {
    width: auto;
  }

  img {
    border-radius: 6px;
    width: 90%;
    margin: 0 auto;

    @include breakpoint(tablet) {
      width: auto;
      height: 350px;
    }
  }

  h3, h2 {
    color: $blue;
  }
}
</style>
