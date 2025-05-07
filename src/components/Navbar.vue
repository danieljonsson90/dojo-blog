<template>
  <header>
    <h1>Daniels Vietnam Blogg</h1>
    <nav>
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'Create' }">Create Post</router-link>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style>
nav a {
  display: inline-block;
  text-decoration: none;
  margin: 20px;
  color: #bbb;
  padding: 5px;
  font-size: 20px;
}

nav a.router-link-active {
  border-bottom: 3px solid #ff8800;
  font-weight: bold;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}

header h1 {
  color: #dfdfdf;
  font-size: 48px;
}
</style>
