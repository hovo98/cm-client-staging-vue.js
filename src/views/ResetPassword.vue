<template>
  <div class="page-reset-password">
    <BlockResetPassword />
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import BlockResetPassword from '@/components/blocks/BlockLogin/BlockResetPassword.vue'
	export default Vue.extend({
		name: 'ResetPassword',

		components: {
            BlockResetPassword,
		},

		data() {
			return {
				page: 'page-reset-password',
			}
		},
	})
</script>
