<template>
  <div class="max-w-md mx-auto p-4">
    <form @submit.prevent="submitComment" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium">Name</label>
        <input
          v-model="form.name"
          id="name"
          type="text"
          required
          class="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label for="message" class="block text-sm font-medium">Message</label>
        <textarea
          v-model="form.message"
          id="message"
          required
          class="w-full p-2 border rounded"
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
      <p v-if="error" class="text-red-500">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const form = ref({ name: '', message: '' });
const error = ref('');

const submitComment = async () => {
  try {
    await axios.post('http://localhost:3000/comments', {
      comment: form.value,
    });
    form.value = { name: '', message: '' };
    error.value = '';
  } catch (err) {
    error.value = 'Failed to submit comment';
  }
};
</script>