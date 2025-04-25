<template>
  <div class="max-w-2xl mx-auto p-4">
    <h2 class="text-xl font-bold mb-4">Admin Panel</h2>
    <div v-if="!isAuthenticated">
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium">Username</label>
          <input
            v-model="loginForm.username"
            id="username"
            type="text"
            required
            class="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium">Password</label>
          <input
            v-model="loginForm.password"
            id="password"
            type="password"
            required
            class="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Login
        </button>
        <p v-if="loginError" class="text-red-500">{{ loginError }}</p>
      </form>
    </div>
    <div v-else>
      <button
        @click="logout"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4"
      >
        Logout
      </button>
      <div v-for="comment in adminComments" :key="comment.id" class="border-b py-2">
        <p><strong>{{ comment.name }}</strong>: {{ comment.message }}</p>
        <p class="text-sm text-gray-500">{{ new Date(comment.created_at).toLocaleString() }}</p>
        <p v-if="comment.is_spam" class="text-red-500">Marked as Spam</p>
        <button
          v-if="!comment.is_spam"
          @click="markSpam(comment.id)"
          class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
        >
          Mark as Spam
        </button>
        <button
          @click="deleteComment(comment.id)"
          class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const isAuthenticated = ref(false);
const loginForm = ref({ username: '', password: '' });
const loginError = ref('');
const adminComments = ref([]);

const login = async () => {
  try {
    const response = await axios.get('http://localhost:3000/admin_panel/comments', {
      auth: {
        username: loginForm.value.username,
        password: loginForm.value.password,
      },
    });
    adminComments.value = response.data;
    isAuthenticated.value = true;
    loginError.value = '';
    axios.defaults.auth = {
      username: loginForm.value.username,
      password: loginForm.value.password,
    };
  } catch (err) {
    loginError.value = 'Invalid credentials';
  }
};

const logout = () => {
  isAuthenticated.value = false;
  adminComments.value = [];
  delete axios.defaults.auth;
};

const markSpam = async (id) => {
  try {
    const response = await axios.patch(`http://localhost:3000/admin_panel/comments/${id}/mark_spam`);
    adminComments.value = adminComments.value.map((c) =>
      c.id === id ? response.data : c
    );
  } catch (err) {
    console.error('Failed to mark as spam');
  }
};

const deleteComment = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/admin_panel/comments/${id}`);
    adminComments.value = adminComments.value.filter((c) => c.id !== id);
  } catch (err) {
    console.error('Failed to delete comment');
  }
};
</script>