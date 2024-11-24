<template>
  <div class="details-container">
    <h1>Business Details</h1>
    <div v-if="business" class="business-details">
      <!-- Title -->
      <h2>{{ business.name }}</h2>
      <!-- Image -->
      <img
        v-if="business.image"
        :src="business.image"
        alt="Business Image"
        class="business-image"
      />
      <!-- Description -->
      <p>{{ business.about }}</p>
      <!-- Address -->
      <p><strong>Address:</strong> {{ business.address }}</p>
      <!-- Phone -->
      <p><strong>Phone:</strong> {{ business.phone }}</p>
      <!-- Website Link -->
      <a
        v-if="business.website"
        :href="business.website"
        target="_blank"
        rel="noopener noreferrer"
        class="website-link"
      >
        Visit Website
      </a>
    </div>
    <div v-else>
      <p>Business not found or an error occurred.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { fetchBusinessById } from "../api/firestore";

export default {
  props: ["id"],
  setup(props) {
    const business = ref(null);

    const fetchData = async () => {
      try {
        business.value = await fetchBusinessById(props.id);
      } catch (err) {
        console.error("Failed to fetch business details:", err);
      }
    };

    onMounted(fetchData);

    return {
      business,
    };
  },
};
</script>

<style>
/* Container */
.details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: #000;
}

/* Title */
h1 {
  text-align: center;
  color: #000; /* A softer orange for the main title */
  margin-bottom: 20px;
}

h2 {
  text-align: center;
  color: #000; /* White for business title */
  margin-bottom: 10px;
}

/* Business Image */
.business-image {
  display: block;
  max-width: 100%;
  max-height: 300px;
  margin: 10px auto;
  border-radius: 8px;
  object-fit: cover;
}

/* Text Content */
p {
  text-align: center;
  margin: 5px 0;
}

/* Website Link */
.website-link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  display: block;
  margin-top: 10px;
}

.website-link:hover {
  text-decoration: underline;
}
</style>
