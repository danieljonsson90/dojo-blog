<template>
  <div data-testid="home" class="home">
    <div class="home-gallery-container">
      <div class="home-gallery">
        <div v-for="index in indexList" :key="index" class="thumbnail">
          <img :src="imageUrls[index]" alt="uploaded image" />
        </div>
      </div>
    </div>
    <h1>På utbyte i Hanoi</h1>
    <p>Välkommna till min blogg!</p>
    <p>
      Här kan ni läsa korta inlägg och uppdateringar om vad jag upplever i
      Vietnam från dag till dag.
    </p>
    <p>
      OBS: Varning för känsliga, stavfell och sär skrivning kan förekomma i
      blogginlägg.
    </p>
    <p></p>
  </div>
</template>

<script>
import { loadImages } from '../composables/loadImages';
export default {
  name: 'HomeView',
  components: {},
  setup() {
    const imageUrls = loadImages();
    const indexList = [0, 13, 7, 8];
    return { imageUrls, indexList };
  },
};
</script>

<style>
.home-gallery-container {
}

.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
  text-align: center;
}
.home-gallery {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 750px;
  margin: 0 auto;
}

.home-gallery .thumbnail img {
  margin: 1rem 2rem;
  width: 300px;
  height: 300px;
}
.layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .layout {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap-reverse;
    align-items: center;
    justify-content: center;
  }

  .home-gallery .thumbnail img {
    margin: 0.5rem 0.5rem;
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 450px) {
  .home-gallery .thumbnail img {
    margin: 0.3rem 0.3rem;
    width: 150px;
    height: 150px;
  }
}
</style>
