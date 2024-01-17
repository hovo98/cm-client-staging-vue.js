<template>
  <div class="page-contact">
    <BlockContactForm />
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import BlockContactForm from '@/components/blocks/BlockContactForm.vue'

	export default Vue.extend({
		name: '404Page',

		components: {
            BlockContactForm,
		},

		data() {
			return {
				page: 'contact',
			}
		},
	})
</script>

<style lang="scss" scoped>
	.logged-in .page-contact {
		margin-top: 120px;
	}
</style>
