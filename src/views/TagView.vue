<template>
  <div class="tag">
    <div v-if="error">error:{{ error }}</div>
    <div v-if="posts.length" class="layout">
      <PostList :posts="tagPosts" />
      <TagCloud :posts="posts" />
    </div>
    <Spinner v-else />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import getPosts from '../composables/getPosts';
import Spinner from '../components/AppSpinner.vue';
import PostList from '../components/PostList.vue';
import TagCloud from '@/components/TagCloud.vue';

export default {
  props: 'tag',
  components: { PostList, Spinner, TagCloud },
  setup() {
    const route = useRoute();
    const { posts, error, load } = getPosts();
    load();
    const tagPosts = computed(() => {
      return posts.value.filter((p) => p.tags.includes(route.params.tag));
    });
    return { error, tagPosts, posts };
  },
};
</script>

<style></style>
