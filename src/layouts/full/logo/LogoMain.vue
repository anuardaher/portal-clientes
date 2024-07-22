<script setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const { firstName, image } = authStore.user ?? {};

</script>
<template>
  <div class="d-flex flex-column justify-center align-center ga-3">
      <v-avatar v-if="image" :image="image" size="80"></v-avatar>
      <v-avatar v-else size="80" color="primary"><CameraIcon/></v-avatar>

      <h3 class="text-h3">{{ firstName }}</h3>
      <v-btn size="small" color="primary" variant="outlined">Editar</v-btn>
  </div>
</template>
