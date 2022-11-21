<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <hotels-filter :hotels="hotels" @filter="filterHotels" />
      </v-col>
      <v-col cols="9">
        <hotels-list :hotels="filteredHotels" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HotelsFilter from '@/components/HotelsFilters.vue';
import HotelsList from '@/components/HotelsList.vue';
import { hotels } from '@/fixtures/hotels';

export default {
  name: 'HotelsApp',

  components: {
    HotelsFilter,
    HotelsList,
  },

  data() {
    return {
      hotels,
      filteredHotels: [...hotels]
    }
  },

  methods: {
    filterHotels(value) {
      this.filteredHotels = value;
    }
  },
}
</script>

<style lang="scss" scoped>

</style>