<template>
  <div class="uploader">
    <div class="gallery">
      <div v-for="(img, index) in imageUrls" :key="index" class="thumbnail">
        <img :src="img" alt="uploaded image" @click="showImage(img, index)" />
      </div>
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
export default {
  components: { SingleImage },
  setup() {
    const src = ref('');
    const showSingleImage = ref(false);
    const imageIndex = ref(undefined);

    const showImage = (img, index) => {
      showSingleImage.value = true;
      src.value = img;
      imageIndex.value = index;
    };

    const requireImages = require.context(
      '@/assets/images',
      false,
      /\.(png|jpe?g)$/
    );
    const imageUrls = requireImages.keys().map((key) => requireImages(key));

    return { imageUrls, showSingleImage, showImage, src, imageIndex };
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
.thumbnail img {
  width: 350px;
  height: 350px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.gallery {
  margin: 0 auto;
  max-width: 1200px;
}
</style>
