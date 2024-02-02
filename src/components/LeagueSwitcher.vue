<script setup lang="ts">
import { computed, toRefs } from 'vue';

interface LeagueSwitcherProps {
  leagueCode?: string;
  leaguesList: { name: string, emblem: string, code: string }[]
}

const props = defineProps<LeagueSwitcherProps>()
const { leaguesList } = props;
const { leagueCode } = toRefs(props);

const emblem = computed(() => leaguesList.find(({ code }) => code === leagueCode.value)?.emblem || '');
</script>

<template>
  <div class="league text-right">
  <v-menu class="switcher text-center">
    <template v-slot:activator="{ props }">
      <v-btn
          color="transparent"
          v-bind="props"
          elevation="0"
          class="mt-1"
      >
        <span class="text-capitalize text-white">
          Switch league ▼
        </span>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
          v-for="{ code, emblem, name } in leaguesList"
          :key="code"
          :value="code"
          @click.prevent="() => $emit('switch-league', code)"
      >
        <v-list-item-title>{{ name }}</v-list-item-title>
        <v-list-item-media class="pb-2">
          <v-img :src="emblem" max-height="50"></v-img>
        </v-list-item-media>
      </v-list-item>
      <v-list-item @click.prevent="() => $emit('switch-league', '')">
        <v-list-item-title>Clear</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  <div class="selected-league" v-if="leagueCode">
    <div class="league-display pt-1">
      <v-img :src="emblem" alt="Selected league emblem" max-height="56" />
    </div>
  </div>
  </div>
</template>

<style scoped>
.league {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: #021b25;
}

.selected-league {
  position: absolute;
  top: 0;
  left: 50%;
  width: 120px;
  height: 80px;
  background-color: #021b25;
  transform: translateX(-50%);
  border-radius: 15px 15px 50% 50%;
}

.league-display {
  position: absolute;
  top: 5px;
  left: 50%;
  width: 110px;
  height: 70px;
  background-color: #ffffff;
  transform: translateX(-50%);
  border-radius: 15px 15px 50% 50%;
}

.switcher {
  padding: 15px;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
}
</style>