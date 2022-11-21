<template>
  <div v-if="hotels?.length">
    <hotels-list-item v-for="hotel in hotelsSlice" :hotel="hotel" :key="hotel.id" />
  </div>
  <div v-else class="d-flex flex-column align-center">
    <v-img :src="NotFoundImage" width="238" height="181" />
    <span class="title">Записей не найдено</span>
  </div>
</template>

<script>
import HotelsListItem from '@/components/HotelsListItem.vue'
import NotFoundImage from '@/assets/NotFound.png'

const MAX_HOTELS_COUNT = 3

export default {
  name: 'HotelsList',

  components: {
    HotelsListItem,
  },

  props: {
    hotels: {
      type: Array,
      default: null
    },
  },

  data() {
    return {
      NotFoundImage,
    }
  },

  computed: {
    hotelsSlice() {
      return this.hotels.slice(0, MAX_HOTELS_COUNT)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>