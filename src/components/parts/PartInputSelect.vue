<template>
  <div class="input-select">
    <v-select
      :options="options"
      :value="value"
      :placeholder="placeholder"
      :clearable="clearable"
    />
    <SvgIcon
      class="input-select__icon"
      icon-name="ico-arrow-down"
    />
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import vSelect from 'vue-select'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import 'vue-select/src/scss/vue-select.scss'

    Vue.component('VSelect', vSelect)

    interface Data {
        title: string
    }

    export default Vue.extend({

        components: {
            SvgIcon,
        },
        props: {
            options: {
                type: Array,
                default() {
                    return []
                },
            },
            value: {
                default: null,
            },
            placeholder: {
                type: String,
                default: 'Choose',
            },
            clearable: {
                type: Boolean,
                default: true,
            },
        },

        data(): Data {
            return {
                title: 'This is title of "PartInputSelect"!',
            }
        },
    })
</script>

<style lang="scss" scoped>
    .input-select {
        position: relative;

        :deep() {
            .vs__dropdown-toggle {
                font-size: 16px;
                color: $shark;
                border: 1px solid $shark;
                width: 100%;
                border-radius: 4px;
                padding: 14px 17px;
            }

            .vs__dropdown-menu {
                box-shadow: none;
                padding: 0;
                border: 1px solid $shark;
            }

            .vs__dropdown-option {
                padding: 10px 25px;
            }

            .vs__dropdown-option--highlight {
                background: $mosque;
            }

            .vs__open-indicator {
                display: none;
            }

            .vs--open + .input-select__icon {
                transform: translateY(-50%) rotate(180deg);
            }

            .vs__selected,
            .vs__search,
            .vs__search:focus {
                line-height: 1.3;
                margin: 0;
                font-weight: 600;
            }

            .vs__selected-options {
                input {
                    @include placeholder {
                        font-size: 16px;
                        color: $santas-gray;
                        font-weight: 400;
                        letter-spacing: 0.08px;
                    }
                }
            }
        }
    }

    .input-select__icon {
        color: $shark;
        font-size: 30px;
        right: 7px;
        transition: $dur $ease;
        @include center(y);
    }
</style>
