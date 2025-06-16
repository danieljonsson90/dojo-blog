<template>
  <header>
    <AdminDashborad />
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
        <div class="links" :class="{ small: showLinks }" v-if="isReady">
          <BaseLink
            :name="'Home'"
            :label="'Hem'"
            :primary="false"
            color="white"
            size="large"
          />
          <BaseLink
            :name="'Posts'"
            :label="'Inlägg'"
            :primary="false"
            color="white"
            size="large"
          />
          <BaseLink
            v-if="isLoggedIn"
            :name="'Create'"
            :label="'Skapa inlägg'"
            :primary="false"
            color="white"
            size="large"
          />
          <BaseLink
            :name="'Gallery'"
            :label="'Galleri'"
            :primary="false"
            color="white"
            size="large"
          />
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref, computed } from 'vue';
import BaseLink from './BaseLink.vue';
import AdminDashborad from './AdminDashborad.vue';
import { useAuthStore } from '@/stores/auth';
export default {
  components: { BaseLink, AdminDashborad },
  setup() {
    const showLinks = ref(false);
    const onMenuClick = () => {
      showLinks.value = !showLinks.value;
    };
    const authStore = useAuthStore();
    const isLoggedIn = computed(() => authStore.isLoggedIn);
    const isReady = computed(() => authStore.isReady);

    return {
      onMenuClick,
      showLinks,
      isLoggedIn,
      isReady,
    };
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
  position: relative;

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

header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2); /* Darker overlay */
  z-index: 1;
}

header * {
  position: relative;
  z-index: 2; /* Put actual content above the overlay */
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
    margin-bottom: 2rem;
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
