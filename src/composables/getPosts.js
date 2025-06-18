import { ref } from 'vue';
import app from '../firebase/config';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { usePostsStore } from '@/stores/posts';

const getPosts = () => {
  const postsStore = usePostsStore();
  const error = ref(null);
  const isLoading = ref(false);

  const load = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      const db = getFirestore(app);
      const postsCol = collection(db, 'posts');
      const q = query(postsCol, orderBy('createdAt', 'desc'));
      const postsSnapshot = await getDocs(q);
      postsStore.setPosts(
        postsSnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id, loaded: true };
        })
      );
    } catch (err) {
      error.value = err.message;
      postsStore.setPosts([]); // Consider setting to empty array on error
    } finally {
      isLoading.value = false;
    }
  };

  return { error, isLoading, load };
};

export default getPosts;
