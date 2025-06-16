<template>
  <div class="admin">
    <span>Admin:</span>
    <BaseButton
      v-if="isLoggedIn"
      @click="logout"
      label="Logga ut"
      class="logout"
    />
    <BaseLink
      v-else
      :name="'AdminLogin'"
      :label="'Logga in'"
      :primary="false"
      color="white"
      size="small"
    />
  </div>
</template>

<script>
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'vue-router';
import BaseLink from './BaseLink.vue';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import BaseButton from './BaseButton.vue';

export default {
  components: { BaseLink, BaseButton },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const isLoggedIn = computed(() => authStore.isLoggedIn);

    const logout = async () => {
      try {
        await signOut(auth);
        router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };
    return { logout, isLoggedIn };
  },
};
</script>

<style scoped>
.admin {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logout {
  margin-top: 0;
  margin-left: 0.5rem;
}
</style>
