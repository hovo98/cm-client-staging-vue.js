<template>
  <div class="page-login">
    <BlockLoginForm />
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import BlockLoginForm from '@/components/blocks/BlockLogin/BlockLoginForm.vue'

	export default Vue.extend({
		name: 'LoginPage',

		components: {
            BlockLoginForm,
		},

		data() {
			return {
				page: 'login',
			}
		},
	})
</script>
