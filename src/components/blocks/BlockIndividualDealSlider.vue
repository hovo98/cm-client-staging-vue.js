<template>
  <div class="individualDealSlider">
    <div class="row">
      <div class="col-xl-12">
        <div class="individualDealSlider__wrap active">
          <div
            class="individualDealSlider__wrap-shown"
            @click="toggleClass"
          >
            <h3 class="individualDealSlider__wrap-shown-title">
              <SvgIcon
                class="individualDealSlider__wrap-text-icon"
                icon-name="ico-arrow-df"
              />Deal Priorities <span
                class="tooltip-msg tooltip-msg--small"
                data-tooltip="Here's what the borrower values most (besides your smile.)"
              ><SvgIcon
                class="tooltip-msg__icon"
                icon-name="ico-question"
              /></span>
            </h3>
          </div>
          <div class="individualDealSlider__wrap-hidden">
            <div class="row">
              <div class="col-xl-6">
                <div class="individualDealSlider__wrap-hidden-box">
                  <template v-for="(slider, index) in sliders">
                    <div
                      :key="index"
                      class="accordion__wrap-hidden-list"
                    >
                      <span class="accordion__wrap-hidden-text accordion__wrap-hidden-text--thin">{{ slider.aspectName }}</span>
                      <span
                        class="accordion__wrap-hidden-text accordion__wrap-hidden-text__gray"
                        :class="{'input-select__text-green': slider.value == 'Flexible', 'input-select__text-red': slider.value == 'Dealbreaker'}"
                      >{{ slider.value }}</span>
                    </div>
                  </template>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="individualDealSlider__wrap-hidden-box">
                  <template v-for="(slider, index) in sliders2">
                    <div
                      :key="index"
                      class="accordion__wrap-hidden-list"
                    >
                      <span class="accordion__wrap-hidden-text accordion__wrap-hidden-text--thin">{{ slider.aspectName }}</span>
                      <span
                        class="accordion__wrap-hidden-text accordion__wrap-hidden-text__gray"
                        :class="{'input-select__text-green': slider.value == 'Flexible', 'input-select__text-red': slider.value == 'Dealbreaker'}"
                      >{{ slider.value }}</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'

    interface Data {
        title: string
        sliders
        sliders2
    }

    export default Vue.extend({

        components: {
            SvgIcon,
        },

        props: {
            deal: {
                required: true,
            },
        },

        data(): Data {
            return {
                title: 'This is title of "BlockIndividualDealSlider"!',
                sliders: [],
                sliders2: [],
            }
        },

        watch: {
            deal() {
                if(this.deal) {
                    this.setSlider()
                }
            },
        },

        methods: {
            toggleClass() {
                const wrapper = document.querySelector('.individualDealSlider__wrap')
                wrapper.classList.toggle('active')
            },
            sensitivityLabel(key) {
                switch (key) {
                    case '':
                        return 'Flexible'
                    case 0:
                        return 'Flexible'
                    case 4:
                        return 'Dealbreaker'
                    case 3:
                        return 'Very important'
                    case 2:
                        return 'Important'
                    case 1:
                        return 'Somewhat Flexible'
                    default:
                        return ''
                }
            },
            setSlider() {
                this.sliders = [
                    {
                        aspectName: 'Speed',
                        value: this.sensitivityLabel(this.deal.sensitivity.timeToClose),
                    },
                    {
                        aspectName: 'No recourse',
                        value: this.sensitivityLabel(this.deal.sensitivity.recourse),
                    },
                    {
                        aspectName: 'High leverage',
                        value: this.sensitivityLabel(this.deal.sensitivity.leverage),
                    },
                    {
                        aspectName: 'Low interest rate',
                        value: this.sensitivityLabel(this.deal.sensitivity.interestRate),
                    },
                ]

                this.sliders2 = [
                    {
                        aspectName: 'Low fees',
                        value: this.sensitivityLabel(this.deal.sensitivity.fees),
                    },
                    {
                        aspectName: 'Interest only period',
                        value: this.sensitivityLabel(this.deal.sensitivity.interestOnlyPeriod),
                    },
                    {
                        aspectName: 'No prepayment penalty ',
                        value: this.sensitivityLabel(this.deal.sensitivity.nonPrepaymentPenalty),
                    },
                ]
            },
        },
    })
</script>

<style lang="scss" scoped>

    .individualDealSlider {
        padding: 0 52px 26px 42px;

        @include mq($xl) {
            padding: 0 20px 26px;
        }
    }

    .individualDealSlider__wrap {
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

            .individualDealSlider__wrap-text-icon {
                transform: rotate(180deg);
                top: 4px;
            }

            .individualDealSlider__wrap-shown-link {
                opacity: 1;
                visibility: visible;
                pointer-events: all;
            }

            .individualDealSlider__wrap-links {
                opacity: 1;
                visibility: visible;
                pointer-events: all;
            }

            .individualDealSlider__wrap-hidden {
                display: block;
                padding-bottom: 15px;
            }
        }
    }

    .individualDealSlider__wrap-shown {
        width: 100%;
        padding: 21px 30px 18px;

        @include mq($sm) {
            padding: 21px 15px 18px;
        }
    }

    .individualDealSlider__wrap-shown-title {
        position: relative;
        color: $shark;
        font-family: $font-main;
        font-weight: 600;
        line-height: 1.2;
        font-size: 16px;
        padding-left: 20px;

        @include mq($sm) {
            font-size: 15px;
        }
    }

    .individualDealSlider__wrap-text-icon {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        font-size: 11px;
        transition: $dur $ease;
    }

    .individualDealSlider__wrap-hidden {
        display: none;
        width: 100%;

        @include mq($sm) {
            padding-bottom: 30px;
        }
    }

    .individualDealSlider__wrap-hidden-box  {
        display: flex;
        flex-direction: column;
        padding: 27px 29px 43px 30px;

        @include mq(1199px) {
            padding: 0 29px 0 30px;
        }

        // @include mq($sm) {
        //     padding: 10px 15px;
        // }
    }

    .tooltip-msg {
        top: 2px;

        @include mq(446px) {
            &::before {
                left: auto;
                right: -110px;
            }
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

        // &::before {
        //     content: '';
        //     display: block;
        //     position: absolute;
        //     bottom: 0;
        //     left: 0;
        //     height: 1px;
        //     width: 100%;
        //     background-color: $mosque;
        //     opacity: 0;
        //     visibility: hidden;
        //     pointer-events: none;
        //     z-index: 10;
        // }

        // &:last-child {

        //     &::before {
        //         display: none;
        //     }
        // }

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
    }

    .accordion__wrap-hidden-text {
        position: relative;
        font-size: 14px;
        font-family: $font-main;
        color: $shark;
        font-weight: 600;
        line-height: 29px;
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

            & + & {
                text-align: right;
            }
        }
    }

    .accordion__wrap-hidden-text--thin {
        font-weight: 400;
        padding-left: 0;
        padding-right: 11px;
        text-align: left;
    }


    .accordion__wrap-hidden-text__gray {
        color: $santas-gray;
        border: 1px solid $santas-gray;
        border-radius: 4px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 5px;
        padding-left: 5px;
        background-color: white;
        font-size: 12px;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba($santas-gray, 0.2);
            z-index: -1;
        }

        &.input-select__text-red {
            color: $red;
            border: 1px solid $red;
            &::after {
                background-color: rgba($red, 0.2);
            }
        }

        &.input-select__text-green {
            color: $blue-chill;
            border: 1px solid $blue-chill;
            &::after {
                background-color: rgba($blue-chill, 0.2);
            }
        }
    }
</style>
