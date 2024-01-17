<template>
  <div class="basic-text-wrapper">
    <div class="container">
      <h2
        v-if="data.title"
        class="basic-text__title title-big"
      >
        {{ data.title }}
      </h2>
      <div
        v-if="data.text"
        class="basic-text-content entry-content"
        v-html="data.text"
      />
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: {
			data: {
				type: Object,
				required: true,
			},
		},
    })
</script>

<style lang="scss" scoped>
    .basic-text__title {
        margin-bottom: 70px;
        text-align: center;

        @include mq($lap-l) {
            margin-bottom: 55px;
        }

        @include mq($lg) {
            margin-bottom: 40px;
        }
    }
    
</style>