import app from '@/firebase/config';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { ref } from 'vue';
import { usePostsStore } from '@/stores/posts';
const removePost = () => {
  const errorRemove = ref(null);
  const postsStore = usePostsStore();

  const remove = async (id) => {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, 'posts', id));
      postsStore.deletePost(id);
      return true;
    } catch (err) {
      errorRemove.value = err.message;
    }
  };

  return { errorRemove, remove };
};

export default removePost;
