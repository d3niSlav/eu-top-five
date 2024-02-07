<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RouterLink, RouterView, useRouter } from 'vue-router'

import LeagueSwitcher from '@/components/LeagueSwitcher.vue';
import apiClient from '@/services/api';
import { useLeagueStore } from '@/stores/league';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const store = useLeagueStore();
const userStore = useUserStore();
const { leagueCode } = storeToRefs(store);
const { user } = storeToRefs(userStore);

const TOP_LEAGUES = [
  { code: 'PL', emblem: 'https://crests.football-data.org/PL.png', name: 'Premier League' },
  { code: 'BL1', emblem: 'https://crests.football-data.org/BL1.png', name: 'Bundesliga' },
  { code: 'PD', emblem: 'https://crests.football-data.org/PD.png', name: 'Primera Division' },
  { code: 'SA', emblem: 'https://crests.football-data.org/SA.png', name: 'Serie A' },
  { code: 'FL1', emblem: 'https://crests.football-data.org/FL1.png', name: 'League 1' },
];

const changeLeague = (code?: string) => {
  store.setSelectedLeague(code);
  if (code) {
    router.replace({ path: `/league/${code}` });
  } else {
    router.replace({ path: '/' });
  }
};

const logout = () => {
  userStore.clearUser();
  store.setSelectedLeague('');
  router.replace({ path: '/' });
};

if (userStore.user?.id) {
  apiClient.get('/user').then((response) => {
    const { favorites } = response.data;

    userStore.setFavorites(favorites);
  });
}
</script>

<template>
  <header class="d-flex justify-center w-100">
    <nav>
      <template v-if="leagueCode">
        <RouterLink :to="`/league/${leagueCode}/matches`">Matches</RouterLink>
        <RouterLink :to="`/league/${leagueCode}/teams`">Teams</RouterLink>
        <RouterLink :to="`/league/${leagueCode}/standings`">Standings</RouterLink>
        <RouterLink :to="`/league/${leagueCode}/scorer`">Scorer</RouterLink>
        <RouterLink :to="`/league/${leagueCode}`">Archive</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/matches">Matches</RouterLink>
        <RouterLink to="/teams">Teams</RouterLink>
      </template>
    </nav>
  </header>
  <main class="px-2 pt-2">
    <v-container>
      <RouterView :key="$route.fullPath" />
    </v-container>
  </main>
  <league-switcher
      :leagues-list="TOP_LEAGUES"
      :league-code="store.leagueCode"
      @switch-league="changeLeague"
  >
    <template #top-navigation>
      <nav class="py-0">
        <ul class="user-navigation">
          <li>
            <router-link to="/">
              <span v-if="user && user.id">Favorites</span>
              <span v-else>Home</span>
            </router-link>
          </li>
          <li v-if="user && user.id">
            <v-btn elevation="0" density="compact" color="transparent" class="logout-btn" @click.prevent="logout">
              <span class="text-capitalize">Logout</span>
            </v-btn>
          </li>
          <li v-else>
            <router-link to="/login">
              Login
            </router-link>
          </li>
        </ul>
      </nav>
    </template>
  </league-switcher>
</template>

<style scoped>
header {
  position: fixed;
  bottom: 0;
  z-index: 1;
  background-color: #042431;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

nav {
  width: 100%;
  text-align: center;
  font-size: 0.8rem;
  margin: 0 auto;
  padding: 15px 0;
}

nav a.router-link-exact-active {
  color: #ffffff;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 0.75rem;
  font-weight: bold;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

main {
  margin: 80px auto 65px;
}

.user-navigation {
  display: flex;
  padding-top: 10px;
  list-style: none;
  font-size: 16px;
}

.logout-btn {
  position: relative;
  top: -2px;
}
</style>
