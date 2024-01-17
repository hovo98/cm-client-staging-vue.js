<template>
  <div
    class="popup__wrap"
    @click="clickOutside($event)"
  >
    <div :class="typeOfLoanSuccess ? 'loan-type__popup popup popup--success' : 'popup loan-type__popup'">
      <div
        v-if="!typeOfLoanSuccess"
        class="entry-content"
      >
        <div class="row">
          <div class="col-md-12">
            <h2 class="loan-type__title title-extra-small">One quick update before you get browsing...</h2>
            <p class="loan-type__subtitle">What loan type(s) do you offer?</p>
            <LoanType
              ref="loanTypeCom"
              class="loan-type__wrapper"
              @typeOfLoanCheck="typeOfLoanCheck"
            />
            <span
              v-if="errorTypeOfLoan"
              class="error-message loan-type-error"
            >Please update your preferred loan type(s) to continue.</span>
          </div>
        </div>
      </div>
            
      <div
        v-if="loader"
        class="popup__loader"
      >
        <img
          src="@/assets/images/loader_inline.gif"
          alt="loader"
        >
      </div>

      <div
        v-if="!typeOfLoanSuccess"
        class="popup__btn-wrap"
      >
        <div class="submit-btn-holder popup__btn-holder popup__btn">
          <a
            class="btn popup__btn"
            href="javascript:;"
            @click="submit()"
          >Submit</a>
        </div>
      </div>

      <div
        v-if="typeOfLoanSuccess"
        class="popup__success"
      >
        <h2 class="loan-type__title title-extra-small">Perfect - thanks!</h2>
        <p>We’ll use this info to send you deals that are even more on target.</p>
      </div>

      <div
        v-if="typeOfLoanSuccess"
        class="popup__btn-wrap"
      >
        <div class="submit-btn-holder popup__btn-holder popup__btn">
          <a
            class="btn popup__btn"
            href="javascript:;"
            @click="closePopup"
          >Close</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoanType from '../../parts/PartFormLoanType.vue'

export default {
    components: {
        LoanType,
    },

    data() {
        return {
            errorTypeOfLoan: false,
            typeOfLoanSuccess: false,
            loader: false,
        }
    },
    methods: {
        async submit() {
            const loanType = this.$refs.loanTypeCom.getTypeOfLoans()
            if(!loanType) {
                this.errorTypeOfLoan = true
                return false
            }
            this.loader = true
            const res = await this.$store.dispatch('settingLoanOfType', loanType)
            if(res.data.data.updateTypeOfLoans.success) { // if lender update loan type
                this.typeOfLoanSuccess = true
                this.loader = false
            }
        },

        typeOfLoanCheck() {
            this.errorTypeOfLoan = false
        },

        closePopup() {
            this.$store.dispatch('changeSettingLoanOfType', false)
        },

        clickOutside(event) {
            if(this.typeOfLoanSuccess) {
                if(event.target.classList.contains('popup__wrap')) {
                    this.$store.dispatch('changeSettingLoanOfType', false)
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>

    .popup__wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 15px;
        z-index: 10000000000;
    }

  .loan-type__popup {
      padding: 55px 30px 50px 30px;
      max-width: 750px;
      min-height: 447px;
      position: static;
      transform: translate(0, 0);

      @include mq(640px) {
          padding: 55px 15px 50px 15px;
      }
  }

  .popup--success {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .title-extra-small {
            font-size: 30px;
            margin-bottom: 20px;

            @include mq(400px) {
                font-size: 26px;
            }
        }

        p {
            text-align: center;
            margin-bottom: 40px;
            
            @include mq(400px) {
                font-size: 14px;
            }
        }

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

  .loan-type__title {
        text-align: center;
  }

    .loan-type__wrapper {
        display: flex;
        justify-content: center;
    }

    .popup__loader {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: $white;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 90px;
        }
    }

    .loan-type-error {
        text-align: center;
        bottom: 11px;
    }

    .popup .entry-content .loan-type__subtitle {
        font-weight: 500;
    }
</style>