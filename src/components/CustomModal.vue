<template>
  <div v-if="show" class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <slot />
      <div class="modal-buttons">
        <button v-if="showClose" class="close-button" @click="close">
          <span class="material-icons">close</span>
        </button>
        <BaseButton
          data-testid="modal-remove"
          class="remove-button"
          v-if="showRemove"
          @click="remove"
          >{{ removeText }}</BaseButton
        >
        <BaseButton v-if="showAdd" @click="console.log('add')">{{
          addText
        }}</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue';
import useEscapeBlurOrEmit from '../composables/useEscapeBlurOrEmit';
export default {
  props: [
    'show',
    'showClose',
    'showRemove',
    'showAdd',
    'showAbort',
    'addText',
    'removeText',
  ],
  emits: ['close', 'delete'],
  components: { BaseButton },
  setup(props, { emit }) {
    const close = () => emit('close');
    const remove = () => emit('remove');
    useEscapeBlurOrEmit(null, close);

    return { close, remove };
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  position: relative;
  z-index: 1000;
  margin-right: 30px;
  margin-left: 10px;
  width: auto;
}

.modal-content button {
  margin-top: 1rem;
}

.modal-buttons button {
  display: inline-block;
  margin-left: 1rem;
}

.modal-buttons {
  text-align: right;
}

.close-button {
  background: none;
  border: none;
  width: unset;
  position: absolute;
  bottom: 75%;
  right: 2%;
  margin: 0;
  color: #d3d3d3;
}
</style>
