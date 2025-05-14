<template>
  <header>
    <h1>Vietnam</h1>
    <nav>
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'Create' }">Create Post</router-link>
      <router-link :to="{ name: 'Gallery' }">Gallery</router-link>
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
  color: white;
  padding: 5px;
  font-size: 20px;
}

nav a.router-link-active {
  border-bottom: 3px solid #ff8800;
  font-weight: bold;
}

header {
  /* position: sticky;
  top: 0; */
  background-color: #222; /* valfritt, men ofta behövs för att täcka bakomliggande */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 15rem;
}

header h1 {
  color: white;
  font-size: 48px;
}
</style>
