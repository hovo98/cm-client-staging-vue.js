<template>
  <div :class="['page-dashboard page-profile-settings', blockPreloader ? 'block-preloader' : '']">
    <div class="page-dashboard__container container page-profile-settings--container">
      <div
        v-if="!verify"
        class="page-dashboard__top"
      >
        <h2
          v-if="verifyInfo"
          class="dash-title page-dashboard__top--title"
        >
          Your Profile
          <span
            v-if="emailIsVerified"
            class="notice-block"
          >
            <SvgIcon
              class="notice-block__icon"
              icon-name="ico-question"
            />
            <i class="notice-block__text">Your email address hasn't been verified yet. You can do it by clicking on a verification link in the email you received. If you want to send a new verification email
              <a
                href="javascript:;"
                @click="sendVerifyEmail()"
              >
                click here
              </a>
            </i>
          </span>
        </h2>

        <h2
          v-else
          class="dash-title page-dashboard__top--title"
        >
          Your Profile
          <span
            v-if="emailIsVerified"
            class="notice-block"
          >
            <SvgIcon
              class="notice-block__icon"
              icon-name="ico-question"
            />
            <i class="notice-block__text">New verification email is on its way. Please check your inbox in a few minutes.</i>
          </span>
        </h2>
      </div>
      <div class="row">
        <BlockProfileSidebar id="profile-sidebar" />
        <BlockProfileTabs
          ref="blockProfileTabs"
          :block-preloader="blockPreloader"
          @changeBlockPreloader="changeBlockPreloader"
          @onTabChange="onTabChange"
        />
      </div>
      <div class="page-dashboard__bottom align--right">
        <transition name="fade-in-left">
          <span
            v-if="saved"
            class="page-dashboard__bottom-text"
          ><SvgIcon
            class="page-dashboard__bottom-text-icon"
            icon-name="ico-check"
          />Saved</span>
          <span
            v-if="errorProfile !== ''"
            class="page-dashboard__bottom-text"
            v-html="errorProfile"
          />
        </transition>
        <a
          href="javascript:;"
          class="btn submit-btn-holder"
          @click="updateProfile"
        ><img
          v-if="showLoader"
          src="@/assets/images/loader.gif"
          alt="loader"
          class="submit-btn-loader"
        >Update</a>
      </div>
      <BlockDashboardSidebar />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BlockDashboardSidebar from '@/components/blocks/BlockDashboardSidebar.vue'
import BlockProfileSidebar from '@/components/blocks/BlockProfileSidebar.vue'
import BlockProfileTabs from '@/components/blocks/BlockProfileTabs/BlockProfileTabs.vue'
import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
import { scrollToTop } from '@/config/util'
import GlobalNot from '@/services/Notification'

export default Vue.extend({
  name: 'ProfileSettings',

  components: {
    BlockDashboardSidebar,
    BlockProfileSidebar,
    BlockProfileTabs,
    SvgIcon,
  },

  data() {
    return {
      page: 'page-profile-settings',
      showLoader: false,
      saved: false,
      emailIsVerified: true,
      errorProfile: '',
      verifyInfo: true,
      blockPreloader: true,
    }
  },

		computed: {
			userData() {
                return this.$store.getters['user']
			},
			verify() {
                return this.$store.getters.getIfVerify
            },
			checkTimeZone() {
                return this.$store.getters.getTimeZoneChange
            },
			personalSettingsChanged() {
				return this.$store.getters.getPersonalSettingsChanged
			},
			companySettingsChanged() {
				return this.$store.getters.getCompanySettingsChanged
			},
			profileSettingsChanged() {
				return this.$store.getters.getProfileSettingsChanged
			},
		},

  mounted() {
    this.stickySidebar()
  },

  methods: {
    changeBlockPreloader(flag) {
      this.blockPreloader = flag
    },
    onTabChange() {
      this.saved = false
    },

    sendVerifyEmail() {
      this.$store
        .dispatch('sendVerifyEmailFromDashboard')
        .then((response) => {
          if (response.data.data.getVerificationMail) {
            if (response.data.data.getVerificationMail.success) {
              this.verifyInfo = false
            }
          }
        })
    },
    stickySidebar() {
      window.onscroll = function () {
        stickToTop()
      }
      const sidebar = document.getElementById('profile-sidebar')
      const sticky = sidebar.offsetTop - 90

      function stickToTop() {
        if (window.pageYOffset > sticky) {
          sidebar.classList.add('sticky')
        } else {
          sidebar.classList.remove('sticky')
        }
      }
    },
    async updateProfile() {
      this.$store.dispatch('personalSettingsChanged', true)
      this.$store.dispatch('companySettingsChanged', true)
      this.$store.dispatch('profileSettingsChanged', true)

      const object = await this.$refs.blockProfileTabs.triggerUpdate()

      const str = object.str
      const details = object.details
      this.showLoader = false
      this.saved = false

      if (
        !this.personalSettingsChanged ||
        !this.companySettingsChanged ||
        !this.profileSettingsChanged
      ) {
        return
      }
      if (str !== 'mutation {}') {
        if (this.checkTimeZone) {
          this.$store.commit('RESET_FILTER')
          this.$store.commit('RESET_FILTER_BROKER')
        }
        this.showLoader = true
        this.blockPreloader = true
        this.$store
          .dispatch('updateProfile', str)
          .then((response) => {
            this.$refs.blockProfileTabs.updateChanges(false)
            this.$store.commit('CHANGE_TIME_ZONE', false)
            const error = response.data.errors
            if (error) {
              new GlobalNot('Old password is not entered correctly!', 'error')
            } else {
              new GlobalNot('Saved', 'success')
              const data = response.data.data
              if (details !== '') this.$store.dispatch('lenderSignUp', details)
              if (!data.errors) this.saved = true
            }
            this.showLoader = false
            this.blockPreloader = false
            setTimeout(() => {
              scrollToTop()
            }, 200)
          })
          .catch(() => {
            this.showLoader = false
            this.saved = true
          })
      } else {
        if (details !== '') {
          this.showLoader = true
          this.blockPreloader = true
          this.$store.commit('RESET_FILTER')
          this.$store
            .dispatch('lenderSignUp', details)
            .then(() => {
              this.showLoader = false
              this.blockPreloader = false
              new GlobalNot('Saved', 'success')
              this.saved = true
              setTimeout(() => {
                scrollToTop()
              }, 200)
            })
            .catch(() => {
              this.showLoader = false
            })
        }
      }
    },
  },
})
</script>
