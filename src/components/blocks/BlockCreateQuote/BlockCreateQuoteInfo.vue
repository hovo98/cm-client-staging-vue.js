<template>
  <div class="cq-form-inner">
    <h3 class="dash-title cq--title">
      The broker requested a loan of ${{ formatDollars(loan_amount) }} for a 
      <span class="">{{ loan_type.charAt(0).toUpperCase() + loan_type.slice(1).toLowerCase() }} deal</span> 
      costing ${{ formatDollars(parseInt(land_cost) + parseInt(soft_cost) + parseInt(hard_cost)) }}
    </h3>
    <div class="form-highlight error-message-holder">
      <h4 class="title-extra-small form-split__title">What terms would you like to offer? *</h4>
      <label class="dash-subtitle">The lesser of:</label>
      <div class="input-holder">
        <label class="input-label">Dollar Amount</label>
        <div class="input-holder--with-placeholder input-holder--smaller">
          <input
            v-model="dollarAmount"
            v-currency="{
              locale: 'en',
              currency: null,
              valueAsInteger: true,
              distractionFree: false,
              precision: 0,
              autoDecimalMode: true,
              valueRange: { min: 0 },
              allowNegative: false,
              valueRange: {min: 0, max: loan_amount}
            }"
            @change="changeform()"
            @keyup="validateOffering"
          >
          <span class="input-placeholder">$</span>
        </div>
      </div>

      <div class="input-holder input-holder--smaller">
        <label class="input-label">Loan to value ratio</label>
        <div class="input-holder--with-placeholder">
          <TheMask
            v-model="loanValue"
            :mask="['##.##', '###.##']"
            :masked="true"
            @keyup="limit($event, 'loanValue');"
            @change="changeform()"
          />
          <span class="input-placeholder">%</span>
        </div>
      </div>

      <div class="input-holder input-holder--smaller">
        <label class="input-label">Loan to cost ratio</label>
        <div class="input-holder--with-placeholder">
          <TheMask
            v-model="loanCost"
            :mask="['##.##', '###.##']"
            :masked="true"
            @keyup="limit($event, 'loanCost');"
            @change="changeform()"
          />
          <span class="input-placeholder">%</span>
        </div>
      </div>
      <span
        v-if="validationOffer"
        class="error-message"
      >At least one field need to filled.</span>
    </div>
    <h4 class="input-label">Land costs for this loan are ${{ formatDollars(land_cost) }}. How much are you offering?</h4>
    <b-row class="condition-txt-holder">
      <b-col
        md="6"
        class="input-holder"
      >
        <div class="input-holder--with-placeholder error-message-holder error-message-holder--block">
          <input
            v-model="landCostAmount"
            v-currency="{
              locale: 'en',
              currency: null,
              valueAsInteger: true,
              distractionFree: false,
              precision: 0,
              autoDecimalMode: true,
              valueRange: { min: 0 },
              allowNegative: false,
              valueRange: {min: 0, max: land_cost}
            }"
            @change="changeform()"
            @keyup="landCostNotice"
          >
          <span class="input-placeholder">$</span>
          <span
            v-if="landCostMessage"
            class="notice-message"
          >Land costs must lower than project cost.</span>
        </div>
      </b-col>
      <div class="condition-txt condition-txt--btw-horizontal">OR</div>
      <b-col
        md="6"
        class="input-holder"
      >
        <div class="input-holder--with-placeholder">
          <TheMask
            v-model="landCostPercent"
            :mask="['#', '#.##', '##.##', '###.##']"
            :masked="true"
            @keyup="limit($event, 'landCostPercent');"
            @change="changeform()"
          />
          <span class="input-placeholder">%</span>
        </div>
      </b-col>
    </b-row>
    <h4 class="input-label">Soft costs for this loan are ${{ formatDollars(soft_cost) }}. How much are you offering? </h4>
    <b-row class="condition-txt-holder">
      <b-col
        md="6"
        class="input-holder"
      >
        <div class="input-holder--with-placeholder error-message-holder error-message-holder--block">
          <input
            v-model="softCostAmount"
            v-currency="{
              locale: 'en',
              currency: null,
              valueAsInteger: true,
              distractionFree: false,
              precision: 0,
              autoDecimalMode: true,
              valueRange: { min: 0 },
              allowNegative: false,
              valueRange: {min: 0, max: soft_cost}
            }"
            @change="changeform()"
            @keyup="softCostNotice"
          >
          <span class="input-placeholder">$</span>
          <span
            v-if="softCostMessage"
            class="notice-message"
          >Soft costs must lower than project cost.</span>
        </div>
      </b-col>
      <div class="condition-txt condition-txt--btw-horizontal">OR</div>
      <b-col
        md="6"
        class="input-holder"
      >
        <div class="input-holder--with-placeholder">
          <TheMask
            v-model="softCostPercent"
            :mask="['#', '#.##', '##.##', '###.##']"
            :masked="true"
            @keyup="limit($event, 'softCostPercent');"
            @change="changeform()"
          />
          <span class="input-placeholder">%</span>
        </div>
      </b-col>
    </b-row>

    <h4 class="input-label">Hard costs for this loan are ${{ formatDollars(hard_cost) }}. How much are you offering? </h4>
    <b-row class="condition-txt-holder">
      <b-col
        md="6"
        class="input-holder"
      >
        <div class="input-holder--with-placeholder">
          <input
            v-model="hardCostAmount"
            v-currency="{
              locale: 'en',
              currency: null,
              valueAsInteger: true,
              distractionFree: false,
              precision: 0,
              autoDecimalMode: true,
              valueRange: { min: 0 },
              allowNegative: false,
              valueRange: {min: 0, max: hard_cost}
            }"
            @change="changeform()"
            @keyup="hardCostNotice"
          >
          <span class="input-placeholder">$</span>
          <span
            v-if="hardCostMessage"
            class="notice-message"
          >Hard costs must lower than project cost.</span>
        </div>
      </b-col>
      <div class="condition-txt condition-txt--btw-horizontal">OR</div>
      <b-col
        md="6"
        class="input-holder"
      >
        <div class="input-holder--with-placeholder">
          <TheMask
            v-model="hardCostPercent"
            :mask="['#', '#.##', '##.##', '###.##']"
            :masked="true"
            @keyup="limit($event, 'hardCostPercent');"
            @change="changeform()"
          />
          <span class="input-placeholder">%</span>
        </div>
      </b-col>
    </b-row>

    <h4 class="input-label">How much are you offering towards closing costs?</h4>
    <b-row class="condition-txt-holder">
      <b-col
        md="6"
        class="input-holder"
      >
        <div class="input-holder--with-placeholder">
          <input
            v-model="closingCostAmount"
            v-currency="{
              locale: 'en',
              currency: null,
              valueAsInteger: true,
              distractionFree: false,
              precision: 0,
              autoDecimalMode: true,
              valueRange: { min: 0 },
              allowNegative: false,
              valueRange: {min: 0, max: loan_amount}
            }"
            @change="changeform()"
          >
          <span class="input-placeholder">$</span>
        </div>
      </b-col>
      <div class="condition-txt condition-txt--btw-horizontal">OR</div>
      <b-col
        md="6"
        class="input-holder"
      >
        <div class="input-holder--with-placeholder">
          <TheMask
            v-model="closingCostPercent"
            :mask="['#', '#.##', '##.##', '###.##']"
            :masked="true"
            @keyup="limit($event, 'closingCostPercent');"
            @change="changeform()"
          />
          <span class="input-placeholder">%</span>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { CurrencyDirective } from 'vue-currency-input'
    import { allowOnlyNumbersGlobal, errorScroll } from '@/config/util'
    import { formatNumber } from '@/config/util'
    import { stringToNumber } from '@/config/util'
    import { mapState } from 'vuex'
    import {TheMask} from 'vue-the-mask'

    interface Data {
        change: boolean
        dollarAmount: string
        loanValue: number
        loanCost: number
        landCostAmount: string
        landCostPercent: number
        softCostAmount: string
        softCostPercent: number
        hardCostAmount: string
        hardCostPercent: number
        closingCostAmount: string
        closingCostPercent: number
        landCostMessage: boolean
        softCostMessage: boolean
        hardCostMessage: boolean
        validationOffer: boolean
    }

    export default Vue.extend({

        directives: {
            currency: CurrencyDirective,
        },

        components: {
            TheMask,
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
                change: false,
                dollarAmount: '',
                loanValue: null,
                loanCost: null,
                landCostAmount: '',
                landCostPercent: null,
                softCostAmount: '',
                softCostPercent: null,
                hardCostAmount: '',
                hardCostPercent: null,
                closingCostAmount: '',
                closingCostPercent: null,
                landCostMessage: false,
                softCostMessage: false,
                hardCostMessage: false,
                validationOffer: false,
            }
        },

        mounted() {
            this.setFields()
            this.$store.dispatch('ui', {overlay: false})
        },

        computed: {
            ...mapState({
                info: state => state['CreateQuote'].info,
                loan_type: state => state['CreateQuote'].dealLoanType,
                dealForQuoteForm: state => state['CreateQuote'].dealForQuoteForm,
			}),
            land_cost() {
                return this.dealForQuoteForm.land_cost
            },
            loan_amount() {
                return this.dealForQuoteForm.loan_amount
            },
            hard_cost() {
                return this.dealForQuoteForm.hard_cost
            },
            soft_cost() {
                return this.dealForQuoteForm.soft_cost
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
            setFields() {
                if(this.info) {
                    this.dollarAmount = this.info.requestedLoan.dollarAmount ? formatNumber(this.info.requestedLoan.dollarAmount) : ''
                    this.loanValue = this.info.requestedLoan.loanValue
                    this.loanCost = this.info.requestedLoan.loanCost
                    this.landCostAmount = this.info.landCosts.costAmount ? formatNumber(this.info.landCosts.costAmount) : ''
                    this.landCostPercent = this.info.landCosts.costPercent
                    this.softCostAmount = this.info.softCosts.costAmount ? formatNumber(this.info.softCosts.costAmount) : ''
                    this.softCostPercent = this.info.softCosts.costPercent
                    this.hardCostAmount = this.info.hardCosts.costAmount ? formatNumber(this.info.hardCosts.costAmount) : ''
                    this.hardCostPercent = this.info.hardCosts.costPercent
                    this.closingCostAmount = this.info.lendTowardsCosts.costAmount ? formatNumber(this.info.lendTowardsCosts.costAmount) : ''
                    this.closingCostPercent = this.info.lendTowardsCosts.costPercent
                }
            },
            createObject() {
                return {
                    requestedLoan: {
                        dollarAmount: this.dollarAmount ? stringToNumber(this.dollarAmount) : null,
                        loanValue: this.loanValue,
                        loanCost: this.loanCost,
                    },
                    landCosts: {
                        costAmount: this.landCostAmount ? stringToNumber(this.landCostAmount) : null,
                        costPercent: this.landCostPercent,
                    },
                    softCosts: {
                        costAmount: this.softCostAmount ? stringToNumber(this.softCostAmount) : null,
                        costPercent: this.softCostPercent,
                    },
                    hardCosts: {
                        costAmount: this.hardCostAmount ? stringToNumber(this.hardCostAmount) : null,
                        costPercent: this.hardCostPercent,
                    },
                    lendTowardsCosts: {
                        costAmount: this.closingCostAmount ? stringToNumber(this.closingCostAmount) : null,
                        costPercent: this.closingCostPercent,
                    },
                }
            },
            async next() {
                /**
                 * @description check if one off 3 fields is filled
                 */
                if (!this.dollarAmount && !this.loanValue && !this.loanCost) {
                    alert('!this.dollarAmount && !this.loanValue && !this.loanCost')
                    this.validationOffer = true
                    errorScroll()
                    return
                }
                this.validationOffer = false
                

                const dealID = this.$route.params.deal
                const dealObject_ = await this.$store.dispatch("getDealByIdQuote", {id: dealID})
                const dealStatus = dealObject_.data.data.dealObject.deal.finished

                if(dealStatus) {
                    await this.$store.dispatch('setInfo', this.createObject())
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
            changeform(){
                this.change = true
            },
            allowOnlyNumbers(event) {
                allowOnlyNumbersGlobal(event)
            },
            validateOffering() {
                if (!this.dollarAmount && !this.loanValue && !this.loanCost) {
                    this.validationOffer = true
                } else {
                    this.validationOffer = false
                }
            },
            landCostNotice() {
                const landCostValue = stringToNumber(this.landCostAmount)

                if (landCostValue > this.loan_amount) {
                    this.landCostMessage = true
                    this.landCostAmount = formatNumber(this.loan_amount)
                    setTimeout(() => {
                        this.landCostMessage = false
                    }, 4000)
                } else {
                    this.landCostMessage = false
                }
            },
            softCostNotice() {
                const softCostValue = stringToNumber(this.softCostAmount)

                if (softCostValue > this.loan_amount) {
                    this.softCostMessage = true
                    this.softCostAmount = formatNumber(this.loan_amount)
                    setTimeout(() => {
                        this.softCostMessage = false
                    }, 4000)
                } else {
                    this.softCostMessage = false
                }
            },
            hardCostNotice() {
                const hardCostValue = stringToNumber(this.hardCostAmount)

                if (hardCostValue > this.loan_amount) {
                    this.hardCostMessage = true
                    this.hardCostAmount = formatNumber(this.loan_amount)
                    setTimeout(() => {
                        this.hardCostMessage = false
                    }, 4000)
                } else {
                    this.hardCostMessage = false
                }
            },
        },
    })
</script>

<style lang="scss" scoped>
    .cq--title {
        margin-bottom: 30px;
    }

    .form-split__title {
        margin-bottom: 30px;
        font-size: 18px;
    }

    .dash-subtitle {
        margin-bottom: 11px;
        display: block;
        font-size: 18px;
        color: $blue-chill;
        font-weight: 600;
    }

    .input-holder--smaller {
        max-width: 567px;

        @include mq(1024px) {
            max-width: 580px;
        }
    }
</style>