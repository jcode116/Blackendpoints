<template>
  <div class="add-business-container">
    <h1>Add a New Business</h1>
    <form @submit.prevent="handleSubmit" class="form-container">
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div class="form-row">
        <div class="form-group">
          <label for="name">Name:</label>
          <input v-model="formData.name" id="name" type="text" placeholder="Enter business name" required />
        </div>
        <div class="form-group">
          <label for="about">About:</label>
          <textarea
            v-model="formData.about"
            id="about"
            placeholder="Business description"
            rows="2"
            required
          ></textarea>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="address">Address:</label>
          <input
            v-model="formData.address"
            id="address"
            type="text"
            placeholder="Business address"
            required
          />
        </div>
        <div class="form-group">
          <label for="category">Category:</label>
          <select v-model="formData.category" id="category" required>
            <option value="" disabled>Select a category</option>
            <option v-for="category in predefinedCategories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="phone">Phone:</label>
          <input
            v-model="formData.phone"
            id="phone"
            type="text"
            placeholder="Business phone number"
            required
          />
        </div>
        <div class="form-group">
          <label for="website">Website:</label>
          <input
            v-model="formData.website"
            id="website"
            type="url"
            placeholder="Business website URL"
            required
          />
        </div>
      </div>
      <div class="form-actions">
        <button type="submit" class="submit-button">Add Business</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export default {
  setup() {
    const router = useRouter();
    const formData = ref({
      name: "",
      about: "",
      address: "",
      category: "",
      phone: "",
      website: "",
      image: "https://via.placeholder.com/400x300", // Default image URL
    });

    const errorMessage = ref("");
    const predefinedCategories = ["Food", "Tech", "Clothing", "Entertainment", "Other"];

    const handleSubmit = async () => {
      errorMessage.value = ""; // Clear any previous error message
      try {
        // Basic validation
        if (
          !formData.value.name ||
          !formData.value.about ||
          !formData.value.address ||
          !formData.value.category ||
          !formData.value.phone ||
          !formData.value.website
        ) {
          errorMessage.value = "Please fill out all fields before submitting.";
          return;
        }

        // Add the business to Firestore
        await addDoc(collection(db, "businesses"), formData.value);

        // Redirect to the home page on success
        router.push("/");
      } catch (error) {
        console.error("Error adding business:", error);
        errorMessage.value = "Failed to add business. Please try again later.";
      }
    };

    return {
      formData,
      predefinedCategories,
      handleSubmit,
      errorMessage,
    };
  },
};
</script>

<style>
.add-business-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  color: #fff;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}

h1 {
  text-align: center;
  color: #000;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #000;
}

input,
textarea,
select {
  padding: 10px;

  border-radius: 5px;
  background-color: #fff;
  color: #000;
  font-size: 1rem;
  outline: none;
}

textarea {
  resize: none;
}

input::placeholder,
textarea::placeholder {
  color: #aaa;
}

input:focus,
textarea:focus,
select:focus {
  border: 2px solid #000;
}

.submit-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 5px;
  background-color: #adadad;
  color: #000;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}

.form-actions {
  text-align: center;
  margin-top: 20px;
}

.error-message {
  color: red;
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
