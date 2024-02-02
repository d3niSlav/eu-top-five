import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import TeamsView from '@/views/teams/TeamsView.vue';
import TeamView from '@/views/teams/TeamView.vue';
import PlayerView from '@/views/players/PlayerView.vue';
import LeagueView from '@/views/leagues/LeagueView.vue';
import ScorersView from '@/views/leagues/ScorersView.vue';
import StandingsView from '@/views/leagues/StandingsView.vue';
import LeagueTeamsView from '@/views/leagues/LeagueTeamsView.vue';
import LeagueMatchesView from '@/views/leagues/LeagueMatchesView.vue';
import MatchesView from '@/views/matches/MatchesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/matches',
      name: 'matches',
      component: MatchesView,
    },
    {
      path: '/league/:leagueId/matches',
      name: 'league-matches',
      component: LeagueMatchesView,
    },
    {
      path: '/league/:leagueId/teams',
      name: 'league-teams',
      component: LeagueTeamsView,
    },
    {
      path: '/league/:leagueId/standings',
      name: 'league-standings',
      component: StandingsView,
    },
    {
      path: '/league/:leagueId/scorer',
      name: 'league-scorer',
      component: ScorersView,
    },
    {
      path: '/league/:leagueId',
      name: 'league',
      component: LeagueView,
    },
    {
      path: '/teams',
      name: 'teams',
      component: TeamsView,
    },
    {
      path: '/teams/:teamId',
      name: 'team-profile',
      component: TeamView,
    },
    {
      path: '/player/:playerId',
      name: 'player-profile',
      component: PlayerView,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
