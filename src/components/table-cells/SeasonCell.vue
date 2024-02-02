<script setup lang="ts">
import type { Season } from '@/types/types';

interface SeasonCellProps {
  season: Season;
  matchday?: number | null;
  utcDate?: string | null;
}

const { season, matchday, utcDate } = defineProps<SeasonCellProps>()

const {
  startDate,
  endDate,
} = season;
</script>

<template>
  <span>{{ startDate?.slice(0, 4) }}/{{ endDate?.slice(0, 4) }}</span>
  &nbsp;
  <span v-if="matchday" title="Match day">(#{{ matchday }})</span>
  <br/>
  <span v-if="utcDate" title="Date">{{ utcDate }}</span>
</template>
