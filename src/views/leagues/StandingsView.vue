<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { VDataTable } from 'vuetify/components';

import apiClient from '@/services/football-data-api';
import type { Season, Standing, StandingsData, Team } from '@/types/types';
import { ALLOWED_LEAGUES } from '@/utils/constants';

type VDataTableHeaders = VDataTable['headers'];

const route = useRoute();
let leagueId = route.params.leagueId;

if (!leagueId || !ALLOWED_LEAGUES.includes(leagueId as string)) {
  // TODO redirect to home and show toast error
  leagueId = 'PL';
}

const loading = ref(false);
const standings = ref<Standing[]>([]);
const season = ref<Season | null>(null)

const tab = ref<string>('TOTAL');
const selectedSeason = ref<string | undefined>('')
const selectedMatchday = ref<string | undefined>('')

const headers: VDataTableHeaders = [
  {
    key: 'position',
    title: '#',
    align: 'center',
  },
  {
    key: 'team',
    title: 'Name',
    sort: (a: Team, b: Team) => {
      const team1 = a.name || a.shortName || '-';
      const team2 = b.name || b.shortName || '-';

      if (team1.toLowerCase() < team2.toLowerCase()) return -1;

      if (team1.toLowerCase() > team2.toLowerCase()) return 1;

      return 0;
    }
  },
  {
    key: 'playedGames',
    title: 'MP',
    align: 'center',
  },
  {
    key: 'won',
    title: 'W',
    align: 'center',
  },
  {
    key: 'draw',
    title: 'D',
    align: 'center',
  },
  {
    key: 'lost',
    title: 'L',
    align: 'center',
  },
  {
    key: 'goalsFor',
    title: 'GF',
    align: 'center',
  },
  {
    key: 'goalsAgainst',
    title: 'GA',
    align: 'center',
  },
  {
    key: 'goalDifference',
    title: 'GD',
    align: 'center',
  },
  {
    key: 'points',
    title: 'P',
    align: 'center',
  },
  {
    key: 'form',
    title: 'Form',
  },
];

const loadItems = async (newSeason = 2023, newMatchDay?: number) => {
  loading.value = true;

  const responseData = await apiClient.get<StandingsData>(
      `competitions/${leagueId}/standings${newSeason ? `?season=${newSeason}` : ''}${newMatchDay ? `${newSeason ? '&' : '?'}matchday=${newMatchDay}` : ''}`);
  const response: StandingsData = responseData?.data;
  const { standings: standingsData, season: seasonData, filters } = response;
  const { season: currentSeason, matchday: currentMatchday } = filters || {};

  // todo error handling

  standings.value = standingsData;
  season.value = seasonData;
  selectedSeason.value = currentSeason;
  selectedMatchday.value = currentMatchday;

  loading.value = false;
};

onMounted(async () => {
  await loadItems();
})
</script>

<template>
  <v-card>
    <template #title>
      Standings
      <span v-if="season && season.currentMatchday">
        MatchDay #{{ season.currentMatchday }}
      </span>
    </template>
    <template #subtitle v-if="season">
      ({{ season.startDate }} - {{ season.endDate }})
    </template>
  </v-card>
  <br/>
  <v-card>
    <v-tabs
        v-model="tab"
        bg-color="primary"
    >
      <v-tab
          v-for="({ type }) in standings"
          :key="`standing-tab-${type}`"
          :value="type"
      >
        {{ type }}
      </v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item v-for="({ type, table }) in standings" :key="`standing-window-${type}`" :value="type">
          <v-skeleton-loader type="table" :loading="loading">
            <v-data-table
                density="compact"
                :headers="headers"
                :items="table"
                :items-per-page="-1"
            >
              <template #[`item.team`]="{item}">
                <router-link class="d-flex align-center" :to="`/teams/${item.team.id}`">
                  <div class="crest-cell">
                    <v-img :max-height="30" v-if="item.team.crest" :src="item.team.crest"/>
                  </div>
                  {{ item.team.name || item.team.shortName || '-' }}
                </router-link>
              </template>
              <template #[`item.form`]="{item}">
                <p v-if="item.form">
                  <v-chip
                      v-for="(result, index) in item.form.split(',')"
                      :class="`mr-1 form-box form-box--${result}`"
                      label
                      size="small"
                      :text="result"
                      :key="`${item.team.id}-${index}`"
                  />
                </p>
                <span v-else>-</span>
              </template>
              <template #bottom></template>
            </v-data-table>
          </v-skeleton-loader>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
