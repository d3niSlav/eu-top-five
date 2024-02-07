<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import cupImage from '@/assets/images/cup.png';
import apiClient from '@/services/api';

const router = useRouter();

const username = ref<string>('');
const password = ref<string>('');
const errorMessage = ref<string>('');

const register = () => {
  const userData = {
    username: username.value,
    password: password.value,
  };

  errorMessage.value = '';

  apiClient.post('/auth/register', userData).then(() => {
    router.replace({ path: '/login' });
  }).catch((error) => {
    errorMessage.value = error.response.data.message;
  });
}
</script>

<template>
  <v-row align="center">
    <v-col cols="1"></v-col>
    <v-col cols="12" lg="5">
      <v-img :src="cupImage" max-height="450"/>
    </v-col>
    <v-col cols="12" lg="4">
      <v-card class="mt-6">
        <v-card-text>
          <div class="text-center mb-5">
            <div class="text-h6">Europe</div>
            <div class="text-h4 font-weight-bold">TOP</div>
            <div class="text-h2">5</div>
          </div>
          <v-form fast-fail @submit.prevent="register">
            <v-text-field v-model="username" label="Username" :error="!!errorMessage" type="email" :error-messages="errorMessage" />
            <v-text-field v-model="password" label="Password" :error="!!errorMessage" type="password" />
            <v-btn type="submit" color="primary" block class="mt-2">Sign up</v-btn>
          </v-form>
          <div class="mt-2">
            <p class="text-body-2">Already have an account?
              <router-link to="/login">Sign in</router-link>
            </p>
          </div>
        </v-card-text>
      </v-card>
      <v-col cols="1"></v-col>
    </v-col>
  </v-row>
</template>