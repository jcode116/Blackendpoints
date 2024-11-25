
<template>
  <div class="blog">
    <h1>Blog</h1>
    <div class="blog-grid">
      <div v-for="post in posts" :key="post.slug" class="blog-card">
        <router-link :to="`/blog/${post.slug}`">
          <img :src="`/blogimg/${post.image}`" :alt="post.title" class="blog-image" />
          <h2 class="blog-title">{{ post.title }}</h2>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const posts = ref([]);

    onMounted(async () => {
      const modules = import.meta.glob('../blog/*.md');
      for (const path in modules) {
        const module = await modules[path]();
        const slug = path.split('/').pop().replace('.md', '');
        const { title, image } = module.attributes;
        posts.value.push({ title, slug, image });
      }
    });

    return { posts };
  },
};
</script>

<style>
.blog {
  padding: 20px;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.blog-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.blog-card:hover {
  transform: scale(1.05);
}

.blog-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.blog-title {
  padding: 10px;
  font-size: 18px;
  color: #333;
  text-align: center;
}
</style>
