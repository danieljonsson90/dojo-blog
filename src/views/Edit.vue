<template>
  <h1>Edit post</h1>
  <form @submit.prevent="handleSubmit" v-if="post">
    <label>Title:</label>
    <input type="text" required v-model="title" />
    <label>Content:</label>
    <textarea ref="textareaRef" required v-model="body"></textarea>
    <label>Tags: (hit enter to add tag)</label>
    <input type="text" v-model="tag" @keydown.enter.prevent="handleKeydown" />
    <div v-for="tag in tags" :key="tag" class="pill">#{{ tag }}</div>
    <button>Update Post</button>
  </form>
  <div v-else>
    <Spinner v-if="!error" />
  </div>
  <div class="error">
    {{ error }}
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue';
import { useRoute } from 'vue-router';
import getPost from '../composables/getPost';
import { ref, onMounted, watch, nextTick } from 'vue';
import app from '../firebase/config';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
export default {
  components: { Spinner },

  setup() {
    const title = ref('');
    const body = ref('');
    const tag = ref('');
    const tags = ref([]);
    const route = useRoute();
    const { post, error, load } = getPost(route.params.id);
    const textareaRef = ref(null);

    const autoResize = () => {
      const el = textareaRef.value;

      if (el) {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
      }
    };

    const handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\ s/, '');
        tags.value.push(tag.value);
      }
      tag.value = '';
    };
    const handleSubmit = async () => {
      const updatedPost = {
        title: title.value,
        body: body.value,
        tags: tags.value,
      };
      try {
        const db = getFirestore(app);
        const docRef = doc(db, 'posts', post.value.id);
        await updateDoc(docRef, updatedPost);
      } catch (err) {
        debugger;
        error.value = err.message;
      }
    };

    onMounted(async () => {
      try {
        await load();

        title.value = post.value.title;
        body.value = post.value.body;
        tags.value = post.value.tags;
        await nextTick();
        autoResize();
      } catch (err) {
        console.error(err);
      }
    });
    watch(body, async () => {
      await nextTick();
      autoResize();
    });

    return {
      title,
      body,
      tags,
      tag,
      post,
      error,
      handleSubmit,
      handleKeydown,
      textareaRef,
      autoResize,
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
