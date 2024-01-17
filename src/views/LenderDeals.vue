<template>
	<div :class="['page-dashboard page-lender-deals', blockPreloader ? 'block-preloader' : '']">
		<div class="container lender-deals__container">
			<BlockDashboardSidebar />
			<BlockLenderDeals @getPreloader="setPreloader" />
			<BlockPopupQuoteAccepted v-if="popupOpen" />
			<BlockPopupQuoteDoesntExist v-if="DoesntExistpopupOpen" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import BlockDashboardSidebar from '@/components/blocks/BlockDashboardSidebar.vue'
import BlockLenderDeals from '@/components/blocks/BlockLenderDeals/BlockLenderDeals.vue'
import { mapState } from 'vuex'
import BlockPopupQuoteAccepted from '@/components/blocks/BlockPopup/BlockPopuQuoteAccepted.vue'
import BlockPopupQuoteDoesntExist from '@/components/blocks/BlockPopup/BlockPopupQuoteDoesntExist.vue'

export default Vue.extend({
	name: 'LenderDeals',

	components: {
		BlockDashboardSidebar,
		BlockLenderDeals,
		BlockPopupQuoteAccepted,
		BlockPopupQuoteDoesntExist,
	},

	data() {
		return {
			page: 'page-lender-deals',
			blockPreloader: true,
			popupOpen: false,
			DoesntExistpopupOpen: false,
		}
	},

	computed: {
		...mapState({
			acceptedDealRedirect: (state) => state['FilterDeal'].acceptedDealRedirect,
			dealDoesntExist: (state) => state['FilterDeal'].dealDoesntExist,
		}),
	},

	watch: {
		acceptedDealRedirect() {
			if (!this.acceptedDealRedirect) {
				this.popupOpen = false
			}
		},

		dealDoesntExist() {
			if (!this.dealDoesntExist) {
				this.DoesntExistpopupOpen = false
			}
		},
	},

	beforeMount() {
		if (this.acceptedDealRedirect) {
			this.popupOpen = true
		}

		if (this.dealDoesntExist) {
			this.DoesntExistpopupOpen = true
		}
	},

	methods: {
		setPreloader() {
			setTimeout(() => {
				this.blockPreloader = false
			}, 500)
		},
	},
})
</script>
<style lang="scss" scoped>
.lender-deals__container {
	@include mq($lg + 1, min) {
		max-width: 100%;
	}
}
</style>