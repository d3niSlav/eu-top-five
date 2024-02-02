<script setup lang="ts">
import type { Team } from '@/types/types';

interface TeamProfileCardProps {
  team: Team;
}

const { team } = defineProps<TeamProfileCardProps>()

const {
  crest,
  name,
  address,
  website,
  clubColors,
  venue,
  founded,
  area,
} = team;
</script>

<template>
  <v-row>
    <v-col cols="2" v-if="crest">
      <v-img :src="crest" alt="Team's crest" />
    </v-col>
    <v-col :cols="crest ? 7 : 9">
      <p class="text-h4 mb-2">{{ name }}</p>
      <p class="text-body-1">
        <span>Address: </span>
        <span class="font-weight-bold">{{ address || '-' }}</span>
      </p>
      <p class="text-body-1">
        <span>Website: </span>
        <span class="font-weight-bold" v-if="website">
          <a v-if="website" :href="website" rel="noopener" target="_blank">Go to site</a>
          <span v-else>-</span>
        </span>
        <span v-else>-</span>
      </p>
      <p class="text-body-1">
        <span>Colors: </span>
        <span class="font-weight-bold">{{ clubColors || '-' }}</span>
      </p>
      <p class="text-body-1">
        <span>Venue: </span>
        <span class="font-weight-bold">{{ venue || '-' }}</span>
      </p>
    </v-col>
    <v-col cols="2">
      <div class="d-flex justify-center flex-column" v-if="area">
        <div v-if="area.flag" class="border">
          <v-img :src="area.flag" alt="Flag" />
        </div>
        <p class="text-h5 text-center mt-2">{{ area.name }}</p>
      </div>
      <p class="text-body-1 text-center">
        <span>Est.: </span>
        <span class="font-weight-bold">{{ founded || '-' }}</span>
      </p>
    </v-col>
  </v-row>
</template>
