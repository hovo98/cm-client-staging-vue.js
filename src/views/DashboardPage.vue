<template>
  <div class="page-dashboard">
    <BlockDashboardSidebar />
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import BlockDashboardSidebar from '@/components/blocks/BlockDashboardSidebar.vue'
	export default Vue.extend({
		name: 'DashboardPage',

		components: {
            BlockDashboardSidebar,
		},

		data() {
			return {
				page: 'dashboard',
			}
		},
	})
</script>
