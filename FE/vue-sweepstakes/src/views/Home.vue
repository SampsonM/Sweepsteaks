<template>
  <div class="home">
    <div class="animated-image">
      <img class="brush" alt="Sweepsteaks" src="../assets/broom.svg" />
      <img class="steak" src="../assets/meat.svg" />
      <img class="steak" src="../assets/meat.svg" />
    </div>
    <HelloWorld msg="Welcome to Sweep-steaks"/>
  </div>
</template>

<script>

import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
<style lang="scss" scoped>
@-webkit-keyframes animateCloud {
    0% {
        margin-left: -1100px;
    }
    100% {
        margin-left: 18%;
    }
}

@-moz-keyframes animateCloud {
    0% {
        margin-left: -1100px;
    }
    100% {
        margin-left: 18%;
    }
}

@keyframes animateCloud {
    0% {
        margin-left: -1100px;
    }
    100% {
        margin-left: 18%;
    }
}

@-webkit-keyframes fade {
    0% {
      opacity: 1;
      left: -6%;
    }
    75% {
      opacity: 0.6;
      left: -6%;

    }
    100% {
      opacity: 0;
      left: 70px;
    }
}

@-moz-keyframes fade {
    0% {
      opacity: 1;
      left: -6%;
    }
    75% {
      opacity: 0.6;
      left: -6%;
    }
    100% {
      opacity: 0;
      left: 70px;
    }
}

@keyframes fade {
    0% {
      opacity: 1;
      left: -6%;
    }
    75% {
      opacity: 0.6;
      left: -6%;
    }
    100% {
      opacity: 0;
      left: 70px;
    }
}

.animated-image {
  margin-left: 18%;
  display: flex;
	-webkit-animation: animateCloud 2s ease-in-out 1;
	-moz-animation: animateCloud 2s ease-in-out 1;
	animation: animateCloud 2s ease-in-out 1;
	
	-webkit-transform: scale(0.25);
	-moz-transform: scale(0.25);
	transform: scale(0.25);
}

.brush {
  -webkit-transform: scale(4.3);
	-moz-transform: scale(4.3);
	transform: scale(4.3);
}

.steak {
  -webkit-transform: scale(1.8);
	-moz-transform: scale(1.8);
  transform: scale(1.8);
  
  position: relative;
  top: 260px;
  -webkit-animation: fade 2s ease-in-out 1;
	-moz-animation: fade 2s ease-in-out 1;
  animation: fade 2s ease-in-out 1;
  opacity: 0;
} 

</style>

