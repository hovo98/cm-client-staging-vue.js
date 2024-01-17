<template>
  <div class="cd-form-inner">
    <ValidationObserver ref="loanTypeConstruction">
      <div class="construction-form">
        <div class="input-holder">
          <label class="input-label">What amount are you requesting?*</label>
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
        <div class="form-highlight">
          <div class="form-split">
            <h4 class="title-extra-small form-split__title">Are you buying the land?</h4>
            <div class="form-split__holder">
              <div class="input-holder form-split__input-holder">
                <div class="form-split__input-holder-col">
                  <label class="radio-btn radio-btn--inline">
                    <input
                      v-model="buying_land"
                      type="radio"
                      name="land"
                      value="true"
                      @change="change = true; debt_on_property = '';purchase_price = '';purchase_date = '';debt_amount='';lender_name=''"
                    >
                    <span class="radio-btn-text">Yes</span>
                  </label>
                </div>
                <div class="form-split__input-holder-col">
                  <label class="radio-btn radio-btn--inline">
                    <input
                      v-model="buying_land"
                      type="radio"
                      name="land"
                      value="false"
                      @change="change = true; show_address_construction = ''"
                    >
                    <span class="radio-btn-text">Already own it</span>
                  </label>
                </div>
              </div>
            </div>
            <!-- If Already own it is checked -->
            <div
              v-if="buying_land === 'false' || buying_land === false"
              class="form-split__inner-box"
            >
              <div class="form-split form-highlight__group error-message-holder">
                <h4 class="title-extra-small form-split__title">Is there debt on the property?</h4>
                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label class="radio-btn radio-btn--inline">
                      <input
                        v-model="debt_on_property"
                        type="radio"
                        value="false"
                        name="property"
                        @change="change = true;purchase_price = '';purchase_date = '';debt_amount='';lender_name=''"
                      >
                      <span class="radio-btn-text">No (free & clear)</span>
                    </label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <label class="radio-btn radio-btn--inline">
                      <input
                        v-model="debt_on_property"
                        type="radio"
                        value="true"
                        name="property"
                        @change="change = true"
                      >
                      <span class="radio-btn-text">Yes</span>
                    </label>
                  </div>
                </div>
              </div>
              <div
                v-if="debt_on_property === 'true' || debt_on_property === true"
                class="form-split__holder"
              >
                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label class="input-label">Initial purchase price</label>
                  </div>
                  <div class="form-split__input-holder-col input-holder--with-placeholder">
                    <input
                      v-model="purchase_price"
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
                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label class="input-label">Initial purchase date</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <PartInputDate
                      ref="partDate"
                      :val-from-parent="purchase_date"
                      @changeVal="changeVal"
                    />
                  </div>
                </div>
                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label class="input-label">Dollar amount of Debt</label>
                  </div>
                  <div class="form-split__input-holder-col input-holder--with-placeholder">
                    <input
                      v-model="debt_amount"
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
                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label class="input-label">Lender name</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <input
                      v-model="lender_name"
                      type="text"
                      @change="change = true"
                    >
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="buying_land === 'true' || buying_land === true"
              class="form-split__inner-box"
            >
              <div class="form-split form-highlight__group error-message-holder">
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
                        v-model="show_address_construction"
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
                        v-model="show_address_construction"
                        type="radio"
                        value="false"
                        @change="change = true;"
                      >
                      <span class="radio-btn-text">No</span>
                    </label>
                  </div>
                </div>
                <span
                  v-if="errorMsg"
                  class="error-message"
                >The field is required.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import PartInputDate from '@/components/parts/PartDateInputCustom.vue'
    import { allowOnlyNumbersGlobal } from '@/config/util'
    import { CurrencyDirective } from 'vue-currency-input'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import { formatNumber } from '@/config/util'
    import { stringToNumber } from '@/config/util'
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
    /* eslint-disable */
    import { required } from 'vee-validate/dist/rules';

    extend('required', {
        ...required,
        message: 'This field is required'
    });

    interface Data {
        title: string
        change: string
        buying_land: string
        debt_on_property: string
        purchase_price: string
        purchase_date: string
        debt_amount: string
        lender_name: string
        loanAmount: string
        loanLimitReached: boolean
        show_address_construction: string
        errorMsg: boolean
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
                title: 'This is title of "BlockCreateDealLoanTypeConstruction"!',
                change: '',

                buying_land: '',
                debt_on_property: '',
                purchase_price: '',
                purchase_date: '',
                debt_amount: '',
                lender_name: '',
                loanAmount: '',
                loanLimitReached: false,
                show_address_construction: '',
                errorMsg: false
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

        async mounted() {
            this.setFields();
            await this.$store.dispatch('ui', {overlay: false})
        },

        computed: {
            construction() {
                return this.$store.getters.getConstruction;
            }
        },

        methods: {

            async next() {
                const success = await this.$refs.loanTypeConstruction.validate();

                if (!success) {
                    return;
                }

                if(this.buying_land && this.buying_land === 'true') {
                    if(this.show_address_construction === '') {
                        this.errorMsg = true;
                        return;
                    } else { 
                        this.errorMsg = false;
                    }
                }

                if(this.$refs.partDate) {
                    if(this.$refs.partDate.isError())
                        return;
                }

                if(this.change){
                    // send object to VUEX and BE
                    await this.$store.dispatch('setBrokerDealConstruction', this.createObject());
                }

                return this.nextAction;
            },
            skip() {
                return this.skipAction
            },
            prev() {
                return this.prevAction
            },

            createObject() {
                return {
                    buying_land: this.buying_land,
                    debt_on_property: this.debt_on_property,
                    purchase_price: this.purchase_price ? stringToNumber(this.purchase_price) : '',
                    purchase_date: this.purchase_date,
                    debt_amount: this.debt_amount ? stringToNumber(this.debt_amount) : '',
                    lender_name: this.lender_name.replaceAll('\\', '/'),
                    loanAmount: this.loanAmount ? stringToNumber(this.loanAmount).toString() : '',
                    show_address_construction: this.show_address_construction,
                    step: 'dealLoanTypeConstruction'
                }
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
                this.purchase_date = formattedDate;
                this.change = true;
            },
            /** on reload page get from VUEX if exsist */
            setFields() {
                if(this.construction){
                    if(this.construction.purchase_date !== '') {
                        this.purchase_date = this.construction.purchase_date;
                    }
                    this.buying_land = this.construction.buying_land;
                    this.debt_on_property = this.construction.debt_on_property;
                    this.purchase_price = this.construction.purchase_price ? formatNumber(this.construction.purchase_price) : '';
                    this.debt_amount = this.construction.debt_amount ? formatNumber(this.construction.debt_amount) : '';
                    this.loanAmount = this.construction.loanAmount ? formatNumber(this.construction.loanAmount) : '';
                    this.lender_name = this.construction.lender_name;
                    this.show_address_construction = this.construction.show_address_construction;
                }
            },
            allowOnlyNumbers(event) {
                allowOnlyNumbersGlobal(event)
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
            }
        }
    });
</script>
<style lang="scss" scoped>
    .tooltip-msg.tooltip-msg--small::before {
        @include mq(767px) {
            left: -222px;
        }
    }

    .tooltip-msg {
        margin: 0 5px;
        z-index: 10001;

        @include mq(1360px) {
            &::before {
                right: -72px;
                left: auto;
            }
        }

        @include mq(1024px) {
            &::before {
                right: -150px;
            }
        }

        @include mq(767px) {
            &::before {
                left: 0;
                right: auto;
            }
        }
    }
</style>
