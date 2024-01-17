<template>
  <div class="slider">
    <VueSlickCarousel
      :slides-to-show="4"
      :slides-to-scroll="1"
      :arrows="false"
      :adaptive-height="true"
    >
      <div
        v-for="(slide, i) in data.slides"
        :key="`slide-figure-${i}`"
        class="slider__figure"
      >
        <img
          class="slider__img"
          :src="slide"
          alt=""
        >
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import VueSlickCarousel from 'vue-slick-carousel'

	export default Vue.extend({
		components: {
			VueSlickCarousel,
		},
		props: {
			data: {
				type: Object,
				required: true,
			},
		},
	})
</script>

<style lang="scss" scoped>
	.slider {
		:deep() {
			.slick-slide > div {
				outline: 0;
			}
		}
	}

	.slider__figure,
	.slider__img {
		display: block !important;
		width: 100%;
		outline: 0;
	}
</style>
