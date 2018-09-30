<template>
  <div class="home">
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
  name: 'home',
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

@-webkit-keyframes fade {
    0% {
      opacity: 1;
      left: -8%;
    }
    90% {
      opacity: 0.6;
      left: -8%;

    }
    100% {
      opacity: 0;
      left: 8px;
    }
}

@-moz-keyframes fade {
    0% {
      opacity: 1;
      left: -8%;
    }
    90% {
      opacity: 0.6;
      left: -8%;
    }
    100% {
      opacity: 0;
      left: 8px;
    }
}

@keyframes fade {
    0% {
      opacity: 1;
      left: -8%;
    }
    90% {
      opacity: 0.6;
      left: -8%;
    }
    100% {
      opacity: 0;
      left: 8px;
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
  opacity: 0;

  -webkit-animation: fade 1.4s ease-in-out 1;
	-moz-animation: fade 1.4s ease-in-out 1;
  animation: fade 1.4s ease-in-out 1;

  @include breakpoint(tablet) {
    top: 270px;
  };
}

.title {
  margin-top: 35%;
  left:0;
  right:0;
  color: $red;

  @include breakpoint(mobileL) {
    position: absolute;
    bottom: 0;
    margin-left: 60%;
  }

  @include breakpoint(tablet) {
    position: absolute;
    bottom: 20%;
    margin-left: 30%;
    font-size: 5em;
  }
}

</style>

