<template>
  <div v-if="show" class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <slot />
      <div class="modal-buttons">
        <button class="close-button" @click="close">
          <span @click="showModal = true" class="material-icons">close</span>
        </button>
        <button class="remove-button" @click="remove">Ta bort</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show'],
  emits: ['close', 'delete'],
  setup(props, { emit }) {
    const close = () => emit('close');
    const remove = () => emit('remove');
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
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  position: relative;
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
}
</style>
