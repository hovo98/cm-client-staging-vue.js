<template>
  <div class="profile-tabs__content profile-tab-notifications comming-soon-holder">
    <h2 class="comming-soon__title block-title">Coming Soon</h2>
    <SvgIcon
      class="comming-soon__icon"
      icon-name="ico-message"
    />
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'

    interface Data {
        title: string
    }

    export default Vue.extend({

        components: {
            SvgIcon,
        },
        props: {
        },

        data(): Data {
            return {
                title: 'This is title of "BlockProfileNotifications"!',
            }
        },
    })
</script>

<style lang="scss" scoped>
    .comming-soon-holder {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 430px;

        @include mq($lg) {
            height: auto;
            min-height: 160px;
        }
    }

    .comming-soon__title {
        text-align: center;
        margin-bottom: 30px;
    }

    .comming-soon__icon {
        font-size: 150px;
        color: $blue-chill;
        margin: 0 auto;

        @include mq($lg) {
            font-size: 95px;
        }
    }
</style>
