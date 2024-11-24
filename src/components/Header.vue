<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link
        v-for="category in predefinedCategories"
        :key="category"
        :to="`/category/${category}`"
      >
        {{ category }}
      </router-link>
      <router-link to="/category/Other">Other</router-link>
      <router-link to="/addbiz">Add Business</router-link>
    </nav>
  </header>
</template>

<script>
import { predefinedCategories } from "../../categories";

export default {
  data() {
    return {
      predefinedCategories,
    };
  },
};
</script>

<style>
header {
  position: fixed; /* Ensures the navbar stays at the top */
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  background-color: #333; /* Dark background */
  color: #fff;
  padding: 10px 20px; /* Padding for spacing */
  z-index: 1000; /* Ensure it stays above other content */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

nav {
  display: flex;
  justify-content: center; /* Center the links */
  gap: 20px; /* Add spacing between links */
}

a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline; /* Add underline on hover */
}
</style>
