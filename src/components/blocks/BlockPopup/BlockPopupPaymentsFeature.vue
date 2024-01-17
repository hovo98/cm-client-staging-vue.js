<template>
  <div
    v-if="showModal"
    class="popup__wrap"
  >
    <div
      v-click-outside="close"
      class="popup"
    >
      <a
        class="popup__close"
        href="javascript:;"
        @click.stop="close"
      />
      <h3 class="popup__title">
        We hear you and appreciate your feedback!
      </h3>
      <div class="popup__subtitle">
        <p>
          We have been receiving numerous inquiries regarding the recent email about the expiration of Finance Lobby Premium Access. To make sure everyone has ample time to familiarize themselves with the new payment options, we have decided to extend the subscription deadline to Monday, 5/15/2023. During this extension period, the ‘My Subscription’ tab in your profile settings will not be active. You will be able to subscribe starting from Monday, 5/15/2023. In the meantime, you can view the payment options on our website by clicking on the button below.
        </p>
      </div>
      <div class="popup__btn-wrap">
        <a
          class="btn btn--small"
          href="https://financelobby.com/pricing/"
          target="_blank"
        >
          Check it out!
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import ClickOutside from "vue-click-outside"
import { mapState } from 'vuex'

interface Data {
  showModal: boolean,
}

export default Vue.extend({
  directives: {
    ClickOutside,
  },
  data(): Data {
    return {
      showModal: false,
    }
  },
  computed: {
    ...mapState({
      user: state => state['User'].user,
    }),
    loggedIn() {
      return this.$store.getters.getLoggedIn
    },
    isBroker() {
      return this.loggedIn && this.user.role === 'broker'
    },
  },
  watch: {
    loggedIn: {
      handler: function () {
        this.checkShowModal()
      },
      immediate: true,
    },
  },
  methods: {
    close() {
      this.showModal = false
    },
    checkShowModal() {
      if (this.$route.name === 'Login') {
        return
      }

      if (!this.$cookies.isKey("payments_feature_modal") && this.isBroker) {
        this.showModal = true
        this.$cookies.set("payments_feature_modal", true)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.popup__wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  max-height: 80vh;
  box-shadow: 0 2px 30px rgba($black, 0.1);
  max-width: 640px;
}

.popup__title {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin: auto;
  margin-bottom: 16px;
  max-width: 400px;
}

.popup__subtitle {
  font-size: 14px;
  margin: auto;
  text-align: center;
  color: $grey;
}

.popup__btn-wrap {
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 16px;

  @include mq($md, min) {
    gap: 20px;
  }

  @include mq(374px) {
    justify-content: space-between;
    flex-wrap: nowrap;
  }
}

.popup__close {
  z-index: 2;
}
</style>