<template>
  <Navbar />
  <div class="content">
    <router-view />
  </div>
  <AppFooter />
</template>

<script>
import Navbar from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
export default {
  components: { Navbar, AppFooter },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

body {
  margin: 0;
}

.content {
  flex: 1; /* This takes up the remaining space */
}

blockquote {
  line-height: 1.4;
  font-weight: 500;
  font-size: 1.1rem;
}

p {
  word-break: break-word;
}
</style>
