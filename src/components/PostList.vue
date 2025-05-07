<template>
  <div class="post-list">
    <div v-for="post in copyPosts" :key="post.id">
      <SinglePost :post="post" @delete="handleDelete" />
    </div>
  </div>
</template>

<script>
import SinglePost from './SinglePost.vue';
import { ref } from 'vue';
export default {
  props: ['posts'],
  components: { SinglePost },

  setup(props) {
    const copyPosts = ref([]);
    copyPosts.value = props.posts;
    const handleDelete = (id) => {
      debugger;
      copyPosts.value = copyPosts.value.filter((p) => p.id !== id);
    };
    return { handleDelete, copyPosts };
  },
};
</script>

<style></style>
