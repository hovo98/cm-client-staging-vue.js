<template>
  <div class="cd-form-inner">
    <template v-for="(sponsor, index) in sponsorNames">
      <div
        v-if="index === 0"
        :key="index"
        class="input-holder error-message-holder"
      >
        <label class="input-label">Sponsor's name (or nickname)* </label>
        <input
          type="text"
          :value="sponsor.name"
          @change="setValueSponsor($event, index, 'name'); change = true"
          @keyup="removeError(index, 'name')"
          @keypress="preventNumbers"
        >
        <span
          :ref="'name'+index"
          class="error-message error-sponsor-fields"
        >This field is required</span>
      </div>
      <div
        v-else
        :key="index"
        class="input-holder error-message-holder"
      >
        <label class="input-label">Sponsor {{ index + 1 }} name (or nickname)* </label>
        <input
          :value="sponsor.name"
          type="text"
          @change="setValueSponsor($event, index, 'name'); change = true"
          @keyup="removeError(index, 'name')"
        >
        <a
          href="javascript:;"
          class="link link--sm"
          @click="removeSponsor(index)"
        >Remove sponsor<SvgIcon
          class="link__icon link__icon--right link__icon--remove"
          icon-name="ico-minus"
        /></a>
        <span
          :ref="'name'+index"
          class="error-message error-sponsor-fields"
        >This field is required</span>
      </div>
    </template>
    <div class="input-holder">
      <a
        href="javascript:;"
        class="link"
        @click="createSponsor(); change = true"
      >
        <SvgIcon
          class="link__icon"
          icon-name="ico-plus-circle"
        />
        Add another sponsor
      </a>
    </div>

    <div class="input-holder error-message-holder sponsor-block-wraper">
      <template v-for="(sponsor, index) in sponsorNames">
        <div :key="index">
          <span
            v-if="sponsorNames.length > 1"
            class="sponsor-block-title"
          >Sponsor {{ index + 1 }}</span>
          <div
            v-if="sponsorNames.length !== 1"
            class="input-holder error-message-holder"
          >
            <label class="input-label">Ownership*</label>
            <div class="input-holder--with-placeholder">
              <input
                ref="sponsor1"
                :value="sponsor.ownership"
                type="text"
                @change="setValueSponsor($event, index, 'ownership'); change = true;"
                @keyup="countPercent($event, index)"
              >
              <span class="input-placeholder">%</span>
            </div>
            <span
              :ref="'ownership'+index"
              class="error-message error-sponsor-fields"
            >This field is required</span>
          </div>

          <div class="input-holder">
            <label class="input-label">Years of real estate experience</label>
            <input
              :value="sponsor.years_experience"
              @keyup="change = true, setValueSponsor($event, index, 'years_experience'), allowOnlyNumbers($event)"
            >
          </div>

          <div
            v-if="parseInt(sponsor.years_experience) < 5"
            class="input-holder"
          >
            <span class="input-label">Family Experience</span>
            <label class="radio-btn radio-btn--inline">
              <input
                type="radio"
                name="familyExp"
                :value="true"
                :checked="sponsor.family_experience === 'true'"
                @change="change = true, setValueSponsor($event, index, 'family_experience')"
              >
              <span class="radio-btn-text">Yes</span>
            </label>
            <label class="radio-btn radio-btn--inline">
              <input
                type="radio"
                name="familyExp"
                :value="false"
                :checked="sponsor.family_experience === 'false'"
                @change="change = true, setValueSponsor($event, index, 'family_experience')"
              >
              <span class="radio-btn-text">No</span>
            </label>
          </div> 


          <div class="input-holder">
            <label class="input-label">Sponsor's annual income*</label>
            <div class="input-holder--with-placeholder">
              <input
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
                :value="formatNumbers(sponsor.annual_income)"
                @keyup="removeError(index, 'annual_income'), setValueSponsor($event, index, 'annual_income')"
                @change="change = true"
              >
              <span class="input-placeholder">$</span>
              <span
                :ref="'annual_income'+index"
                class="error-message error-sponsor-fields"
              >This field is required</span>
            </div>
          </div>


          <div class="input-holder">
            <label class="input-label">Sponsor's annual expenses*</label>
            <div class="input-holder--with-placeholder">
              <input
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
                :value="formatNumbers(sponsor.annual_expenses)"
                @change="change = true"
                @keyup="removeError(index, 'annual_expenses'), setValueSponsor($event, index, 'annual_expenses')"
              >
              <span class="input-placeholder">$</span>
              <span
                :ref="'annual_expenses'+index"
                class="error-message error-sponsor-fields"
              >This field is required</span>
            </div>
          </div>

          <div class="error-message-holder error-message-holder--block">
            <div class="form-highlight white-bg">
              <h4 class="title-extra-small cf-form__sub-title">Sponsor's assets*</h4>
              <div class="form-split">
                <div class="form-split__holder">
                  <div class="input-holder form-split__input-holder">
                    <div class="form-split__input-holder-col">
                      <label
                        for="real-estate"
                        class="input-label"
                      >Real Estate</label>
                    </div>
                    <div class="form-split__input-holder-col">
                      <div class="input-holder--with-placeholder">
                        <input
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
                          :value="formatNumbers(sponsor.assets_real_estate)"
                          @change="change = true"
                          @keyup="removeError(index, 'assets'), setValueSponsor($event, index, 'assets_real_estate')"
                        >
                        <span class="input-placeholder">$</span>
                      </div>
                    </div>
                  </div>
                  <div class="input-holder form-split__input-holder">
                    <div class="form-split__input-holder-col">
                      <label
                        for="assets_companies"
                        class="input-label"
                      >Companies/Corporations</label>
                    </div>
                    <div class="form-split__input-holder-col">
                      <div class="input-holder--with-placeholder">
                        <input
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
                          :value="formatNumbers(sponsor.assets_companies)"
                          @change="change = true"
                          @keyup="removeError(index, 'assets'), setValueSponsor($event, index, 'assets_companies')"
                        >
                        <span class="input-placeholder">$</span>
                      </div>
                    </div>
                  </div>
                  <div class="input-holder form-split__input-holder">
                    <div class="form-split__input-holder-col">
                      <label
                        for="other-assets"
                        class="input-label"
                      >Other assets</label>
                    </div>
                    <div class="form-split__input-holder-col">
                      <div class="input-holder--with-placeholder">
                        <input
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
                          :value="formatNumbers(sponsor.assets_other)"
                          @change="change = true"
                          @keyup="removeError(index, 'assets'), setValueSponsor($event, index, 'assets_other')"
                        >
                        <span class="input-placeholder">$</span>
                      </div>
                    </div>
                  </div>
                  <div class="input-holder form-split__input-holder">
                    <div class="form-split__input-holder-col">
                      <label
                        for="liquid"
                        class="input-label"
                      >Liquid Assets</label>
                    </div>
                    <div class="form-split__input-holder-col">
                      <div class="input-holder--with-placeholder">
                        <input
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
                          :value="formatNumbers(sponsor.assets_liquid)"
                          @change="change = true"
                          @keyup="removeError(index, 'assets'), setValueSponsor($event, index, 'assets_liquid')"
                        >
                        <span class="input-placeholder">$</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span
              :ref="'assets'+index"
              class="error-message error-sponsor-fields"
            >At least one field is required</span>
          </div>

          <div class="input-holder">
            <label class="input-label">Sponsor's liabilities*</label>
            <div class="input-holder--with-placeholder">
              <input
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
                :value="formatNumbers(sponsor.liabilities)"
                @change="change = true"
                @keyup="removeError(index, 'liabilities'), setValueSponsor($event, index, 'liabilities')"
              >
              <span class="input-placeholder">$</span>
              <span
                :ref="'liabilities'+index"
                class="error-message error-sponsor-fields"
              >This field is required</span>
            </div>
          </div>
        </div>
      </template>
      <span
        v-if="!percent && sponsorNames.length > 1"
        class="notice-message notice-message--static js-error-message"
      >The sum of ownerships must be equal to 100</span>
      <span
        v-if="percent"
        ref="errorPercent"
        class="error-message-static js-error-message"
      >The sum of ownerships must be equal to 100</span>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
    import { allowOnlyNumbersGlobal } from '@/config/util'
    import { CurrencyDirective } from 'vue-currency-input'
    import { formatNumber, formatDollarToString } from '@/config/util'

    /* eslint-disable */
    import { required } from 'vee-validate/dist/rules';

    extend('required', {
        ...required,
        message: 'This field is required'
    });

    interface Data {
        title: string
        change: boolean
        changeForm: boolean
        sum: number
        percent: boolean
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

        computed: {
            sponsor() {
                return this.$store.getters.getSponsor;
            },
            sponsorNames() {
                return this.$store.getters.getSonsorNames;
            },
            id() {
                return this.$store.getters.getId;
            }
        },

        components: {
            SvgIcon,
            ValidationProvider,
            ValidationObserver
        },

        data(): Data {
            return {
                title: 'CreateDealSponsor',
                change: false,
                changeForm: false,
                sum: null,
                percent: false
            };
        },

        mounted() {
            this.setField();
            this.$store.dispatch('ui', {overlay: false})
        },

        directives: {
            currency: CurrencyDirective
        },

        methods: {
            formatNumbers(val) {
                return formatNumber(val);
            },

            createSponsor() {
                if(this.sponsorNames.length === 10)
                    return;

                this.$store.commit('SET_SPONSOR_ARR', {
                    name: '',
                    ownership: '',
                    years_experience: '',
                    family_experience: '',
                    annual_income: '',
                    annual_expenses: '',
                    assets_real_estate: '',
                    assets_companies: '',
                    assets_other: '',
                    assets_liquid: '',
                    liabilities: ''
                });
            },

            preventNumbers(e) {
                e = e || window.event;
                var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
                var charStr = String.fromCharCode(charCode);
                if (/\d/.test(charStr)) {
                    e.preventDefault();
                } 
            },

            removeSponsor(index) {
                if(this.sponsorNames.length > 1) {
                    if(this.sponsorNames.length === 2) {
                        const obj = {
                            index: 0,
                            prop: 'ownership',
                            val: ''
                        }
                        this.$store.commit('SET_VALUE_SPONSOR_ARR', obj);
                    }
                    this.$store.commit('REMOVE_SPONSOR_ARR', index);
                    this.sum = 0;
                    this.change = true;
                } 
            },

            setValueSponsor(e, index, prop) {
                const val = e.target.value;
                const obj = {
                    index: index,
                    prop: prop,
                    val: e.target.value
                }
                this.$store.commit('SET_VALUE_SPONSOR_ARR', obj);
            },

            async next() {
                let validSponsor = this.checkSponsor();

                if(this.sponsorNames.length > 1) {
                    if(this.sum !== null){
                        if(this.sum !== 100){
                            this.percent = true;
                            validSponsor = false;
                            setTimeout(() => {
                                this.$refs['errorPercent'].scrollIntoView({ behavior: 'smooth', block: "center" });
                            }, 100);
                        }
                    }
                }
                if(validSponsor) {
                    if(this.change) {
                        await this.$store.dispatch('setBrokerSponsor', this.createObject());
                    }
                    return this.nextAction;
                }
            },
            checkSponsor() {
                let validation = [];
                this.sponsorNames.forEach((element, index) => {
                    let flag = true;
                    let flagAssets = false;

                    if(element.name === '') {
                        this.$refs['name'+index][0].style.display = 'block';
                        if(flag)
                            this.$refs['name'+index][0].scrollIntoView({ behavior: 'smooth', block: "center" });
                        flag = false;
                    }

                    if(this.sponsorNames.length > 1) {
                        if(element.ownership === '') {
                            this.$refs['ownership'+index][0].style.display = 'block';
                            if(flag)
                                this.$refs['ownership'+index][0].scrollIntoView({ behavior: 'smooth', block: "center" });
                            flag = false;
                        }
                    }

                    if(element.annual_income === '') {
                        this.$refs['annual_income'+index][0].style.display = 'block';
                        if(flag)
                            this.$refs['annual_income'+index][0].scrollIntoView({ behavior: 'smooth', block: "center" });
                        flag = false;
                    }

                    if(element.annual_expenses === '') {
                        this.$refs['annual_expenses'+index][0].style.display = 'block';
                        if(flag)
                            this.$refs['annual_expenses'+index][0].scrollIntoView({ behavior: 'smooth', block: "center" });
                        flag = false;
                    }

                    if(element.liabilities === '') {
                        this.$refs['liabilities'+index][0].style.display = 'block';
                        if(flag)
                            this.$refs['liabilities'+index][0].scrollIntoView({ behavior: 'smooth', block: "center" });
                        flag = false;
                    }
                    
                    const arr = ['assets_real_estate', 'assets_companies', 'assets_other', 'assets_liquid'];
                    arr.forEach(ele => {
                        if(element[ele] !== '')
                            flagAssets = true;
                    });

                    if(!flagAssets) {
                        this.$refs['assets'+index][0].style.display = 'block';
                        if(flag)
                            this.$refs['assets'+index][0].scrollIntoView({ behavior: 'smooth', block: "center" });
                        flag = false;
                    }

                    (flag)
                        ? validation = [...validation, true]
                        : validation = [...validation, false];
                });

                return !validation.includes(false);
            },
            skip() {
                return this.skipAction
            },
            prev() {
                return this.prevAction
            },
            createObject() {
                const arr = JSON.parse(JSON.stringify(this.sponsorNames));
                const newArr = arr.map((obj) => {
                    obj.years_experience = obj.years_experience ? obj.years_experience.toString() : '';
                    obj.annual_income = formatDollarToString(obj.annual_income);
                    obj.annual_expenses = formatDollarToString(obj.annual_expenses);
                    obj.liabilities = formatDollarToString(obj.liabilities);
                    obj.assets_real_estate = formatDollarToString(obj.assets_real_estate);
                    obj.assets_companies = formatDollarToString(obj.assets_companies);
                    obj.assets_other = formatDollarToString(obj.assets_other);
                    obj.assets_liquid = formatDollarToString(obj.assets_liquid);
                    return obj;
                });

                return {
                    sponsorInfo: newArr,
                    step: 'dealSponsor'
                }
            },

            /** on reload page get from VUEX if exsist */
            setField() {
                if(!this.sponsor) {
                    this.$store.commit('SET_SPONSOR_ARR', {
                        name: '',
                        ownership: '',
                        years_experience: '',
                        family_experience: '',
                        annual_income: '',
                        annual_expenses: '',
                        assets_real_estate: '',
                        assets_companies: '',
                        assets_other: '',
                        assets_liquid: '',
                        liabilities: ''
                    });
                }
            },

            countPercent(e, index) {
                this.percent = false;
                if(isNaN(e.target.value)) {
                    e.target.value = '';
                    return;
                }
                this.$refs['ownership'+index][0].style.display = 'none';
                let sum = 0;
                const val = parseInt(e.target.value);
                this.sponsorNames.forEach((element, newIndex) => {
                    if(element.ownership !== '') {
                        if(index !== newIndex) {
                            sum += parseInt(element.ownership);
                        }
                    }
                });
                const total = val + sum;
                this.sum = total;
                if(total > 100) {
                    e.target.value = '';
                }
            },

            removeError(index, prop){
                this.$refs[prop+index][0].style.display = 'none';
            },

            allowOnlyNumbers(event) {
                allowOnlyNumbersGlobal(event)
            },
        },
    });
</script>

<style lang="scss" scoped>
    .cf-form__sub-title {
        margin-bottom: 13px;
    }
    .error-sponsor-fields {
        display: none;
    }

    .error-message-static {
        font-size: 14px;
    }

    .sponsor-block-wraper {
        max-width: 100%;
    }

    .sponsor-block-title {
        color: $blue-chill;
        font-size: 18px;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 20px;
        display: block;

        @include mq(640px) {
            font-size: 16px;
        }
    }

    .sponsor-block-wraper > div {
        background: #f0f7f7;
        max-width: 100%;
        padding: 25px 25px;
        margin-bottom: 20px;

        @include mq(640px) {
            padding: 25px 15px;
        }
    }

    .white-bg {
        background: $white;
        @include mq(640px) {
            padding: 20px 10px 5px;

            .form-split__input-holder {
                margin: 0 0 20px;
            }
        }
    }

    .title-extra-small {
        margin-bottom: 40px;
    }

</style>
