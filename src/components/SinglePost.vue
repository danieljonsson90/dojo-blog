<template>
  <div class="post">
    <router-link :to="{ name: 'Details', params: { id: post.id } }">
      <h3>{{ post.title }}</h3>
    </router-link>
    <div class="post-header">
      <div class="thumbnail" v-if="post.thumbnail">
        <img :src="post.thumbnail" alt="uploaded image" />
      </div>
      <blockquote
        class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"
        v-if="post.quote"
      >
        <p>"{{ post.quote }}"</p>
        <cite v-if="post.quoteOrigin">— {{ post.quoteOrigin }}</cite>
      </blockquote>
    </div>

    <div class="post-content">
      <p>
        {{ snippet }}
        <router-link :to="{ name: 'Details', params: { id: post.id } }">
          Läs mer
        </router-link>
      </p>
      <div class="actions">
        <router-link :to="{ name: 'Edit', params: { id: post.id } }">
          <span class="material-icons edit">edit</span>
        </router-link>
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
import Modal from '@/components/RemoveModal.vue';
import { ref } from 'vue';
export default {
  props: ['post'],
  emits: ['delete'],
  components: { Modal },
  setup(props, { emit }) {
    const snippet = computed(() => {
      return props.post.body.substring(0, 300) + '....';
    });

    const showModal = ref(false);
    const { errorRemove, remove } = removePost();
    const handleDelete = async () => {
      const removed = await remove(props.post.id);
      if (removed) {
        emit('delete', props.post.id);
        showModal.value = false;
      }
    };
    return { snippet, handleDelete, showModal };
  },
};
</script>

<style>
.post-header {
  display: flex;
  margin-top: 3rem;
}
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
.post-content a {
  color: #ff8800;
}
.thumbnail img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.post-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.4;
  font-weight: 400;
  font-size: 1.2rem;
}

.post-content .actions {
  display: block;
  min-width: 6rem;
  text-align: right;
}

.post-content .material-icons {
  display: inline-block;
  margin-left: 15px;
  cursor: pointer;
  font-size: 24px;
  color: #bbb;
}

@media (max-width: 768px) {
  .post-header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  blockquote {
    margin: 0 auto;
  }
  .post-content {
    flex-wrap: wrap;
  }

  .post-content .actions {
    margin: 10px 10px 10px 0;
    width: 100%;
    text-align: right;
  }
  .material-icons.edit {
    margin-left: 0;
  }
}
</style>
