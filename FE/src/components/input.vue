<template>
	<fieldset>
    <label :for="name">{{ label }}</label>
    <input
      v-bind="$attrs"
      :name="name"
      :type="type"
      @input="$emit('input', $event.target.value)">
  </fieldset>
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
    }
  }
}
</script>

<style lang="scss" scoped>
fieldset {
  width: 100%;
  margin-bottom: 15px;
  padding: 0;
  border: none;
  label {
    float: left;
    color: #2c2c2c;
    top: 12px;
    position: relative;
  }

  input {
    float: right;
    width: 70%;
    max-width: 320px;
    height: 45px;
    border-radius: 4px;
    border: none;
    padding: 5px;
  }
}

</style>
