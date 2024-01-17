<template>
  <div class="cq-form-inner">
    <div class="cq-form-inner form-highlight">
      <div class="error-message-holder">
        <h3 class="dash-title cq--title">The broker is requesting ${{ formatDollars(initialValueFormatted) }} for a <span class="">{{ loan_type.charAt(0).toUpperCase() + loan_type.slice(1).toLowerCase() }}</span> loan. <br>What terms would you like to offer? *</h3>
        <label class="dash-subtitle">The lesser of:</label>
        <div class="input-holder">
          <label class="input-label">Dollar Amount</label>
          <div class="input-holder--with-placeholder">
            <input
              v-model="offerAmount"
              v-currency="{
                locale: 'en',
                currency: null,
                valueAsInteger: true,
                distractionFree: false,
                precision: 0,
                autoDecimalMode: true,
                valueRange: { min: 0 },
                allowNegative: false,
                valueRange: {min: 0, max: initialValue}
              }"
              @change="changeform()"
              @keyup="checkFields"
            >
            <span class="input-placeholder">$</span>
          </div>
        </div>

        <div class="input-holder">
          <label class="input-label">Loan to value ratio</label>
          <div class="input-holder--with-placeholder">
            <TheMask
              v-model="offerLoanToValueRatio"
              :mask="['##.##', '###.##']"
              :masked="true"
              @change.native="changeform()"
              @keyup.native="limit($event, 'offerLoanToValueRatio'); checkFields"
            />
            <span class="input-placeholder">%</span>
          </div>
        </div>

        <div class="input-holder">
          <label class="input-label">Loan to cost ratio</label>
          <div class="input-holder--with-placeholder">
            <TheMask
              v-model="offerLoanToCostRatio"
              :mask="['##.##', '###.##']"
              :masked="true"
              @change.native="changeform()"
              @keyup.native="limit($event, 'offerLoanToCostRatio'); checkFields"
            />
            <span class="input-placeholder">%</span>
          </div>
        </div>
        <span
          v-if="requiredFields"
          class="error-message"
        >At least one field must be filled</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    // import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import { CurrencyDirective } from 'vue-currency-input'
    import { allowOnlyNumbersGlobal } from '@/config/util'
    import { formatNumber } from '@/config/util'
    import {TheMask} from 'vue-the-mask'
    import { mapState } from 'vuex'
    import { stringToNumber } from '@/config/util'

    interface Data {
        initialValueFormatted: string
        initialLoanFormatted: string
        requiredFields: boolean

        offerAmount: string
        offerLoanToValueRatio: string
        offerLoanToCostRatio: string
        change: boolean
    }

    export default Vue.extend({

        components: {
            TheMask,
        },

        directives: {
            currency: CurrencyDirective,
        },
        props: {
            quoteID: {
                type: String,
                default: '',
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
                initialValueFormatted: '',
                initialLoanFormatted: '',

                offerAmount: '',
                offerLoanToValueRatio: '',
                offerLoanToCostRatio: '',
                requiredFields: false,
                change: false,
            }
        },

        mounted() {
            this.convertInitValueToDollars()
            this.setFields()
          this.$store.dispatch('ui', {overlay: false})

        },

        computed: {
            ...mapState({
                offer: state => state['CreateQuote'].offer,
                loan_type: state => state['CreateQuote'].dealLoanType,
                dealForQuoteForm: state => state['CreateQuote'].dealForQuoteForm,
			}),
            initialValue() {
                return this.dealForQuoteForm.loan_amount
            },
            initialLoan() {
                return this.dealForQuoteForm.land_cost
            },
        },

        methods: {
            formatDollars(field) {
                return formatNumber(field)
            },
            
            limit(e, model) {
                const val = e.target.value
                if (e.keyCode === 110 || e.keyCode === 188 || e.keyCode === 190 || e.keyCode === 191) {
                    if(val === '') {
                        this[model] = '0'+this[model]
                        return
                    }
                }
                if(val.length === 6) {
                    if(val > 100) {
                        const num = 100
                        this[model] = num.toFixed(2)
                    }

                    if(val.charAt(0) === '0') {
                        this[model] = val.substring(1)
                    }
                }
            },
            
            changeform(){
                this.change = true
            },

            setFields() {
                if(this.offer) {
                    this.offerAmount = this.offer.offer.amount ? formatNumber(this.offer.offer.amount) : ''
                    this.offerLoanToValueRatio = this.offer.offer.loanToValueRatio
                    this.offerLoanToCostRatio = this.offer.offer.loanToCostRatio
                }
            },

            createObject() {
                return {
                    amount: this.offerAmount ? stringToNumber(this.offerAmount) : null,
                    loanToValueRatio: this.offerLoanToValueRatio,
                    loanToCostRatio: this.offerLoanToCostRatio,
                }
            },

            async next() {
                if (!this.offerAmount && !this.offerLoanToValueRatio && !this.offerLoanToCostRatio) {
                    this.requiredFields = true
                    return
                } else {
                    this.requiredFields = false
                }
                
                const dealID = this.$route.params.deal
                const dealObject_ = await this.$store.dispatch("getDealByIdQuote", {id: dealID})
                const dealStatus = dealObject_.data.data.dealObject.deal.finished
                if(dealStatus) {
                    await this.$store.dispatch('setOffer', this.createObject())
                } else {
                    this.$emit('dealDrafted')
                }
                
                return this.nextAction
            },
            async skip() {
                return this.skipAction
            },
            async prev() {
                return this.prevAction
            },
            
            allowOnlyNumbers(event) {
                allowOnlyNumbersGlobal(event)
            },
            convertInitValueToDollars() {
                this.initialValueFormatted = formatNumber(this.initialValue)
                this.initialLoanFormatted =  formatNumber(this.initialLoan)
            },
            checkFields() {
                if (!this.offerAmount && !this.offerLoanToValueRatio && !this.offerLoanToCostRatio) {
                    this.requiredFields = true
                } else {
                    this.requiredFields = false
                }
            },
            
        },
    })
</script>

<style lang="scss" scoped>
    .cq--title {
        margin-bottom: 30px;
    }

    .dash-subtitle {
        margin-bottom: 11px;
        display: block;
        font-size: 18px;
        color: $blue-chill;
        font-weight: 600;
    }
</style>
