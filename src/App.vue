<template>
  <Navbar class="nav-container" />
  <div class="content">
    <router-view />
  </div>
  <AppFooter />
</template>

<script>
import Navbar from './components/AppNavbar.vue';
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

.nav-container {
  background-image: url('@/assets/images/0AA5D7C5-0660-44F8-A6AE-AD474C393690.jpg'); /* adjust path */
  background-size: cover;
  background-position: center;
  color: white;
  padding: 2rem;
}

blockquote {
  line-height: 1.4;
  font-weight: 500;
  font-size: 1.1rem;
}
</style>
