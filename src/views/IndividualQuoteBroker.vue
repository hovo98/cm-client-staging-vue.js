<template>
  <div :class="['page-dashboard page-create-deal', blockPreloader ? 'block-preloader' : '']">
    <BlockDashboardSidebar />
    <BlockBlockList
      v-if="deal"
      link-label="Back"
      :deal="deal"
      :quote="false"
      :deal-sheet="dealSheet"
      :titles="'broker'"
      :flag="'broker-quotes'"
      :is-open-chat="isOpenChat"
      @openOrCloseChat="openOrCloseChat"
    />
    <BlockQuotesBroker />

    <ChatIndex
      v-if="deal && isOpenChat && chat"
      :page="'quote'"
      :deal-id="deal.id"
      @openOrCloseChat="openOrCloseChat"
    />
    <BlockPopupSubscription
      :open="subscriptionModal"
      @close="subscriptionModal = false"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import BlockDashboardSidebar from '@/components/blocks/BlockDashboardSidebar.vue'
import BlockBlockList from '@/components/blocks/BlockBlockList.vue'
import BlockQuotesBroker from '@/components/blocks/BlockQuotesBroker.vue'
import ChatIndex from "@/components/blocks/BlockChat/ChatIndex.vue"
import BlockPopupSubscription from "@/components/blocks/BlockPopup/BlockPopupSubscription.vue"

export default Vue.extend({
  name: 'CreateDeal',

  components: {
    BlockDashboardSidebar,
    BlockBlockList,
    BlockQuotesBroker,
    ChatIndex,
    BlockPopupSubscription,
  },
  /**
   * stepStatus tells if this step is completed or not
   *  currentStep tells on what step user is
   */
  data() {
    return {
      page: 'page-create-deal',
      blockPreloader: true,
      isOpenChat: false,
      subscriptionModal: false,
    }
  },

  async beforeMount() {
    this.blockPreloader = true
    await this.$store.dispatch('individualQuoteBrokerGetDeal', { id: this.$route.params.id })
    this.blockPreloader = false
    await this.$store.dispatch("initialChatBroker", this.deal.id)

    let isChatOpen = false
    this.chat.rooms.forEach(room => {
      room.messages.forEach(msg => {
        if (msg.role === 'lender') {
          if (!msg.seen)
            isChatOpen = true
        }
      })
    })
    if (isChatOpen)
      this.isOpenChat = true
  },

  computed: {
    ...mapState({
      deal: state => state['FilterQuotes'].deal,
      dealSheet: state => state['FilterDeal'].dealSheet,
      chat: (state) => state["Chat"].chat,
    }),

    subscription() {
      return this.$store.state.Broker.subscription
    },
  },

  destroyed() {
    this.$store.dispatch('resetChat')
  },

  methods: {
    changeBlockPreloader() {
      setTimeout(() => {
        this.blockPreloader = false
      }, 500)
    },
    openOrCloseChat(data) {
      if (!this.subscription) {
        this.subscriptionModal = true
        return
      }

      this.isOpenChat = data
    },
  },
})
</script>

<style lang="scss" scoped></style>
