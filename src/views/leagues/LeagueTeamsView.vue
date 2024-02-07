<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { VDataTable } from 'vuetify/components'

import apiClient from '@/services/football-data-api';
import type { LeagueTeamsData, Team } from '@/types/types';
import { ALLOWED_LEAGUES } from '@/utils/constants';

type VDataTableHeaders = VDataTable['headers'];

const route = useRoute();
let leagueId = route.params.leagueId;

if (!leagueId || !ALLOWED_LEAGUES.includes(leagueId as string)) {
  // TODO redirect to home and show toast error
  leagueId = 'PL';
}

const loading = ref(false);
const teams = ref<Team[]>([]);
const expanded = ref<string[]>([]);
const season = ref<string | undefined>('')

const headers: VDataTableHeaders = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'founded',
    title: 'Founded',
    align: 'center'
  },
  {
    key: 'venue',
    title: 'Venue',
  },
  {
    key: 'squad',
    title: 'Squad size',
  },
];

const squadHeaders: VDataTableHeaders = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'nationality',
    title: 'Nationality',
  },
  {
    key: 'position',
    title: 'Position',
  },
  {
    key: 'dateOfBirth',
    title: 'Date of Birth',
  },
]

const loadItems = async (newSeason?: string) => {
  loading.value = true;

  const responseData = await apiClient.get<LeagueTeamsData>(`competitions/${leagueId}/teams${newSeason ? `?season=${newSeason}` : ''}`);
  const response: LeagueTeamsData = responseData?.data;
  const { teams: teamsData, filters } = response;
  const { season: currentSeason } = filters || {};

  // todo error handling

  season.value = `${currentSeason}`;
  teams.value = teamsData;
  expanded.value = [];

  loading.value = false;
};

onMounted(async () => {
  await loadItems();
})

watch(season, async (newSeason, oldValue) => {
  if (oldValue && newSeason && +newSeason > 2020 && newSeason !== oldValue) {
    await loadItems(newSeason);
  }
})
</script>

<template>
  <v-card>
    <template v-slot:title>
      League Teams
    </template>
    <template v-slot:text>
      <v-data-table
          v-model:expanded="expanded"
          :headers="headers"
          :items="teams"
          :loading="loading"
          show-expand
      >
        <template v-slot:top>
          <v-text-field
              v-model="season"
              label="Season"
              class="pa-2"
          />
        </template>
        <template v-slot:[`item.name`]="{item}">
          <router-link class="d-flex align-center" :to="`/teams/${item.id}`">
            <div class="crest-cell">
              <v-img :max-height="30" v-if="item.crest" :src="item.crest" alt="Team's crest" />
            </div>
            <span>{{ item.name || item.shortName || '-' }}</span>
          </router-link>
        </template>
        <template v-slot:[`item.founded`]="{item}">
          <p>{{ item.founded || 'N/A' }}</p>
        </template>
        <template v-slot:[`item.venue`]="{item}">
          <p>{{ item.venue || 'N/A' }}</p>
        </template>
        <template v-slot:[`item.squad`]="{item}">
          <p>{{ item.squad ? item.squad.length : 'N/A' }}</p>
        </template>
        <template v-slot:expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length">
              <h3 class="pt-2 pl-4 pb-1">Squad list</h3>
              <v-data-table
                  density="compact"
                  :headers="squadHeaders"
                  :items="item.squad"
              >
                <template v-slot:[`item.name`]="{item}">
                  <router-link :to="`/player/${item.id}`">{{ item.name }}</router-link>
                </template>
              </v-data-table>
            </td>
          </tr>
        </template>
      </v-data-table>
    </template>
  </v-card>
</template>
