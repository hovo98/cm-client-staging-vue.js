<template>
  <div
    id="app"
    :class="loggedIn ? 'logged-in' : ''"
  >
    <template v-if="maintenance1 === 2">
      <template v-if="!lenderLoanOfType">
        <MainHeader />

        <main class="site-main">
          <router-view />
        </main>

        <MainFooter />
        <BlockPopupPaymentsFeature />
      </template>
      <template v-else>
        <BlockPopupTypeOfLoan />
      </template>
    </template>
    <template v-else-if="maintenance1 === 0">
      <div class="block-preloader" />
    </template>
    <template v-else-if="maintenance1 === 1">
      <MainMaintenenc />
    </template>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import MainHeader from '@/components/main/MainHeader.vue'
    import MainFooter from '@/components/main/MainFooter.vue'
    import BlockPopupTypeOfLoan from '@/components/blocks/BlockPopup/BlockPopupTypeOfLoan.vue'
    import Pusher from './services/pusher/index'
    import MainMaintenenc from '@/components/main/MainMaintenenc.vue'
    import BlockPopupPaymentsFeature from '@/components/blocks/BlockPopup/BlockPopupPaymentsFeature.vue'

    declare global {
        interface Window {
          kommunicate: any
        }
    }

    export default Vue.extend({
        components: {
            MainHeader,
            MainFooter,
            BlockPopupTypeOfLoan,
            MainMaintenenc,
            BlockPopupPaymentsFeature,
        },
        data() {
            return {
                maintenance1: 0,
            }
        },

        computed: {
            loggedIn() {
                return this.$store.getters.getLoggedIn
            },
            lenderLoanOfType() {
                return this.$store.getters.getLenderLoanOfType
            },
        },

        watch: {
            $route (){
                if(process.env.VUE_APP_GTM_ENVIRONMENT === 'production' && JSON.parse(localStorage.getItem('auth'))) {
                    //Google Analytics userID
                    const auth = JSON.parse(localStorage.getItem('auth')) || null
                    if (auth) {
                      window['dataLayer'] = window['dataLayer'] || []
                      window['dataLayer'].push({
                        'userId' : auth?.user?.id,
                      })
                    }
                }
            },
        },
        // check if user logged in
        beforeCreate: async function () {
            await this.$store.dispatch('isLoggedIn')
        },
        async beforeMount() {
            try {
                await fetch(process.env.VUE_APP_BACKEND_URL + 'maintenence/check')
                this.maintenance1 = 2
            } catch(e) {
                console.log(e, 'status error')
                this.maintenance1 = 1
            }

            if (this.loggedIn) {
              new Pusher()
              await this.$store.dispatch('getSubscriptionPlan')
            }
        },

        mounted() {
          (function(d, m){
            var kommunicateSettings = {
              "appId":process.env.VUE_APP_KOMMUNICATE_APP_ID,
              "popupWidget":true,
              "automaticChatOpenOnNavigation":true,
            }
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app"
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s)
            window.kommunicate = m; m._globals = kommunicateSettings
          })(document, window.kommunicate || {})
        },
    })
</script>

<style lang="scss">
      @import '~vue-slick-carousel/dist/vue-slick-carousel.css';
      @import '~vue-cool-lightbox/dist/vue-cool-lightbox.min.css';
      @import 'assets/scss/style';

      .site-main {
          @include mq($lg + 1, min) {
            min-height: calc(100vh - 187px); // header and body padding-top value - footer height
          }
      }
</style>