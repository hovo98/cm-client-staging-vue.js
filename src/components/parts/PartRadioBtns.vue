<template>
  <div class="radio-btns">
    <ul class="radio-btns__list">
      <template v-for="(btn, index) in radioBtns">
        <li
          :key="index"
          class="radio-btns__list-item input-holder"
        >
          <label
            :for="`btn-date-${index}`"
            class="radio-btn"
          >
            <input
              :id="`btn-date-${index}`"
              type="radio"
              name="date-option"
            >
            <span
              class="radio-btn-text"
              v-html="btn"
            />
          </label>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: ['radioBtns'],
    })
</script>

<style lang="scss" scoped>
    .radio-btns__list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .radio-btns__list-item {
        width: 47%;
        margin-bottom: 12px;

        @include mq($sm) {
            min-width: 110px;
        }
    }
</style>
