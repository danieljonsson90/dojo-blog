<template>
  <div data-testid="home" class="home">
    <h1>Mitt utbyte i Vietnam</h1>
    <p>Välkommna till min blogg!</p>
    <p>Här kan ni läsa om min resa och upplevelse av mitt utbyte i Vietnam</p>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {},
  setup() {},
};
</script>

<style>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
  text-align: center;
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
}
</style>
