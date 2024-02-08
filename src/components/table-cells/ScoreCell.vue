<script setup lang="ts">
import type { Score } from '@/types/types';

interface ScoreCellProps {
  score?: Score;
  status: string;
}

const { score, status } = defineProps<ScoreCellProps>()

const {
  fullTime,
  halfTime,
} = score || {};
</script>

<template>
  <v-row dense v-if="status === 'FINISHED' && score">
    <v-col cols="12" class="text-center">
      {{ fullTime?.home }}
      <span class="text-medium-emphasis">({{ halfTime?.home }})</span>
    </v-col>
    <v-col cols="12" class="text-center">
      {{ fullTime?.away }}
      <span class="text-medium-emphasis">({{ halfTime?.away }})</span>
    </v-col>
  </v-row>
  <span v-else>TBD</span>
</template>
