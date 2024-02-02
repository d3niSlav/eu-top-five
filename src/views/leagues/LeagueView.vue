<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { VDataTable } from 'vuetify/components';

import apiClient from '@/services/api';
import type { Competition, Season, Team } from '@/types/types';
import { ALLOWED_LEAGUES } from '@/utils/constants';

type VDataTableHeaders = VDataTable['headers'];

const route = useRoute();
let leagueId = route.params.leagueId;

if (!leagueId || !ALLOWED_LEAGUES.includes(leagueId as string)) {
  // TODO redirect to home and show toast error
  leagueId = 'PL';
}

const loading = ref(false);
const league = ref<Competition>();
const seasons = ref<Season[]>([]);

const headers: VDataTableHeaders = [
  {
    key: 'startDate',
    title: 'Season',
    sort: (a: string, b: string) => {
      if (a.toLowerCase() < b.toLowerCase()) return -1;

      if (a.toLowerCase() > b.toLowerCase()) return 1;

      return 0;
    }
  },
  {
    key: 'winner',
    title: 'Winner',
    sort: (a: Team, b: Team) => {
      const team1 = a ? a.name || a.shortName || '-' : '-';
      const team2 = b ? b.name || b.shortName || '-' : '-';

      if (team1.toLowerCase() < team2.toLowerCase()) return -1;

      if (team1.toLowerCase() > team2.toLowerCase()) return 1;

      return 0;
    }
  },
];

const loadItems = async () => {
  loading.value = true;

  const responseData = await apiClient.get<any>(`competitions/${leagueId}`);
  const response: any = responseData?.data;
  const { seasons: leagueSeasons, ...leagueData } = response;
  // todo error handling

  seasons.value = leagueSeasons;
  league.value = leagueData;

  loading.value = false;
};

onMounted(async () => {
  await loadItems();
})
</script>

<template>
  <v-card v-if="league">
    <template v-slot:text>
      <v-row>
        <v-col cols="2" v-if="league.emblem">
          <v-img :src="league.emblem" alt="Team's crest"/>
        </v-col>
        <v-col :cols="league.emblem ? 8 : 10">
          <div class="ml-5">
          <p class="text-h4 mb-2">{{ league.name }}</p>
          <p class="text-body-1">
            <span>Area: </span>
            <span class="font-weight-bold">{{ league.area?.name || '-' }}</span>
          </p>
          </div>
        </v-col>
        <v-col cols="2" v-if="league.area && league.area.flag">
          <p class="pt-5 pr-5">
            <v-img class="border" :src="league.area?.flag" alt="League area flag" />
          </p>
        </v-col>
      </v-row>
    </template>
  </v-card>
  <br/>
  <v-card>
    <template #title>
      Archive
    </template>
    <template v-slot:text>
      <v-skeleton-loader type="table" :loading="loading">
        <v-data-table
            density="compact"
            :headers="headers"
            :items="seasons"
            :items-per-page="10"
        >
          <template #[`item.startDate`]="{item}">
            {{ item.startDate }} - {{ item.endDate }}
          </template>
          <template #[`item.winner`]="{item}">
            <router-link v-if="item.winner" class="d-flex align-center" :to="`/teams/${item.winner.id}`">
              {{ item.winner.name || item.winner.shortName || '-' }}
            </router-link>
            <span v-else>-</span>
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </template>
  </v-card>
</template>
