<template>
    <nav class="bg-orange-500 p-4 flex justify-between items-left">
      <div class="space-x-2">
        <button @click="$emit('fetchPosts', 'new')" class="text-white px-4 py-2 rounded hover:text-gray-200">New</button>
        <button @click="$emit('fetchPosts', 'old')" class="text-white px-4 py-2 rounded hover:text-gray-200">Old</button>
      </div>
    </nav>
  </template>