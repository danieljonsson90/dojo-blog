import { ref } from 'vue';
import { usePostsStore } from '@/stores/posts';
const getPost = (id) => {
  const post = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      const postsStore = usePostsStore();
      post.value = postsStore.getPostById(id);
      return post.value;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { post, error, load };
};

export default getPost;
