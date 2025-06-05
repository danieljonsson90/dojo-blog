<template>
  <div class="create">
    <form @submit.prevent="handleSubmit">
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
        ref="textareaRef"
      />
      <BaseInput
        v-model="tag"
        placeholder="Enter tags"
        label="Tags: (hit enter to add tag)"
        name="tag"
        @keydown.enter.prevent="handleKeydown"
      />
      <div>
        <div v-for="tag in tags" :key="tag" class="pill">#{{ tag }}</div>
      </div>
      <BaseButton :label="'Skapa inlägg'" />
    </form>
    <div class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from 'vue';
import addPost from '../composables/addPost';
import { useRouter } from 'vue-router';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';

export default {
  components: { BaseButton, BaseInput },
  setup() {
    const title = ref('');
    const thumbnail = ref('');
    const quote = ref('');
    const quoteOrigin = ref('');
    const body = ref('');
    const tag = ref('');
    const tags = ref([]);
    const router = useRouter();
    const textareaRef = ref(null);

    const handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/ s/, '');
        tags.value.push(tag.value);
      }
      tag.value = '';
    };

    const autoResize = () => {
      const el = textareaRef.value;

      if (el) {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 5 + 'px';
      }
    };

    const handleSubmit = async () => {
      const post = {
        title: title.value,
        thumbnail: thumbnail.value,
        body: body.value,
        tags: tags.value,
        quote: quote.value,
        quoteOrigin: quoteOrigin.value,
      };
      try {
        add(post);
        router.push('/posts');
      } catch (err) {
        error.value = err.message;
      }
    };
    const { error, add } = addPost();
    watch(body, async () => {
      await nextTick();
      autoResize();
    });

    return {
      title,
      body,
      tag,
      handleKeydown,
      tags,
      handleSubmit,
      autoResize,
      error,
      quoteOrigin,
      quote,
      thumbnail,
      textareaRef,
    };
  },
};
</script>

<style>
form {
  text-align: left;
  margin: 0 15px;
}

.create {
  max-width: 500px;
  margin: 0 auto;
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
