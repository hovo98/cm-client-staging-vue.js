<template>
  <div :class="['page-dashboard page-create-quote', blockPreloader ? 'block-preloader' : '']">
    <div class="row page-create-quote--row">
      <PartCreateQuoteFormSidebar
        v-if="initialReference"
        :initial-reference="initialReference"
        :deal-i-d="dealID"
        :quote-i-d="quoteID"
      />
      <BlockCreateQuoteForm
        v-if="initialReference"
        ref="createQuoteForm"
        :initial-reference="initialReference"
        :deal-i-d="dealID"
        @command="stepperCommand"
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
/* eslint-disable */
import Vue from 'vue';
import BlockDashboardSidebar from '@/components/blocks/BlockDashboardSidebar.vue';
import PartCreateQuoteFormSidebar from '@/components/parts/PartCreateQuoteFormSidebar.vue';
import BlockCreateQuoteForm from '@/components/blocks/BlockCreateQuote/BlockCreateQuoteForm.vue';
import PartFormStepActions from '@/components/parts/PartFormStepActions.vue'

export default Vue.extend({
  name: 'CreateQuote',
  data() {
    return {
      quoteID: null,
      page: 'page-create-quote',
      id: '', // str ref
      firstStep: 'quoteStart',
      stepVisibilityState: [1, 1, 1],
      dealID: 0,
      construction: false,
      purchaseRefinance: true,
    }
  },

  components: {
    PartCreateQuoteFormSidebar,
    BlockDashboardSidebar,
    BlockCreateQuoteForm,
    PartFormStepActions
  },

  async mounted() {

    const dealID = this.$route.params.deal
    const quoteID = this.$route.params.quote
    this.quoteID = quoteID ?? "0"
    this.dealID = parseInt(dealID)
    await this.$store.dispatch('ui', {overlay: true})
    await this.$store.dispatch('getDealByIdQuote', {id: dealID});
    const deal = await this.$store.dispatch('getDealForCreateQuote', {id: dealID});

    if(quoteID) {
        await this.$store.dispatch('getQuote', {id: quoteID});
    }else {
      await this.$store.dispatch('resetQuoteID');
    }
    // if (deal.loan_type === 'PURCHASE' || deal.loan_type === 'REFINANCE') {
    //   this.firstStep = 'quoteStart'
    //   // await this.$store.dispatch('appendQuoteSidebar', true);
    // }

    this.id = this.$route.params.step ?? this.firstStep
    await this.$store.dispatch('ui', {overlay: false})
    /*if(this.purchaseRefinance) {
      this.activeStep = 'prLoansStepOne'
      //this.firstStep = 'prLoansStepOne'
    }*/
  },

  methods: {
    async next() {
      await this.$store.dispatch('ui', {overlay: true})
      await this.$refs.createQuoteForm.handleEvent('next')
    },
    async skip() {
      await this.$store.dispatch('ui', {overlay: true})
      await this.$refs.createQuoteForm.handleEvent('skip')
    },
    async prev() {
      await this.$store.dispatch('ui', {overlay: true})
      await this.$refs.createQuoteForm.handleEvent('prev')
    },
    stepperCommand(obj) {
      if (obj.show) {
        this.stepVisibilityState = obj.show
      }
    }
  },
  computed: {
    initialReference() {
      return this.id
    },
    blockPreloader() {
      return this.$store.getters.overlay
    }
  },
  watch: {
    '$route.params.step': function (step) {
      this.id = step ?? this.firstStep
    },
    '$route.params.deal': function (deal) {
      this.dealId = deal
    },
    '$route.params.quote': function (quote) {
      this.quoteID = quote || quote === null ? quote : '0'
    },
  },
});
</script>

<style lang="scss" scoped>
.page-create-quote--row {
  align-items: stretch;
}
</style>
