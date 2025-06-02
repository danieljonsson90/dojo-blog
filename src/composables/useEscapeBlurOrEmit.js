// src/composables/useEscapeBlur.js
import { onMounted, onUnmounted } from 'vue';

export default function useEscapeBlurOrEmit(elementRef = null, emit = null) {
  const handler = (e) => {
    if (e.key === 'Escape' && document.activeElement === elementRef?.value) {
      elementRef.value.blur();
    } else if (e.key === 'Escape' && !elementRef) {
      document.activeElement.blur();
    }
    if (emit) {
      emit();
    }
  };

  onMounted(() => window.addEventListener('keydown', handler));
  onUnmounted(() => window.removeEventListener('keydown', handler));
}
