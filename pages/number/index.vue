<template>
  <div>
    <v-container>
      <p>Number: <span> {{ num }}</span></p>
      <v-btn @click="refreshNum">Refresh</v-btn>
      <v-btn color="primary" text="Vuetify Button"></v-btn>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
  const num = useState<number>('num', () => Math.floor(Math.random() * 100));
  const refreshNum = () => {
    num.value = Math.floor(Math.random() * 100);
  };
</script>