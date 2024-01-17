<template>
    <div class="profile-tabs__content profile-tab-details profile-tab-details-subscription">
        <div class="manage-lenders__body">
            <h3 class="filer-list__title  title-extra-small">Subscription status</h3>
            <p>{{ statusText }}</p>
            <h3 class="filer-list__title title-extra-small" v-if="hasSubscription">Subscription type</h3>
            <p v-if="hasSubscription">{{ subscription?.name }}<span v-if="isTrialing"> - Free</span></p>
            <h3 class="filer-list__title title-extra-small" v-if="hasSubscriptionAndNotCancelled">Next billing date</h3>
            <p v-if="hasSubscriptionAndNotCancelled">{{ subscription?.next_billing_date }}</p>
            <h3 class="filer-list__title title-extra-small" v-if="hasSubscriptionAndNotCancelled">Next billing amount</h3>
            <p v-if="hasSubscriptionAndNotCancelled">${{ subscription?.next_billing_amount }}</p>
            <p v-if="hasSubscription && subscription.status === 'canceled'">
                Cancelation will be effective at the end of your current billing period on {{ subscription.ends_at }}
            </p>
            <p v-if="hasSubscription && subscription.downgraded_message">
               {{ subscription.downgraded_message }}
            </p>
            <div class="btn-holder">
                <button
                    class="btn"
                    href="javascript:;"
                    @click="handleManageMySubscription"
                >
                    <img
                        v-if="showLoader"
                        src="@/assets/images/loader.gif"
                        alt="loader"
                        class="submit-btn-loader"
                    />
                    <span v-else>Edit Subscription</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'


interface Data {
    showLoader: boolean
}

export default Vue.extend({

    data(): Data {
        return {
            showLoader: false,
        }
    },

    computed: {
        isTrialing() {
            return this.$store.getters.subscriptionIsTrial
        },
        user() {
            return this.$store.getters.getUser
        },
        userId() {
            return this.$store.getters.getUserId
        },
        subscription() {
            return this.$store.state.Broker.subscription
        },
        hasSubscription() {
            return this.subscription?.status
        },
        hasSubscriptionAndNotCancelled() {
            return this.hasSubscription && this.subscription.status !== 'canceled' && !this.isTrialing
        },
        statusText() {
            return this.hasSubscription ?
                this.subscription?.status?.charAt(0).toUpperCase() + this.subscription?.status?.slice(1) :
                'Free tier'
        },
    },

    methods: {
        async handleManageMySubscription() {
            this.showLoader = true
            const response = await this.$store.dispatch('getSparkUrl', {
                return_url: `${window.location.origin}${window.location.pathname}`,
            })
            window.location.href = response.data.data.sparkLogin.success
        },
    },
})
</script>


<style lang="scss" scoped>
.btn-holder {
    margin-top: 24px;
}

.filer-list__title {
    margin-bottom: 4px;
    margin-top: 16px;
}

.submit-btn-loader {
  position: relative;
  top: 0;
  left: 0;
  transform: translate(0, 0);
}
</style>
