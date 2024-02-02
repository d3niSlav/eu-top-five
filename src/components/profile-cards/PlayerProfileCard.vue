<script setup lang="ts">

import placeholderImage from '@/assets/images/soccer-player-placeholder.jpg';
import type { Player } from '@/types/types';

interface PlayerProfileCardProps {
  player: Player;
}

const { player } = defineProps<PlayerProfileCardProps>()

const {
  name,
  nationality,
  position,
  section,
  shirtNumber,
  dateOfBirth,
  currentTeam,
} = player;
</script>

<template>
  <v-row>
    <v-col cols="2">
      <v-img :src="placeholderImage" alt="Player photo placeholder" />
    </v-col>
    <v-col cols="8">
      <p class="text-h4 mb-2">{{ name }}</p>
      <v-row>
        <v-col cols="6">
          <p class="text-body-1">
            <span>Country: </span>
            <span class="font-weight-bold">{{ nationality || '-' }}</span>
          </p>
          <p class="text-body-1">
            <span>Position: </span>
            <span class="font-weight-bold">{{ position || '-' }}</span>
          </p>
          <p class="text-body-1">
            <span>Section: </span>
            <span class="font-weight-bold">{{ section || '-' }}</span>
          </p>
          <p class="text-body-1">
            <span>Shirt number: </span>
            <span class="font-weight-bold">{{ shirtNumber || '-' }}</span>
          </p>
          <p class="text-body-1">
            <span>Date of birth: </span>
            <span class="font-weight-bold">{{ dateOfBirth || '-' }}</span>
          </p>
        </v-col>
        <v-col cols="6" v-if="currentTeam">
          <p class="text-body-1">
            <span>Current team: </span>
            <span class="font-weight-bold">
              <router-link :to="`/teams/${currentTeam.id}`">
                {{ currentTeam.name }}
              </router-link>
            </span>
          </p>
          <p class="text-body-1" v-if="currentTeam.contract">
            <span>Contract: </span>
            from
            <span class="font-weight-bold">
              {{ currentTeam.contract.start }}
            </span>
            to
            <span class="font-weight-bold">
              {{ currentTeam.contract.until }}
            </span>
          </p>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="2" v-if="currentTeam && currentTeam.crest">
      <div class="mr-5">
        <v-img :src="currentTeam.crest" alt="Player's team crest" />
      </div>
    </v-col>
  </v-row>
</template>
