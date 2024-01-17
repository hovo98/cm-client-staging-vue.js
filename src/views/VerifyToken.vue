<template>
  <div class="page-verify-token">
    <BlockResetPassword />
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import BlockResetPassword from '@/components/blocks/BlockLogin/BlockVerifyToken.vue'
	export default Vue.extend({
		name: 'VerifyToken',

		components: {
            BlockResetPassword,
		},

		data() {
			return {
				page: 'page-verify-token',
			}
		},
	})
</script>
