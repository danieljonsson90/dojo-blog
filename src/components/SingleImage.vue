<template>
  <h1>Single image</h1>
  <div v-if="show" class="image-backdrop" @click.self="close">
    <div class="image-content">
      <button class="close" @click="close" aria-label="Stäng förhandsvisning">
        <span class="material-icons">close</span>
      </button>
      <button
        ref="nextImage"
        class="right"
        @click="forward"
        aria-label="Nästa bild"
      >
        <span class="material-icons">arrow_forward</span>
      </button>
      <button class="left" @click="back" aria-label="Föregående bild">
        <span class="material-icons">arrow_back</span>
      </button>
      <img
        :src="imageUrls[current]"
        :alt="`Förhandsvisning bild ${imageIndex + 1}`"
      />
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
    const nextImage = ref(null);
    const handleKeydown = (e) => {
      if (e.key === 'ArrowRight') {
        current.value = (current.value + 1) % props.imageUrls.length;
      } else if (e.key === 'ArrowLeft') {
        current.value =
          (current.value - 1 + props.imageUrls.length) % props.imageUrls.length;
      } else if (e.key === 'Escape') {
        close();
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
      nextImage.value.focus();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeydown);
    });
    return { close, current, forward, back, nextImage };
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
  padding: 4rem;
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
.image-content button.close {
  position: absolute;
  top: 1rem;
  right: 0.5rem;
}
.image-content button.right {
  position: absolute;
  bottom: 50%;
  right: 0.5rem;
}
.image-content button.left {
  position: absolute;
  bottom: 50%;
  left: 0.5rem;
}

.image-content button {
  border: none;
  background: white;
}
</style>
