<template>
  <div class="max-w-2xl mx-auto p-4">
    <h2 class="text-xl font-bold mb-4">Guestbook Comments</h2>
    <div v-for="comment in comments" :key="comment.id" class="border-b py-2">
      <p><strong>{{ comment.name }}</strong>: {{ comment.message }}</p>
      <p class="text-sm text-gray-500">{{ formatDate(comment.created_at) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { API_CONFIG } from '@/config/api';
import { formatDate } from '@/utils/date';
import { setupWebSocket } from '@/services/websocket';
import { fetchComments } from '@/services/comments';

const comments = ref([]);
const wsConnection = ref(null);

const handleNewComment = (comment) => {
  comments.value.unshift(comment);
  if (comments.value.length > API_CONFIG.MAX_COMMENTS) {
    comments.value.pop();
  }
};

onMounted(async () => {
  try {
    comments.value = await fetchComments();
    wsConnection.value = setupWebSocket(handleNewComment);
  } catch (err) {
    console.error('Failed to initialize comments:', err);
  }
});

onUnmounted(() => {
  if (wsConnection.value) wsConnection.value.close();
});
</script>