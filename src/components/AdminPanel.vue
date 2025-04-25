<template>
  <div class="max-w-2xl mx-auto p-4">
    <h2 class="text-xl font-bold mb-4">Admin Panel</h2>
    <div v-if="!isAuthenticated">
      <LoginForm @login-success="onLoginSuccess" />
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
  import LoginForm from './LoginForm.vue';

  const isAuthenticated = ref(false);
  const loginError = ref('');
  const adminComments = ref([]);

  const API_URL = process.env.VUE_APP_API_URL;

  const getToken = () => localStorage.getItem('jwt_token');

  const setAuthHeader = () => {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  if (getToken()) {
    isAuthenticated.value = true;
    setAuthHeader();
    fetchComments();
  }

  const onLoginSuccess = async () => {
    setAuthHeader();
    isAuthenticated.value = true;
    loginError.value = '';
    await fetchComments();
  };

  async function fetchComments() {
    try {
      const response = await axios.get(`${API_URL}/comments`);
      adminComments.value = response.data;
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        loginError.value = 'Session expired. Please log in again.';
      } else {
        console.error('Failed to fetch comments:', err);
      }
    }
  }

  const logout = async () => {
    try {
      await axios.delete(`${API_URL}/admin/logout`);
    } catch (err) {
      console.error('Failed to logout:', err);
    } finally {
      localStorage.removeItem('jwt_token');
      setAuthHeader();
      isAuthenticated.value = false;
      adminComments.value = [];
    }
  };

  const markSpam = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/comments/${id}/mark_spam`);
      adminComments.value = adminComments.value.map((c) =>
        c.id === id ? response.data : c
      );
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        loginError.value = 'Session expired. Please log in again.';
      } else {
        console.error('Failed to mark as spam:', err);
      }
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`${API_URL}/comments/${id}`);
      adminComments.value = adminComments.value.filter((c) => c.id !== id);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        loginError.value = 'Session expired. Please log in again.';
      } else {
        console.error('Failed to delete comment:', err);
      }
    }
  };
</script>