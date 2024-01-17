<template>
  <div class="accordion">
    <template v-for="(table, index) in tables">
      <div
        :key="index"
        class="accordion-wrapper"
      >
        <div
          class="accordion__wrap"
          :class="{'active': flag != index}"
        >
          <div
            :class="quoteStatus ? 'accordion__wrap-shown accordion__wrap-shown--aligned' : 'accordion__wrap-shown'"
            @click="toggleClass(index)"
          >
            <h3 class="accordion__wrap-shown-title">
              <SvgIcon
                class="accordion__wrap-text-icon"
                icon-name="ico-arrow-df"
              />{{ table.title }}
            </h3>
            <template v-if="quoteStatus">
              <span
                v-if="quoteStatus === 'ACCEPTED' || quoteStatus === 'SECOND_ACCEPTED'"
                class="accordion__status"
              >
                <SvgIcon
                  class="accordion__status-icon"
                  icon-name="ico-check"
                /> {{ enumType(quoteStatus) }}
              </span>
              <span
                v-else
                class="accordion__status-black"
              >
                {{ enumType(quoteStatus) }} <span
                  v-if="enumType(quoteStatus) === 'Declined'"
                  class="tooltip-msg tooltip-msg--small"
                  data-tooltip="Broker has chosen to no longer proceed with this quote. While uncommon, this does occasionally occur"
                ><SvgIcon
                  class="tooltip-msg__icon"
                  icon-name="ico-exclamation"
                /></span>
              </span>
            </template>
          </div>
          <div
            v-if="flag !== index"
            class="accordion__wrap-hidden"
            :class="additionalNotes ? 'accordion__wrap-hidden less-height':'accordion__wrap-hidden'"
          >
            <ul class="accordion__wrap-hidden-lists">
              <template v-if="!quote">
                <template v-for="(item, index) in table.items">
                  <div
                    v-if="item.text1 !== 'ADDITIONAL NOTES' && item.text1 !== 'NOTE TO LENDER'"
                    :key="index"
                  >
                    <li
                      v-if="item.text1 === 'divider'"
                      class="accordion__wrap-divider"
                    />
                    <li
                      v-if="item.text2"
                      class="accordion__wrap-hidden-list"
                      :class="item.text3 === 'bold' ? 'bold' : ''"
                    >
                      <span
                        class="accordion__wrap-hidden-text accordion__wrap-hidden-text--thin"
                        :class="item.text1 === 'TOTAL EXPENSES' || item.text1 === 'NET OPERATING INCOME' || item.text1 === 'TOTAL BUSINESS OPERATING INCOME' ? 'accordion__wrap-hidden-text-total':''"
                        v-html="item.text1"
                      />
                      <span
                        v-if="!item.option && item.text2 != 'Mixeduse' && item.text1 !== 'TIME FRAME'"
                        class="accordion__wrap-hidden-text"
                        :class="[item.text1 === 'TOTAL EXPENSES' || item.text1 === 'NET OPERATING INCOME' || item.text1 === 'TOTAL BUSINESS OPERATING INCOME' ? 'accordion__wrap-total-amount':'', item.text2.includes('$-') ? 'negative':'']"
                        v-html="item.text1 === 'INITIAL PURCHASE DATE' || item.text1 === 'EXPIRATION DATE' || item.text1 === 'ADDITIONAL NOTES' || item.text1 === 'IMPROVEMENTS' || item.text1 === 'PHASE OUT STRUCTURE' || item.text1 === 'RETAIL TYPE' || item.text1 === 'DETAILS REGARDING INCREASED OCCUPANCY' || item.text1 === 'DETAILS REGARDING BETTER LEASES' || item.text1 === 'DETAILS REGARDING PLANNED IMPROVEMENTS' || item.text1 === 'PROPOSED USE' || item.text1 === 'NOTE TO LENDER' || item.text1 === 'WHAT DOES BUSINESS DO/SELL' ? item.text2 : item.text2.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                      />
                      <!-- Time frame condition to show months/month -->
                      <span
                        v-else-if="item.text1 === 'TIME FRAME'"
                        class="accordion__wrap-hidden-text"
                      >{{ item.text2 }} <span v-if="item.text2 !== '1'">months</span><span v-else>month</span> </span>
                      <span
                        v-else
                        class="accordion__wrap-hidden-text"
                      >Mixed use</span>
                    </li>
                    <li
                      v-else-if="item.text2 === '' && item.text4 === 'show'"
                      class="accordion__wrap-hidden-list"
                      :class="item.text3 === 'bold' ? 'bold accordion__wrap-hidden-list--main-title' : ''"
                    >
                      <span class="accordion__wrap-hidden-text">{{ item.text1 }}</span>
                    </li>
                  </div>

                  <div
                    v-else
                    :key="index"
                  >
                    <span class="accordion__wrap-hidden-text no-padding">{{ item.text2 }}</span>
                  </div>
                </template>
              </template>
              <template v-else>
                <template v-for="(value, name, index) in quote">
                  <template v-if="name === 'Custom Pre-payment penalty'">
                    <li
                      v-for="(year, ind) in value"
                      :key="ind"
                      class="accordion__wrap-hidden-list"
                    >
                      <span class="accordion__wrap-hidden-text accordion__wrap-hidden-text--thin">{{ name }} - year {{ ind + 1 }}</span>
                      <span
                        v-if="year !== 0 && year !== '' && year !== '0'"
                        class="accordion__wrap-hidden-text"
                      >{{ formatPercent(year) }} %</span>
                      <span
                        v-else
                        class="accordion__wrap-hidden-text"
                      >0 %</span>
                    </li>
                  </template>
                  <template v-else>
                    <li
                      v-if="value.length > 0"
                      :key="index"
                      class="accordion__wrap-hidden-list"
                    >
                      <span
                        class="accordion__wrap-hidden-text accordion__wrap-hidden-text--thin"
                        v-html="name"
                      />
                      <template v-for="(val, newIndex) in value">
                        <span
                          :key="newIndex"
                          class="accordion__wrap-hidden-text"
                          v-html="val"
                        />
                      </template>
                    </li>
                  </template>
                </template>
              </template>
            </ul>
          </div>
          <!-- TODO for post-mvp -->
          <!-- <a class="accordion__wrap-shown-link" href="javascript:;">Edit</a> -->
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'

    interface Data {
        title: string
        // tables
        flag: number
    }

    export default Vue.extend({
        components: {
            SvgIcon,
        },
        props: {
            tables: {
                type: Array,
                default() {
                    return []
                },
            },
            quote: {
                type: Object,
            },
            quoteStatus: {
                type: String,
            },
            additionalNotes: {
                type: Boolean,
            },
        },

        data(): Data {
            return {
                title: 'This is title of "Blockaccordion"!',
                flag: null,
            }
        },

        methods: {
            formatPercent(num) {
                const zero = num.toString().slice(-1)
                const zeros = num.toString().slice(-2)
                if(num === '000.00')
                    return '0'

                if(num === '00.00')
                    return '0'

                if(zeros === '00') {
                    return num.toString().slice(0, -3)
                } else if(zeros === '.0') {
                    return num.toString().slice(0, -2)
                }
                if(zero === '0' || zero === '.') {
                    return num.toString().slice(0, -1)
                }
                return num
            },
            enumType(str) {
                if(str === 'SECOND_ACCEPTED') {
                    return 'Accepted'
                } else if(str === 'OPENED') {
                    return 'Open'
                }

                
                
                str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
                return str.split('_').join(' ')
            },
            toggleClass(index){
                if(this.flag === index){
                    this.flag = null
                    return false
                }
                this.flag = index
            },
        },
    })
</script>

<style lang="scss" scoped>

    .accordion {
        margin-top: 30px;

        @include mq($xl) {
            margin-top: 15px;
        }
    }

    .accordion-wrapper {
        margin-top: 30px;

        &:nth-child(-n+2) {
            margin-top: 0;
        }

        @include mq($xl) {
            margin-top: 20px;

            &:nth-child(-n+2) {
                margin-top: 20px;
            }
        }
    }

    .accordion__wrap {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        min-height: 62px;
        border: 2px solid $athens-gray;
        background-color: $white;
        transition: $dur $ease;
        cursor: pointer;

        &.active {

            .accordion__wrap-text-icon {
                transform: rotate(180deg);
                top: 4px;
            }

            .accordion__wrap-shown-link {
                opacity: 1;
                visibility: visible;
                pointer-events: all;
            }
        }
    }

    .accordion__wrap-shown {
        width: 100%;
        padding: 21px 30px 18px 30px;

        @include mq($sm) {
            padding: 20px 15px 20px;
        }
    }

    .accordion__wrap-shown--aligned {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .accordion__wrap-shown-title {
        position: relative;
        color: $shark;
        font-family: $font-main;
        font-weight: 600;
        line-height: 1.2;
        font-size: 16px;
        padding-left: 20px;

        @include mq($sm) {
            font-size: 14px;
        }
    }

    .accordion__wrap-text-icon {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        font-size: 11px;
        height: 11px;
        transition: $dur $ease;
    }

    .accordion__wrap-shown-link {
        position: absolute;
        top: 10px;
        right: 20px;
        padding: 10px;
        font-size: 14px;
        font-family: $font-main;
        color: $mosque;
        font-weight: 700;
        transition: $dur $ease;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;

        &:hover {
            color: $yellow-orange;
        }
    }

    .accordion__wrap-hidden {
        background-color: $white;
        width: 100%;
        min-height: 278px;
        transition: $dur $ease;

        &.less-height {
            min-height: 125px;
        }

        @include mq($xl) {
            min-height: 100%;
        }
    }
    

    .accordion__wrap-hidden-lists {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 0 30px 12px;
        background-color: $white;

        @include mq($sm) {
            padding: 0 15px 12px;
        }
    }

    .accordion__wrap-hidden-list {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            height: 4px;
            width: 100%;
            background: radial-gradient(ellipse at center, #9da0ae 0%, #9da0ae 20%, transparent 30%);
            background-repeat: repeat-x;
            background-size: 1%;
        }

        &::before {
            content: '';
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            height: 1px;
            width: 100%;
            background-color: $mosque;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            z-index: 10;
        }

        &:last-child {

            &::before {
                display: none;
            }
        }

        @include mq($sm) {
            // flex-direction: column;
            align-items: flex-start;
            padding: 4px 0;

            &::after {
                display: none;
            }

            &::before {
                opacity: 50%;
                visibility: visible;
                pointer-events: all;
            }
        }

        &.bold span {
            color: $black;
            font-weight: bold;

        }
        
        &.bold span:nth-child(2) {
            color: $blue-chill;
        }
    }

    .accordion__wrap-hidden-text {
        position: relative;
        font-size: 14px;
        font-family: $font-main;
        color: $shark;
        font-weight: 600;
        line-height: 29px;
        background-color: $white;
        padding-left: 11px;
        z-index: 2;
        background-color: $white;
        transition: $dur $ease;
        text-align: right;

        max-width: 70%;

        @include mq($sm) {
            padding-left: 0;
            text-align: left;
            font-size: 12px;
            line-height: 19px;
            max-width: 67%;

            & + & {
                text-align: right;
            }
        }

        &.no-padding {
            padding: 0;
        }

        // &:nth-child(2) {
        //     white-space: nowrap;
        // }
    }

    .accordion__wrap-hidden-text--thin {
        font-weight: 400;
        padding-left: 0;
        padding-right: 11px;
        text-align: left;
    }

    .accordion__status {
        font-size: 14px;
        color: $blue-chill;
        display: inline-flex;
        font-weight: 600;
        font-style: italic;
    }

    .accordion__status-black {
        font-size: 14px;
        color: $black;
        display: inline-flex;
        font-weight: 600;
        font-style: italic;
    }

    .accordion__status-icon {
        margin-right: 8px;

        @include mq($sm) {
            margin-right: 5px;
        }
    }

    .tooltip-msg {
        margin: 0 0 0 10px;
    }

    .accordion__wrap-hidden-text-total {
        font-weight: bold;
    }

    .accordion__wrap-total-amount {
        font-weight: bold;
        color: $blue-chill;
    }

    .negative {
        color: $red !important;
    }

    .accordion__wrap-hidden-list--main-title {
        .accordion__wrap-hidden-text {
            padding-left: 0;
        }

        &::after {
            display: none;
        }
    }
</style>
