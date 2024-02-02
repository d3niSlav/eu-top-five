<script setup lang="ts">
import type { Coach } from '@/types/types';
import coachPlaceholder from '@/assets/images/coach-placeholder.svg';

interface CoachProfileCardProps {
  coach: Coach;
}

const { coach } = defineProps<CoachProfileCardProps>()

const {
  name,
  nationality,
  contract,
  dateOfBirth,
} = coach;
</script>

<template>
  <v-row>
    <v-col cols="2">
      <v-img :src="coachPlaceholder"/>
    </v-col>
    <v-col cols="8">
      <p class="text-h4 mb-2">{{ name }}</p>
      <p class="text-body-1">
        <span>Nationality: </span>
        <span class="font-weight-bold">{{ nationality }}</span>
      </p>
      <p class="text-body-1">
        <span>Contract: </span>
        <span class="font-weight-bold">{{ contract.start }} - {{
            contract.until
          }}</span>
      </p>
      <p class="text-body-1">
        <span>Date of birth: </span>
        <span class="font-weight-bold">{{ dateOfBirth }}</span>
      </p>
    </v-col>
  </v-row>
</template>
