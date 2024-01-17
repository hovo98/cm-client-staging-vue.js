<template>
  <div class="page-ignore-deal">
    <BlockLenderIgnoreDeal />
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
	import BlockLenderIgnoreDeal from '@/components/blocks/BlockLenderDeals/BlockLenderIgnoreDeal.vue'

	export default Vue.extend({
		name: 'LenderIgnoreDeal',

		components: {
           BlockLenderIgnoreDeal,
		},

		data() {
			return {
				page: 'page-ignore-deal',
			}
		},
	})
</script>
