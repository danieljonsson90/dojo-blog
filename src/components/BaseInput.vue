<template>
  <div class="input-wrapper" :class="[classes]">
    <label :for="name">{{ label }}</label>
    <textarea
      v-if="type === 'textarea'"
      :id="name"
      :value="modelValue"
      @input="onInput"
      :required="required"
      ref="textarea"
      v-bind="$attrs"
    ></textarea>
    <input
      v-else
      :type="type"
      :value="modelValue"
      @input="onInput"
      @focus="focus"
      @blur="blur"
      :required="required"
      v-bind="$attrs"
      :id="name"
    />
  </div>
</template>

<script>
import { reactive, computed, onMounted, ref, watch, nextTick } from 'vue';

export default {
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
    },
  },
  emits: ['update:modelValue', 'focus', 'blur'],
  setup(props, { emit }) {
    props = reactive(props);
    const focus = () => emit('focus');
    const blur = () => emit('blur');
    const onInput = (event) => {
      emit('update:modelValue', event.target.value);
      if (props.type === 'textarea') {
        autoResize();
      }
    };
    const textarea = ref(null);

    const autoResize = () => {
      if (props.type === 'textarea' && textarea.value) {
        textarea.value.style.height = 'auto';
        textarea.value.style.height = `${textarea.value.scrollHeight + 5}px`;
      }
    };
    onMounted(async () => {
      if (props.type === 'textarea') {
        await nextTick();
        await nextTick();
        autoResize();
      }
    });
    watch(
      () => props.modelValue,
      () => {
        if (props.type === 'textarea') {
          autoResize();
        }
      }
    );
    return {
      classes: computed(() => ({
        [`input-${props.size || 'large'}`]: true,
      })),
      focus,
      blur,
      onInput,
      textarea,
    };
  },
};
</script>

<style scoped>
input,
textarea {
  display: block;
  width: 100%;
  width: 100%;
  margin: 10px auto;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #eee;
}

.input-wrapper {
  max-width: 30rem;
}

label {
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
}

label::before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ff8800;
  z-index: -1;
  padding-right: 40px;
  left: -20px;
  transform: rotate(-1.5deg);
}

textarea {
  min-height: 150px;
  height: fit-content;
}

input:focus-visible,
textarea:focus-visible {
  border-radius: 1px;
  outline: #ff8800 solid 3px;
  outline-offset: 5px;
}

.input-small {
  max-width: 10rem;
}
.input-medium {
  max-width: 15rem;
}
</style>
