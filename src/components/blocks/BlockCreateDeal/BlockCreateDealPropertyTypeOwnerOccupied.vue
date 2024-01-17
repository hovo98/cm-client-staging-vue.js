<template>
  <div class="cd-form-inner">
    <ValidationObserver ref="propOwnOccForm">
      <div class="owner-occupied-form">
        <div class="input-holder">
          <label class="input-label">Business name*</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="error-message-holder error-message-holder--block"
          >
            <input
              v-model="business_name"
              type="text"
              @change="change = true"
            >
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="input-holder">
          <label class="input-label">What does business do/sell*</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="error-message-holder error-message-holder--block"
          >
            <textarea
              v-model="business_description"
              rows="5"
              placeholder="Write..."
              @change="change = true"
            />
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="input-holder">
          <label class="input-label">Amount of sales in most recent calendar year*</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="error-message-holder error-message-holder--block input-holder--with-placeholder"
          >
            <input
              v-model="sales_amount"
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
              @change="change = true"
            >
            <span class="input-placeholder">$</span>
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="input-holder">
          <label class="input-label">Amount of profits in a calender year*</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="error-message-holder error-message-holder--block input-holder--with-placeholder"
          >
            <input
              v-model="profit_amount"
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
              @change="change = true"
            >
            <span class="input-placeholder">$</span>
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="input-holder">
          <label class="input-label">What percent of business does borrower own*</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="error-message-holder error-message-holder--block input-holder--with-placeholder"
          >
            <input
              v-model="borrower_own"
              type="number"
              @keyup="percentLimitComponent($event, 'borrower_own')"
              @change="change = true"
              @wheel="$event.target.blur()"
            >
            <span class="input-placeholder">%</span>
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="input-holder">
          <label class="input-label">Business age (years)*</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="error-message-holder error-message-holder--block"
          >
            <input
              v-model="business_age"
              type="text"
              @change="change = true, allowOnlyNumbers($event)"
              @keydown="allowOnlyNumbers($event)"
              @wheel="$event.target.blur()"
            >
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="input-holder">
          <label class="input-label">Amount of sales YTD</label>
          <div class="input-holder--with-placeholder">
            <input
              v-model="sales_amount_YTD"
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
              @change="change = true"
            >
            <span class="input-placeholder">$</span>
          </div>
        </div>
        <div class="input-holder">
          <label class="input-label">Amount of profits YTD</label>
          <div class="input-holder--with-placeholder">
            <input
              v-model="profit_amount_YTD"
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
              @change="change = true"
            >
            <span class="input-placeholder">$</span>
          </div>
        </div>
        <div class="input-holder">
          <label class="input-label">Number of employees</label>
          <input
            v-model="employees"
            type="text"
            @change="change = true, allowOnlyNumbers($event)"
            @keydown="allowOnlyNumbers($event)"
            @wheel="$event.target.blur()"
          >
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
    import { allowOnlyNumbersGlobal } from '@/config/util'
    import { CurrencyDirective } from 'vue-currency-input'
    import { formatNumber, stringToNumber, percentLimit, errorScroll } from '@/config/util'
    /* eslint-disable */
    import { required } from 'vee-validate/dist/rules';

    extend('required', {
        ...required,
        message: 'This field is required'
    });

    interface Data {
        title: string
        change: boolean
        business_name: string
        business_description: string
        sales_amount: string
        profit_amount: string
        borrower_own: string
        business_age: string
        sales_amount_YTD: string,
        profit_amount_YTD: string,
        employees: string
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
                title: 'This is title of "BlockCreateDealPropertyTypeOwnerOccupied"!',
                change: false,
                business_name: '',
                business_description: '',
                sales_amount: '',
                profit_amount: '',
                borrower_own: '',
                business_age: '',
                sales_amount_YTD: '',
                profit_amount_YTD: '',
                employees: '',
            };
        },

        mounted() {
            this.setFields();
            this.$store.dispatch('ui', {overlay: false})
        },
        computed: {
            owner() {
                return this.$store.getters.getOwner;
            },
            id() {
                return this.$store.getters.getId;
            }
        },
        components: {
            ValidationProvider,
            ValidationObserver
        },
        directives: {
            currency: CurrencyDirective
        },

        watch: {
            business_age: function(newValue) {
                if(newValue) {
                    const result = newValue.replace(/\D/g, "")
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    Vue.nextTick(() => this.business_age = result);
                }
            },

            employees: function(newValue) {
                if(newValue) {
                    const result = newValue.replace(/\D/g, "")
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    Vue.nextTick(() => this.employees = result);
                }
            },
            business_description:  function(newValue) {
                this.business_description = newValue.replace(/<br>/g, '\n');
                this.change = true;
            }
        },
        methods: {
            async next() {
                const success = await this.$refs.propOwnOccForm.validate();
                errorScroll();
                if (!success) {
                    return;
                }
                if (this.change){
                    await this.$store.dispatch('setBrokerDealOwner', this.createObject());
                    return this.nextAction;
                } else {
                    if(this.owner)
                        return this.nextAction;
                }
            },
            skip() {
                return this.skipAction
            },
            prev() {
                return this.prevAction
            },
            createObject(){
                return {
                    business_name: this.business_name.replaceAll('\\', '/'),
                    business_description: this.business_description.replace(/(?:\r\n|\r|\n)/g, '<br>').replaceAll('\\', '/'),
                    sales_amount: this.sales_amount ? stringToNumber(this.sales_amount).toString() : '',
                    profit_amount: this.profit_amount ? stringToNumber(this.profit_amount).toString() : '',
                    borrower_own: this.borrower_own,
                    business_age: this.business_age,
                    sales_amount_YTD: this.sales_amount_YTD ? stringToNumber(this.sales_amount_YTD).toString() : '',
                    profit_amount_YTD: this.profit_amount_YTD ? stringToNumber(this.profit_amount_YTD).toString() : '',
                    employees: this.employees,
                    step : 'dealPropertyTypeOwnerOccupied'
                }
            },
            setFields() {
                if(this.owner) {
                    this.business_name = this.owner.business_name,
                    this.business_description = this.owner.business_description,
                    this.sales_amount = this.owner.sales_amount ? formatNumber(this.owner.sales_amount) : ''; 
                    this.profit_amount = this.owner.profit_amount ? formatNumber(this.owner.profit_amount) : ''; 
                    this.borrower_own = this.owner.borrower_own,
                    this.business_age = this.owner.business_age,
                    this.sales_amount_YTD = this.owner.sales_amount_YTD ? formatNumber(this.owner.sales_amount_YTD) : '';
                    this.profit_amount_YTD = this.owner.profit_amount_YTD ? formatNumber(this.owner.profit_amount_YTD) : '';
                    this.employees = this.owner.employees
                }
            },
            allowOnlyNumbers(event) {
                allowOnlyNumbersGlobal(event)
            },

            percentLimitComponent(event, modul) {
                if(!percentLimit(event.target.value)){
                    this[modul] = '';
                }
            }
        }
    });
</script>
