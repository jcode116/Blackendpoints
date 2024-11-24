<template>
    <div>
      <input
        type="text"
        v-model="searchQuery"
        :placeholder="placeholder"
        @input="onSearch"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: "Search...",
      },
    },
    emits: ["search"],
    data() {
      return {
        searchQuery: "",
      };
    },
    methods: {
      onSearch() {
        this.$emit("search", this.searchQuery);
      },
    },
  };
  </script>
  
  <style>
  input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  