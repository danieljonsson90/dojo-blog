<template>
  <header>
    <div class="heading">
      <span class="title">
        <router-link :to="{ name: 'Home' }"> Vietnam </router-link>
      </span>
      <div class="icon">
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
          <router-link :to="{ name: 'Home' }">Hem</router-link>
          <router-link :to="{ name: 'Posts' }">Inlägg</router-link>
          <router-link :to="{ name: 'Create' }">Skapa inlägg</router-link>
          <router-link :to="{ name: 'Gallery' }">Galleri</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const showLinks = ref(false);
    const onMenuClick = () => {
      console.log('click');
      showLinks.value = !showLinks.value;
    };

    return { onMenuClick, showLinks };
  },
};
</script>

<style>
nav a {
  display: inline-block;
  text-decoration: none;
  margin: 20px;
  color: white;
  padding: 5px;
  font-size: 25px;
}

.heading a {
  text-decoration: none;
}
nav a.router-link-active {
  border-bottom: 3px solid #ff8800;
  font-weight: bold;
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
}

.icon {
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

  nav a {
    text-align: center;
    margin: 0;
    font-size: 18px;
  }
  nav .links.small {
    display: flex; /* show when 'small' class is active */
    flex-direction: row;
    margin-top: 1rem;
    justify-content: space-around;
  }
  .icon {
    display: block;
    padding-top: 0.5rem;
  }

  .icon .material-icons {
    font-size: 28px;
    font-weight: bold;
  }
  header .material-icons {
    color: white;
    cursor: pointer;
  }
}
</style>
