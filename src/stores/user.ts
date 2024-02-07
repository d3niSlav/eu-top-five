import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';

import type { User } from '@/types/types';

const getUserId = (): User | null => {
  const token = sessionStorage.getItem('access_token');
  let user = null;

  if (token) {
    user = jwtDecode<User>(token);
  }

  return user;
}

interface UserStoreState {
  user: User | null;
  favorites: number[];
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    user: getUserId(),
    favorites: [],
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    setFavorites(teamIds: number[]) {
      this.favorites = teamIds;
    },
    clearUser() {
      sessionStorage.removeItem('access_token');

      this.user = null;
      this.favorites = [];
    },
  },
});
