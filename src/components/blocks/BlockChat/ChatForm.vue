<template>
  <div class="chat__submit-wrapper">
    <div class="chat__submit-disclaimer-wrapper" v-if="user.role !== 'lender' && !hasSubscription">
      <span class="chat__submit-disclaimer"><SvgIcon
        class="chat__submit-disclaimer-icon"
        icon-name="ico-exclamation"
      />Do not share your name and/or contact information before a quote is accepted.</span>
      <span class="chat__submit-disclaimer small">Failure to follow policy may result in removal from Finance Lobby.</span>
    </div>
      <button
        v-if="user.role !== 'lender' && !hasSubscription"
        class="chat__submit-needs-subscription"
        @click="handleNeedSubscription"
      >
        Lender info is hidden and could be shown by purchasing a subscription or upgrading this deal
      </button>
    <div class="chat__submit-input-wrapper">
        <div
            v-if="!mobile"
            ref="textarea"
            :class="sending ? 'chat__submit-input sending':'chat__submit-input'"
            contenteditable="true"
            placeholder="Type a message"
            @keydown.enter.exact.prevent="sendMessage()"
        />
        <div
            v-else
            ref="textarea"
            :class="sending ? 'chat__submit-input sending':'chat__submit-input'"
            contenteditable="true"
            placeholder="Type a message"
            @keydown.enter.exact.prevent="nextRowEnter()"
        />
        <div
            class="chat__submit-send-icon-wrapper"
            @click="sendMessage()"
        >
            <SvgIcon
            class="chat__submit-send-icon"
            icon-name="ico-paper-plane"
            />
            <span class="chat__submit-send-icon-mobile">
            <SvgIcon
                class="chat__header-icon"
                icon-name="ico-paper-plane"
            />
            </span>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import { checkForbidenWords } from '@/config/util'

    export default Vue.extend({

        components: {
            SvgIcon,
        },
        props: {
            roomId: {
                type: Number,
                default: -1,
            },
            dealId: {
                type: Number,
                default: -1,
            },
        },

        data() {
            return {
                message: '',
                sending: false,
                mobile: window.innerWidth <= 1024,
            }
        },

        computed: {
            ...mapState({
                user: (state) => state['User'].user,
                quotes: (state) => state['FilterDeal'].dealQuotes,
                quotedStatus: (state) => state['FilterDeal'].quotedStatus,
                chat: (state) => state['Chat'].chat,
            }),

            hasSubscription() {
              return this.$store.getters.hasSubscription
            },

            subscription() {
              return this.$store.state.Broker.subscription
            },
        },

        mounted(){
            addEventListener('resize', () => {
                this.mobile = innerWidth <= 1024
            })
        },

        methods: {
            async sendMessage() {
                const textareaValue = this.$refs.textarea.innerText
                this.sending = true
                let forbidden_msg

                if(this.user.role === 'broker') {
                    if(this.$store.getters.getDealSheetStatus)
                        forbidden_msg = false
                } else {
                    if(this.quotedStatus)
                        forbidden_msg = false
                }

                if(forbidden_msg === undefined)
                    forbidden_msg = checkForbidenWords(textareaValue)

                if(this.user.role === 'lender') {
                    if(textareaValue.trim().length === 0) {
                        this.$refs.textarea.innerHTML = ''
                        this.sending = false
                        return
                    }

                    if(this.chat.messages.length >= 1 && this.roomId === 0) {
                        this.$refs.textarea.innerHTML = ''
                        this.sending = false
                        return false
                    }

                    await this.$store.dispatch('sendMessageLender', {msg: textareaValue, room_id: this.roomId, deal_id: this.dealId, forbidden_msg: forbidden_msg})
                    this.$refs.textarea.innerHTML = ''
                    this.sending = false
                    this.$emit('ScrollToBottom')
                } else {
                    if(textareaValue.trim().length === 0) {
                        this.$refs.textarea.innerHTML = ''
                        this.sending = false
                        return
                    }

                    if(this.$route.params.lender) {
                        await this.$store.dispatch('sendMessageBroker', {msg: textareaValue, room_id: this.roomId, deal_id: this.dealId, forbidden_msg: forbidden_msg, lender_id: parseInt(this.$route.params.lender)})
                    } else {
                        if(this.quotes.length > 0) {
                            let lender_id = 0
                            this.quotes.forEach(obj => {
                                const roomIdString = `${this.user.id}${this.dealId}${obj.lender.id}`
                                const roomId = parseInt(roomIdString)
                                if(this.roomId === roomId)
                                    lender_id = obj.lender.id
                            })
                            await this.$store.dispatch('sendMessageBroker', {msg: textareaValue, room_id: this.roomId, deal_id: this.dealId, forbidden_msg: forbidden_msg, lender_id: lender_id})
                        } else {
                            await this.$store.dispatch('sendMessageBroker', {msg: textareaValue, room_id: this.roomId, deal_id: this.dealId, forbidden_msg: forbidden_msg, lender_id: 0})
                        }
                    }
                    this.$refs.textarea.innerHTML = ''
                    this.sending = false
                    this.$emit('ScrollToBottom')
                }

                if(textareaValue !== '') {
                    this.$emit('sendingMessage', true)
                }
            },

            nextRowEnter() {
                document.execCommand('insertLineBreak')
            },
            handleNeedSubscription() {
              this.$emit('needSubscription')
            },
        },

    })
</script>

<style lang="scss" scoped>
    .chat__submit-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 0 30px 40px;
        width: 100%;

        @include mq(1024px) {
            width: 100%;
            padding: 10px 0 0;
        }
    }

    .chat__submit-disclaimer-wrapper {
        display: flex;
        flex-direction: column;

        @include mq(1024px) {
            padding: 0 15px;
        }
    }

    .chat__submit-disclaimer {
        font-size: 14px;
        color: $shark;
        font-weight: 500;
        font-style: italic;
        position: relative;
        padding-left: 29px;
        margin-bottom: 10px;

        &.small {
            font-size: 12px;
            color:#9DA0AE;
            margin-bottom: 20px;
        }
    }

    .chat__submit-disclaimer-icon {
        color: $yellow-orange;
        margin-right: 15px;
        position: absolute;
        left: 0;
        top: 4px;
    }


    .chat__submit-needs-subscription {
          font-size: 14px;
          border: 1px solid #9DA0AE4D;
          padding: 10px 16px;
          margin-bottom: 16px;
          border-radius: 22px;
          text-align: center;
          background: $white;
        }
    .chat__submit-input-wrapper {
        width: 100%;
        position: relative;

        @include mq(1024px) {
            padding: 10px;
        }
    }

    .chat__submit-send-icon-wrapper {
        position: absolute;
        top: 50%;
        right: 23px;
        transform: translateY(-50%);
    }

    .chat__submit-send-icon {
        color: $blue-chill;
        cursor: pointer;

        @include mq(1024px) {
            display: none;
        }
    }

    .chat__submit-input {
        width: 100%;
        border: 1px solid #9DA0AE4D;
        border-radius: 22px;
        min-height: 44px;
        max-height: 133px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 10px 65px 10px 25px;
        font-size: 14px;
        color: $black;
        resize: none;
        overflow-y: scroll;
        outline: none;
        @include scroll-style($blue-chill, transparent, 20px, 0.4vw);

        &.sending {
            opacity: 0.5;
            pointer-events: none;
        }

        @include mq(1024px) {
            min-height: 82px;
            @include placeholder {
                line-height: 60px;
            }
        }

        &:focus {
            @include placeholder {
                color: transparent;
            }
        }
    }

    .chat__submit-send-icon-mobile {
        width: 40px;
        height: 40px;
        display: none;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: $blue-chill;

        .chat__header-icon {
            color: $white;
        }

        @include mq(1024px) {
            display: flex;
        }
    }

    [contenteditable=true]:empty:before{
        content: attr(placeholder);
        pointer-events: none;
        display: block; /* For Firefox */
        opacity: 0.5;
    }
</style>