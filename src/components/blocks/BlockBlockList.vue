<template>
  <div :class="['blockList', blockPreloader ? 'block-preloader' : '']">
    <div class="blockList-wrap">
      <div class="blockList-wrap__text">
        <h1 v-if="titles === 'broker'" class="dash-title blockList-wrap-title">
          {{
            titles === "broker"
            ? deal.location.street_address +
            ", " +
            deal.location.city +
            ", " +
            deal.location.state +
            ", " +
            deal.location.zip_code
            : deal.location.city +
            ", " +
            deal.location.state +
            ", " +
            deal.location.zip_code
          }}
        </h1>
        <h1 v-else class="dash-title blockList-wrap-title">
          {{
            titles === "broker"
            ? deal.location.street_address +
            ", " +
            deal.location.city +
            ", " +
            deal.location.state +
            ", " +
            deal.location.zip_code
            : deal.location.city +
            ", " +
            deal.location.state +
            ", " +
            deal.location.zip_code
          }}
        </h1>

        <a class="blockList-wrap__link" href="javascript:;" @click="
        titles === 'lender'
          ? $router.push({ path: '/lender-deals' })
          : $router.push({ path: '/broker-deals' })
          ">
          <SvgIcon class="blockList-wrap__link-icon" icon-name="ico-arrow-ll" />
          {{ linkLabel }}
        </a>
      </div>
      <!-- <div class="blockList-wrap__button" @click="toggleActive" v-click-outside="hideBtn">
                <button class="blockList-wrap__btn"><SvgIcon class="blockList-wrap__link-icon" iconName="ico-dots-three"/></button>
                <div class="blockList-wrap__button-drop">
                    <a class="blockList-wrap__button-drop-link" href="javascript"><SvgIcon class="blockList-wrap__button-drop-link-icon" iconName="ico-message"/>Quote</a>
                    <a class="blockList-wrap__button-drop-link" href="javascript"><SvgIcon class="blockList-wrap__button-drop-link-icon" iconName="ico-paper-plane"/>Send</a>
                    <a class="blockList-wrap__button-drop-link" href="javascript"><SvgIcon class="blockList-wrap__button-drop-link-icon" iconName="ico-print"/>Print</a>
                    <a class="blockList-wrap__button-drop-link" href="javascript"><SvgIcon class="blockList-wrap__button-drop-link-icon" iconName="ico-trash"/>Delete</a>
                </div>
            </div> -->
      <div v-if="user.role === 'broker'" class="blocklist-wrap__actions">
        <div v-if="deal.is_premium" class="blocklist-actions__premium">
          {{ deal.deal_type }}
        </div>
        <div v-else class="blocklist-actions__free">
          {{ deal.deal_type }}
        </div>
        <template v-if="titles === 'broker' && flag === 'broker-quotes'">
          <button class="open-chat-btn" @click="$emit('openOrCloseChat', !isOpenChat)">
            <SvgIcon class="open-chat-icon" icon-name="ico-message-rounded" />
            Messages
          </button>
        </template>
        <template v-else>
          <div class="blockList_-right-wrap">
            <template v-if="!flag || flag === 'broker-broker'">
              <button v-if="titles === 'lender'" class="open-chat-btn" @click="$emit('openOrCloseChat', !isOpenChat)">
                <SvgIcon class="open-chat-icon" icon-name="ico-message-rounded" />Message Broker/Borrower
              </button>
              <button v-else :class="chat && chat.rooms.length === 0 && quotes && quotes.length === 0
                ? 'open-chat-btn disabled'
                : 'open-chat-btn'
                " @click="$emit('openOrCloseChat', !isOpenChat)">
                <SvgIcon class="open-chat-icon" icon-name="ico-message-rounded" />
                Messages<span v-if="chatCountNewMsg > 0">
                  <span class="open-chat-btn-message-indicator">({{ chatCountNewMsg }})</span></span><span v-if="chat &&
                    chat.rooms.length === 0 &&
                    quotes &&
                    quotes.length === 0
                    " class="chat-btn-tooltip">You don't have any messages for this deal yet</span>
              </button>
            </template>
            <div class="dots-wrapper">
              <a v-if="titles === 'broker' && !deal.finished" class="blockList-wrap__link"
                :href="'/create-deal/' + deal.step + '/' + deal.id">Finish Deal</a>
              <PartDotsDropdown
                v-if="(quote && titles === 'lender' && !quoteStatus) || (is_skipped && titles === 'lender')"
                :quote-link="quoteLink"
                :is_skipped="is_skipped"
                :quote="quote"
                :send="false"
                :del="false"
                :print="true"
                @openPopupDelete="openPopupDelete"
                @skipDeal="skipDeal"
              />
              <PartDotsDropdown
                v-if="titles === 'broker' && flag === 'broker-broker' && !termsheet_status"
                :quote="false"
                :send="false"
                :del="true"
                :print="true"
                :is-finished="deal.finished"
                :is-premium="deal.is_premium"
                @openPopupDelete="openPopupDelete"
                @openPopupShare="openPopupShare"
                @openPopupEditDeal="openPopupEditDeal"
                @closePopupShare="closePopupShare"
                @upgradeDeal="handleUpgradeDeal"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="blockList-wrapper">
      <div class="row">
        <div class="col-xl-6 col-lg-12">
          <div class="blockList-wrapper__image">
            <GmapMap ref="mapRef" class="manage-deal-box-map__box" :center="center" :zoom="zoom" map-type-id="terrain"
              style="width: 100%; height: 300px" :options="options">
              <gmap-marker :icon="{ url: require('@/assets/images/location_pin.png') }" :position="marker" />
            </GmapMap>
          </div>
        </div>
        <div class="col-xl-6 col-lg-12">
          <div class="blockList-wrapper__boxes">
            <div class="blockList-wrapper__box">
              <span class="blockList-wrapper__box-title">Deal Info
                <span v-if="!deal.show_address && titles === 'lender'" class="tooltip-msg tooltip-msg--break-on-mobile"
                  data-tooltip="The broker has chosen to keep this property's full address hidden until after a quote is received.">
                  <SvgIcon class="tooltip-msg__icon" icon-name="ico-question" />
                </span>
                <span v-else-if="!deal.show_address && titles === 'broker'"
                  class="tooltip-msg tooltip-msg--break-on-mobile"
                  data-tooltip="You have chosen to keep this property's full address hidden from lenders until after a quote is received.">
                  <SvgIcon class="tooltip-msg__icon" icon-name="ico-question" />
                </span>
              </span>
              <a v-if="titles === 'broker' && flag === 'broker-quotes'" href="javascript:;"
                class="blockList-wrap__link blockList-wrap__link--no-underline" @click="
                  $router.push({
                    path: '/individual-deal-broker/' + $route.params.id,
                  })
                  ">Go to deal</a>
            </div>
            <div v-if="items" class="blockList-wrapper__box">
              <ul class="blockList-wrapper__box-lists">
                <template v-for="(item, index) in items">
                  <li :key="index" class="blockList-wrapper__box-list">
                    <span class="blockList-wrapper__box-list-text blockList-wrapper__box-list-text--thin"
                      v-html="item.text1" />

                    <span v-if="item.text1 === 'Date Posted'" class="blockList-wrapper__box-list-text"
                      v-html="item.text2" />

                    <span v-if="item.text1 !== 'Status' &&
                      item.text1 !== 'Date Posted' &&
                      item.text2 != 'Mixeduse'
                      " class="blockList-wrapper__box-list-text" v-html="item.text2" />

                    <span v-if="item.text2 === 'Mixeduse'" class="blockList-wrapper__box-list-text">Mixed use</span>

                    <!-- <span v-else class="blockList-wrapper__box-list-text" >Mixed use</span> -->

                    <div v-if="!statusLoader &&
                      item.text1 === 'Status' &&
                      titles === 'broker' &&
                      flag !== 'broker-quotes'
                      " v-click-outside="hide" :class="!dealSheetStatus
    ? 'blockList-wrapper__box-list-text'
    : 'blockList-wrapper__box-list-text blockList-wrapper__box-list-text-ico'
    " @click="toggleClass">
                      <template v-if="dealSheetStatus">
                        <SvgIcon class="blockList-wrapper__box-list-text-icon" icon-name="ico-arrow-df" />{{
                          changeStatusIdToText(item.text2) }}
                        <div class="blockList-wrapper__box-list-text-ico-wrap">
                          <template v-for="(ele, eleIndex) in item.option">
                            <span v-if="dealSheetStatus && eleIndex !== 0" :key="eleIndex"
                              class="blockList-wrapper__box-list-text-ico-wrap-link" @click="changeStatus(ele)">{{
                                ele.title }}</span>
                          </template>
                        </div>
                      </template>
                      <template v-else> Open </template>
                    </div>
                    <div v-if="statusLoader &&
                      item.text1 === 'Status' &&
                      titles === 'broker'
                      " class="blockList-wrapper__box-list-text blockList-wrapper__box-list-text-ico">
                      <img src="@/assets/images/loader_inline.gif" alt="loader" class="loader-inline" />
                    </div>
                    <span v-if="(!statusLoader &&
                      item.text1 === 'Status' &&
                      titles === 'lender') ||
                      (flag === 'broker-quotes' && item.text1 === 'Status')
                      " class="blockList-wrapper__box-list-text">{{ changeStatusIdToText(item.text2) }}</span>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BlockPopupDeleteIndividualDeal v-if="showPopupDelete" ref="individualDealDropdown"
      @closePopupDelete="closePopupDelete" @confirmDeleteDeal="confirmDeleteDeal" />
    <Popup v-if="showPopupShare" :send-tolender-rows="sendTolenderRows" @closePopup="closePopupShare" />
    <EditDeal v-if="editDealPopup && isDealEditable" @closePopup="closePopup" @editDeal="editDeal" />
    <NotEditableDeal v-if="editDealPopup && !isDealEditable" :until_next_edit="until_next_edit"
      @closePopup="closePopup" />
    <EditDealSuccessful v-if="editDealSuccessPopup" @closePopupSuccess="closePopupSuccess" />

    <transition name="fade-in-fast">
      <BlockPopupSubscription
        :open="subscriptionModal"
        :deal="deal.id"
        @close="subscriptionModal = false"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import SvgIcon from "@/components/base/SvgIcon/SvgIcon.vue"
import ClickOutside from "vue-click-outside"
import PartDotsDropdown from "@/components/parts/PartDotsDropdown.vue"
import BlockPopupDeleteIndividualDeal from "@/components/blocks/BlockPopup/BlockPopupDeleteIndividualDeal.vue"
import { gmapApi } from "vue2-google-maps"
import { changeDate } from "@/config/util"
import { mapState } from "vuex"
import Popup from "@/components/blocks/BlockPopup/BlockPopupSendToLender.vue"
import EditDeal from "@/components/blocks/BlockPopup/BlockPopupEditDeal.vue"
import NotEditableDeal from "@/components/blocks/BlockPopup/BlockPopupNotEditableDeal.vue"
import EditDealSuccessful from "@/components/blocks/BlockPopup/BlockPopupEditDealSuccessful.vue"
import BlockPopupSubscription from '@/components/blocks/BlockPopup/BlockPopupSubscription.vue'
import GlobalNot from '@/services/Notification'

interface Data {
  title: string;
  items;
  options;
  center;
  zoom: number;
  map;
  marker;
  statusLoader: boolean;
  showPopupDelete: boolean;
  afterDeleteStatus: boolean;
  btnLink: boolean;
  showPopupShare: boolean;
  sendTolenderRows;
  editDealPopup: boolean;
  editDealSuccessPopup: boolean;
  blockPreloader: boolean;
  subscriptionModal: boolean;
}

export default Vue.extend({
  components: {
    SvgIcon,
    PartDotsDropdown,
    BlockPopupDeleteIndividualDeal,
    Popup,
    EditDeal,
    EditDealSuccessful,
    NotEditableDeal,
    BlockPopupSubscription,
  },
  props: {
    linkLabel: {
      type: String,
      default: "Placeholder",
    },
    quote: {
      type: Boolean,
      default: true,
    },
    deal: {
      type: Object,
    },
    titles: {
      type: String,
    },
    dealSheet: {
      type: Array,
    },
    flag: {
      type: String,
    },
    is_skipped: {
      type: Boolean,
    },
    termsheet_status: {
      type: Boolean,
    },
    isOpenChat: {
      type: Boolean,
    },
    openOrCloseChat: {
      type: Function,
    },
    chatName: {
      type: String,
    },
    quotes: {},
    quoteLink: {
      type: String,
    },
    isDealEditable: {
      type: Boolean,
    },
    until_next_edit: {
      type: Number,
    },
  },

  async mounted() {
    if (this.$route.query.checkout_id) {
      const response = await this.$store.dispatch('checkPaymentStatus', this.$route.query.checkout_id)
      console.log('response', response.data.data.status, response.data.data.checkPaymentStatus.status)
      if (response.data.data.checkPaymentStatus.status === 'completed') {
        new GlobalNot('Deal upgraded successfully!', 'success')
      }
    }
    if (this.lastStepBtn) {
      this.btnLink = true
      this.$store.commit("SET_LAST_STEP_BTN")
    }
    this.setmap()
    this.setFields()
  },

  data(): Data {
    return {
      sendTolenderRows: [],
      showPopupShare: false,
      btnLink: false,
      statusLoader: false,
      map: "",
      marker: { lat: 37.09024, lng: -95.712891 },
      title: 'This is title of "BlockBlockList"!',
      items: [],
      center: { lat: 37.09024, lng: -95.712891 },
      zoom: 13,
      showPopupDelete: false,
      afterDeleteStatus: false,
      editDealPopup: false,
      editDealSuccessPopup: false,
      blockPreloader: false,
      subscriptionModal: false,
      options: {
        maxZoom: this.titles === "lender" ? 13 : 30,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        styles: [
          {
            featureType: "administrative",
            elementType: "all",
            stylers: [
              {
                saturation: "-100",
              },
            ],
          },
          {
            featureType: "administrative.province",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: 65,
              },
              {
                visibility: "on",
              },
              {
                color: "#fbfbfb",
              },
            ],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "on",
              },
              {
                color: "#f6f6f6",
              },
            ],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.stroke",
            stylers: [
              {
                visibility: "on",
              },
              {
                color: "#000000",
              },
            ],
          },
          {
            featureType: "landscape.man_made",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "landscape.man_made",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: "50",
              },
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [
              {
                saturation: "-100",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#c3c3c3",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "all",
            stylers: [
              {
                lightness: "30",
              },
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "all",
            stylers: [
              {
                lightness: "40",
              },
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "transit.line",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                hue: "#C8D7D4",
              },
              {
                lightness: -25,
              },
              {
                saturation: -97,
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "on",
              },
              {
                color: "#C8D7D4",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels",
            stylers: [
              {
                lightness: -25,
              },
              {
                saturation: -100,
              },
            ],
          },
        ],
      },
    }
  },

  computed: {
    ...mapState({
      user: (state) => state['User'].user,
    }),
    google: gmapApi,
    quoteStatus() {
      return this.$store.getters.getQuoteStatus
    },
    dealSheetStatus() {
      return this.$store.getters.getDealSheetStatus
    },
    ...mapState({
      lastStepBtn: (state) => state["CreateQuote"].lastStepBtn,
      finished_at_individual: (state) =>
        state["FilterDeal"].finished_at_individual,
      finished_at_individual_quote: (state) =>
        state["FilterQuote"].finished_at_individual,
      finished: (state) => state["FilterDeal"].finished,
      chatCountNewMsg: (state) => state["Chat"].chatCountNewMsg,
      chat: (state) => state["Chat"].chat,
    }),
  },

  watch: {
    dealSheetStatus() {
      if (this.dealSheetStatus) {
        this.items.forEach((element) => {
          if (element.text1 === "Status") {
            element.text2 = 5
          }
        })
      } else {
        this.items.forEach((element) => {
          if (element.text1 === "Status") {
            element.text2 = 1
          }
        })
      }
    },
  },

  methods: {
    skipDeal() {
      this.$emit("skipDeal")
    },

    setBlockAndLot() {
      if (this.deal.block_and_lot) {
        const block = this.deal.block_and_lot.block
        const lot = this.deal.block_and_lot.lot
        if (block !== "" && lot !== "") {
          return `, Block: ${block} Lot: ${lot}`
        } else if (block === "" && lot !== "") {
          return `, Lot: ${lot}`
        } else if (block !== "" && lot === "") {
          return `, Block: ${block}`
        } else {
          return ""
        }
      } else {
        return ""
      }
    },
    backtoQuotes() {
      this.titles === "broker"
        ? this.$router.push({ path: "/broker-quotes" })
        : this.$router.push({ path: "/lender-quotes" })
    },
    changeDateFormat(date) {
      return changeDate(date)
    },
    openPopupDelete() {
      this.showPopupDelete = true
    },
    closePopupDelete() {
      this.showPopupDelete = false
    },
    openPopupShare() {
      if (this.sendTolenderRows.length === 0)
        this.sendTolenderRows.push(this.deal.id)

      this.showPopupShare = true
    },

    openPopupEditDeal() {
      this.editDealPopup = true
    },

    closePopup() {
      this.editDealPopup = false
    },

    closePopupSuccess() {
      this.editDealSuccessPopup = false
    },

    async editDeal() {
      this.closePopup();
      (this.blockPreloader = true),
        await this.$store.dispatch("editDeal", {
          id: parseInt(this.$route.params.id),
        })
      // location.reload();
      this.editDealSuccessPopup = true
      this.blockPreloader = false
    },

    closePopupShare() {
      this.showPopupShare = false
    },
    async confirmDeleteDeal() {
      this.afterDeleteStatus = true
      await this.$store
        .dispatch("deleteDeal", [{ id: parseInt(this.$route.params.id) }])
        .then(() => {
          this.$store.dispatch("removeAllDeals")
          this.$router.push({ path: "/broker-deals" })
        })
    },
    backtoDeal() {
      this.titles === "broker"
        ? this.$router.push({ path: "/broker-deals" })
        : this.$router.push({ path: "/lender-deals" })
    },

    setmap() {
      this.$refs.mapRef.$mapPromise.then(() => {
        if (this.deal.location.lat && this.deal.location.long) {
          this.setPlace()
        }
      })
    },

    async setPlace() {
      await this.$refs.mapRef.$mapPromise.then((map) => {
        this.map = map
        map.panTo({
          lat: this.deal.location.lat,
          lng: this.deal.location.long,
        })
        const marker = {
          lat: this.deal.location.lat,
          lng: this.deal.location.long,
        }
        this.marker = marker
        const bounds = new this.google.maps.LatLngBounds()
        bounds.extend(marker)
        map.fitBounds(bounds)
        this.map.setZoom(14)
      })
    },

    hide() {
      const wrapper = document.querySelector(
        ".blockList-wrapper__box-list-text-ico",
      )
      if (wrapper) {
        wrapper.classList.remove("active")
      }
    },

    hideBtn() {
      const btn = document.querySelector(".blockList-wrap__button")
      if (btn) {
        btn.classList.remove("active-btn")
      }
    },

    toggleClass() {
      if (this.dealSheetStatus) {
        const wrapper = document.querySelector(
          ".blockList-wrapper__box-list-text-ico",
        )
        wrapper.classList.toggle("active")
      }
    },

    toggleActive() {
      const btn = document.querySelector(".blockList-wrap__button")
      if (btn) {
        btn.classList.toggle("active-btn")
      }
    },

    async changeStatus(ele) {
      ele.deal = this.deal.id
      this.statusLoader = true
      await this.$store.dispatch("changeDealStatus", ele)
      this.items.forEach((element) => {
        if (element.text1 === "Status") {
          element.text2 = ele.id
        }
      })
      this.statusLoader = false
    },

    changeStatusIdToText(val) {
      if (val) {
        if (this.dealSheet) {
          const arr = this.dealSheet.filter((ele) => ele.id === val)
          return arr[0].title
        } else {
          return "Term Sheet"
        }
      } else {
        return "Term Sheet"
      }
    },

    setFields() {
      this.items = [
        {
          text1: "Property Address",
          text2: this.checkAddress(),
        },
        {
          text1: "Deal ID",
          text2: this.deal.id,
        },
        {
          text1: "Property Type",
          text2:
            this.deal.investment_details.propType !== "UNDEFINED"
              ? this.deal.investment_details.propType.charAt(0).toUpperCase() +
              this.deal.investment_details.propType.slice(1).toLowerCase()
              : "Owner occupied",
        },
        {
          text1: "Sponsor Name",
          text2: this.deal.sponsor.sponsorInfo[0].name
            ? this.deal.sponsor.sponsorInfo[0].name
            : "/",
        },
        {
          text1: "Status",
          text2: this.deal.termsheet,
          option: this.dealSheet,
        },
        {
          text1: "Date Posted",
          text2:
            this.finished_at_individual === ""
              ? this.finished_at_individual_quote
              : this.finished_at_individual,
        },
      ]
    },

    checkAddress() {
      if (this.titles === "broker") {
        if (this.deal.location.street_address_2) {
          return (
            this.deal.location.street_address +
            ", " +
            this.deal.location.street_address_2 +
            ", " +
            this.deal.location.city +
            ", " +
            this.deal.location.state +
            ", " +
            this.deal.location.zip_code +
            "" +
            this.setBlockAndLot()
          )
        } else {
          return (
            this.deal.location.street_address +
            ", " +
            this.deal.location.city +
            ", " +
            this.deal.location.state +
            ", " +
            this.deal.location.zip_code +
            "" +
            this.setBlockAndLot()
          )
        }
      } else {
        if (this.deal.show_address) {
          if (this.deal.location.street_address_2) {
            return (
              this.deal.location.street_address +
              ", " +
              this.deal.location.street_address_2 +
              ", " +
              this.deal.location.city +
              ", " +
              this.deal.location.state +
              ", " +
              this.deal.location.zip_code +
              "" +
              this.setBlockAndLot()
            )
          } else {
            return (
              this.deal.location.street_address +
              ", " +
              this.deal.location.city +
              ", " +
              this.deal.location.state +
              ", " +
              this.deal.location.zip_code +
              "" +
              this.setBlockAndLot()
            )
          }
        } else {
          return (
            this.deal.location.city +
            ", " +
            this.deal.location.state +
            ", " +
            this.deal.location.zip_code +
            "" +
            this.setBlockAndLot()
          )
        }
      }
    },

    handleUpgradeDeal() {
      this.subscriptionModal = true
    },
  },

  directives: {
    ClickOutside,
  },
})
</script>

<style lang="scss" scoped>
.blockList {
  padding-left: 42px;
  padding-right: 52px;

  @include mq($xl) {
    padding: 0 20px;
  }
}

.blockList-wrap-title {
  @include mq($lg) {
    text-align: left;
  }
}

.blockList-wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @include mq(768px) {
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column-reverse;
    width: 100%;
  }
}

.blocklist-wrap__actions {
  display: flex;
  align-items: start;

  &>.blocklist-actions__premium {
    background-color: $yellow-orange;
    padding: 8px 20px;
    margin-top: 3px;
    border-radius: 22px;
    margin-right: 20px;
    font-weight: 500;
    font-size: 14px;
  }

  &>.blocklist-actions__free {
    background-color: $grey-light;
    padding: 8px 20px;
    margin-top: 3px;
    border-radius: 22px;
    margin-right: 20px;
    font-weight: 500;
    font-size: 14px;
  }
}

.blockList-wrap__link {
  display: inline-block;
  position: relative;
  color: $mosque;
  font-family: $font-main;
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  margin-top: 16px;
  padding-left: 25px;
  transition: $dur $ease;

  &.blockList-wrap__link--no-underline {
    text-decoration: none;
  }

  @include hover {
    color: $yellow-orange;
  }

  .blockList-wrap__link-icon {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  @include mq($xl) {
    margin-top: 10px;
  }

  @include mq($sm) {
    font-size: 13px;
    padding-left: 20px;
    margin-top: 6px;
  }
}

.blockList-wrap__button {
  position: relative;

  &.active-btn {
    .blockList-wrap__button-drop {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }
  }
}

.blockList-wrap__button {
  position: relative;

  &.active-btn {
    .blockList-wrap__button-drop {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }
  }
}

.blockList-wrap__btn {
  position: relative;
  width: 49px;
  height: 20px;
  background-color: rgba(12, 142, 139, 0.1);
  border-radius: 4px;
  border: none;
  transition: $dur $ease;

  .blockList-wrap__link-icon {
    @include center;
    color: $blue-chill;
    font-size: 24px;
    transition: $dur $ease;
  }

  &:hover {
    background-color: $blue-chill;

    .blockList-wrap__link-icon {
      color: $grey-light;
    }
  }

  &:focus {
    outline: none;
  }
}

.blockList-wrap__button-drop {
  display: flex;
  flex-direction: column;
  min-width: 214px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  background: $white;
  padding: 16px 0 14px 19px;
  position: absolute;
  top: 23px;
  right: 0;
  z-index: 5;
  transition: $dur $ease;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  @include mq(450px) {
    min-width: 190px;
    top: 33px;
  }
}

.blockList-wrap__button-drop-link {
  position: relative;
  font-size: 14px;
  font-family: $font-main;
  font-weight: 700;
  line-height: 30px;
  color: $mosque;
  padding-left: 23px;
  margin-top: 4px;
  transition: $dur $ease;

  &:first-child {
    margin-top: 0;
  }

  @include hover {
    color: $yellow-orange;
  }

  @include mq(450px) {
    font-size: 13px;
    padding-left: 20px;
  }
}

.blockList-wrap__button-drop-link-icon {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);

  @include mq(450px) {
    font-size: 12px;
  }
}

.blockList-wrapper {
  margin-top: 27px;
}

.blockList-wrapper__image {
  position: relative;
  width: 100%;
  height: 258px;
  overflow: hidden;
}

.blockList-wrapper__boxes {
  background-color: $fantasy;
  padding: 20px 30px 15px;
  height: 100%;

  @include mq($xl) {
    margin-top: 20px;
  }

  @include mq($sm) {
    padding: 15px;
  }
}

.blockList-wrapper__box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 17px;

  &:first-child {
    margin-top: 0;
  }

  @include mq($sm) {
    margin-top: 10px;
  }
}

.blockList-wrapper__box-lists {
  min-width: 100%;
}

.blockList-wrapper__box-list {
  position: relative;
  display: flex;
  justify-content: space-between;
  min-width: 100%;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 4px;
    width: 100%;
    background: radial-gradient(ellipse at center,
        #9da0ae 0%,
        #9da0ae 20%,
        transparent 30%);
    background-repeat: repeat-x;
    background-size: 1%;
  }

  &::before {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: $mosque;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    z-index: 5;
  }

  &:last-child {
    &::before {
      display: none;
    }
  }

  @include mq($sm) {
    flex-direction: column;
    justify-content: flex-start;
    padding: 4px 0;

    &::after {
      display: none;
    }

    &::before {
      opacity: 50%;
      visibility: visible;
      pointer-events: all;
    }
  }
}

.blockList-wrapper__box-title {
  font-size: 16px;
  color: $shark;
  font-family: $font-main;
  font-weight: 600;
  line-height: 1.2;

  @include mq($sm) {
    font-size: 14px;
  }
}

.blockList-wrapper__box-link {
  font-size: 14px;
  font-family: $font-main;
  color: $mosque;
  font-weight: 700;
  transition: $dur $ease;

  &:hover {
    color: $yellow-orange;
  }

  @include mq($sm) {
    font-size: 13px;
  }
}

.blockList-wrapper__box-list-text {
  display: flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  font-family: $font-main;
  color: $shark;
  font-weight: 600;
  line-height: 29px;
  background-color: $fantasy;
  padding-left: 11px;
  z-index: 2;
  transition: $dur $ease;
  max-width: 660px;
  margin-bottom: 7px;
  line-height: 21px;

  @include mq($sm) {
    padding-left: 0;
    font-size: 13px;
    line-height: 1.9;
  }
}

.blockList-wrapper__box-list {
  .blockList-wrapper__box-list-text:last-child {
    text-align: right;
  }
}

.blockList-wrapper__box-list-text-icon {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 9px;

  @include mq($sm) {
    right: auto;
    left: 106px;
  }
}

.blockList-wrapper__box-list-text--thin {
  font-weight: 400;
  padding-left: 0;
  padding-right: 11px;
}

.blockList-wrapper__box-list-text-ico {
  padding-right: 16px;
  cursor: pointer;
  z-index: 5;

  &:hover {
    color: $yellow-orange;
  }

  &.active {
    .blockList-wrapper__box-list-text-ico-wrap {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }
  }
}

.blockList-wrapper__box-list-text-ico-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 140px;
  background: $white;
  padding: 10px 15px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 30px;
  right: 0;
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: $dur $ease;

  @include mq($sm) {
    min-width: 120px;
    padding: 10px;
    right: auto;
    left: 80px;
    top: 27px;
  }
}

.blockList-wrapper__box-list-text-ico-wrap-link {
  font-size: 14px;
  font-family: $font-main;
  color: $mosque;
  display: block;
  transition: $dur $ease;

  &:hover {
    color: $yellow-orange;
  }

  @include mq($sm) {
    font-size: 13px;
  }
}

.tooltip-msg::before {
  @include mq(767px) {
    left: 0;
  }
}

.dots-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  @include mq(374px) {
    flex-direction: column-reverse;
    align-items: flex-end;
  }
}

.blockList_-right-wrap {
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  .blockList-wrap__link {
    margin: 8px 20px 0;
    font-weight: 800;
    min-width: 74px;

    @include mq(768px) {
      margin: 6px 10px 0;
      padding: 0;
      width: 100%;
      justify-content: space-between;
    }

    @include mq(374px) {
      margin: 6px 0 0;
    }
  }

  @include mq(768px) {
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
    flex-direction: row;
  }

  @include mq(360px) {
    flex-direction: column-reverse;
  }
}

.open-chat-btn {
  min-width: 209px;
  // width: 100%;
  height: 43px;
  font-size: 13px;
  font-weight: 600;
  color: $white;
  background-color: $yellow-orange;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 2px solid transparent;
  transition: $dur $ease;
  padding: 0 30px;

  @include mq(768px) {
    min-width: 153px;
    height: 35px;
  }

  @include mq(360px) {
    min-width: 100%;
    margin-top: 19px;
  }

  @include hover {
    border: 2px solid $yellow-orange;
    color: $yellow-orange;
    background-color: $white;
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
</style>
