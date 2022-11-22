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
    limit: Number
  },

  data() {
    return {
      NotFoundImage,
    }
  },

  computed: {
    hotelsSlice() {
      if (this.limit && this.hotels.length > this.limit) {
        return this.hotels.slice(0, this.limit)
      }
      return this.hotels
    }
  },
}
</script>

<style lang="scss" scoped>

</style>