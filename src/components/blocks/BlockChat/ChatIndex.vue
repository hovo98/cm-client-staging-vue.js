<template>
  <div class="chat">
    <template v-if="currentChat">
      <ChatHeader
        :name="chatName"
        @returnBackLender="returnBackLender"
      />
      <ChatMessages
        ref="ChatMessageComponent"
        :messages="currentChat.messages"
      />
      <ChatForm
        :room-id="currentChat.room_id"
        :deal-id="dealId"
        @ScrollToBottom="ScrollToBottom"
        @needSubscription="$emit('needSubscription')"
      />
    </template>
    <template v-else-if="brokerCurrentChat">
      <ChatHeader
        :name="brokerCurrentChat.name"
        @returnBackBroker="returnBackBroker"
        @closeBrokerChat="closeBrokerChat"
      />
      <ChatMessages
        ref="ChatMessageComponent"
        :messages="brokerCurrentChat.messages"
      />
      <button
        class="chat__header-button"
        :class="{
          'chat__header-button-disabled': creatingZoomRoom,
        }"
        :disabled="creatingZoomRoom"
        @click="call"
      >
        <SvgIcon icon-name="ico-phone" class="chat__header-button-icon" />
        <span class="chat__header-button-text">{{ creatingZoomRoom ? 'Creating' : 'Create' }} Zoom link</span>
      </button>
      <ChatForm
        :room-id="brokerCurrentChat.room_id"
        :deal-id="dealId"
        @ScrollToBottom="ScrollToBottom"
        @needSubscription="$emit('needSubscription')"
      />
    </template>
    <template v-else>
      <div
        v-if="chat && chat.rooms.length > 0"
        class="chat__header"
      >
        <span class="chat__header-name-wrapper"><span class="chat__header-name"><SvgIcon
          class="chat__header-icon"
          icon-name="ico-message-rounded"
        /></span>Messages</span>

        <span
          class="chat__header-close-icon-wrapper"
          @click="returnBackBroker()"
        ><SvgIcon
          class="chat__header-close-icon"
          icon-name="ico-close-thin"
        /></span>
      </div>
      <ChatListThread
        v-if="chat && chat.rooms.length > 0"
        :quote-room="quoteRoom"
        :deal-id="dealId"
        :rooms="chat.rooms"
        :minimized="minimized"
        @openChatWithLenderCurrent="openChatWithLenderCurrent"
      />
    </template>
    <transition name="fade-in-fast">
      <BlockPopupZoomSubscription
        :open="subscriptionModal"
        :deal="dealId"
        @close="subscriptionModal = false"
      />
    </transition>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import ChatHeader from './ChatHeader.vue'
    import ChatListThread from './ChatListThread.vue'
    import ChatMessages from './ChatMessages.vue'
    import ChatForm from './ChatForm.vue'
    import { mapState } from "vuex"
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import BlockPopupZoomSubscription from '@/components/blocks/BlockPopup/BlockPopupZoomSubscription.vue'

    export default Vue.extend({

        components: {
            ChatHeader,
            ChatListThread,
            ChatMessages,
            ChatForm,
            SvgIcon,
            BlockPopupZoomSubscription,
        },

        props: {
            dealId: {
                type: Number,
            },
            chatName: {
                type: String,
            },
            openOrCloseChat: {
                type: Function,
            },
            roomId: {},
            page: {
                type: String,
            },
        },

        data() {
            return {
                brokerCurrentChat: null,
                minimized: false,
                quoteRoom: null,
                subscriptionModal: false,
                creatingZoomRoom: false,
            }
        },

        async beforeMount() {
            if(this.user.role === 'lender') {
                if(this.seenCount[this.chat.room_id] > 0) {
                    const arr = []
                    this.chat.messages.forEach(msg => {
                        if(msg.role === 'broker') {
                            if(!msg.seen)
                                arr.push(msg.id)
                        }
                    })
                    this.$store.dispatch('seenMessages', {arr: arr, index: -1})
                    this.$store.dispatch('seenMessagesDealTableLender', this.dealId)
                }
            } else {
                if(this.roomId) {
                    const index = this.chat.rooms.findIndex(room => room.room_id === parseInt(this.roomId))
                    this.brokerCurrentChat = this.chat.rooms[index]
                    const arr = []
                    if(this.seenCount[parseInt(this.roomId)] > 0) {
                        this.chat.rooms[index].messages.forEach(msg => {
                            if(msg.role === 'lender') {
                                if(!msg.seen)
                                    arr.push(msg.id)
                            }
                        })
                        this.$store.dispatch('seenMessages', {arr: arr, index: index})
                    }
                    this.$store.dispatch('currentChatId', parseInt(this.roomId))
                    this.$store.dispatch('seenMessagesDealTableBroker', {id: this.dealId, count: arr.length})
                }
                if(this.quotes && this.quotes.length > 0) {
                    let flag = false
                    this.quotes.forEach(obj => {
                        const roomIdString = `${this.user.id}${this.dealId}${obj.lender.id}`
                        const roomId = parseInt(roomIdString)
                        this.chat.rooms.forEach(room => {
                            if(room.room_id === roomId)
                                flag = true
                        })
                        if(!flag) {
                            const newObj = {
                                name: `Messages with ${obj.lender.company}`,
                                room_id: roomId,
                                messages: [],
                            }
                            this.$store.dispatch('setBrokerFirstChat', newObj)
                        }
                    })
                }
            }
            if(this.page === 'quote') {
                const room = `${this.user.id}${this.dealId}${this.$route.params.lender}`
                this.quoteRoom = parseInt(room)
                let flag = false
                this.chat.rooms.forEach(room => {
                    if(this.quoteRoom === room.room_id)
                        flag = true
                })
                if(!flag) {
                    const obj = {
                        name: `Messages with ${this.lenderData.company}`,
                        room_id: parseInt(room),
                        messages: [],
                    }
                    this.$store.dispatch('setBrokerFirstChat', obj)
                }
            }

        },

        computed: {
            ...mapState({
                user: (state) => state['User'].user,
                chat: (state) => state['Chat'].chat,
                lenderData: state => state['FilterQuotes'].lender,
                quotes: (state) => state['FilterDeal'].dealQuotes,
            }),
            currentChat() {
                if(this.user.role === 'lender') {
                    if(this.chat)
                        this.$store.dispatch('currentChatId', this.chat.room_id)

                    return this.chat
                } else {
                    return null
                }
            },
            seenCount() {
                if(this.user.role === 'lender') {
                    const obj = {}
                    obj[this.chat.room_id] = 0
                    this.chat.messages.forEach(msg => {
                        if(msg.role === 'broker') {
                            if(!msg.seen)
                                obj[this.chat.room_id] += 1
                        }
                    })
                    return obj
                } else {
                    const obj = {}
                    this.chat.rooms.forEach(room => {
                        obj[room.room_id] = 0
                        room.messages.forEach(msg => {
                            if(msg.role === 'lender') {
                                if(!msg.seen)
                                    obj[room.room_id] += 1
                            }
                        })
                    })
                    return obj
                }
            },
        },

        methods: {
            openChatWithLenderCurrent(index) {
                this.brokerCurrentChat = this.chat.rooms[index]
            },
            returnBackBroker() {
                if(this.brokerCurrentChat === null) {
                    this.$emit('openOrCloseChat', false)
                    return
                }
                this.brokerCurrentChat = null
            },
            closeBrokerChat() {
                this.$emit('openOrCloseChat', false)
            },
            returnBackLender() {
                this.$emit('openOrCloseChat', false)
            },

            minimizeThread() {
                this.minimized = !this.minimized
            },

            returnBack() {
                if(this.user.role === 'broker') {
                    this.$emit('returnBackBroker')
                } else {
                    this.$emit('returnBackLender')
                }
            },

            ScrollToBottom() {
                this.$refs.ChatMessageComponent.scrollToBottom()
            },

            async call() {
              this.creatingZoomRoom = true

              const { data } = await this.$store.dispatch('getZoomUrl', {
                deal_id: this.dealId,
              })

              if (data.errors?.length) {
                this.subscriptionModal = true
                this.creatingZoomRoom = false
                return
              }

              await this.$store.dispatch('sendZoomLinks', {
                  join_url: data.data.chatVideoCall.join_url,
                  start_url: data.data.chatVideoCall.start_url,
                  room_id: this.brokerCurrentChat.room_id,
                  deal_id: this.dealId,
              })

              this.creatingZoomRoom = false
            },
        },
    })
</script>

<style lang="scss" scoped>
    .chat {
        position: fixed;
        bottom: 0;
        right: 0;
        background: $white;
        z-index: 10000000;
        width: 540px;
        max-height: 780px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        box-shadow: -15px 0px 20px #0000000D;

        @include mq(1024px) {
            top: 0;
            right: 0;
            width: 80%;
            max-height: 100%;
            // position: relative;

            &::before {
                content: '';
                width: 100%;
                height: 100%;
                position: absolute;
                left: -100%;
                top: 0;
                background-color: rgba($black, 0.2);
            }
        }

        @include mq(767px) {
            width: 100%;
            &::before {
                display: none;
            }
        }
    }

        .chat__header {
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #FBF8F3;
        padding: 0 30px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
    }

    .chat__header-close-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .chat__header-close-icon {
        margin-left: auto;
        cursor: pointer;
    }

    .chat__header-name-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .chat__header-name {
        display: flex;
        align-items: center;
        justify-self: center;
        margin-right: 15px;
    }

    .chat__header-icon {
        color: $yellow-orange;
    }

    .chat__header-button {
      color: white;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
      display: flex;
      flex-direction: row;
      align-self: flex-end;
      align-items: center;
      padding: 5px 8px;
      gap: 4px;
      height: 30px;
      background: #055D64;
      border-radius: 100000px;
      flex: none;
      order: 0;
      flex-grow: 0;
      white-space: nowrap;
      margin-right: 30px;
      margin-bottom: 10px;
    }
    .chat__header-button-text {
      margin-left: 6px;
      font-family: 'Open Sans';
      font-style: italic;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
    .chat__header-button-icon {
      transform: rotate(90deg);
    }
    .chat__header-button-disabled {
      opacity: 0.25;
    }
</style>
