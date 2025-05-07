<template>
  <div class="post">
    <router-link :to="{ name: 'Details', params: { id: post.id } }">
      <h3>{{ post.title }}</h3>
    </router-link>
    <div class="post-content">
      <p>{{ snippet }}</p>
      <div class="actions">
        <router-link :to="{ name: 'Edit', params: { id: post.id } }">
          <span class="material-icons">edit</span>
        </router-link>
        <!-- <button @click="handleClick">Delete Post</button> -->
        <span @click="showModal = true" class="material-icons">delete</span>
      </div>
    </div>
    <div>
      <span v-for="tag in post.tags" :key="tag"> #{{ tag }} </span>
    </div>
  </div>
  <Modal :show="showModal" @close="showModal = false" @remove="handleDelete">
    <h2>Ta bort inlägg</h2>
    <p>
      Är du säker på att du vill ta bort inlägget. När inlägget är borttaget går
      det inte att ångra.
    </p>
  </Modal>
</template>

<script>
import { computed } from 'vue';
import removePost from '../composables/removePost';
import Modal from '@/components/Modal.vue';
import { ref } from 'vue';
export default {
  props: ['post'],
  emits: ['delete'],
  components: { Modal },
  setup(props, { emit }) {
    const snippet = computed(() => {
      return props.post.body.substring(0, 100) + '....';
    });
    const showModal = ref(false);
    const { errorRemove, remove } = removePost();
    const handleDelete = () => {
      remove(props.post.id);
      emit('delete', props.post.id);
      showModal.value = false;
    };
    return { snippet, handleDelete, showModal };
  },
};
</script>

<style>
.post {
  margin: 0 40px 30px;
  padding-bottom: 30px;
  border-bottom: 1px dashed #e7e7e7;
  position: relative;
}
.post h3 {
  display: inline-block;
  position: relative;
  font-size: 26px;
  color: black;
  margin-bottom: 10px;
  max-width: 400px;
}

.post h3::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background: #ff8800;
  position: absolute;
  z-index: -1;
  padding-right: 40px;
  left: -20px;
  transform: rotate(-1deg);
}

.post button {
  /* position: absolute;
  left: 80%;
  bottom: 3%; */
}

.post-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-content .actions {
  display: block;
  min-width: 6rem;
  text-align: right;
}

.material-icons {
  display: inline-block;
  margin-left: 15px;
  cursor: pointer;
  font-size: 24px;
  color: #bbb;
}
</style>
