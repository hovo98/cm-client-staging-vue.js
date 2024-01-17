<template>
  <div class="input-date">
    <div>
      <Datepicker
        :placeholder="placeholder"
        :value="val"
        @selected="dateSelected ($event)"
      />
    </div>
    <SvgIcon
      class="input-date__icon"
      icon-name="ico-calendar"
    />
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Datepicker from 'vuejs-datepicker'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'

    interface Data {
        title: string
        val: string
    }

    export default Vue.extend({

        components: {
            Datepicker,
            SvgIcon,
        },
        props: {
            placeholder: {
                type: String,
                default: 'mm-dd-yyyy',
            },
            valFromParent: {
                
            },
        },

        data(): Data {
            return {
                title: 'This is title of "PartInputDate"!',
                val: '',
            }
        },

        watch: {
            valFromParent() {
                this.val = this.valFromParent
            },
        },

        methods: {
            dateSelected (e) {
                this.$nextTick(() => this.$emit('changeVal', e))
            },
        },
    })
</script>

<style lang="scss" scoped>
    .input-date {
        position: relative;

        :deep() {
            input {
                padding-left: 38px;

                &:focus:not(.input--small) {
                    padding-left: 43px;
                }
            }
        }
    }

    .input-date__icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 13px;
        color: $santas-gray;
    }
</style>
