<template>
  <div class="chat__header">
    <span
      v-if="user.role === 'lender'"
      class="chat__header-name-wrapper"
    >
      <template v-if="name === ''">
        <span
          v-if="user.role === 'lender'"
          class="chat__header-name"
        ><SvgIcon
          class="chat__header-icon"
          icon-name="ico-message-rounded"
        /></span>
        Messages with Broker/Borrower
      </template>
      <template v-else>
        <span
          v-if="user.role === 'lender'"
          class="chat__header-name"
        ><SvgIcon
          class="chat__header-icon"
          icon-name="ico-message-rounded"
        /></span>
        {{ name }}
      </template>
    </span>
    <span
      v-if="user.role === 'broker'"
      @click="returnBack()"
    >
      <SvgIcon
        class="chat__header-icon"
        icon-name="ico-arrow"
      />
      <span>{{ name }}</span>
    </span>
    <div
      v-if="user.role === 'broker'"
      class="chat__header-close-icon-wrapper"
    >
      <button
        class="chat__header-button"
        @click="closeChat()"
      >
        <SvgIcon
          class="chat__header-close-icon"
          icon-name="ico-close-thin"
        />
      </button>
    </div>
    <span
      v-else
      class="chat__header-close-icon-wrapper"
      @click="returnBack()"
    >
      <SvgIcon
        class="chat__header-close-icon"
        icon-name="ico-close-thin"
      />
    </span>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'

    export default Vue.extend({

        props: {
            name: {
                type: String,
            },
            returnBackBroker: {
                type: Function,
            },
            returnBackLender: {
                type: Function,
            },
        },

        computed: {
            ...mapState({
                user: (state) => state['User'].user,
            }),
        },

        components: {
            SvgIcon,
        },

        data() {
            return {
                minimized: false,
            }
        },

        destroyed() {
            if(this.user.role === 'broker')
                this.$store.dispatch('currentChatId', null)
        },

        methods: {
            returnBack() {
                if(this.user.role === 'broker') {
                    this.$emit('returnBackBroker')
                } else {
                    this.$emit('returnBackLender')
                }
            },

            closeChat() {
                this.$emit('closeBrokerChat')
            },
        },
    })
</script>

<style lang="scss" scoped>
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
        // margin-right: 15px;
    }

    .chat__header-icon {
        color: $yellow-orange;
        margin-right: 10px;
    }

    .chat__header-button {
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
    }
</style>