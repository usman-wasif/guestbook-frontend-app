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
        :disabled="isLoading"
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
        :disabled="isLoading"
      />
    </div>
    <button
      type="submit"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
      :disabled="isLoading"
    >
      {{ isLoading ? 'Logging in...' : 'Login' }}
    </button>
    <p v-if="loginError" class="text-red-500">{{ loginError }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { login } from '@/services/auth';

const emit = defineEmits(['login-success']);

const loginForm = ref({ username: '', password: '' });
const loginError = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  if (isLoading.value) return;
  
  try {
    isLoading.value = true;
    loginError.value = '';
    
    await login(loginForm.value.username, loginForm.value.password);
    emit('login-success');
  } catch (err) {
    loginError.value = err.response?.data?.error || 'An error occurred during login';
  } finally {
    isLoading.value = false;
  }
};
</script>