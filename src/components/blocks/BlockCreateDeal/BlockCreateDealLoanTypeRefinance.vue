<template>
  <div class="cd-form-inner">
    <ValidationObserver ref="loanTypeRefinance">
      <div class="refinance-form">
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
              @keyup="changeEmit()"
            >
            <span class="input-placeholder">$</span>
            <span class="error-message">{{ errors[0] }}</span>
            <span
              v-if="loanLimitReached && !errors[0]"
              class="error-message"
            >Maximum loan size is $200,000,000</span>
          </ValidationProvider>
        </div>
        <div class="input-holder">
          <label class="input-label">Initial purchase date</label>
          <PartInputDate
            ref="partDate"
            :val-from-parent="date"
            @changeVal="changeVal"
          />
        </div>
        <div class="row input-holder-wrap">
          <div class="input-holder col-md-6">
            <!-- If the date that they put in for Initial Purchase Date is more than 5 years ago, 
                        then this question, the Initial Purchase Price, is required for them to answer. -->
            <label class="input-label">Initial purchase price</label>
            <div class="input-holder--with-placeholder">
              <input
                v-model="purchasePrice"
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
              >
              <span class="input-placeholder">$</span>
            </div>
          </div>
          <div class="input-holder col-md-6">
            <label class="input-label">Current value</label>
            <div class="input-holder--with-placeholder">
              <input
                v-model="currentValue"
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
              >
              <span class="input-placeholder">$</span>
            </div>
          </div>
        </div>
        <div class="input-holder">
          <!-- list improvements or anything that changed with the property since purchase to justify higher value or immediate cash out -->
          <label class="input-label">Were there any improvements done since acquisition?</label>
          <textarea
            v-model="list"
            rows="5"
            placeholder="Write..."
            @change="changeform()"
            @keydown="changeform()"
          />
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
    import PartInputDate from '@/components/parts/PartDateInputCustom.vue'
    import { formatNumber } from '@/config/util'
    import { CurrencyDirective } from 'vue-currency-input'
    import { stringToNumber } from '@/config/util'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    /* eslint-disable */
    import { required } from 'vee-validate/dist/rules';

    extend('required', {
        ...required,
        message: 'This field is required'
    });

    interface Data {
        title: string
        change: boolean
        date: string
        purchasePrice: string
        currentValue: string
        list: string
        loanAmount: string
        loanLimitReached: boolean
    }

    export default Vue.extend({
        props: {
            dealID: {
                type: Number,
                default: 0
            },
            nextAction: {
                type: String,
                default: ''
            },
            prevAction: {
                type: String,
                default: ''
            },
            skipAction: {
                type: String,
                default: ''
            }
        },

        data(): Data {
            return {
                title: 'This is title of "BlockCreateDealLoanTypeRefinance"!',
                change: false,
                date: '',
                purchasePrice: '',
                currentValue: '',
                list: '',
                loanAmount: '',
                loanLimitReached: false,
            };
        },
        components: {
            ValidationProvider,
            ValidationObserver,
            PartInputDate,
            SvgIcon
        },
        
        directives: {
            currency: CurrencyDirective
        },

        mounted() {
            this.setFields();
            this.$store.dispatch('ui', {overlay: false})
        },
        computed: {
            refinance() {
                return this.$store.getters.getRefinance;
            },
        },
        methods: {
            async next() {
                const success = await this.$refs.loanTypeRefinance.validate();
                
                if(this.change && success){
                    await this.$store.dispatch('setBrokerDealRefinance', this.createObject());
                }

                if (!success) {
                    return;
                }

                if(this.$refs.partDate) {
                    if(this.$refs.partDate.isError())
                        return;
                }

                return this.nextAction;
            },
            skip() {
                return this.skipAction
            },
            prev() {
                return this.prevAction
            },

            /** on change form field set tu true */
            changeform(){
                this.change = true;
            },
            changeEmit() {
                this.change = true;
            },
            pad2(n) {
                return (n < 10 ? '0' : '') + n;
            },
            changeVal(val) {
                const newDate = new Date(val);
                let month = this.pad2(newDate.getMonth()+1);
                let day = this.pad2(newDate.getDate());
                let year= newDate.getFullYear();
                let formattedDate =  year+"-"+month+"-"+day;
                this.date = formattedDate;
                this.change = true;
            },
            createObject() {
                return {
                    date: this.date,
                    purchasePrice: this.purchasePrice.replace(/[^0-9]/g, ''),
                    currentValue: this.currentValue.replace(/[^0-9]/g, ''),
                    list: this.list.replace(/(?:\r\n|\r|\n)/g, '<br>').replaceAll('\\', '/'),
                    loanAmount: this.loanAmount ? stringToNumber(this.loanAmount).toString() : '',
                    step: 'dealLoanTypeRefinance'
                }
            },
            setFields() {
                if(this.refinance){
                    if(this.refinance.date !== '') {
                        this.date = this.refinance.date;
                    }
                    this.currentValue = this.refinance.currentValue ? formatNumber(this.refinance.currentValue) : '';
                    this.list = this.refinance.list;
                    this.purchasePrice = this.refinance.purchasePrice ? formatNumber(this.refinance.purchasePrice) : '';
                    this.loanAmount = this.refinance.loanAmount ? formatNumber(this.refinance.loanAmount) : '';
                }
            },
        },

        watch: {
            loanAmount() {
                const loanAmount = parseFloat(this.loanAmount.replace(/,/g, ''));
                const loanLimit = 200000000; 

                if(loanAmount > 200000000) {
                    this.loanAmount = loanLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.loanLimitReached = true;
                }
            },
            list:  function(val) {
                this.list = val.replace(/<br>/g, '\n');
                this.change = true;
            }
        }
    });
</script>
