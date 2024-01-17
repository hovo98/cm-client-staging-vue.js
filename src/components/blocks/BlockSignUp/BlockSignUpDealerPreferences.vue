<template>
  <div class="preferences-wrapper">
    <div class="preferences__inner">
      <form
        autocomplete="nope"
        class="preferences"
        @submit.prevent=""
      >
        <div class="preferences__top">
          <span class="preferences__pretitle">Create Account</span>
          <h2 class="preferences__title block-title">Tell us about your deal preferences</h2>
          <p class="txt-with-link">We'll notify you whenever we have a perfect-fit lead.</p>
        </div>
        <!-- TODO In next project phase uncomment this to show Multisteps -->
        <!-- <div class="preferences__split">
                    <div class="preferences__split-box preferences__split-box--first">
                        <div :class="['preferences__split-box-inner', {active:fitPerfect}]">
                            <div class="preferences__split-box-content">
                                <h3 class="preferences__split-box-title">Perfect Fit</h3>
                                <div class="preferences__split-box-text">Deals you will be notified about</div>
                            </div>
                            <div class="preferences__split-box-num"><span class="preferences__split-box-num-inner">1</span></div>
                        </div>
                    </div>
                    <div class="preferences__split-box preferences__split-box--last">
                        <div :class="['preferences__split-box-inner', {active:fitClose}]">
                            <div class="preferences__split-box-content">
                                <h3 class="preferences__split-box-title">Close Fit</h3>
                                <div class="preferences__split-box-text">Deals you will see when you login to your account</div>
                            </div>
                            <div class="preferences__split-box-num"><span class="preferences__split-box-num-inner">2</span></div>
                        </div>
                    </div>
                </div> -->
        <transition name="fade-in">
          <div v-if="fitPerfect">
            <div class="preferences__fieldset preferences__fieldset--location">
              <div class="preferences__fieldset-top">
                <h3 class="title-small preferences__fieldset--title">What area(s) do you serve?</h3>
                <p class="preferences__fieldset-desc">Add using the search function below</p>
              </div>
              <MapComponent ref="maps" />
            </div>
            <div class="preferences__fieldset preferences__fieldset--amount">
              <div class="preferences__fieldset-top">
                <h3 class="title-small preferences__fieldset--title">What's the typical loan size you offer?</h3>
                <p class="txt-with-link preferences__fieldset--subtitle">Indicate your prefered range below</p>
              </div>
              <VueSlider
                v-if="renderSlider"
                ref="slider"
                v-model="value"
                :min="min"
                :max="max"
                :formatter="formatter"
                :interval="step"
                :min-range="step"
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

              <div class="preferences__fieldset-values-holder input-rounded-holder">
                <input
                  v-model="minValue"
                  v-imask="mask"
                  class="preferences__fieldset-value"
                  @complete="loanSizeInput($event, 0)"
                  @blur="fixLoanSizeErrors"
                >
                <input
                  v-model="maxValue"
                  v-imask="mask"
                  class="preferences__fieldset-value"
                  @complete="loanSizeInput($event, 1)"
                  @blur="fixLoanSizeErrors"
                >
                <div class="error-notice">{{ errorMsg }}</div>
              </div>
            </div>
            <div class="preferences__fieldset preferences__fieldset--assets">
              <div class="preferences__fieldset-top">
                <h3 class="title-small preferences__fieldset--title">What property types do you prefer?</h3>
                <p class="txt-with-link preferences__fieldset--subtitle">Select as many or as few as you'd like</p>
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
                      @change="multifamilyIsSelected = !multifamilyIsSelected"
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
                          min="4"
                          placeholder="Min"
                          @keyup="multiFamilyMessage"
                          @change="minValueFix"
                        >
                        <input
                          v-model="multifamilyMax"
                          class="input--rounded input--small"
                          type="number"
                          max="99000"
                          placeholder="Max"
                          @keyup="multiFamilyMessage"
                          @change="maxValueFix"
                        >
                      </div>
                      <div
                        v-if="multiFamilyError && !multiFamilyErrorEqual"
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

            <div class="preferences__fieldset preferences__fieldset--assets">
              <div class="preferences__fieldset-top">
                <h3 class="title-small preferences__fieldset--title">What other asset types interest you?</h3>
                <p class="txt-with-link preferences__fieldset--subtitle">We'll be adding these filters shortly</p>
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
                    >
                    <span class="chk-box-text">Non-profits</span>
                  </label>
                </div>
                <div class="preferences__chk-box preferences__chk-box--sub">
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
            <!-- TODO In next project phase comment this below to show Multisteps button -->
            <div class="preferences-fieldset preferences__submit align--right error-message-holder">
              <a
                href="javascript:;"
                class="btn preferences__submit-btn"
                @click="processForm"
              ><img
                v-if="showLoader"
                src="@/assets/images/loader.gif"
                alt="loader"
                class="submit-btn-loader"
              >Finish</a>
            </div>
            <!-- TODO In next project phase uncomment this to show Multisteps button -->
            <!-- <div class="preferences-fieldset preferences__submit align--right error-message-holder">
                            <a href="javascript:;" class="btn preferences__submit-btn" @click="goToNextStep">Next Step</a>
                        </div> -->
          </div>
        </transition>

        <!-- <transition name="fade-in">
                    <div v-if="fitClose">
                        <div class="preferences__fieldset preferences__fieldset--location">
                            <div class="preferences__fieldset-top">
                                <h3 class="title-small preferences__fieldset--title">Location Preferences</h3>
                            </div>
                            <div class="preferences__fieldset-half">
                                <template v-for="input in inputsCF">
                                    <div class="preferences__fieldset-half-box" :key="input.id">
                                        <div class="preferences__fieldset-half-box-top">
                                            <p class="preferences__fieldset-half-box-text">Search for an area</p>
                                            <span class="preferences__fieldset-half-box-text preferences__fieldset-half-box-text--italic">(e. g. New York City)</span>
                                        </div>
                                        <form class="input-holder preferences__fieldset-half-box-inputs" autocomplete="off" @submit.prevent="">
                                            <vue-google-autocomplete
                                                ref="address"
                                                :id="input.id"
                                                classname="form-control"
                                                placeholder="Search by state, region, city, zip or neighbourhood"
                                                v-on:placechanged="getAddressDataCF"
                                                country="us"
                                            />
                                        </form>
                                    </div>
                                    <div class="preferences__fieldset-half-box" :key="input.id + 1">
                                        <div class="preferences__fieldset-half-box-top">
                                            <p class="preferences__fieldset-half-box-text preferences__fieldset-half-box-text--gray" v-if="!cityAddressCF">Is there an area within (area) that you do not service?</p>
                                            <p class="preferences__fieldset-half-box-text preferences__fieldset-half-box-text--gray" v-else>Is there an area within <span class="preferences__fieldset-half-box-address">{{cityAddressCF}}</span> that you do not service?</p>
                                        </div>
                                        <form class="input-holder preferences__fieldset-half-box-inputs" autocomplete="off" @submit.prevent="">
                                            <vue-google-autocomplete
                                                ref="address"
                                                :id="input.idSecond"
                                                classname="form-control"
                                                placeholder="Search by state, region, city, zip or neighbourhood"
                                                v-on:placechanged="getAddressDataSecondCF"
                                                country="us"
                                            />
                                            <div class="preferences__fieldset-half-box-pills" v-if="areaWithinCF">
                                                <div class="preferences__fieldset-half-box-pill-wrap">
                                                    <div class="preferences__fieldset-half-box-pill">{{areaWithinCF}} <a href="javascript:;" class="preferences__fieldset-half-box-pill-remove"><SvgIcon class="preferences__fieldset-half-box-pill-remove__icon" iconName="ico-close-thin"/></a></div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </template>
                                <div class="preferences__fieldset-half-box-full preferences__fieldset-half-box preferences__fieldset-half-btn-holder">
                                    <a href="javascript:;" class="btn btn--wider " @click="addInputCF"><SvgIcon class="btn__icon" iconName="ico-plus"/>Add a location</a>
                                </div>
                            </div>
                        </div>
                        <div class="preferences__fieldset preferences__fieldset--amount">
                            <div class="preferences__fieldset-top">
                                <h3 class="title-small preferences__fieldset--title">Dollar Amount</h3>
                                <p class="txt-with-link preferences__fieldset--subtitle">Select the loan size range or enter the amount below</p>
                            </div>
                            <vue-slider
                                v-model="valueCF"
                                :min="min"
                                :max="max"
                                :formatter="formatter"
                                :interval="1000"
                                :tooltip="'always'"
                                :tooltip-merge="tooltipMerge"
                                :enableCross="enableCross"
                                :lazy="true"
                                :railStyle="railStyle"
                                :tooltip-style="tooltipStyle"
                                :tooltip-formatter="formatter2"
                                :dotSize="dotSize"
                                :process-style="processStyle"
                                :height="height"
                                :dot-options="DotOption"
                                @error="error"
                                @change="clearErrorMsg"
                            >
                            </vue-slider>
                            <div class="vue-range-values">
                                <span class="vue-range-value">{{minValue}}</span>
                                <span class="vue-range-value">{{maxValue}}</span>
                            </div>
                            <div class="preferences__fieldset-values-holder input-rounded-holder">
                                <input type="number" class="preferences__fieldset-value" placeholder="Min" :min="min" :max="valueCF[1]" v-model="valueCF[0]" @input="clearErrorMsg(), limitMinValue()">

                                <input type="number" class="preferences__fieldset-value" placeholder="Max" :min="valueCF[0]" :max="max" v-model="valueCF[1]" @input="clearErrorMsg(), limitMaxValue()">
                                <div class="error-notice">{{ errorMsgCF }}</div>
                            </div>
                        </div>
                        <div class="preferences__fieldset preferences__fieldset--assets">
                            <div class="preferences__fieldset-top">
                                <h3 class="title-small preferences__fieldset--title">Asset Type</h3>
                                <p class="txt-with-link preferences__fieldset--subtitle">Select the preferable mortgage types:</p>
                            </div>
                            <div class="preferences__chk-box-holder">
                                <div class="preferences__chk-box">
                                    <label for="chk-1" class="chk-box chk-box-with-img">
                                        <img src="@/assets/images/checkbox_icons/retail.png" alt="Retail">
                                        <input type="checkbox" id="chk-1" :value="1" v-model="assetsType">
                                        <span class="chk-box-text">Retail</span>
                                    </label>
                                </div>
                                <div class="preferences__chk-box">
                                    <label for="chk-2" class="chk-box chk-box-with-img">
                                        <img src="@/assets/images/checkbox_icons/office.png" alt="Office">
                                        <input type="checkbox" id="chk-2" :value="2" v-model="assetsType">
                                        <span class="chk-box-text">Office</span>
                                    </label>
                                </div>
                                <div class="preferences__chk-box">
                                    <label for="chk-3" class="chk-box chk-box-with-img">
                                        <img src="@/assets/images/checkbox_icons/industrial.png" alt="Warehouse">
                                        <input type="checkbox" id="chk-3" :value="3" v-model="assetsType">
                                        <span class="chk-box-text">Industrial</span>
                                    </label>
                                </div>
                                <div class="preferences__chk-box">
                                    <label for="chk-5" class="chk-box chk-box-with-img">
                                        <img src="@/assets/images/checkbox_icons/mixed-use.png" alt="Mixed use">
                                        <input type="checkbox" id="chk-5" :value="5" v-model="assetsType">
                                        <span class="chk-box-text">Mixed Use</span>
                                    </label>
                                </div>
                                <div class="preferences__chk-box">
                                    <label for="chk-6" class="chk-box chk-box-with-img">
                                        <img src="@/assets/images/checkbox_icons/construction.png" alt="Construction">
                                        <input type="checkbox" id="chk-6" :value="6" v-model="assetsType">
                                        <span class="chk-box-text">Construction</span>
                                    </label>
                                </div>
                                <div class="preferences__chk-box">
                                    <label for="chk-8" class="chk-box chk-box-with-img">
                                        <img src="@/assets/images/checkbox_icons/land.png" alt="Land">
                                        <input type="checkbox" id="chk-8" :value="7" v-model="assetsType">
                                        <span class="chk-box-text">Land</span>
                                    </label>
                                </div>
                                <div class="preferences__chk-box">
                                    <label for="chk-4" class="chk-box chk-box-with-img">
                                        <img src="@/assets/images/checkbox_icons/multifamily.png" alt="multifamily">
                                        <input type="checkbox" id="chk-4" :value="8" v-model="assetsType" @change="multifamilyIsSelected = !multifamilyIsSelected">
                                        <span class="chk-box-text">Multifamily</span>
                                    </label>
                                    <transition name="fade-in">
                                        <div class="half-input-holder input-rounded-holder error-message-holder" v-if="multifamilyIsSelected">
                                            <span class="half-input-title">Amount of Units</span>
                                            <input class="input--rounded input--small" type="number" min="2" v-model="multifamilyMin" @keyup="multiFamilyMessage" @change="minValueFix" placeholder="Min">
                                            <input class="input--rounded input--small" type="number" max="99000" @keyup="multiFamilyMessage" v-model="multifamilyMax" @change="maxValueFix" placeholder="Max">
                                            <div class="error-notice" v-if="multiFamilyError">You can use range between 2 and 99,000.</div>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                        </div>
                        <div class="preferences-fieldset preferences__submit error-message-holder">
                            <a href="javascript:;" class="btn-direction btn-direction--back preferences__back" @click="goToPrevStep">Back</a>
                            <a href="javascript:;" class="btn preferences__submit-btn" @click="processForm"><img src="@/assets/images/loader.gif" alt="loader" class="submit-btn-loader" v-if="showLoader">Finish</a>
                            <span class="login-form__error error-message" v-if="errorMessage">Some error message</span>
                        </div>
                        <div class="error-message-static text-align--center">All fields are required!</div>
                    </div>
                </transition> -->
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import {IMaskDirective} from 'vue-imask'
import MapComponent from '@/components/blocks/BlockMaps/BlockMaps.vue'

import GlobalNot from '@/services/Notification'


interface Data {
    min: number,
    max: number,
    step: number,
    minValue: number,
    maxValue: number,
    showLoader: boolean
    errorMessage: boolean
    thankYouMessage: boolean
    status: string
    active: number
    value
    fitStatus: boolean
    fit: string
    errorMsg: string
    address: string
    formatter2
    minLimitFormatted: string,
    maxLimitFormatted: string,
    counter: number
    inputs
    cityAddress: string
    areaWithin: string
    fitPerfect: boolean
    fitClose: boolean
    multifamilyMin: string
    multifamilyMax: string
    multiFamilyError: boolean
    multiFamilyErrorEqual: boolean
    multifamilyIsSelected: boolean
    bifurcatedIsSelected: boolean

    activeCF: number
    retailCF: boolean
    officeCF: boolean
    warehouseCF: boolean
    multifamilyCF: boolean
    mixed_useCF: boolean
    valueCF
    errorMsgCF: string
    addressCF: string
    minLimitFormattedCF: string
    maxLimitFormattedCF: string
    counterCF: number
    inputsCF
    cityAddressCF: string
    areaWithinCF: string

    assetsType
    otherAssetsType
    otherAssetsValidation: boolean

    mask: Mask,

    enableCross: false,
    tooltipMerge: false,
    formatter,
    railStyle,
    tooltipStyle,
    processStyle,
    dotSize: number,
    height: number,
    DotOption

    token: string
    recaptcha: string

}

interface Mask {
    mask: string
    blocks
}

export default Vue.extend({
    components: {
        VueSlider,
        MapComponent,
    },

    directives: {
        imask: IMaskDirective,
    },

    data(): Data {
        return {
            min: 100000,
            max: 100000000,
            step: 50000,
            minValue: 100000,
            maxValue: 100000000,
            showLoader: false,
            errorMessage: false,
            thankYouMessage: false,
            status: '',
            active: 1,
            value: [5000, 1000000],
            fitStatus: false,
            fit: 'perfect',
            errorMsg: '',
            address: '',
            minLimitFormatted: '',
            maxLimitFormatted: '',
            formatter2: v => `$${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            counter: 0,
            cityAddress: '',
            areaWithin: '',
            inputs: [{
                id: 'map',
                idSecond: 'mapSecond',
                placeholder: 'Search by state, city, zip or neighbourhood',
                value: '',
            }],
            fitPerfect: true,
            fitClose: false,
            multifamilyMin: '',
            multifamilyMax: '',
            multiFamilyError: false,
            multiFamilyErrorEqual: false,
            multifamilyIsSelected: false,
            bifurcatedIsSelected: false,

            activeCF: 1,
            retailCF: false,
            officeCF: false,
            warehouseCF: false,
            multifamilyCF: false,
            mixed_useCF: false,
            valueCF: [5000, 1000000],
            errorMsgCF: '',
            addressCF: '',
            minLimitFormattedCF: '',
            maxLimitFormattedCF: '',
            counterCF: 0,
            cityAddressCF: '',
            areaWithinCF: '',
            inputsCF: [{
                id: 'mapCF',
                idSecond: 'mapSecondCF',
                placeholder: 'Search by state, city, zip or neighbourhood',
                value: '',
            }],
            assetsType: [],
            otherAssetsType: [],
            otherAssetsValidation: false,
            mask: {
                mask: '$num',
                blocks: {
                    num: {
                        mask: Number,
                        thousandsSeparator: ',',
                    },
                },
            },
            enableCross: false,
            tooltipMerge: false,
            formatter: value => `$ ${value}`,
            railStyle: {
                backgroundColor: '#ffffff',
                boxShadow: 'none',
                height: '16px',
            },
            tooltipStyle: {
                backgroundColor: '#0c8e8b',
                borderColor: '#0c8e8b',
            },
            processStyle: {
                backgroundColor: '#0c8e8b',
            },
            dotSize: 28,
            height: 16,
            DotOption: {
                tooltipStyle: {
                    backgroundColor: '#fbf8f3',
                    color: '#353539',
                    fontSize: '16px',
                },
            },

            token: '',
            recaptcha: '',
        }
    },
    async created() {
        this.renderSlider = false
        //await this.$store.dispatch('fetchLoanSizeSettings');
        await this.setLoanSize()

        this.enableCross = false
        this.tooltipMerge = false
        this.formatter = value => `$ ${value}`
        this.railStyle = {
            backgroundColor: '#ffffff',
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
                backgroundColor: '#fbf8f3',
                color: '#353539',
                fontSize: '16px',
            },
        }
    },

    methods: {

        /**
         * @author Nikola Popov
         * @description
         *  send registration form
         */

        async processForm() {
            if(!this.showLoader) {
                const valid = this.validation()
                if (valid && !this.otherAssetsValidation) {
                    this.showLoader = true
                    await this.$recaptchaLoaded()
                    const token = await this.$recaptcha('lenderSignUp')
                    this.recaptcha = token
                    const obj = this.createObjectForSend()

                    this.$store.dispatch('lenderSignUp', obj)
                    .then(response => {
                        this.showLoader = false

                        if(!response?.data?.data?.createFit?.success) {
                            new GlobalNot(response?.data?.data?.createFit?.message, 'error')
                            return false
                        }

                        if (response?.data?.errors) {

                            if (response?.data?.errors?.[0]?.debugMessage === 'Wrong token.') {
                                new GlobalNot('Session has expired, please log in to finish!', 'error')
                                localStorage.removeItem('tempToken')
                                this.$store.commit('SET_TEMP_TOKEN', '')

                                setTimeout(() => {
                                    this.$router.push('/login')
                                }, 4000)
                            }

                            return
                        }

                        localStorage.removeItem('tempToken')
                        this.$store.commit('SET_TEMP_TOKEN', '')
                        this.thankYouStatus()
                    })
                    .catch(() => {
                        this.showLoader = false
                        this.errorMessage = true
                        setTimeout(() => {
                            this.errorMessage = false
                        }, 4000)
                        return
                    })
                }
            }
        },

        validation() {
            let ast = false
            let ranger = false
            let location = false
            let multiValidation = false

            if(!this.assetsType.length) {
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

            if(this.value[1] === 200000000 && this.value[0] === 0) {
                new GlobalNot('Dollar Amount is required!', 'error')
                ranger = false
            } else {
                ranger = true
            }

            const isLocation = this.$refs.maps.getlocationsValidation2()

            if (isLocation) {
                new GlobalNot('Location fields are required!', 'error')
                location = false
            } else {
                location = true
            }
            if (ast && ranger && location && multiValidation) {
                return true
            }
            return false
        },

        /**
         * @author Nikola Popov
         * @description
         *  create object and prepare for send
         */

        createObjectForSend() {
            return {
                type: 'PERFECT',
                areas: this.setLocationForSend(),
                loan_size: {
                    min: this.value[0],
                    max: this.value[1],
                },
                asset_types: this.assetsType,
                other_asset_types: this.otherAssetsType,
                multifamily: {
                    min_amount: parseInt(this.multifamilyMin),
                    max_amount: parseInt(this.multifamilyMax),
                },
                recaptcha : this.recaptcha,
            }
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

        goBack() {
            this.$emit('onGoBackToLanderForm')
        },
        thankYouStatus() {
            this.$emit('onBrokerSuccess')
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
            this.setStep(value[index])

            this.clearErrors()
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

        /**
         * This sets the initial values from the config and from the user
         */
        setLoanSize() {
            //const loanSizeSettings = this.$store.getters.getLoanSizeSettings;

            const userMin = 0 // TODO switch to dynamic from LS on refresh
            const userMax = 0 // TODO switch to dynamic from LS on refresh

            this.min = 0
            this.max = 200000000
            //this.step = loanSizeSettings.step;

            this.value = [
                parseInt(userMin || this.min),
                parseInt(userMax || this.max),
            ]

            this.minValue = this.value[0]
            this.maxValue = this.value[1]

            this.minLimitFormatted = `$${this.min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
            this.maxLimitFormatted = `$${this.max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

            this.renderSlider = true
        },
        setStep(value) {
            let newValue = value
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
        addInputCF() {
            this.inputsCF.push({
                id: `mapFirstCF${++this.counter}`,
                idSecond: `mapSecondCF${++this.counter}`,
                value: '',
            })
        },
        goToNextStep() {
            this.fitPerfect = false

            setTimeout(() => {
                this.fitClose = true
            }, 300)
        },
        goToPrevStep() {
            this.fitPerfect = true

            setTimeout(() => {
                this.fitClose = false
            }, 300)
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
    },
})
</script>

<style lang="scss" scoped>

.preferences-wrapper {
    width: calc(100% - 60px);
    max-width: 1290px;
    background-color: $white;
    border-top: 6px solid $yellow-orange;
    padding: 97px 35px;

    @include mq($lap-xxl) {
        padding: 70px 35px;
    }

    @include mq($lg) {
        padding: 50px 30px;
    }

    @include mq($md) {
        width: 100%;
        padding: 40px 10px;
    }
}

.preferences__inner {
    width: 100%;
    max-width: 1070px;
    margin: 0 auto;

}

.preferences__top {
    text-align: center;
    margin-bottom: 52px;

    @include mq($lap-l) {
        margin-bottom: 50px;
    }

    @include mq($lg) {
        margin-bottom: 35px;
    }
}

.preferences__pretitle {
    font-family: $font-second;
    font-size: 14px;
    line-height: 1.35;
    color: $mosque;
    display: block;
    letter-spacing: 0.14px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 15px;
}

.preferences__title {
    margin-bottom: 25px;
    display: block;

    @include mq($lg) {
        margin-bottom: 15px;
    }
}

.txt-with-link {
    margin-bottom: 27px;
}

.preferences-wrapper__desc {
    font-style: italic;
    text-align: center;
    max-width: 640px;
    margin: 0 auto;
}

.preferences__submit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;

    &.align--right {
        justify-content: flex-end;
    }

    @include mq($md) {
        padding-top: 10px;

        &.align--right {
            justify-content: center;
        }
    }
}

.preferences__fieldset {
    background-color: $fantasy;
    padding: 60px 80px 90px;
    margin-bottom: 50px;

    @include mq($lap-l) {
        padding: 50px 60px 90px;
        margin-bottom: 35px;
    }

    @include mq($lg) {
        padding: 50px 40px 90px;
    }

    @include mq($md) {
        padding: 50px 15px 90px;
    }
}

.preferences__fieldset-top {
    margin-bottom: 40px;

    @include mq($lg) {
        margin-bottom: 30px;
    }
}

.preferences__fieldset--title {
    text-align: center;
    margin-bottom: 15px;
    letter-spacing: 0.085px;
}

.preferences__fieldset-desc {
    text-align: center;
    font-size: 17px;
}

.preferences__fieldset--subtitle {
    text-align: center;
    font-weight: 600;
}

.preferences__split {
    width: 100%;
    max-width: 874px;
    margin: 0 auto;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    margin-bottom: 50px;
    overflow: hidden;
}

.preferences__split-box--first {
    justify-content: flex-start;

    .preferences__split-box-num {
        &::before {
            content: '';
            position: absolute;
            top: 50%;
            right: 0;
            height: 2px;
            width: 100vw;
            background-color: $yellow-orange;
            transform: translate(100%, -50%);
        }
    }
}

.preferences__split-box--last {
    justify-content: flex-end;

    .preferences__split-box-num {

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            height: 2px;
            width: 50vw;
            background-color: $white;
            transform: translateY(-50%);
        }
    }
}

.preferences__split-box {
    width: 50%;
    display: flex;
}

.preferences__split-box-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.preferences__split-box-title,
.preferences__split-box-text {
    font-family: $font-second;
    color: $santas-gray;
    line-height: 1.3;
    transition: 0.2s ease-in-out;
    display: block;
    text-align: center;

    .active & {
        color: $yellow-orange;
    }
}

.preferences__split-box-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
}

.preferences__split-box-text {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.07px;
}

.preferences__split-box-num {
    width: 26px;
    height: 26px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: 0.2s ease-in-out;

    &::after {
        content: '';
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        border: 1px solid $santas-gray;
        transition: 0.2s ease-in-out;
        border-radius: 50px;
    }

    .active & {
        &::after {
            border: 1px solid $yellow-orange;
            background-color: $yellow-orange;
        }
    }
}

.preferences__split-box-num-inner {
    font-family: $font-second;
    color: $santas-gray;
    font-size: 16px;
    line-height: 1;
    position: relative;
    z-index: 2;
    transition: 0.2s ease-in-out;
    margin-left: -1px;

    .active & {
        color: $white;
    }
}

.preferences__split-box-content {
    margin-bottom: 11px;
}

.preferences__fieldset-values-holder {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    padding-top: 32px;
}

.preferences__fieldset-value {
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
        font-size: 14px;
        margin: 0 4px;
    }
}

.preferences__fieldset-values-holder {
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
    width: 100%;

    @include mq(330px) {
        transform: translate(-19%, 100%);
    }
}

.preferences__fieldset--amount {
    .preferences__fieldset-top {
        margin-bottom: 75px;

        @include mq($md) {
            margin-bottom: 50px;
        }
    }
}

.preferences__fieldset-half-box-top {
    margin-bottom: 10px;

    @include mq($md + 1, min) {
        min-height: 44px;
    }

    @include mq($md) {
        text-align: center;
    }
}

.preferences__fieldset-half-box-text--italic {
    font-weight: 400;
    font-style: italic;
}

.preferences__chk-box-holder {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;

    @include mq(575px) {
        justify-content: space-between;
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
        right: 15px;
    }
}

.chk-box__image-wrapper {
    max-height: 88px;
    height:100%;
    margin: 0 auto 20px;
}

.preferences__chk-box-sub-wrapper {
    position: absolute;
    bottom: -70px;
    opacity: 0;
    pointer-events: none;
}

.preferences__chk-box-sub-wrapper--visible {
    opacity: 1;
    pointer-events: visible;
    width: 190px;

    .chk-box-text {
        max-width: 150px;
        width: 100%;
    }
}

.error-notice--sub {
    font-size: 12px;
    width: 115%;
    bottom: 12px;
    text-align: left;
}
</style>
