<script setup lang="ts">
import type { Team } from '@/types/types';

interface TeamsCellProps {
  homeTeam: Team;
  awayTeam: Team;
}

const { awayTeam, homeTeam } = defineProps<TeamsCellProps>()
</script>

<template>
  <v-row dense>
    <v-col cols="12" class="pb-0">
      <router-link class="d-flex align-center" :to="`/teams/${homeTeam.id}`" target= '_blank'>
        <div class="crest-cell" v-if="homeTeam.crest">
          <v-img :max-height="20" :src="homeTeam.crest" alt="Home team crest" />
        </div>
        <span>{{ homeTeam.shortName || homeTeam.name || '-' }}</span>
      </router-link>
    </v-col>
    <v-col cols="12" class="pt-0">
      <router-link class="d-flex align-center" :to="`/teams/${awayTeam.id}`" target= '_blank'>
        <div class="crest-cell" v-if="awayTeam.crest">
          <v-img :max-height="20" :src="awayTeam.crest" alt="Away team crest" />
        </div>
        <span>{{ awayTeam.shortName || awayTeam.name }}</span>
      </router-link>
    </v-col>
  </v-row>
</template>
