<template>
  <div :class="['page-dashboard page-lender-quotes', blockPreloader ? 'block-preloader' : '']">
    <div class="container lender-quotes__container">
      <BlockDashboardSidebar />
      <BlockLenderQuotes @getPreloader="setPreloader" />
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
	import BlockDashboardSidebar from '@/components/blocks/BlockDashboardSidebar.vue'
	import BlockLenderQuotes from '@/components/blocks/BlockLenderQuotes/BlockLenderQuotes.vue'

	export default Vue.extend({
		name: 'LenderQuotes',

		components: {
			BlockDashboardSidebar,
			BlockLenderQuotes,
        },

		data() {
			return {
                page: 'page-lender-quotes',
                blockPreloader: true,
			}
		},
        
        methods: {
			setPreloader(){
				setTimeout(() => {
					this.blockPreloader = false
				}, 500)
            },
        },
	})
</script>
<style lang="scss" scoped>
	.lender-quotes__container {
		@include mq($lg + 1, min) {
			max-width: 100%;
		}
	}
</style>