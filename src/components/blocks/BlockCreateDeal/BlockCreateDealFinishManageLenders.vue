<template>
  <div class="cd-form-inner">
    <BlockProfileBrokerDetails
      :profile="false"
      :user-id="userId"
    />
    <transition name="fade-in-fast">
      <BlockPopupSubscription
        :open="subscriptionModal"
        action="create_deal"
        :deal="dealId"
        @close="subscriptionModal = false"
        @force="handleForceCreateDeal"
      />
    </transition>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import BlockProfileBrokerDetails from '@/components/blocks/BlockProfileTabs/BlockProfileBrokerDetails.vue'
    import BlockPopupSubscription from '@/components/blocks/BlockPopup/BlockPopupSubscription.vue'

    export default Vue.extend({

        components: {
            BlockProfileBrokerDetails,
            BlockPopupSubscription,
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

        data() {
            return {
                userId: null,
                subscriptionModal: false,
            }
        },

        computed: {
            dealId() {
                return this.$store.getters.getId
            },
            subscription() {
              return this.$store.state.Broker.subscription
            },
        },

        async mounted() {
            const lStorage = localStorage.getItem('auth') || null
            let lsAuth = null
            if(lStorage) {
                lsAuth = JSON.parse(lStorage)
                this.userId = lsAuth?.user?.id
                await this.$store.dispatch('getBrokerLender', lsAuth?.user?.id)
            }

            if(!this.dealId && !this.profile && !this.$route.query.checkout_id) {
                this.$router.push({ path:'/broker-deals'})
            }
            this.$store.dispatch('ui', { overlay: false })
            this.$store.dispatch('setForceDeal', false)
        },

        methods: {
          async next() {
            const response = await this.$store.dispatch('setBrokerFinish', this.$store.state.Broker.forceDeal)
            if (response?.data?.errors?.length) {
              this.subscriptionModal = true
              return false
            } else {
              this.$store.dispatch('removeAllDeals')
              this.$store.dispatch('setForceDeal', false)
              return this.nextAction
            }
          },
          handleForceCreateDeal() {
            this.$store.dispatch('setForceDeal', true)
            this.subscriptionModal = false
            this.$emit('forceDeal')
          },
            skip() {
                return this.skipAction
            },
            prev() {
                return this.prevAction
            },
        },
    })
</script>

<style lang="scss" scoped>
    .manage-lenders {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 50px;

        @include mq($lap-l) {
            flex-direction: column-reverse;
        }
    }

    .manage-lenders__wrap {
        max-width: 630px;
        width: 100%;
    }

    .manage-lenders--profile {
        .manage-lenders__wrap {
            max-width: 800px;
        }
    }

    .manage-lenders__aside {
        flex: 1;
        max-width: 390px;
        margin: 0 auto;

        @include mq($lap-l) {
            max-width: 100%;
            margin: 0 0 20px;
        }
    }

    .manage-lenders__head {
        margin-bottom: 50px;
    }

    .manage-lenders__head-title {
        line-height: 1.55;
        letter-spacing: 0.09px;
        margin-bottom: 20px;
    }

    .manage-lenders__invite-form {
        margin: 30px 0 43px;
    }

    .manage-lenders__actions-wrap {
        margin: 20px 0;
    }

    .manage-lenders__actions-footer {
        margin-top: 40px;
    }

    .manage-lenders__fake-input {
        border: 1px solid #2f3034;
        width: 100%;
        border-radius: 4px;
        padding: 7px 10px 5px;
        min-height: 55px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        input {
            padding: 3px;
            border: 0;
            flex-grow: 1;
            width: auto;
        }

        @include mq($lap-l) {
            padding: 5px 10px;
            min-height: 46px;
        }
    }

    .manage-lenders__pill {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.2;
        position: relative;
        color: $shark;
        display: inline-block;
        border: 1px solid $yellow-orange;
        background-color: $fantasy;
        border-radius: 24px;
        padding: 5px 30px 5px 10px;
        margin: 3px;

        @include mq($sm) {
            font-size: 15px;
        }
    }

    .manage-lenders__pill-remove__icon {
        font-weight: 600;
    }

    .manage-lenders__pill-remove {
        position: absolute;
        color: $shark;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        height: 16px;
        width: 16px;
        border-radius: 50%;
        border: 1px solid transparent;
        font-size: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: $dur $ease;

        @include hover {
            border: 1px solid $yellow-orange;
            color: $yellow-orange;
        }
    }

    .error-list {
        margin-top: 15px;
    }

    .error-list__inner {
        margin-bottom: 2px;
    }

    .error-list__title {
        font-size: 15px;
        color: $blue-chill;
        font-weight: 500;
    }

    .error-list__text {
        font-size: 15px;
        color: $shark;
    }
</style>
