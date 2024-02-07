<script lang="ts" setup>
import { jwtDecode } from "jwt-decode";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import cupImage from '@/assets/images/cup.png';
import apiClient from '@/services/api';
import type { User } from '@/types/types';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();

const username = ref<string>('');
const password = ref<string>('');
const errorMessage = ref<string>('');

const login = () => {
  const userData = {
    username: username.value.trim(),
    password: password.value.trim(),
  };

  errorMessage.value = '';

  apiClient.post('/auth/login', userData).then((responce) => {
    const token = responce.data.access_token;
    const decoded = jwtDecode<User>(token);
    userStore.setUser(decoded);

    sessionStorage.setItem('access_token', responce.data.access_token);
    router.replace({ path: '/' });
  }).catch((error) => {
    errorMessage.value = error.response.data.message;
  });
}
</script>

<template>
  <v-row align="center">
    <v-col cols="2" class="d-none d-lg-block" />
    <v-col cols="12" lg="4">
      <v-card class="mt-6">
        <v-card-text>
          <div class="text-center mb-5">
            <div class="text-h6">Europe</div>
            <div class="text-h4 font-weight-bold">TOP</div>
            <div class="text-h2">5</div>
          </div>
          <v-form fast-fail @submit.prevent="login">
            <v-text-field v-model="username" label="Username" type="email" :error="!!errorMessage" :error-messages="errorMessage" />
            <v-text-field v-model="password" label="Password" type="password" :error="!!errorMessage" />
            <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>
          </v-form>
          <div class="mt-2">
            <p class="text-body-2">Don't have an account?
              <router-link to="/register">Sign up</router-link>
            </p>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" lg="5" class="d-none d-lg-block">
      <v-img :src="cupImage" max-height="450"/>
    </v-col>
  </v-row>
</template>