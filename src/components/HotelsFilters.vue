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
      <span class="subtitle-2">Цена</span> {{ pricesRange }}
      <range-filter v-model="pricesRange" :max="prices.max" color="teal" />
    </div>

    <div>
      <span class="subtitle-2">Цена до</span>
      <v-slider v-model="filters.maxPrice" :max="prices.max" thumb-label color="teal" track-color="teal" />
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
import RangeFilter from '@/components/RangeFilter';
import { CountFormatter } from '@/utils/CountFormatter'

const defaultFilters = {
  country: '',
  types: [],
  starsAmount: [],
  reviewsAmount: null,
  maxPrice: null,
}
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
  },

  data() {
    return {
      filters: { ...defaultFilters },
      pricesRange: [0, 4000]
    }
  },

  computed: {
    prices() {
      const prices = this.hotels.map((hotel) => hotel.min_price)
      return {
        // min: Math.min(...prices),
        max: Math.max(...prices)
      }
    },
    // filteredHotels() {
    //   return this.filterHotels()
    // }
  },

  // watch: {
  //   filteredHotels: {
  //     deep: true,
  //     handler(value) {
  //       this.$emit('filter', value)
  //     }
  //   }
  // },

  methods: {
    applyFilters() {
      this.$emit('filter', this.filterHotels())
    },
    resetFilters() {
      this.filters = { ...defaultFilters }
      this.$emit('filter', [...this.hotels])
    },
    filterHotels() {
      return this.hotels.filter((hotel) => {
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
        if (this.filters.maxPrice && hotel.min_price > this.filters.maxPrice) {
          return false
        }
        return true
      })
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