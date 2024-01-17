<template>
  <div class="cq-form">
    <PartCreateFormProgressBar
      :reference="initialReference"
      type="quote"
    />
    <div class="cd-form__wrapper">
      <BlockCreateQuoteStart
        v-if="isActiveReference('quoteStart')"
        ref="quoteStart"
        next-action="quoteInfo"
        skip-action="quoteInfo"
        :quote-i-d="quote"
      />
      <BlockCreateQuoteInfo
        v-if="isActiveReference('quoteInfo')"
        ref="quoteInfo"
        next-action="quoteInterest"
        skip-action="quoteInterest"
        prev-action="quoteStart"
        :quote-i-d="quote"
        @dealDrafted="dealDrafted"
      />
      <BlockCreateQuoteInterest
        v-if="isActiveReference('quoteInterest')"
        ref="quoteInterest"
        next-action="quoteStepThree"
        skip-action="quoteStepThree"
        prev-action="quoteInfo"
        :quote-i-d="quote"
        @dealDrafted="dealDrafted"
      />
      <BlockCreateQuoteStepThree
        v-if="isActiveReference('quoteStepThree')"
        ref="quoteStepThree"
        next-action="quoteFinish"
        skip-action="prLoansStepOne"
        prev-action="quoteInterest"
        :quote-i-d="quote"
        @dealDrafted="dealDrafted"
      />

      <!-- Purchase and Reference loan steps -->
      <BlockPrLoansStepOne
        v-if="isActiveReference('prLoansStepOne')"
        ref="prLoansStepOne"
        next-action="prLoansStepTwo"
        skip-action="prLoansStepTwo"
        prev-action="quoteStepThree"
        :quote-i-d="quote"
        @dealDrafted="dealDrafted"
      />
      <BlockPrLoansStepTwo
        v-if="isActiveReference('prLoansStepTwo')"
        ref="prLoansStepTwo"
        next-action="prLoansStepThree"
        skip-action="prLoansStepThree"
        prev-action="prLoansStepOne"
        :quote-i-d="quote"
        @dealDrafted="dealDrafted"
      />
      <BlockPrLoansStepThree
        v-if="isActiveReference('prLoansStepThree')"
        ref="prLoansStepThree"
        next-action="prLoansStepFour"
        skip-action="prLoansStepFour"
        prev-action="prLoansStepTwo"
        :quote-i-d="quote"
        @dealDrafted="dealDrafted"
      />
      <BlockPrLoansStepFour
        v-if="isActiveReference('prLoansStepFour')"
        ref="prLoansStepFour"
        next-action="quoteSummary"
        skip-action="quoteSummary"
        prev-action="prLoansStepThree"
        :quote-i-d="quote"
        @dealDrafted="dealDrafted"
      />

      <BlockCreateQuoteSummary
        v-if="isActiveReference('quoteSummary')"
        ref="quoteSummary"
        next-action="quoteFinish"
        skip-action="quoteFinish"
        prev-action="prLoansStepFour"
        :quote-i-d="quote"
        @dealDrafted="dealDrafted"
      />

      <!-- Thank you Message -->
      <BlockCreateQuoteFinish
        v-if="isActiveReference('quoteFinish')"
        ref="quoteFinish"
        prev-action="quoteSummary"
        :quote-i-d="quote"
      />
    </div>
    <BlockPopupDealDrafted v-if="dealDraftedPopup" />
  </div>
</template>


<script lang="ts">
/* eslint-disable */
import Vue from 'vue';
import BlockCreateQuoteStart from '@/components/blocks/BlockCreateQuote/BlockCreateQuoteStart.vue';
import BlockCreateQuoteInfo from '@/components/blocks/BlockCreateQuote/BlockCreateQuoteInfo.vue';
import BlockCreateQuoteInterest from '@/components/blocks/BlockCreateQuote/BlockCreateQuoteInterest.vue';
import BlockCreateQuoteStepThree from '@/components/blocks/BlockCreateQuote/BlockCreateQuoteStepThree.vue';
import BlockPrLoansStepOne from '@/components/blocks/BlockCreateQuote/BlockPrLoansStepOne.vue';
import BlockPrLoansStepTwo from '@/components/blocks/BlockCreateQuote/BlockPrLoansStepTwo.vue';
import BlockPrLoansStepThree from '@/components/blocks/BlockCreateQuote/BlockPrLoansStepThree.vue';
import BlockCreateQuoteSummary from '@/components/blocks/BlockCreateQuote/BlockCreateQuoteSummary.vue';
import BlockPrLoansStepFour from '@/components/blocks/BlockCreateQuote/BlockPrLoansStepFour.vue';
import BlockCreateQuoteFinish from '@/components/blocks/BlockCreateQuote/BlockCreateQuoteFinish.vue';
import PartCreateFormProgressBar from '@/components/parts/PartCreateFormProgressBar.vue';
import Deal from "@/services/Deal";
import Quote from "@/services/Quote";
import BlockPopupDealDrafted from '@/components/blocks/BlockPopup/BlockPopupDealDrafted.vue';


interface Data {
  activeReference,
  dealDraftedPopup
}

export default Vue.extend({
  props: {
    quote: {
      type: String,
      required: false,
      default: ''
    },
    initialReference: {
      type: String,
      required: true
    },
    dealID: {
      type: Number,
      required: true
    },
  },

  data(): Data {
    return {
      activeReference: false,
      dealDraftedPopup: false,
    };
  },

  components: {
    PartCreateFormProgressBar,
    BlockCreateQuoteStart,
    BlockCreateQuoteInfo,
    BlockCreateQuoteInterest,
    BlockCreateQuoteSummary,
    BlockCreateQuoteFinish,
    BlockCreateQuoteStepThree,
    BlockPrLoansStepOne,
    BlockPrLoansStepTwo,
    BlockPrLoansStepThree,
    BlockPrLoansStepFour,
    BlockPopupDealDrafted
  },

  async mounted() {
    this.$store.dispatch('quoteSidebar', {
      reference: this.initialReference,
      stepStatus: false,
      currentStep: true,
    })
    this.setStepperButtonsState();

    const dealID = this.$route.params.deal
    const dealObject_ = await this.$store.dispatch("getDealByIdQuote", {id: dealID});
    const dealStatus = dealObject_.data.data.dealObject.deal.finished

    // If dealStatus is false, it means the deal is in drafts and it won't be saved. And popup will be shown.
    if(dealStatus) {
      this.dealDraftedPopup = false;
    } else {
      this.dealDraftedPopup = true;
    }
  },

  methods: {
    dealDrafted() {
      this.dealDraftedPopup = true;
    },
    setStepperButtonsState() {
      /* state of back, skip, next buttons */
      const inDev = 0
      let stepperButtonsVisibilityState = [1, inDev, 1]
      if (this.initialReference === 'quoteStart') {
        stepperButtonsVisibilityState = [0, inDev, 1]
      }
      if (this.initialReference === 'quoteFinish') {
        stepperButtonsVisibilityState = [0, inDev, 0]
      }
      if (this.initialReference === 'prLoansStepOne' && this.appendedSidebar === false) {
        stepperButtonsVisibilityState = [1, inDev, 1]
      }
      if (this.initialReference === 'prLoansStepOne' && this.appendedSidebar === true) {
        stepperButtonsVisibilityState = [1, inDev, 1]
      }
      this.$emit('command', {show: stepperButtonsVisibilityState})
    },
    async handleEvent(event) {

      const command = Quote.stepper.command
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
        const idQuote = this.quoteID === null ? '' : this.quoteID
        const path = '/create-quote/' + this.dealID + '/' + this.prevRef + '/' + idQuote
        if(this.prevRef) {
          await this.$store.dispatch('quoteSidebar', payload(this.prevRef, ref, isCompleted))
          await this.$router.push({ path: path})
        }
      });
      if(event === 'next') await nextCommand.run(async (ref, isCompleted) => {

          if(this.initialReference === 'quoteStart') {
              if(this.quoteDeal.loan_type === 'PURCHASE' || this.quoteDeal.loan_type === 'REFINANCE') {
                  ref = 'prLoansStepOne';
              }
          }

        await this.$store.dispatch('quoteSidebar', payload(ref, this.initialReference, isCompleted))
        const quotePath = this.quoteID ? '/' + this.quoteID : ''
        await this.$router.push({ path: '/create-quote/' + this.dealID + '/' + ref + quotePath })
      }, async () => {
        await this.$store.dispatch('ui', {overlay: false})
      });
    },
    isActiveReference(reference) {
      return this.initialReference === reference
    },
  },


  computed: {
    prevRef() {
      // return 'ptevRef';
      return this.$store.getters.getQuoteSidebarHistory.length > 0 ? this.$store.getters.getQuoteSidebarHistory[this.$store.getters.getQuoteSidebarHistory.length-1] : false
    },
    quoteID() {
      return this.$store.getters.getQuoteID
    },
    appendedSidebar() {
      return this.$store.getters.getQuoteSidebarAppendedStatus
    },
    quoteDeal() {
      return this.$store.getters.getQuoteDeal
    },
  },

  destroyed: function() {
    this.$store.dispatch('resetHistory');
  },

  watch: {
    'initialReference': function (step) {
      this.$store.dispatch('quoteSidebar', {
        reference: step,
        stepStatus: false,
        currentStep: true
      })
      this.setStepperButtonsState()
    },
  },
});
</script>

<style lang="scss" scoped>
.cq-form {
  background-color: $white;
  padding: 28px 60px;
  flex: 0 0 calc(77.8% - 30px);
  min-width: calc(77.8% - 30px);

  @include mq($lg) {
    flex: 0 0 100%;
    min-width: 100%;
    padding: 20px 30px;
  }
}

.cq-form-inner {
  width: 100%;
  // max-width: 630px;
}

.cq-form-inner--full {
  max-width: 100%;
}
</style>
