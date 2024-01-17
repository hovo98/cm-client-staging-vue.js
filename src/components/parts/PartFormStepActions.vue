<template>
  <div class="page-dashboard__bottom page-dashboard__bottom--steps align--right">
    <div :class="['page-dashboard__bottom-container', show[0] ? '' : 'page-dashboard__bottom-container--align-end']">
      <a
        v-if="show[0]"
        href="javascript:;"
        class="btn-direction btn-direction--back"
        @click="$emit('prev')"
      >{{ text[0] }}</a>
      <div class="page-dashboard__bottom-next-actions">
        <a
          v-if="show[1]"
          href="javascript:;"
          class="btn-direction page-dashboard__bottom-skip"
          @click="$emit('skip')"
        >{{ text[1] }}</a>
        <a
          v-if="show[2]"
          href="javascript:;"
          class="btn"
          @click="$emit('next')"
        >{{ checkTitle() }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    interface Data {
        showLoader
    }

    export default Vue.extend({

        components: {
        },
        props: {
            show: {
                type: Array,
                required: false,
                default: () => [0,0,0],
            },
            text: {
                type: Array,
                required: false,
                default: () => ["BACK", "Skip for Now", "NEXT"],
            },
        },

        data(): Data {
            return {
				showLoader: false,
            }
        },

        methods: {
            checkTitle() {
                this.$route.params.step
                if(this.$route.params.step === 'quoteSummary' || this.$route.params.step === 'dealFinishManageLenders') {
                    return 'PUBLISH'
                } else {
                    return 'NEXT'
                }
            },
        },
    })
</script>

<style lang="scss" scoped>
    .page-dashboard__bottom--steps {
        @include mq($lap-xs) {
            width: 100%;
        }
    }

    .page-dashboard__bottom-container {
        width: 100%;
        max-width: 76.2%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &.page-dashboard__bottom-container--align-end {
            justify-content: flex-end;
        }

        @include mq($lg) {
            max-width: 100%;
        }

        @include mq($sm) {
            align-items: center;
        }
    }

    .page-dashboard__bottom-next-actions {
        @include mq($sm) {
            display: flex;
            flex-direction: column-reverse;
            align-items: flex-end;
        }
    }

    .page-dashboard__bottom-skip {
        margin: 0 40px;

        @include mq($sm) {
            margin: 30px 0 0;
        }
    }
</style>