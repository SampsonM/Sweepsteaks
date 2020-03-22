<template>
	<div class="input">
    <label :for="name">{{ label }}</label>
    <i v-if="hint"
      class="input__hint">
      {{ hint }}
    </i>
    
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
  }
}
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  margin: auto auto 20px auto;
  padding: 0;
  border: none;
  display: flex;
  flex-direction: column;
  text-align: left;

  @include breakpoint(tablet) {
  }

  label {
    font-size: 16px;
    color: $black;
    margin: 0;
    padding-bottom: 2px;
  }

  &__hint {
    color: #5e5e5e;
    font-size: 14px;
    margin: 3px 0 5px 0;
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

</style>
