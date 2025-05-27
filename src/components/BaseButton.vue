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
import { onMounted, onBeforeUnmount, ref } from 'vue';
export default {
  props: ['variant'],
  setup() {
    const baseButton = ref(null);
    onMounted(() => {
      window.addEventListener('keydown', handleKeydown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeydown);
    });
    const handleKeydown = (e) => {
      if (e.key === 'Escape' && document.activeElement === baseButton.value) {
        baseButton.value.blur();
      }
    };
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
