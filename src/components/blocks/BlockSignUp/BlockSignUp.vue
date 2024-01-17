<template>
  <div class="page-sign-up">
    <transition name="puff-in">
      <BlockSignUp
        v-show="(!roleBroker && !roleLender) && showAccount"
        @onRoleBroker="roleBrokerFn"
        @onRoleLender="roleLenderFn"
      />
    </transition>
    <!-- TODO in next phase of project remove this part and uncomment next two steps -->
    <transition name="fade-in">
      <BlockSignForm
        v-show="(roleBroker || roleLender) && !thankYouMessage && !openLender && showForm"
        :use-role-lender="roleLender"
        :use-role-broker="roleBroker"
        @onBrokerSuccess="thankYouStatus(), showForm = false"
        @onContinueToLender="ContinueToDealerPreferences(), showForm = false"
      />
    </transition>
    <!-- TODO in next phase of project uncomment next two steps -->
    <!-- <transition name="fade-in">
            <BlockSignForm :useRoleLender="roleLender" :useRoleBroker="roleBroker" @onBrokerSuccess="thankYouStatus(), showForm = false" @onContinueToLender="ContinueToLender" v-show="(roleBroker || roleLender) && !thankYouMessage && !openLender && showForm"/>
        </transition> -->
    <!-- <transition name="fade-in"> 
            <BlockLenderSignUp v-show="openLender" @onContinueToDealerPreferences="ContinueToDealerPreferences(), openLender = false, showForm = false" @onGoBackToSignUpForm="openLender = !openLender, showForm = true, goBackScroll()" />
        </transition> -->
    <transition name="fade-in">
      <BlockSignUpDealerPreferences
        v-show="openDealerPreferences"
        @onGoBackToLanderForm="openLender = !openLender, openDealerPreferences = !openDealerPreferences, goBackScroll()"
        @onBrokerSuccess="thankYouStatus(), openDealerPreferences = false"
      />
    </transition>
    <transition name="puff-in">
      <PartThankYouMessage
        v-if="thankYouMessage"
        :use-role-broker="roleBroker"
      />
    </transition>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import BlockSignUp from '@/components/blocks/BlockSignUp/BlockSignUpLanding.vue'
    import BlockSignForm from '@/components/blocks/BlockSignUp/BlockSignUpForm.vue'
    import PartThankYouMessage from '@/components/parts/PartThankYouMessage.vue'
    // import BlockLenderSignUp from '@/components/blocks/BlockSignUp/BlockSignUpLender.vue';
    import BlockSignUpDealerPreferences from '@/components/blocks/BlockSignUp/BlockSignUpDealerPreferences.vue'
    import { scrollToTop } from '@/config/util'

	export default Vue.extend({
		name: 'SignUp',

		components: {
            BlockSignUp,
            BlockSignForm,
            PartThankYouMessage,
            // BlockLenderSignUp,
            BlockSignUpDealerPreferences,
        },

		data() {
			return {
                page: 'sign-up',
                showAccount: false,
                roleBroker: false,
                roleLender: false,
                thankYouMessage: false,
                openLender: false,
                showForm: false,
                openDealerPreferences: false,
                currentUrl: "",
			}
		},

        mounted() {
            const type = this.$route.params.type
            const step = this.$route.params.step

            if (type === 'lender') {
                if (parseInt(step) === 2) {
                    this.ContinueToDealerPreferences()
                } else {
                    this.roleLenderFn()
                }
            } else if (type === 'broker') {
                this.roleBrokerFn()
            } else {
                this.showWelcomeScreen()
            }
        },

        beforeMount() {
            this.currentUrl = window.location.href
            if(this.currentUrl.indexOf('?broker') > -1) {
                this.roleBroker = true

                setTimeout(() => {
                    this.showForm = true
                }, 500)
            }

            if(this.currentUrl.indexOf('?lender') > -1) {
                this.roleLender = true

                setTimeout(() => {
                    this.showForm = true
                }, 500)
            }
        },
        
        methods: {
            checkUrl(param) {
                const queryString = window.location.search
                const urlParams = new URLSearchParams(queryString)
                return urlParams.get(param)
            },
            showWelcomeScreen() {
                setTimeout(() => {
                    this.showAccount = true
                }, 800)
            },
            roleBrokerFn() {
                this.roleBroker = true

                setTimeout(() => {
                    this.showForm = true
                }, 500)
            },
            roleLenderFn() {
                this.roleLender = true

                setTimeout(() => {
                    this.showForm = true
                }, 500)
            },

            thankYouStatus() {
                setTimeout(() => {
                    this.thankYouMessage = true
                }, 500)
            },
            ContinueToLender() {
                setTimeout(() => {
                    this.openLender = true
                    scrollToTop()
                }, 500)
            },
            ContinueToDealerPreferences() {
                this.openDealerPreferences = true
                setTimeout(() => {
                    scrollToTop()
                }, 400)
            },
            goBackScroll() {
                setTimeout(() => {
                    scrollToTop()
                }, 100)
            },
        },
	})
</script>

<style lang="scss">
</style>