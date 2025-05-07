import app from '@/firebase/config';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { ref } from 'vue';

const removePost = () => {
  const error = ref(null);

  const remove = async (id) => {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, 'posts', id));
    } catch (err) {
      error.value = err.message;
    }
  };

  return { error, remove };
};

export default removePost;
