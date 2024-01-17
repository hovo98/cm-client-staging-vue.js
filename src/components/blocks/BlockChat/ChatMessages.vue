<template>
  <div
    ref="chatBody"
    class="chat__body"
  >
    <template v-for="(message, index) in filteredMessages">
      <div
        :key="index"
        class="chat__message-holder"
        :class="message.role === user.role ? 'right' : 'left'"
      >
        <span class="chat__message-info">{{ checkName(message) }}<span v-if="message.time">, {{ setTime(message.time) }}</span></span>
        <div
          class="chat__message-box"
          :class="{
            'red': message.forbidden_msg,
            'default': !isZoomLink(message),
            'yellow': isZoomLink(message),
          }"
        >
          <SvgIcon
            v-if="message.forbidden_msg"
            class="chat__submit-disclaimer-icon"
            icon-name="ico-exclamation"
          />
          <p v-else-if="message.message.startsWith('joinzoomlink')" class="chat__zoom-message">
            <span>I just created a room, let’s continue our conversation there!</span>
            <a
              target="_blank"
              :href="message.message.replace('joinzoomlink-', '')"
              style="text-decoration: underline;"
            >Join room call</a>
          </p>
          <p v-else-if="message.message.startsWith('startzoomlink')" class="chat__zoom-message">
            <span>Zoom room created. Lender has received a link to join.</span>
            <a
              target="_blank"
              :href="message.message.replace('startzoomlink-', '')"
              style="text-decoration: underline;"
            >Start room call</a>
          </p>
          <pre v-else>{{ message.message.trim() }}</pre>
        </div>

        <div
          v-if="message.forbidden_msg"
          class="message-not-sent"
        >
          <span class="message-not-sent__title">Message not sent</span>
          <p class="message-not-sent__text">Deals can only be quoted and accepted through FL, so please wait to share contact information until the quote is accepted via the platform, at which time the contact info will be shared on the platform.</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'

    export default Vue.extend({
        props: {
            messages: {
                type: Array,
            },
        },
        watch: {
            messages() {
                setTimeout(() => {
                    this.scrollToBottom()
                }, 2)
            },
        },
        computed: {
            ...mapState({
                user: (state) => state['User'].user,
            }),

            filteredMessages() {
                if (this.user.role === 'lender') {
                  return this.messages.filter(m => !m.message.startsWith('startzoomlink'))
                }

                return this.messages.filter(m => !m.message.startsWith('joinzoomlink'))
            },
        },

        components: {
            SvgIcon,
        },

        mounted() {
            this.scrollToBottom()
        },

        methods: {
            scrollToBottom() {
                const element = this.$refs.chatBody
                if(element)
                    element.scrollTop = element.scrollHeight
            },

            setTime(date) {
                const arr = date.split(/[- :]/)
                const newDate = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5])
                const minutes = newDate.getMinutes()
                let hours = newDate.getHours()
                const ampm = hours >= 12 ? 'PM' : 'AM'
                let newMinutes
                hours = hours % 12
                hours = hours ? hours : 12
                newMinutes = minutes < 10 ? '0'+minutes : minutes
                const strTime = hours + ':' + newMinutes + ' ' + ampm

                const dformat = `${(newDate.getMonth()+1).toString().padStart(2, '0')}/${
                newDate.getDate().toString().padStart(2, '0')}/${
                newDate.getFullYear().toString().padStart(4, '0')} ${
                strTime}`
                return dformat
            },

            isZoomLink(message) {
              return message.message.startsWith('startzoomlink') || message.message.startsWith('joinzoomlink')
            },

            checkName(message) {
              if (this.isZoomLink(message)) return 'Zoom'

              if (message.role === this.user.role) return 'You'

               return message.role
            },
        },
    })
</script>

<style lang="scss" scoped>

    .chat__body {
        padding: 10px 30px;
        width: 100%;
        // height: 500px;
        flex: 2;
        overflow: scroll;

        @include mq(768px) {
            padding: 10px 15px;
            height: 100%;
            flex: 2;
        }

        @include mq(640px, min) {
            @include scroll-style($blue-chill, transparent, 20px, 0.4vw);
        }
    }

    .chat__message-holder {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        &.right {
            align-items: flex-end;

            .chat__message-box {
                border-bottom-right-radius: 0;
                color: $black;

                &.red {
                    background-color: #ffd3cd;
                }

                &.default {
                  background-color: #F5F5F7;
                }
                &.yellow {
                  background-color: rgba(249, 173, 66, 0.25);
                }

                pre {
                    background: transparent;
                    padding: 0;
                    font-size: inherit;
                    margin: 0;
                    font-family: $font-main;
                }
            }
        }

        &.left {
            align-items: flex-start;

            .chat__message-box {
                border-top-left-radius: 0;
                color: $blue-chill;

                &.default {
                  background-color: #DAEEED;
                }
                
                &.yellow {
                  background-color: rgba(249, 173, 66, 0.25);
                }

                 pre {
                    background: transparent;
                    padding: 0;
                    font-size: inherit;
                    margin: 0;
                    font-family: $font-main;
                }
            }
        }
    }

    .chat__message-info {
        font-size: 12px;
        margin-bottom: 10px;
        display: block;
        text-transform: capitalize;
    }

    .chat__message-box {
        border-radius: 20px;
        max-width: 355px;
        width: 100%;
        padding: 20px 15px;
        position: relative;

        @include mq(430px) {
            width: 95%;
        }
    }

    .message-not-sent {
        max-width: 355px;
        width: 100%;

        .message-not-sent__title {
            color: $red;
            font-weight: 600;
            font-size: 13px;
        }

        .message-not-sent__text {
            font-style: italic;
            font-size: 12px;
        }
    }

    .chat__submit-disclaimer-icon {
        position: absolute;
        top: 50%;
        left: -20px;
        transform: translateY(-50%);
        color: $red;
    }

    .chat__zoom-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .chat__zoom-message a {
      font-weight: bold;
    }
</style>