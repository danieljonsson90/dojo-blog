import { ref } from 'vue';
import app from '../firebase/config';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';

const getPosts = () => {
  const posts = ref(null);
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
      posts.value = postsSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id, loaded: true };
      });
    } catch (err) {
      error.value = err.message;
      posts.value = []; // Consider setting to empty array on error
    } finally {
      isLoading.value = false;
    }
  };

  return { posts, error, isLoading, load };
};

export default getPosts;
