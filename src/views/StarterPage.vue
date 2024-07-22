<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useRoute } from 'vue-router';

import { computed, ref } from 'vue';

import { useDataStore } from '@/stores/data';
import { storeToRefs } from 'pinia';

const route = useRoute();
const pageTitle = computed(() => route.name?.toString() || '');

const dataStore = useDataStore();
const { clients, loading } = storeToRefs(dataStore);
await dataStore.getClients();

// Pagination
const page = ref(1);
const pageTotal = computed(() => Math.ceil(clients.value.length / clientsPerPage));
const clientsPerPage = 7;
const clientsList = computed(() => {
  const start = (page.value - 1) * clientsPerPage;
  const end = start + clientsPerPage;
  return clients.value.slice(start, end);
});
</script>

<template>
  <v-row>
    <v-col v-if="loading">
      <v-progress-linear indeterminate color="primary"></v-progress-linear>
    </v-col>
    <v-col v-else cols="12" md="12">
      <UiParentCard :title="pageTitle">
        <template v-slot:action>
          <div class="pa-1 d-flex ga-4 align-center">
            <v-btn color="primary"> Perfil </v-btn>
            <v-btn icon color="lightprimary">
              <SettingsIcon size="20" />
            </v-btn>
          </div>
        </template>

        <v-list lines="three" item-props>
          <v-list-item v-for="client in clientsList" :key="client.name" :subtitle="client.address">
            <template v-slot:title>
              <v-list-item-subtitle> {{ client.number }} </v-list-item-subtitle>
              <v-divider class="my-1 mr-12"></v-divider>
              <v-list-item-title>{{ client.name }}</v-list-item-title>
            </template>

            <template v-slot:append>
              <v-btn icon :color="client.isOpen ? 'success' : 'error'">
                <LockOpenIcon v-if="client.isOpen" size="20" />
                <LockIcon v-else size="20" />
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
        <v-pagination :length="pageTotal" v-model="page"></v-pagination>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
