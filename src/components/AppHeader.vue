<template>
  <header>
    <div class="heading">
      <span class="title">
        <BaseLink
          :name="'Home'"
          :label="'Vietnam'"
          :primary="false"
          color="white"
        />
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
          <BaseLink
            :name="'Home'"
            :label="'Hem'"
            :primary="false"
            color="white"
          />
          <BaseLink
            :name="'Posts'"
            :label="'Inlägg'"
            :primary="false"
            color="white"
          />
          <BaseLink
            :name="'Create'"
            :label="'Skapa inlägg'"
            :primary="false"
            color="white"
          />
          <BaseLink
            :name="'Gallery'"
            :label="'Galleri'"
            :primary="false"
            color="white"
          />
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue';
import BaseLink from './BaseLink.vue';
import { Primary } from '@/stories/Button.stories';

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
nav .base-link {
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
  background-image: url('@/assets/images/0AA5D7C5-0660-44F8-A6AE-AD474C393690.jpg'); /* adjust path */
  background-size: cover;
  background-position: center;
  color: white;
  padding: 2rem;
}

header .title .base-link {
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

@media (max-width: 500px) {
  header {
    padding: 1rem;
  }
}

@media (max-width: 350px) {
  header {
    padding: 0;
  }
}
</style>
