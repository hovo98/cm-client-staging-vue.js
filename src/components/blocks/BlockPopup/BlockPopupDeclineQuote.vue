<template>
  <div class="popup__wrap">
    <div
      v-if="!proceed && firstStep"
      class="popup"
    >
      <a
        class="popup__close"
        @click="$emit('close')"
      />
      <h3 class="block-title popup__title">Revert quote back to <br> pre-accepted status?</h3>
      <div class="entry-content popup__text">
        <p>This quote will no longer show as accepted and you will be able to receive more quotes for this deal.</p>
      </div>
      <div class="popup__btn-wrap">
        <div class="submit-btn-holder popup__btn-holder popup__btn">
          <a
            class="btn popup__btn close"
            href="javascript:;"
            @click="$emit('close')"
          >Never mind</a>
        </div>
        <div class="submit-btn-holder popup__btn-holder popup__btn">
          <a
            class="btn popup__btn"
            href="javascript:;"
            @click="proceedDecline()"
          >Yes, undo accept</a>
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
      v-if="proceed && !firstStep"
      class="popup unaccept-quote"
    >
      <a
        class="popup__close"
        @click="$emit('close')"
      />
      <!-- <h3 class="block-title popup__title">Revert quote back to <br> pre-accepted status?</h3> -->
      <div class="entry-content popup__text">
        <p>Please take a minute to let us know why you don't want to go ahead with this quote. Your answer will help us find better deals for you in the future.</p>
      </div>
      <div :class="validationFailed ? 'popup__textarea error':'popup__textarea'">
        <textarea
          v-model="unacceptReason"
          name=""
          placeholder="Your answer here"
        />
        <span
          v-if="validationFailed"
          class="error-message"
        >This is a required field.</span>
        <span
          v-if="charLenghtValidation"
          class="error-message"
        >This looks a bit short... Please tell us more!</span>
      </div>
      <div class="popup__btn-wrap">
        <div class="submit-btn-holder popup__btn-holder popup__btn">
          <a
            class="btn popup__btn"
            href="javascript:;"
            @click="decline()"
          >Submit</a>
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
      v-if="!firstStep && !secondStep && success"
      class="popup success"
    >
      <a
        class="popup__close"
        @click="$emit('close')"
      />
      <!-- <h3 class="block-title popup__title">Revert quote back to <br> pre-accepted status?</h3> -->
      <div class="popup__image">
        <img
          src="@/assets/images/accepted/accepted.png"
          alt=""
        >
      </div>
      <div class="entry-content">
        <h3 class="block-title popup__title">Success!</h3>
        <p class="popup-text">This quote is no longer accepted</p>
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
            proceed: false,
            validation: false,
            validationFailed: false,
            firstStep: true,
            secondStep: false,
            success: false,
            unacceptReason: '',
            charLenghtValidation: false,
        }
    },

    computed: {
        localQuoForPopup: {
          get() {
              return this.quoForPopup
          },
          set(newValue) {
              this.$emit('update:quoForPopup', newValue)
          },
      },
    },

    watch: {
        unacceptReason() {
            this.validationFailed = false
            if(this.unacceptReason.length < 8 && this.unacceptReason.length >= 0) {
                this.charLenghtValidation = true
                this.validation = false
            } else {
                this.charLenghtValidation = false
                this.validation = true
            }
        },
    },

    methods: {
        async decline() {
            if(this.validation) {
                this.showLoader = true
                this.localQuoForPopup.unacceptMessage = this.unacceptReason
                await this.$store.dispatch('declineQuoteBroker', this.quoForPopup)
                // const anyQuoteAccepted = data.data.data.setQuoteStatus.anyQuoteAccepted;
                // if(!anyQuoteAccepted) {
                //     this.$store.commit('SET_DEAL_SHEET_STATUS', false);
                // }
                this.$store.commit('SET_DEAL_SHEET_STATUS', false)
                this.showLoader = false
                this.proceed = false
                this.firstStep = false
                this.success = true
            } else {
                if(!this.charLenghtValidation) {
                    this.validationFailed = true
                    return
                }
            }
        },

        proceedDecline() {
            this.proceed = true
            this.firstStep = false
        },

        hidePopup() {
            this.$emit('close')
        },
    },
}
</script>

<style lang="scss" scoped>
    .popup {
        max-width: 650px;
        text-align: center;
        padding: 55px 30px 50px 30px;
    }

    .unaccept-quote {
        padding: 55px 112px 30px;
        
        @include mq(640px) {
            padding: 55px 15px 30px;
        }
    }

    .block-title {
        margin-bottom: 50px;

        @include mq(640px) {
            margin-bottom: 20px;
        }
    }

    .popup__textarea {
        position: relative;
        textarea {
            width: 100%;
            height: 100px;
            margin-bottom: 25px;
            border-radius: 5px;
            resize: none;
            padding: 15px;
        }

        &.error textarea {
            border-color: red;
        }

        .error-message {
            text-align: left;
            bottom: 25px;
        }
    }

    .popup__btn-wrap .close {
        background-color: $white;
        color: $shark;
        border: 1px solid $shark;

        &:hover {
            background-color: $mosque;
            color: $white;
            border: 1px solid $mosque;
        }
    }

    .popup__btn-wrap {
        @include mq(558px) {
            flex-direction: column;

            .popup__btn {
                width: 100%;
            }
        }
    }

    .popup__btn {
        @include mq(360px) {
            font-size: 12px;
        }
    }

    .popup__image {
        max-width: 151px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 43px;
    }
</style>