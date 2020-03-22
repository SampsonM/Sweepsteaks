<template>
	<div class="input">
    <span class="input__label">
      <label :for="name">{{ label }}</label>

      <transition name="rotate-question">
        <font-awesome-icon
          v-if="hint && !hintOpen"
          @click="toggleHint"
          class="input__hint"
          :icon="['far','question-circle']" />
      </transition>
      <transition name="rotate-cross">
        <font-awesome-icon
          v-if="hint && hintOpen"
          @click="toggleHint"
          class="input__hint"
          :icon="['far','times-circle']" />
      </transition>
    </span>

    <transition name="hint">
      <div v-if="hintOpen" class="input__hint-text">
        {{ hint }}
      </div>
    </transition>
    
    <span class="input__input-wrapper">
      <input
        :class="{ 'error' : hasError }"
        v-bind="$attrs"
        :name="name"
        :id="name"
        :type="type"
        @blur="$emit('blur', $event.target.value)">

        <p class="input__input-error"
          v-if="hasError && errMessage">
          {{ errMessage }}
        </p>
    </span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  data() {
    return {
      hintOpen: false
    }
  },
  props: {
    label: {
      type: String,
      required: true
    },
    hint: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    hasError: {
      type: Boolean,
      required: false,
      default: false
    },
    errMessage: {
      type: String,
      required: false
    }
  },
  methods: {
    toggleHint() {
      this.hintOpen = !this.hintOpen
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  margin: auto auto 15px auto;
  padding: 0;
  border: none;
  display: flex;
  flex-direction: column;
  text-align: left;

  @include breakpoint(tablet) {
    margin-bottom: 20px;
  }

  &__label {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: $black;
    margin: 0;
    padding-bottom: 3px;
  }

  &__hint {
    color: $dark-red;
    margin: 0 0 0 5px;
  }

  &__hint-text {
    color: #5e5e5e;
    margin-bottom: 2px;
  }

  &__input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__input-error {
    padding: 5px 0 0 0;
    color: $red;
  }

  input {
    width: 100%;
    height: 45px;
    border-radius: 4px;
    border: 2px solid transparent;
    padding: 5px;
    font-size: 14px;

    &:focus {
      outline: none;
      transition: 0.3s;
      border: 3px solid $dark-yellow;
    }

    &.error {
      color: $red;
      border: 3px solid $red;
    }
  }
}

.hint-enter-active {
  animation: pop 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

@keyframes pop {
  0% { transform: scale(0.8);}
  100% { transform: scale(1);}
}

.rotate-question-enter-active, .rotate-cross-enter-active {
  transition: transform 0.5s;
}

.rotate-question-leave-active, .rotate-cross-leave-active {
  display: none;
}

.rotate-question-enter {
  opacity: 0;
  transform: rotate(360deg);
}

.rotate-cross-enter {
  opacity: 0;
  transform: rotate(180deg);
}

</style>
