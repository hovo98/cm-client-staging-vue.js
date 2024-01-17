<template>
  <div class="cd-form">
    <PartCreateFormProgressBar
      :reference="initialReference"
    />
    <div class="cd-form__wrapper">
      <BlockCreateDealPropertyInfo
        v-if="isActiveReference('propertyInfo')"
        ref="propertyInfo"
        next-action="dealLoanType"
        skip-action="dealLoanType"
        :deal-i-d="dealID"
      />
      <BlockCreateDealLoanType
        v-if="isActiveReference('dealLoanType')"
        ref="dealLoanType"
        prev-action="propertyInfo"
        :deal-i-d="dealID"
      />
      <BlockCreateDealLoanTypePurchase
        v-if="isActiveReference('dealLoanTypePurchase')"
        ref="dealLoanTypePurchase"
        next-action="dealPropertyType"
        prev-action="dealLoanType"
        skip-action="dealPropertyType"
        :deal-i-d="dealID"
      />
      <BlockCreateDealPropertyType
        v-if="isActiveReference('dealPropertyType')"
        ref="dealPropertyType"
        prev-action="dealLoanTypePurchase"
        :deal-i-d="dealID"
      />
      <BlockCreateDealLoanTypeRefinance
        v-if="isActiveReference('dealLoanTypeRefinance')"
        ref="dealLoanTypeRefinance"
        next-action="dealLoanExisting"
        prev-action="dealLoanType"
        skip-action="dealLoanExisting"
        :deal-i-d="dealID"
      />
      <BlockCreateDealLoanExisting
        v-if="isActiveReference('dealLoanExisting')"
        ref="dealLoanExisting"
        prev-action="dealLoanTypeRefinance"
        :deal-i-d="dealID"
      />
      <BlockCreateDealLoanTypeConstruction
        v-if="isActiveReference('dealLoanTypeConstruction')"
        ref="dealLoanTypeConstruction"
        next-action="dealPropertyTypeConstruction"
        prev-action="dealLoanType"
        skip-action="dealPropertyTypeConstruction"
        :deal-i-d="dealID"
      />

      <BlockCreateDealSponsor
        v-if="isActiveReference('dealSponsor')"
        ref="dealSponsor"
        next-action="dealFinishManagePriority"
        prev-action="dealPropertyExpenses"
        skip-action="dealFinishManagePriority"
        :deal-i-d="dealID"
      />
      <BlockCreateDealPropertyTypeInvestment
        v-if="isActiveReference('dealPropertyTypeInvestment')"
        ref="dealPropertyTypeInvestment"
        next-action="dealPropertyIncome"
        prev-action="dealPropertyType"
        skip-action="dealPropertyIncome"
        :deal-i-d="dealID"
      />
      <BlockCreateDealFinishManagePriority
        v-if="isActiveReference('dealFinishManagePriority')"
        ref="dealFinishManagePriority"
        next-action="dealFinishDealSummary"
        prev-action="dealSponsor"
        skip-action="dealFinishDealSummary"
        :deal-i-d="dealID"
      />

      <BlockCreateDealPropertyIncome
        v-if="isActiveReference('dealPropertyIncome')"
        ref="dealPropertyIncome"
        next-action="dealPropertyExpenses"
        prev-action="dealPropertyTypeInvestment"
        skip-action="dealPropertyExpenses"
        :deal-i-d="dealID"
      />
      <BlockCreateDealPropertyTypeOwnerOccupied
        v-if="isActiveReference('dealPropertyTypeOwnerOccupied')"
        ref="dealPropertyTypeOwnerOccupied"
        next-action="dealPropertyExpenses2"
        prev-action="dealPropertyType"
        skip-action="dealPropertyExpenses2"
        :deal-i-d="dealID"
      />
      <BlockCreateDealPropertyTypeConstruction
        v-if="isActiveReference('dealPropertyTypeConstruction')"
        ref="dealPropertyTypeConstruction"
        next-action="dealPropertyExpenses2"
        prev-action=""
        skip-action="dealPropertyExpenses2"
        :deal-i-d="dealID"
      />
      <BlockCreateDealPropertyExpenses
        v-if="isActiveReference('dealPropertyExpenses')"
        ref="dealPropertyExpenses"
        next-action="dealSponsor"
        prev-action=""
        skip-action="dealSponsor"
        :deal-i-d="dealID"
      />
      <BlockCreateDealPropertyExpenses2
        v-if="isActiveReference('dealPropertyExpenses2')"
        ref="dealPropertyExpenses2"
        next-action="dealSponsor"
        prev-action=""
        skip-action="dealSponsor"
        :deal-i-d="dealID"
      />

      <BlockCreateDealFinishDealSummary
        v-if="isActiveReference('dealFinishDealSummary')"
        ref="dealFinishDealSummary"
        next-action="dealFinishManageLenders"
        prev-action="dealFinishManagePriority"
        skip-action="dealFinishManageLenders"
        :deal-i-d="dealID"
      />
      <BlockCreateDealFinishManageLenders
        v-if="isActiveReference('dealFinishManageLenders')"
        ref="dealFinishManageLenders"
        next-action="dealFinish"
        prev-action="dealFinishDealSummary"
        skip-action="dealFinish"
        :deal-i-d="dealID"
        @forceDeal="$emit('forceDeal')"
      />
      <BlockCreateDealFinish
        v-if="isActiveReference('dealFinish')"
        ref="dealFinish"
        next-action=""
        prev-action="dealFinishManageLenders"
        skip-action=""
        :deal-i-d="dealID"
      />
    </div>
  </div>
</template>


<script lang="ts">

    import Vue from 'vue'
    import BlockCreateDealPropertyInfo from '@/components/blocks/BlockCreateDeal/BlockCreateDealPropertyInfo.vue'
    import BlockCreateDealLoanType from '@/components/blocks/BlockCreateDeal/BlockCreateDealLoanType.vue'
    import PartCreateFormProgressBar from '@/components/parts/PartCreateFormProgressBar.vue'
    import BlockCreateDealLoanTypePurchase from '@/components/blocks/BlockCreateDeal/BlockCreateDealLoanTypePurchase.vue'
    import BlockCreateDealLoanTypeRefinance from '@/components/blocks/BlockCreateDeal/BlockCreateDealLoanTypeRefinance.vue'
    import BlockCreateDealLoanTypeConstruction from '@/components/blocks/BlockCreateDeal/BlockCreateDealLoanTypeConstruction.vue'
    import BlockCreateDealPropertyType from '@/components/blocks/BlockCreateDeal/BlockCreateDealPropertyType.vue'
    import BlockCreateDealPropertyTypeInvestment from '@/components/blocks/BlockCreateDeal/BlockCreateDealPropertyTypeInvestment.vue'
    import BlockCreateDealPropertyTypeOwnerOccupied from '@/components/blocks/BlockCreateDeal/BlockCreateDealPropertyTypeOwnerOccupied.vue'
    import BlockCreateDealPropertyTypeConstruction from '@/components/blocks/BlockCreateDeal/BlockCreateDealPropertyTypeConstruction.vue'
    import BlockCreateDealPropertyExpenses from '@/components/blocks/BlockCreateDeal/BlockCreateDealPropertyExpenses.vue'
    import BlockCreateDealPropertyExpenses2 from '@/components/blocks/BlockCreateDeal/BlockCreateDealPropertyExpenses2.vue'
    import BlockCreateDealPropertyIncome from '@/components/blocks/BlockCreateDeal/BlockCreateDealPropertyIncome.vue'
    import BlockCreateDealSponsor from '@/components/blocks/BlockCreateDeal/BlockCreateDealSponsor.vue'
    import BlockCreateDealLoanExisting from '@/components/blocks/BlockCreateDeal/BlockCreateDealLoanExisting.vue'
    import BlockCreateDealFinish from '@/components/blocks/BlockCreateDeal/BlockCreateDealFinish.vue'
    import BlockCreateDealFinishDealSummary from '@/components/blocks/BlockCreateDeal/BlockCreateDealFinishDealSummary.vue'
    import BlockCreateDealFinishManagePriority from '@/components/blocks/BlockCreateDeal/BlockCreateDealFinishManagePriority.vue'
    import BlockCreateDealFinishManageLenders from '@/components/blocks/BlockCreateDeal/BlockCreateDealFinishManageLenders.vue'
    import Deal from '@/services/Deal'



    interface Data {
        activeReference,
    }

    export default Vue.extend({

        components: {
            BlockCreateDealPropertyInfo,
            PartCreateFormProgressBar,
            BlockCreateDealLoanType,
            BlockCreateDealLoanTypePurchase,
            BlockCreateDealLoanTypeRefinance,
            BlockCreateDealLoanTypeConstruction,
            BlockCreateDealPropertyType,
            BlockCreateDealPropertyTypeInvestment,
            BlockCreateDealPropertyTypeOwnerOccupied,
            BlockCreateDealPropertyTypeConstruction,
            BlockCreateDealSponsor,
            BlockCreateDealPropertyExpenses,
            BlockCreateDealPropertyExpenses2,
            BlockCreateDealLoanExisting,
            BlockCreateDealPropertyIncome,
            BlockCreateDealFinish,
            BlockCreateDealFinishDealSummary,
            BlockCreateDealFinishManagePriority,
            BlockCreateDealFinishManageLenders,
        },
        props: {
            initialReference: {
                type: String,
                required: true,
            },
        },

        data(): Data {
            return {
                activeReference: false,
            }
        },

      computed: {
        prevRef() {
          let ref = this.$store.getters.sidebarHistory.length > 0 ? this.$store.getters.sidebarHistory[this.$store.getters.sidebarHistory.length-1] : false
          if(ref === this.initialReference) {
            return this.$store.getters.sidebarHistory.length > 0 ? this.$store.getters.sidebarHistory[this.$store.getters.sidebarHistory.length-2] : false
          }
          return ref
        },
        dealID() {
          // eslint-disable-next-line no-mixed-spaces-and-tabs
          return this.$store.getters.getId
        },
        urlID() {
          const url = !this.dealID ? '' : '/' + this.dealID
          return url
        },
      },
        watch: {
			'initialReference': function () {
                this.setStepperButtonsState()
			},
		},

        mounted() {
            const history = this.$store.getters.sidebarHistory
            let refe = ''

            window.onpopstate = function() {
                location.reload()
            }

            if(history.length === 0) {
                refe = 'propertyInfo'
            } else {
                refe = history[history.length - 1]
            }
            this.$store.dispatch('sidebar', {
                reference: refe,
                stepStatus: false,
                currentStep: true,
            })
            this.setStepperButtonsState()
            this.$store.dispatch('removeAllDeals')

        },

		methods: {
            // () => event => command => obj
            setStepperButtonsState() {
                // id => [back,skip,next]
                const a = [1,0,1]
                const b = [1,0,1]
                const c = [0,0,1]
                const d = [0,0,0]
                let stepperButtonsVisibilityState = b
                if(this.initialReference === 'propertyInfo') {
                    stepperButtonsVisibilityState = c
                }
                if(this.initialReference === 'dealLoanType') {
                  stepperButtonsVisibilityState = a
                }
                if(this.initialReference === 'dealLoanExisting') {
                  stepperButtonsVisibilityState = a
                }
                if(this.initialReference === 'dealFinish') {
                    stepperButtonsVisibilityState = b
                }
                if(this.initialReference === 'dealFinishManageLenders') {
                    stepperButtonsVisibilityState = a
                }
                if(this.initialReference === 'dealFinishDealSummary') {
                  stepperButtonsVisibilityState = a
                }
                if(this.initialReference === 'dealPropertyType') {
                  stepperButtonsVisibilityState = a
                }
                if(this.initialReference === 'dealFinish') {
                  stepperButtonsVisibilityState = d
                }
                this.$emit('command', { show: stepperButtonsVisibilityState })
            },

            //
          async handleEvent(event) {
              const command = Deal.stepper.command
              const cmd = command(this.$refs[this.initialReference])
              const nextCommand = cmd('next')
              const prevCommand = cmd('prev')
              const skipCommand = cmd('skip')
              const payload = (ref, prevRef, stepStatus) => {
                  const p = {
                      reference: ref,
                      stepStatus: false,
                      currentStep: true,
                      openSidebar: true,
                      prevRef: prevRef,
                      prevRefStepStatus: !!stepStatus,
                  }
                  return p
              }
              if(event === 'prev') await prevCommand.run(async (ref, isCompleted) => {
                const path = '/create-deal/' + this.prevRef + this.urlID
                if(this.prevRef) {
                  await this.$store.dispatch('sidebar', payload(this.prevRef, ref, isCompleted))
                  await this.$router.push({ path: path})
                }
              })
              if(event === 'skip') await skipCommand.run(async (ref, isCompleted) => {
                await this.$store.dispatch('sidebar', payload(ref, this.initialReference, isCompleted))
                await this.$router.push({ path: '/create-deal/' + ref + this.urlID})
              })
              if (event === 'next') {
                await nextCommand.run(async (ref, isCompleted) => {
                  await this.$store.dispatch('sidebar', payload(ref, this.initialReference, isCompleted))
                  await this.$router.push({ path: '/create-deal/' + ref + this.urlID})
                }, async () => {
                  await this.$store.dispatch('ui', {overlay: false})
                })
              }
            },
			isActiveReference(reference) {
				return this.initialReference === reference
            },
        },
    })
</script>

<style lang="scss" scoped>
    .cd-form {
        background-color: $white;
        padding: 28px 60px;
        flex: 0 0 calc(77.8% - 30px);
        min-width: calc(77.8% - 30px);

        @include mq($lap-l) {
            padding: 28px 40px;
        }

        @include mq($lg) {
            flex: 0 0 100%;
            min-width: 100%;
            padding: 20px 30px;
        }
    }

    .cd-form-inner {
        width: 100%;
        // max-width: 650px;
    }

    .crd-sidebar-holder[initialreference="dealFinishManageLenders"] + .cd-form {
        .cd-form-inner {
            width: 100%;
            max-width: 100%;
        }
    }

    .cd-form-inner--full {
        max-width: 100%;
    }
</style>
