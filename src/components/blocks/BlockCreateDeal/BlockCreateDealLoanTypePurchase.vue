<template>
  <div class="cd-form-inner">
    <PartPurchaseForm
      ref="purchaseForm"
      @changeform="changeform"
    />
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import PartPurchaseForm from '@/components/parts/PartPurchaseForm.vue'

    interface Data {
        title: string
        change: boolean
    }

    export default Vue.extend({

        components: {
            PartPurchaseForm,
        },
        props: {
            dealID: {
                type: Number,
                default: 0,
            },
            nextAction: {
                type: String,
                default: '',
            },
            prevAction: {
                type: String,
                default: '',
            },
            skipAction: {
                type: String,
                default: '',
            },
        },

        data(): Data {
            return {
                title: 'This is title of "BlockCreateDealLoanTypePurchase"!',
                change: false,
            }
        },

      mounted() {
        this.$store.dispatch('ui', {overlay: false})
      },

        methods: {
            async next() {
                const valid = await this.$refs.purchaseForm.formValidation()

                if (!valid) {
                    return
                }
                if (this.change){
                    await this.$store.dispatch('setBrokerDealPurchase', this.$refs.purchaseForm.createObject())

                    return this.nextAction
                } else {
                    const valid = await this.$refs.purchaseForm.typeCheck()
                    if(valid) {
                        return this.nextAction
                    }
                }
            },
            skip() {
                return this.skipAction
            },
            prev() {
                return this.prevAction
            },

            /** on change form field set tu true */
            changeform(){
                this.change = true
            },
        },
    })
</script>

<style lang="scss" scoped>
</style>
