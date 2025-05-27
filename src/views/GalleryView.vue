<template>
  <div class="uploader">
    <div data-testid="gallery" class="gallery">
      <button
        v-for="(img, index) in imageUrls"
        :key="index"
        class="thumbnail"
        @click="showImage(img, index)"
        @keydown.enter.space.prevent="showImage(img, index)"
        @keydown.esc="onEscape(index)"
        ref="thumbnailButton"
        :aria-label="`Visa bild ${index + 1}`"
      >
        <img :src="img" :alt="`Galleri bild av Vietnam resa ${index + 1}`" />
      </button>
    </div>
    <SingleImage
      v-if="showSingleImage"
      :src="src"
      :show="showSingleImage"
      :imageUrls="imageUrls"
      :imageIndex="imageIndex"
      @close="showSingleImage = false"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import SingleImage from '../components/SingleImage.vue';
import { loadImages } from '../composables/loadImages';
export default {
  components: { SingleImage },
  setup() {
    const src = ref('');
    const showSingleImage = ref(false);
    const imageIndex = ref(undefined);
    const thumbnailButton = ref(null);

    const showImage = (img, index) => {
      showSingleImage.value = true;
      src.value = img;
      imageIndex.value = index;
    };
    const onEscape = (index) => {
      if (document.activeElement === thumbnailButton.value[index]) {
        thumbnailButton.value[index].blur();
      }
    };
    const imageUrls = loadImages();

    return {
      imageUrls,
      showSingleImage,
      showImage,
      src,
      imageIndex,
      onEscape,
      thumbnailButton,
    };
  },
};
</script>

<style scoped>
.uploader {
  margin: 20px;
}
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}
.thumbnail {
  background: white;
  border: none;
  border-radius: none;
}

.thumbnail:focus-visible {
  outline: #ff8800 solid 3px;
  outline-offset: 3px;
}
.thumbnail img {
  width: 350px;
  height: 350px;
  object-fit: contain;
  border-radius: none;
  cursor: pointer;
}

.gallery {
  margin: 0 auto;
  max-width: 1200px;
}
@media (max-width: 1170px) {
  .thumbnail img {
    width: 300px;
    height: 300px;
  }
}
@media (max-width: 970px) {
  .thumbnail img {
    width: 250px;
    height: 250px;
  }
}
@media (max-width: 830px) {
  .thumbnail img {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 680px) {
  .thumbnail img {
    width: 175px;
    height: 175px;
  }
}

@media (max-width: 585px) {
  .thumbnail img {
    width: 150px;
    height: 150px;
  }
}
</style>
