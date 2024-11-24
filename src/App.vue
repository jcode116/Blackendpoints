<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: { Header },
};
</script>


<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
main {
  margin-top: 60px; /* Adjust based on the height of your navbar */
}
ul {
  padding: 0;
  list-style-type: none;
}
</style>
