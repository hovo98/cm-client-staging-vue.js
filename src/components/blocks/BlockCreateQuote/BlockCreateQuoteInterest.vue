<template>
  <div class="cq-form-inner">
    <ValidationObserver ref="interestObserver">
      <div class="form-highlight">
        <div class="form-split form-highlight__group error-message-holder">
          <div class="form-split">
            <h4 class="title-extra-small cf-form__sub-title">Interest rate *</h4>
            <div class="form-split__holder">
              <div class="input-holder form-split__input-holder error-message-holder">
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
                @change="changeform()"
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
                @change="changeform()"
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
                @change="changeform()"
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
                @change="changeform()"
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
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
    import { required } from 'vee-validate/dist/rules'
    import { mapState } from 'vuex'
    import {TheMask} from 'vue-the-mask'

    extend('required', {
        ...required,
        message: 'This field is required',
    })

    interface Data {
        interestValidation: boolean
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
                fixedRateAmount: '',
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
                interest: state => state['CreateQuote'].interest,
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

            setFields() {
                if(this.interest) {
                    this.interestRate = this.interest.interestRateType
                    this.fixedRateAmount = this.interest.interestRate.fixedRateAmount
                    this.yieldText = this.interest.interestRate.yieldText
                    this.spread = this.interest.interestRate.spread
                    this.floor_rate = this.interest.interestRate.floor_rate

                    this.yield_second = this.interest.interestRate.yield_second
                    this.spread_second = this.interest.interestRate.spread_second
                    this.floor_rate_second = this.interest.interestRate.floor_rate_second
                    this.swap_value = this.interest.interestRate.swap_value ? this.interest.interestRate.swap_value : ''
                }
            },

            createObject() {
                return {
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
            
            async next() {
                const isValid = await this.$refs.interestObserver.validate()

                if (this.interestRate === 'UNDEFINED' || this.interestRate === '') {
                    this.interestValidation = true
                    return
                }

                this.interestValidation = false
                
                if (!isValid) {
                    return
                }

                const dealID = this.$route.params.deal
                const dealObject_ = await this.$store.dispatch("getDealByIdQuote", {id: dealID})
                const dealStatus = dealObject_.data.data.dealObject.deal.finished

                if(dealStatus) {
                    if(this.change) {
                        await this.$store.dispatch('setInterest', this.createObject())
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
                switch (this.interestRate) {
                    case 'FIXED':
                        this.yieldText = ''
                        this.spread = ''
                        this.floor_rate = ''

                        this.yield_second = ''
                        this.spread_second = ''
                        this.floor_rate_second = ''
                        this.swap_value = ''
                        break
                    case 'FLOATING':
                        this.fixedRateAmount = ''
                        this.yield_second = ''
                        this.spread_second = ''
                        this.floor_rate_second = ''
                        this.swap_value = ''
                        break
                    case 'FLOATING_TO_BE_FIXED_BEFORE_CLOSING':
                        this.fixedRateAmount = ''
                        this.yieldText = ''
                        this.spread = ''
                        this.floor_rate = ''
                        this.swap_value = ''
                        break
                    case 'SWAP':
                        this.fixedRateAmount = ''
                        this.yieldText = ''
                        this.spread = ''
                        this.floor_rate = ''

                        this.yield_second = ''
                        this.spread_second = ''
                        this.floor_rate_second = ''
                        break
                
                    default:
                        break
                }
                this.change = true
            },
        },
    })
</script>

<style lang="scss" scoped>
    .cf-form__sub-title {
        margin-bottom: 13px;
    }
</style>
