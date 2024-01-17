<template>
  <div class="profile-tabs__content profile-tab-details profile-tab-details-lender">
    <div
      ref="offset"
      class="manage-deal__fieldset manage-deal--location"
    >
      <h2 class="manage-deal__fieldset-title">Update Your Preferences</h2>
      <p class="manage-deal__fieldset-text">Adjust the type of deals you’re looking for below. Going forward, we’ll only send you deals matching your new parameters.</p>
      <div class="manage-deal__fieldset-top">
        <h3 class="title-small manage-deal--title">Location Preferences</h3>
      </div>
      <MapComponent
        v-if="details"
        ref="maps"
        :profile="true"
        :location-from-profile="details.areas"
      />
    </div>
    <div class="manage-deal__fieldset fieldset--amount manage-deal__box">
      <div class="manage-deal__fieldset-top">
        <h3 class="title-small manage-deal__fieldset--title">Dollar Amount</h3>
        <p class="txt-with-link manage-deal__fieldset--subtitle">
          Select the loan size range or enter the amount
          below
        </p>
      </div>
      <VueSlider
        v-if="renderSlider"
        ref="slider"
        v-model="value"
        :min="min"
        :max="max"
        :formatter="formatter"
        :interval="step"
        :min-range="step*20"
        :tooltip="'always'"
        :tooltip-merge="tooltipMerge"
        :enable-cross="true"
        :lazy="true"
        :rail-style="railStyle"
        :tooltip-style="tooltipStyle"
        :tooltip-formatter="formatter2"
        :dot-size="dotSize"
        :process-style="processStyle"
        :height="height"
        :dot-options="DotOption"
        @error="error"
        @change="sliderChange"
      />
      <div class="vue-range-values">
        <span class="vue-range-value">{{ minLimitFormatted }}</span>
        <span class="vue-range-value">{{ maxLimitFormatted }}</span>
      </div>
      <div class="manage-deal__fieldset-values-holder input-rounded-holder">
        <input
          v-model="minValue"
          v-imask="mask"
          class="manage-deal__fieldset-value"
          @change="isChange = true"
          @complete="loanSizeInput($event, 0)"
          @blur="fixLoanSizeErrors"
        >
        <input
          v-model="maxValue"
          v-imask="mask"
          class="manage-deal__fieldset-value"
          @change="isChange = true"
          @complete="loanSizeInput($event, 1)"
          @blur="fixLoanSizeErrors"
        >
        <div class="error-notice">{{ errorMsg }}</div>
      </div>
    </div>


    <div class="deal-preferences__loan-type-wrapper">
      <h2 class="deal-preferences__loan-type title-small">Update the loan type(s) you offer</h2>
      <LoanType
        ref="loanTypeCom"
        @typeOfLoanCheck="typeOfLoanCheck"
      />
    </div>


    <div class="manage-deal__fieldset manage-deal__fieldset--assets">
      <div class="manage-deal__fieldset-top">
        <h3 class="title-small manage-deal__fieldset--title">Asset Type</h3>
        <p class="txt-with-link manage-deal__fieldset--subtitle">Select the preferable mortgage types:</p>
      </div>
      <div class="preferences__chk-box-holder">
        <div class="preferences__chk-box">
          <label
            for="chk-1"
            class="chk-box chk-box-with-img"
          >
            <img
              src="@/assets/images/checkbox_icons/retail.png"
              alt="Retail"
            >
            <input
              id="chk-1"
              v-model="assetsType"
              type="checkbox"
              :value="1"
              @change="isChange = true"
            >
            <span class="chk-box-text">Retail</span>
          </label>
        </div>
        <div class="preferences__chk-box">
          <label
            for="chk-2"
            class="chk-box chk-box-with-img"
          >
            <img
              src="@/assets/images/checkbox_icons/office.png"
              alt="Office"
            >
            <input
              id="chk-2"
              v-model="assetsType"
              type="checkbox"
              :value="2"
              @change="isChange = true"
            >
            <span class="chk-box-text">Office</span>
          </label>
        </div>
        <div class="preferences__chk-box">
          <label
            for="chk-3"
            class="chk-box chk-box-with-img"
          >
            <img
              src="@/assets/images/checkbox_icons/industrial.png"
              alt="Industrial"
            >
            <input
              id="chk-3"
              v-model="assetsType"
              type="checkbox"
              :value="3"
              @change="isChange = true"
            >
            <span class="chk-box-text">Industrial</span>
          </label>
        </div>
        <div class="preferences__chk-box">
          <label
            for="chk-4"
            class="chk-box chk-box-with-img"
          >
            <img
              src="@/assets/images/checkbox_icons/mixed-use.png"
              alt="Mixed use"
            >
            <input
              id="chk-4"
              v-model="assetsType"
              type="checkbox"
              :value="4"
              @change="isChange = true"
            >
            <span class="chk-box-text">Mixed Use</span>
          </label>
        </div>
        <div class="preferences__chk-box">
          <label
            for="chk-5"
            class="chk-box chk-box-with-img"
          >
            <img
              src="@/assets/images/checkbox_icons/construction.png"
              alt="Construction"
            >
            <input
              id="chk-5"
              v-model="assetsType"
              type="checkbox"
              :value="5"
              @change="isChange = true"
            >
            <span class="chk-box-text">Construction</span>
          </label>
        </div>
        <div class="preferences__chk-box">
          <label
            for="chk-6"
            class="chk-box chk-box-with-img"
          >
            <img
              src="@/assets/images/checkbox_icons/owner-occupied.png"
              alt="Owner occupied"
            >
            <input
              id="chk-6"
              v-model="assetsType"
              type="checkbox"
              :value="6"
              @change="isChange = true"
            >
            <span class="chk-box-text">Owner Occupied</span>
          </label>
        </div>
        <div class="preferences__chk-box">
          <label
            for="chk-7"
            class="chk-box chk-box-with-img"
          >
            <img
              src="@/assets/images/checkbox_icons/land.png"
              alt="Land"
            >
            <input
              id="chk-7"
              v-model="assetsType"
              type="checkbox"
              :value="7"
              @change="isChange = true"
            >
            <span class="chk-box-text">Land</span>
          </label>
        </div>
        <div class="preferences__chk-box">
          <label
            for="chk-8"
            class="chk-box chk-box-with-img"
          >
            <img
              src="@/assets/images/checkbox_icons/multifamily.png"
              alt="multifamily"
            >
            <input
              id="chk-8"
              v-model="assetsType"
              type="checkbox"
              :value="8"
              @change="multifamilyIsSelected = !multifamilyIsSelected, isChange = true"
            >
            <span class="chk-box-text">Multifamily</span>
          </label>
          <transition name="fade-in">
            <div
              v-if="multifamilyIsSelected"
              class="half-input-holder input-rounded-holder error-message-holder"
            >
              <span class="half-input-title">Amount of Units</span>
              <div class="input-rounded-dash">
                <input
                  v-model="multifamilyMin"
                  class="input--rounded input--small"
                  type="number"
                  min="2"
                  placeholder="Min"
                  @keyup="multiFamilyMessage"
                  @change="minValueFix(); isChange = true"
                >
                <input
                  v-model="multifamilyMax"
                  class="input--rounded input--small"
                  type="number"
                  max="99000"
                  placeholder="Max"
                  @keyup="multiFamilyMessage"
                  @change="maxValueFix(); isChange = true"
                >
              </div>
              <div
                v-if="multiFamilyError"
                class="error-notice"
              >
                Enter a value between 4-99,000
              </div>
              <div
                v-if="multiFamilyErrorEqual"
                class="error-notice"
              >
                Min and max values can't be equal and min value can't be bigger than max.
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div class="manage-deal__fieldset manage-deal__fieldset--assets">
      <div class="manage-deal__fieldset-top">
        <h3 class="title-small manage-deal__fieldset--title">What other asset types interest you?</h3>
        <p class="txt-with-link manage-deal__fieldset--subtitle">We'll be adding these filters shortly</p>
      </div>
      <div class="preferences__chk-box-holder">
        <div class="preferences__chk-box">
          <label
            for="ost-1"
            class="chk-box chk-box-with-img"
          >
            <div class="chk-box__image-wrapper">
              <img
                src="@/assets/images/checkbox_icons/healthcare.png"
                alt="Healthcare"
              >
            </div>
            <input
              id="ost-1"
              v-model="otherAssetsType"
              type="checkbox"
              :value="1"
              @change="isChange = true"
            >
            <span class="chk-box-text">Healthcare</span>
          </label>
        </div>
        <div class="preferences__chk-box">
          <label
            for="ost-2"
            class="chk-box chk-box-with-img"
          >
            <div class="chk-box__image-wrapper">
              <img
                src="@/assets/images/checkbox_icons/hospitality.png"
                alt="Hospitality"
              >
            </div>
            <input
              id="ost-2"
              v-model="otherAssetsType"
              type="checkbox"
              :value="2"
              @change="isChange = true"
            >
            <span class="chk-box-text">Hospitality</span>
          </label>
        </div>
        <div class="preferences__chk-box">
          <label
            for="ost-3"
            class="chk-box chk-box-with-img"
          >
            <div class="chk-box__image-wrapper">
              <img
                src="@/assets/images/checkbox_icons/agriculture.png"
                alt="Agriculture"
              >
            </div>
            <input
              id="ost-3"
              v-model="otherAssetsType"
              type="checkbox"
              :value="3"
              @change="isChange = true"
            >
            <span class="chk-box-text">Agriculture</span>
          </label>
        </div>
        <div class="preferences__chk-box">
          <label
            for="ost-4"
            class="chk-box chk-box-with-img"
          >
            <div class="chk-box__image-wrapper">
              <img
                src="@/assets/images/checkbox_icons/non-profits.png"
                alt="Non-profits"
              >
            </div>
            <input
              id="ost-4"
              v-model="otherAssetsType"
              type="checkbox"
              :value="4"
              @change="isChange = true"
            >
            <span class="chk-box-text">Non-profits</span>
          </label>
        </div>
        <div class="preferences__chk-box">
          <label
            for="ost-5"
            class="chk-box chk-box-with-img"
          >
            <div class="chk-box__image-wrapper">
              <img
                src="@/assets/images/checkbox_icons/bifurcated-assets.png"
                alt="Bifurcated Assets"
              >
            </div>
            <input
              id="ost-5"
              v-model="otherAssetsType"
              type="checkbox"
              :value="5"
              @change="bifurcatedIsSelected = !bifurcatedIsSelected"
              @click="unCheckAll"
            >
            <span class="chk-box-text">Bifurcated Assets</span>

            <div :class="bifurcatedIsSelected ? 'preferences__chk-box-sub-wrapper preferences__chk-box-sub-wrapper--visible' : 'preferences__chk-box-sub-wrapper'">
              <label
                for="ost-6"
                class="chk-box chk-box-with-img"
              >
                <input
                  id="ost-6"
                  v-model="otherAssetsType"
                  type="checkbox"
                  :value="6"
                  @change="isChange = true"
                  @click="validate"
                >
                <span class="chk-box-text">Ground Lease</span>
              </label>

              <label
                for="ost-7"
                class="chk-box chk-box-with-img"
              >
                <input
                  id="ost-7"
                  v-model="otherAssetsType"
                  type="checkbox"
                  :value="7"
                  @change="isChange = true"
                  @click="validate"
                >
                <span class="chk-box-text">Fee simple</span>
              </label>
              <div
                v-if="otherAssetsValidation"
                class="error-notice error-notice--sub"
              >Need to choose at least one option</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import {getImagesAsset} from '@/config/util'
import {IMaskDirective} from 'vue-imask'
import MapComponent from '@/components/blocks/BlockMaps/BlockMaps.vue'
import LoanType from '../../parts/PartFormLoanType.vue'

import GlobalNot from '@/services/Notification'

interface Data {
    options
    minLimitFormatted: string
    maxLimitFormatted: string
    minValue: string,
    maxValue: string,
    value
    errorMsg: string
    counter: number
    formatter2
    retail: boolean
    office: boolean
    warehouse: boolean
    multifamily: boolean
    mixed_use: boolean
    selectAll: boolean
    placeholderMap: string
    assetsType,
    otherAssetsType,
    otherAssetsValidation: boolean
    changeForm: boolean
    multifamilyMin: string
    multifamilyMax: string
    multiFamilyError: boolean
    multiFamilyErrorEqual: boolean
    multifamilyIsSelected: boolean
    bifurcatedIsSelected: boolean
    mask: Mask
    step: number
    prefix
    oldValue: number
    loadedValue
    scrollFlag: boolean
    isChange: boolean
}

interface Mask {
    mask: string
    blocks
}

export default Vue.extend({

    components: {
        VueSlider,
        MapComponent,
        LoanType,
    },

    directives: {
        imask: IMaskDirective,
    },
    props: {
        activetab: {
            type: Number,
        },
        role: {
            type: String,
        },
    },

    data(): Data {
        return {
            value: [],
            minLimitFormatted: '',
            maxLimitFormatted: '',
            minValue: '',
            maxValue: '',
            counter: 0,
            errorMsg: '',
            retail: true,
            office: true,
            warehouse: false,
            multifamily: false,
            mixed_use: true,
            selectAll: false,
            formatter2: v => `$${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            placeholderMap: getImagesAsset('dashboard/placeholder_map.jpg'),
            options: {
                suppressScrollX: true,
                wheelSpeed: 0.4,
            },
            assetsType: [],
            otherAssetsType: [],
            otherAssetsValidation: false,
            changeForm: false,
            isChange: false,
            mask: {
                mask: '$num',
                blocks: {
                    num: {
                        mask: Number,
                        thousandsSeparator: ',',
                    },
                },
            },
            multifamilyMin: '',
            multifamilyMax: '',
            multiFamilyError: false,
            multiFamilyErrorEqual: false,
            multifamilyIsSelected: false,
            bifurcatedIsSelected: false,
            prefix: [],
            step: 50000,
            oldValue: null,
            loadedValue: [],
            scrollFlag: false,
        }
    },

    computed: {
        details() {
            return this.$store.getters.getDetails
        },
        getLoanTemp() {
            return this.$store.getters.getLoanTemp
        },

        personalSettingsChanged() {
            return this.$store.getters.getPersonalSettingsChanged
        },
        companySettingsChanged() {
            return this.$store.getters.getCompanySettingsChanged
        },
        profileSettingsChanged() {
            return this.$store.getters.getProfileSettingsChanged
        },
    },

    watch: {
        details() {
            this.loadedValueSet()
            this.setAssetType()
            this.setMultifamily()
            this.setLoanSize()
            this.setOtherAssetType()

            this.$refs.loanTypeCom.setTypeOfLoans(this.details.type_of_loans)

            setTimeout(() => {
              if (this.$refs.maps) {
                this.$refs.maps.loadAll()
              }
            }, 700)
        },
        getLoanTemp() {
            this.$refs.loanTypeCom.setTypeOfLoans(this.getLoanTemp)
        },
        activetab() {
            if(this.activetab === 3 && this.role === 'lender') {
                this.$refs.maps.setZoom()
            }
        },
    },
    async created() {
        this.renderSlider = false
        this.enableCross = false
        this.tooltipMerge = false
        this.formatter = value => `$ ${value}`
        this.railStyle = {
            backgroundColor: '#f5f5f7',
            boxShadow: 'none',
            height: '16px',
        }
        this.tooltipStyle = {
            backgroundColor: '#0c8e8b',
            borderColor: '#0c8e8b',
        }
        this.processStyle = {
            backgroundColor: '#0c8e8b',
        }
        this.dotSize = 28
        this.height = 16
        this.DotOption = {
            tooltipStyle: {
                backgroundColor: '#fff',
                color: '#353539',
                fontSize: '16px',
            },
        }
    },

    methods: {

        typeOfLoanCheck() {
            this.isChange = true
        },

        setPrefix(val, index){
            this.prefix[index] = val
        },

        /**
         * @author Nikola Popov
         * @description
         *  if validation check , send data for update
         */
        updateForm() {
            const valid = this.validation()
            if (valid && !this.otherAssetsValidation) {
                this.$refs.maps.changeValidation()
                return this.createObjectForSend()
            } else {
                this.$refs.maps.validateLocaton()
                return ''
            }
        },

        /**
         * @author Nikola Popov
         * @description
         *  validation for location
         */
        validation() {
            let ast = false
            let location = false
            let multiValidation = false

            if(!this.assetsType.length) {
                // this.$store.dispatch('profileSettingsChanged', false);
                new GlobalNot('Asset type is required!', 'error')
                ast = false
            } else {
                ast = true
            }

            let foundMultifamily = this.assetsType.find(function (element) {
                return element === 8
            })

             // Min and max values can't be equal and min value can't be bigger than max.
            if(foundMultifamily) {
                if(this.multifamilyMin === '' && this.multifamilyMax === '') {
                    // this.$store.dispatch('profileSettingsChanged', false);
                    this.multiFamilyErrorEqual = false
                    multiValidation = true
                } else {
                    if(this.multifamilyMin === '' || this.multifamilyMax === '') {
                        this.multiFamilyErrorEqual = true
                        multiValidation = false
                    } else {
                        this.multiFamilyErrorEqual = false
                        multiValidation = true
                    }
                }
            } else {
                multiValidation = true
            }

            const isLocation = this.$refs.maps.getlocationsValidation()
            const isLocationChange = this.$refs.maps.isChangeLocation()
            const loanType = this.$refs.loanTypeCom.getTypeOfLoans()

            // type of loans
            if(!loanType) {
                // this.$store.dispatch('profileSettingsChanged', false);
                new GlobalNot('Loan type is required', 'error')
            }

            if (!isLocation && !isLocationChange) {
                location = true
            } else {
              // this.$store.dispatch('profileSettingsChanged', false);
                location = false
            }
            if(this.isChange || location) {
                if (ast && multiValidation && !isLocation && loanType) {
                    if(this.personalSettingsChanged && this.companySettingsChanged && this.profileSettingsChanged) {
                        this.isChange = false
                    }
                    return true
                } else {
                    this.$store.dispatch('profileSettingsChanged', false)
                    return false
                }
            }
        },

        createObjectForSend() {
            const loanType = this.$refs.loanTypeCom.getTypeOfLoans()
            const obj = {
                type: 'PERFECT',
                areas: this.setLocationForSend(),
                loan_size: {
                    min: this.value[0],
                    max: this.value[1],
                },
                asset_types: this.assetsType,
                other_asset_types: this.otherAssetsType,
                multifamily: {},
                type_of_loans: loanType,
            }

            let foundMultifamily = this.assetsType.find(function (element) {
                return element === 8
            })

            if(!foundMultifamily) {
                this.multifamilyMin = ''
                this.multifamilyMax = ''
            }

            if (this.multifamilyMin && this.multifamilyMax) {
                obj.multifamily = {
                    min_amount: parseInt(this.multifamilyMin),
                    max_amount: parseInt(this.multifamilyMax),
                }
            }

            return obj
        },

        setLocationForSend(){
            const arr = []
            const objectLocation = this.$refs.maps.getlocations()
            objectLocation.forEach(element => {
                arr.push({
                    area: element.area,
                    exclusions: element.exclusions,
                })
            })
            return arr
        },

        error(type, msg) {
            this.errorMsg = msg
            this.errorMsgCF = msg
        },
        clearErrors() {
            this.errorMsg = ''
            this.errorMsgCF = ''
        },

        /**
         * Listens to changes on Slider and shares the value with the inputs
         */
        sliderChange(value, index) {
            this.minValue = value[0].toString()
            this.maxValue = value[1].toString()
            this.setStep(value[index], index)

            this.clearErrors()
            this.isChange = true
        },

        /**
         * Listens to changes on inputs and shares the value with the Slider
         */
        loanSizeInput(e, index) {

            // Get the new value. If invalid, set to 0
            const newValue = e.detail.unmaskedValue ? parseInt(e.detail.unmaskedValue) : 0

            // Ignore if values are invalid, we will correct them in the fixLoanSizeErrors()
            if (newValue > this.max || newValue < this.min) {
                return
            }

            // Set the value and update the Slider
            this.value[index] = newValue

            if (this.$refs.slider) {
                this.$refs.slider.setValue(this.value)
            }
        },

        /**
         * Fix the errors, if min is higher than max, if less or above the limits
         */
        fixLoanSizeErrors() {
            // First check the min limit
            if (this.value[0] < this.min) {
                this.value[0] = this.min
            }

            // Is min higher than the max
            if (this.value[0] > this.value[1]) {
                this.value[1] = this.value[0] + this.step * 20
            }

            // Check the max limit
            if (this.value[1] > this.max) {
                this.value[1] = this.max
            }

            // Check the difference again
            if (this.value[0] === this.value[1]) {
                this.value[0] -= this.step * 20
            }

            // Update the values and the Slider
            this.minValue = this.value[0]
            this.maxValue = this.value[1]
            this.$refs.slider.setValue(this.value)
        },
        setStep(value, index) {
            let newValue = value
            this.oldValue = this.oldValue === null ? this.loadedValue[index] : this.oldValue

            let right = newValue > this.oldValue
            let left = newValue < this.oldValue

            if(value < 1000000 || (value === 1000000 && left)) {
                this.step = 50000
            } else if(value > 1000000 && value < 5000000 || (value === 1000000 && right) || (value === 5000000 && left)) {
                this.step = 100000
            } else if(value > 5000000 && value < 10000000 || (value === 5000000 && right) || (value === 10000000 && left)) {
                this.step = 500000
            } else if(value > 10000000 || (value === 10000000 && right)) {
                this.step = 1000000
            } else {
                this.step = 50000
            }
            this.oldValue = newValue
        },

        /**
         * This sets the initial values from the config and from the user
         */
        setLoanSize() {
           // const loanSizeSettings = this.$store.getters.getLoanSizeSettings;

            this.min = 0
            this.max = 200000000
            // this.step = loanSizeSettings.step;

            this.value = [
                parseInt(this.details?.loan_size?.min || this.min),
                parseInt(this.details?.loan_size?.max || this.max),
            ]

            this.minValue = this.value[0]
            this.maxValue = this.value[1]

            this.minLimitFormatted = `$${this.min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
            this.maxLimitFormatted = `$${this.max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

            this.renderSlider = true
        },

        setAssetType() {
            if(this.details !== null){
                this.assetsType = this.details.asset_types
                const flag = this.details.asset_types.find((ele) => {
                    return ele === 8
                })

                if(flag !== undefined){
                    this.multifamilyIsSelected = true
                }
            }
        },

        setOtherAssetType() {
            if(this.details !== null) {
                this.otherAssetsType = this.details.other_asset_types
                const flag = this.details.other_asset_types.find((ele) => {
                    return ele === 5
                })

                if(flag !== undefined) {
                    this.bifurcatedIsSelected = true
                }
            }
        },

        unCheckAll() {
            this.otherAssetsValidation = !this.otherAssetsValidation
            if(this.otherAssetsType.includes(5)) {
                const newArray = this.otherAssetsType.filter((value) => {
                    return value < 6
                })
                this.otherAssetsType = newArray
                this.otherAssetsValidation = false
            }
        },

        validate() {
            setTimeout(() => {
                if(this.otherAssetsType.includes(6) || this.otherAssetsType.includes(7)) {
                    this.otherAssetsValidation = false
                } else {
                    this.otherAssetsValidation = true
                }
            }, 100)

        },

        setMultifamily() {
            if(this?.details?.multifamily){
                this.multifamilyIsSelected = true
                this.multifamilyMin = this.details.multifamily.min_amount
                this.multifamilyMax = this.details.multifamily.max_amount
            }
        },
        multiFamilyMessage() {
            if (this.multifamilyMin < 4 && this.multifamilyMin !== '' || this.multifamilyMax > 99000 && this.multifamilyMax !== '') {
                this.multiFamilyErrorEqual = false
                this.multiFamilyError = true
            } else {
                this.multiFamilyError = false
            }
        },

        minValueFix() {
            const minMFValue = Number(this.multifamilyMin)
            const maxMFValue = Number(this.multifamilyMax)

            if (minMFValue < 4 && this.multifamilyMin !== '') {
                this.multifamilyMin = 4
            }

            if ((minMFValue >= maxMFValue) && this.multifamilyMax !== '') {
                this.multifamilyMin = maxMFValue - 1
            }
            this.multiFamilyError = false
        },

        maxValueFix() {
            const minMFValue = Number(this.multifamilyMin)
            const maxMFValue = Number(this.multifamilyMax)

            if (maxMFValue > 99000 && this.multifamilyMin !== '') {
                this.multifamilyMax = 99000
            }

            if ((maxMFValue <= minMFValue) && this.multifamilyMin !== '') {
                this.multifamilyMax = minMFValue + 1
            }
            this.multiFamilyError = false
        },

        loadedValueSet() {
            this.loadedValue[0] = this.value[0]
            this.loadedValue[1] = this.value[1]
        },
    },
})
</script>

<style lang="scss" scoped>
.auto-suggest__title {
    margin-bottom: 28px;
}

.scroll-list-ps {
    height: 360px;

    @include mq($lap-l) {
        height: 270px;
    }
}

.scroll-list__item {
    margin-bottom: 15px;

    @include mq($lap-l) {
        margin-bottom: 8px;
    }
}

.scroll-list__item--select-all {
    margin-bottom: 30px;

    @include mq($lap-l) {
        margin-bottom: 20px;
    }
}

.manage-deal__list {
    @include mq($lg) {
        margin-bottom: 30px;
    }
}

.manage-deal__box {
    margin-bottom: 80px;

    @include mq($lap-l) {
        margin-bottom: 35px;
    }
}

.manage-deal__map-placeholder {
    width: 100%;
    height: 560px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;

    @include mq($lap-l) {
        height: 400px;
    }

    @include mq($lg) {
        height: 320px;
    }

    @include mq($sm) {
        height: 250px;
    }
}

.manage-deal__fieldset {
    padding: 25px 80px;
    margin-bottom: 50px;

    &:last-of-type {
        margin-bottom: 0;
    }

    @include mq($lap-l) {
        padding: 35px 40px;
        margin-bottom: 35px;
    }

    @include mq($lg) {
        padding: 30px 0;
        margin-bottom: 20px;
    }
}

.manage-deal__fieldset-title {
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0.9px;
    margin-bottom: 20px;

    @include mq(767px) {
        text-align: center;
    }
}

.manage-deal__fieldset-text {
    margin-bottom: 60px;

    @include mq(767px) {
        text-align: center;
    }
}

.manage-deal__fieldset-top {
    margin-bottom: 50px;
}

.manage-deal__fieldset--title {
    text-align: center;
    margin-bottom: 15px;
}

.manage-deal__fieldset--subtitle {
    text-align: center;
    font-weight: 600;
}

.manage-deal__fieldset-values-holder {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    padding-top: 32px;
}

.manage-deal__fieldset-value {
    border-radius: 30px;
    max-width: 332px;
    margin: 0 15px;
    text-align: center;

    &:focus {
        padding-left: 25px;
    }

    &:invalid {
        background-color: rgba($red, 0.2);
    }

    @include mq($md) {
        margin: 0 7px;
    }
}

.manage-deal__fieldset-values-holder {
    position: relative;
}

.error-notice {
    font-size: 14px;
    text-align: center;
    padding-top: 10px;
    color: $red;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    width: 270px;
    z-index: 2;

    @include mq(1024px) {
        bottom: 10px;
    }
}

.manage-deal__fieldset--amount {
    .manage-deal__fieldset-top {
        margin-bottom: 75px;
    }
}

.preferences__chk-box-holder {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;

    @include mq(575px) {
        justify-content: space-between;
    }
}

.chk-box__image-wrapper {
    @include mq(330px) {
        display: flex;
        justify-content: center;
    }
}

.preferences__chk-box {
    display: flex;
    flex: 0 0 20%;
    max-width: 20%;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    margin-bottom: 30px;
    position: relative;

    @include mq($lap-l) {
        flex: 0 0 25%;
        max-width: 25%;
    }

    @include mq($lg) {
        flex: 0 0 33%;
        max-width: 33%;
    }

    @include mq($sm) {
        flex: 0 0 50%;
        max-width: 50%;
    }

    @include mq(330px) {
        flex: 0 0 100%;
        max-width: 100%;
    }
}

.remove-location {
    font-size: 10px;
    position: absolute;
    right: 0;
    color: $white;
    background-color: $mosque;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s $dur $ease;

    @include hover {
        background-color: $yellow-orange;
    }

    @include mq($sm) {
        font-size: 9px;
        height: 22px;
        width: 22px;
        right: 15px;
    }
}

.preferences__chk-box-sub-wrapper {
    position: absolute;
    bottom: -70px;
    opacity: 0;
    pointer-events: none;
    .chk-box-text {
        max-width: 100%;
    }

    @include mq(1185px) {
        width: 150px;
        .chk-box-text {
            max-width: 100%;
        }
    }
}

.preferences__chk-box-sub-wrapper--visible {
    opacity: 1;
    pointer-events: visible;
}

.error-notice--sub {
    font-size: 12px;
}

.deal-preferences__loan-type-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.deal-preferences__loan-type {
    margin-bottom: 50px;
    text-align: center;
}
</style>
