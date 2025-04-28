<template>
  <div class="max-w-2xl mx-auto p-4">
    <h2 class="text-xl font-bold mb-4">Admin Panel</h2>
    <div v-if="!isAuthenticated">
      <LoginForm @login-success="onLoginSuccess" />
    </div>
    <div v-else>
      <button
        @click="handleLogout"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4"
      >
        Logout
      </button>
      <div v-for="comment in adminComments" :key="comment.id" class="border-b py-2">
        <p><strong>{{ comment.name }}</strong>: {{ comment.message }}</p>
        <p class="text-sm text-gray-500">{{ formatDate(comment.created_at) }}</p>
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
  import { ref, onMounted } from 'vue';
  import LoginForm  from './LoginForm.vue';
  import { formatDate } from '@/utils/date';
  import { getToken, logout, handleAuthError } from '@/services/auth';
  import {
    fetchComments,
    markCommentAsSpam,
    deleteComment as deleteCommentService,
  } from '@/services/comments';

  const isAuthenticated = ref(false);
  const loginError = ref('');
  const adminComments = ref([]);


  onMounted(async () => {
    if (getToken()) {
      isAuthenticated.value = true;
      await fetchAdminComments();
    }
  });

  const onLoginSuccess = async () => {
    isAuthenticated.value = true;
    loginError.value = '';
    await fetchAdminComments();
  };

  async function fetchAdminComments() {
    try {
      adminComments.value = await fetchComments();
    } catch (err) {
      loginError.value = handleAuthError(err, handleLogout);
    }
  }

  const handleLogout = async () => {
    await logout();
    isAuthenticated.value = false;
    adminComments.value = [];
  };

  const markSpam = async (id) => {
    try {
      const updatedComment = await markCommentAsSpam(id);
      adminComments.value = adminComments.value.map((c) =>
        c.id === id ? updatedComment : c
      );
    } catch (err) {
      loginError.value = handleAuthError(err, handleLogout);
    }
  };

  const deleteComment = async (id) => {
    try {
      await deleteCommentService(id);
      adminComments.value = adminComments.value.filter((c) => c.id !== id);
    } catch (err) {
      loginError.value = handleAuthError(err, handleLogout);
    }
  };
</script>