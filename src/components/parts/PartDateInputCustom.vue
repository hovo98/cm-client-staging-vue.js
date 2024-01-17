<template>
  <div class="input-date">
    <div class="input-date__wrapper">
      <TheMask
        :mask="['##/##/####']"
        :masked="true"
        :value="val"
        @change.native="dateChange($event)"
      />
      <Datepicker
        ref="datepicker"
        format="MM/dd/yyyy"
        :placeholder="placeholder"
        :value="val"
        @selected="dateSelected($event)"
      />
      <span
        v-if="error"
        class="input-date__error error-message"
      >Please enter date in supported format (mm/dd/yyyy)</span>
      <span>
        <SvgIcon
          class="datepicker-indicator"
          icon-name="ico-calendar"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Datepicker from 'vuejs-datepicker'
    import {TheMask} from 'vue-the-mask'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'

    export default Vue.extend({

        components: {
            Datepicker,
            TheMask,
            SvgIcon,
        },
        props: {
            placeholder: {
                type: String,
                default: 'mm-dd-yyyy',
            },
            valFromParent: {},
        },

        data() {
            return {
                error: false,
            }
        },

        computed: {
            val() {
                const newDate = new Date(this.valFromParent)
                const str = ('0' + (newDate.getUTCMonth()+1)).slice(-2) +'/'+ ('0' + newDate.getDate()).slice(-2) +'/'+ newDate.getUTCFullYear()
                return str
            },
        },

        methods: {
            dateSelected(e) {
                this.$emit('changeVal', e)
                this.error = false
            },
            dateChange(e) {
                if(e.target.value === '') {
                    this.error = false
                    this.$emit('changeVal', '')
                    return
                }
                const date_regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1[0-9]|2[0-9]|3(0|1))\/\d{4}$/ 
                if(!date_regex.test(e.target.value)) {
                    this.error = true
                    this.$emit('changeVal', e.target.value)
                } else {
                    this.$emit('changeVal', e.target.value)
                    this.error = false
                }
            },
            isError() {
                if(this.val === '')
                    return false
                    
                return this.error
            },
        },
    })
</script>

<style lang="scss" scoped>

    .input-date__wrapper {
        position: relative;
    }

    .datepicker-indicator {
        position: absolute;
        right: 28px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        z-index: 10000;
        pointer-events: none;
        color: $blue-chill;
    }

    .input-date__error {
        position: absolute;
        left: 0;
        top: 57px;

        @include mq(1480px) {
            top: 46px;
        }
    }
</style>
