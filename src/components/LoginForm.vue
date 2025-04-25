<template>
  <form @submit.prevent="handleLogin" class="space-y-4">
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
</template>

<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { defineEmits } from 'vue';

  const emit = defineEmits(['login-success']);

  const API_URL = process.env.VUE_APP_API_URL;

  const loginForm = ref({ username: '', password: '' });
  const loginError = ref('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: loginForm.value.username,
        password: loginForm.value.password,
      });
      const token = response.data.token;
      localStorage.setItem('jwt_token', token);

      loginError.value = '';
      emit('login-success');
    } catch (err) {
      if (err.response?.status === 401) {
        loginError.value = err.response.data.error || 'Invalid credentials';
      } else {
        loginError.value = 'An error occurred during login';
      }
    }
  };
</script>