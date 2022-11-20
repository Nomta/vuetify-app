<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <hotels-filter />
      </v-col>
      <v-col cols="8">
        <hotels-list />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HotelsFilter from '@/components/HotelsFilter.vue';
import HotelsList from '@/components/HotelsList.vue';

export default {
  name: 'HotelsApp',

  components: {
    HotelsFilter,
    HotelsList,
  }
}
</script>

<style lang="scss" scoped>

</style>