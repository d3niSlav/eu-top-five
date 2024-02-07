<script setup lang="ts">
import { VDataTable } from 'vuetify/components';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import CoachProfileCard from '@/components/profile-cards/CoachProfileCard.vue';
import CompetitionCell from '@/components/table-cells/CompetitionCell.vue';
import ScoreCell from '@/components/table-cells/ScoreCell.vue';
import SeasonCell from '@/components/table-cells/SeasonCell.vue';
import TeamsCell from '@/components/table-cells/TeamsCell.vue';
import TeamProfileCard from '@/components/profile-cards/TeamProfileCard.vue';
import apiClient from '@/services/football-data-api';
import type { Match, MatchData, MatchDataResultSet, Team } from '@/types/types';

type VDataTableHeaders = VDataTable['headers'];

const route = useRoute();
const teamId = route.params.teamId;

const tab = ref<string>('matches');
const loading = ref(false);
const team = ref<Team | null>(null);
const matches = ref<Match[]>([]);

const RESULTS = {
  DRAW: 'D',
  HOME_TEAM: 'W',
  AWAY_TEAM: 'L',
};

const matchesResults = ref<MatchDataResultSet>({
  played: 0,
  count: 0,
  losses: 0,
  draws: 0,
  first: '',
  last: '',
});

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

const teamTabs = {
  matches: {
    label: 'Matches',
    icon: 'soccer',
  },
  squad: {
    label: 'Squad',
    icon: 'soccer-field',
  },
  coach: {
    label: 'Coach',
    icon: 'whistle',
  },
  staff: {
    label: 'Staff',
    icon: 'history',
  },
}

const matchesHeaders: VDataTableHeaders = [
  {
    key: 'competition',
    title: 'Competition',
    sortable: false,
  },
  {
    key: 'utcDate',
    title: 'Season',
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
  },
  {
    key: 'referees',
    title: 'Referees',
    sortable: false,
  },
];
const loadTeam = async () => {
  loading.value = true;

  const responseData = await apiClient.get<Team>(`teams/${teamId}`);

  // todo error handling

  if (responseData?.data) {
    team.value = responseData?.data
  }

  loading.value = false;
};

const loadTeamMatches = async () => {
  loading.value = true;

  const responseData = await apiClient.get<MatchData>(`teams/${teamId}/matches`);

  // todo error handling

  if (responseData?.data) {
    const { matches: matchesData, resultSet } = responseData.data;

    matches.value = matchesData;
    matchesResults.value = resultSet;
  }

  loading.value = false;
};

onMounted(async () => {
  await loadTeam();
  await loadTeamMatches();
})
</script>

<template>
  <section v-if="team">
    <v-card>
      <template v-slot:text>
        <team-profile-card :team="team" />
      </template>
    </v-card>
    <v-card class="mt-3">
      <v-tabs
          v-model="tab"
          bg-color="#042431"
          centered
          align-tabs="center"
      >
        <v-tab v-for="({ icon, label }, key) in teamTabs" :value="key" :key="key">
          <v-icon class="pr-3">mdi-{{ icon }}</v-icon>
          {{ label }}
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item
            key="matches"
            value="matches"
        >
          <v-card>
            <v-card-title>
              Matches
            </v-card-title>
            <v-card-text>
              <v-data-table
                  :headers="matchesHeaders"
                  :items="matches"
                  :loading="loading"
                  item-value="name"
                  :items-per-page="10"
              >
                <template v-slot:[`item.competition`]="{item}">
                  <competition-cell :competition="item.competition" />
                </template>
                <template v-slot:[`item.utcDate`]="{item}">
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
                  <p v-if="item.referees.length">
                  <span v-for="(referee, index) in item.referees" :key="referee.id">
                    {{ referee.name }}<template v-if="index < item.referees.length - 1">, </template>
                  </span>
                  </p>
                  <span v-else>TBD</span>
                </template>
                <template v-slot:tfoot>
                  &nbsp;
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item
            key="squad"
            value="squad"
        >
          <v-card>
            <v-card-title>
              Squad
            </v-card-title>
            <v-card-text>
              <v-data-table
                  :headers="squadHeaders"
                  :items="team.squad"
                  density="compact"
              >
                <template v-slot:[`item.name`]="{item}">
                  <router-link :to="`/player/${item.id}`" target='_blank'>
                    {{ item.name }}
                  </router-link>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item
            key="coach"
            value="coach"
        >
          <v-card>
            <v-card-title>Coach</v-card-title>
            <v-card-text>
              <coach-profile-card v-if="team.coach" :coach="team.coach" />
              <span v-else>No coach details</span>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item
            key="staff"
            value="staff"
        >
          <v-card>
            <v-card-title>
              Staff history
            </v-card-title>
            <v-card-text>
              <div v-for="({id: staffId, name: staffName, dateOfBirth: staffBirth }) in team.staff" class="mb-3"
                   :key="staffId">
                <p class="text-body-1">
                  <span>Name: </span>
                  <span class="font-weight-bold">{{ staffName }}</span>
                </p>
                <p class="text-body-1">
                  <span>Date of birth: </span>
                  <span class="font-weight-bold">{{ staffBirth }}</span>
                </p>
              </div>
              <div v-if="team.staff?.length === 0">No staff history</div>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
  </section>
</template>
