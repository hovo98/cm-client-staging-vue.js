<template>
  <div
    v-if="count < 3"
    class="createQuote"
  >
    <div
      v-if="!blockPreloader"
      :class="quoteStatus ? 'createQuote__btn-wrapper createQuote__btn-wrapper--alt': 'createQuote__btn-wrapper'"
    >
      <template v-if="is_skipped">
        <a
          class="createQuote-btn createQuote-btn--skip-btn"
          href="javascript:;"
          @click="skipDeal()"
        >Skip deal?</a>
      </template>
      <button
        class="open-chat-btn"
        @click="$emit('openOrCloseChat', !isOpenChat)"
      >
        <SvgIcon
          class="open-chat-icon"
          icon-name="ico-message-rounded"
        />Message Broker/Borrower
      </button>

      <template v-if="quoteStatus">
        <span class="createQuote-text">Quote has been accepted</span>
      </template>
      <template v-else>
        <a
          v-if="quoteLink === ''"
          class="btn createQuote-btn"
          href="javascript:;"
          @click="goTo()"
        >Create soft quote</a>
        <a
          v-else
          class="btn createQuote-btn"
          :href="quoteLink"
        >Continue soft quote</a>
      </template>
    </div>
  </div>
  <div
    v-else
    class="createQuote"
  >
    <div v-if="!blockPreloader">
      <span class="createQuote-text">You’ve reached the maximum number of quotes allowed per deal.</span>
      <div class="createQuote__btn-wrapper">
        <template v-if="is_skipped">
          <a
            class="btn createQuote-btn"
            href="javascript:;"
            @click="skipDeal()"
          >Skip deal?</a>
        </template>

        <button
          class="open-chat-btn"
          @click="$emit('openOrCloseChat', !isOpenChat)"
        >
          <SvgIcon
            class="open-chat-icon"
            icon-name="ico-message-rounded"
          />Message Broker/Borrower
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'

    interface Data {
        title: string
        // isOpenChat: boolean,
    }

    export default Vue.extend({
        components: {
            SvgIcon,
        },
        props: {
            count: {
                type: Number,
            },
            is_skipped: {
                type: Boolean,
            },
            deal: {
                required: false,
            },
            blockPreloader: {
                type: Boolean,
            },
            isOpenChat: {
                type: Boolean,
            },
            quoteLink: {
                type: String,
            },
        },

        data(): Data {
            return {
                title: 'This is title of "PartCreateQuote"!',
                // isOpenChat: false,
            }
        },

        computed: {
            quoteStatus() {
                return this.$store.getters.getQuoteStatus
            },
        },

        methods: {
            goTo() {
                this.$router.push({path: '/create-quote/'+this.$route.params.id})
            },
            skipDeal() {
                this.$emit('skipDeal')
            },
        },
    })
</script>

<style lang="scss" scoped>

    .createQuote {
        padding: 0 52px 40px 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 29px;

        @include mq($xl) {
            padding: 0 20px 40px;
            margin-top: 15px;
        }

        @include mq(450px) {
            display: block;
        }
    }

    .createQuote-text {
        font-size: 18px;
        font-family: $font-second;
        font-weight: 700;
        letter-spacing: 0.09px;
        line-height: 1.2;
        color: $shark;
        margin-right: auto;
        display: block;
        text-align: center;
        margin-bottom: 10px;

        @include mq(450px) {
            display: block;
        }

        @include mq($sm) {
            font-size: 16px;
        }
    }

    .createQuote-btn {
        font-size: 12px;
        padding: 10px;
        min-width: 250px;

        @include mq($sm) {
            padding: 7px;
        }
    }

    .createQuote-btn--skip-btn {
        margin-left: 20px;
        font-size: 14px;
        font-weight: 700;
        text-decoration: underline;
        color: $blue-chill;
        min-width: auto;
    }

    .open-chat-btn {
        min-width: 209px;
        // width: 100%;
        height: 43px;
        font-size: 13px;
        font-weight: 600;
        
        
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        
        transition: $dur $ease;
        padding: 0 30px;

        border: 2px solid $yellow-orange;
        color: $yellow-orange;
        background-color: $white;

        @include mq(768px) {
            min-width: 153px;
        }

        @include mq(575px) {
            height: 37px;
        }

        @include mq(360px) {
            // min-width: 100%;
            margin-top: 19px;
        }

        @include hover {
            border: 2px solid transparent;
            color: $white;
            background-color: $yellow-orange;
        }

        &.disabled {
            background-color: #9da0ae;
            border-color: #9da0ae;
            pointer-events: all;
            position: relative;

            & .chat-btn-tooltip {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: -322px;
                background-color: $white;
                box-shadow: 0 2px 40px rgba(0, 0, 0, 0.08);
                border-radius: 8px;
                width: 310px;
                padding: 5px 10px;
                color: $shark;
                font-size: 14px;
                line-height: 1.7;
                font-weight: 500;
                font-style: italic;
                transition: $dur $ease;
                opacity: 0;
                visibility: hidden;
                z-index: 9;
                pointer-events: none;

                @include mq(768px) {
                    left: auto;
                    right: -322px;
                }

                @include mq(556px) {
                    left: -14px;
                    right: auto;
                    top: 49px;
                    transform: translateY(0);
                    width: 306px;
                }
            }

            &:hover {
                color: $white;

                .chat-btn-tooltip {
                    opacity: 1;
                    visibility: visible;
                }
            }
        }
    }

    .open-chat-icon {
        margin-right: 10px;
    }

    .open-chat-btn-message-indicator {
        margin: 0 7px 0 2px;
    }

    .createQuote__btn-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        & > * {
            margin: 0 10px;

            @include mq(690px) {
                margin: 5px 0;
            }
        }

        @include mq(690px) {
            flex-direction: column;
        }
    }

    .createQuote__btn-wrapper--alt {
        flex-direction: column-reverse;

        .createQuote-text {
            margin: 0 10px 10px;
        }
    }

</style>
