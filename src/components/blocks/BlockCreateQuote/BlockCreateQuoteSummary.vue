<template>
  <div class="cq-form-inner">
    <div class="quote-summary">
      <div class="quote-summary__list">
        <PartDottedList />
      </div>
      <div class="input-holder">
        <label class="input-label">Include a message to the broker</label>
        <textarea
          v-model="msg"
          rows="3"
        />
        <span
          v-if="forbiddenMessageError"
          class="error-message"
        >Deals can only be quoted and accepted through FL, so please wait to share contact information until the quote is accepted via the platform, at which time the contact info will be shared on the platform.</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import PartDottedList from '@/components/parts/PartDottedList.vue'
    import { checkForbidenWords } from '@/config/util'

    interface Data {
        title: string
        change: boolean
        msg: string
        dealEdited: boolean
        forbiddenMessageError: boolean
    }

    export default Vue.extend({

        components: {
            PartDottedList,
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
                title: 'This is title of "BlockCreateQuoteSummary"!',
                change: false,
                msg: '',
                dealEdited: false,
                forbiddenMessageError: false,
            }
        },

        async mounted() {
            try {
                await this.$store.dispatch('getQuote', {id: this.$route.params.quote})
                this.$store.dispatch('ui', {overlay: false})

            } catch(e) {
                this.dealEdited = true
                this.$emit('dealDrafted')
            }
        },

        methods: {
            async next() {
                const dealID = this.$route.params.deal
                const quoteID = this.$route.params.quote
                let forbidden_msg = checkForbidenWords(this.msg)
                if(forbidden_msg) {
                    await this.$store.dispatch("quoteErrorMessage", {deal_id: parseInt(dealID), quote_id: parseInt(quoteID), message: this.msg})
                    this.forbiddenMessageError = true
                    return
                }
                this.forbiddenMessageError = false

                const dealObject_ = await this.$store.dispatch("getDealByIdQuote", {id: dealID})
                const dealStatus = dealObject_.data.data.dealObject.deal.finished
                
                // If dealStatus is false, it means the deal is in drafts and it won't be saved. And popup will be shown.
                if(dealStatus) {
                    await this.$store.dispatch('finishQuote', {msg: this.msg})
                    return this.nextAction
                } else {
                    this.$emit('dealDrafted')
                    return
                }
            },
            async skip() {
                return this.skipAction
            },
            async prev() {
                return this.prevAction
            },
        },
    })
</script>

<style lang="scss" scoped>
    .quote-summary__list {
        margin-bottom: 54px;
    }

    .quote-summary {
        max-width: 630px;
    }

    .input-holder {
        position: relative;
    }

    @media screen and (max-width: 460px) {
        .error-message {
            font-size: 10px;
        }
    }
    
</style>
