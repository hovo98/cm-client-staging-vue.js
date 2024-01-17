<template>
  <div class="cd-form-inner cd-form-inner--full">
    <div class="finish-step">
      <div class="finish-step__img">
        <img
          src="@/assets/images/shared/finish-step.png"
          alt="Thank You image"
        >
      </div>
      <div class="finish-step__content">
        <h2 class="finish-step__title block-title">Congratulations! Your deal is live.<br>We'll email you quotes as they come in. </h2>
        <a
          class="btn btn--small finish-step__content-btn"
          href="javascript:;"
          @click="$router.push({ path: '/broker-deals/'})"
        >View All Deals</a>
        <a
          class="btn btn--small finish-step__content-btn"
          href="javascript:;"
          @click="createDeal()"
        >Create a New Deal</a>
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

        components: {
        },
        props: {
            dealID: {
                type: Number,
                default: 0,
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
                title: 'This is title of "BlockCreateDealFinish"!',
                change: false,
            }
        },

        mounted() {
            this.$store.dispatch('ui', {overlay: false})
            this.$store.dispatch('removeDealFinish')
        },

        methods: {
            async createDeal() {
                await this.$store.commit('REMOVE_DEAL')
                this.$router.push('/create-deal')
            },

            next() {
                return this.nextAction
            },
            skip() {
                return this.skipAction
            },
            prev() {
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

    .finish-step__content-btn {
        margin: 0 15px;

        @include mq(374px) {
            margin: 0 5px;

            .btn--small {
                font-size: 12px;
                padding: 8px 10px;
            }
        }
    }

    @include mq(374px) {
        .btn--small {
            font-size: 12px;
            padding: 8px 10px;
        }
    }
</style>
