<template>
  <div class="edit-post">
    <form @submit.prevent="handleSubmit" v-if="post">
      <BaseInput
        v-model="title"
        :required="true"
        placeholder="Post title"
        label="Title:"
        name="title"
      />
      <BaseInput
        v-model="thumbnail"
        placeholder="Enter image src"
        label="Thumbnail source:"
        name="thumbnail"
      />
      <BaseInput
        v-model="quote"
        placeholder="Enter a quote"
        label="Quote"
        name="quote"
      />
      <BaseInput v-model="quoteOrigin" label="Quote origin:" name="origin" />
      <BaseInput
        v-model="body"
        placeholder="Enter text"
        label="Content:"
        name="content"
        type="textarea"
      />
      <BaseInput
        v-model="tag"
        placeholder="Enter tags"
        label="Tags: (hit enter to add tag)"
        name="tag"
        @keydown.enter.prevent="handleKeydown"
      />
      <div>
        <div v-for="tag in tags" :key="tag" class="pill">
          #{{ tag }}
          <button class="close-button" @click="removeTag(tag)">
            <span class="material-icons">close</span>
          </button>
        </div>
      </div>
      <BaseButton :label="'Uppdatera inlägg'" />
    </form>
    <div v-else>
      <Spinner v-if="!error" />
    </div>
    <div class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import Spinner from '../components/AppSpinner.vue';
import { useRoute, useRouter } from 'vue-router';
import getPost from '../composables/getPost';
import { ref, onMounted } from 'vue';
import app from '../firebase/config';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
export default {
  components: { Spinner, BaseButton, BaseInput },

  setup() {
    const title = ref('');
    const thumbnail = ref('');
    const quote = ref('');
    const quoteOrigin = ref('');
    const body = ref('');
    const tag = ref('');
    const tags = ref([]);

    const route = useRoute();
    const router = useRouter();
    const { post, error, load } = getPost(route.params.id);

    const handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.trim();
        if (tag.value !== '') {
          tags.value.push(tag.value);
        }
      }
      tag.value = '';
    };
    const handleSubmit = async () => {
      const updatedPost = {
        title: title.value,
        body: body.value,
        tags: tags.value,
        quote: quote.value,
        quoteOrigin: quoteOrigin.value,
        thumbnail: thumbnail.value,
      };
      try {
        const db = getFirestore(app);
        const docRef = doc(db, 'posts', post.value.id);
        await updateDoc(docRef, updatedPost);
        router.push('/posts');
      } catch (err) {
        error.value = err.message;
      }
    };

    const removeTag = (tag) => {
      tags.value = tags.value.filter((t) => {
        return t !== tag;
      });
    };

    onMounted(async () => {
      try {
        await load();
        title.value = post.value.title;
        body.value = post.value.body;
        tags.value = post.value.tags;
        quote.value = post.value.quote;
        quoteOrigin.value = post.value.quoteOrigin;
        thumbnail.value = post.value.thumbnail ?? '';
      } catch (err) {
        console.error(err);
      }
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
      thumbnail,
      quote,
      quoteOrigin,
      removeTag,
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.pill {
  display: inline-block;
}
form {
  text-align: left;
  margin: 0 15px;
}

.edit-post {
  max-width: 500px;
  margin: 0 auto;
}

.close-button {
  border: none;
  background: none;
}

.close-button .material-icons {
  font-size: unset;
}
.pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  color: #444;
  background: #ddd;
  padding: 8px;
  border-radius: 20px;
  font-size: 14px;
}
</style>
