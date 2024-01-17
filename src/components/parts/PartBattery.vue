<template>
  <div class="battery">
    <ul
      v-if="num > 10"
      class="battery__list"
    >
      <template v-for="(int, index) in num / 10">
        <li
          :key="index"
          class="battery__item"
        />
      </template>
    </ul>
    <ul
      v-else
      class="battery__list"
    >
      <template v-for="(int, index) in num">
        <li
          :key="index"
          class="battery__item"
        />
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: {
            num: {
                type: Number,
                required: true,
            },
        },
    })
</script>

<style lang="scss" scoped>
</style>
