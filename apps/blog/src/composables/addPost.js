import app from '@/firebase/config';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { ref } from 'vue';

const addPost = () => {
  const error = ref(null);

  const add = async (post) => {
    try {
      const addPost = { ...post, createdAt: serverTimestamp() };
      const db = getFirestore(app);
      await addDoc(collection(db, 'posts'), addPost);
    } catch (err) {
      error.value = err.message;
    }
  };

  return { error, add };
};

export default addPost;
