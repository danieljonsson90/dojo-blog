import { ref } from 'vue';
import app from '../firebase/config';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const getPost = (id) => {
  const post = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      const db = getFirestore(app);
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw Error('That post does not exist');
      }
      post.value = { ...docSnap.data(), id: docSnap.id };
      return post.value;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { post, error, load };
};

export default getPost;
