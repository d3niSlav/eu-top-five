<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { VDataTable } from 'vuetify/components';

import apiClient from '@/services/api';
import type { Scorer, ScorersData, Season, Team } from '@/types/types';
import { ALLOWED_LEAGUES } from '@/utils/constants';

type VDataTableHeaders = VDataTable['headers'];

const route = useRoute();
let leagueId = route.params.leagueId;

if (!leagueId || !ALLOWED_LEAGUES.includes(leagueId as string)) {
  // TODO redirect to home and show toast error
  leagueId = 'PL';
}

const season = ref<Season | null>(null)
const loading = ref(false);
const scorers = ref<Scorer[]>([]);
const selectedSeason = ref<string | undefined>('')

const headers: VDataTableHeaders = [
  {
    key: 'position',
    title: '#',
    align: 'center',
  },
  {
    key: 'player',
    title: 'Name',
    sort: (a: Team, b: Team) => {
      const player1 = a.name || '-';
      const player2 = b.name || '-';

      if (player1.toLowerCase() < player2.toLowerCase()) return -1;

      if (player1.toLowerCase() > player2.toLowerCase()) return 1;

      return 0;
    }
  },
  {
    key: 'team',
    title: 'Team',
    sort: (a: Team, b: Team) => {
      const team1 = a.name || a.shortName || '-';
      const team2 = b.name || b.shortName || '-';

      if (team1.toLowerCase() < team2.toLowerCase()) return -1;

      if (team1.toLowerCase() > team2.toLowerCase()) return 1;

      return 0;
    }
  },
  {
    key: 'goals',
    title: 'Goals',
    align: 'center',
  },
  {
    key: 'assists',
    title: 'Assists',
    align: 'center',
  },
];

const loadItems = async (newSeason = 2023) => {
  loading.value = true;

  // TODO play with limit/offset to achieve pagination from the API
  const newLimit = 1000;

  const responseData = await apiClient.get<ScorersData>(
      `competitions/${leagueId}/scorers${newSeason ? `?season=${newSeason}` : ''}${newLimit ? `${newSeason ? '&' : '?'}limit=${newLimit}` : ''}`);
  const response: ScorersData = responseData?.data;
  const { scorers: scorersData, season: seasonData, filters } = response;
  const { season: currentSeason } = filters || {};

  // TODO add error handling from API

  scorers.value = scorersData;
  season.value = seasonData;
  selectedSeason.value = currentSeason;

  loading.value = false;
};

onMounted(async () => {
  await loadItems();
})
</script>

<template>
  <v-card>
    <template #title>
      Scorers
      <span v-if="season && season.currentMatchday">
        Match Day #{{ season.currentMatchday }}
      </span>
    </template>
    <template #subtitle v-if="season">
      ({{ season.startDate }} - {{ season.endDate }})
    </template>
  </v-card>
  <br/>
  <v-card>
    <template v-slot:text>
      <v-skeleton-loader type="table" :loading="loading">
        <v-data-table
            density="compact"
            :headers="headers"
            :items="scorers"
            :items-per-page="-1"
        >
          <template #[`item.position`]="{index}">
            {{ index + 1 }}
          </template>
          <template #[`item.player`]="{item}">
            <router-link class="d-flex align-center" :to="`/player/${item.player.id}`">
              {{ item.player.name || '-' }}
            </router-link>
          </template>
          <template #[`item.team`]="{item}">
            <router-link class="d-flex align-center" :to="`/teams/${item.team.id}`">
              {{ item.team.name || item.team.shortName || '-' }}
            </router-link>
          </template>
          <template #[`item.goals`]="{item}">
            {{ item.goals || 0 }}
          </template>
          <template #[`item.assists`]="{item}">
            {{ item.assists || 0 }}
          </template>
          <template #bottom></template>
        </v-data-table>
      </v-skeleton-loader>
    </template>
  </v-card>
</template>
