<template>
  <v-card class="mb-5">
    <v-row>
      <v-col cols="8">
        <v-card-title>{{ hotel.name }}</v-card-title>
        <v-card-text class="d-flex">
          <v-rating :value="hotel.stars" color="amber" background-color="grey lighten-2" empty-icon="mdi-star" dense
            size="18" class="mt-n1" />
          <span class="ml-2 nowrap text-caption grey--text">{{ hotel.type }}</span>
          <span class="ml-2 nowrap text-caption grey--text">{{ reviewsAmount }}</span>
          <span class="ml-2 nowrap text-caption">
            <v-icon dense small class="mt-n1">mdi-map-marker-outline</v-icon>
            {{ hotel.country }}
          </span>
        </v-card-text>
      </v-col>
      <v-col cols="4">
        <v-card-text>
          <div class="price nowrap mb-2 text-center text-sm-right">{{ price }} &#8381;</div>
          <div class="text-caption nowrap grey--text text-center text-sm-right">
            Цена за 1 ночь
          </div>
        </v-card-text>
      </v-col>
    </v-row>
    <v-row class="mt-n8">
      <v-col cols="8">
        <v-card-text>{{ hotel.description }}</v-card-text>
      </v-col>
      <v-col cols="4" align-self="end">
        <v-card-actions class="d-flex justify-end mb-2">
          <component :is="currentActionBtn" />
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { CountFormatter } from '@/utils/CountFormatter'

const reviewFormatter = new CountFormatter(['отзыв', 'отзыва', 'отзывов'])


export default {
  name: 'HotelsListItem',
  components: {
    BookBtn: () => import('@/components/BookBtn.vue'),
    BookedBtn: () => import('@/components/BookedBtn.vue'),
  },
  props: {
    hotel: Object
  },
  computed: {
    price() {
      return Math.floor(this.hotel.min_price)
    },
    reviewsAmount() {
      return reviewFormatter.count(this.hotel.reviews_amount)
    },
    currentActionBtn() {
      return "book-btn"
    }
  },
}
</script>

<style lang="scss" scoped>
.price {
  display: block;
  font-size: 1.75rem;
  font-weight: bold;
}
</style>