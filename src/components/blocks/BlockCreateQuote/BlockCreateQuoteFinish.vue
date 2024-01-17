<template>
  <div class="cq-form-inner cq-form-inner--full">
    <div class="finish-step">
      <div class="finish-step__img">
        <img
          src="@/assets/images/shared/finish-step.png"
          alt="Thank You image"
        >
      </div>
      <div class="finish-step__content">
        <h2 class="finish-step__title block-title">Success! <br>We’ve sent your quote to the broker.<br> We’ll notify you when the broker responds.</h2>
        <a
          class="btn btn--small"
          href="javascript:;"
          @click="getDealURL()"
        >Return to the Deal</a>
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
                title: 'This is title of "BlockCreateQuoteFinish"!',
                change: false,
            }
        },

      mounted() {
        this.$store.dispatch('ui', {overlay: false})
        this.$store.dispatch('resetHistory')
      },

        methods: {
            getDealURL () {
                this.$store.commit('SET_LAST_STEP_BTN')
                this.$router.push({path: '/individual-deal/' + this.$route.params.deal})
            },
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
    .finish-step {
        text-align: center;
    }

    .finish-step__img {
        margin-bottom: 50px;
    }

    .finish-step__title {
        margin-bottom: 40px;

        @include mq($sm) {
           font-size: 15px;
        }
    }
</style>
