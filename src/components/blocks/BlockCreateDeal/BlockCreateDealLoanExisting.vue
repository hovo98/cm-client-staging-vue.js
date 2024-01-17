<template>
  <div class="cd-form-inner">
    <div class="existing-loans-form">
      <div class="form-highlight">
        <h4 class="title-extra-small form-split__title">Are there existing loans on this property? *</h4>
        <div class="form-split form-split__holder form-highlight__group error-message-holder">
          <div class="input-holder form-split__input-holder form-split__input-holder--align-top">
            <div class="form-split__input-holder-col">
              <label class="radio-btn radio-btn--inline">
                <input
                  v-model="free"
                  type="radio"
                  name="tax-abatement"
                  value="true"
                  @change="change = true, validationProperty = false, lender = '', warehouse = ''"
                >
                <span class="radio-btn-text">No (Free and Clear)</span>
              </label>
            </div>
            <div class="form-split__input-holder-col">
              <label class="radio-btn radio-btn--inline">
                <input
                  v-model="free"
                  type="radio"
                  name="tax-abatement"
                  value="false"
                  @change="change = true, validationProperty = false"
                >
                <span class="radio-btn-text">Yes (Enter Amount)</span>
              </label>
            </div>
          </div>
          <span
            v-if="validationProperty"
            class="error-message"
          >This field is required</span>
        </div>
        <div
          v-if="free === 'false'"
          class="form-highlight__group"
        >
          <div class="input-holder">
            <!-- only show up if the $ option is selected in the previous question -->
            <label class="input-label">Lender name</label>
            <input
              v-model="lender"
              type="text"
              @change="change = true"
            >
          </div>
          <div class="input-holder input-holder--with-placeholder">  
            <label class="input-label">Amount*</label>
            <input
              v-model="warehouse"
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
            <span
              v-if="validationSubProperty"
              class="error-message"
            >This field is required</span>
          </div>
        </div>
      </div>
      <div class="cf-form-block cf-form-block--create-deal error-message-holder">
        <h4 class="title-extra-small cf-form__sub-title">Property type*</h4>
        <div class="rdb-box-items input-holder-wrap">
          <div class="rdb-box-item">
            <label class="rdb-box rdb-box-with-img cf-form-block--create-deal__rdb-box rdb-box--without-circle">
              <img
                src="@/assets/images/checkbox_icons/investment.png"
                alt="Investment"
              >
              <input
                v-model="propertyType"
                type="radio"
                name="property-type"
                value="INVESTMENT"
                @change="change = true, validationPropertyType = false"
              >
              <span class="rdb-box-text">Investment</span>
              <span class="rdb-box-hv" />
            </label>
          </div>
          <div class="rdb-box-item">
            <label class="rdb-box rdb-box-with-img cf-form-block--create-deal__rdb-box rdb-box--without-circle">
              <img
                src="@/assets/images/checkbox_icons/construction.png"
                alt="owner-occupied"
              >
              <input
                v-model="propertyType"
                type="radio"
                name="property-type"
                value="OWNER_OCUPIED"
                @change="change = true, validationPropertyType = false"
              >
              <span class="rdb-box-text">Owner Occupied</span>
              <span class="rdb-box-hv" />
            </label>
          </div>
        </div>
        <span
          v-if="validationPropertyType"
          class="error-message"
        >This field is required</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { allowOnlyNumbersGlobal } from '@/config/util'
    import { CurrencyDirective } from 'vue-currency-input'
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
        change: boolean
        propertyType: string
        free: string
        warehouse: string
        lender: string
        validationProperty: boolean
        validationPropertyType: boolean
        validationSubProperty: boolean
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

        mounted() {
            this.setFields();
            this.$store.dispatch('ui', {overlay: false})
        },

        data(): Data {
            return {
                title: 'This is title of "BlockCreateDealLoanExisting"!',
                change: false,
                propertyType: '',
                free: '',
                warehouse: '',
                lender: '',
                validationProperty: false,
                validationPropertyType: false,
                validationSubProperty: false,
            };
        },
        computed: {
            existing() {
                return this.$store.getters.getExisting;
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
        methods: {
            async next() {
                let validationFlag = false;

                if (!this.free) {
                    validationFlag = true;
                    this.validationProperty = true;
                }

                if (this.free === 'false' && !this.warehouse) {
                    validationFlag = true;
                    this.validationSubProperty = true;
                }

                if (!this.propertyType) {
                    validationFlag = true;
                    this.validationPropertyType = true;
                }

                if (validationFlag) {
                    return;
                }

                this.validationProperty = false;
                this.validationPropertyType = false;
                this.validationSubProperty = false;

                if (this.change) {
                    await this.$store.dispatch('setBrokerDealLoanExisting', this.createObject());
                    await this.$store.dispatch('getDealById', {id:this.$route.params.deal});
                    return this.checkValidation();
                } else {
                    if(this.existing) {
                        return this.checkValidation();
                    }
                }
            },
            checkValidation() {
                if (this.propertyType === ''){
                    return false;
                }

                if (this.propertyType === 'INVESTMENT') {
                    return 'dealPropertyTypeInvestment'
                }

                if (this.propertyType === 'OWNER_OCUPIED') {
                    return 'dealPropertyTypeOwnerOccupied'
                }

                return this.nextAction;
            },
            skip() {
                return this.skipAction
            },
            prev() {
                return this.prevAction
            },
            createObject(){
                return {
                    propertyType: this.propertyType,
                    free: this.free,
                    warehouse: this.warehouse ? stringToNumber(this.warehouse).toString() : '',
                    lender: this.lender.replaceAll('\\', '/'),
                    step: 'dealLoanExisting'
                }
            },
            setFields() {
                if(this.existing) {
                    this.propertyType = this.existing.propertyType,
                    this.free = this.existing.free,
                    this.warehouse = this.existing.warehouse ? formatNumber(this.existing.warehouse) : '';
                    this.lender = this.existing.lender
                }
            },
            allowOnlyNumbers(event) {
                allowOnlyNumbersGlobal(event)
            },
        }
    });
</script>

<style lang="scss" scoped>
    .cf-form__sub-title {
        margin-bottom: 13px;
    }
</style>
