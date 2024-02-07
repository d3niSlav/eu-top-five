import { defineStore } from 'pinia';

const getLeagueCode = () => {
  const leagueCode = localStorage.getItem('LEAGUE_CODE');

  return leagueCode || '';
}

interface LeagueStoreState {
  leagueCode?: string;
}

export const useLeagueStore = defineStore('league', {
  state: (): LeagueStoreState => ({
    leagueCode: getLeagueCode(),
  }),
  actions: {
    setSelectedLeague(code?: string) {
      localStorage.setItem('LEAGUE_CODE', code || '');

      this.leagueCode = code;
    },
  },
});
