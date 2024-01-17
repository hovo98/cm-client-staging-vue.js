<template>
  <div class="cq-form-inner cq-form-inner--full">
    <div class="start-step">
      <div class="start-step__img">
        <img
          src="@/assets/images/shared/start-step.png"
          alt="Start creating a quote image"
        >
      </div>
      <div class="start-step__content">
        <h2 class="start-step__title block-title">Send a soft quote in one,<br> easy-to-complete submission form</h2>
        <div class="start-step__title block-text">
          <p>Now that you’ve reviewed all the details of this loan request, let’s get quoting!</p>
        </div>
        <div class="start-step__title block-text block-text--alt">
          <p>
            These terms are for discussion purposes only. It is not intended to be, nor should it be construed as a commitment to lend but serves merely as a preliminary description of possible terms of the proposed financial request. These terms and the financial request are subject to further review, analysis, consideration and final approval. The terms outlined may be modified in whole or in part during this review.
            All parties receiving this quote will be made aware of the non-binding nature of the quote as described above.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    interface Data {
        title: string
        change: boolean
    }

    export default Vue.extend({
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
                title: 'This is title of "BlockCreateQuoteStart"!',
                change: false,
            }
        },

      mounted(){
        this.$store.dispatch('ui', {overlay: false})
      },

        methods: {
            async next() {
                return this.nextAction
            },
            async skip() {
                return this.skipAction
            },
            async prev() {
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
    .start-step {
        text-align: center;
        max-width: 830px;
        margin: 0 auto;
    }

    .start-step__img {
        margin-bottom: 50px;
    }

    .start-step__title {
        margin-bottom: 40px;

        @include mq($sm) {
           font-size: 20px;
        }
    }

    .block-title {
        font-size: 29px;

        @include mq(600px) {
            font-size: 22px;
        }
    }

    .block-text {
        p {
            @include mq(600px) {
                font-size: 16px;
            }
        }
    }

    .block-text--alt p{
        font-size: 14px;
        font-style: italic;
    }
</style>
