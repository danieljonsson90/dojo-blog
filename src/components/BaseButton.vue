<template>
  <button
    :class="['base-button', classes]"
    @click="$emit('click')"
    ref="baseButton"
    :style="{ backgroundColor }"
  >
    {{ label }}
  </button>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import useEscapeBlurOrEmit from '../composables/useEscapeBlurOrEmit';
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },
  setup(props) {
    const baseButton = ref(null);
    useEscapeBlurOrEmit(baseButton);
    props = reactive(props);
    return {
      classes: computed(() => ({
        'button-primary': props.primary,
        'button-secondary': !props.primary,
        [`button-${props.size || 'medium'}`]: true,
      })),
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
      })),
      baseButton,
    };
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
  display: inline-block;
  cursor: pointer;
}

.base-button:focus-visible {
  border-radius: 1px;
  outline: #ff8800 solid 3px;
  outline-offset: 3px;
}

.button-primary {
  background-color: #ff8800;
  color: white;
}
.button-secondary {
  background-color: transparent;
  color: #ff8800;
  border: none;
}
.button-small {
  padding: 10px 16px;
  font-size: 12px;
}
.button-medium {
  padding: 11px 20px;
  font-size: 14px;
}
.button-large {
  padding: 12px 24px;
  font-size: 16px;
}
</style>
