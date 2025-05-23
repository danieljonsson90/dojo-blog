<template>
  <h1>Single image</h1>
  <div v-if="show" class="image-backdrop" @click.self="close">
    <div class="image-content">
      <span class="material-icons close" @click="close">close</span>
      <span class="material-icons right" @click="forward">arrow_forward</span>
      <span class="material-icons left" @click="back">arrow_back</span>
      <img :src="imageUrls[current]" alt="uploaded image" />
    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue';
export default {
  props: ['src', 'show', 'imageUrls', 'imageIndex'],
  emits: ['close'],
  setup(props, { emit }) {
    const close = () => emit('close');
    const current = ref(props.imageIndex);
    const handleKeydown = (e) => {
      if (e.key === 'ArrowRight') {
        current.value = (current.value + 1) % props.imageUrls.length;
      } else if (e.key === 'ArrowLeft') {
        current.value =
          (current.value - 1 + props.imageUrls.length) % props.imageUrls.length;
      }
    };
    const forward = () => {
      current.value = (current.value + 1) % props.imageUrls.length;
    };

    const back = () => {
      current.value =
        (current.value - 1 + props.imageUrls.length) % props.imageUrls.length;
    };
    onMounted(() => {
      window.addEventListener('keydown', handleKeydown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeydown);
    });
    return { close, handleKeydown, current, forward, back };
  },
};
</script>

<style>
.image-backdrop {
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
.image-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  position: relative;
  min-width: 50vw;
  max-height: 70vh;
  text-align: center;
}
.image-content img {
  max-width: 70vw;
  max-height: 70vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.image-content .material-icons {
  font-weight: bold;
  font-size: 28px;
  color: #bbb;
  cursor: pointer;
}
.image-content .material-icons.close {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
}
.image-content .material-icons.right {
  position: absolute;
  bottom: 50%;
  right: 0.2rem;
}
.image-content .material-icons.left {
  position: absolute;
  bottom: 50%;
  left: 0.1rem;
}
</style>
