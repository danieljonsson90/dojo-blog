<template>
  <header>
    <div class="title">
      <h1>Vietnam</h1>
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
          <router-link :to="{ name: 'Home' }">Home</router-link>
          <router-link :to="{ name: 'Create' }">Create Post</router-link>
          <router-link :to="{ name: 'Gallery' }">Gallery</router-link>
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
  font-size: 20px;
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

header h1 {
  color: white;
  font-size: 48px;
}

.icon {
  display: none;
}

.active {
  border-bottom: 3px solid #ff8800;
}

@media (max-width: 750px) {
  .title {
    display: flex;
    align-items: center;
    margin-top: 2rem;
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
  }
  nav .links.small {
    display: flex; /* show when 'small' class is active */
    flex-direction: row;
    margin-top: 2rem;
    justify-content: space-around;
  }
  .icon {
    display: block;
  }
  header .material-icons {
    color: white;
    cursor: pointer;
  }
}
</style>
