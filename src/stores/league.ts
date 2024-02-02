import { defineStore } from 'pinia';

const getLeagueCode = () => {
  const leagueCode = localStorage.getItem('LEAGUE_CODE');
  console.log(leagueCode);
  return leagueCode || '';
}

export const useLeagueStore = defineStore('league', {
  state: () => ({
    leagueCode: getLeagueCode(),
  }),
  actions: {
    setSelectedLeague(code?: string) {
      localStorage.setItem('LEAGUE_CODE', code);

      this.leagueCode = code;
    }
  }
});
