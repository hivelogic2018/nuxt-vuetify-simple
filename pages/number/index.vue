<template>
  <div>
    <p>Number: <span> {{ num }}</span></p>
    <button @click="refreshNum">Refresh</button>
  </div>
</template>

<script lang="ts" setup>
  const num = useState<number>('num', () => Math.floor(Math.random() * 100));
  const refreshNum = () => {
    num.value = Math.floor(Math.random() * 100);
  };
</script>