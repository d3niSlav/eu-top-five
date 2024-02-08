<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

import apiClient from '@/services/api';
import { useUserStore } from '@/stores/user';

interface FavoritesToggleProps {
  id: number;
}

const userStore = useUserStore();
const { favorites, user } = storeToRefs(userStore);
const isFavorite = ref<boolean>(false);
const { id } = defineProps<FavoritesToggleProps>();
const errorMessage = ref<string>('');

const toggleFavorite = () => {
  errorMessage.value = '';

  apiClient.put('/favorites/team', { teamId: id }).then((response) => {
    const favoritesData = response.data;

    userStore.setFavorites(favoritesData);

    isFavorite.value = favoritesData.includes(`${id}`);
  }).catch((error) => {
    errorMessage.value = error?.response?.data?.message;
  });
};

onMounted(() => {
  isFavorite.value = favorites.value.includes(`${id}`);

  userStore.$subscribe((mutation, state) => {
    isFavorite.value = state.favorites.includes(`${id}`);
  });
});
</script>

<template>
  <div>
    <v-btn
      v-if="user"
      density="compact"
      :icon="`mdi-heart-${isFavorite ? 'remove' : 'plus-outline'}`"
      @click.prevent="toggleFavorite"
    />
    <v-dialog width="500" v-else>
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          density="compact"
          icon="mdi-heart-plus-outline"
        />
      </template>
      <template v-slot:default="{ isActive }">
        <v-card title="Sign in">
          <v-card-text>
            In order to use the favorites features, please
            <router-link to="/login">Sign in</router-link>
            to your account
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Close"
              @click="isActive.value = false"
            />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>