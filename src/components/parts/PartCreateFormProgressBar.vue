<template>
  <div class="cf-progress-bar">
    <h2
      v-if="progress.title"
      class="title-small cf-progress-bar--title"
    >
      <span v-if="type === 'quote' && progress.title !== 'Review Your Soft Quote' && progress.title !== 'Soft Quote Submitted' && progress.title !== 'Start'">Estimated</span> {{ progress.title }}
    </h2>
    <div class="cf-progress-bar__line">
      <span
        class="cf-progress-bar__line-colored"
        :style="{width: progress.percentage + '%'}"
      />
    </div>
  </div>
</template>

<script lang="ts">
 /* eslint-disable */
    import Vue from 'vue';
    import Deal from '@/services/Deal';
    import Quote from '@/services/Quote';

    interface Data {
        progressPercent: number
        totalSteps: number
        progressStep: number
    }

    export default Vue.extend({
        props: {
            reference: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: false,
                default: 'deal'
            }
        },
        computed: {
            list() {
                return this.$store.getters.getQuoteSidebar
            },
            progress() {
                if(this.type === 'deal') {
                    const refObj = Deal.sidebar.helpers.getUnitReference(this.reference)
                    return {
                        title: refObj.title,
                        percentage: refObj.percentage
                    }
                } if(this.type == 'quote') {
                    const refObj = this.$store.getters.getQuoteProgress
                    return {
                        title: refObj.title,
                        percentage: refObj.percentage
                    }
                }
                
            }
        }
    });
</script>

<style lang="scss" scoped>
    .cf-progress-bar {
        margin-bottom: 51px;
    }
    
    .cf-progress-bar--title {
        margin-bottom: 30px;
    }

    .cf-progress-bar__line {
        width: 100%;
        height: 6px;
        background-color: $alto;
        position: relative;
    }

    .cf-progress-bar__line-colored {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background-color: $yellow-orange;
    }
</style>
