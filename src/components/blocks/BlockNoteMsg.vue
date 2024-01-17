<template>
  <div class="note-msg">
    <h3
      v-if="data.title"
      class="note-msg__title note-msg__title-icon"
    >
      <SvgIcon
        class="note-msg__icon"
        icon-name="ico-check"
      />
      {{ data.title }}
    </h3>
    <div
      v-if="data.text"
      class="note-msg__content"
      v-html="data.text"
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
            data: {
                required: true,
            },
        },

        data(): Data {
            return {
                title: 'This is title of "BlockNoteMsg"!',
            }
        },
    })
</script>

<style lang="scss" scoped>
    .note-msg {
        background-color: $fantasy;
        padding: 30px;

        @include mq($lap-l) {
            padding: 15px;
        }
    }

    .note-msg__title {
        color: $shark;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.08px;
        line-height: 21.6px;
        font-style: italic;
        margin-bottom: 30px;

        @include mq($lap-l) {
            margin-bottom: 15px;
        }
    }

    .note-msg__title-icon {
        padding-left: 35px;
        position: relative;
    }

    .note-msg__icon {
        color: $white;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: $yellow-orange;
        font-size: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
    }

    .note-msg__content {
        color: $shark;
        font-size: 14px;
        line-height: 1.7;
        font-style: italic;
    }
</style>
