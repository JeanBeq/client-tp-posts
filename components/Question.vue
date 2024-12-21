<template>
  <NuxtLink :to="`/post/${post.id}`" class="block p-4 bg-white shadow-md rounded-lg mb-4 hover:bg-gray-100">
    <h2 class="text-xl font-bold text-gray-800">{{ post.title }}</h2>
    <p class="text-gray-600">Author: {{ post.author }}</p>
    <p class="text-blue-500 hover:underline">
      <a :href="post.url" target="_blank" @click.stop>{{ post.url }}</a>
    </p>
    <button @click.prevent="$emit('delete', post.id)" class="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
    }
  }
};
</script>