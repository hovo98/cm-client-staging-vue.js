<template>
  <div class="page-404">
    <BlockNotFound />
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import BlockNotFound from '@/components/blocks/BlockNotFound.vue'

	export default Vue.extend({
		name: '404Page',

		components: {
            BlockNotFound,
		},
	})
</script>

