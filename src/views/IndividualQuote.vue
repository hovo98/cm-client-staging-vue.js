<template>
  <div :class="['page-dashboard page-create-deal', blockPreloader ? 'block-preloader' : '']">
    <BlockDashboardSidebar />
    <BlockBlockList 
      v-if="deal"
      link-label="Back"
      :deal="deal" 
      :quote="false"
      :deal-sheet="dealSheet"
      :titles="'lender'" 
      :flag="'lender-quotes'"
    />
    <div class="individualQuote__wrapper">
      <div class="row">
        <div class="col-xl-6">
          <PartAccordion
            v-if="quote"
            :tables="tablesQuoteDetails"
            :quote="quotesD"
            :quote-status="quote.status"
          />
        </div>
        <div class="col-xl-6">
          <PartAccordion
            v-if="quote"
            :tables="tablesBrokerInfo"
          />
        </div>
      </div>
    </div>
    <BlockPopupQuoteDeleted v-if="quoteDeleted" />
  </div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import BlockDashboardSidebar from '@/components/blocks/BlockDashboardSidebar.vue'
	import BlockBlockList from '@/components/blocks/BlockBlockList.vue'
    import PartAccordion from '@/components/parts/PartAccordion.vue'
    import { mapState } from 'vuex'
    import { formatNumber } from '@/config/util'
    import { changeEnum } from '@/config/util'
    import BlockPopupQuoteDeleted from '@/components/blocks/BlockPopup/BlockPopupQuoteDeleted.vue'

	export default Vue.extend({
		name: 'CreateDeal',

		components: {
			BlockDashboardSidebar,
			BlockBlockList,
			// BlockQuoteAcc,
			PartAccordion,
            BlockPopupQuoteDeleted,
        },
		/**
		 * stepStatus tells if this step is completed or not
		 *  currentStep tells on what step user is
		 */
		data() {
			return {
				page: 'page-create-deal',
                blockPreloader: true,
                quotesD: {},

				tablesQuoteDetails: [
					{
                       title: 'My Quote Details',
                    },
				],
				tablesBrokerInfo: [
					{
                       title: 'Broker Info',
                    },
				],
                quoteDeleted: false,
			}
        },

		computed: {
            ...mapState({
                deal: state => state['FilterQuotes'].deal,
                quote: state => state['FilterQuotes'].quote,
                companyName: state => state['FilterQuotes'].companyName,
                dealSheet: state => state['FilterDeal'].dealSheet,
            }),
        },

        watch: {
            quote() {
                if(this.quote) {
                    if(this.quote.constructionLoans.permanentLoanOptionType === 'NO') {
                        const obj = {
                            'Dollar Amount': [],
                            'Loan to value ratio': [],
                            'Loan to cost ratio': [],
                            'Land costs amount': [],
                            'Land costs percent': [],
                            'Soft costs amount': [],
                            'Soft costs percent': [],
                            'Hard costs amount': [],
                            'Hard costs percent': [],
                            'Closing costs amount': [],
                            'Closing costs percent': [],
                            'Interest rate': [],
                            'Fixed Rate Amount': [],
                            'Index': [],
                            'Spread': [],
                            'Floor Rate': [],
                            'Index ': [],
                            'Spread ': [],
                            'Floor Rate ': [],
                            'Swap': [],
                            'Construction term': [],
                            'Extension option': [],
                            'Duration': [],
                            'Fee amount': [],
                            'Fee percent': [],
                            'Allowed': [],
                            'Recourse Required': [],
                            'Recourse type': [],
                            'Recourse note': [],
                            'Collecting an origination fee': [],
                            'Collecting fee amount': [],
                            'Collecting fee percent': [],
                            'Charging an exit fee': [],
                            'Exit fee Percent': [],
                            'Exit fee amount': [],
                            'Comment': [], 
                            'Permanent loan option': [],
                        }

                        if(this.quote.constructionLoans.requestedLoan?.dollarAmount) {
                            obj['Dollar Amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.requestedLoan.dollarAmount))
                        }
                        if(this.quote.constructionLoans.requestedLoan?.loanValue) {
                            obj['Loan to value ratio'].push(this.formatPercentSpecial(this.quote.constructionLoans.requestedLoan.loanValue)+' %')
                        }
                        if(this.quote.constructionLoans.landCosts?.costAmount) {
                            obj['Land costs amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.landCosts.costAmount))
                        }
                        if(this.quote.constructionLoans.requestedLoan?.loanCost) {
                            obj['Loan to cost ratio'].push(this.formatPercentSpecial(this.quote.constructionLoans.requestedLoan.loanCost)+' %')
                        }
                        if(this.quote.constructionLoans.landCosts?.costPercent) {
                            obj['Land costs percent'].push(this.formatPercent(this.quote.constructionLoans.landCosts.costPercent)+' %')
                        }
                        if(this.quote.constructionLoans.softCosts?.costAmount) {
                            obj['Soft costs amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.softCosts.costAmount))
                        }
                        if(this.quote.constructionLoans.softCosts?.costPercent) {
                            obj['Soft costs percent'].push(this.formatPercent(this.quote.constructionLoans.softCosts.costPercent)+' %')
                        }
                        if(this.quote.constructionLoans.hardCosts?.costAmount) {
                            obj['Hard costs amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.hardCosts.costAmount))
                        }
                        if(this.quote.constructionLoans.hardCosts?.costPercent) {
                            obj['Hard costs percent'].push(this.formatPercent(this.quote.constructionLoans.hardCosts.costPercent)+' %')
                        }
                        if(this.quote.constructionLoans.lendTowardsCosts?.costAmount) {
                            obj['Closing costs amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.lendTowardsCosts.costAmount))
                        }
                        if(this.quote.constructionLoans.lendTowardsCosts?.costPercent) {
                            obj['Closing costs percent'].push(this.formatPercent(this.quote.constructionLoans.lendTowardsCosts.costPercent)+' %')
                        }


                        if(this.quote.constructionLoans.interestRateType && this.quote.constructionLoans.interestRateType !== 'UNDEFINED') {
                            obj['Interest rate'].push(this.changeSomeEnum(this.quote.constructionLoans.interestRateType))
                        }
                        if(this.quote.constructionLoans.interestRate?.fixedRateAmount) {
                            obj['Fixed Rate Amount'].push(this.formatPercent(this.quote.constructionLoans.interestRate?.fixedRateAmount)+' %')
                        }
                        if(this.quote.constructionLoans.interestRate?.spread) {
                            obj['Spread'].push(this.formatPercent(this.quote.constructionLoans.interestRate.spread)+' %')
                        }
                        if(this.quote.constructionLoans.interestRate?.yieldText) {
                            obj['Index'].push(this.quote.constructionLoans.interestRate.yieldText)
                        }
                        if(this.quote.constructionLoans.interestRate?.floor_rate) {
                            obj['Floor Rate'].push(this.formatPercent(this.quote.constructionLoans.interestRate?.floor_rate)+' %')
                        }

                        if(this.quote.constructionLoans.interestRate?.spread_second) {
                            obj['Spread '].push(this.formatPercent(this.quote.constructionLoans.interestRate.spread_second)+' %')
                        }
                        if(this.quote.constructionLoans.interestRate?.yield_second) {
                            obj['Index '].push(this.quote.constructionLoans.interestRate.yield_second)
                        }
                        if(this.quote.constructionLoans.interestRate?.floor_rate_second) {
                            obj['Floor Rate '].push(this.formatPercent(this.quote.constructionLoans.interestRate?.floor_rate_second)+' %')
                        }
                        if(this.quote.constructionLoans.interestRate?.swap_value) {
                            obj['Swap'].push(this.quote.constructionLoans.interestRate?.swap_value)
                        }


                        if(this.quote.constructionLoans.constructionTerm) {
                            obj['Construction term'].push(this.quote.constructionLoans.constructionTerm)
                        }


                        if(this.quote.constructionLoans.extensionOptionType && this.quote.constructionLoans.extensionOptionType !== 'UNDEFINED') {
                            obj['Extension option'].push(this.quote.constructionLoans.extensionOptionType.charAt(0).toUpperCase() + this.quote.constructionLoans.extensionOptionType.slice(1).toLowerCase())
                        }


                        if(this.quote.constructionLoans.extensionOption?.duration) {
                            obj['Duration'].push(this.quote.constructionLoans.extensionOption.duration)
                        }
                        if(this.quote.constructionLoans.extensionOption?.feeAmount) {
                            obj['Fee amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.extensionOption.feeAmount))
                        }
                        if(this.quote.constructionLoans.extensionOption?.feePercentage) {
                            obj['Fee percent'].push(this.formatPercent(this.quote.constructionLoans.extensionOption.feePercentage)+' %')
                        }
                        if(this.quote.constructionLoans.extensionOption?.allowed) {
                            obj['Allowed'].push(this.quote.constructionLoans.extensionOption.allowed)
                        }

                        if(this.quote.constructionLoans.recourseOptionType && this.quote.constructionLoans.recourseOptionType === 'NO') {
                            obj['Recourse Required'].push(this.quote.constructionLoans.recourseOptionType.charAt(0).toUpperCase() + this.quote.constructionLoans.recourseOptionType.slice(1).toLowerCase())
                        }

                        if(this.quote.constructionLoans.recourseType && this.quote.constructionLoans.recourseType.length > 0) {
                            obj['Recourse type'].push(this.checkRecurseArray(this.quote.constructionLoans.recourseType))
                        }

                        if(this.quote.constructionLoans.recourseNote) {
                            obj['Recourse note'].push(this.quote.constructionLoans.recourseNote)
                        }

                        if(this.quote.constructionLoans.collectingFeeType && this.quote.constructionLoans.collectingFeeType !== 'UNDEFINED') {
                            obj['Collecting an origination fee'].push(this.quote.constructionLoans.collectingFeeType.charAt(0).toUpperCase() + this.quote.constructionLoans.collectingFeeType.slice(1).toLowerCase())
                        }

                        if(this.quote.constructionLoans.collectingFee?.feeAmount) {
                            obj['Collecting fee amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.collectingFee.feeAmount))
                        }
                        if(this.quote.constructionLoans.collectingFee?.feePercent) {
                            obj['Collecting fee percent'].push(this.formatPercent(this.quote.constructionLoans.collectingFee?.feePercent)+' %')
                        }

                        if(this.quote.constructionLoans.exitFeeType && this.quote.constructionLoans.exitFeeType !== 'UNDEFINED') {
                            obj['Charging an exit fee'].push(this.quote.constructionLoans.exitFeeType.charAt(0).toUpperCase() + this.quote.constructionLoans.exitFeeType.slice(1).toLowerCase())
                        }

                        if(this.quote.constructionLoans.exitFee?.fee?.feePercent) {
                            obj['Exit fee Percent'].push(this.formatPercent(this.quote.constructionLoans.exitFee?.fee?.feePercent)+' %')
                        }
                        if(this.quote.constructionLoans.exitFee?.fee?.feeAmount) {
                            obj['Exit fee amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.exitFee?.fee?.feeAmount))
                        }

                        if(this.quote.constructionLoans.exitFee?.comment) {
                            obj['Comment'].push(this.quote.constructionLoans.exitFee?.comment)
                        }
                        
                        if(this.quote.constructionLoans.permanentLoanOptionType && this.quote.constructionLoans.permanentLoanOptionType !== 'UNDEFINED') {
                            obj['Permanent loan option'].push(this.quote.constructionLoans.permanentLoanOptionType.charAt(0).toUpperCase() + this.quote.constructionLoans.permanentLoanOptionType.slice(1).toLowerCase())
                        }

                        this.quotesD = obj
                    } else {
                        const obj = {
                            'Dollar Amount': [],
                            'Loan to value ratio': [],
                            'Loan to cost ratio': [],
                            'Land costs amount': [],
                            'Land costs percent': [],
                            'Soft costs amount': [],
                            'Soft costs percent': [],
                            'Hard costs amount': [],
                            'Hard costs percent': [],
                            'Closing costs amount': [],
                            'Closing costs percent': [],
                            'Interest rate': [],
                            'Fixed Rate Amount': [],
                            'Index': [],
                            'Spread': [],
                            'Floor Rate': [],
                            'Index   ': [],
                            'Spread   ': [],
                            'Floor Rate   ': [],
                            'Swap': [],
                            'Construction term': [],
                            'Extension option': [],
                            'Duration': [],
                            'Fee amount': [],
                            'Fee percent': [],
                            'Allowed': [],
                            'Recourse Required': [],
                            'Recourse type': [],
                            'Recourse note ': [],
                            'Collecting an origination fee': [],
                            'Collecting fee amount': [],
                            'Collecting fee percent': [],
                            'Charging an exit fee': [],
                            'Exit fee Percent': [],
                            'Exit fee amount': [],
                            'Comment': [], 
                            'Permanent loan option': [],

                            'Offer amount': [],
                            'Loan To Value Ratio ': [],
                            'Loan To Cost Ratio ': [],
                            'Rate fixed for': [],
                            'Reset years': [],
                            'Interest rate ': [],
                            'Fixed Rate Amount ': [],
                            'Index ': [],
                            'Spread ': [],
                            'Floor Rate ': [],
                            'Index  ': [],
                            'Spread  ': [],
                            'Floor Rate  ': [],
                            'Swap ': [],
                            'Interest only period': [],
                            'Amount of time': [],
                            'Amortization period (years)': [],
                            'Recourse Required ': [],
                            'Recourse type ': [],
                            'Recourse note': [],
                            'Collecting an origination fee ': [],
                            'Cost amount': [],
                            'Cost Percent': [],
                            'Pre-payment penalties': [],
                            'Custom Pre-payment penalty': [],
                        }

                        if(this.quote.constructionLoans.requestedLoan?.dollarAmount) {
                            obj['Dollar Amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.requestedLoan.dollarAmount))
                        }
                        if(this.quote.constructionLoans.requestedLoan?.loanCost) {
                            obj['Loan to cost ratio'].push(this.formatPercentSpecial(this.quote.constructionLoans.requestedLoan.loanCost)+' %')
                        }
                        if(this.quote.constructionLoans.requestedLoan?.loanValue) {
                            obj['Loan to value ratio'].push(this.formatPercentSpecial(this.quote.constructionLoans.requestedLoan.loanValue)+' %')
                        }
                        if(this.quote.constructionLoans.landCosts?.costAmount) {
                            obj['Land costs amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.landCosts.costAmount))
                        }
                        if(this.quote.constructionLoans.landCosts?.costPercent) {
                            obj['Land costs percent'].push(this.formatPercent(this.quote.constructionLoans.landCosts.costPercent)+' %')
                        }
                        if(this.quote.constructionLoans.softCosts?.costAmount) {
                            obj['Soft costs amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.softCosts.costAmount))
                        }
                        if(this.quote.constructionLoans.softCosts?.costPercent) {
                            obj['Soft costs percent'].push(this.formatPercent(this.quote.constructionLoans.softCosts.costPercent)+' %')
                        }
                        if(this.quote.constructionLoans.hardCosts?.costAmount) {
                            obj['Hard costs amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.hardCosts.costAmount))
                        }
                        if(this.quote.constructionLoans.hardCosts?.costPercent) {
                            obj['Hard costs percent'].push(this.formatPercent(this.quote.constructionLoans.hardCosts.costPercent)+' %')
                        }
                        if(this.quote.constructionLoans.lendTowardsCosts?.costAmount) {
                            obj['Closing costs amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.lendTowardsCosts.costAmount))
                        }
                        if(this.quote.constructionLoans.lendTowardsCosts?.costPercent) {
                            obj['Closing costs percent'].push(this.formatPercent(this.quote.constructionLoans.lendTowardsCosts.costPercent)+' %')
                        }


                        if(this.quote.constructionLoans.interestRateType && this.quote.constructionLoans.interestRateType !== 'UNDEFINED') {
                            obj['Interest rate'].push(this.changeSomeEnum(this.quote.constructionLoans.interestRateType))
                        }
                        if(this.quote.constructionLoans.interestRate?.fixedRateAmount) {
                            obj['Fixed Rate Amount'].push(this.formatPercent(this.quote.constructionLoans.interestRate?.fixedRateAmount)+' %')
                        }
                        if(this.quote.constructionLoans.interestRate?.spread) {
                            obj['Spread'].push(this.formatPercent(this.quote.constructionLoans.interestRate.spread)+' %')
                        }
                        if(this.quote.constructionLoans.interestRate?.yieldText) {
                            obj['Index'].push(this.quote.constructionLoans.interestRate.yieldText)
                        }
                        if(this.quote.constructionLoans.interestRate?.floor_rate) {
                            obj['Floor Rate'].push(this.formatPercent(this.quote.constructionLoans.interestRate?.floor_rate)+' %')
                        }

                        if(this.quote.constructionLoans.interestRate?.spread_second) {
                            obj['Spread   '].push(this.formatPercent(this.quote.constructionLoans.interestRate.spread_second)+' %')
                        }
                        if(this.quote.constructionLoans.interestRate?.yield_second) {
                            obj['Index   '].push(this.quote.constructionLoans.interestRate.yield_second)
                        }
                        if(this.quote.constructionLoans.interestRate?.floor_rate_second) {
                            obj['Floor Rate   '].push(this.formatPercent(this.quote.constructionLoans.interestRate?.floor_rate_second)+' %')
                        }
                        if(this.quote.constructionLoans.interestRate?.swap_value) {
                            obj['Swap'].push(this.quote.constructionLoans.interestRate?.swap_value)
                        }


                        if(this.quote.constructionLoans.constructionTerm) {
                            obj['Construction term'].push(this.quote.constructionLoans.constructionTerm)
                        }


                        if(this.quote.constructionLoans.extensionOptionType && this.quote.constructionLoans.extensionOptionType !== 'UNDEFINED') {
                            obj['Extension option'].push(this.quote.constructionLoans.extensionOptionType.charAt(0).toUpperCase() + this.quote.constructionLoans.extensionOptionType.slice(1).toLowerCase())
                        }


                        if(this.quote.constructionLoans.extensionOption?.duration) {
                            obj['Duration'].push(this.quote.constructionLoans.extensionOption.duration)
                        }
                        if(this.quote.constructionLoans.extensionOption?.feeAmount) {
                            obj['Fee amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.extensionOption.feeAmount))
                        }
                        if(this.quote.constructionLoans.extensionOption?.feePercentage) {
                            obj['Fee percent'].push(this.formatPercent(this.quote.constructionLoans.extensionOption.feePercentage)+' %')
                        }
                        if(this.quote.constructionLoans.extensionOption?.allowed) {
                            obj['Allowed'].push(this.quote.constructionLoans.extensionOption.allowed)
                        }

                        if(this.quote.constructionLoans.recourseOptionType && this.quote.constructionLoans.recourseOptionType === 'NO') {
                            obj['Recourse Required'].push(this.quote.constructionLoans.recourseOptionType.charAt(0).toUpperCase() + this.quote.constructionLoans.recourseOptionType.slice(1).toLowerCase())
                        }

                        if(this.quote.constructionLoans.recourseType && this.quote.constructionLoans.recourseType.length > 0) {
                            obj['Recourse type'].push(this.checkRecurseArray(this.quote.constructionLoans.recourseType))
                        }

                        if(this.quote.constructionLoans.recourseNote) {
                            obj['Recourse note '].push(this.quote.constructionLoans.recourseNote)
                        }

                        if(this.quote.constructionLoans.collectingFeeType && this.quote.constructionLoans.collectingFeeType !== 'UNDEFINED') {
                            obj['Collecting an origination fee'].push(this.quote.constructionLoans.collectingFeeType.charAt(0).toUpperCase() + this.quote.constructionLoans.collectingFeeType.slice(1).toLowerCase())
                        }

                        if(this.quote.constructionLoans.collectingFee?.feeAmount) {
                            obj['Collecting fee amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.collectingFee.feeAmount))
                        }
                        if(this.quote.constructionLoans.collectingFee?.feePercent) {
                            obj['Collecting fee percent'].push(this.formatPercent(this.quote.constructionLoans.collectingFee?.feePercent)+' %')
                        }

                        if(this.quote.constructionLoans.exitFeeType && this.quote.constructionLoans.exitFeeType !== 'UNDEFINED') {
                            obj['Charging an exit fee'].push(this.quote.constructionLoans.exitFeeType.charAt(0).toUpperCase() + this.quote.constructionLoans.exitFeeType.slice(1).toLowerCase())
                        }

                        if(this.quote.constructionLoans.exitFee?.fee?.feePercent) {
                            obj['Exit fee Percent'].push(this.formatPercent(this.quote.constructionLoans.exitFee?.fee?.feePercent)+' %')
                        }
                        if(this.quote.constructionLoans.exitFee?.fee?.feeAmount) {
                            obj['Exit fee amount'].push('$'+ this.formatDollars(this.quote.constructionLoans.exitFee?.fee?.feeAmount))
                        }

                        if(this.quote.constructionLoans.exitFee?.comment) {
                            obj['Comment'].push(this.quote.constructionLoans.exitFee?.comment)
                        }
                        
                        if(this.quote.constructionLoans.permanentLoanOptionType && this.quote.constructionLoans.permanentLoanOptionType !== 'UNDEFINED') {
                            obj['Permanent loan option'].push(this.quote.constructionLoans.permanentLoanOptionType.charAt(0).toUpperCase() + this.quote.constructionLoans.permanentLoanOptionType.slice(1).toLowerCase())
                        }



                        // offer secund form
                        if(this.quote.purchaseAndRefinanceLoans.offer?.amount) {
                            obj['Offer amount'].push('$'+ this.formatDollars(this.quote.purchaseAndRefinanceLoans.offer?.amount))
                        }
                        if(this.quote.purchaseAndRefinanceLoans.offer?.loanToValueRatio) {
                            obj['Loan To Value Ratio '].push(this.formatPercentSpecial(this.quote.purchaseAndRefinanceLoans.offer?.loanToValueRatio)+' %')
                        }
                        if(this.quote.purchaseAndRefinanceLoans.offer?.loanToCostRatio) {
                            obj['Loan To Cost Ratio '].push(this.formatPercentSpecial(this.quote.purchaseAndRefinanceLoans.offer?.loanToCostRatio)+' %')
                        }

                        if(Number(this.quote.purchaseAndRefinanceLoans.amountOfYears) > 1) {
                            obj['Rate fixed for'].push(this.quote.purchaseAndRefinanceLoans.amountOfYears + ' years')
                        } else {
                            obj['Rate fixed for'].push(this.quote.purchaseAndRefinanceLoans.amountOfYears + ' year')
                        }
                        if(this.quote.purchaseAndRefinanceLoans.amountOfYearsReset && this.quote.purchaseAndRefinanceLoans.amountOfYearsReset !== 'UNDEFINED') {
                            obj['Reset years'].push(this.changeSomeEnum(this.quote.purchaseAndRefinanceLoans.amountOfYearsReset))
                        }

                        if(this.quote.purchaseAndRefinanceLoans.interestRateType && this.quote.purchaseAndRefinanceLoans.interestRateType !== 'UNDEFINED') {
                            obj['Interest rate '].push(this.changeSomeEnum(this.quote.purchaseAndRefinanceLoans.interestRateType))
                        }

                        if(this.quote.purchaseAndRefinanceLoans.interestRate?.fixedRateAmount) {
                            obj['Fixed Rate Amount '].push(this.formatPercent(this.quote.purchaseAndRefinanceLoans.interestRate?.fixedRateAmount)+' %')
                        }
                        if(this.quote.purchaseAndRefinanceLoans.interestRate?.spread) {
                            obj['Spread '].push(this.formatPercent(this.quote.purchaseAndRefinanceLoans.interestRate?.spread)+' %')
                        }
                        if(this.quote.purchaseAndRefinanceLoans.interestRate?.yieldText) {
                            obj['Index '].push(this.quote.purchaseAndRefinanceLoans.interestRate?.yieldText)
                        }
                        if(this.quote.purchaseAndRefinanceLoans.interestRate?.floor_rate) {
                            obj['Floor Rate '].push(this.formatPercent(this.quote.purchaseAndRefinanceLoans.interestRate?.floor_rate)+' %')
                        }

                        if(this.quote.purchaseAndRefinanceLoans.interestRate?.spread_second) {
                            obj['Spread  '].push(this.formatPercent(this.quote.purchaseAndRefinanceLoans.interestRate?.spread_second)+' %')
                        }
                        if(this.quote.purchaseAndRefinanceLoans.interestRate?.yield_second) {
                            obj['Index  '].push(this.quote.purchaseAndRefinanceLoans.interestRate?.yield_second)
                        }
                        if(this.quote.purchaseAndRefinanceLoans.interestRate?.floor_rate_second) {
                            obj['Floor Rate  '].push(this.formatPercent(this.quote.purchaseAndRefinanceLoans.interestRate?.floor_rate_second)+' %')
                        }
                        if(this.quote.purchaseAndRefinanceLoans.interestRate?.swap_value) {
                            obj['Swap '].push(this.quote.purchaseAndRefinanceLoans.interestRate?.swap_value)
                        }
                        
                        if(this.quote.purchaseAndRefinanceLoans.interestPeriod) {
                            obj['Amount of time'].push(this.quote.purchaseAndRefinanceLoans.interestPeriod)
                        }

                        if(this.quote.purchaseAndRefinanceLoans.interestPeriodType && this.quote.purchaseAndRefinanceLoans.interestPeriodType !== 'UNDEFINED') {
                            obj['Interest only period'].push(this.quote.purchaseAndRefinanceLoans.interestPeriodType.charAt(0).toUpperCase() + this.quote.purchaseAndRefinanceLoans.interestPeriodType.slice(1).toLowerCase())
                        }

                        if(this.quote.purchaseAndRefinanceLoans.amortizationPeriod) {
                            obj['Amortization period (years)'].push(this.quote.purchaseAndRefinanceLoans.amortizationPeriod)
                        }

                        if(this.quote.purchaseAndRefinanceLoans.recourseType && this.quote.purchaseAndRefinanceLoans.recourseType === 'NO') {
                            obj['Recourse Required '].push(this.quote.purchaseAndRefinanceLoans.recourseType.charAt(0).toUpperCase() + this.quote.purchaseAndRefinanceLoans.recourseType.slice(1).toLowerCase())
                        }

                        if(this.quote.purchaseAndRefinanceLoans.recourseOptions && this.quote.purchaseAndRefinanceLoans.recourseOptions.length > 0) {
                            obj['Recourse type '].push(this.checkRecurseArray(this.quote.purchaseAndRefinanceLoans.recourseOptions))
                        }

                        if(this.quote.purchaseAndRefinanceLoans.recourseNote) {
                            obj['Recourse note'].push(this.quote.purchaseAndRefinanceLoans.recourseNote)
                        }

                        if(this.quote.purchaseAndRefinanceLoans.collectingOriginationFeeType && this.quote.purchaseAndRefinanceLoans.collectingOriginationFeeType !== 'UNDEFINED') {
                            obj['Collecting an origination fee '].push(this.quote.purchaseAndRefinanceLoans.collectingOriginationFeeType.charAt(0).toUpperCase() + this.quote.purchaseAndRefinanceLoans.collectingOriginationFeeType.slice(1).toLowerCase())
                        }

                        if(this.quote.purchaseAndRefinanceLoans.collectingOrigination?.costAmount) {
                            obj['Cost amount'].push('$'+ this.formatDollars(this.quote.purchaseAndRefinanceLoans.collectingOrigination?.costAmount))
                        }
                        if(this.quote.purchaseAndRefinanceLoans.collectingOrigination?.costPercent) {
                            obj['Cost Percent'].push(this.formatPercent(this.quote.purchaseAndRefinanceLoans.collectingOrigination?.costPercent)+' %')
                        }

                        if(this.quote.purchaseAndRefinanceLoans.prePaymentYears) {
                            if(this.changeSomeEnum(this.quote.purchaseAndRefinanceLoans.prePaymentYears) === 'No') {
                                obj['Pre-payment penalties'].push('No Prepayment Penalty')
                            } else {
                                obj['Pre-payment penalties'].push(this.changeSomeEnum(this.quote.purchaseAndRefinanceLoans.prePaymentYears))
                            }
                        }
                        if(this.quote.purchaseAndRefinanceLoans.prePaymentCustomYear) {
                            obj['Custom Pre-payment penalty'] = this.quote.purchaseAndRefinanceLoans.prePaymentCustomYear
                        }

                        this.quotesD = obj
                    }
                }
            },
            companyName() {
                if(this.companyName) {
                    this.tablesBrokerInfo[0].items = [
                        {
                            text1: 'Company name',
                            text2: this.companyName,
                        },
                    ]
                }
            },
        },
        
        async beforeMount() {
            try {
                await this.$store.dispatch('individualQuoteLender', {quote_id:this.$route.params.quote})
                await this.$store.dispatch('individualQuoteBrokerGetDeal', {id:this.$route.params.id})
                this.blockPreloader = false
                this.quoteDeleted = false

            } catch {
                this.quoteDeleted = true
            }
		},

		methods: {
            checkRecurseArray(arr) {
                let str = ''
                if(arr.length === 1) {
                    str = this.changeSomeEnum(arr[0])
                } else {
                    str = `${this.changeSomeEnum(arr[0])}, ${this.changeSomeEnum(arr[1])}`
                }
                return str
            },
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
        },
	})
</script>

<style lang="scss" scoped>

	.individualQuote__wrapper {
        padding: 0 52px 0 42px;

        @include mq($xl) {
            padding: 0 20px;
        }
	}

</style>
