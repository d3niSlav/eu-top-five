<script setup lang="ts">
import type { Competition } from '@/types/types';

interface CompetitionCellProps {
  competition: Competition;
}

const { competition } = defineProps<CompetitionCellProps>()

const {
  code,
  emblem,
  name,
  shortName,
} = competition;
</script>

<template>
  <router-link class="d-flex align-center" :to="`/league/${code}/matches`">
    <div class="crest-cell" v-if="emblem">
      <v-img :max-height="30" :src="emblem" alt="Competition emblem" />
    </div>
    <span>{{ name || shortName || '-' }}</span>
  </router-link>
</template>
