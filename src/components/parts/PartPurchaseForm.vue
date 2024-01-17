<template>
  <div class="purchase-form">
    <ValidationObserver ref="purchaseForm">
      <div class="input-holder">
        <label class="input-label">What’s the purchase price for this property?*</label>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="error-message-holder error-message-holder--block input-holder--with-placeholder"
        >
          <input
            v-model="price"
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
            @keyup="checkPercentage()"
          >
          <span class="input-placeholder">$</span>
          <span class="error-message">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="input-holder">
        <label class="input-label">What size loan do you need?*</label>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="error-message-holder error-message-holder--block input-holder--with-placeholder"
        >
          <input
            v-model="loanAmount"
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
            @keyup="checkPercentage()"
          >
          <span class="input-placeholder">$</span>
          <span
            v-if="ifFlag"
            class="error-message"
          >The entered value should not be higher than the purchase price</span>
          <span
            v-else
            class="error-message"
          >{{ errors[0] }}</span>
          <span
            v-if="loanLimitReached && !errors[0] && !ifFlag"
            class="error-message"
          >Maximum loan size is $200,000,000</span>
        </ValidationProvider>
      </div>
      <div class="row input-holder-wrap input-holder-wrap--alt">
        <div class="input-holder input-holder--with-placeholder col-md-6">
          <label class="input-label">Estimated Value</label>
          <input
            v-model="estimatedValue"
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
            @change="$emit('changeform')"
          >
          <span class="input-placeholder">$</span>
        </div>
        <div class="input-holder input-holder--with-placeholder col-md-6">
          <label class="input-label">Estimated Cap Rate</label>
          <TheMask
            v-model="estimatedCapRate"
            :mask="['#', '#.##', '##.##', '###.##']"
            :masked="true"
            @keyup.native="limit($event, 'estimatedCapRate');"
            @change.native="$emit('changeform')"
          />
          <!-- <input type="number" max=100 v-model="estimatedCapRate" @change="$emit('changeform'), percentLimitComponent($event, 'estimatedCapRate')" @keydown="allowOnlyNumbers($event)" @wheel="$event.target.blur()" @keyup="percentLimitComponent($event, 'estimatedCapRate')"> -->
          <span class="input-placeholder">%</span>
        </div>
      </div>
      <div class="input-holder">
        <label class="input-label">Days to Close</label>
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
            v-model="daysToClose"
            class="custom-num__input"
            type="number"
            min="1"
            placeholder="0"
            @change="$emit('changeform'), allowOnlyNumbers($event)"
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
      </div>
      <!-- Auto filled and not editable -->
      <div class="input-holder">
        <label class="input-label">LTC %</label>
        <input
          v-model="ltc"
          type="text"
          value="75%"
          readonly
          @change="$emit('changeform')"
        >
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
    import { allowOnlyNumbersGlobal } from '@/config/util'
    import { formatNumber } from '@/config/util'
    import { CurrencyDirective } from 'vue-currency-input'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import { percentLimit } from '@/config/util'
    /* eslint-disable */
    import { required } from 'vee-validate/dist/rules';
    import {TheMask} from 'vue-the-mask'

    extend('required', {
        ...required,
        message: 'This field is required'
    });

    interface Data {
        title: string
        price: string
        estimatedValue: string
        estimatedCapRate: string
        daysToClose: string
        loanAmount: string
        ltc: string
        ifFlag: boolean
        loanLimitReached: boolean
    }

    export default Vue.extend({

        props: ['changeform'],

        data(): Data {
            return {
                title: 'This is title of "PartPurchaseForm"!',
                price: '',
                estimatedValue: '',
                estimatedCapRate: '',
                daysToClose: '',
                loanAmount: '',
                ltc: '',
                ifFlag: false,
                loanLimitReached: false
            };
        },

        mounted() {
            this.setField();
        },

        watch: {
            daysToClose() {
                this.$emit('changeform');

                if(this.daysToClose.length === 2) {
                    if(this.daysToClose[0] === '0') {
                        this.daysToClose = this.daysToClose[1];
                    }
                }

                //Limit input to highest number to be 999
                if(this.daysToClose.length > 3) {
                    this.daysToClose = 999;
                }
            },

            loanAmount() {
                const loanAmount = parseFloat(this.loanAmount.replace(/,/g, ''));
                const loanLimit = 200000000; 

                if(loanAmount > 200000000) {
                    this.loanAmount = loanLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.loanLimitReached = true;
                }
            }
        },

        methods: {
            createObject() {
                return {
                    price_purchase: parseInt(this.price.replace(/[^0-9]/g, '')),
                    estimated_value_purchase: parseInt(this.estimatedValue.replace(/[^0-9]/g, '')),
                    estimated_cap_rate_purchase: this.estimatedCapRate,
                    days_to_close_purchase: this.daysToClose,
                    loan_amount_requested_purchase: parseInt(this.loanAmount.replace(/[^0-9]/g, '')),
                    ltc_purchase: this.ltc,
                    step: 'dealLoanTypePurchase'
                }
            },

            async formValidation() {
                const success = await this.$refs.purchaseForm.validate();
                if (!success || this.ifFlag) {
                    return false;
                } else {
                    return true;
                }
            },

            setField() {
                if(this.purchase){
                    if (this.purchase.price) {
                        this.price = this.purchase.price ? formatNumber(this.purchase.price) : '';
                    }
                    if (this.purchase.estimated_value) {
                        let setedValue = this.purchase.estimated_value;
                        if (setedValue == 0) {
                            setedValue = '';
                        }
                        this.estimatedValue = setedValue ? formatNumber(setedValue) : '';
                    }
                    if (this.purchase.loan_amount) {
                        this.loanAmount = this.purchase.loan_amount ? formatNumber(this.purchase.loan_amount) : '';
                    }

                    this.estimatedCapRate = this.purchase.estimated_cap_rate;
                    this.daysToClose = this.purchase.days_to_close ? formatNumber(this.purchase.days_to_close) : '';
                    this.checkPercentage();
                }
            },

            checkPercentage() {
                this.$emit('changeform');
                if(this.loanAmount === '' || this.price === '') {
                    return;
                }
                this.ifFlag = false;
                const loanAmount = parseFloat(this.loanAmount.replace(/,/g, ''));
                const priceAmount = parseFloat(this.price.replace(/,/g, ''));

                if(priceAmount < loanAmount) {
                    this.ltc = '';
                    this.ifFlag = true;
                    return;
                }

                const sum = loanAmount/priceAmount*100;
                this.ltc = `${sum.toFixed(2)} %`;
            },

            typeCheck() {
                return this.purchase;
            },

            allowOnlyNumbers(event) {
                allowOnlyNumbersGlobal(event);
            },

            /**
             * @author Branislav Jerinic
             * @description custom number spinner
             */
            customNumDec() {
                const currentNum = parseInt(this.daysToClose);
                if (currentNum <= 0 || Number.isNaN(currentNum)) {
                    return;
                }

                this.daysToClose = currentNum - 1;
            },

            customNumInc() {
                let currentNum = parseInt(this.daysToClose);
                if (Number.isNaN(currentNum)) {
                    currentNum = 0;
                }

                this.daysToClose = currentNum + 1;
                // Check if number is more then 999 and limit it to 999
                if(this.daysToClose > 999) {
                    this.daysToClose = 999;
                }
            },

            limit(e, model) {
                const val = e.target.value;
                if (e.keyCode === 110 || e.keyCode === 188 || e.keyCode === 190 || e.keyCode === 191) {
                    if(val === '') {
                        this[model] = '0'+this[model];
                        return;
                    }
                }
                if(val.length === 6) {
                    if(val > 100) {
                        const num = 100;
                        this[model] = num.toFixed(2);
                    }

                    if(val.charAt(0) === '0') {
                        this[model] = val.substring(1);
                    }
                }
            },

            percentLimitComponent(event, modul) {
                if(!percentLimit(event.target.value)){
                    this[modul] = '';
                }
            }
        },

        components: {
            ValidationProvider,
            ValidationObserver,
            SvgIcon,
            TheMask
        },

        directives: {
            currency: CurrencyDirective
        },

        computed: {
            purchase() {
                return this.$store.getters.getPurchase;
            },
            id() {
                return this.$store.getters.getId;
            }
        },
        
    });
</script>

<style lang="scss" scoped>
    .input-holder-wrap--alt {
        max-width: 660px;
    }
</style>