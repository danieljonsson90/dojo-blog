import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePostsStore = defineStore('posts', () => {
  // State
  const posts = ref([]);

  // Actions
  const setPosts = (newPosts) => {
    posts.value = newPosts;
  };

  const addPost = (newPost) => {
    posts.value.push(newPost);
  };

  const deletePost = (id) => {
    posts.value = posts.value.filter((p) => p.id !== id);
  };

  // Getters
  const getPostById = (id) => {
    return posts.value.find((post) => post.id === id);
  };

  return {
    getPostById,
    posts,
    addPost,
    setPosts,
    deletePost,
  };
});
