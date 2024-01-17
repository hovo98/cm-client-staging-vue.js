<template>
  <div class="quotesBroker">
    <div class="quotesBroker-wrapper">
      <div class="quotesBroker-upper">
        <div
          v-if="lender"
          class="quotesBroker-upper__wrap"
        >
          <div class="quotesBroker-upper__wrap-image">
            <img
              v-if="lender.profile_img && subscription?.status === 'active'"
              class="quotesBroker-upper__wrap__img"
              :src="lender.profile_img"
              alt="logo-small"
            >
            <img
              v-else
              class="quotesBroker-upper__wrap__img"
              :src="placeholderImageUser"
              alt="logo-small"
            >
          </div>
          <span class="quotesBroker-upper__wrap-title">
            <span
              v-if="subscription?.status === 'active'"
              class="quotesBroker-upper__wrap-link"
            >
              {{ lender.company }}'s
            </span>
            Quotes for your Deal
            <!-- <SvgIcon class="blockList-wrap__link-icon" iconName="ico-note"/> --></span>
        </div>
      </div>
      <div class="quote-table">
        <SvgIcon
          class="scroll-indicator"
          icon-name="ico-hand"
        />
        <div class="quote-table-holder">
          <div class="quote-table-wrapper">
            <div class="quote-table__row quote-table__row--header">
              <div class="quote-table__col quote-table__col--name">
                <span class="quote-table__col--name-text" />
              </div>
              <template v-for="(quo, index) in quotes">
                <div
                  :key="index"
                  class="quote-table__col quote-table__col--data"
                >
                  <span class="quote-table__col--name-text">QUOTE {{ index + 1 }}
                    <span
                      v-if="enumType(quo.status) === 'Not available'"
                      class="tooltip-msg tooltip-msg--small"
                      data-tooltip="The lender has chosen to no longer offer the terms of this particular quote. This sometimes happens when too much time lapses between quote date and date of acceptance."
                    >
                      <SvgIcon
                        class="tooltip-msg__icon"
                        icon-name="ico-exclamation"
                      />
                    </span>
                  </span>
                  <div
                    :class="[quotes.length === 2 ? 'quote-table__col-btn-wrapper two-quotes' : 'quote-table__col-btn-wrapper', quotes.length === 3 ? 'quote-table__col-btn-wrapper three-quotes' : 'quote-table__col-btn-wrapper']"
                  >
                    <a
                      v-if="quo.status === 'OPENED'"
                      :class="quo.button ? 'btn btn--small quote-table__col-btn' : 'btn btn--small quote-table__col-btn quote-table__col-btn-disabled'"
                      href="javascript:;"
                      @click.stop="acceptQuote(quo)"
                    >
                      <SvgIcon
                        v-if="enumType(quo.status) === 'Accepted'"
                        class="quote-table__col-btn-icon"
                        icon-name="ico-check"
                      />
                      <span class="quote-table__col-btn-text">{{ enumType(quo.status) }}</span>
                    </a>

                    <a
                      v-else-if="quo.status === 'ACCEPTED'"
                      :class="quo.button ? 'btn btn--small quote-table__col-btn' : 'btn btn--small quote-table__col-btn quote-table__col-btn-disabled quote-table__col-btn-disabled--accepted'"
                      href="javascript:;"
                      @click.stop="acceptQuote(quo)"
                    >
                      <SvgIcon
                        v-if="enumType(quo.status) === 'Accepted'"
                        class="quote-table__col-btn-icon"
                        icon-name="ico-check"
                      />
                      <span class="quote-table__col-btn-text">{{ enumType(quo.status) }}</span>
                    </a>

                    <a
                      v-else-if="quo.status === 'SECOND_ACCEPTED'"
                      :class="quo.button ? 'btn btn--small quote-table__col-btn' : 'btn btn--small quote-table__col-btn quote-table__col-btn-disabled quote-table__col-btn-disabled--accepted'"
                      href="javascript:;"
                      @click.stop="acceptQuote(quo)"
                    >
                      <SvgIcon
                        v-if="enumType(quo.status) === 'Accepted'"
                        class="quote-table__col-btn-icon"
                        icon-name="ico-check"
                      />
                      <span class="quote-table__col-btn-text">{{ enumType(quo.status) }}</span>
                    </a>

                    <a
                      v-else
                      class="btn btn--small quote-table__col-btn quote-table__col-btn-disabled quote-table__col-btn-disabled--green"
                      href="javascript:;"
                    >
                      <SvgIcon
                        v-if="enumType(quo.status) === 'Accepted'"
                        class="quote-table__col-btn-icon"
                        icon-name="ico-check"
                      />
                      <span class="quote-table__col-btn-text">{{ enumType(quo.status) }}</span>
                    </a>
                    <button
                      v-if="quo.status === 'ACCEPTED' || quo.status === 'SECOND_ACCEPTED'"
                      class="unnaccept-btn"
                      @click="declineQuote(quo)"
                    >
                      <SvgIcon
                        class="link__icon"
                        icon-name="ico-arrow-rotate"
                      />Undo Accept
                    </button>
                  </div>
                </div>
              </template>
            </div>
            <template v-for="(value, name, index) in quotesD">
              <template v-if="name === 'Custom Pre-payment penalty' && value.length !== 0">
                <template v-if="ifEmpty(value)">
                  <div
                    v-for="na in checkValuePre(value)"
                    :key="na"
                    class="quote-table__row"
                  >
                    <div class="quote-table__col quote-table__col--name">
                      <span class="quote-table__col--name-text">{{ name }} - {{ na }}</span>
                    </div>
                    <template v-for="(val, newIndex) in value">
                      <div
                        :key="newIndex"
                        class="quote-table__col quote-table__col--data"
                      >
                        <div class="quote-table__col--data-text">{{ formatPercent(val[na - 1]) }}</div>
                      </div>
                    </template>
                  </div>
                </template>
              </template>

              <template v-if="arrEmpty(value) && name !== 'Custom Pre-payment penalty'">
                <div
                  v-if="value.length > 0"
                  :key="index + 225"
                  class="quote-table__row"
                >
                  <div class="quote-table__col quote-table__col--name">
                    <span class="quote-table__col--name-text">{{ name }}</span>
                  </div>
                  <template v-for="(val, newIndex) in value">
                    <div
                      :key="newIndex"
                      class="quote-table__col quote-table__col--data"
                    >
                      <div class="quote-table__col--data-text">{{ val }}</div>
                    </div>
                  </template>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
      <transition name="fade-in-fast">
        <BlockPopupLenderProfile
          v-if="showPopup && quotes"
          :data="lender"
          @closePopup="closePopup"
        />
      </transition>
    </div>
    <transition name="fade-in-fast">
      <BlockPopupAcceptQuote
        v-if="quoteAccepted"
        :quo-for-popup="quoForPopup"
        :quotes="quotes"
        @close="close"
        @accept="processAcceptQuote"
      />
      <BlockPopupQuoteDeleted v-if="quoteDeleted" />
    </transition>
    <transition name="fade-in-fast">
      <BlockPopupDeclineQuote
        v-if="quoteDeclined"
        :quo-for-popup="quoForPopup"
        :quotes="quotes"
        @close="close"
      />
    </transition>
    <p class="quote-table-holder__disclaimer">
      * These terms are for discussion purposes only. It not intended to be, nor
      should it be construed as a commitment to lend but serves merely as a preliminary description of possible terms of
      the proposed<br> financial request. These terms and the financial request are subject to further review, analysis,
      consideration and final approval. The terms outlined may be modified in whole or in part during this review.
    </p>
    <transition name="fade-in-fast">
      <BlockPopupSubscription
        :open="subscriptionModal"
        :quote="quoForPopup"
        @close="subscriptionModal = false"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
import 'vue-good-table/dist/vue-good-table.css'
import ClickOutside from 'vue-click-outside'
import { mapState } from 'vuex'
import { getImagesAsset } from '@/config/util'
import { formatNumber, changeEnum } from '@/config/util'
import BlockPopupLenderProfile from '@/components/blocks/BlockPopup/BlockPopupLenderProfile.vue'
import BlockPopupAcceptQuote from '@/components/blocks/BlockPopup/BlockPopupAcceptQuote.vue'
import BlockPopupDeclineQuote from '@/components/blocks/BlockPopup/BlockPopupDeclineQuote.vue'
import BlockPopupQuoteDeleted from '@/components/blocks/BlockPopup/BlockPopupQuoteDeleted.vue'
import BlockPopupSubscription from '@/components/blocks/BlockPopup/BlockPopupSubscription.vue'

interface Data {
  title: string
  quotesD,
  showPopup: boolean,
  placeholderImageUser: string,
  quoteAccepted: boolean,
  quoteDeclined: boolean,
  quoForPopup,
  quoteDeleted: boolean,
  subscriptionModal: boolean,
  paymentStatus: boolean,
}

export default Vue.extend({
  components: {
    SvgIcon,
    BlockPopupLenderProfile,
    BlockPopupAcceptQuote,
    BlockPopupDeclineQuote,
    BlockPopupQuoteDeleted,
    BlockPopupSubscription,
  },
  props: {
  },

  data(): Data {
    return {
      title: 'This is title of "BlockQuotesBroker"!',
      quotesD: {},
      showPopup: false,
      placeholderImageUser: getImagesAsset('placeholders/user_placeholder_round.png'),
      quoteAccepted: false,
      quoForPopup: {},
      quoteDeclined: false,
      quoteDeleted: false,
      subscriptionModal: false,
      paymentStatus: null,
    }
  },

  watch: {
    async quotes() {
      if (this.quotes) {
        if (this.$route.query.checkout_id) {
          const response = await this.$store.dispatch('checkPaymentStatus', this.$route.query.checkout_id)
          this.paymentStatus = response.data.data.status === 'completed'
          const quoteObject = this.quotes.find(q => Number(q.id) === Number(this.$route.query.quote_id))
          this.quoForPopup = quoteObject
          // this.acceptQuote(quoteObject)
          this.processAcceptQuote()
        }

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
          'Recourse note': [],
          'Collecting an origination fee': [],
          'Collecting fee amount': [],
          'Collecting fee percent': [],
          'Charging an exit fee': [],
          'Exit fee Percent': [],
          'Exit fee amount': [],
          'Comment': [],
          'Permanent loan option': [],

          'Offer amount': [],
          'Loan to value ratio ': [],
          'Loan to cost ratio ': [],
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
          'Recourse note ': [],
          'Collecting an origination fee ': [],
          'Cost amount': [],
          'Cost Percent': [],
          'Pre-payment penalties': [],
          'Custom Pre-payment penalty': [],
        }

        this.quotes.forEach(element => {
          (element.constructionLoans.requestedLoan?.dollarAmount) ?
            obj['Dollar Amount'].push('$' + this.formatDollars(element.constructionLoans.requestedLoan.dollarAmount)) :
            obj['Dollar Amount'].push('');

          (element.constructionLoans.requestedLoan?.loanValue) ?
            obj['Loan to value ratio'].push(this.formatPercentSpecial(element.constructionLoans.requestedLoan.loanValue) + ' %') :
            obj['Loan to value ratio'].push('');
          (element.constructionLoans.requestedLoan?.loanCost) ?
            obj['Loan to cost ratio'].push(this.formatPercentSpecial(element.constructionLoans.requestedLoan.loanCost) + ' %') :
            obj['Loan to cost ratio'].push('');

          (element.constructionLoans.landCosts?.costAmount) ?
            obj['Land costs amount'].push('$' + this.formatDollars(element.constructionLoans.landCosts.costAmount)) :
            obj['Land costs amount'].push('');
          (element.constructionLoans.landCosts?.costPercent) ?
            obj['Land costs percent'].push(this.formatPercent(element.constructionLoans.landCosts.costPercent)) :
            obj['Land costs percent'].push('');

          (element.constructionLoans.softCosts?.costAmount) ?
            obj['Soft costs amount'].push('$' + this.formatDollars(element.constructionLoans.softCosts.costAmount)) :
            obj['Soft costs amount'].push('');
          (element.constructionLoans.softCosts?.costPercent) ?
            obj['Soft costs percent'].push(this.formatPercent(element.constructionLoans.softCosts.costPercent)) :
            obj['Soft costs percent'].push('');

          (element.constructionLoans.hardCosts?.costAmount) ?
            obj['Hard costs amount'].push('$' + this.formatDollars(element.constructionLoans.hardCosts.costAmount)) :
            obj['Hard costs amount'].push('');
          (element.constructionLoans.hardCosts?.costPercent) ?
            obj['Hard costs percent'].push(this.formatPercent(element.constructionLoans.hardCosts.costPercent)) :
            obj['Hard costs percent'].push('');

          (element.constructionLoans.lendTowardsCosts?.costAmount) ?
            obj['Closing costs amount'].push('$' + this.formatDollars(element.constructionLoans.lendTowardsCosts.costAmount)) :
            obj['Closing costs amount'].push('');
          (element.constructionLoans.lendTowardsCosts?.costPercent) ?
            obj['Closing costs percent'].push(this.formatPercent(element.constructionLoans.lendTowardsCosts.costPercent)) :
            obj['Closing costs percent'].push('');

          (element.constructionLoans.interestRateType && element.constructionLoans.interestRateType !== 'UNDEFINED') ?
            obj['Interest rate'].push(this.changeSomeEnum(element.constructionLoans.interestRateType)) :
            obj['Interest rate'].push('');

          (element.constructionLoans.interestRate?.fixedRateAmount) ?
            obj['Fixed Rate Amount'].push(this.formatPercent(element.constructionLoans.interestRate?.fixedRateAmount)) :
            obj['Fixed Rate Amount'].push('');
          (element.constructionLoans.interestRate?.spread) ?
            obj['Spread'].push(this.formatPercent(element.constructionLoans.interestRate.spread)) :
            obj['Spread'].push('');
          (element.constructionLoans.interestRate?.yieldText) ?
            obj['Index'].push(element.constructionLoans.interestRate.yieldText) :
            obj['Index'].push('');
          (element.constructionLoans.interestRate?.floor_rate)
            ? obj['Floor Rate'].push(this.formatPercent(element.constructionLoans.interestRate?.floor_rate))
            : obj['Floor Rate'].push('');

          (element.constructionLoans.interestRate?.spread_second) ?
            obj['Spread   '].push(this.formatPercent(element.constructionLoans.interestRate.spread_second)) :
            obj['Spread   '].push('');
          (element.constructionLoans.interestRate?.yield_second) ?
            obj['Index   '].push(element.constructionLoans.interestRate.yield_second) :
            obj['Index   '].push('');
          (element.constructionLoans.interestRate?.floor_rate_second)
            ? obj['Floor Rate   '].push(this.formatPercent(element.constructionLoans.interestRate?.floor_rate_second))
            : obj['Floor Rate   '].push('');
          (element.constructionLoans.interestRate?.swap_value) ?
            obj['Swap'].push(element.constructionLoans.interestRate.swap_value) :
            obj['Swap'].push('');

          (element.constructionLoans.constructionTerm) ?
            obj['Construction term'].push(element.constructionLoans.constructionTerm) :
            obj['Construction term'].push('');

          (element.constructionLoans.extensionOptionType && element.constructionLoans.extensionOptionType !== 'UNDEFINED') ?
            obj['Extension option'].push(this.changeSomeEnum(element.constructionLoans.extensionOptionType)) :
            obj['Extension option'].push('');

          (element.constructionLoans.extensionOption?.duration) ?
            obj['Duration'].push(element.constructionLoans.extensionOption.duration) :
            obj['Duration'].push('');
          (element.constructionLoans.extensionOption?.feeAmount) ?
            obj['Fee amount'].push('$' + this.formatDollars(element.constructionLoans.extensionOption.feeAmount)) :
            obj['Fee amount'].push('');
          (element.constructionLoans.extensionOption?.feePercentage) ?
            obj['Fee percent'].push(this.formatPercent(element.constructionLoans.extensionOption.feePercentage)) :
            obj['Fee percent'].push('');
          (element.constructionLoans.extensionOption?.allowed) ?
            obj['Allowed'].push(element.constructionLoans.extensionOption.allowed) :
            obj['Allowed'].push('');

          (element.constructionLoans.recourseOptionType && element.constructionLoans.recourseOptionType === 'NO') ?
            obj['Recourse Required'].push(this.changeSomeEnum(element.constructionLoans.recourseOptionType)) :
            obj['Recourse Required'].push('');

          (element.constructionLoans.recourseType && element.constructionLoans.recourseType.length > 0) ?
            obj['Recourse type'].push(this.checkRecurseArray(element.constructionLoans.recourseType)) :
            obj['Recourse type'].push('');

          (element.constructionLoans.recourseNote) ?
            obj['Recourse note'].push(element.constructionLoans.recourseNote) :
            obj['Recourse note'].push('');

          (element.constructionLoans.collectingFeeType && element.constructionLoans.collectingFeeType !== 'UNDEFINED') ?
            obj['Collecting an origination fee'].push(this.changeSomeEnum(element.constructionLoans.collectingFeeType)) :
            obj['Collecting an origination fee'].push('');

          (element.constructionLoans.collectingFee?.feeAmount) ?
            obj['Collecting fee amount'].push('$' + this.formatDollars(element.constructionLoans.collectingFee.feeAmount)) :
            obj['Collecting fee amount'].push('');
          (element.constructionLoans.collectingFee?.feePercent) ?
            obj['Collecting fee percent'].push(this.formatPercent(element.constructionLoans.collectingFee?.feePercent)) :
            obj['Collecting fee percent'].push('');

          (element.constructionLoans.exitFeeType && element.constructionLoans.exitFeeType !== 'UNDEFINED') ?
            obj['Charging an exit fee'].push(this.changeSomeEnum(element.constructionLoans.exitFeeType)) :
            obj['Charging an exit fee'].push('');

          (element.constructionLoans.exitFee?.fee?.feePercent) ?
            obj['Exit fee Percent'].push(this.formatPercent(element.constructionLoans.exitFee?.fee?.feePercent)) :
            obj['Exit fee Percent'].push('');
          (element.constructionLoans.exitFee?.fee?.feeAmount) ?
            obj['Exit fee amount'].push('$' + this.formatDollars(element.constructionLoans.exitFee?.fee?.feeAmount)) :
            obj['Exit fee amount'].push('');

          (element.constructionLoans.exitFee?.comment) ?
            obj['Comment'].push(element.constructionLoans.exitFee?.comment) :
            obj['Comment'].push('');

          (element.constructionLoans.permanentLoanOptionType && element.constructionLoans.permanentLoanOptionType !== 'UNDEFINED') ?
            obj['Permanent loan option'].push(this.changeSomeEnum(element.constructionLoans.permanentLoanOptionType)) :
            obj['Permanent loan option'].push('');

          // offer
          (element.purchaseAndRefinanceLoans.offer?.amount) ?
            obj['Offer amount'].push('$' + this.formatDollars(element.purchaseAndRefinanceLoans.offer?.amount)) :
            obj['Offer amount'].push('');
          (element.purchaseAndRefinanceLoans.offer?.loanToValueRatio) ?
            obj['Loan to value ratio '].push(this.formatPercentSpecial(element.purchaseAndRefinanceLoans.offer?.loanToValueRatio) + ' %') :
            obj['Loan to value ratio '].push('');
          (element.purchaseAndRefinanceLoans.offer?.loanToCostRatio) ?
            obj['Loan to cost ratio '].push(this.formatPercentSpecial(element.purchaseAndRefinanceLoans.offer?.loanToCostRatio) + ' %') :
            obj['Loan to cost ratio '].push('');

          (element.purchaseAndRefinanceLoans.amountOfYears) ?
            obj['Rate fixed for'].push(Number(element.purchaseAndRefinanceLoans.amountOfYears) > 1 ? element.purchaseAndRefinanceLoans.amountOfYears + ' years' : element.purchaseAndRefinanceLoans.amountOfYears + ' year') :
            obj['Rate fixed for'].push('');
          (element.purchaseAndRefinanceLoans.amountOfYearsReset) ?
            obj['Reset years'].push((element.purchaseAndRefinanceLoans.amountOfYearsReset === 'UNDEFINED') ? '' : this.changeSomeEnum(element.purchaseAndRefinanceLoans.amountOfYearsReset)) :
            obj['Reset years'].push('');

          (element.purchaseAndRefinanceLoans.interestRateType && element.purchaseAndRefinanceLoans.interestRateType !== 'UNDEFINED') ?
            obj['Interest rate '].push(this.changeSomeEnum(element.purchaseAndRefinanceLoans.interestRateType)) :
            obj['Interest rate '].push('');

          (element.purchaseAndRefinanceLoans.interestRate?.fixedRateAmount) ?
            obj['Fixed Rate Amount '].push(this.formatPercent(element.purchaseAndRefinanceLoans.interestRate?.fixedRateAmount)) :
            obj['Fixed Rate Amount '].push('');
          (element.purchaseAndRefinanceLoans.interestRate?.spread) ?
            obj['Spread '].push(this.formatPercent(element.purchaseAndRefinanceLoans.interestRate?.spread)) :
            obj['Spread '].push('');
          (element.purchaseAndRefinanceLoans.interestRate?.yieldText) ?
            obj['Index '].push(element.purchaseAndRefinanceLoans.interestRate?.yieldText) :
            obj['Index '].push('');
          (element.purchaseAndRefinanceLoans.interestRate?.floor_rate)
            ? obj['Floor Rate '].push(this.formatPercent(element.purchaseAndRefinanceLoans.interestRate?.floor_rate))
            : obj['Floor Rate '].push('');

          (element.purchaseAndRefinanceLoans.interestRate?.spread_second) ?
            obj['Spread  '].push(this.formatPercent(element.purchaseAndRefinanceLoans.interestRate?.spread_second)) :
            obj['Spread  '].push('');
          (element.purchaseAndRefinanceLoans.interestRate?.yield_second) ?
            obj['Index  '].push(element.purchaseAndRefinanceLoans.interestRate?.yield_second) :
            obj['Index  '].push('');
          (element.purchaseAndRefinanceLoans.interestRate?.floor_rate_second)
            ? obj['Floor Rate  '].push(this.formatPercent(element.purchaseAndRefinanceLoans.interestRate?.floor_rate_second))
            : obj['Floor Rate  '].push('');
          (element.purchaseAndRefinanceLoans.interestRate?.swap_value) ?
            obj['Swap '].push(element.purchaseAndRefinanceLoans.interestRate?.swap_value) :
            obj['Swap '].push('');

          (element.purchaseAndRefinanceLoans.interestPeriod) ?
            obj['Amount of time'].push(element.purchaseAndRefinanceLoans.interestPeriod) :
            obj['Amount of time'].push('');

          (element.purchaseAndRefinanceLoans.interestPeriodType && element.purchaseAndRefinanceLoans.interestPeriodType !== 'UNDEFINED') ?
            obj['Interest only period'].push(this.changeSomeEnum(element.purchaseAndRefinanceLoans.interestPeriodType)) :
            obj['Interest only period'].push('');

          (element.purchaseAndRefinanceLoans.amortizationPeriod) ?
            obj['Amortization period (years)'].push(element.purchaseAndRefinanceLoans.amortizationPeriod) :
            obj['Amortization period (years)'].push('');

          (element.purchaseAndRefinanceLoans.recourseType && element.purchaseAndRefinanceLoans.recourseType === 'NO') ?
            obj['Recourse Required '].push(this.changeSomeEnum(element.purchaseAndRefinanceLoans.recourseType)) :
            obj['Recourse Required '].push('');

          (element.purchaseAndRefinanceLoans.recourseOptions && element.purchaseAndRefinanceLoans.recourseOptions.length > 0) ?
            obj['Recourse type '].push(this.checkRecurseArray(element.purchaseAndRefinanceLoans.recourseOptions)) :
            obj['Recourse type '].push('');

          (element.purchaseAndRefinanceLoans.recourseNote) ?
            obj['Recourse note '].push(element.purchaseAndRefinanceLoans.recourseNote) :
            obj['Recourse note '].push('');

          (element.purchaseAndRefinanceLoans.collectingOriginationFeeType && element.purchaseAndRefinanceLoans.collectingOriginationFeeType !== 'UNDEFINED') ?
            obj['Collecting an origination fee '].push(this.changeSomeEnum(element.purchaseAndRefinanceLoans.collectingOriginationFeeType)) :
            obj['Collecting an origination fee '].push('');

          (element.purchaseAndRefinanceLoans.collectingOrigination?.costAmount) ?
            obj['Cost amount'].push('$' + this.formatDollars(element.purchaseAndRefinanceLoans.collectingOrigination?.costAmount)) :
            obj['Cost amount'].push('');
          (element.purchaseAndRefinanceLoans.collectingOrigination?.costPercent) ?
            obj['Cost Percent'].push(this.formatPercent(element.purchaseAndRefinanceLoans.collectingOrigination?.costPercent)) :
            obj['Cost Percent'].push('')

          if (element.purchaseAndRefinanceLoans.prePaymentYears && element.purchaseAndRefinanceLoans.prePaymentYears !== 'UNDEFINED') {
            if (this.changeSomeEnum(element.purchaseAndRefinanceLoans.prePaymentYears) === 'No') {
              obj['Pre-payment penalties'].push('No Prepayment Penalty')
            } else {
              obj['Pre-payment penalties'].push(this.changeSomeEnum(element.purchaseAndRefinanceLoans.prePaymentYears))
            }
          } else {
            obj['Pre-payment penalties'].push('')
          }

          if (element.purchaseAndRefinanceLoans.prePaymentCustomYear.length > 0) {
            obj['Custom Pre-payment penalty'].push(element.purchaseAndRefinanceLoans.prePaymentCustomYear)
          } else {
            obj['Custom Pre-payment penalty'].push([''])
          }
        })
        this.quotesD = obj
      }
    },
  },

  async beforeMount() {
    await this.$store.dispatch('individualQuoteBroker', { lender_id: parseInt(this.$route.params.lender), deal_id: parseInt(this.$route.params.id) })
    if (this.quotes.length === 0) {
      this.quoteDeleted = true
    } else {
      this.quoteDeleted = false
    }
  },

  computed: {
    ...mapState({
      quotes: state => state['FilterQuotes'].quotesBroker,
      lender: state => state['FilterQuotes'].lender,
    }),
    // quotesBtn() {
    //     let flag = false;
    //     this.quotes.map(ele => {
    //         if(ele.status === 'ACCEPTED') {
    //             flag = true;
    //         }
    //     })
    //     return flag;
    // },
    dealSheetStatus() {
      return this.$store.getters.getDealSheetStatus
    },
    subscription() {
      return this.$store.state.Broker.subscription
    },
  },

  methods: {
    declineQuote(quo) {
      this.quoForPopup = quo
      this.quoteDeclined = true
    },

    checkRecurseArray(arr) {
      let str = ''
      if (arr.length === 1) {
        str = this.changeSomeEnum(arr[0])
      } else {
        str = `${this.changeSomeEnum(arr[0])}, ${this.changeSomeEnum(arr[1])}`
      }
      return str
    },

    enumType(str) {
      if (str === 'OPENED') {
        return 'Accept'
      } else if (str === 'SECOND_ACCEPTED') {
        return 'Accepted'
      }
      str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
      return str.split('_').join(' ')
    },

    close() {
      this.quoteAccepted = false
      this.quoteDeclined = false
    },

    acceptQuote(quo) {
      this.quoForPopup = quo
      this.quoteAccepted = true
    },

    async processAcceptQuote() {
      const response = await this.$store.dispatch('acceptQuoteBroker', this.quoForPopup)

      if (response.data?.errors?.length) {
        this.subscriptionModal = true
        this.close()
      } else {
        this.$store.commit('SET_DEAL_SHEET_STATUS', true)
        this.close()
      }
    },

    ifEmpty(arr) {
      let flag = false
      arr.forEach(arr1 => {
        if (arr1[0] !== undefined && arr1[0] !== '') {
          flag = true
        }
      })
      return flag
    },
    checkValuePre(arr) {
      let count = 0
      arr.forEach(arr1 => {
        if (count < arr1.length) {
          count = arr1.length
        }
      })
      return count
    },

    arrEmpty(arr) {
      let flag = false
      arr.forEach(element => {
        if (element !== '') {
          flag = true
        }
      })
      return flag
    },

    hideBtn() {
      const btn = document.querySelector('.quotesBroker-upper__wrap-drop--spec')
      btn.classList.remove('active-btn')
    },

    toggleActive() {
      const btn = document.querySelector('.quotesBroker-upper__wrap-drop--spec')
      btn.classList.toggle('active-btn')
    },

    formatDollars(field) {
      return formatNumber(field)
    },

    changeSomeEnum(str) {
      return changeEnum(str)
    },

    openPopup() {
      this.showPopup = true
    },
    closePopup() {
      this.showPopup = false
    },
    formatPercentSpecial(num) {

      if (num === '000.00' || num === '00.00' || num === undefined)
        return '0'

      const zero = num.toString().slice(-1)
      const zeros = num.toString().slice(-2)
      if (zeros === '00') {
        return num.toString().slice(0, -3)
      } else if (zeros === '.0') {
        return num.toString().slice(0, -2)
      }
      if (zero === '.') {
        return num.toString().slice(0, -1)
      }
      if (num.length === 5 && zero === '0') {
        return num.toString().slice(0, -1)
      }
      return num
    },
    formatPercent(num) {
      if (num === undefined || num === '')
        return ''

      if (num === '000.00' || num === '00.00' || num === '0.00' || num === '0')
        return '0 %'


      const zero = num.toString().slice(-1)
      const zeros = num.toString().slice(-2)

      if (zeros === '00') {
        return num.toString().slice(0, -3) + ' %'
      } else if (zeros === '.0') {
        return num.toString().slice(0, -2) + ' %'
      }
      if (zero === '0' || zero === '.') {
        return num.toString().slice(0, -1) + ' %'
      }
      return num + ' %'
    },
  },

  directives: {
    ClickOutside,
  },
})
</script>

<style lang="scss" scoped>
.quotesBroker {
  padding-left: 42px;
  padding-right: 52px;
  margin-top: 30px;

  @include mq($xl) {
    padding: 0 20px;
  }
}

.quotesBroker-wrapper {
  background-color: $white;
  padding: 20px 0 28px;
}

.quotesBroker-upper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 29px 5px 32px;

  @include mq($md) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  @include mq($sm) {
    padding: 0 15px 5px;
  }

  @include mq(430px) {
    justify-content: center;
    align-items: center;
  }
}

.quotesBroker-upper__wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @include mq(430px) {
    flex-direction: column;
  }
}

.quotesBroker-upper__wrap-image {
  max-width: 54px;
  max-height: 54px;
  margin-right: 22px;
  border-radius: 50%;
  overflow: hidden;

  @include mq(430px) {
    margin-right: 0;
  }
}

.quotesBroker-upper__wrap-title {
  color: $shark;
  font-family: $font-main;
  font-size: 14px;
  font-weight: 600;

  @include mq(430px) {
    margin-top: 10px;
    font-size: 13px;
    text-align: center;
  }
}

.quotesBroker-upper__wrap-link {
  color: $blue-chill;
  font-weight: 700;
  transition: $dur $ease;
}

.blockList-wrap__link-icon {
  font-size: 11px;
  height: 11px;
  margin-left: 13px;
  color: $mosque;

  @include mq(430px) {
    margin-left: 4px;
  }
}

.quotesBroker-upper__wrap-drop {

  @include mq(430px) {
    align-self: flex-start;
  }
}

.quotesBroker-upper__wrap-dropper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 23px;
  right: 1px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  background-color: $white;
  min-width: 214px;
  padding: 16px 20px 15px 20px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 10;
  transition: $dur $ease;

  @include mq($md) {
    top: 30px;
    right: auto;
    left: 0;
  }

  @include mq(430px) {
    left: 50%;
    transform: translateX(-50%);
    min-width: 140px;
    padding: 10px;
  }
}

.quotesBroker-upper__wrap-dropper-link {
  font-size: 14px;
  font-family: $font-main;
  font-weight: 700;
  letter-spacing: 0.07px;
  line-height: 30px;
  margin-bottom: 4px;
  color: $mosque;
  transition: $dur $ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    color: $yellow-orange;
  }

  @include mq(430px) {
    font-size: 13px;
  }
}

.quotesBroker-upper__wrap-drop--spec {
  position: relative;
  font-size: 15px;
  font-family: $font-main;
  color: $mosque;
  font-weight: 700;
  padding-right: 14px;
  padding-left: 25px;
  margin-top: 51px;
  cursor: pointer;
  transition: $dur $ease;

  &:hover {
    color: $yellow-orange;
  }

  &.active-btn {

    .quotesBroker-upper__wrap-dropper {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }
  }

  @include mq($md) {
    margin-top: 20px;
  }

  @include mq(430px) {
    font-size: 13px;
    margin-top: 10px;
    padding-right: 12px;
    padding-left: 18px;
  }
}

.blockList-wrap__link-big-icon {
  font-size: 17px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);

  @include mq(430px) {
    font-size: 15px;
  }
}

.blockList-wrap__link-small-icon {
  font-size: 10px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  @include mq(430px) {
    font-size: 8px;
  }
}

.quotesBroker-bottom {
  margin-top: 24px;
  padding: 0 32px;

  @include mq($md) {
    margin-top: 5px;
  }

  @include mq($sm) {
    padding: 0 15px;
  }
}

.quote-table {
  position: relative;
}

.quote-table-holder {
  padding: 30px;
  width: 100%;

  @include mq($md) {
    padding: 30px 0 5px;
    overflow-x: auto;
  }
}

.quote-table-wrapper {
  display: flex;
  flex-direction: column;
  border: 1px solid $aqua-haze;

  @include mq($md) {
    min-width: 650px;
    margin: 0 5px;
  }
}

.quote-table__row {
  display: flex;
  width: 100%;
}

.quote-table__col {
  padding: 9px 30px;
  border: 1px solid $aqua-haze;
  min-width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: flex-start;

  @include mq($lg) {
    width: 15%;
    padding: 7px 10px;
  }
}

.quote-table__col--name,
.quote-table__col--name-text {
  font-size: 12px;
  color: $shark;
  font-weight: 600;
  line-height: 1.35;
  text-transform: uppercase;
  width: 30%;

  .quote-table__row--header & {
    color: $mosque;
    padding: 9px 30px;
  }

  @include mq($lg) {
    text-align: left;
    font-weight: 500;
  }

  @include mq($md) {
    width: 25%;
  }
}

.quote-table__col--name-text {
  width: 100%;
  height: 37px;
}

.quote-table__col-btn-wrapper {
  width: 100%;
  border-top: 2px solid #f1f7f7;
  padding: 9px 30px;

  .quote-table__col-btn {
    width: 100%;
    max-width: 230px;
    text-transform: capitalize;
  }

  .quote-table__col-btn-icon {
    margin-right: 10px;
  }

  @include mq($lg) {
    text-align: left;
    padding: 9px 10px;
  }
}

.quote-table__col--data {
  font-size: 14px;
  color: $shark;
  font-weight: 700;
  line-height: 1.5;
  text-transform: uppercase;
  flex-grow: 1;
  width: 20%;

  @include mq($lg) {
    font-size: 12px;
    text-align: center;
    justify-self: center;
    font-weight: 500;
    width: 25%;
  }
}

.scroll-indicator {
  position: absolute;
  top: 4px;
  right: 35px;
  font-size: 19px;
  height: 23px;
  color: $mosque;
  animation: scroll-finger 2.5s ease-in-out infinite alternate;
  animation-direction: alternate;
  z-index: 2;
  display: none;

  @keyframes scroll-finger {
    0% {
      transform: translateX(30px);
    }

    100% {
      transform: translateX(-30px);
    }
  }

  @include mq($md) {
    display: block;
  }
}

.quote-table__row--header {
  .quote-table__col--data {
    padding: 0;
  }
}

.quote-table__col-btn-disabled {
  background-color: $santas-gray;
  border-color: $santas-gray;
  pointer-events: none;
  cursor: not-allowed;
}

.quote-table__col-btn-disabled--green {
  // background-color: $mosque;
  // border-color: $mosque;
  pointer-events: none;
  cursor: not-allowed;
}

.quote-table__col-btn-disabled--accepted {
  background-color: $blue-chill;
  border-color: $blue-chill;
}

.tooltip-msg {
  &::before {
    left: -177px;
    text-transform: none;
  }

  @include mq($md) {
    &::before {
      left: 32px;
      top: 56px;
    }

    &::after {
      display: none;
    }
  }
}

.quote-table-holder__disclaimer {
  font-size: 14px;
  font-style: italic;
  margin-top: 10px;
  color: $blue-chill;

  @include mq(1470px) {
    br {
      display: none;
    }
  }

  @include mq(500px) {
    font-size: 12px;
  }
}

.unnaccept-btn {
  background: transparent;
  border: none;
  outline: none;
  color: $blue-chill;
  font-weight: bold;
  margin-left: 12px;
  transition: $dur $ease;

  .svg-icon.link__icon {
    width: 15px;
    margin-right: 6px;
  }

  &:hover {
    color: $yellow-orange;
  }
}

.two-quotes {
  @include mq(1523px) {
    .quote-table__col-btn {
      max-width: 100%;
      margin-bottom: 10px;
    }

    .unnaccept-btn {
      display: block;
      margin: 0 auto;
    }
  }
}

.three-quotes {
  .quote-table__col-btn {
    max-width: 100%;
    margin-bottom: 10px;
  }

  .unnaccept-btn {
    display: block;
    margin: 0 auto;

    @include mq(991px) {
      font-size: 14px;
    }
  }
}</style>
