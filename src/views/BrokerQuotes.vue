<template>
  <div :class="['page-dashboard page-broker-quotes', blockPreloader ? 'block-preloader' : '']">
    <div class="container broker-quotes__container">
      <BlockDashboardSidebar />
      <BlockBrokerQuotes @getPreloader="setPreloader" />
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import BlockDashboardSidebar from '@/components/blocks/BlockDashboardSidebar.vue'
    import BlockBrokerQuotes from '@/components/blocks/BlockBrokerQuotes/BlockBrokerQuotes.vue'

	export default Vue.extend({ 
		name: 'BrokerQuotes',

		components: {
            BlockDashboardSidebar,
            BlockBrokerQuotes,
        },

		data() {
			return {
                page: 'page-broker-quotes',
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
	.broker-quotes__container {
		@include mq($lg + 1, min) {
			max-width: 100%;
		}
	}
</style>