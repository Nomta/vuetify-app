<template>
  <div>
    <hotels-list-item v-for="hotel in hotels" :hotel="hotel" :key="hotel.id" />
  </div>
</template>

<script>
import HotelsListItem from '@/components/HotelsListItem.vue';
import { hotels } from '@/fixtures/hotels';

export default {
  name: 'HotelsList',

  components: {
    HotelsListItem,
  },

  data() {
    return {
      hotels
    }
  },
}
</script>

<style lang="scss" scoped>

</style>