<template>
  <div>
    <div>
      <span class="subtitle-2">Страна</span>
      <v-autocomplete v-model="filters.country" :items="hotels" item-text="country" dense outlined
        placeholder="Поиск стран" prepend-inner-icon="mdi-magnify" />
    </div>

    <div>
      <span class="subtitle-2">Тип</span>
      <v-select v-model="filters.types" :items="hotels" item-text="type" placeholder="Тип" dense outlined multiple />
    </div>

    <div>
      <span class="subtitle-2">Количество звезд</span>
      <fieldset class="d-block px-2 pb-2 outlined rounded">
        <v-checkbox v-for="amount in 5" v-model="filters.starsAmount" :label="countStars(amount)" :value="amount"
          :key="amount" hide-details color="teal" />
      </fieldset>
    </div>

    <div class="d-block mt-6">
      <span class="subtitle-2">Количество отзывов (от)</span>
      <v-numeric outlined v-model="filters.reviewsAmount" dense :min="0" :use-grouping="false" />
    </div>

    <div>
      <span class="subtitle-2">Цена</span>
      <range-filter v-model="filters.pricesRange" :max="prices.max" :formatters="formatters" color="teal" />
    </div>

    <div class="d-flex flex-column align-stretch">
      <v-btn @click="applyFilters" depressed class="mb-2 deep-purple darken-3 white--text">
        Применить фильтр
      </v-btn>
      <v-btn @click="resetFilters" depressed outlined color="grey">
        <v-icon left>mdi-close</v-icon>
        Очистить фильтр
      </v-btn>
    </div>
  </div>
</template>

<script>
import { inRange } from 'lodash';
import { CountFormatter } from '@/utils/CountFormatter'
import RangeFilter from '@/components/RangeFilter';

const defaultFilters = {
  country: '',
  types: [],
  starsAmount: [],
  reviewsAmount: null,
  pricesRange: [],
}

const formatters = [
  (value) => `от ${value} ₽`,
  (value) => `до ${value} ₽`
]
const reviewFormatter = new CountFormatter(['звезда', 'звезды', 'звезд'])

export default {
  name: 'HotelsFilter',

  components: {
    RangeFilter,
  },

  props: {
    hotels: {
      type: Array,
      default: () => []
    },
    limit: Number
  },

  data() {
    return {
      filters: { ...defaultFilters },
      formatters
    }
  },

  computed: {
    prices() {
      const prices = this.hotels.map((hotel) => hotel.min_price)
      return {
        min: Math.min(...prices),
        max: Math.max(...prices)
      }
    },
  },

  methods: {
    applyFilters() {
      this.$emit('filter', this.filterHotels())
    },
    resetFilters() {
      this.filters = { ...defaultFilters }
      this.$emit('filter', this.hotels)
    },
    filterHotels() {
      const hotels = []
      const limit = this.limit || this.hotels.length
      let i = 0

      /* filter until get the right amount */
      while (i < this.hotels.length && hotels.length < limit) {
        const hotel = this.hotels[i]

        if (this.filterHotel(hotel)) {
          hotels.push(hotel)
        }
        i++
      }

      return hotels
    },
    filterHotel(hotel) {
      if (this.filters.country && hotel.country !== this.filters.country) {
        return false
      }
      if (this.filters.types.length && !this.filters.types.includes(hotel.type)) {
        return false
      }
      if (this.filters.starsAmount.length && !this.filters.starsAmount.includes(hotel.stars)) {
        return false
      }
      if (this.filters.reviewsAmount && hotel.reviews_amount < this.filters.reviewsAmount) {
        return false
      }
      if (this.filters.pricesRange.length && !inRange(hotel.min_price, ...this.filters.pricesRange)) {
        return false
      }
      return true
    },
    countStars(amount) {
      return reviewFormatter.count(amount)
    }
  },
}
</script>

<style lang="scss" scoped>
.outlined {
  border: 1px solid #BDBDBD;

  &:hover {
    border-color: gray;
  }
}
</style>