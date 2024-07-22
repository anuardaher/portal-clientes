import { defineStore } from 'pinia';

import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

const clientsUrl = `${import.meta.env.VITE_API_URL}/clients`;

export interface Client {
  number: number;
  name: string;
  address: string;
  isOpen: boolean;
  loading?: boolean;
  // Add other client properties here
}

export const useDataStore = defineStore({
  id: 'data',
  state: () => ({
    loading: false,
    error: {},
    clients: [] as Client[]
  }),
  getters: {},
  actions: {
    getClients() {
      this.loading = true;
      fetchWrapper
        .get(clientsUrl)
        .then((clients) => (this.clients = clients))
        .catch((error) => (this.error = error))
        .finally(() => (this.loading = false));
    }
  }
});
