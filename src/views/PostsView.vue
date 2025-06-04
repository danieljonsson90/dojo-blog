<template>
  <div data-testid="posts" class="posts">
    <div v-if="isLoading">
      <Spinner />
    </div>
    <div v-else-if="error">Error: {{ error }}</div>
    <template v-else>
      <div v-if="posts?.length > 0" class="layout">
        <PostList :posts="posts" />
        <TagCloud :posts="posts" />
      </div>
      <div v-else>
        <p class="no-posts">
          Det finns inga inlägg, gå till
          <router-link :to="{ name: 'Create' }">skapa inlägg</router-link>
          för att skapa ett nytt inlägg.
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import PostList from '../components/PostList.vue';
import getPosts from '../composables/getPosts';
import Spinner from '../components/AppSpinner.vue';
import TagCloud from '@/components/TagCloud.vue';

export default {
  components: { PostList, Spinner, TagCloud },
  setup() {
    const { posts, error, isLoading, load } = getPosts();
    load();

    return { posts, error, isLoading };
  },
};
</script>

<style>
.posts {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}

.layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
}

.no-posts a {
  text-decoration: none;
  color: #ff8800;
}

@media (max-width: 768px) {
  .layout {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap-reverse;
    align-items: center;
    justify-content: center;
  }

  aside {
    width: 100%;
  }
}
</style>
