<template>
  <router-link
    :to="{ name: name }"
    :class="['base-link', classes]"
    tabindex="0"
    :style="style"
    >{{ label }}</router-link
  >
</template>

<script>
import { reactive, computed } from 'vue';
import useEscapeBlurOrEmit from '../composables/useEscapeBlurOrEmit';
export default {
  props: {
    primary: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
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
    color: {
      type: String,
    },
  },
  setup(props) {
    props = reactive(props);
    useEscapeBlurOrEmit();
    return {
      classes: computed(() => ({
        [`link-${props.size || 'medium'}`]: true,
        'link-primary': props.primary,
        'link-secondary': !props.primary,
      })),
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
        color: props.color,
      })),
    };
  },
};
</script>

<style scoped>
.base-link {
  text-decoration: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

nav a.router-link-active {
  border-bottom: 3px solid #ff8800;
  font-weight: bold;
}

.base-link:focus-visible {
  border-radius: 1px;
  outline: #ff8800 solid 3px;
  outline-offset: 3px;
}

.link-primary {
  background-color: #ff8800;
  color: white;
}
.link-secondary {
  background-color: transparent;
  color: #ff8800;
  border: none;
}

.link-small {
  padding: 10px 16px;
  font-size: 16px;
}
.link-medium {
  padding: 11px 20px;
  font-size: 20px;
}
.link-large {
  padding: 12px 24px;
  font-size: 22px;
}

@media (max-width: 980px) {
  .base-link {
    margin: 0;
    font-size: 20px;
  }
}

@media (max-width: 850px) {
  .base-link {
    font-size: 18px;
  }
}
@media (max-width: 550px) {
  .base-link {
    padding: 0;
    font-size: 16px;
  }
}
</style>
