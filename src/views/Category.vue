<template>
    <div>
      <h1>Category: {{ category }}</h1>
      <div class="search-container">
        <input v-model="searchQuery" type="text" placeholder="Search..." />
      </div>
      <div v-if="filteredBusinesses.length > 0" class="cards-container">
        <div v-for="biz in filteredBusinesses" :key="biz.id" class="business-card">
          <!-- Title as a clickable link -->
          <router-link :to="`/details/${biz.id}`" class="business-title">
            <h2>{{ biz.name }}</h2>
          </router-link>
          <!-- Image -->
          <img
            v-if="biz.image"
            :src="biz.image"
            alt="Business Image"
            class="business-image"
          />
          <!-- Description -->
          <p>{{ biz.about }}</p>
          <!-- Phone -->
          <p>
            <i class="fas fa-phone"></i> {{ biz.phone }}
          </p>
          <!-- Website Link -->
          <a
            :href="biz.website"
            target="_blank"
            rel="noopener noreferrer"
            class="website-link"
          >
            Visit Website
          </a>
        </div>
      </div>
      <div v-else>
        <p>No businesses found matching your search.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch, watchEffect } from "vue";
  import { fetchBusinessesByCategory } from "../api/firestore";
  
  export default {
    props: ["category"],
    setup(props) {
      const businesses = ref([]);
      const filteredBusinesses = ref([]);
      const searchQuery = ref("");
  
      // Function to fetch data based on category
      const fetchData = async () => {
        try {
          businesses.value = await fetchBusinessesByCategory(props.category);
          filteredBusinesses.value = businesses.value; // Reset the filtered list
        } catch (err) {
          console.error("Failed to fetch businesses:", err);
        }
      };
  
      // Watch for changes in the category prop
      watch(() => props.category, () => {
        fetchData(); // Re-fetch data whenever the category changes
      });
  
      // Filter businesses when the search query changes
      const filterBusinesses = () => {
        filteredBusinesses.value = businesses.value.filter((biz) =>
          biz.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      };
  
      watch(searchQuery, filterBusinesses);
  
      // Fetch data initially when the component mounts
      onMounted(fetchData);
  
      return {
        businesses,
        filteredBusinesses,
        searchQuery,
      };
    },
  };
  </script>
  
  <style>
  /* Cards container */
  .cards-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  
  /* Individual card styling */
  .business-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: #222;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .business-card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  }
  
  /* Title link */
  .business-title h2 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 10px;
    text-align: center;
  }
  
  .business-title {
    text-decoration: none;
  }
  
  .business-title:hover h2 {
    text-decoration: underline;
  }
  
  /* Image styling */
  .business-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
  }
  
  /* Description and links */
  .business-card p {
    color: #ddd;
    margin: 5px 0;
    text-align: center;
  }
  
  .business-card .website-link {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }
  
  .business-card .website-link:hover {
    text-decoration: underline;
  }
  </style>
  