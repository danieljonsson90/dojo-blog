<template>
  <button
    :class="['base-button', variant]"
    @click="$emit('click')"
    ref="baseButton"
  >
    <slot />
  </button>
</template>

<script>
import { ref } from 'vue';
import useEscapeBlurOrEmit from '../composables/useEscapeBlurOrEmit';
export default {
  props: ['variant'],
  setup() {
    const baseButton = ref(null);
    useEscapeBlurOrEmit(baseButton);
    return { baseButton };
  },
};
</script>

<style scoped>
.base-button {
  color: white;
  background: #ff8800;
  border-radius: 5px;
  border: solid 1px #eee;
  padding: 5px 10px;
  margin-top: 20px;
  display: block;
  cursor: pointer;
}

.base-button:focus-visible {
  border-radius: 1px;
  outline: #ff8800 solid 3px;
  outline-offset: 3px;
}
</style>
