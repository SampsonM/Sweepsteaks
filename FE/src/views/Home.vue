<template>
  <div class="landingPage">
    <div class="animated-image">
      <img class="brush" alt="Sweepsteaks" src="../assets/broom.svg" />
      <img class="steak" src="../assets/meat.svg" />
      <img class="steak" src="../assets/meat.svg" />
    </div>
    <h1 class="title">- welcome to -<br/>SWEEP-STEAKS</h1>
  </div>
</template>

<script>

export default {
  name: 'landingPage',
  components: {}
}
</script>
<style lang="scss" scoped>
@import "../styles/_mixins.scss";
@import "../styles/_vars.scss";

@-webkit-keyframes animateCloud {
    0% {
        margin-left: -1100px;
    }
    100% {
        margin-left: 30%;
    }
}

@-moz-keyframes animateCloud {
    0% {
        margin-left: -1100px;
    }
    100% {
        margin-left: 30%;
    }
}

@keyframes animateCloud {
    0% {
        margin-left: -1100px;
    }
    100% {
        margin-left: 30%;
    }
}

.animated-image {
  display: flex;
  margin: 80px 0 0 30%;

	-webkit-animation: animateCloud 1.4s ease-in-out 1;
	-moz-animation: animateCloud 1.4s ease-in-out 1;
  animation: animateCloud 1.4s ease-in-out 1;

  @include breakpoint(tablet) {
    margin-top: 23%;
  }

  @include breakpoint(desktop) {
    margin-top: 18%;
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
    top: 270px;
  };

  @include breakpoint(desktop) {
    left: -10%;
  }
}

.title {
  margin-top: 35%;
  left:0;
  right:0;
  color: $red;

  @include breakpoint(mobileL) {
    position: absolute;
    top: 0;
    margin: 20% 0 0 50%;
  }

  @include breakpoint(tablet) {
    font-size: 4em;
  }

  @include breakpoint(desktop) {
    position: absolute;
    bottom: 36%;
    margin-left: 43%;
    font-size: 5em;
  }
}

</style>

