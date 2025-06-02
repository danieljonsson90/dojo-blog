<template>
  <header>
    <div class="heading">
      <span class="title">
        <BaseLink :name="'Home'" :linkText="'Vietnam'" />
      </span>
      <div class="menu-icon">
        <span
          @click="onMenuClick"
          class="material-icons"
          :class="{ active: showLinks }"
          >menu</span
        >
      </div>
    </div>
    <nav>
      <div>
        <div class="links" :class="{ small: showLinks }">
          <BaseLink :name="'Home'" :linkText="'Hem'" />
          <BaseLink :name="'Posts'" :linkText="'Inlägg'" />
          <BaseLink :name="'Create'" :linkText="'Skapa inlägg'" />
          <BaseLink :name="'Gallery'" :linkText="'Galleri'" />
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue';
import BaseLink from './BaseLink.vue';

export default {
  components: { BaseLink },
  setup() {
    const showLinks = ref(false);
    const onMenuClick = () => {
      showLinks.value = !showLinks.value;
    };

    return { onMenuClick, showLinks };
  },
};
</script>

<style>
nav a {
  display: inline-block;
  margin: 20px;
  padding: 5px;
}

header {
  background-color: #222; /* valfritt, men ofta behövs för att täcka bakomliggande */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 15rem;
}

header .title a {
  color: white;
  font-size: 48px;
  font-weight: bold;
  text-decoration: none;
}

.menu-icon {
  display: none;
}

.active {
  border-bottom: 3px solid #ff8800;
}

@media (max-width: 850px) {
  .nav-container {
    padding: 0.5rem !important;
  }
  .heading {
    display: flex;
    align-items: center;
    margin-top: 2rem;
    justify-content: space-between;
  }
  header {
    height: 9rem;
    display: block;
  }
  nav {
    padding: 0;
  }
  nav .links {
    display: none;
  }

  nav .links.small {
    display: flex; /* show when 'small' class is active */
    flex-direction: row;
    margin-top: 1rem;
    justify-content: space-around;
  }
  .menu-icon {
    display: block;
    padding-top: 0.5rem;
  }

  .menu-icon .material-icons {
    font-size: 28px;
    font-weight: bold;
  }
  header .material-icons {
    color: white;
    cursor: pointer;
  }
}
</style>
