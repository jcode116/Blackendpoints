<template>
  <div class="blog-post">
    <div v-html="content"></div>
  </div>
</template>

<script>
import { marked } from "marked";

export default {
  data() {
    return {
      content: "ffff",
    };
  },
  async created() {
    const slug = this.$route.params.slug;
    const response = await fetch(`/src/blog/${slug}.md`); // Fetch Markdown file
    const text = await response.text();
    this.content = marked(text); // Convert Markdown to HTML
  },
};
</script>
