<template>
  <div class="create">
    <form @submit.prevent="handleSubmit">
      <label>Title:</label>
      <input type="text" required v-model="title" />
      <label>Content:</label>
      <textarea required v-model="body"></textarea>
      <label>Tags: (hit enter to add tag)</label>
      <input type="text" v-model="tag" @keydown.enter.prevent="handleKeydown" />
      <div v-for="tag in tags" :key="tag" class="pill">#{{ tag }}</div>
      <button>Add Post</button>
    </form>
    <div class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import addPost from '../composables/addPost';
import { useRouter } from 'vue-router';
import getPost from '../composables/getPost';
export default {
  setup() {
    const title = ref('');
    const body = ref('');
    const tag = ref('');
    const tags = ref([]);
    const handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\ s/, '');
        tags.value.push(tag.value);
      }
      tag.value = '';
    };
    const router = useRouter();
    const handleSubmit = async () => {
      const post = {
        title: title.value,
        body: body.value,
        tags: tags.value,
      };
      try {
        add(post);
        router.push('/');
      } catch (err) {
        error.value = err.message;
      }
    };
    const { error, add } = addPost();
    return { title, body, tag, handleKeydown, tags, handleSubmit, error };
  },
};
</script>

<style>
form {
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
}

input,
textarea {
  display: block;
  width: 100%;
  margin: 10px auto;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #eee;
}

textarea:focus {
  border: 1px solid #444;
}

label {
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
}

label::before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ff8800;
  z-index: -1;
  padding-right: 40px;
  left: -20px;
  transform: rotate(-1.5deg);
}

textarea {
  height: 150px;
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

button {
  color: white;
  background: #ff8800;
  border-radius: 5px;
  border: solid 1px #eee;
  padding: 5px 10px;
  margin-top: 20px;
  display: block;
  cursor: pointer;
}
</style>
