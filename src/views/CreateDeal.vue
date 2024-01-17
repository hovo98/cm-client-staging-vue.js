<template>
  <div :class="['page-dashboard page-create-deal', blockPreloader ? 'block-preloader' : '']">
    <div class="row page-create-deal--row">
      <PartCreateFormSidebar
        v-if="initialReference"
        :initial-reference="initialReference"
      />
      <BlockCreateDealForm
        v-if="initialReference"
        ref="createDealForm"
        :initial-reference="initialReference"
        @command="stepperCommand"
        @forceDeal="next"
      />
      <BlockDashboardSidebar />
      <PartFormStepActions
        :show="stepVisibilityState"
        @next="next"
        @skip="skip"
        @prev="prev"
      />
    </div>
  </div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import BlockDashboardSidebar from '@/components/blocks/BlockDashboardSidebar.vue'
	import PartCreateFormSidebar from '@/components/parts/PartCreateFormSidebar.vue'
	import BlockCreateDealForm from '@/components/blocks/BlockCreateDeal/BlockCreateDealForm.vue'
	import PartFormStepActions from '@/components/parts/PartFormStepActions.vue'
	import GlobalNot from '@/services/Notification'

	export default Vue.extend({
		name: 'CreateDeal',

		components: {
			PartCreateFormSidebar,
			BlockDashboardSidebar,
			BlockCreateDealForm,
			PartFormStepActions,
		},
    //
    //
		data() {
			return {
				id: '', // str ref
				firstStep: 'propertyInfo', // str ref
				stepVisibilityState: [0,0,0], // [int] => [back,skip,next];
			}
		},
		computed: {
			initialReference() {
				return this.id
			},
      isFinished() {
        return this.$store.getters.getFinishedStatus
      },
      blockPreloader() {
        return this.$store.getters.overlay
      },
		},
		watch: {
			'$route.params.step': function (step) {
				this.id = step ?? this.firstStep

				if(this.id === this.firstStep && !this.$route.params.deal) {
					this.$store.dispatch('sidebar', {
						reference: this.id,
						stepStatus: false,
						currentStep: true,
					})
					// reset state
					this.$store.dispatch('resetFirstStep')
				}
			},
    },

    created() {
      if (this.$route.params.step) {
        this.id = this.$route.params.step
      }
    },

    async mounted() {
			if(this.$route.params.deal){
				await this.$store.dispatch('ui', {overlay: true})
				const data = await this.$store.dispatch('getDealById', {id:this.$route.params.deal})
				if(data.data.errors) {
					new GlobalNot(data.data.errors[0].debugMessage, 'error')
					this.$router.push({path: '/broker-deals'})
					return false
				}
				await this.$store.dispatch('ui', {overlay: false})
				if(this.isFinished === true && this.$route.params.step !== 'dealFinish') {
					await this.$router.push('/create-deal/dealFinish/' + this.$route.params.deal)
				}
      }

      if (this.$route.query.checkout_id) {
        await this.$store.dispatch('checkPaymentStatus', this.$route.query.checkout_id)
        // const res = await this.$store.dispatch('setBrokerFinish', false)
        await this.next()
      }

			const history = this.$store.getters.sidebarHistory
            let refe = ''
            if(history.length === 0) {
                refe = 'propertyInfo'
            } else {
                refe = history[history.length - 1]
            }
			this.id = refe
			if(this.id === this.firstStep && !this.$route.params.deal) {
				// reset state
				await this.$store.dispatch('resetFirstStep')
			} else {
				if(this.$route.params?.step && this.$route.params?.step !== 'propertyInfo') {
          if (this.$router.currentRoute.path !== '/create-deal/' + refe + '/' + this.$route.params.deal) {
						await this.$router.push('/create-deal/' + refe + '/' + this.$route.params.deal)
					}
				}
			}
		},

		methods: {
      async next() {
        await this.$store.dispatch('ui', {overlay: true})
				await this.$refs.createDealForm.handleEvent('next')
			},
      async skip() {
        await this.$store.dispatch('ui', {overlay: true})
        await this.$refs.createDealForm.handleEvent('skip')
			},
      async prev() {
        await this.$store.dispatch('ui', {overlay: true})
        await this.$refs.createDealForm.handleEvent('prev')
			},
			stepperCommand(obj) {
				if(obj.show) {
					this.stepVisibilityState = obj.show
				}
			},
		},
	})
</script>

<style lang="scss" scoped>
	.page-create-deal--row {
		align-items: stretch;
	}
</style>
