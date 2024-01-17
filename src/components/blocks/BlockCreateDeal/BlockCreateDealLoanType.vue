<template>
  <div class="cd-form-inner cd-form-inner--full">
    <h4 class="title-extra-small cf-form__sub-title">What type of loan do you need today?*</h4>
    <div class="error-message-holder error-message-holder--block">   
      <div class="rdb-box-items input-holder-wrap">
        <div class="rdb-box-item">
          <label class="rdb-box rdb-box-with-img rdb-box--without-circle">
            <img
              src="@/assets/images/checkbox_icons/purchase.png"
              alt="Purchase"
            >
            <input
              v-model="loanType"
              type="radio"
              name="loan-type"
              value="PURCHASE"
              @change="change = true; validationError = false"
            >
            <span class="rdb-box-text">Purchase</span>
            <span class="rdb-box-hv" />
          </label>
        </div>
        <div class="rdb-box-item">
          <label class="rdb-box rdb-box-with-img rdb-box--without-circle">
            <img
              src="@/assets/images/checkbox_icons/refinance.png"
              alt="Refinance"
            >
            <input
              v-model="loanType"
              type="radio"
              name="loan-type"
              value="REFINANCE"
              @change="change = true; validationError = false; show_address_purchase = null; validationErrorShowAddress = false"
            >
            <span class="rdb-box-text">Refinance</span>
            <span class="rdb-box-hv" />
          </label>
        </div>
        <div class="rdb-box-item">
          <label class="rdb-box rdb-box-with-img rdb-box--without-circle">
            <img
              src="@/assets/images/checkbox_icons/construction.png"
              alt="Construction"
            >
            <input
              v-model="loanType"
              type="radio"
              name="loan-type"
              value="CONSTRUCTION"
              @change="change = true; validationError = false; show_address_purchase = null; validationErrorShowAddress = false"
            >
            <span class="rdb-box-text">Construction</span>
            <span class="rdb-box-hv" />
          </label>
        </div>
      </div>
      <span
        v-show="validationError"
        class="error-message"
      >The loan type field is required.</span>
      <div
        v-if="loanType === 'PURCHASE'"
        class="input-holder__wrapper"
      >
        <h4 class="title-extra-small form-split__title">
          Would you like to keep the property's address hidden from lenders? *
          <span
            class="tooltip-msg tooltip-msg--break-on-mobile"
            data-tooltip="For more sensitive deals, this option allows you to control how and when you share the full details of your deal. If you select this option, we will also hide the tenant's names on your rent roll. "
          ><SvgIcon
            class="tooltip-msg__icon"
            icon-name="ico-question"
          /></span>
        </h4>
        <div class="input-holder form-split__input-holder">
          <div class="form-split__input-holder-col">
            <label class="radio-btn radio-btn--inline">
              <input
                v-model="show_address_purchase"
                type="radio"
                value="true"
                @change="change = true;"
              >
              <span class="radio-btn-text">Yes</span>
            </label>
          </div>
          <div class="form-split__input-holder-col">
            <label class="radio-btn radio-btn--inline">
              <input
                v-model="show_address_purchase"
                type="radio"
                value="false"
                @change="change = true;"
              >
              <span class="radio-btn-text">No</span>
            </label>
          </div>
        </div>
      </div>
      <span
        v-show="validationErrorShowAddress"
        class="error-message"
      >The field is required.</span>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'

    interface Data {
        title: string
        loanType: string
        change: boolean
        validationError: boolean
        validationErrorShowAddress: boolean
        show_address_purchase: string
    }

    export default Vue.extend({

        components: {
            SvgIcon,
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

        data(): Data {
            return {
                title: 'CreateDealLoanType',
                loanType: '',
                show_address_purchase: '',
                change: false,
                validationError: false,
                validationErrorShowAddress: false,
            }
        },

        computed: {
            loan_type() {
                return this.$store.getters.getLoanType
            },
            show_address_purchase_state() {
                return this.$store.getters.getShowAddressPurchaseState
            },
            id() {
                return this.$store.getters.getId
            },
        },

        mounted() {
            this.setField()
            this.$store.dispatch('ui', {overlay: false})
        },

        methods: {
            async next() {
                if(this.loanType === 'PURCHASE') {
                    if(this.show_address_purchase === '' || this.show_address_purchase === null) {
                        this.validationErrorShowAddress = true
                        return false
                    }
                }
                if(this.loanType !== '') {
                    if(this.change){
                        const obj = this.createObject()
                        await this.$store.dispatch('setBrokerDealLoanType', obj)
                        await this.$store.dispatch('getDealById', {id:this.$route.params.deal})
                        return this.whatToReturn()
                    } else {
                        return this.whatToReturn()
                    }
                } else {
                    this.validationError = true
                } 
            },
            whatToReturn(){
                switch (this.loanType) {
                    case 'PURCHASE':
                        return 'dealLoanTypePurchase'
                    case 'REFINANCE':
                        return 'dealLoanTypeRefinance'
                    case 'CONSTRUCTION':
                        return 'dealLoanTypeConstruction'
                    default: 
                        break
                }
            },
            skip() {
                return this.skipAction
            },
            prev() {
                return this.prevAction
            },
            createObject() {
                return {
                    loan_type: this.loanType,
                    show_address_purchase: this.show_address_purchase === null ? '' : this.show_address_purchase,
                    step: 'dealLoanType',
                }
            },

            /** on reload page get from VUEX if exsist */
            setField() {
                this.loanType = this.loan_type
                this.show_address_purchase = this.show_address_purchase_state
            },
        },
    })
</script>

<style lang="scss" scoped>
    .cf-form__sub-title {
        margin-bottom: 15px;
    }

    .input-holder__wrapper {
        max-width: 511px;
        width: 100%;
        margin-top: 20px;
    }

    .tooltip-msg {
        margin: 0 5px;

        @include mq(767px) {
            &::before {
                left: 0;
            }
        }
    }

    .radio-btn {
        width: 100%;
        input {
        display: none;

            &:checked {
                + .radio-btn-text {
                    background-color: #f0f7f7;
                    &::before {
                        border: 1px solid $blue-chill;
                    }
                }
            }
        }
    }

    .form-split__input-holder-col {
        padding: 0 10px;
    }

    .radio-btn-text {
    font-size: 16px;
    line-height: 1.4;
    color: $shark;
    font-weight: 400;
    letter-spacing: 0.1px;
    position: relative;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: $athens-gray;
    transition: $dur $ease;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        border: 1px solid $athens-gray;
        border-radius: 0;
        transition: $dur $ease;
    }

    &::after {
        display: none;
    }

    &:hover {
        background-color: #f0f7f7;
        &::before {
            border: 1px solid $blue-chill;
        }
    }

    @include mq(1024px) {
        padding-top: 14px;
    }

    @include mq($lap-xs) {
        font-size: 15px;
    }

    @include mq($lg) {
        padding-left: 24px;
        display: inline-block;
    }
}
</style>
