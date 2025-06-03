<template>
  <router-link :to="{ name: name }" :class="['base-link', variant]">{{
    linkText
  }}</router-link>
</template>

<script>
import useEscapeBlurOrEmit from '../composables/useEscapeBlurOrEmit';
export default {
  props: ['name', 'linkText', 'variant'],
  setup() {
    useEscapeBlurOrEmit();
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
  font-size: 25px;
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

@media (max-width: 850px) {
  a {
    margin: 0;
    font-size: 18px;
  }
}
</style>
