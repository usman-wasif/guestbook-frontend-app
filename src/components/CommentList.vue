<template>
  <div class="max-w-2xl mx-auto p-4">
    <h2 class="text-xl font-bold mb-4">Guestbook Comments</h2>
    <div v-for="comment in comments" :key="comment.id" class="border-b py-2">
      <p><strong>{{ comment.name }}</strong>: {{ comment.message }}</p>
      <p class="text-sm text-gray-500">{{ new Date(comment.created_at).toLocaleString() }}</p>
    </div>
  </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import axios from 'axios';

    const comments = ref([]);
    const ws = ref(null);

    const fetchComments = async () => {
      const response = await axios.get('http://localhost:3000/comments');
      console.log('response', response)
      comments.value = response.data.slice(0, 50);
    };

    onMounted(() => {
      fetchComments();

      // Connect to WebSocket
      ws.value = new WebSocket('ws://localhost:3000/cable');
      ws.value.onopen = () => {
        ws.value.send(
          JSON.stringify({
            command: 'subscribe',
            identifier: JSON.stringify({ channel: 'CommentsChannel' }),
          })
        );
      };

      ws.value.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'ping') return;
        if (data.message) {
          comments.value.unshift(data.message);
          if (comments.value.length > 50) {
              comments.value.pop();
          }
        }
      };
    });

    onUnmounted(() => {
      if (ws.value) ws.value.close();
    });
</script>