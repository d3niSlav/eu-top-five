<script setup lang="ts">
import { storeToRefs } from 'pinia';

import cupImage from '@/assets/images/cup.png';
import { useUserStore } from '@/stores/user';
import { STORED_TEAMS } from '@/utils/constants';

const userStore = useUserStore();
const { favorites, user } = storeToRefs(userStore);
</script>

<template>
  <section class="text-center">
    <div v-if="user">
      <h2>Browse your favorite teams:</h2>
      <br/>
      <v-row v-if="favorites?.length" dense>
        <v-col v-for="teamId in favorites" :key="teamId" cols="2">
          <v-card v-if="STORED_TEAMS[+teamId]" density="compact">
            <v-card-text>
              <router-link :to="`teams/${teamId}`">
                <v-img :src="STORED_TEAMS[+teamId]?.crest" max-height="100"/>
                <p class="mt-2">{{ STORED_TEAMS[+teamId]?.name }}</p>
              </router-link>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <p v-else>
        You do not have any teams added to favorites.
        <br />
        Browse the <router-link to="/teams">Teams</router-link> and find your favorites.
      </p>
    </div>
    <template v-else>
      <span class="text-h4">Welcome to  <br/>Europe TOP 5 <br/>soccer leagues</span>
      <v-img :src="cupImage" max-height="400"/>
    </template>
  </section>
</template>
