<template>
  <div class="cq-form-inner">
    <ValidationObserver ref="interestStepThree">
      <!-- Interest only period -->
      <div class="form-highlight">
        <div class="form-split form-highlight__group">
          <h4 class="title-extra-small cf-form__sub-title">Are you offering an interest-only period? *</h4>
          <div class="form-split__holder error-message-holder ">
            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="interestPeriod"
                    type="radio"
                    name="interest-period"
                    value="YES"
                    @change="change = true, interestPeriodValidation = false"
                  >
                  <span class="radio-btn-text">Yes</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="interestPeriod"
                    type="radio"
                    name="interest-period"
                    value="NO"
                    @change="change = true, interestPeriodValidation = false, interestPeriodTime = ''"
                  >
                  <span class="radio-btn-text">No</span>
                </label>
              </div>
            </div>
            <span
              v-if="interestPeriodValidation"
              class="error-message"
            >This field is required</span>
          </div>
        </div>
        <div
          v-if="interestPeriod === 'YES'"
          class="form-highlight--merged form-highlight__group error-message-holder"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="input-holder input--white error-message-holder"
          >
            <label class="input-label">For how many years?</label>
            <input
              v-model="interestPeriodTime"
              type="text"
              required
              @change="change = true"
            >
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
      <!-- Amortization period -->
      <div class="input-holder form-highlight form-highlight--alt">
        <div class="form-highlight__wrapper">
          <label class="input-label">Amortization period (years)</label>
          <input
            v-model="amortizationPeriod"
            type="text"
            @change="change = true"
          >
        </div>
      </div>
      <!-- Resources -->
      <div class="form-highlight">
        <div class="form-split form-highlight__group">
          <h4 class="title-extra-small cf-form__sub-title">Do you require recourse? *</h4>
          <div class="form-split__holder error-message-holder ">
            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="recourse"
                    type="radio"
                    name="recourse"
                    value="YES"
                    @change="change = true, recourseValidation = false"
                  >
                  <span class="radio-btn-text">Yes</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="recourse"
                    type="radio"
                    name="recourse"
                    value="NO"
                    @change="change = true, recourseValidation = false, recourseOption = [], recourseNote = ''"
                  >
                  <span class="radio-btn-text">No</span>
                </label>
              </div>
            </div>
            <span
              v-if="recourseValidation"
              class="error-message"
            >This field is required</span>
          </div>
        </div>
        <div
          v-if="recourse === 'YES'"
          class="form-highlight__group form-highlight--merged error-message-holder error-message-holder__form-group"
        >
          <div class="form-split__holder">
            <div class="row">
              <div class="col-md-6 checkbox-btn-holder">
                <label class="chk-box chk-box--alt">
                  <input
                    v-model="recourseOption"
                    type="checkbox"
                    value="FULL_RECOURSE"
                    @change="change = true, recourseOptionsValidation = false"
                  >
                  <span class="chk-box-text chk-box-text__left">Full recourse</span>
                </label>
              </div>
              <div class="col-md-6 checkbox-btn-holder">
                <label class="chk-box chk-box--alt">
                  <input
                    v-model="recourseOption"
                    type="checkbox"
                    value="PARTIAL_RECOURSE"
                    @click="clearNote"
                    @change="change = true, recourseOptionsValidation = false"
                  >
                  <span class="chk-box-text chk-box-text__left">Partial recourse</span>
                </label>
              </div>
              <div class="col-md-6 checkbox-btn-holder">
                <label class="chk-box chk-box--alt">
                  <input
                    v-model="recourseOption"
                    type="checkbox"
                    value="BURNOFF_RECOURSE"
                    @click="clearNote"
                    @change="change = true, recourseOptionsValidation = false"
                  >
                  <span class="chk-box-text chk-box-text__left">Burnoff Recourse</span>
                </label>
              </div>
              <div class="col-md-6 checkbox-btn-holder">
                <label class="chk-box chk-box--alt">
                  <input
                    v-model="recourseOption"
                    type="checkbox"
                    value="SPRINGING_RECOURSE"
                    @click="clearNote"
                    @change="change = true, recourseOptionsValidation = false"
                  >
                  <span class="chk-box-text chk-box-text__left">Springing Recourse</span>
                </label>
              </div>
              <div class="col-md-6 checkbox-btn-holder">
                <label class="chk-box chk-box--alt">
                  <input
                    v-model="recourseOption"
                    type="checkbox"
                    value="BAD_BOY_CARVEOUTS"
                    @change="change = true, recourseOptionsValidation = false"
                  >
                  <span class="chk-box-text chk-box-text__left">Bad boy carveouts</span>
                </label>
              </div>
            </div>
          </div>
          <span
            v-if="recourseOption.length > 2"
            class="error-message"
          >You may select up to two options</span>
          <span
            v-if="recourseOptionsValidation"
            class="error-message"
          >This field is required</span>
        </div>
        <template v-if="recourseOption.includes('PARTIAL_RECOURSE') || recourseOption.includes('SPRINGING_RECOURSE') || recourseOption.includes('BURNOFF_RECOURSE') && recourse === 'YES'">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="input-holder input--white error-message-holder form-highlight--merged"
          >
            <label class="input-label">Add Note *</label>
            <textarea
              ref="noteTextarea"
              v-model="recourseNote"
              rows="4"
              @change="change = true"
            />
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </template>
      </div>
      <!-- Origination fee -->
      <div class="form-highlight">
        <div class="form-split form-highlight__group">
          <h4 class="title-extra-small cf-form__sub-title">Are you collecting an origination fee? *</h4>
          <div class="form-split__holder error-message-holder ">
            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="collectingOriginationFee"
                    type="radio"
                    name="collecting-fee"
                    value="YES"
                    @change="change = true, collectingOriginationFeeValidation = false"
                  >
                  <span class="radio-btn-text">Yes</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="collectingOriginationFee"
                    type="radio"
                    name="collecting-fee"
                    value="NO"
                    @change="change = true, collectingOriginationFeeValidation = false, collectingOriginationFeePercentage = '', collectingOriginationFeeAmount = ''"
                  >
                  <span class="radio-btn-text">No</span>
                </label>
              </div>
            </div>
            <span
              v-if="collectingOriginationFeeValidation"
              class="error-message"
            >This field is required</span>
          </div>
        </div>
        <div
          v-if="collectingOriginationFee === 'YES'"
          class="form-highlight--merged form-highlight__group error-message-holder"
        >
          <div class="input-holder input--white input-holder--with-placeholder">
            <label class="input-label">Percentage</label>
            <TheMask
              v-model="collectingOriginationFeePercentage"
              :mask="['#', '#.##', '##.##', '###.##']"
              :masked="true"
              @keyup.native="limit($event, 'collectingOriginationFeePercentage'); collectingOriginationFeeDependenceValidation('collectingOriginationFeePercentage')"
              @change.native="changeform()"
            />
            <span class="input-placeholder">%</span>
          </div>
          <div class="condition-txt condition-txt--btw-inputs">OR</div>
          <div class="input-holder input-holder--with-placeholder">
            <label class="input-label">Amount</label>
            <input
              v-model="collectingOriginationFeeAmount"
              v-currency="{
                locale: 'en',
                currency: null,
                valueAsInteger: true,
                distractionFree: false,
                precision: 0,
                autoDecimalMode: true,
                valueRange: { min: 0 },
                allowNegative: false
              }"
              @change="changeform()"
              @keyup="collectingOriginationFeeDependenceValidation('collectingOriginationFeeAmount')"
            >
            <span class="input-placeholder">$</span>
          </div>
          <span
            v-if="collectingOriginationFeeFieldsValidation"
            class="error-message"
          >At least one field must be filled</span>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { CurrencyDirective } from 'vue-currency-input'
    import { allowOnlyNumbersGlobal, errorScroll } from '@/config/util'
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
    import { required } from 'vee-validate/dist/rules'
    import { stringToNumber } from '@/config/util'
    import { mapState } from 'vuex'
    import { formatNumber } from '@/config/util'
    import {TheMask} from 'vue-the-mask'

    extend('required', {
        ...required,
        message: 'This field is required',
    })

    interface Data {
        recourseValidation: boolean
        collectingOriginationFeeValidation: boolean
        collectingOriginationFeeFieldsValidation: boolean
        interestPeriodValidation: boolean
        recourseOptionsValidation: boolean

        interestPeriod: string
        interestPeriodTime: string
        amortizationPeriod: string
        recourse: string
        recourseOption
        recourseNote: string
        fullRecourse: string
        partialRecourse: string
        burnOffRecourse: string
        badBoyCarveout: string
        collectingOriginationFee: string
        collectingOriginationFeePercentage: string
        collectingOriginationFeeAmount: string
        change: boolean
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
                recourseValidation: false,
                interestPeriodValidation: false,
                recourseOptionsValidation: false,
                collectingOriginationFeeValidation: false,
                collectingOriginationFeeFieldsValidation: false,

                interestPeriod: '',
                interestPeriodTime: '',
                amortizationPeriod: '',
                recourse: '',
                recourseOption: [],
                recourseNote: '',
                fullRecourse: '',
                partialRecourse: '',
                burnOffRecourse: '',
                badBoyCarveout: '',
                collectingOriginationFee: '',
                collectingOriginationFeePercentage: '',
                collectingOriginationFeeAmount: '',
                change: false,
            }
        },

        mounted() {
            this.setFields()
          this.$store.dispatch('ui', {overlay: false})

        },

        computed: {
            ...mapState({
                pageThree: state => state['CreateQuote'].pageThree,
			}),
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

            clearNote() {
                this.recourseNote = ''
            },

            createObject() {
                return {
                    interestPeriod: this.interestPeriodTime, 
                    interestPeriodType: this.interestPeriod,
                    amortizationPeriod: this.amortizationPeriod,
                    recourseType: this.recourse,
                    recourseOptions: this.recourseOption,
                    recourseNote: this.recourseNote,
                    collectingOriginationFeeType: this.collectingOriginationFee,
                    collectingOrigination: {
                        costPercent: this.collectingOriginationFeePercentage,
                        costAmount: this.collectingOriginationFeeAmount ? stringToNumber(this.collectingOriginationFeeAmount) : null,
                    },
                }
            },

            setFields() {
                if(this.pageThree) {
                    this.interestPeriod = this.pageThree.interestPeriodType
                    this.interestPeriodTime = this.pageThree.interestPeriod
                    this.amortizationPeriod = this.pageThree.amortizationPeriod
                    this.recourse = this.pageThree.recourseType
                    this.recourseOption = this.pageThree.recourseOptions
                    this.recourseNote = this.pageThree.recourseNote
                    this.collectingOriginationFee = this.pageThree.collectingOriginationFeeType
                    this.collectingOriginationFeeAmount = this.pageThree.collectingOrigination.costAmount ? formatNumber(this.pageThree.collectingOrigination.costAmount) : ''
                    this.collectingOriginationFeePercentage = this.pageThree.collectingOrigination.costPercent
                }
            },

            async next() {
                const isValid = await this.$refs.interestStepThree.validate()
                errorScroll()
                let validationFlag = true

                if(this.recourseOption.length > 2) {
                    validationFlag = false
                }

                if(!this.interestPeriod) {
                    this.interestPeriodValidation = true
                    validationFlag = false
                }

                if(this.recourse === '') {
                    this.recourseValidation = true
                    validationFlag = false
                }

                if (this.recourse === '' || this.recourse === 'YES' && this.recourseOption.length === 0) {
                    this.recourseOptionsValidation = true
                    validationFlag = false
                }

                if(!this.collectingOriginationFee) {
                    this.collectingOriginationFeeValidation = true
                    validationFlag = false
                }

                if (this.collectingOriginationFee !== '' && this.collectingOriginationFee !== 'NO' && (!this.collectingOriginationFeePercentage && !this.collectingOriginationFeeAmount)) {
                    this.collectingOriginationFeeFieldsValidation = true
                    validationFlag = false
                }
                
                if (!isValid || !validationFlag) {
                    return
                }

                this.interestPeriodValidation = false
                this.recourseValidation = false
                this.collectingOriginationFeeValidation = false
                this.collectingOriginationFeeFieldsValidation = false

                const dealID = this.$route.params.deal
                const dealObject_ = await this.$store.dispatch("getDealByIdQuote", {id: dealID})
                const dealStatus = dealObject_.data.data.dealObject.deal.finished

                if(dealStatus) {
                    await this.$store.dispatch('setPageThree', this.createObject())
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
            allowOnlyNumbers(event) {
                allowOnlyNumbersGlobal(event)
            },
            /**
             * @author Branislav Jerinic
             * @description validate if at least Collection fee fields are field
             */
            collectingOriginationFeeDependenceValidation(model) {
                if (this.collectingOriginationFee !== '') {
                    if(model === 'collectingOriginationFeeAmount') {
                        this.collectingOriginationFeePercentage = ''
                    } else {
                        this.collectingOriginationFeeAmount = ''
                    }
                    this.collectingOriginationFeeFieldsValidation = false
                } else {
                    this.collectingOriginationFeeFieldsValidation = false
                }
            },
        },

        watch: {
            interestPeriodTime() {
                if(this.interestPeriodTime.length === 2) {
                    if(this.interestPeriodTime[0] === '0') {
                        this.interestPeriodTime = this.interestPeriodTime[1]
                    }
                }
                const yearlimit = 100
                if(this.interestPeriodTime > 100) {
                    this.interestPeriodTime = yearlimit.toString()
                }
            },

            amortizationPeriod: function(newValue) {
                if(newValue) {
                    const result = newValue.replace(/\D/g, "")
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    Vue.nextTick(() => this.amortizationPeriod = result)
                }
            },
        },
    })
</script>

<style lang="scss" scoped>
    .cf-form__sub-title {
        margin-bottom: 13px;
    }

    .form-highlight--alt {
        max-width: 100%;
    }

    .form-highlight__wrapper {
        max-width: 630px;
    }
</style>
