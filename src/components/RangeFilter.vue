<template>
  <div>
    <v-row class="mb-n6">
      <v-col>
        <v-text-field :value="from" readonly outlined dense />
      </v-col>
      <v-col class="flex-grow-0"> _ </v-col>
      <v-col>
        <v-text-field :value="to" readonly outlined dense />
      </v-col>
    </v-row>

    <v-range-slider v-model="range" :min="min" :max="max" thumb-label :color="color" track-color="gray" />
  </div>
</template>

<script>
export default {
  name: 'RangeFilter',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      required: true
    },
    value: Array,
    color: String,

    /* Array with one or two functions to format values from - to  */
    formatters: Array
  },

  computed: {
    from() {
      return this.formatters?.[0]?.(this.range[0]) || this.range[0]
    },
    to() {
      return (this.formatters?.[1] || this.formatters?.[0])?.(this.range[1]) || this.range[1]
    },
    range: {
      get() {
        const from = this.value?.[0] || this.min
        const to = this.value?.[1] || this.max

        return [from, to]
      },
      set(value) {
        this.$emit('change', value)
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>