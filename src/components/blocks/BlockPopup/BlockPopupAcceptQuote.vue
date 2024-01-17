<template>
  <div class="popup__wrap">
    <div
      v-if="secondContent === 1"
      v-click-outside="hidePopup"
      class="popup"
    >
      <a
        class="popup__close"
        @click="$emit('close')"
      />
      <h3 class="block-title popup__title">Let’s shake hands!<br>(Virtually, of course.)</h3>
      <div class="entry-content popup__text">
        <p>By clicking the button below, you confirm that this is the winning quote. We’ll send a quote acceptance email to both you and the lender, along with your contact information. We trust you two can take it from there.</p>
      </div>
      <div class="popup__btn-wrap">
        <div class="submit-btn-holder popup__btn-holder popup__btn">
          <a
            class="btn popup__btn"
            href="javascript:;"
            @click="accept()"
          >It’s a deal!</a>
          <img
            v-if="showLoader"
            src="@/assets/images/loader.gif"
            alt="loader"
            class="submit-btn-loader submit-btn-loader--inline"
          >
        </div>
      </div>
    </div>
    <div
      v-else-if="secondContent === 3 && olderThenTwoWeeks"
      class="popup popup--alt"
    >
      <a
        class="popup__close"
        @click="$emit('close')"
      />
      <h3 class="block-title popup__title">Let’s confirm these terms are still available</h3>
      <div class="entry-content popup__text">
        <p>It’s been a few weeks since you received this quote. Over time, terms may change due to factors like fluctuating interest rates and changes in market conditions.</p>
        <p>We’re checking to make sure the lender can still offer you the same terms you see here. We’ll email you as soon as we hear back.</p>
        <p>Hang tight!</p>
      </div>
    </div>
    <div
      v-else
      class="popup popup--alt"
    >
      <a
        class="popup__close"
        @click="$emit('close')"
      />
      <h3 class="block-title popup__title">Are you sure you want to accept this quote?</h3>
      <div class="entry-content popup__text">
        <p>You’ve already accepted another quote for this deal. Accepting more than 1 quote for a deal could potentially delay time-to-closing.</p>
      </div>
      <div class="popup__btn-wrap">
        <div class="submit-btn-holder popup__btn-holder popup__btn">
          <a
            class="btn popup__btn"
            href="javascript:;"
            @click="accept()"
          >Yes - accept quote</a>
          <img
            v-if="showLoader"
            src="@/assets/images/loader.gif"
            alt="loader"
            class="submit-btn-loader submit-btn-loader--inline"
          >
        </div>
        <div class="submit-btn-holder popup__btn-holder popup__btn">
          <a
            class="btn popup__btn"
            href="javascript:;"
            @click="$emit('close')"
          >No - don’t accept</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {

    directives: {
        ClickOutside,
    },
    props: {
        quoForPopup: {
            require: true,
        },
        quotes: {
            require: false,
        },
    },

    data() {
        return {
            showLoader: false,
            secondContent: 1,
            olderThenTwoWeeks: false,
            secondAccepted: false,
        }
    },

    mounted() {
        this.checkContent()
    },

    methods: {
        async accept() {
            this.showLoader = true
            this.$emit('accept')
        },

        hidePopup() {
            this.$emit('close')
        },

        checkContent() {
            let flag = false
            if(this.$store.getters.getDealSheetStatus) {
                this.secondAccepted = true
                flag = true
            }

            this.quotes.forEach(el => {
                if(el.status === 'ACCEPTED') {
                    this.secondAccepted = true
                    flag = true
                    return
                }
            })

            if(this.secondAccepted) {
                if(this.quoForPopup.olderThanTwoWeeks) {
                    this.secondContent = 3
                    this.olderThenTwoWeeks = true
                    this.acceptOlderQuote()
                } else {
                    if (flag) {
                        this.secondContent = 2
                    } else {
                        this.secondContent = 1
                    }
                }
            } else {
                if (flag) {
                    this.secondContent = 2
                } else {
                    this.secondContent = 1
                }
            }
        },

        async acceptOlderQuote() {
            this.showLoader = true
            this.$emit('accept')
        },
    },
}
</script>

<style lang="scss" scoped>

    .popup {
        padding: 80px 30px 50px 30px;
    }

    .popup__title {
        font-family: $font-second;
        font-size: 24px;
        text-align: center;
        font-weight: 700;
        line-height: 1.3;
        color: $shark;
        letter-spacing: 0.15px;
        margin-bottom: 29px;

        @include mq($md) {
            font-size: 22px;
            line-height: 1.2;
        }

        @include mq($sm) {
            margin-bottom: 20px;
        }
    }

    .crd-sidebar__step-inner {
        margin: 0 10px;
    }

    .popup__text {
        text-align: center;

        @include mq($md) {
            line-height: 1.3;
        }
    }

    .popup .entry-content p {
        font-size: 14px;
    }

    .popup--alt {
        max-width: 570px;
    }

</style>