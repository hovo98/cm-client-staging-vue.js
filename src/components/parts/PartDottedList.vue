<template>
  <ul class="dotted-list">
    <!-- Loan amount -->

    <li
      v-if="info && info.requestedLoan && info.requestedLoan.dollarAmount"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Offer Amount</span>
      <span class="dotted-list__text">$ {{ formatDollars(info.requestedLoan.dollarAmount) }}</span>
    </li>
    <li
      v-if="info && info.requestedLoan && info.requestedLoan.loanValue"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Loan to value ratio</span>
      <span class="dotted-list__text">{{ formatPercentSpecial(info.requestedLoan.loanValue) }} %</span>
    </li>
    <li
      v-if="info && info.requestedLoan && info.requestedLoan.loanCost"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Loan to cost ratio</span>
      <span class="dotted-list__text">{{ formatPercentSpecial(info.requestedLoan.loanCost) }} %</span>
    </li>

    <li
      v-if="info && info.landCosts && info.landCosts.costAmount"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Land costs amount</span>
      <span class="dotted-list__text">$ {{ formatDollars(info.landCosts.costAmount) }}</span>
    </li>
    <li
      v-if="info && info.landCosts && info.landCosts.costPercent"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Land costs percentage</span>
      <span class="dotted-list__text">{{ formatPercent(info.landCosts.costPercent) }} %</span>
    </li>

    <li
      v-if="info && info.softCosts && info.softCosts.costAmount"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Soft costs amount</span>
      <span class="dotted-list__text">$ {{ formatDollars(info.softCosts.costAmount) }}</span>
    </li>
    <li
      v-if="info && info.softCosts && info.softCosts.costPercent"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Soft costs percentage</span>
      <span class="dotted-list__text">{{ formatPercent(info.softCosts.costPercent) }} %</span>
    </li>

    <li
      v-if="info && info.hardCosts && info.hardCosts.costAmount"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Hard costs amount</span>
      <span class="dotted-list__text">$ {{ formatDollars(info.hardCosts.costAmount) }}</span>
    </li>
    <li
      v-if="info && info.hardCosts && info.hardCosts.costPercent"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Hard costs percentage</span>
      <span class="dotted-list__text">{{ formatPercent(info.hardCosts.costPercent) }} %</span>
    </li>

    <li
      v-if="info && info.lendTowardsCosts && info.lendTowardsCosts.costAmount"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Closing costs amount</span>
      <span class="dotted-list__text">$ {{ formatDollars(info.lendTowardsCosts.costAmount) }}</span>
    </li>
    <li
      v-if="info && info.lendTowardsCosts && info.lendTowardsCosts.costPercent"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Closing costs percentage</span>
      <span class="dotted-list__text">{{ formatPercent(info.lendTowardsCosts.costPercent) }} %</span>
    </li>


    <!-- Interest -->

    <li
      v-if="interest && interest.interestRateType && interest.interestRateType !== 'UNDEFINED'"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Interest rate</span>
      <span class="dotted-list__text">{{ changeSomeEnum(interest.interestRateType) }}</span>
    </li>
    <li
      v-if="interest && interest.interestRate && interest.interestRate.fixedRateAmount"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Fixed Rate Amount</span>
      <span class="dotted-list__text">{{ formatPercent(interest.interestRate.fixedRateAmount) }} %</span>
    </li>
    <li
      v-if="interest && interest.interestRate && interest.interestRate.yieldText"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Index</span>
      <span class="dotted-list__text">{{ interest.interestRate.yieldText }}</span>
    </li>
    <li
      v-if="interest && interest.interestRate && interest.interestRate.spread"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Spread</span>
      <span class="dotted-list__text">{{ formatPercent(interest.interestRate.spread) }} %</span>
    </li>
    <li
      v-if="interest && interest.interestRate && interest.interestRate.floor_rate"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Floor Rate</span>
      <span class="dotted-list__text">{{ formatPercent(interest.interestRate.floor_rate) }} %</span>
    </li>
        
    <li
      v-if="interest && interest.interestRate && interest.interestRate.yield_second"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Index</span>
      <span class="dotted-list__text">{{ interest.interestRate.yield_second }}</span>
    </li>
    <li
      v-if="interest && interest.interestRate && interest.interestRate.spread_second"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Spread</span>
      <span class="dotted-list__text">{{ formatPercent(interest.interestRate.spread_second) }} %</span>
    </li>
    <li
      v-if="interest && interest.interestRate && interest.interestRate.floor_rate_second"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Floor Rate</span>
      <span class="dotted-list__text">{{ formatPercent(interest.interestRate.floor_rate_second) }} %</span>
    </li>
    <li
      v-if="interest && interest.interestRate && interest.interestRate.swap_value"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Swap</span>
      <span class="dotted-list__text">{{ interest.interestRate.swap_value }}</span>
    </li>

    <!-- Permenent Loan amount -->

    <li
      v-if="stepThree && stepThree.constructionTerm"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Construction term</span>
      <span class="dotted-list__text">{{ stepThree.constructionTerm }}</span>
    </li>

    <li
      v-if="stepThree && stepThree.extensionOptionType && stepThree.extensionOptionType !== 'UNDEFINED'"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Extension option</span>
      <span class="dotted-list__text">{{ stepThree.extensionOptionType.charAt(0).toUpperCase() + stepThree.extensionOptionType.slice(1).toLowerCase() }}</span>
    </li>
    <li
      v-if="stepThree && stepThree.extensionOption && stepThree.extensionOption.duration"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Duration</span>
      <span class="dotted-list__text">{{ stepThree.extensionOption.duration }}</span>
    </li>

    <li
      v-if="stepThree && stepThree.extensionOption && stepThree.extensionOption.feeAmount"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Fee amount</span>
      <span class="dotted-list__text">$ {{ formatDollars(stepThree.extensionOption.feeAmount) }}</span>
    </li>
    <li
      v-if="stepThree && stepThree.extensionOption && stepThree.extensionOption.feePercentage"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Fee percentage</span>
      <span class="dotted-list__text">{{ formatPercent(stepThree.extensionOption.feePercentage) }} %</span>
    </li>

    <li
      v-if="stepThree && stepThree.extensionOption && stepThree.extensionOption.allowed"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Allowed</span>
      <span class="dotted-list__text">{{ stepThree.extensionOption.allowed }}</span>
    </li>
    <li
      v-if="stepThree && stepThree.recourseOptionType && stepThree.recourseOptionType === 'NO'"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Recourse Required</span>
      <span class="dotted-list__text">{{ stepThree.recourseOptionType.charAt(0).toUpperCase() + stepThree.recourseOptionType.slice(1).toLowerCase() }}</span>
    </li>
    <li
      v-if="stepThree && stepThree.recourseType && stepThree.recourseType.length !== 0"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Recourse type</span>
      <span class="dotted-list__text">{{ checkRecurseArray(stepThree.recourseType) }}</span>
    </li>
    <li
      v-if="stepThree && stepThree.recourseNote"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Recourse note</span>
      <span class="dotted-list__text">{{ stepThree.recourseNote }}</span>
    </li>

    <li
      v-if="stepThree && stepThree.collectingFeeType && stepThree.collectingFeeType !== 'UNDEFINED'"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Collecting an origination fee</span>
      <span class="dotted-list__text">{{ stepThree.collectingFeeType.charAt(0).toUpperCase() + stepThree.collectingFeeType.slice(1).toLowerCase() }}</span>
    </li>
    <li
      v-if="stepThree && stepThree.collectingFee && stepThree.collectingFee.feeAmount"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Fee amount</span>
      <span class="dotted-list__text">$ {{ formatDollars(stepThree.collectingFee.feeAmount) }}</span>
    </li>
    <li
      v-if="stepThree && stepThree.collectingFee && stepThree.collectingFee.feePercent"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Fee percentage</span>
      <span class="dotted-list__text">{{ formatPercent(stepThree.collectingFee.feePercent) }} %</span>
    </li>


    <li
      v-if="stepThree && stepThree.exitFeeType && stepThree.exitFeeType !== 'UNDEFINED'"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Charging an exit fee</span>
      <span class="dotted-list__text">{{ stepThree.exitFeeType.charAt(0).toUpperCase() + stepThree.exitFeeType.slice(1).toLowerCase() }}</span>
    </li>
    <li
      v-if="stepThree && stepThree.exitFee && stepThree.exitFee.fee && stepThree.exitFee.fee.feePercent"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Fee percentage</span>
      <span class="dotted-list__text">{{ formatPercent(stepThree.exitFee.fee.feePercent) }} %</span>
    </li>
    <li
      v-if="stepThree && stepThree.exitFee && stepThree.exitFee.fee && stepThree.exitFee.fee.feeAmount"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Fee amount</span>
      <span class="dotted-list__text">$ {{ formatDollars(stepThree.exitFee.fee.feeAmount) }}</span>
    </li>
    <li
      v-if="stepThree && stepThree.exitFee && stepThree.exitFee.comment"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Comment</span>
      <span class="dotted-list__text">{{ stepThree.exitFee.comment }}</span>
    </li>

    <li
      v-if="stepThree && stepThree.permanentLoanOptionType && stepThree.permanentLoanOptionType !== 'UNDEFINED'"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Permanent loan option</span>
      <span class="dotted-list__text">{{ stepThree.permanentLoanOptionType.charAt(0).toUpperCase() + stepThree.permanentLoanOptionType.slice(1).toLowerCase() }}</span>
    </li>

    <!-- Offer -->

    <li
      v-if="offer && offer.offer && offer.offer.amount"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Offer amount</span>
      <span class="dotted-list__text">$ {{ formatDollars(offer.offer.amount) }}</span>
    </li>
    <li
      v-if="offer && offer.offer && offer.offer.loanToValueRatio"
      class="dotted-list__item"
    >
      <span
        v-if="loan_type === 'CONSTRUCTION'"
        class="dotted-list__text"
      >Permanent Loan To Value Ratio</span>
      <span
        v-else
        class="dotted-list__text"
      >Loan To Value Ratio</span>
      <span class="dotted-list__text">{{ formatPercentSpecial(offer.offer.loanToValueRatio) }} %</span>
    </li>
    <li
      v-if="offer && offer.offer && offer.offer.loanToCostRatio"
      class="dotted-list__item"
    >
      <span
        v-if="loan_type === 'CONSTRUCTION'"
        class="dotted-list__text"
      >Permanent Loan To Cost Ratio</span>
      <span
        v-else
        class="dotted-list__text"
      >Loan To Cost Ratio</span>
      <span class="dotted-list__text">{{ formatPercentSpecial(offer.offer.loanToCostRatio) }} %</span>
    </li>


    <!-- Page two -->

    <li
      v-if="pageTwo && pageTwo.amountOfYears"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Rate fixed for</span>
      <span
        v-if="pageTwo.amountOfYears > 1"
        class="dotted-list__text"
      >{{ pageTwo.amountOfYears }} years</span>
      <span
        v-else
        class="dotted-list__text"
      >{{ pageTwo.amountOfYears }} year</span>
    </li>

    <li
      v-if="pageTwo && pageTwo.amountOfYearsReset && pageTwo.amountOfYearsReset !== 'UNDEFINED'"
      class="dotted-list__item"
    >
      <span
        v-if="pageTwo.amountOfYears > 1"
        class="dotted-list__text"
      >Reset it for another {{ pageTwo.amountOfYears }} years</span>
      <span
        v-else
        class="dotted-list__text"
      >Reset it for another {{ pageTwo.amountOfYears }} year</span>
      <span class="dotted-list__text">{{ pageTwo.amountOfYearsReset.charAt(0).toUpperCase() + pageTwo.amountOfYearsReset.slice(1).toLowerCase() }}</span>
    </li>

    <li
      v-if="pageTwo && pageTwo.interestRateType && pageTwo.interestRateType !== 'UNDEFINED'"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Interest rate</span>
      <span class="dotted-list__text">{{ changeSomeEnum(pageTwo.interestRateType) }}</span>
    </li>
    <li
      v-if="pageTwo && pageTwo.interestRate && pageTwo.interestRate.fixedRateAmount"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Fixed Rate Amount</span>
      <span class="dotted-list__text">{{ formatPercent(pageTwo.interestRate.fixedRateAmount) }} %</span>
    </li>
    <li
      v-if="pageTwo && pageTwo.interestRate && pageTwo.interestRate.yieldText"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Index</span>
      <span class="dotted-list__text">{{ pageTwo.interestRate.yieldText }}</span>
    </li>
    <li
      v-if="pageTwo && pageTwo.interestRate && pageTwo.interestRate.spread"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Spread</span>
      <span class="dotted-list__text">{{ formatPercent(pageTwo.interestRate.spread) }} %</span>
    </li>
    <li
      v-if="pageTwo && pageTwo.interestRate && pageTwo.interestRate.floor_rate"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Floor Rate</span>
      <span class="dotted-list__text">{{ formatPercent(pageTwo.interestRate.floor_rate) }} %</span>
    </li>

    <li
      v-if="pageTwo && pageTwo.interestRate && pageTwo.interestRate.yield_second"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Index</span>
      <span class="dotted-list__text">{{ pageTwo.interestRate.yield_second }}</span>
    </li>
    <li
      v-if="pageTwo && pageTwo.interestRate && pageTwo.interestRate.spread_second"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Spread</span>
      <span class="dotted-list__text">{{ formatPercent(pageTwo.interestRate.spread_second) }} %</span>
    </li>
    <li
      v-if="pageTwo && pageTwo.interestRate && pageTwo.interestRate.floor_rate_second"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Floor Rate</span>
      <span class="dotted-list__text">{{ formatPercent(pageTwo.interestRate.floor_rate_second) }} %</span>
    </li>
    <li
      v-if="pageTwo && pageTwo.interestRate && pageTwo.interestRate.swap_value"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Swap</span>
      <span class="dotted-list__text">{{ pageTwo.interestRate.swap_value }}</span>
    </li>

    <!-- Page three -->

    <li
      v-if="pageThree && pageThree.interestPeriodType && pageThree.interestPeriodType !== 'UNDEFINED'"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Interest only period</span>
      <span class="dotted-list__text">{{ pageThree.interestPeriodType.charAt(0).toUpperCase() + pageThree.interestPeriodType.slice(1).toLowerCase() }}</span>
    </li>
    <li
      v-if="pageThree && pageThree.interestPeriod"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Amount of time</span>
      <span class="dotted-list__text">{{ pageThree.interestPeriod }}</span>
    </li>
    <li
      v-if="pageThree && pageThree.amortizationPeriod"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Amortization period (years)</span>
      <span class="dotted-list__text">{{ pageThree.amortizationPeriod }}</span>
    </li>
    <li
      v-if="pageThree && pageThree.recourseType && pageThree.recourseType === 'NO'"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Recourse Required</span>
      <span class="dotted-list__text">{{ pageThree.recourseType.charAt(0).toUpperCase() + pageThree.recourseType.slice(1).toLowerCase() }}</span>
    </li>
    <li
      v-if="pageThree && pageThree.recourseOptions.length !== 0"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Recourse type</span>
      <span class="dotted-list__text">{{ checkRecurseArray(pageThree.recourseOptions) }}</span>
    </li> 
    <li
      v-if="pageThree && pageThree.recourseNote"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Recourse note</span>
      <span class="dotted-list__text">{{ pageThree.recourseNote }}</span>
    </li>

    <li
      v-if="pageThree && pageThree.collectingOriginationFeeType && pageThree.collectingOriginationFeeType !== 'UNDEFINED'"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Collecting an origination fee</span>
      <span class="dotted-list__text">{{ pageThree.collectingOriginationFeeType.charAt(0).toUpperCase() + pageThree.collectingOriginationFeeType.slice(1).toLowerCase() }}</span>
    </li>
    <li
      v-if="pageThree && pageThree.collectingOrigination && pageThree.collectingOrigination.costAmount"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Fee amount</span>
      <span class="dotted-list__text">$ {{ formatDollars(pageThree.collectingOrigination.costAmount) }}</span>
    </li>
    <li
      v-if="pageThree && pageThree.collectingOrigination && pageThree.collectingOrigination.costPercent"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Fee percentage</span>
      <span class="dotted-list__text">{{ formatPercent(pageThree.collectingOrigination.costPercent) }} %</span>
    </li>


    <!-- Page four -->

    <li
      v-if="pageFour && pageFour.prePaymentYears && pageFour.prePaymentYears !== 'custom'"
      class="dotted-list__item"
    >
      <span class="dotted-list__text">Pre-payment penalties</span>
      <span
        v-if="pageFour.prePaymentYears === 'no'"
        class="dotted-list__text"
      >No Prepayment Penalty</span>
      <span
        v-else
        class="dotted-list__text"
      >{{ changeSomeEnum(pageFour.prePaymentYears) }}</span>
    </li>
        
    <template v-if="pageFour">
      <template v-for="(custom,index) in pageFour.prePaymentCustomYear">
        <li :key="index">
          <span class="dotted-list__text">Custom Pre-payment penalty - year {{ index + 1 }}</span>
          <span
            v-if="custom !== 0 && custom !== ''"
            class="dotted-list__text"
          >{{ formatPercent(custom) }} %</span>
          <span
            v-else
            class="dotted-list__text"
          >0 %</span>
        </li>
      </template>
    </template>
  </ul>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import { formatNumber } from '@/config/util'
    import { changeEnum } from '@/config/util'

    interface Data {
        title: string
    }

    export default Vue.extend({
        computed: {
            ...mapState({
                dealLoanType: state => state['CreateQuote'].dealLoanType,
                dealPropertyType: state => state['CreateQuote'].dealPropertyType,
                pageTwo: state => state['CreateQuote'].pageTwo,
                pageThree: state => state['CreateQuote'].pageThree,
                pageFour: state => state['CreateQuote'].pageFour,
                info: state => state['CreateQuote'].info,
                interest: state => state['CreateQuote'].interest,
                stepThree: state => state['CreateQuote'].stepThree,
                offer: state => state['CreateQuote'].offer,
                loan_type: state => state['CreateQuote'].dealLoanType,
			}),
        },

        data(): Data {
            return {
                title: 'This is title of "PartDottedList"!',
            }
        },
        
        methods: {
            formatDollars(field) {
                return formatNumber(field)
            },
            changeSomeEnum(str) {
                return changeEnum(str)
            },
            formatPercentSpecial(num) {
                if(num === '000.00' || num === '00.00' || num === undefined)
                    return '0'

                const zero = num.toString().slice(-1)
                const zeros = num.toString().slice(-2)
                if(zeros === '00') {
                    return num.toString().slice(0, -3)
                } else if(zeros === '.0') {
                    return num.toString().slice(0, -2)
                }
                if(zero === '.') {
                    return num.toString().slice(0, -1)
                }

                if(num.length === 5 && zero === '0') {
                    return num.toString().slice(0, -1)
                }

                return num
            },
            formatPercent(num) {
                if(num === '000.00' || num === '00.00' || num === undefined)
                    return '0'

                const zero = num.toString().slice(-1)
                const zeros = num.toString().slice(-2)

                if(zeros === '00') {
                    return num.toString().slice(0, -3)
                } else if(zeros === '.0') {
                    return num.toString().slice(0, -2)
                }
                if(zero === '0' || zero === '.') {
                    return num.toString().slice(0, -1)
                }
                return num
            },
            checkRecurseArray(arr) {
                let str = ''
                if(arr.length === 1) {
                    str = this.changeSomeEnum(arr[0])
                } else {
                    str = `${this.changeSomeEnum(arr[0])}, ${this.changeSomeEnum(arr[1])}`
                }
                return str
            },
        },
    })
</script>

<style lang="scss" scoped>
    .dotted-list {
        li {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;

            &::before {
                content: '';
                @include center(y, absolute);
                left: 0;
                height: 4px;
                width: 100%;
                background: radial-gradient(ellipse at center, #9da0ae 0%, #9da0ae 20%, transparent 30%);
                background-repeat: repeat-x;
                background-size: 1%;
            }
        }
    }

    .dotted-list__text {
        background-color: $white;
        display: inline-block;
        position: relative;
        z-index: 1;
        font-size: 14px;
        color: $shark;
        line-height: 1.4;
        // text-align: right;
        max-width: 70%;
        
        &:first-of-type {
            padding-right: 11px;
        }

        &:last-of-type {
            padding-left: 11px;
            font-weight: 600;
        }

        @include mq(411px) {
            max-width: 80%;
        }
    }

    .quote-summary__list {
        .dotted-list__text {
            @include mq(374px) {
                text-align: left;
            } 
        }
    }
</style>
