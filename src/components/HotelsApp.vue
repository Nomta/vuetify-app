<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <hotels-filter :hotels="hotels" :limit="limit" @filter="filterHotels" />
      </v-col>
      <v-col cols="9">
        <hotels-list :hotels="filteredHotels" :limit="limit" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HotelsFilter from '@/components/HotelsFilters.vue';
import HotelsList from '@/components/HotelsList.vue';
import { hotels } from '@/fixtures/hotels';

const MAX_HOTELS_COUNT = 3

export default {
  name: 'HotelsApp',

  components: {
    HotelsFilter,
    HotelsList,
  },

  data() {
    return {
      hotels,
      filteredHotels: [...hotels],
      limit: MAX_HOTELS_COUNT
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