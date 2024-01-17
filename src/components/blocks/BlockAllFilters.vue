<template>
  <div
    id="all-filters"
    class="all-filters"
  >
    <div class="all-filters__wrap">
      <div class="all-filters__container">
        <div
          v-if="pro === 'deal'"
          class="all-filters__left"
        >
          <div class="all-filters__box">
            <PartCheckList :from="'propertyType'" />
          </div>
          <!-- <div class="all-filters__box">
                        <perfect-scrollbar class="all-filters-ps">
                            <PartCheckList :checkList="checkList_status" :from="'status'"/>
                        </perfect-scrollbar>
                    </div> -->
          <div class="all-filters__box all-filters__box--amount">
            <div class="all-filters__fieldset fieldset--amount">
              <div class="all-filters__fieldset-top">
                <h3 class="title-small all-filters__fieldset-title">Loan Size</h3>
                <p class="txt-with-link all-filters__fieldset-subtitle">Adjust your range below.</p>
              </div>
              <VueSlider
                v-if="renderSlider"
                ref="slider"
                v-model="value"
                :min="min"
                :max="max"
                :formatter="formatter"
                :interval="step"
                :min-range="1"
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
                @change="sliderChange"
              />
              <div class="vue-range-values">
                <span class="vue-range-value">{{ minLimitFormatted }}</span>
                <span class="vue-range-value">{{ maxLimitFormatted }}</span>
              </div>
              <div class="all-filters__fieldset-values-holder input-rounded-holder">
                <input
                  v-model="minValue"
                  v-imask="mask"
                  class="all-filters__fieldset-value input--rounded"
                  @keyup="selectInput($event)"
                  @focus="selectInput($event)"
                  @complete="loanSizeInput($event, 0)"
                  @blur="fixLoanSizeErrors"
                >
                <input
                  v-model="maxValue"
                  v-imask="mask"
                  class="all-filters__fieldset-value input--rounded"
                  @keyup="selectInput($event)"
                  @focus="selectInput($event)"
                  @complete="loanSizeInput($event, 1)"
                  @blur="fixLoanSizeErrors"
                >
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="pro === 'quote'"
          class="all-filters__mid"
        >
          <div class="all-filters__box all-filters__box--height-mod">
            <div class="all-filters__fieldset fieldset--search">
              <div class="all-filters__fieldset-top">
                <h3 class="title-small all-filters__fieldset-title">Sponsor names</h3>
              </div>
              <PartSearchArea
                @emitClearMap="emitClearMap"
                @setTable="setTable"
                @toggle="toggle"
              />
            </div>
          </div>
        </div>
        <!-- <div class="all-filters__right">
                    <div class="all-filters__box">
                        <div class="all-filters__fieldset fieldset--date">
                            <div class="all-filters__fieldset-top">
                                <h3 class="title-small all-filters__fieldset-title">Date Posted</h3>
                                <p class="txt-with-link all-filters__fieldset-subtitle">Select the date range</p>
                            </div>
                            <div class="all-filters__fieldset-mid">
                                <PartInputDate />
                                <PartInputDate />
                            </div>
                            <div class="all-filters__fieldset-bottom">
                                <PartRadioBtns :radioBtns="radioBtns"/>
                            </div>
                        </div>
                    </div>
                </div> -->
      </div>
      <!-- TODO: Commented for MVP, this go on Post-MVP -->
      <!-- <div class="all-filters__btn-top-wrap">
                <a class="btn btn--small all-filters__btn" href="javascript:;">
                    <SvgIcon class="all-filters__btn-icon" iconName="ico-save-regular"/>
                    Save Filters
                </a>
            </div> -->
      <div class="all-filters__btn-bottom-wrap">
        <a
          class="btn all-filters__btn"
          href="javascript:;"
          @click="searchBy(), onFilterUpdate()"
        >Apply</a>
        <a
          class="btn btn--alt all-filters__btn"
          href="javascript:;"
          @click="$emit('toggleFilters')"
        >Cancel</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'
    import {IMaskDirective} from 'vue-imask'
    import PartCheckList from '@/components/parts/PartCheckList.vue'
    import { mapState } from 'vuex'
    import PartSearchArea from '@/components/parts/PartSearchArea.vue'

    interface Data {
        minLimitFormatted: string
        maxLimitFormatted: string
        minValue: string,
        maxValue: string,
        value
        formatter2
        mask: Mask
        step: number
        checkList_status
        radioBtns
    }

    interface Mask {
        mask: string
        blocks
    }

    export default Vue.extend({
        directives: {
            imask: IMaskDirective,
        },

        components: {
            VueSlider,
            PartCheckList,
            PartSearchArea,
        },

        props: {
            tab: {
                type: String,
                default: 'broker',
            },
            pro: {
                type: String,
                default: 'deal',
            },
        },

        data(): Data {
            return {
                value: [],
                minLimitFormatted: '',
                maxLimitFormatted: '',
                minValue: '',
                maxValue: '',
                formatter2: v => `$${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
                mask: {
                    mask: '$num',
                    blocks: {
                        num: {
                            mask: Number,
                            thousandsSeparator: ',',
                        },
                    },
                },
                step: 1000000,
                checkList_status: {
                    title: 'Status',
                    list: ['Term Sheet', 'Commited', 'Closed', 'In Negotiation'],
                },
                radioBtns: ['Today', 'Last Week', 'Yesterday', 'Last Month'],
            }
        },

        computed: {
            ...mapState({
                propertyType: state => state['FilterDeal'].propertyType,
                loanSize: state => state['FilterDeal'].loanSize,
                search: state => state['FilterDeal'].search,
                context: state => state['FilterDeal'].context,
                filterName: state => state['FilterDeal'].filterName,
                sort: state => state['FilterDeal'].sort,
                by: state => state['FilterDeal'].by,
                loanSizeMinMax: state => state['FilterDeal'].loanSizeMinMax,

                searchQuote: state => state['FilterQuotes'].search,
                sortQuote: state => state['FilterQuotes'].sort,
                byQuote: state => state['FilterQuotes'].by,
                checkedSponsorNames: state => state['FilterQuotes'].checkedSponsorNames,
			}),
        },
        watch: {
            loanSize() {
                this.setLoanSize()
            },
        },

        async created() {
            this.renderSlider = false
            this.setLoanSize()
            
            this.enableCross = false
            this.tooltipMerge = false
            this.formatter = value => `$ ${value}`
            this.railStyle = {
                backgroundColor: '#f5f5f7',
                boxShadow: 'none',
                height: '16px',
            }
            this.tooltipStyle = {
                backgroundColor: '#f9ad42',
                borderColor: '#f9ad42',
            }
            this.processStyle = {
                backgroundColor: '#f9ad42',
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
            selectInput(e) {
                if(e.target.value === '$0') {
                    //if(e.key === 'Backspace')
                    e.target.select()
                }
            },

            async searchBy() {

                this.$emit('setTableLoader', true)

                if(this.loanSize[0] === 0 && this.loanSize[1] === 200000000) {
                    this.$store.commit('SET_LOAN_SIZE_APPLY', false)
                } else {
                    this.$store.commit('SET_LOAN_SIZE_APPLY', true)
                }

                if(this.pro === 'deal') {
                    const obj = {
                        context: this.context,
                        filterName: this.filterName,
                        searchTerms: this.search,
                        loanSize: {
                            min: this.loanSize[0],
                            max: this.loanSize[1],
                        },
                        assetTypes: this.propertyType,
                        sort: this.sort,
                        by: this.by,
                    }
                    this.$emit('toggleFilters')
                    if(this.tab === 'broker') {
                        await this.$store.dispatch('getDealsBrokerFilter', { pagination: { page: 1 }, obj: obj })
                    } else {
                        await this.$store.dispatch('getDealsLenderFilter', { pagination: { page: 1 }, obj: obj })
                    }
                } else {
                    const obj = {
                        searchLocation: this.searchQuote,
                        sort: this.sortQuote,
                        by: this.byQuote,
                        sponsorNames: this.checkedSponsorNames,
                        sponsorName: '',
                    }
                    this.$emit('toggleFilters')
                    await this.$store.dispatch('getQuotesBrokerFilter', { pagination: {page: 1}, obj: obj})
                }
                this.$emit('clearMap')
                this.$emit('setTableLoader', false)
            },

            // When filters are applied update scroll bar
            onFilterUpdate() {
                if(this.$refs.scroll && this.$refs.scroll.$el) {
                    this.$refs.scroll.$el.scrollTop = 0
                }
            },

            setTable(flag) {
                this.$emit('setTableLoader', flag)
            },

            emitClearMap() {
                this.$emit('clearMap')
            },

            toggle() {
                this.$emit('toggleFilters')
            },

            /**
            * Listens to changes on Slider and shares the value with the inputs
            */
            sliderChange(value) {
                this.minValue = value[0].toString()
                this.maxValue = value[1].toString()
                this.$store.commit('SET_FILTER_LOAN_SIZE', this.value)
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
                    const arr = [this.value[0], this.value[1]]
                    this.value = arr
                    this.$refs.slider.setValue(arr)
                }

                this.$store.commit('SET_FILTER_LOAN_SIZE', this.value)
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
            // const loanSizeSettings = this.$store.getters.getLoanSizeSettings;

                this.min = 0
                this.max = 200000000

                this.value = [
                    parseInt(this.loanSize[0] || this.min),
                    parseInt(this.loanSize[1] || this.max),
                ]

                this.minValue = this.value[0]
                this.maxValue = this.value[1]

                this.minLimitFormatted = `$${this.min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                this.maxLimitFormatted = `$${this.max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

                this.renderSlider = true
            },
        },
    })
</script>

<style lang="scss" scoped>
    .all-filters__wrap {
        padding: 0 28px 20px 28px;
    }

    .all-filters__container {
        display: flex;
        justify-content: space-between;

        @include mq($lg) {
            flex-wrap: wrap;
        }
    }

    .all-filters__left {
        // width: 33%;
        width: 49%;

        @include with-count(1) {
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            .all-filters__box {
                width: 49%;
            }

            @include mq(1199px) {
                flex-direction: column;

                .all-filters__box {
                    width: 100%;
                }
            }
        }
        
        @include mq($lg) {
            width: 49%
        }

        @include mq($md) {
            width: 100%;
        }

        // @include mq($sm) {
        //     width: 100%;
        // }

        .all-filters__box--amount {
            @include mq($lg) {
                height: 280px;
            }

            @include mq($sm) {
                min-height: 200px;
                height: auto;
            }
        }
    }

    .all-filters__mid {
        // width: 33%;
        width: 49%;
        
        @include mq($lg) {
            width: 49%
        }

        @include mq($md) {
            width: 100%;
        }

        // @include mq($sm) {
        //     width: 100%;
        // }
    }

    .all-filters__right {
        // width: 33%;
        display: none;
        
        @include mq($lg) {
            width: 100%
        }

        .all-filters__box--amount {
            @include mq($lg) {
                height: 280px;
            }

            @include mq($sm) {
                min-height: 200px;
                height: auto;
            }
        }
    }

    .all-filters__box {
        // max-width: 553px;
        max-width: 100%;
        width: 100%;
        height: 333px;
        padding: 17px 19px;
        border: 2px solid $azure;
        margin-bottom: 30px;

        @include mq($lg) {
            max-width: 100%;
            height: 260px;
            margin-bottom: 15px;
        }

        @include mq($sm) {
            min-height: 200px;
            height: auto;
        }
    }

    .all-filters__box--big {
        height: 696px;
        padding: 17px 24px 17px 24px;
        // max-width: 558px;
        max-width: 100%;

        @include mq($lg) {
            // height: 535px;
            height: 554px;
        }

        @include mq($sm) {
            height: auto;
        }
    }

    // Style for search box
    .all-filters__fieldset.fieldset--search {
        // max-width: 439px;
        max-width: 100%;
        width: 100%;

        .all-filters__fieldset-title {
            margin-bottom: 24px;

            @include mq($sm) {
                margin-bottom: 15px;
            }
        }

        .all-filters__fieldset-top {
            margin-bottom: 10px;
        }
    }

    // Style for date box
    .all-filters__fieldset.fieldset--date {
        .all-filters__fieldset-top {
            margin-bottom: 26px;

            @include mq($lap-l) {
                margin-bottom: 10px;
            }
        }

        .all-filters__fieldset-mid {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-bottom: 18px;

            @include mq($lap-l) {
                margin-bottom: 5px;
                flex-direction: column;
            }

            @include mq($lg) {
                flex-direction: row;
            }

            @include mq($sm) {
                flex-direction: column;
            }
        }
    }

    // Style for loan size
    .all-filters__fieldset {
        .vue-slider {
            padding: 14px !important;
        }
    }

    .all-filters__fieldset-top {
        margin-bottom: 52px;

        @include mq(1577px) {
            margin-bottom: 27px;
        }
    }

    .all-filters__fieldset-title {
        letter-spacing: -.6px;
        margin-bottom: 29px;

        @include mq($sm) {
            margin-bottom: 15px;
        }
    }

    .all-filters__fieldset-subtitle {
        font-weight: 600;

        @include mq($sm) {
            text-align: left;
        }
    }

    .all-filters__fieldset-values-holder {
        display: flex;
        margin-top: 52px;
        justify-content: space-between;

        @include mq($lg) {
            // margin-top: 30px;
            margin-top: 20px;
        }

        @include mq($md) {
            margin-top: 30px;
        }

        @include mq($sm) {
            flex-direction: column;
        }
    }

    .all-filters__fieldset-value {
        text-align: center;
        max-width: 47%;

        @include mq($lap-l) {
            padding: 9px 5px;
        }

        @include mq($sm) {
            max-width: 100%;
            margin-bottom: 10px;
        }

        &:last-of-type {
            margin-left: auto;

            @include mq($sm) {
                margin-bottom: 0;
            }
        }
    }

    .all-filters__btn-top-wrap {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 50px;
        padding-right: 23px;

        @include mq($lg) {
            margin-bottom: 30px;
        }

        @include mq($md) {
            margin-bottom: 20px;
        }

        @include mq($sm) {
            justify-content: center;
            padding-right: 0;
            margin-bottom: 0;
        }

        .all-filters__btn {
            font-size: 12px;
            padding: 10px 15px;

            @include mq($sm) {
                width: 100%;
            }
        }

        .all-filters__btn-icon {
            margin-right: 5px;
        }
    }

    .all-filters__btn-bottom-wrap {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 22px;

        @include mq($sm) {
            justify-content: center;
            padding-right: 0;
            flex-wrap: wrap;
            flex-direction: column;
        }

        .all-filters__btn {
            margin-left: 30px;

            @include mq($sm) {
                margin-top: 10px;
                margin-left: 0;
                width: 100%;
            }

            &:not(.btn--alt) {
                background-color: $yellow-orange;
                border: 1px solid $yellow-orange;
                transition: $dur $ease;

                &:not(.disabled) {
                    @include hover {
                        color: $white;
                        background-color: $mosque;
                        border: 1px solid $mosque;
                    }
                }
            }

            &:first-of-type {
                margin-left: 0;
            }
        }
    }

    .all-filters-ps {
        max-height: 275px;
        padding-right: 15px;

        @include mq($lg) {
            max-height: 250px;
        }
    }

    :deep() {
        .ps__rail-y:hover > .ps__thumb-y,
        .ps__rail-y:focus > .ps__thumb-y,
        .ps__rail-y.ps--clicking .ps__thumb-y {
            width: 8px;
            background-color: $blue-chill;

            @include mq($md) {
                width: 4px;
            }
        }

        .ps .ps__rail-x:hover,
        .ps .ps__rail-y:hover,
        .ps .ps__rail-x:focus,
        .ps .ps__rail-y:focus,
        .ps .ps__rail-x.ps--clicking,
        .ps .ps__rail-y.ps--clicking {
            background-color: $athens-gray;
        }

        .ps__rail-y {
            width: 8px;
            max-height: 90%;

            @include mq($md) {
                width: 4px;
            }
        }

        .ps__thumb-y {
            background-color: $blue-chill;
            width: 8px;
            max-height: 90%;

            @include mq($md) {
                width: 4px;
            }
        }
    }

    .all-filters__box--height-mod {
        height: 473px;

        .search-area-ps {
            height: 279px;
        }
    }
</style>