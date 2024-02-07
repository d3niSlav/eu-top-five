<script setup lang="ts">
import { onMounted, ref } from 'vue';

import apiClient from '@/services/football-data-api';
import type { Match, MatchData } from '@/types/types';

const loading = ref(false);
const startDate = ref<string>('2024-01-28');
const endDate = ref<string>('2024-02-03');
const matches = ref<Match[]>([]);

const loadItems = async (start: string, end: string) => {
  loading.value = true;

  const responseData = await apiClient.get<MatchData>(`matches?competitions=BL1,PD,SA,FL1&dateFrom=${start}&dateTo=${end}`);
  const response: MatchData = responseData?.data;

  const { matches: matchesData } = response;
  matches.value = matchesData;

  loading.value = false;
};

const loadWeek = (type: string) => {
  if (type === 'next') {
    // TODO
  } else {
    // TODO
  }
}

onMounted(async () => {
  await loadItems(startDate.value, endDate.value);
})
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col :cols="3" class="text-subtitle-2" align-self="center">
            <v-btn
                color="primary"
                @click.prevent="loadWeek"
                text="Last week"
            />
          </v-col>
          <v-col :cols="6" class="text-center">
            <p class="text-h6">Matches</p>
            <p class="text-medium-emphasis text-subtitle-2">
              {{ startDate }} to {{ endDate }}
            </p>
          </v-col>
          <v-col :cols="3" class="text-right text-subtitle-2" align-self="center">
            <v-btn
                color="primary"
                @click.prevent="loadWeek"
                text="Next week"
            />
          </v-col>
        </v-row>
      </v-card-title>
    </v-card>
    <v-skeleton-loader type="card" :loading="loading" class="mt-4 d-block" elevation="0" :color="matches.length <= 0 ? 'white' : 'transparent'">
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
  </v-container>
</template>
