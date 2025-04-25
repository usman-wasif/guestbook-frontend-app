<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-blue-500 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-white text-2xl font-bold">Real-Time Guestbook</h1>
        <div class="gap-2">
          <router-link to="/" class="text-white mx-4 hover:underline">Home</router-link>
          <router-link to="/admin" class="text-white mx-4 hover:underline">Admin</router-link>
        </div>
      </div>
    </nav>
    <div class="container mx-auto p-4">
      <router-view name="commentForm"></router-view>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
</script>