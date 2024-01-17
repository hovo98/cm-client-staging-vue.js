<template>
  <div class="cq-form-inner">
    <ValidationObserver ref="interestObserver">
      <ValidationProvider
        v-slot="{ errors }"
        rules="required"
        class="input-holder input--white error-message-holder input-label__years"
      >
        <label class="input-label">For how many years would you fix the rate?*</label>
        <div class="custom-num-holder">
          <input
            v-model="amountOfYears"
            class="custom-num__input"
            type="number"
            min="0"
            @change="$emit('changeform'), allowOnlyNumbers($event), changeform(), openNewField()"
            @keydown="allowOnlyNumbers($event)"
            @keyup="openNewField"
            @wheel="$event.target.blur()"
          >
        </div>
        <span class="error-message">{{ errors[0] }}</span>
      </ValidationProvider>

      <div
        v-if="openField"
        class="form-highlight error-message-holder"
      >
        <div class="form-split">
          <h4
            v-if="amountOfYears > 1"
            class="title-extra-small cf-form__sub-title"
          >
            Would you reset it for another {{ amountOfYears }} years?
          </h4>
          <h4
            v-else
            class="title-extra-small cf-form__sub-title"
          >
            Would you reset it for another {{ amountOfYears }} year?
          </h4>
          <div class="form-split__holder">
            <div class="input-holder form-split__input-holder error-message-holder">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="amountOfYearsReset"
                    type="radio"
                    name="tax-abatement-1"
                    value="YES"
                    @change="change = true"
                  >
                  <span class="radio-btn-text">Yes</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="amountOfYearsReset"
                    type="radio"
                    name="tax-abatement-1"
                    value="NO"
                    @change="change = true"
                  >
                  <span class="radio-btn-text">No</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-highlight">
        <div class="form-split form-highlight__group error-message-holder">
          <h4 class="title-extra-small cf-form__sub-title">Interest rate *</h4>
          <div class="form-split__holder">
            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="interestRate"
                    type="radio"
                    name="tax-abatement"
                    value="FIXED"
                    @change="change = true, interestValidation = false, removeAll()"
                  >
                  <span class="radio-btn-text">Fixed</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="interestRate"
                    type="radio"
                    name="tax-abatement"
                    value="FLOATING"
                    @change="change = true, interestValidation = false, removeAll()"
                  >
                  <span class="radio-btn-text">Floating</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="interestRate"
                    type="radio"
                    name="tax-abatement"
                    value="FLOATING_TO_BE_FIXED_BEFORE_CLOSING"
                    @change="change = true, interestValidation = false, removeAll()"
                  >
                  <span class="radio-btn-text">Floating to be fixed before closing</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="interestRate"
                    type="radio"
                    name="tax-abatement"
                    value="SWAP"
                    @change="change = true, interestValidation = false, removeAll()"
                  >
                  <span class="radio-btn-text">Swap</span>
                </label>
              </div>
            </div>
          </div>
          <span
            v-if="interestValidation"
            class="error-message"
          >This field is required</span>
        </div>
        <template v-if="interestRate === 'FIXED'">
          <div class="form-highlight--merged form-highlight__group">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="input-holder input-holder--with-placeholder error-message-holder form-highlight--merged"
            >
              <label class="input-label">Fixed Rate Amount *</label>
              <TheMask
                v-model="fixedRateAmount"
                :mask="['#', '#.##', '##.##', '###.##']"
                :masked="true"
                @keyup.native="limit($event, 'fixedRateAmount');"
                @change.native="changeform()"
              />
              <span class="input-placeholder">%</span>
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </template>
        <template v-if="interestRate === 'FLOATING'">
          <div class="form-highlight--merged form-highlight__group">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="input-holder error-message-holder input--white"
            >
              <label class="input-label">Index *</label>
              <input
                v-model="yieldText"
                type="text"
                placeholder="E.g Libor, WSJ"
                required
                @change="changeform()"
              >
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="input-holder input-holder--with-placeholder error-message-holder input--white"
            >
              <label class="input-label">Spread *</label>
              <TheMask
                v-model="spread"
                :mask="['#', '#.##', '##.##', '###.##']"
                :masked="true"
                @change.native="changeform()"
                @keyup.native="limit($event, 'spread')"
              />
              <span class="input-placeholder">%</span>
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
            <div class="input-holder input-holder--with-placeholder error-message-holder input--white">
              <label class="input-label">Floor Rate </label>
              <TheMask
                v-model="floor_rate"
                :mask="['#', '#.##', '##.##', '###.##']"
                :masked="true"
                @change.native="changeform()"
                @keyup.native="limit($event, 'floor_rate')"
              />
              <span class="input-placeholder">%</span>
            </div>
          </div>
        </template>
        <template v-if="interestRate === 'FLOATING_TO_BE_FIXED_BEFORE_CLOSING'">
          <div class="form-highlight--merged form-highlight__group">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="input-holder error-message-holder input--white"
            >
              <label class="input-label">Index *</label>
              <input
                v-model="yield_second"
                type="text"
                placeholder="E.g Libor, WSJ"
                required
                @change="changeform()"
              >
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="input-holder input-holder--with-placeholder error-message-holder input--white"
            >
              <label class="input-label">Spread *</label>
              <TheMask
                v-model="spread_second"
                :mask="['#', '#.##', '##.##', '###.##']"
                :masked="true"
                @change.native="changeform()"
                @keyup.native="limit($event, 'spread_second')"
              />
              <span class="input-placeholder">%</span>
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
            <div class="input-holder input-holder--with-placeholder error-message-holder input--white">
              <label class="input-label">Floor Rate </label>
              <TheMask
                v-model="floor_rate_second"
                :mask="['#', '#.##', '##.##', '###.##']"
                :masked="true"
                @change.native="changeform()"
                @keyup.native="limit($event, 'floor_rate_second')"
              />
              <span class="input-placeholder">%</span>
            </div>
          </div>
        </template>
        <template v-if="interestRate === 'SWAP'">
          <div class="form-highlight--merged form-highlight__group">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="input-holder error-message-holder input--white"
            >
              <label class="input-label">Swap *</label>
              <input
                v-model="swap_value"
                type="text"
                required
                placeholder="E.g. Libor + 3%, floor of 2.5"
                @change="changeform()"
              >
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </template>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { CurrencyDirective } from 'vue-currency-input'
    import { allowOnlyNumbersGlobal } from '@/config/util'
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
    import { required } from 'vee-validate/dist/rules'
    import { mapState } from 'vuex'
    import { errorScroll } from '@/config/util'
    import {TheMask} from 'vue-the-mask'

    extend('required', {
        ...required,
        message: 'This field is required',
    })

    interface Data {
        amountOfYears: string
        interestValidation: boolean
        openField: boolean
        amountOfYearsReset: string
        interestRate: string
        fixedRateAmount: string
        yieldText: string
        spread: string
        change: boolean
        floor_rate: string

        yield_second: string
        spread_second: string
        floor_rate_second: string
        swap_value: string
    }

    export default Vue.extend({

        components: {
            ValidationProvider,
            ValidationObserver,
            TheMask,
        },

        directives: {
            currency: CurrencyDirective,
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
                interestRate: '',
                amountOfYears: '',
                fixedRateAmount: '',
                openField: false,
                amountOfYearsReset: '',
                yieldText: '',
                spread: '',
                interestValidation: false,
                change: false,
                floor_rate: '',

                yield_second: '',
                spread_second: '',
                floor_rate_second: '',
                swap_value: '',
            }
        },

        mounted() {
            this.setFields()
            this.$store.dispatch('ui', {overlay: false})

        },

        computed: {
            ...mapState({
                pageTwo: state => state['CreateQuote'].pageTwo,
			}),
        },

        watch: {
            amountOfYears() {
                this.change = true
                // This doesn't allow for leading zeors, but allows zero num to be entered
                if(this.amountOfYears.length === 2) {
                    if(this.amountOfYears[0] === '0') {
                        this.amountOfYears = this.amountOfYears[1]
                    }
                }
            },
        },

        methods: {
            limit(e, model) {
                const val = e.target.value
                if (e.keyCode === 110 || e.keyCode === 188 || e.keyCode === 190 || e.keyCode === 191) {
                    if(val === '') {
                        this[model] = '0'+this[model]
                        return
                    }
                }
                if(val.length === 6) {
                    if(val > 100) {
                        const num = 100
                        this[model] = num.toFixed(2)
                    }

                    if(val.charAt(0) === '0') {
                        this[model] = val.substring(1)
                    }
                }
            },
            async next() {
                const isValid = await this.$refs.interestObserver.validate()
                errorScroll()

                if (this.interestRate === 'UNDEFINED' || this.interestRate === '') {
                    this.interestValidation = true
                    return
                }

                this.interestValidation = false
                
                if (!isValid) {
                    return
                }

                if(this.change) {
                    const dealID = this.$route.params.deal
                    const dealObject_ = await this.$store.dispatch("getDealByIdQuote", {id: dealID})
                    const dealStatus = dealObject_.data.data.dealObject.deal.finished

                    if(dealStatus) {
                        if (this.change){
                            await this.$store.dispatch('setPageTwo', this.createObject())
                        }
                    } else {
                        this.$emit('dealDrafted')
                    }
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
            resetValueYield() {
                this.yieldText = ''
                this.spread = ''
                this.floor_rate = ''
            },
            resetValueFixed() {
                this.fixedRateAmount = ''
            },
            /**
             * @author Branislav Jerinic
             * @description if amount of years is changed open new field
             */
            openNewField() {
                if (parseInt(this.amountOfYears)) {
                    this.openField = true
                } else {
                    this.openField = false
                }

                if(parseInt(this.amountOfYears) > 100) {
                    this.amountOfYears = 100
                }
            },

            /**
             * @author Branislav Jerinic
             * @description custom number spinner
             */
            customNumDec() {
                let currentNum = parseInt(this.amountOfYears)
                if (isNaN(currentNum)) {
                    currentNum = 0
                }

                if (currentNum <= 0) {
                    return
                }

                this.amountOfYears = currentNum - 1
                this.openNewField()
            },

            customNumInc() {
                let currentNum = parseInt(this.amountOfYears)
                if (isNaN(currentNum)) {
                    currentNum = 0
                }

                this.amountOfYears = currentNum + 1
                this.openNewField()
            },
            allowOnlyNumbers(event) {
                allowOnlyNumbersGlobal(event)
            },

            createObject() {
                const obj = {
                    amountOfYears: parseInt(this.amountOfYears),
                    amountOfYearsReset: this.amountOfYearsReset,
                    interestRateType: this.interestRate,
                    interestRate: {
                        fixedRateAmount: this.fixedRateAmount,
                        yieldText: this.yieldText,
                        spread: this.spread,
                        floor_rate: this.floor_rate,

                        yield_second: this.yield_second,
                        spread_second: this.spread_second,
                        floor_rate_second: this.floor_rate_second,
                        swap_value: this.swap_value,
                    },
                }
                return obj
            },

            setFields() {
                if(this.pageTwo) {
                    this.amountOfYears = this.pageTwo.amountOfYears
                    this.amountOfYearsReset = this.pageTwo.amountOfYearsReset
                    this.interestRate = this.pageTwo.interestRateType
                    this.fixedRateAmount = this.pageTwo.interestRate.fixedRateAmount
                    this.yieldText = this.pageTwo.interestRate.yieldText
                    this.spread = this.pageTwo.interestRate.spread
                    this.floor_rate = this.pageTwo.interestRate.floor_rate

                    this.yield_second = this.pageTwo.interestRate.yield_second
                    this.spread_second = this.pageTwo.interestRate.spread_second
                    this.floor_rate_second = this.pageTwo.interestRate.floor_rate_second
                    this.swap_value = this.pageTwo.interestRate.swap_value ? this.pageTwo.interestRate.swap_value : ''

                    this.openNewField()
                }
            },

            removeAll() {
                this.fixedRateAmount = ''
                this.yieldText = ''
                this.spread = ''
                this.floor_rate = ''

                this.yield_second = ''
                this.spread_second = ''
                this.floor_rate_second = ''
                this.swap_value = ''
            },
        },
    })
</script>

<style lang="scss" scoped>
    .cf-form__sub-title {
        margin-bottom: 13px;
    }

    .input-label__years {
        max-width: 663px;

        @include mq(1024px) {
            max-width: 650px;
        }
    }
</style>
