<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { VDataTable } from 'vuetify/components';

import CompetitionCell from '@/components/table-cells/CompetitionCell.vue';
import PlayerProfileCard from '@/components/profile-cards/PlayerProfileCard.vue';
import ScoreCell from '@/components/table-cells/ScoreCell.vue';
import SeasonCell from '@/components/table-cells/SeasonCell.vue';
import TeamsCell from '@/components/table-cells/TeamsCell.vue';
import apiClient from '@/services/football-data-api';
import type { Match, MatchData, Player } from '@/types/types';

type VDataTableHeaders = VDataTable['headers'];

const route = useRoute();
const playerId = route.params.playerId;

const RESULTS = {
  HOME_TEAM: 'W',
  AWAY_TEAM: 'L',
  DRAW: 'D',
};

const itemsPerPage = ref(10);
const offset = ref(10);
const endOfMatchesReached = ref(false);
const loading = ref(false);

const player = ref<Player | null>(null);
const matches = ref<Match[]>([]);

const headers: VDataTableHeaders = [
  {
    key: 'competition',
    title: 'Competition',
    sortable: false,
    //todo sort
  },
  {
    key: 'season',
    title: 'Season',
    sortable: false,
    //todo sort
  },
  {
    key: 'teams',
    title: 'Teams',
    sortable: false,
  },
  {
    key: 'score',
    title: 'Score',
    align: 'center',
    sortable: false,
  },
  {
    key: 'status',
    title: 'Status',
    sortable: false,
    //todo sort
  },
  {
    key: 'referees',
    title: 'Referees',
    sortable: false,
  },
];

const loadPlayer = async () => {
  loading.value = true;

  // todo check for a selected league

  const responseData = await apiClient.get<Player>(`persons/${playerId}`);

  // todo error handling

  if (responseData?.data) {
    player.value = responseData?.data
  }

  loading.value = false;
};

const loadPlayerMatches = async (limit: number, offset?: number) => {
  loading.value = true;

  const responseData = await apiClient.get<MatchData>(`persons/${playerId}/matches?limit=${limit}${offset ? `&offset=${offset}` : ''}`);

  // todo error handling

  if (responseData?.data) {
    const { matches: matchesData } = responseData.data;

    if (offset) {
      matches.value = [...matches.value, ...matchesData];
    } else {
      matches.value = matchesData;
    }
  }

  loading.value = false;
};

onMounted(async () => {
  await loadPlayer();
  await loadPlayerMatches(itemsPerPage.value);
})

const loadMore = async () => {
  const currentOffset = offset.value;

  await loadPlayerMatches(itemsPerPage.value, currentOffset);

  if (matches.value.length < (itemsPerPage.value * offset.value)) {
    endOfMatchesReached.value = true;
  }

  offset.value += 10;
}
</script>

<template>
  <section>
    <v-card v-if="player">
      <template v-slot:text>
        <player-profile-card :player="player" />
      </template>
    </v-card>
    <br/>
    <v-card>
      <template v-slot:title>
        Matches
      </template>
      <template v-slot:text>
        <v-data-table
            :headers="headers"
            :items="matches"
            :loading="loading"
            item-key="id"
            items-per-page="-1"
        >
          <template v-slot:[`item.competition`]="{item}">
            <competition-cell :competition="item.competition" />
          </template>
          <template v-slot:[`item.season`]="{item}">
            <season-cell :season="item.season" :matchday="item.matchday" :utc-date="item.utcDate" />
          </template>
          <template v-slot:[`item.teams`]="{item}">
            <teams-cell :away-team="item.awayTeam" :home-team="item.homeTeam" />
          </template>
          <template v-slot:[`item.score`]="{item}">
            <score-cell :status="item.status" :score="item.score" />
          </template>
          <template v-slot:[`item.status`]="{item}">
            <v-chip
                :class="`form-box form-box--${RESULTS[item.score.winner]}`"
                label
                size="small"
                :text="item.status === 'FINISHED' ? RESULTS[item.score.winner] || '?' : '?'"
            />
          </template>
          <template v-slot:[`item.referees`]="{item}">
            <span v-for="(referee, index) in item.referees" :key="referee.id">
              {{ referee.name }}<template v-if="index < item.referees.length - 1">, </template>
            </span>
          </template>
          <template v-slot:tfoot>
            &nbsp;
          </template>
          <template v-slot:bottom>
            <div class="d-flex justify-center">
              <v-btn
                  color="primary"
                  @click="loadMore"
                  text="Show more matches"
              />
            </div>
          </template>
        </v-data-table>
      </template>
    </v-card>
  </section>
</template>
