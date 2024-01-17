<template>
  <div class="popup__wrap">
    <div class="popup">
      <a
        class="popup__close"
        href="javascript:;"
        @click="closePopUp()"
      />
      <div class="entry-content">
        <h3>Not interested?</h3>
        <p>Skip this deal to allow other bankers<br> at your institution to view it</p>
      </div>
      <div class="popup__btn-wrap">
        <div class="submit-btn-holder popup__btn-holder popup__btn">
          <a
            class="btn popup__btn"
            href="javascript:;"
            @click="sendSkipDeal()"
          >Pass on this Deal</a>
          <img
            v-if="loader"
            src="@/assets/images/loader.gif"
            alt="loader"
            class="submit-btn-loader submit-btn-loader--inline"
          >
        </div>
        <a
          class="btn btn--alt popup__btn"
          href="javascript:;"
          @click="closePopUp()"
        >Cancel</a>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalNot from '@/services/Notification'

export default {
    data() {
        return {
            loader: false,
        }
    },
    methods: {
        closePopUp() {
            this.$emit('closePopUpSkipDeal')
        },
        async sendSkipDeal() {
            this.loader = true
            const data = await this.$store.dispatch('skipDealChange', {id: parseInt(this.$route.params.id)})
            if(data.status) {
                new GlobalNot(data.message, 'success')
                this.$store.commit('RESET_FILTER')
				this.$store.commit('RESET_FILTER_LENDER')
                this.$router.push({path: '/lender-deals'})
                this.$emit('closePopUpSkipDeal')
            } else {
                this.$emit('closePopUpSkipDeal')
                new GlobalNot(data.message, 'error')
            }
            this.loader = false
        },
    },
}
</script>

<style lang="scss" scoped>

  .popup {
      padding: 55px 30px 50px 30px;
      max-width: 500px;
  }
  
  .crd-sidebar__step-inner {
    margin: 0 10px;
  }

  .popup .entry-content {
      p, h3 {
        text-align: center;
      }
  }

  @include mq(428px) {
      .popup__btn-wrap .btn {
          min-width: 191px;
      }
  }

</style>