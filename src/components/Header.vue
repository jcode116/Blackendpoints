<template>
  <header>
    <nav>
      <!-- Home Link -->
      <router-link to="/" class="nav-link">Home</router-link>

      <!-- Categories Dropdown -->
      <div class="dropdown">
        <button class="dropdown-button">Categories</button>
        <ul class="dropdown-menu">
          <li v-for="category in predefinedCategories" :key="category">
            <router-link :to="`/category/${category}`">{{ category }}</router-link>
          </li>
        </ul>
      </div>

      <!-- Add Business Link -->
      <router-link to="/addbiz" class="nav-link">Add Business</router-link>
      <router-link to="/blog" class="nav-link">Blog</router-link>
      <router-link to="/login" class="nav-link">Login</router-link>
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
/* Reset Default Margins and Padding */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* Include padding and border in element size */
}

/* General Navbar Styles */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #333;
  z-index: 1000;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  align-items: center; /* Align items vertically in the center */
  width: 100%;
  height: 100%; /* Ensure nav takes full height of the header */
  padding: 0 20px; /* Horizontal padding for spacing */
  justify-content: space-between; /* Ensure left and right sections are separated */
}

.nav-link:last-of-type {
  margin-left: auto; /* Push the last nav-link (Login) to the far right */
}

/* Home and Add Business Links */
.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 0 10px; /* Horizontal padding for spacing */
}

.nav-link:hover {
  text-decoration: underline;
}

/* Categories Dropdown */
.dropdown {
  position: relative;
  margin-top: 0;
}

.dropdown-button {
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%; /* Position directly below the button */
  left: 0;
  background-color: #444;
  border-radius: 4px;
  list-style: none;
  padding: 10px 0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.dropdown-menu li {
  padding: 10px 20px;
}

.dropdown-menu li a {
  color: #fff;
  text-decoration: none;
}

.dropdown-menu li:hover {
  background-color: #555;
}

.dropdown:hover .dropdown-menu {
  display: block; /* Show the dropdown on hover */
}
</style>
