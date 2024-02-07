<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import apiClient from '@/services/football-data-api';
import type { MatchData, Match } from '@/types/types';
import { ALLOWED_LEAGUES } from '@/utils/constants';

const route = useRoute();
let leagueId = route.params.leagueId;

if (!leagueId || !ALLOWED_LEAGUES.includes(leagueId as string)) {
  // TODO redirect to home and show toast error
  leagueId = 'PL';
}

const loading = ref(false);
const matches = ref<Match[]>([]);
const season = ref<number>();

const loadItems = async () => {
  loading.value = true;

  const responseData = await apiClient.get<MatchData>(`competitions/${leagueId}/matches`);
  const response: MatchData = responseData?.data;

  const { matches: matchesData, filters } = response;
  const { season: currentSeason } = filters;

  season.value = currentSeason;
  matches.value = matchesData;

  loading.value = false;
};

onMounted(async () => {
  await loadItems();
});
</script>

<template>
  <v-card>
    <v-card-title class="text-center">
      <p class="text-h6">Matches</p>
      <v-skeleton-loader type="text" :loading="loading" class="d-block">
        <p class="text-medium-emphasis text-subtitle-2 text-center">
          Season: {{ season }}
        </p>
      </v-skeleton-loader>
    </v-card-title>
  </v-card>
  <v-skeleton-loader type="card" :loading="loading" class="mt-4 d-block" elevation="0"
                     :color="matches.length <= 0 ? 'white' : 'transparent'">
    <v-card
        v-for="({ id, awayTeam, competition, homeTeam, score, status, utcDate }) in matches"
        :key="id"
        class="mt-4 mb-5"
    >
      <template v-slot:text>
        <v-row align="center" align-content="center" dense>
          <v-col :cols="4">
            <router-link :to="`/teams/${homeTeam.id}`">
              <v-img v-if="homeTeam.crest" :src="homeTeam.crest" :max-height="120"/>
              <p :title="homeTeam.name" class="mt-2 text-center">
                {{ homeTeam.shortName }}
              </p>
            </router-link>
          </v-col>
          <v-col :cols="4">
            <v-row dense>
              <v-col class="text-center">
                {{ competition.name }}
              </v-col>
            </v-row>
            <v-row dense v-if="status === 'FINISHED'">
              <v-col :cols="5" class="text-center">{{ score.fullTime?.home }}</v-col>
              <v-col :cols="2" class="text-center">-</v-col>
              <v-col :cols="5" class="text-center">{{ score.fullTime?.away }}</v-col>
              <v-col :cols="5" class="text-center text-medium-emphasis">({{ score.halfTime?.home }})</v-col>
              <v-col :cols="2"/>
              <v-col :cols="5" class="text-center text-medium-emphasis">({{ score.halfTime?.away }})</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" class="text-center">
                {{ utcDate }}
              </v-col>
            </v-row>
          </v-col>
          <v-col :cols="4">
            <router-link :to="`/teams/${awayTeam.id}`">
              <v-img v-if="awayTeam.crest" :src="awayTeam.crest" :max-height="120"/>
              <p :title="awayTeam.name" class="text-center mt-2">
                {{ awayTeam.shortName }}
              </p>
            </router-link>
          </v-col>
        </v-row>
      </template>
    </v-card>
  </v-skeleton-loader>
</template>
