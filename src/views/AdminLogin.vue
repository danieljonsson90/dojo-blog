<template>
  <div class="login-container" data-testid="admin-login">
    <h2>Admin inloggning</h2>
    <form @submit.prevent="login">
      <BaseInput
        label="E-mejl"
        type="email"
        name="email"
        :required="true"
        v-model="email"
      />
      <BaseInput
        label="Lösenord"
        type="password"
        name="password"
        :required="true"
        v-model="password"
      />
      <BaseButton type="submit" label="Logga in" :disabled="loading" />
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
export default {
  components: { BaseInput, BaseButton },
  setup() {
    const loading = ref(false);
    const password = ref('');
    const error = ref('');
    const email = ref('');
    const router = useRouter();
    const login = async () => {
      loading.value = true;
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/');
      } catch (err) {
        error.value = err.message;
        console.log('error', err);
      } finally {
        loading.value = false;
      }
    };
    return { login, email, loading, password, error };
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
.error {
  color: red;
}
</style>
