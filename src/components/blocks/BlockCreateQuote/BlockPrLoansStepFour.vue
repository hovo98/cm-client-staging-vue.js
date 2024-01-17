<template>
  <div class="cq-form-inner">
    <div class="form-highlight">
      <div class="form-split form-highlight__group">
        <h4 class="title-extra-small cf-form__sub-title">Will there be a prepayment penalty?</h4>
        <div class="row">
          <div class="col-md-12 radio-btn-holder">
            <label class="radio-btn radio-btn--inline">
              <input
                v-model="prePayment"
                type="radio"
                name="recourseOption"
                value="custom"
                @change="changeOption"
              >
              <span class="radio-btn-text">Custom</span>
            </label>
          </div>
          <div class="col-md-12 radio-btn-holder">
            <label class="radio-btn radio-btn--inline">
              <input
                v-model="prePayment"
                type="radio"
                name="recourseOption"
                value="yield-maintenance"
                @change="changeOption"
              >
              <span class="radio-btn-text">Yield Maintenance</span>
            </label>
          </div>
          <div class="col-md-12 radio-btn-holder">
            <label class="radio-btn radio-btn--inline">
              <input
                v-model="prePayment"
                type="radio"
                name="recourseOption"
                value="swap"
                @change="changeOption"
              >
              <span class="radio-btn-text">Swap</span>
            </label>
          </div>
          <div class="col-md-12 radio-btn-holder">
            <label class="radio-btn radio-btn--inline">
              <input
                v-model="prePayment"
                type="radio"
                name="recourseOption"
                value="no"
                @change="changeOption"
              >
              <span class="radio-btn-text">No Prepayment Penalty</span>
            </label>
          </div>
        </div>
      </div>
      <div
        v-if="prePayment === 'custom'"
        class="form-split__holder error-message-holder"
      >
        <div class="form-split__holder form-split__inner-box">
          <div
            v-for="(year, index) in customYears"
            :key="year.id"
            class="input-holder form-split__input-holder error-message-holder"
            :set="newModel='PrePaymentCustomYear' + index"
          >
            <div class="form-split__input-holder-col">
              <label class="input-label">Year {{ index + 1 }} %*</label>
            </div>
            <div class="form-split__input-holder-col input-holder--with-placeholder">
              <TheMask
                :mask="['#', '#.##','##.##', '###.##']"
                :masked="true"
                :value="PrePaymentCustomYearPercentArray[index]"
                class="js-PrePaymentCustomYear"
                min="1"
                max="100"
                @change.native="change = true"
                @wheel="$event.target.blur()"
                @keyup.native="checkPercentage($event, index)"
              />
              <span class="input-placeholder">%</span>
            </div>
          </div>
        </div>
        <span
          v-if="totalSumValidation && customYears > 1 && !start && totalSum <= 100"
          class="error-message"
        >All fields must be filled out</span>
        <span
          v-else-if="!totalSumValidation && customYears === 1"
          class="error-message"
        >Field can't be empty</span>
        <span
          v-else-if="totalSumValidation && totalSum > 100"
          class="error-message"
        >Sum of all fields can't be more than 100%</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { allowOnlyNumbersGlobal } from '@/config/util'
    import { mapState } from 'vuex'
    import {TheMask} from 'vue-the-mask'

    interface Data {
        prePayment: string
        prePaymentValidation: boolean
        customYears: number
        PrePaymentCustomYearPercentArray
        totalSumValidation: boolean
        totalSum: number
        start: boolean
    }

    export default Vue.extend({

        components: {
            TheMask,
        },
        props: {
            quoteID: {
                type: String,
                default: '',
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
                prePayment: '',
                customYears: 5,
                prePaymentValidation: false,
                PrePaymentCustomYearPercentArray: [],
                totalSumValidation: false,
                totalSum: 0,
                start: true,
            }
        },

        mounted() {
            this.setFields()
            this.$store.dispatch('ui', {overlay: false})
        },

        computed: {
            ...mapState({
                pageFour: state => state['CreateQuote'].pageFour,
                pageTwo: state => state['CreateQuote'].pageTwo,
			}),
        },

        methods: {
            createObject() {
                const arr = this.getValueFromInputsString()
                // Go through the array arr and make strings
                const arrStr = arr.map(item => {
                    return item.toString()
                })
                return {
                   prePaymentCustomYear: arrStr,
                   prePaymentYears: this.prePayment,
                }
            },

            setFields() {
                if(this.pageFour) {
                    const arr = []
                    this.pageFour.prePaymentCustomYear.forEach(element => {
                        if(element === '') {
                            arr.push(0)
                        } else {
                            arr.push(element)
                        }
                    })
                    this.PrePaymentCustomYearPercentArray = arr
                    this.prePayment = this.pageFour.prePaymentYears
                }
                if(this.pageTwo) {
                    if(this.pageTwo.amountOfYears) {
                        this.customYears = this.pageTwo.amountOfYears
                    }
                }
            },

            async next() {
                let validationFlag = true

                this.start = false

                /** @description Set array with value from all custom year inputs */
                // this.PrePaymentCustomYearPercentArray = this.getValueFromInputs();
                if ( this.prePayment === 'custom' ) {
                    this.totalSum = this.getValueFromInputs().reduce((a, b) => a + b, 0)
                    if(this.totalSum > 100 || this.totalSum < 1) {
                        this.totalSumValidation = true
                        validationFlag = false
                    } else {
                        this.totalSumValidation = false
                    }
                }

                let errorElement = document.querySelector('.error-message')
                if (errorElement) {
                    errorElement.scrollIntoView({behavior: 'smooth'})
                }

                if (this.prePayment === 'custom' && (!validationFlag || this.totalSumValidation)) {
                    return
                }

                const dealID = this.$route.params.deal
                const dealObject_ = await this.$store.dispatch("getDealByIdQuote", {id: dealID})
                const dealStatus = dealObject_.data.data.dealObject.deal.finished

                if(dealStatus) {
                    if (this.change){
                        await this.$store.dispatch('setPageFour', this.createObject())
                    }
                } else {
                    this.$emit('dealDrafted')
                }
                

                return this.nextAction
            },
            async skip() {
                return this.skipAction
            },
            async prev() {
                return this.prevAction
            },
            /** on change form field set tu true */
            changeform(){
                this.change = true
            },
            changeOption() {
                this.change = true
                this.recourseOptionsValidation = false
                this.totalSumValidation = true
            },
            allowOnlyNumbers(event) {
                allowOnlyNumbersGlobal(event)
            },

            /**
             * @author Branislav Jerinic
             * @returns return array with value from all custom year inputs
             */
            getValueFromInputs() {
                const nodeList = document.querySelectorAll('.js-PrePaymentCustomYear')
                const element = Array.prototype.slice.call(nodeList) 
                let PrePaymentCustomYearValue = []

                element.forEach(ele => {
                    if(ele.value === '') {
                        PrePaymentCustomYearValue.push(0)
                    } else {
                        PrePaymentCustomYearValue.push(parseInt(ele.value))
                    }
                })
                return PrePaymentCustomYearValue
            },

            getValueFromInputsString() {
                const nodeList = document.querySelectorAll('.js-PrePaymentCustomYear')
                const element = Array.prototype.slice.call(nodeList) 
                let PrePaymentCustomYearValue = []

                element.forEach(ele => {
                    if(ele.value === '') {
                        PrePaymentCustomYearValue.push(0)
                    } else {
                        PrePaymentCustomYearValue.push(ele.value)
                    }
                })
                return PrePaymentCustomYearValue
            },
            
            /**
             * @author Branislav Jerinic
             * @description check if sum from all custom year inputs are more than 100 and reset current input value to 1 
             */
            checkPercentage(e, index) {
                const _self = e.currentTarget
                this.totalSum = this.getValueFromInputs().reduce((a, b) => a + b, 0)
                setTimeout(() => {
                    if (this.totalSum > 100) {
                        _self.value = ''
                        this.PrePaymentCustomYearPercentArray[index] = ''
                        this.totalSumValidation = true
                    } else {
                        this.PrePaymentCustomYearPercentArray[index] = _self.value
                        this.totalSumValidation = false
                    }
                }, 100)
            },
        },
    })
</script>

<style lang="scss" scoped>
    .cf-form__sub-title {
        margin-bottom: 13px;
    }
</style>
