<template>
  <div class="cd-form-inner cd-form-inner--full">
    <div class="manage-priority">
      <!-- <perfect-scrollbar class="manage-priority__holder"> -->
      <div class="manage-priority__inner">
        <div class="manage-priority__head">
          <h2 class="title-extra-small manage-priority__head-title">Deal Priorities</h2>
          <p>Lenders will take the priorities you set below into account when crafting their quote. They are key to landing the best possible loan offers for clients.</p>
          <p>Rate each term according to how sensitive your deal is to that factor. Note: You can rate 1 term as a ‘dealbreaker’ and up to 2 others as ‘very important’.</p>
        </div>
        <div class="manage-priority__slider-holder error-message-holder input-holder">
          <div class="row manage-priority__slider-head">
            <div class="col-md-3 col-sm-3 col-xs-12">
              <span class="manage-priority__slider-head-aspect">Terms</span>
            </div>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <span class="manage-priority__slider-head-level">Level of priority</span>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <template v-for="(slider, index) in sliders">
                <div
                  :key="index"
                  class="row input-wrapper__holder"
                >
                  <div class="col-md-3 col-sm-3 col-xs-12">
                    <span class="manage-priority__item-name">{{ slider.aspectName }}</span>
                  </div>

                  <div class="col-md-9 col-sm-9 col-xs-12">
                    <div
                      class="input-wrapper"
                      :class="{'input-select__text-red': slider.value == 4, 'input-select__text-green': slider.value == 0}"
                    >
                      <SvgIcon
                        class="input-select__icon"
                        icon-name="ico-arrow-down"
                      />
                      <select
                        :value="slider.value"
                        @change="setValue($event, index)"
                      >
                        <option
                          class="input-select__text-green"
                          value="0"
                        >
                          Flexible
                        </option>
                        <option
                          class="input-select__text-gray"
                          value="1"
                        >
                          Somewhat Flexible
                        </option>
                        <option
                          class="input-select__text-gray"
                          value="2"
                        >
                          Important
                        </option>
                        <option
                          class="input-select__text-gray"
                          value="3"
                        >
                          Very important
                        </option>
                        <option
                          class="input-select__text-red"
                          value="4"
                        >
                          Dealbreaker
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </template>
              <span class="error-message error-message-position">
                <span v-if="errorDealbreak">You may rank only 1 term as a 'dealbreaker'</span>
                <span v-if="errorVeryImportant">You may only rank 2 terms as 'very important'</span>
              </span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h2 class="title-extra-small loan-type-title">What type(s) of loan are you looking for?*</h2>
              <LoanType
                ref="loanTypeCom"
                @typeOfLoanCheck="typeOfLoanCheck"
              />
              <span
                v-if="errorTypeOfLoan"
                ref="error"
                class="error-message lender-type-error"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- </perfect-scrollbar> -->
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import LoanType from '../../parts/PartFormLoanType.vue'
    import { errorScroll } from '@/config/util'

    interface Data {
        title: string
        change: boolean
        submitErrorEmpty:boolean
        sliders
        errorDealbreak: boolean
        errorVeryImportant: boolean
        errorTypeOfLoan: boolean
    }

    export default Vue.extend({
        components: {
            SvgIcon,
            LoanType,
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
                title: 'This is title of "BlockCreateDealFinishManagePriority"!',
                change: false,
                submitErrorEmpty: false,
                sliders: [
                    {
                        aspectName: 'Speed',
                        data: 'timeToClose',
                        value: 0,
                    },
                    {
                        aspectName: 'No recourse',
                        data: 'recourse',
                        value: 0,
                    },
                    {
                        aspectName: 'High leverage',
                        data: 'leverage',
                        value: 0,
                    },
                    {
                        aspectName: 'Low interest rate',
                        data: 'interestRate',
                        value: 0,
                    },
                    {
                        aspectName: 'Low fees',
                        data: 'fees',
                        value: 0,
                    },
                    {
                        aspectName: 'Interest only period',
                        data: 'interestOnlyPeriod',
                        value: 0,
                    },
                    {
                        aspectName: 'No prepayment penalty ',
                        data: 'nonPrepaymentPenalty',
                        value: 0,
                    },
                ],
                errorDealbreak: false,
                errorVeryImportant: false,
                errorTypeOfLoan: false,
            }
        },
        computed: {
            sensitivity() {
                return this.$store.getters.getSensitivity
            },
            id() {
                return this.$store.getters.getId
            },
            type_of_loans() {
                return this.$store.getters.getTypeOfLoans
            },
            refinance() {
                return this.$store.getters.getRefinance
            },
            construction() {
                return this.$store.getters.getConstruction
            },
            purchase() {
                return this.$store.getters.getPurchase
            },
        },
        mounted() {
            this.setFields()
            this.$store.dispatch('ui', {overlay: false})
        },
        methods: {
            typeOfLoanCheck() {
                this.errorTypeOfLoan = false
            },
            setValue(e, index) {
                this.errorDealbreak = false
                this.errorVeryImportant = false
                const flag = this.sliders.some(el => el.value == '4')
                const flagImportant = this.sliders.filter(el => el.value == '3')
                if(flag && e.target.value == '4') {
                    e.target.value = 0
                    this.sliders[index].value = 0
                    this.errorDealbreak = true
                    return
                } else if(flagImportant.length === 2 && e.target.value == '3') {
                    e.target.value = 0
                    this.sliders[index].value = 0
                    this.errorVeryImportant = true
                    return
                }
                this.sliders[index].value = e.target.value
            },
            async next() {
                this.checkFlag()
                this.errorTypeOfLoan = false

                const loanType = this.$refs.loanTypeCom.getTypeOfLoans()
                if(!loanType) {
                    this.errorTypeOfLoan = true
                    setTimeout(() => {
                        this.$refs['error'].innerHTML = 'Lender type is required'
                        errorScroll()
                    }, 1)
                    return false
                }

                const object = this.createObject()
                object.type_of_loans = loanType
                await this.$store.dispatch('setBrokerDealLevelSensitivity', object)
                return this.nextAction
            },
            checkFlag() {
                let flag = false
                this.sliders.forEach(element => {
                    if(element.value !== 0) {
                        flag = true
                    }
                })
                return flag
            },
            skip() {
                return this.skipAction
            },
            prev() {
                return this.prevAction
            },
            setArr() {
                this.sliders.map(ele => ele.value)
            },
            findHigest(arr) {
                return Math.max.apply(null, arr)
            },
            createObject() {
                const obj = {
                    step : 'dealFinishManagePriority',
                }
                this.sliders.forEach(element => {
                    obj[element.data] = element.value
                })
                return obj
            },
            setFields() {
                if(this.sensitivity) {
                    for(let key in this.sensitivity){
                        this.sliders.forEach(element => {
                            if(element.data === key) {
                                if(this.sensitivity[key] === '') {
                                    element.value = 0
                                } else {
                                    element.value = this.sensitivity[key]
                                }
                            }
                        })
                    }
                }
                if(this.type_of_loans.length > 0) {
                    this.$refs.loanTypeCom.setTypeOfLoans(this.type_of_loans)
                }
                if(this.purchase?.loan_amount > 2000000 || this.construction?.loanAmount  > 2000000 || this.refinance?.loanAmount > 2000000) {
                    this.$refs.loanTypeCom.showCNBS(true)
                } else {
                    const index = this.type_of_loans.findIndex((num) => num === 3)
                    if(index !== -1)
                        this.$store.dispatch('removeCMBS', index)

                    this.$refs.loanTypeCom.showCNBS(false)
                }
            },
        },
    })
</script>

<style lang="scss" scoped>
    .manage-priority__inner {
        max-width: 630px;
    }

    .manage-priority__head {
        margin-bottom: 50px;

        @include mq(575px) {
            margin-bottom: 30px;
        }

        p {
            margin-bottom: 10px;
        }
    }

    .manage-priority__head-title {
        margin-bottom: 25px;
    }

    .manage-priority__slider-head {
        margin-bottom: 18px;

        @include mq($sm) {
            display: none;
        }
    }

    .manage-priority__slider-disclaimer {
        display: block;
        text-align: right;
        font-size: 13px;
        font-style: italic;
        margin-bottom: 5px;
    }

    .sensitivity-slider__notice{
        color: $red;
    }

    .manage-priority__slider-head-aspect,
    .manage-priority__slider-head-level {
        font-weight: 600;
        letter-spacing: 0.08px;
    }

    .manage-priority__slider-head-aspect {
        margin-right: 15px;
        max-width: 110px;
        width: 100%;

        @include mq($sm) {
            max-width: 100%;
            margin-bottom: 10px;
        }
    }

    .manage-priority__slider-head-level {
        flex: 1;

        @include mq($sm) {
            width: 100%;
        }
    }

    .input-holder {
        select {
            font-size: 16px;
            font-weight: 600;
            color: $shark;
            border: 1px solid $shark;
            width: 100%;
            border-radius: 4px;
            padding: 14px 25px;
            cursor: pointer;
            -webkit-appearance: none;
            -moz-appearance: none;
            text-indent: 1px;
            text-overflow: '';
            background: transparent;
            position: relative;
            z-index: 1;

            option {
                font-weight: 600;

                &.input-select__text-gray {
                    color: $shark;
                }

                &.input-select__text-red {
                    color: $red;
                }
                &.input-select__text-green {
                    color: $blue-chill;
                }
            }
        }
    }

    .input-wrapper {
        position: relative;

            .input-select__icon {
                position: absolute;
                top: 50%;
                right: 30px;
                transform: translateY(-50%) rotateX(0);
                font-size: 25px;
                transition: $dur $ease;
                z-index: 0;
            }
    }


    .input-select__text-green {
        select {
            color: $blue-chill;
        }
    }

    .input-select__text-red {
        select {
            color: $red;
        }
    }

    .input-wrapper__holder {
        margin-bottom: 40px;
        align-items: center;

        @include mq(575px) {
            margin-bottom: 20px;
        }

        &:last-child {
            margin-bottom: 15px;
        }
    }

    .manage-priority__item-name {
        @include mq(575px) {
            display: block;
            margin-bottom: 10px;
        }
    }

    .lender-type-error {
        left: 15px;
    }

    .loan-type-title {
        margin-top: 50px;
        margin-bottom: 20px;
    }

    .error-message {
        position: absolute;
        bottom: 0;
        left: 15px;
    }
</style>
