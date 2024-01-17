<template>
  <div :class="['page-dashboard page-broker-deals', blockPreloader ? 'block-preloader' : '']">
    <div class="container broker-deals__container">
      <BlockDashboardSidebar />
      <BlockBrokerDeals @getPreloader="setPreloader" />
      <BlockPopupQuoteDoesntExist v-if="DoesntExistpopupOpen" />
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
	import BlockDashboardSidebar from '@/components/blocks/BlockDashboardSidebar.vue'
	import BlockBrokerDeals from '@/components/blocks/BlockBrokerDeals/BlockBrokerDeals.vue'
	import BlockPopupQuoteDoesntExist from '@/components/blocks/BlockPopup/BlockPopupQuoteDoesntExist.vue'
	import { mapState } from 'vuex'
	export default Vue.extend({
		name: 'BrokerDeals',

		components: {
			BlockDashboardSidebar,
			BlockBrokerDeals,
			BlockPopupQuoteDoesntExist,
        },

		data() {
			return {
                page: 'page-broker-deals',
                blockPreloader: true,
				DoesntExistpopupOpen: false,
			}
		},

		computed: {
			...mapState({
				dealDoesntExist: (state) => state['FilterDeal'].dealDoesntExist,
			}),
		},

		watch: {
			dealDoesntExist() {
				if(!this.dealDoesntExist) {
					this.DoesntExistpopupOpen = false
				}
			},
		},

		beforeMount(){
			if(this.dealDoesntExist) {
				this.DoesntExistpopupOpen = true
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
	.broker-deals__container {
		@include mq($lg + 1, min) {
			max-width: 100%;
		}
	}
</style>