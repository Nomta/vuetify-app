<template>
  <v-app>
    <v-main>
      <hotels-app />
    </v-main>
  </v-app>
</template>

<script>
import HotelsApp from './components/HotelsApp';

export default {
  name: 'App',

  components: {
    HotelsApp,
  }
}
</script>
