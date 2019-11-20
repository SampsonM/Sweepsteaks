<template>
	<div class="fieldset">
    <label :for="name">{{ label }}</label>
    <input
      :class="{ 'error' : hasError }"
      v-bind="$attrs"
      :name="name"
      :type="type"
      @blur="$emit('blur', $event.target.value)">
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
    }
  }
}
</script>

<style lang="scss" scoped>
.fieldset {
  width: 90%;
  margin: auto 10px 15px 20px;
  padding: 0;
  border: none;
  display: flex;
  flex-direction: column;
  text-align: left;

  @include breakpoint(tablet) {
    margin: auto 10px 35px 20px;
    flex-direction: row;
    justify-content: space-between;
  }

  label {
    font-size: 16px;
    color: #2c2c2c;
    margin: 7px 0;

    @include breakpoint(tablet) {
      font-size: 18px;
    }
  }

  input {
    width: 100%;
    height: 45px;
    border-radius: 4px;
    border: 2px solid transparent;
    padding: 5px;
    font-size: 14px;

    @include breakpoint(tablet) {
      width: 70%;
      max-width: 320px;
    }

    &:focus {
      outline: none;
      transition: 0.3s;
      border: 2px solid orange;
    }

    &.error {
      border: 3px solid red;
    }
  }
}

</style>
