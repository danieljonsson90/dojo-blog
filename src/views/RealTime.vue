<template>
  <h1>RealTime</h1>
  <div v-if="posts.length" class="layout">
    <PostList :posts="posts" />
    <TagCloud :posts="posts" />
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>

<script>
import { onUnmounted, ref } from 'vue';
import app from '../firebase/config';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import PostList from '../components/PostList.vue';
import Spinner from '../components/AppSpinner.vue';
import TagCloud from '../components/TagCloud.vue';
export default {
  components: { PostList, Spinner, TagCloud },
  setup() {
    const posts = ref([]);
    const db = getFirestore(app);
    const postsCol = collection(db, 'posts');
    const q = query(postsCol, orderBy('createdAt', 'desc'));

    // 🔁 Real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      posts.value = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    });

    onUnmounted(() => {
      unsubscribe();
    });
    return { posts };
  },
};
</script>

<style></style>
