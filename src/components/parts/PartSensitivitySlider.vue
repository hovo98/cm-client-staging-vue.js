<template>
  <div class="sensitivity-slider">
    <span
      v-if="error"
      class="sensitivity-slider__notice"
    >You have another term rated at this number.</span>
    <span class="sensitivity-slider__aspect">{{ slider.aspectName }}</span>
    <div class="sensitivity-slider__level">
      <div :class="'sensitivity-slider__level-holder ' + 'sensitivity-slider__level-holder--val-' + value">
        <VueSlider
          v-model="value"
          :value="slider.value"
          :aspect-name="slider.aspectName"
          :min="0"
          :max="100"
          :interval="10"
          :min-range="10"
          :step="10"
          :dot-size="21"
          :lazy="false"
          :height="10"
          :tooltip="'none'"
          :disabled="slider.disabled"
          :order="slider.order"
        />
        <div
          class="sensitivity-slider__level-line-cover"
          :style="{width: 100 - value + '%' }"
        />
        <div class="sensitivity-slider__values">
          <span class="sensitivity-slider__value sensitivity-slider__value--left">Low</span>
          <span class="sensitivity-slider__value sensitivity-slider__value--right">High</span>  
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'

    interface Data {
        title: string
        value: number
        error: boolean
    }

    export default Vue.extend({
        
        components: {
            VueSlider,
        },
        props: {
            slider: {
                type: Object,
                required: true,
            },
            index: {
                type: Number,
                required: true,
            },
        },

        data(): Data {
            return {
                title: 'This is title of "PartSensitivitySlider"!',
                value: 0,
                error: false,
            }
        },

        watch: {
            value() {
                this.$emit('changeSlider', this.value, this.index)
                
            },
        },

        mounted() {
            if(this.slider.value !== 0) {
                this.value = this.slider.value
            }
        },

        methods: {
            changeVal(val, error) {
                if(error) {
                    if(!this.error) {
                        this.error = true
                        setTimeout(() => {
                            this.error = false
                        }, 2000)
                    }
                }
            },
            changeValMounted(val) {
                this.value = val
            },
        },
    })
</script>

<style lang="scss" scoped>
    .sensitivity-slider {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        position: relative;

        @include mq($sm) {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    .sensitivity-slider__notice {
        position: absolute;
        right: -265px;
        top: 2px;
        font-size: 12px;
        color: $red;

        @include mq(1350px) {
            right: 27px;
            top: 17px;
            font-size: 10px;
        }

        @include mq($sm) {
            right: 0;
        }
    }

    .sensitivity-slider__aspect {
        font-size: 14px;
        font-family: $font-main;
        font-weight: 400;
        letter-spacing: 0.07px;
        line-height: 21.6px;
        color: $shark;
        margin-right: 17px;
        max-width: 110px;
        width: 100%;

        @include mq($sm) {
            max-width: 100%;
            margin-bottom: 10px;
        }
    }

    .sensitivity-slider__level {
        flex: 1;
        margin-top: 6px;

        @include mq($sm) {
            width: 100%;
        }
    }

    .sensitivity-slider__level-holder {
        width: 100%;
        height: 10px;
        background-color: $grey-light;
        position: relative;
        margin-bottom: 33px;

        &::after,
        &::before {
            content: '';
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        &::after {
            left: 0;
            background-image: linear-gradient(to right, $white 1px, transparent 1px), linear-gradient($white 1px, transparent 1px);
            background-size: 10% 100%;
        }

        &::before {
            right: 0;
            background-image: linear-gradient(270deg, #0c8e8b 0%, $blue-chill 0%, $yellow-orange 100%);
        }
    }

    .sensitivity-slider__level-line-cover {
        position: absolute;
        top: 0;
        right: 0;
        background-color: $grey-light;
        height: 100%;
        pointer-events: none;
    }

    .sensitivity-slider__values {
        display: flex;
        justify-content: space-between;
        margin-top: 7px;
    }

    .sensitivity-slider__value {
        font-size: 10px;
        color: $santas-gray;
    }

    :deep() {
        .vue-slider {
            padding: 0 !important;
        }

        .vue-slider-process {
            background: transparent;
        }

        .vue-slider-rail {
            background-color: transparent;
            border-radius: 0;
        }

        .vue-slider-dot-handle {
            box-shadow: none;
            transition: $dur $ease;

            .sensitivity-slider__level-holder--val-0 & {
                background-color: $santas-gray !important;
            }

            .sensitivity-slider__level-holder--val-10 & {
                background-color: #e3aa49 !important;
            }

            .sensitivity-slider__level-holder--val-20 & {
                background-color: #cba750 !important;
            }

            .sensitivity-slider__level-holder--val-30 & {
                background-color: #b6a457 !important;
            }

            .sensitivity-slider__level-holder--val-40 & {
                background-color: #9ca15e !important;
            }

            .sensitivity-slider__level-holder--val-50 & {
                background-color:#859e66 !important;
            }

            .sensitivity-slider__level-holder--val-60 & {
                background-color: #6d9a6d !important;
            }

            .sensitivity-slider__level-holder--val-70 & {
                background-color: #559674 !important;
            }

            .sensitivity-slider__level-holder--val-80 & {
                background-color: #40957c !important;
            }

            .sensitivity-slider__level-holder--val-90 & {
                background-color: #299283 !important;
            }

            .sensitivity-slider__level-holder--val-100 & {
                background-color: $blue-chill !important;
            }
        }

        .vue-slider-disabled {
            opacity: 1;
        }
    }
</style>
