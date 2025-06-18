<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post" class="details">
    <div data-testid="details" class="post">
      <h3>{{ post.title }}</h3>
      <blockquote
        class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"
        v-if="post.quote"
      >
        <p>{{ post.quote }}</p>
        <cite>— {{ post.quoteOrigin }}</cite>
      </blockquote>
      <p class="pre">{{ post.body }}</p>
      <div class="details-actions" v-if="isLoggedIn">
        <BaseButton
          @click="showModal = true"
          :label="'Ta bort'"
          data-testid="remove-post-button"
        />
        <router-link :to="{ name: 'Edit', params: { id: post.id } }">
          Redigera
        </router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <Spinner v-if="!error" />
  </div>
  <Modal
    v-if="showModal"
    :show="showModal"
    :showRemove="true"
    :removeText="'Ta bort'"
    :showClose="true"
    @close="showModal = false"
    @remove="handleDelete"
  >
    <h2>Ta bort inlägg</h2>
    <p>
      Är du säker på att du vill ta bort inlägget. När inlägget är borttaget går
      det inte att ångra.
    </p>
  </Modal>
</template>

<script>
import getPost from '../composables/getPost';
import Spinner from '../components/AppSpinner.vue';
import removePost from '../composables/removePost';
import { useRouter } from 'vue-router';
import Modal from '@/components/CustomModal.vue';
import { ref, computed } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import { useAuthStore } from '@/stores/auth';
export default {
  props: ['id'],
  components: { Spinner, Modal, BaseButton },
  setup(props) {
    const { post, error, load } = getPost(props.id);
    const router = useRouter();
    const showModal = ref(false);
    const authStore = useAuthStore();
    const isLoggedIn = computed(() => authStore.isLoggedIn);
    load();
    const { errorRemove, remove } = removePost();
    const handleDelete = () => {
      remove(props.id);
      router.push('/');
    };

    return { post, error, handleDelete, showModal, errorRemove, isLoggedIn };
  },
};
</script>

<style>
.post,
h1 {
  max-width: 1200px;
  margin: 0 auto;
}
.post p {
  color: #444;
  margin-top: 40px;
}

.details p {
  line-height: 1.8;
  font-weight: 500;
  font-size: 1.5rem;
}

.pre {
  white-space: pre-wrap;
}

.post .details-actions a {
  text-decoration: none;
  margin-left: 0.5rem;
  color: white;
  background: #ff8800;
  border-radius: 5px;
  border: solid 1px #eee;
  padding: 11px 20px;
  margin-top: 20px;
  display: inline-block;
  cursor: pointer;
  box-sizing: border-box;
  font-size: smaller;
}
.post .details-actions a:focus-visible {
  border-radius: 1px;
  outline: #ff8800 solid 3px;
  outline-offset: 3px;
}

.post .details-actions button {
  display: inline-block;
  margin-left: 20px;
}
.post .details-actions {
  width: 100%;
  display: flex;
  justify-content: end;
}

.details {
  max-width: 800px;
  margin: 3rem auto;
}

.details .post {
  border-bottom: none;
}
</style>
