<script setup lang="ts">
import { ref } from 'vue';
import type { VDataTable } from 'vuetify/components'

import apiClient from '@/services/football-data-api';
import type { Team, TeamsData } from '@/types/types';
import FavoritesToggle from '@/components/favorites/FavoritesToggle.vue';

type VDataTableHeaders = VDataTable['headers'];

const totalItems = ref(8000);
const loading = ref(false);
const itemsPerPage = ref(10);
const teams = ref<Team[]>([]);

const headers: VDataTableHeaders = [
  {
    key: 'name',
    title: 'Name',
    sortable: false,
  },
  {
    key: 'founded',
    title: 'Founded',
    sortable: false,
    align: 'center'
  },
  {
    key: 'venue',
    title: 'Venue',
    sortable: false,
  },
  {
    key: 'favorites',
    title: '',
    sortable: false,
  },
];

const loadItems = async (options: any) => {
  loading.value = true;

  const { itemsPerPage: perPage, page } = options;
  const pageOffset = (page - 1) * perPage;

  const responseData = await apiClient.get(`teams?limit=${perPage}&offset=${pageOffset}`);
  const response: TeamsData = responseData?.data;

  const { teams: teamsData } = response;
  teams.value = teamsData;

  // TODO count form the API is not the total count of records,
  // but the count of the current result
  // const { offset, limit } = filters || {};
  // itemsPerPage.value = limit || 100;
  // totalItems.value = count;

  loading.value = false;
};
</script>

<template>
  <section>
    <v-card>
      <template v-slot:title>
        Teams
      </template>
      <template v-slot:text>
        <v-data-table-server
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items-length="totalItems"
            :items="teams"
            :loading="loading"
            item-value="name"
            @update:options="loadItems"
        >
          <template v-slot:[`item.name`]="{item}">
            <router-link class="d-flex align-center" :to="`/teams/${item.id}`">
              <div class="crest-cell">
                <v-img :max-height="30" v-if="item.crest" :src="item.crest" alt="Team's crest" />
              </div>
              <span>{{ item.name || item.shortName || '-' }}</span>
            </router-link>
          </template>
          <template v-slot:[`item.founded`]="{item}">
            <p>{{ item.founded || 'N/A' }}</p>
          </template>
          <template v-slot:[`item.venue`]="{item}">
            <p>{{ item.venue || 'N/A' }}</p>
          </template>
          <template v-slot:[`item.favorites`]="{item}">
            <favorites-toggle :id="item.id" />
          </template>
        </v-data-table-server>
      </template>
    </v-card>
  </section>
</template>
