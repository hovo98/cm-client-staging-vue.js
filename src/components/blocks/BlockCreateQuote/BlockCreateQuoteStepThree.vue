<template>
  <div class="cq-form-inner">
    <ValidationObserver ref="interestStepThree">
      <ValidationProvider
        v-slot="{ errors }"
        rules="required"
        class="input-holder error-message-holder input-holder__cnstruction-term"
      >
        <label class="input-label">Construction term (months) *</label>
        <input
          v-model="constructionTerm"
          type="text"
          required
          @change="changeform()"
        >
        <span class="error-message">{{ errors[0] }}</span>
      </ValidationProvider>
        
      <!-- Extension Options -->
      <div class="form-highlight">
        <div class="form-split form-highlight__group">
          <h4 class="title-extra-small cf-form__sub-title">Are you offering an extension option? *</h4>
          <div class="form-split__holder error-message-holder">
            <div class="input-holder form-split__input-holder form-split__input-holder--mobile">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="extensionOption"
                    type="radio"
                    name="extension-option"
                    value="YES"
                    @change="change = true, extensionValidation = false"
                  >
                  <span class="radio-btn-text">Yes</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="extensionOption"
                    type="radio"
                    name="extension-option"
                    value="NO"
                    @change="change = true, extensionValidation = false, extensionDuration = '', extensionFeeAmount = '', extensionFeePercentage = '', extensionsAllowed = '' "
                  >
                  <span class="radio-btn-text">No</span>
                </label>
              </div>
            </div>
            <span
              v-if="extensionValidation"
              class="error-message"
            >This field is required</span>
          </div>
        </div>
        <div
          v-if="extensionOption === 'YES'"
          class="form-highlight--merged form-highlight__group"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="input-holder input--white error-message-holder"
          >
            <label class="input-label">Extension duration *</label>
            <input
              v-model="extensionDuration"
              type="text"
              required
              @change="changeform()"
            >
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>

          <div class="input-holder input-holder--with-placeholder error-message-holder">
            <label class="input-label">Extension fee amount *</label>
            <div class="condition-txt-holder">
              <div class="input-wrapper">
                <input
                  v-model="extensionFeeAmount"
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
                  class="input-holder__input"
                  @change="changeform(); extensionFeePercentage = ''; extensionOpValidation()"
                >
                <span class="input-placeholder">$</span>
              </div>
              <div class="condition-txt condition-txt--btw-inputs condition-txt--margin-top">OR</div>
              <div class="input-wrapper">
                <TheMask
                  v-model="extensionFeePercentage"
                  :mask="['#', '#.##', '##.##', '###.##']"
                  :masked="true"
                  @change.native="extensionFeeAmount = ''; change = true; extensionOpValidation()"
                  @keyup.native="limit($event, 'extensionFeePercentage')"
                />
                            
                <span class="input-placeholder">%</span>
                <span
                  v-if="extensionValidationPercent"
                  class="error-message"
                >At least one field must be filled</span>
              </div>
            </div>
          </div>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="input-holder input--white error-message-holder"
          >
            <label class="input-label">Number of extensions allowed *</label>
            <div class="custom-num-holder">
              <button
                class="custom-num__btn custom-num__btn-inc"
                @click="customNumInc"
              >
                <SvgIcon
                  class="custom-num__btn-icon"
                  icon-name="ico-arrow-up"
                />
              </button>
              <input
                v-model="extensionsAllowed"
                class="custom-num__input"
                type="text"
                placeholder="0"
                min="0"
                @change="allowOnlyNumbers($event); change = true"
                @keydown="allowOnlyNumbers($event)"
                @wheel="$event.target.blur()"
              >
              <button
                class="custom-num__btn custom-num__btn-dec"
                @click="customNumDec"
              >
                <SvgIcon
                  class="custom-num__btn-icon"
                  icon-name="ico-arrow-down"
                />
              </button>
            </div>
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
      <!-- Resources -->
      <div class="form-highlight error-message-holder">
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
                    @change="change = true, resourceValidation = false"
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
                    @change="change = true, resourceValidation = false, fullRecourse = []"
                  >
                  <span class="radio-btn-text">No</span>
                </label>
              </div>
            </div>
            <span
              v-if="resourceValidation"
              class="error-message"
            >This field is required</span>
          </div>
        </div>
        <div
          v-if="recourse === 'YES'"
          class=" form-highlight__group form-highlight--merged"
        >
          <div class="error-message-holder">
            <div class="form-split__holder">
              <div class="row">
                <div class="col-md-4 checkbox-btn-holder">
                  <label class="chk-box chk-box--alt">
                    <input
                      v-model="fullRecourse"
                      type="checkbox"
                      name="recourseOption"
                      value="FULL_RECOURSE"
                      @change="change = true"
                    >
                    <span class="chk-box-text chk-box-text__left">Full recourse</span>
                  </label>
                </div>
                <div class="col-md-4 checkbox-btn-holder">
                  <label class="chk-box chk-box--alt">
                    <input
                      v-model="fullRecourse"
                      type="checkbox"
                      name="recourseOption"
                      value="PARTIAL_RECOURSE"
                      @click="clearNote"
                      @change="change = true"
                    >
                    <span class="chk-box-text chk-box-text__left">Partial recourse</span>
                  </label>
                </div>
                <div class="col-md-4 checkbox-btn-holder">
                  <label class="chk-box chk-box--alt">
                    <input
                      v-model="fullRecourse"
                      type="checkbox"
                      name="recourseOption"
                      value="BAD_BOY_CARVEOUTS"
                      @change="change = true"
                    >
                    <span class="chk-box-text chk-box-text__left">Bad boy carveouts</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="error-message-holder__form-group">
              <span
                v-if="fullRecourse.length > 2"
                class="error-message"
              >You may select up to two options</span>
              <span
                v-if="resourceOptionsValidation"
                class="error-message"
              >This field is required</span>
            </div>
          </div>
        </div>
        <template v-if="fullRecourse.includes('PARTIAL_RECOURSE')">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="input-holder input--white error-message-holder form-highlight--merged"
          >
            <label class="input-label">Add Note *</label>
            <textarea
              v-model="recourseNote"
              rows="4"
              @change="change = true"
            />
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </template>
      </div>
      <!-- Origination Fee -->
      <div class="form-highlight">
        <div class="form-split form-highlight__group">
          <h4 class="title-extra-small cf-form__sub-title">Are you collecting an origination fee? *</h4>
          <div class="form-split__holder error-message-holder ">
            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="collectingFee"
                    type="radio"
                    name="collecting-fee"
                    value="YES"
                    @change="change = true, collectingValidation = false"
                  >
                  <span class="radio-btn-text">Yes</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="collectingFee"
                    type="radio"
                    name="collecting-fee"
                    value="NO"
                    @change="change = true, collectingValidation = false, collectingFeePercentage = '', collectingFeeAmount = ''"
                  >
                  <span class="radio-btn-text">No</span>
                </label>
              </div>
            </div>
            <span
              v-if="collectingValidation"
              class="error-message"
            >This field is required</span>
          </div>
        </div>
        <div
          v-if="collectingFee === 'YES'"
          class="form-highlight--merged form-highlight__group error-message-holder"
        >
          <div class="input-holder input--white input-holder--with-placeholder ">
            <label class="input-label">Percentage</label>
            <TheMask
              v-model="collectingFeePercentage"
              :mask="['#', '#.##', '##.##', '###.##']"
              :masked="true"
              @keyup.native="limit($event, 'collectingFeePercentage'); originFeeDependenceValidation('collectingFeePercentage')"
              @change.native="changeform()"
            />
            <span class="input-placeholder">%</span>
          </div>
          <div class="condition-txt condition-txt--btw-inputs">OR</div>
          <div class="input-holder input-holder--with-placeholder">
            <label class="input-label">Amount</label>
            <input
              v-model="collectingFeeAmount"
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
              @keyup="originFeeDependenceValidation('collectingFeeAmount')"
            >
            <span class="input-placeholder">$</span>
          </div>
          <span
            v-if="originFeeFieldsValidation"
            class="error-message"
          >At least one field must be filled</span>
        </div>
      </div>
      <!-- Exit Fee -->
      <div class="form-highlight">
        <div class="form-split form-highlight__group">
          <h4 class="title-extra-small cf-form__sub-title">Are you charging an exit fee? *</h4>
          <div class="form-split__holder error-message-holder ">
            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="exitFee"
                    type="radio"
                    name="exit-fee"
                    value="YES"
                    @change="change = true, exitFeeValidation = false"
                  >
                  <span class="radio-btn-text">Yes</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="exitFee"
                    type="radio"
                    name="exit-fee"
                    value="NO"
                    @change="change = true, exitFeeValidation = false, exitFeePercent = '', exitFeeAmount = '', exitFeeComment = ''"
                  >
                  <span class="radio-btn-text">No</span>
                </label>
              </div>
            </div>
            <span
              v-if="exitFeeValidation"
              class="error-message"
            >This field is required</span>
          </div>
        </div>
        <div
          v-if="exitFee === 'YES'"
          class="form-highlight--merged form-highlight__group error-message-holder"
        >
          <div class="input-holder input--white input-holder--with-placeholder">
            <label class="input-label">Percentage *</label>
            <TheMask
              v-model="exitFeePercent"
              :mask="['#', '#.##', '##.##', '###.##']"
              :masked="true"
              @keyup.native="limit($event, 'exitFeePercent'); exitFeeDependenceValidation()"
            />
            <span class="input-placeholder">%</span>
          </div>
          <div class="condition-txt condition-txt--btw-inputs">OR</div>
          <div class="input-holder input-holder--with-placeholder">
            <label class="input-label">Dollar amount *</label>
            <input
              v-model="exitFeeAmount"
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
              @keyup="exitFeeDependenceValidation()"
            >
            <span class="input-placeholder">$</span>
          </div>
          <div class="input-holder input--white">
            <label class="input-label">Comments</label>
            <textarea
              v-model="exitFeeComment"
              rows="4"
            />
          </div>
          <span
            v-if="exitFeeFieldsValidation"
            class="error-message"
          >At least one field must be filled</span>
        </div>
      </div>
      <!-- Exit Fee -->
      <div class="form-highlight">
        <div class="form-split form-highlight__group">
          <h4 class="title-extra-small cf-form__sub-title">Are you offering a permanent loan option? *</h4>
          <div class="form-split__holder error-message-holder ">
            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="permanentLoanOption"
                    type="radio"
                    name="permanent-loan-option"
                    value="YES"
                    @change="change = true, permanentLoanOptionValidation = false"
                  >
                  <span class="radio-btn-text">Yes</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="permanentLoanOption"
                    type="radio"
                    name="permanent-loan-option"
                    value="NO"
                    @change="change = true, permanentLoanOptionValidation = false"
                  >
                  <span class="radio-btn-text">No</span>
                </label>
              </div>
            </div>
            <span
              v-if="permanentLoanOptionValidation"
              class="error-message"
            >This field is required</span>
          </div>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import { CurrencyDirective } from 'vue-currency-input'
    import { allowOnlyNumbersGlobal, formatNumber, stringToNumber, errorScroll } from '@/config/util'
    import {TheMask} from 'vue-the-mask'

    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
    import { required } from 'vee-validate/dist/rules'
    import { mapState } from 'vuex'

    extend('required', {
        ...required,
        message: 'This field is required',
    })

    interface Data {
        extensionValidation: boolean
        resourceValidation: boolean
        collectingValidation: boolean
        exitFeeValidation: boolean
        permanentLoanOptionValidation: boolean
        resourceOptionsValidation: boolean
        originFeeFieldsValidation: boolean
        exitFeeFieldsValidation: boolean
        extensionValidationPercent: boolean

        constructionTerm: string
        extensionOption: string
        extensionDuration: string
        extensionFeeAmount: string
        extensionFeePercentage: string
        extensionsAllowed: string
        recourse: string
        fullRecourse
        collectingFee: string
        collectingFeePercentage: string
        collectingFeeAmount: string
        exitFee: string
        exitFeePercent: string
        exitFeeAmount: string
        exitFeeComment: string
        permanentLoanOption: string
        change: boolean
        recourseNote: string
    }

    export default Vue.extend({

        components: {
            ValidationProvider,
            ValidationObserver,
            SvgIcon,
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
                extensionValidation: false,
                resourceValidation: false,
                collectingValidation: false,
                exitFeeValidation: false,
                permanentLoanOptionValidation: false,
                resourceOptionsValidation: false,
                originFeeFieldsValidation: false,
                exitFeeFieldsValidation: false,
                extensionValidationPercent: false,

                constructionTerm: '',
                extensionOption: '',
                extensionDuration: '',
                extensionFeeAmount: '',
                extensionFeePercentage: '',
                extensionsAllowed: '',
                recourse: '',
                fullRecourse: [],
                recourseNote: '',
                collectingFee: '',
                collectingFeePercentage: '',
                collectingFeeAmount: '',
                exitFee: '',
                exitFeePercent: '',
                exitFeeAmount: '',
                exitFeeComment: '',
                permanentLoanOption: '',
                change: false,
            }
        },

        mounted() {
            // this.convertInitValueToDollars();
            this.setFields()
          this.$store.dispatch('ui', {overlay: false})

        },

        computed: {
            ...mapState({
                stepThree: state => state['CreateQuote'].stepThree,
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

            setFields() {
                if(this.stepThree) {
                    // This takes string, cuts off everything after space, converts string into a number, converts it back to months, and converts it back to string.
                    let constructionTermBefore = Number(this.stepThree.constructionTerm.split(" ")[0])
                    let constructionTermAfter = (Math.floor(constructionTermBefore * 12)).toString()

                    this.constructionTerm = constructionTermAfter
                    this.extensionOption = this.stepThree.extensionOptionType
                    this.extensionDuration = this.stepThree.extensionOption.duration

                    this.extensionFeeAmount = this.stepThree.extensionOption.feeAmount ? formatNumber(this.stepThree.extensionOption.feeAmount) : ''
                    this.extensionsAllowed = this.stepThree.extensionOption.allowed
                    this.extensionFeePercentage = this.stepThree.extensionOption.feePercentage

                    this.recourse = this.stepThree.recourseOptionType
                    this.fullRecourse = this.stepThree.recourseType
                    this.recourseNote = this.stepThree.recourseNote
                    this.collectingFee = this.stepThree.collectingFeeType

                    this.collectingFeePercentage = this.stepThree.collectingFee.feePercent
                    this.collectingFeeAmount = this.stepThree.collectingFee.feeAmount ? formatNumber(this.stepThree.collectingFee.feeAmount) : ''

                    this.exitFee = this.stepThree.exitFeeType
                    this.permanentLoanOption = this.stepThree.permanentLoanOptionType

                    this.exitFeePercent = this.stepThree.exitFee?.fee?.feePercent
                    this.exitFeeAmount = this.stepThree.exitFee?.fee?.feeAmount
                    this.exitFeeComment = this.stepThree.exitFee?.comment
                }
            },

            createObject() {
                return {
                    constructionTerm: this.constructionTerm, 
                    extensionOptionType: this.extensionOption, 
                    extensionOption: {
                        duration: this.extensionDuration, 
                        feeAmount: this.extensionFeeAmount ? stringToNumber(this.extensionFeeAmount) : null, 
                        allowed: parseInt(this.extensionsAllowed),
                        feePercentage: this.extensionFeePercentage,
                    },
                    recourseOptionType: this.recourse, 
                    recourseType: this.fullRecourse, 
                    recourseNote: this.recourseNote,
                    collectingFeeType: this.collectingFee, 
                    collectingFee: {
                        feeAmount: this.collectingFeeAmount ? stringToNumber(this.collectingFeeAmount) : null,
                        feePercent: this.collectingFeePercentage,
                    },
                    exitFeeType: this.exitFee, 
                    exitFee: {
                        fee: {
                            feePercent: this.exitFeePercent,
                            feeAmount: this.exitFeeAmount ? stringToNumber(this.exitFeeAmount) : null,
                        },
                        comment: this.exitFeeComment,
                    },
                    permanentLoanOptionType: this.permanentLoanOption,
                }
            },

            extensionOpValidation() {
                if (this.extensionOption === 'YES' && this.extensionFeePercentage === '' && this.extensionFeeAmount === '') {
                    this.extensionValidationPercent = true
                } else {
                    this.extensionValidationPercent = false
                }
            },

            async next() {
                const isValid = await this.$refs.interestStepThree.validate()
                errorScroll()
                let validationFlag = true

                if(this.fullRecourse.length > 2) {
                    validationFlag = false
                }

                if (this.extensionOption === 'YES' && this.extensionFeePercentage === '' && this.extensionFeeAmount === '') {
                    this.extensionValidationPercent = true
                    validationFlag = false
                } else {
                    this.extensionValidationPercent = false
                }

                if (!this.extensionOption || this.extensionOption === 'UNDEFINED') {
                    this.extensionValidation = true
                    validationFlag = false
                }

                if(!this.recourse || this.recourse === 'UNDEFINED') {
                    this.resourceValidation = true
                    validationFlag = false

                }

                if(!this.collectingFee || this.collectingFee === 'UNDEFINED') {
                    this.collectingValidation = true
                    validationFlag = false
                }

                if(!this.exitFee || this.exitFee === 'UNDEFINED') {
                    this.exitFeeValidation = true
                    validationFlag = false

                }

                if(!this.permanentLoanOption || this.permanentLoanOption === 'UNDEFINED') {
                    this.permanentLoanOptionValidation = true
                    validationFlag = false
                }

                if(this.recourse !== '' && this.recourse !== 'NO' && (this.fullRecourse.length === 0)) {
                    this.resourceOptionsValidation = true
                    validationFlag = false
                } else {
                    this.resourceOptionsValidation = false
                }

                if (this.collectingFee !== '' && this.collectingFee !== 'NO' && (!this.collectingFeePercentage && !this.collectingFeeAmount)) {
                    this.originFeeFieldsValidation = true
                    validationFlag = false
                }

                if (this.exitFee !== '' && this.exitFee !== 'NO' && (!this.exitFeePercent && !this.exitFeeAmount)) {
                    this.exitFeeFieldsValidation = true
                    validationFlag = false
                }
                
                if (!isValid || !validationFlag) {
                    return
                }



                const dealID = this.$route.params.deal
                const dealObject_ = await this.$store.dispatch("getDealByIdQuote", {id: dealID})
                const dealStatus = dealObject_.data.data.dealObject.deal.finished

                if(dealStatus) {
                    await this.$store.dispatch('setQuoteStepThree', this.createObject())
                } else {
                    this.$emit('dealDrafted')
                    return
                }
                
                this.resourceValidation = false
                this.extensionValidation = false
                this.collectingValidation = false
                this.exitFeeValidation = false
                this.permanentLoanOptionValidation = false
                this.originFeeFieldsValidation = false

                let flag = '';
                (this.permanentLoanOption === 'NO') ? flag = 'quoteSummary' : flag = 'prLoansStepOne'

                if(flag === 'prLoansStepOne') {
                  await this.$store.dispatch('appendQuoteSidebar', true)
                }


                return flag
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
             * @description custom number spinner
             */
            customNumDec() {
                let currentNum = parseInt(this.extensionsAllowed)
                if (isNaN(currentNum)) {
                    currentNum = 0
                }

                if (currentNum <= 0) {
                    return
                }

                this.extensionsAllowed = currentNum - 1
            },

            customNumInc() {
                let currentNum = parseInt(this.extensionsAllowed)
                if (isNaN(currentNum)) {
                    currentNum = 0
                }

                this.extensionsAllowed = currentNum + 1 
                
                // If number is more then 999, return 999
                if (currentNum >= 999) {
                    this.extensionsAllowed = 999
                }
            },
            
            /**
             * @author Branislav Jerinic
             * @description validate if at least Origination fee fields are field
             */
            originFeeDependenceValidation(model) {
                if (this.collectingFee !== '') {
                    if(model === 'collectingFeeAmount') {
                        this.collectingFeePercentage = ''
                    } else {
                        this.collectingFeeAmount = ''
                    }
                    this.originFeeFieldsValidation = false
                } else {
                    this.originFeeFieldsValidation = false
                }
            },

            /**
             * @author Branislav Jerinic
             * @description validate if at least Exit fee fields are field
             */
            exitFeeDependenceValidation() {
                if (this.exitFee !== '' && (!this.exitFeePercent && !this.exitFeeAmount)) {
                    this.exitFeeFieldsValidation = true
                } else {
                    this.exitFeeFieldsValidation = false
                }
            },

            /**
             * @author Branislav Jerinic
             * @description 
             */
         /*   nextStepDirection() {
                this.$emit('nextStepDir', this.permanentLoanOption);
            }*/
        },

        watch: {
            extensionsAllowed() {
                // This doesn't allow for leading zeors, but allows zero num to be entered
                if(this.extensionsAllowed?.length === 2) {
                    if(this.extensionsAllowed[0] === '0') {
                        this.extensionsAllowed = this.extensionsAllowed[1]
                    }
                }
                this.change = true

                if (this.extensionsAllowed > 999) {
                    this.extensionsAllowed = 999
                }
            },
        },
    })
</script>

<style lang="scss" scoped>
    .cf-form__sub-title {
        margin-bottom: 13px;
    }

    .condition-txt--margin-top {
        margin-top: 15px;
    }

    .condition-txt-holder {
        display: flex;
        justify-content: space-between;
    }

    .input-wrapper {
        width: 45%;
    }

    .input-holder__cnstruction-term {
        max-width: 665px;
        
        @include mq(1024px) {
            max-width: 650px;
        }
    }
</style>
