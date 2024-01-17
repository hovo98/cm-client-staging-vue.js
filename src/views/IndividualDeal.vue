<template>
  <div
    :class="[
      'page-dashboard page-create-deal',
      blockPreloader ? 'block-preloader' : '',
    ]"
  >
    <BlockDashboardSidebar />
    <BlockBlockList
      v-if="deal && quotes"
      link-label="Back to Deals"
      :deal="deal"
      :quote="checkQuote()"
      :deal-sheet="dealSheet"
      :titles="'lender'"
      :is_skipped="is_skipped"
      :chat-name="chatName"
      :is-open-chat="isOpenChat"
      :quote-link="quotes.quoteLink"
      @skipDeal="skipDeal"
      @openOrCloseChat="openOrCloseChat"
    />
    <BlockIndividualQuoteTable
      v-if="quotes && quotes.quotes.length > 0"
      :quotes="quotes"
    />
    <div class="individualDeal__wrapper">
      <div
        v-if="deal && deal.loan_type === 'CONSTRUCTION'"
        class="row"
      >
        <div
          v-if="tablesLoanDetails[0].items.length > 0"
          class="col-xl-6"
        >
          <PartAccordion :tables="tablesLoanDetails" />
        </div>
        <div
          v-if="tablesConstructionDetails[0].items.length > 0"
          class="col-xl-6"
        >
          <PartAccordion :tables="tablesConstructionDetails" />
        </div>
        <div
          v-if="tablesProjectExspenses[0].items.length > 0"
          class="col-xl-6"
        >
          <PartAccordion :tables="tablesProjectExspenses" />
        </div>
        <div
          v-if="tablesSponsorDetails[0].items.length > 0"
          class="col-xl-6"
        >
          <PartAccordion :tables="tablesSponsorDetails" />
        </div>

        <div
          v-if="tablesAdditionalNotes[0].items.length > 0"
          class="col-xl-12"
        >
          <PartAccordion
            :tables="tablesAdditionalNotes"
            :additional-notes="true"
          />
        </div>
      </div>
      <div
        v-if="deal && deal.loan_type === 'PURCHASE'"
        class="row"
      >
        <div
          v-if="tablesLoanDetailsPurches[0].items.length > 0"
          class="col-xl-6"
        >
          <PartAccordion :tables="tablesLoanDetailsPurches" />
        </div>
        <div
          v-if="tablesPurchaseDetails[0].items.length > 0"
          class="col-xl-6"
        >
          <PartAccordion :tables="tablesPurchaseDetails" />
        </div>
        <div class="col-xl-12">
          <BlockIndividualDealBrokerRentRoll
            v-if="tablesRentRoll[0].items.length !== 0"
            :table="tablesRentRoll"
            :name="deal.show_address"
            :occupied_total="deal.rent_roll.occupiedGroos"
            :annual_sf_total="deal.rent_roll.annual_sf_total"
            :annual_total="deal.rent_roll.annual_total"
            :monthle_total="deal.rent_roll.monthle_total"
          />
        </div>
        <div
          v-if="tablesPropertyExpenses[0].items.length > 0"
          class="col-xl-6"
        >
          <PartAccordion :tables="tablesPropertyExpenses" />
        </div>
        <div
          v-if="tablesSponsorDetails[0].items.length > 0"
          class="col-xl-6"
        >
          <PartAccordion :tables="tablesSponsorDetails" />
        </div>

        <div
          v-if="tablesAdditionalNotes[0].items.length > 0"
          class="col-xl-12"
        >
          <PartAccordion
            :tables="tablesAdditionalNotes"
            :additional-notes="true"
          />
        </div>
      </div>
      <div
        v-if="
          (deal && deal.loan_type === 'REFINANCE') ||
            (deal && deal.loan_type === 'OWNER_OCCUPIED')
        "
        class="row"
      >
        <div
          v-if="tablesLoanDetailsOwner[0].items.length > 0"
          class="col-xl-6"
        >
          <PartAccordion :tables="tablesLoanDetailsOwner" />
        </div>
        <div
          v-if="tablesRefinanceDetails[0].items.length > 0"
          class="col-xl-6"
        >
          <PartAccordion :tables="tablesRefinanceDetails" />
        </div>
        <div class="col-xl-12">
          <BlockIndividualDealBrokerRentRoll
            v-if="tablesRentRoll[0].items.length !== 0"
            :table="tablesRentRoll"
            :name="deal.show_address"
            :occupied_total="deal.rent_roll.occupiedGroos"
            :annual_sf_total="deal.rent_roll.annual_sf_total"
            :annual_total="deal.rent_roll.annual_total"
            :monthle_total="deal.rent_roll.monthle_total"
          />
        </div>
        <div
          v-if="tablesPropertyExpenses[0].items.length > 0"
          class="col-xl-6"
        >
          <PartAccordion :tables="tablesPropertyExpenses" />
        </div>
        <div
          v-if="tablesSponsorDetails[0].items.length > 0"
          class="col-xl-6"
        >
          <PartAccordion :tables="tablesSponsorDetails" />
        </div>

        <div
          v-if="tablesAdditionalNotes[0].items.length > 0"
          class="col-xl-12"
        >
          <PartAccordion
            :tables="tablesAdditionalNotes"
            :additional-notes="true"
          />
        </div>
      </div>
    </div>
    <BlockIndividualDealSlider :deal="deal" />
    <PartCreateQuote
      v-if="quotes"
      :count="checkCountQuotes()"
      :is_skipped="is_skipped"
      :deal="deal"
      :block-preloader="blockPreloader"
      :is-open-chat="isOpenChat"
      :quote-link="quotes.quoteLink"
      @skipDeal="skipDeal"
      @openOrCloseChat="openOrCloseChat"
    />

    <BlockPopupSkipDeal
      v-if="skipDealCom"
      @closePopUpSkipDeal="closePopUpSkipDeal"
    />
    <ChatIndex
      v-if="deal && isOpenChat && chat"
      :deal-id="deal.id"
      :chat-name="chatName"
      :room-id="roomId"
      @openOrCloseChat="openOrCloseChat"
    />

    <BlockPopupDealDrafted v-if="dealDraftedPopup" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import BlockDashboardSidebar from "@/components/blocks/BlockDashboardSidebar.vue"
import BlockBlockList from "@/components/blocks/BlockBlockList.vue"
import BlockIndividualDealSlider from "@/components/blocks/BlockIndividualDealSlider.vue"
import BlockIndividualQuoteTable from "@/components/blocks/BlockIndividualQuoteTable.vue"
import PartCreateQuote from "@/components/parts/PartCreateQuote.vue"
import PartAccordion from "@/components/parts/PartAccordion.vue"
import BlockIndividualDealBrokerRentRoll from "@/components/blocks/BlockIndividualDealBrokerRentRoll.vue"
import BlockPopupSkipDeal from "@/components/blocks/BlockPopup/BlockPopupSkipDeal.vue"
import ChatIndex from "@/components/blocks/BlockChat/ChatIndex.vue"
import { mapState } from "vuex"
import BlockPopupDealDrafted from '@/components/blocks/BlockPopup/BlockPopupDealDrafted.vue'
import {
  formatNumber,
  changeEnum,
  changeDate,
  arrayToStringCommaUppercaseFirst,
} from "@/config/util"

export default Vue.extend({
  name: "IndividualDeal",
  /**
   * stepStatus tells if this step is completed or not
   *  currentStep tells on what step user is
   */
  data() {
    return {
      roomId: null,
      chatName: '',
      isOpenChat: false,
      quote: false,
      page: "individual-deal",
      blockPreloader: true,
      skipDealCom: false,
      tablesLoanDetails: [
        {
          title: "Loan Details",
          items: [],
        },
      ],
      tablesConstructionDetails: [
        {
          title: "Construction Details",
          items: [],
        },
      ],
      tablesProjectExspenses: [
        {
          title: "Projected Expenses",
          items: [],
        },
      ],
      tablesSponsorDetails: [
        {
          title: "Summary of PFS",
          items: [],
        },
      ],
      tablesLoanDetailsPurches: [
        {
          title: "Loan Details",
          items: [],
        },
      ],
      tablesPurchaseDetails: [
        {
          title: "Purchase Details",
          items: [],
        },
      ],
      tablesPropertyExpenses: [
        {
          title: "Income and Expenses",
          items: [],
        },
      ],
      tablesAdditionalNotes: [
        {
          title: 'Additional Details',
          items: [],
        },
      ],
      tablesRefinanceDetails: [
        {
          title: "Refinance details",
          items: [],
        },
      ],
      tablesLoanDetailsOwner: [
        {
          title: "Loan details",
          items: [],
        },
      ],
      tablesRentRoll: [
        {
          title: "Current Rent Roll",
          items: [],
        },
      ],
      dealDraftedPopup: false,
    }
  },

  computed: {
    ...mapState({
      deal: (state) => state["FilterDeal"].deal,
      quotes: (state) => state["FilterDeal"].dealQuotes,
      dealSheet: (state) => state["FilterDeal"].dealSheet,
      is_skipped: (state) => state["FilterDeal"].is_skipped,
      chat: (state) => state["Chat"].chat,
    }),
  },

  watch: {
    isOpenChat() {
      if(this.isOpenChat) {
        this.$store.dispatch('isChatOpen', true)
      } else {
        this.$store.dispatch('isChatOpen', false)
      }
    },
  },

  async beforeMount() {
    if(this.$route.query.room) {
      this.roomId = this.$route.query.room
      this.isOpenChat = true
    }

    await this.$store.dispatch('resetChat')

    try {
      const data = await this.$store.dispatch("getDealByIdFilter", {
        id: this.$route.params.id,
      })

        const dealID = this.$route.params.id
        const dealObject_ = await this.$store.dispatch("getDealByIdQuote", {id: dealID})
        const dealStatus = dealObject_.data.data.dealObject.deal.finished

      if (data.data.data.dealObject.status) {
        await this.$store.dispatch("initialChatLender", this.deal.id)
        this.chatName = data.data.data.dealObject.name
        await this.$store.dispatch("getQuoteByDealFilter", {
          id: this.$route.params.id,
        })
        this.setLogic()
        this.blockPreloader = false
      } else {
        // If dealStatus is false, it means the deal is in drafts and it won't be saved. And popup will be shown.
        if(dealStatus || data.data.data.dealObject.quoted) {
          this.dealDraftedPopup = false
          this.$store.dispatch("acceptedDealRedirectChange", true)
          this.$router.push({ path: "/lender-deals" })
        } else {
          this.dealDraftedPopup = true
        }
          
      }
    } catch (error) {
        this.$store.dispatch("dealDoesntExistChange", true)
        this.$router.push({ path: "/lender-deals" })
    }
  },

  destroyed() {
    this.$store.dispatch('currentChatId', null)
  },

  components: {
    BlockDashboardSidebar,
    BlockBlockList,
    BlockIndividualDealSlider,
    BlockIndividualQuoteTable,
    PartCreateQuote,
    PartAccordion,
    BlockIndividualDealBrokerRentRoll,
    BlockPopupSkipDeal,
    ChatIndex,
    BlockPopupDealDrafted,
  },

  methods: {
    totalForPropertyExpenses() {
      let total =
        parseInt(this.deal.expenses.taxNumber ? this.deal.expenses.taxNumber : 0) +
        parseInt(this.deal.expenses.insurance ? this.deal.expenses.insurance : 0) +
        parseInt(this.deal.expenses.payrollAmount ? this.deal.expenses.payrollAmount : 0)+
        parseInt(this.deal.expenses.electricityAmount ? this.deal.expenses.electricityAmount : 0)+
        parseInt(this.deal.expenses.gasAmount ? this.deal.expenses.gasAmount : 0)+
        parseInt(this.deal.expenses.waterAmount ? this.deal.expenses.waterAmount : 0)+
        parseInt(this.deal.expenses.commonAreaAmount ? this.deal.expenses.commonAreaAmount : 0)+
        parseInt(this.deal.expenses.legal ? this.deal.expenses.legal : 0)+
        parseInt(this.deal.expenses.managementAmount ? this.deal.expenses.managementAmount : 0)+
        parseInt(this.deal.expenses.repairs ? this.deal.expenses.repairs : 0)+
        parseInt(this.deal.expenses.elevatorMaintenanceAmount ? this.deal.expenses.elevatorMaintenanceAmount : 0)

      if(this.deal.expenses.otherExpenses && this.deal.expenses.otherExpenses.length > 0) {
        this.deal.expenses.otherExpenses.forEach(ele => {
          if(ele.amount) {
            total += parseInt(ele.amount.replace(/,/g, ''))
          }
        })
      }

      if (isNaN(total) || total === 0) {
        return '$0'
      }

      return "$" + this.formatDollars(total)
    },

    totalCostsForConstruction() {
      let total =
        parseInt(this.deal.construction.land_cost ? this.deal.construction.land_cost : 0) +
        parseInt(this.deal.construction.soft_cost ? this.deal.construction.soft_cost : 0) +
        parseInt(this.deal.construction.hard_cost ? this.deal.construction.hard_cost : 0)
        
      if (isNaN(total) || total === 0) {
        return '$0'
      }

      return "$" + this.formatDollars(total)
    },

    checkPrimaryAndFallBack() {
      let flag = false
      this.deal.construction.projectionMixedUse.forEach(projection => {
        let plansOrder;
        (projection.plans === 'sell')
          ? plansOrder = ['sell', 'rent']
          : plansOrder = ['rent', 'sell']

        plansOrder.forEach((element, index) => {
          if(element === 'sell') {
            if(index === 1) {
              if(projection.projections !== '') {
                flag = true
              }
            }
          } else {
              if(index === 1) {
                if(projection.rental_per !== '') {
                  flag = true
                }
              }
          }
        })
      })
      return flag
    },
    openOrCloseChat(data) {
      this.isOpenChat = data
    },
    setLenderType(arr) {
      if (arr.length === 0) {
        return ""
      }
      let str = ""
      arr.forEach((ele) => {
        if (ele === 1) {
          str += "Hard Money/Bridge, "
        } else if (ele === 3) {
          str += "CMBS, "
        } else if (ele === 2) {
          str += "Agency, "
        } else if (ele === 4) {
          str += "Balance Sheet, "
        }
      })
      str = str.substring(0, str.length - 2)
      return str
    },
    constructionNameTotalIncome() {
      let str = ""
      const arr = []

      if (this.deal.investment_details.mixedUse.length !== 0) {
        if (
          this.deal.construction.retail_rental_amount &&
          this.deal.construction.retail_rental_amount !== ""
        ) {
          arr.push("RETAIL")
        }
        if (
          this.deal.construction.office_rental_amount &&
          this.deal.construction.office_rental_amount !== ""
        ) {
          arr.push("OFFICE")
        }
        if (
          this.deal.construction.multifamily_rental_amount &&
          this.deal.construction.multifamily_rental_amount !== ""
        ) {
          arr.push("MULTIFAMILY")
        }
        if (
          this.deal.construction.industrial_rental_amount &&
          this.deal.construction.industrial_rental_amount !== ""
        ) {
          arr.push("INDUSTRIAL")
        }
      }

      if (arr.length === 1) {
        str = arr[0]
      } else if (arr.length === 2) {
        str = `${arr[0]} AND ${arr[1]}`
      } else if (arr.length === 3) {
        str = `${arr[0]}, ${arr[1]} AND ${arr[2]}`
      } else if (arr.length === 4) {
        str = `${arr[0]}, ${arr[1]}, ${arr[2]} AND ${arr[3]}`
      }

      return str + " PROJECTED NET OPERATING INCOME (Rental Scenario)"
    },
    constructionNameNetProfites() {
      let str = ""
      const arr = []

      if (this.deal.investment_details.mixedUse.length !== 0) {
        if (
          this.deal.construction.retail_sales_amount &&
          this.deal.construction.retail_sales_amount !== ""
        ) {
          arr.push("RETAIL")
        }
        if (
          this.deal.construction.office_sales_amount &&
          this.deal.construction.office_sales_amount !== ""
        ) {
          arr.push("OFFICE")
        }
        if (
          this.deal.construction.multifamily_sales_amount &&
          this.deal.construction.multifamily_sales_amount !== ""
        ) {
          arr.push("MULTIFAMILY")
        }
        if (
          this.deal.construction.industrial_sales_amount &&
          this.deal.construction.industrial_sales_amount !== ""
        ) {
          arr.push("INDUSTRIAL")
        }
      }

      if (arr.length === 1) {
        str = arr[0]
      } else if (arr.length === 2) {
        str = `${arr[0]} AND ${arr[1]}`
      } else if (arr.length === 3) {
        str = `${arr[0]}, ${arr[1]} AND ${arr[2]}`
      } else if (arr.length === 4) {
        str = `${arr[0]}, ${arr[1]}, ${arr[2]} AND ${arr[3]}`
      }

      return str + " PROJECTED NET PROFITS (Sales Scenario)"
    },
    constructionTotalNetProfites() {
      let total = 0
      let shl = 0

      if(this.deal.construction.land_cost) 
        shl += parseInt(this.deal.construction.land_cost)

      if(this.deal.construction.hard_cost) 
        shl += parseInt(this.deal.construction.hard_cost)

      if(this.deal.construction.soft_cost) 
        shl += parseInt(this.deal.construction.soft_cost)

      if (isNaN(shl)) {
        return total
      }

      if (this.deal.investment_details.mixedUse.length === 0) {
        if (
          this.deal.construction.projections &&
          this.deal.construction.projections !== ""
        ) {
          // if sales
          if (this.deal.construction.projections === "unit") {
            // if sales = unit || per sf || both
            let salesProjection =
              parseInt(this.deal.construction.projections_sales) *
              parseInt(this.deal.construction.amount_units)
            if (!isNaN(salesProjection - shl)) {
              total = salesProjection - shl
            }
          } else if (this.deal.construction.projections === "sf") {
            let salesProjection =
              parseInt(this.deal.construction.projections_sales) *
              parseInt(this.deal.construction.square_footage)
            if (!isNaN(salesProjection - shl)) {
              total = salesProjection - shl
            }
          } else if (this.deal.construction.projections === "both") {
            let salesProjection =
              parseInt(this.deal.construction.projections_per_units) *
              parseInt(this.deal.construction.amount_units)
            if (!isNaN(salesProjection - shl)) {
              total = salesProjection - shl
            }
          }
        }
      } else {
        let retailCount = 0
        if (
          this.deal.construction.retail_sales_amount &&
          this.deal.construction.retail_sales_amount !== ""
        ) {
          if (
            !isNaN(
              parseInt(this.deal.construction.retail_sales_amount) *
                parseInt(this.deal.investment_details.amountOfUnits),
            )
          ) {
            retailCount +=
              parseInt(this.deal.construction.retail_sales_amount) *
              parseInt(this.deal.investment_details.amountOfUnits)
          } else {
            retailCount +=
              parseInt(this.deal.construction.retail_sales_amount) *
              parseInt(this.deal.investment_details.retailAmount)
          }
        }

        if (
          this.deal.construction.office_sales_amount &&
          this.deal.construction.office_sales_amount !== ""
        ) {
          if (
            !isNaN(
              parseInt(this.deal.construction.office_sales_amount) *
                parseInt(this.deal.investment_details.officeAmountOfunits),
            )
          ) {
            retailCount +=
              parseInt(this.deal.construction.office_sales_amount) *
              parseInt(this.deal.investment_details.officeAmountOfunits)
          } else {
            retailCount +=
              parseInt(this.deal.construction.retail_sales_amount) *
              parseInt(this.deal.investment_details.officeAmount)
          }
        }

        if (
          this.deal.construction.multifamily_sales_amount &&
          this.deal.construction.multifamily_sales_amount !== ""
        ) {
          if (
            !isNaN(
              parseInt(this.deal.construction.multifamily_sales_amount) *
                parseInt(this.deal.investment_details.multiAmountOfUnits),
            )
          ) {
            retailCount +=
              parseInt(this.deal.construction.multifamily_sales_amount) *
              parseInt(this.deal.investment_details.multiAmountOfUnits)
          } else {
            retailCount +=
              parseInt(this.deal.construction.retail_sales_amount) *
              parseInt(this.deal.investment_details.multiAmount)
          }
        }

        if (
          this.deal.construction.industrial_sales_amount &&
          this.deal.construction.industrial_sales_amount !== ""
        ) {
          if (
            !isNaN(
              parseInt(this.deal.construction.industrial_sales_amount) *
                parseInt(this.deal.investment_details.industrialAmountOfUnits),
            )
          ) {
            retailCount +=
              parseInt(this.deal.construction.industrial_sales_amount) *
              parseInt(this.deal.investment_details.industrialAmountOfUnits)
          } else {
            retailCount +=
              parseInt(this.deal.construction.retail_sales_amount) *
              parseInt(this.deal.investment_details.warehouseAmount)
          }
        }
        if (retailCount !== 0) {
          if (!isNaN(retailCount - shl)) {
            total = retailCount - shl
          }
        }
      }

      if (total === 0) {
        return ""
      } else {
        return "$" + this.formatDollars(total)
      }
    },
    constructionTotalOperatingIncomeOnly() {
      let total = 0
      let shl = 0

      if(this.deal.construction.land_cost) 
        shl += parseInt(this.deal.construction.land_cost)

      if(this.deal.construction.hard_cost) 
        shl += parseInt(this.deal.construction.hard_cost)

      if(this.deal.construction.soft_cost) 
        shl += parseInt(this.deal.construction.soft_cost)

      if (isNaN(shl))
        return total

      let expensesTotal = 0
      const keyArr = ['taxNumber', 'insurance', 'repairs', 'payrollAmount', 'electricityAmount', 'gasAmount', 'waterAmount', 'commonAreaAmount', 'legal', 'managementAmount', 'elevatorMaintenanceAmount']
      keyArr.forEach(key => {
        if(this.deal.expenses[key]) {
          if (!isNaN(parseInt(this.deal.expenses[key]))) {
            expensesTotal += parseInt(this.deal.expenses[key])
          }
        }
      })
      if(this.deal.expenses.otherExpenses && this.deal.expenses.otherExpenses.length > 0) {
        this.deal.expenses.otherExpenses.forEach(ele => {
          if(ele.amount) {
            let regex = /[.,\s]/g
            let result = ele.amount.replace(regex, '')
            expensesTotal += parseInt(result)
          }
        })
      }

      if (this.deal.investment_details.mixedUse.length === 0) { // if not mixed use
        if (this.deal.construction.rental_per === "unit") {
          let rentalProjection = parseInt(this.deal.construction.rental_amount) * parseInt(this.deal.construction.amount_units)
          if (!isNaN(rentalProjection - expensesTotal))
            total = rentalProjection - expensesTotal
        } else if (this.deal.construction.rental_per === "sf") {
          let rentalProjection = parseInt(this.deal.construction.rental_amount) * parseInt(this.deal.construction.square_footage)
          if (!isNaN(rentalProjection - expensesTotal))
            total = rentalProjection - expensesTotal
        } else if (this.deal.construction.rental_per === "both") {
          let rentalProjection = parseInt(this.deal.construction.rental_projections_per_units) * parseInt(this.deal.construction.amount_units)
          if (!isNaN(rentalProjection - expensesTotal))
            total = rentalProjection - expensesTotal
        }
      } else {
        let retailCount = 0
        if (this.deal.construction.retail_rental_amount && this.deal.construction.retail_rental_amount !== "")
				retailCount += parseInt(this.deal.construction.retail_rental_amount) * parseInt(this.deal.investment_details.amountOfUnits ? this.deal.investment_details.amountOfUnits : this.deal.investment_details.retailAmount)

			if (this.deal.construction.office_rental_amount && this.deal.construction.office_rental_amount !== "") 
				retailCount += parseInt(this.deal.construction.office_rental_amount) * parseInt(this.deal.investment_details.officeAmountOfunits ? this.deal.investment_details.officeAmountOfunits : this.deal.investment_details.officeAmount)

			if (this.deal.construction.multifamily_rental_amount && this.deal.construction.multifamily_rental_amount !== "")
				retailCount += parseInt(this.deal.construction.multifamily_rental_amount) * parseInt(this.deal.investment_details.multiAmountOfUnits ? this.deal.investment_details.multiAmountOfUnits : this.deal.investment_details.multiAmount)

			if (this.deal.construction.industrial_rental_amount && this.deal.construction.industrial_rental_amount !== "")
				retailCount += parseInt(this.deal.construction.industrial_rental_amount) * parseInt(this.deal.investment_details.industrialAmountOfUnits ? this.deal.investment_details.industrialAmountOfUnits : this.deal.investment_details.warehouseAmount)
        
        if (retailCount !== 0)
          total = retailCount - expensesTotal
      }
      if (total === 0) { 
        return ""
      } else {
        return "$" + this.formatDollars(total)
      }
    },
    constructionTotalOperatingIncome() {
      let total = 0
      let shl = 0

      if(this.deal.construction.land_cost) 
        shl += parseInt(this.deal.construction.land_cost)

      if(this.deal.construction.hard_cost) 
        shl += parseInt(this.deal.construction.hard_cost)

      if(this.deal.construction.soft_cost) 
        shl += parseInt(this.deal.construction.soft_cost)
        
      if (isNaN(shl)) {
        return total
      }

      if (this.deal.investment_details.mixedUse.length === 0) {
        if (
          this.deal.construction.rental_per &&
          this.deal.construction.rental_per !== ""
        ) {
          // if rental
          if (this.deal.construction.rental_per === "unit") {
            // if sales = unit || per sf || both
            let rentalProjection =
              parseInt(this.deal.construction.rental_amount) *
              parseInt(this.deal.construction.amount_units)
            if (!isNaN(rentalProjection - shl)) {
              total = rentalProjection - shl
            }
          } else if (this.deal.construction.rental_per === "sf") {
            let rentalProjection =
              parseInt(this.deal.construction.rental_amount) *
              parseInt(this.deal.construction.square_footage)
            if (!isNaN(rentalProjection - shl)) {
              total = rentalProjection - shl
            }
          } else if (this.deal.construction.rental_per === "both") {
            let rentalProjection =
              parseInt(this.deal.construction.rental_projections_per_units) *
              parseInt(this.deal.construction.amount_units)
            if (!isNaN(rentalProjection - shl)) {
              total = rentalProjection - shl
            }
          }
        }
      } else {
        let retailCount = 0
        if (
          this.deal.construction.retail_rental_amount &&
          this.deal.construction.retail_rental_amount !== ""
        ) {
          retailCount +=
            parseInt(this.deal.construction.retail_rental_amount) *
            parseInt(this.deal.investment_details.amountOfUnits ? this.deal.investment_details.amountOfUnits : this.deal.investment_details.retailAmount)
        }

        if (
          this.deal.construction.office_rental_amount &&
          this.deal.construction.office_rental_amount !== ""
        ) {
          retailCount +=
            parseInt(this.deal.construction.office_rental_amount) *
            parseInt(this.deal.investment_details.officeAmountOfunits ? this.deal.investment_details.officeAmountOfunits : this.deal.investment_details.officeAmount)
        }

        if (
          this.deal.construction.multifamily_rental_amount &&
          this.deal.construction.multifamily_rental_amount !== ""
        ) {
          retailCount +=
            parseInt(this.deal.construction.multifamily_rental_amount) *
            parseInt(this.deal.investment_details.multiAmountOfUnits ? this.deal.investment_details.multiAmountOfUnits : this.deal.investment_details.multiAmount)
        }

        if (
          this.deal.construction.industrial_rental_amount &&
          this.deal.construction.industrial_rental_amount !== ""
        ) {
          retailCount +=
            parseInt(this.deal.construction.industrial_rental_amount) *
            parseInt(this.deal.investment_details.industrialAmountOfUnits ? this.deal.investment_details.industrialAmountOfUnits : this.deal.investment_details.warehouseAmount)
        }
        if (retailCount !== 0) {
          total = retailCount - shl
        }
      }

      let expensesTotal = 0
      const keyArr = ['taxNumber', 'insurance', 'repairs', 'payrollAmount', 'electricityAmount', 'gasAmount', 'waterAmount', 'commonAreaAmount', 'legal', 'managementAmount', 'elevatorMaintenanceAmount']
        
      keyArr.forEach(key => {
        if(this.deal.expenses[key]) {
          if (!isNaN(parseInt(this.deal.expenses[key]))) {
            expensesTotal += parseInt(this.deal.expenses[key])
          }
        }
      })

      if(this.deal.expenses.otherExpenses && this.deal.expenses.otherExpenses.length > 0) {
        this.deal.expenses.otherExpenses.forEach(ele => {
          if(ele.amount) {
            expensesTotal += parseInt(ele.amount)
          }
        })
      }
      if (total === 0) {
        return ""
      } else {
        return "$" + this.formatDollars(total - expensesTotal)
      }
    },
    arrayToStringCommaUppercaseFirst: arrayToStringCommaUppercaseFirst,
    skipDeal() {
      this.skipDealCom = true
    },
    closePopUpSkipDeal() {
      this.skipDealCom = false
    },
    checkCountQuotes() {
      if (this.quotes) {
        return this.quotes.quotes.length
      } else {
        return 0
      }
    },
    checkQuote() {
      if (this.quotes && this.quotes.quotes.length > 2) {
        return false
      } else {
        return true
      }
    },
    changeDateFormat(date) {
      return changeDate(date)
    },
    changeSomeEnum(str) {
      return changeEnum(str)
    },
    changeBlockPreloader() {
      setTimeout(() => {
        this.blockPreloader = false
      }, 500)
    },

    /**
     * @author Nikola Popov
     * @description
     */
    setLogic(): void {
    
      if (this.deal.loan_type === "CONSTRUCTION") {
        this.loanDetails()
        this.constructionDetails()
        this.projectExspenses()
        this.sponsorDetails()

        this.additionalNotes()
      }
      if (this.deal.loan_type === "PURCHASE") {
        this.loanDetailsPurches()
        this.purchaseDetails()
        this.propertyExpenses()
        this.sponsorDetails()
        this.rentRoll()

        this.additionalNotes()
      }
      if (
        this.deal.loan_type === "REFINANCE" ||
        this.deal.loan_type === "OWNER_OCCUPIED"
      ) {
        this.loanDetailsOwner()
        this.refinanceDetails()
        this.propertyExpenses()
        this.sponsorDetails()
        this.rentRoll()

        this.additionalNotes()
      }
    },
    formatDollars(field) {
      return formatNumber(field)
    },
    rentRoll() {
      const arr = []
      this.deal.rent_roll?.table.forEach((element) => {
        if (element.monthle_rent !== "") {
          const obj = JSON.parse(JSON.stringify(element))
          obj.occupied = obj.occupied ? 'Occupied' : 'Vacant'
          arr.push(obj)
        }
      })
      this.tablesRentRoll[0].items = arr
    },
    yesNo(data) {
      if (data === "") {
        return ""
      } else {
        if (data === "true") {
          return "Yes"
        } else {
          return "No"
        }
      }
    },
    yesNoFree(data) {
      if (data === "") {
        return ""
      } else {
        if (data === "false") {
          return "Yes"
        } else {
          return "No"
        }
      }
    },
    checkData(data) {
      let flag = false
      data.forEach((element) => {
        if (element.text2 !== "") {
          flag = true
        }
      })
      if (!flag) {
        return []
      } else {
        return data
      }
    },
    managment() {
      if (this.deal.expenses.management) {
        if (this.deal.expenses.management === "true") {
          return "Self managed"
        } else {
          return "$" + this.formatDollars(this.deal.expenses.managementAmount)
        }
      } else {
        return ""
      }
    },
    payroll() {
      if (this.deal.expenses.payroll) {
        if (this.deal.expenses.payroll === "true") {
          return "n/a"
        } else {
          if (this.deal.expenses.payrollAmount) {
            return "$" + this.formatDollars(this.deal.expenses.payrollAmount)
          } else {
            return ""
          }
        }
      } else {
        return ""
      }
    },
    electricity() {
      if (this.deal.expenses.electricity) {
        if (this.deal.expenses.electricity === "true") {
          return "Paid by Tenant"
        } else {
          if (this.deal.expenses.electricityAmount) {
            return (
              "$" + this.formatDollars(this.deal.expenses.electricityAmount)
            )
          } else {
            return ""
          }
        }
      } else {
        if (this.deal.expenses.electricityAmount) {
          if (this.deal.expenses.electricityAmount) {
            return (
              "$" + this.formatDollars(this.deal.expenses.electricityAmount)
            )
          } else {
            return ""
          }
        } else {
          return ""
        }
      }
    },
    water() {
      if (this.deal.expenses.water) {
        if (this.deal.expenses.water === "true") {
          return "Paid by Tenant"
        } else {
          if (this.deal.expenses.waterAmount) {
            return "$" + this.formatDollars(this.deal.expenses.waterAmount)
          } else {
            return ""
          }
        }
      } else {
        if (this.deal.expenses.waterAmount) {
          if (this.deal.expenses.waterAmount) {
            return "$" + this.formatDollars(this.deal.expenses.waterAmount)
          } else {
            return ""
          }
        } else {
          return ""
        }
      }
    },
    elevator() {
      if (this.deal.expenses.elevatorMaintenance) {
        if (this.deal.expenses.elevatorMaintenance === "true") {
          return "Paid by Tenant"
        } else {
          if (this.deal.expenses.elevatorMaintenanceAmount) {
            return (
              "$" +
              this.formatDollars(this.deal.expenses.elevatorMaintenanceAmount)
            )
          } else {
            return ""
          }
        }
      } else {
        if (this.deal.expenses.elevatorMaintenanceAmount) {
          if (this.deal.expenses.elevatorMaintenanceAmount) {
            return (
              "$" +
              this.formatDollars(this.deal.expenses.elevatorMaintenanceAmount)
            )
          } else {
            return ""
          }
        } else {
          return ""
        }
      }
    },
    common() {
      if (this.deal.expenses.commonArea) {
        if (this.deal.expenses.commonArea === "true") {
          return "Paid by Tenant"
        } else {
          if (this.deal.expenses.commonAreaAmount) {
            return (
              "$" + this.formatDollars(this.deal.expenses.commonAreaAmount)
            )
          } else {
            return ""
          }
        }
      } else {
        if (this.deal.expenses.commonAreaAmount) {
          if (this.deal.expenses.commonAreaAmount) {
            return (
              "$" + this.formatDollars(this.deal.expenses.commonAreaAmount)
            )
          } else {
            return ""
          }
        } else {
          return ""
        }
      }
    },
    prop(val) {
      if (val === "UNDEFINED" || "") {
        return ""
      } else {
        return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
      }
    },
    gas() {
      if (this.deal.expenses.gas) {
        if (this.deal.expenses.gas === "true") {
          return "Paid by Tenant"
        } else {
          if (this.deal.expenses.gasAmount) {
            return "$" + this.formatDollars(this.deal.expenses.gasAmount)
          } else {
            return ""
          }
        }
      } else {
        if (this.deal.expenses.gasAmount) {
          if (this.deal.expenses.gasAmount) {
            return "$" + this.formatDollars(this.deal.expenses.gasAmount)
          } else {
            return ""
          }
        } else {
          return ""
        }
      }
    },
    formatPercent(num) {
      const zero = num.toString().slice(-1)
      const zeros = num.toString().slice(-2)
      if (zeros === "00") {
        return num.toString().slice(0, -3)
      } else if (zeros === ".0") {
        return num.toString().slice(0, -2)
      }
      if (zero === "0" || zero === ".") {
        return num.toString().slice(0, -1)
      }
      return num
    },
    loanDetailsOwner() {
      this.tablesLoanDetailsOwner[0].items = [
        {
          text1: "LOAN TYPE",
          text2:
            this.deal.loan_type.charAt(0).toUpperCase() +
            this.deal.loan_type.slice(1).toLowerCase(),
        },
        {
          text1: "LENDER TYPE",
          text2: this.setLenderType(this.deal.type_of_loans),
        },
        {
          text1: "LOAN AMOUNT REQUESTED",
          text2: this.deal.refinance_loan.loanAmount
            ? "$" + this.formatDollars(this.deal.refinance_loan.loanAmount)
            : "",
        },
        {
          text1: "INITIAL PURCHASE DATE",
          text2: this.changeDateFormat(this.deal.refinance_loan.date),
        },
        {
          text1: "INITIAL PURCHASE PRICE",
          text2: this.deal.refinance_loan.purchasePrice
            ? "$" + this.formatDollars(this.deal.refinance_loan.purchasePrice)
            : "",
        },
        {
          text1: "CURRENT VALUE",
          text2: this.deal.refinance_loan.currentValue
            ? "$" + this.formatDollars(this.deal.refinance_loan.currentValue)
            : "",
        },
        {
          text1: "IMPROVEMENTS",
          text2: this.deal.refinance_loan.list,
        },
        {
          text1: "EXISTING LOANS ON THIS PROPERTY",
          text2: this.yesNoFree(this.deal.existing.free),
        },
        {
          text1: "LENDER NAME",
          text2: this.deal.existing.lender,
        },
        {
          text1: "AMOUNT",
          text2: this.deal.existing.warehouse
            ? "$" + this.formatDollars(this.deal.existing.warehouse)
            : "",
        },
      ]

      this.tablesLoanDetailsOwner[0].items = this.checkData(
        this.tablesLoanDetailsOwner[0].items,
      )
    },
    refinanceDetails() {
      this.tablesRefinanceDetails[0].items = [
        {
          text1: "PROPERTY TYPE",
          text2:
            this.deal.property_type !== "UNDEFINED"
              ? this.changeSomeEnum(this.deal.property_type)
              : "",
        },
        {
          text1: "TYPE",
          text2:
            this.deal.investment_details.propType !== "UNDEFINED"
              ? this.changeSomeEnum(this.deal.investment_details.propType)
              : "",
        },
        {
          text1: "PROPOSED USE",
          text2: this.deal.investment_details.proposedUse,
        },
        {
          text1: "NUMBER OF UNITS",
          text2: this.deal.investment_details.numberUnit,
        },
        {
          text1: "NUMBER OF UNITS OCCUPIED",
          text2: this.deal.investment_details.numberUnitOccupied,
        },
        {
          text1: "SQUARE FOOTAGE",
          text2: this.deal.investment_details.squareFootage,
        },
        {
          text1: "SQUARE FOOTAGE OCCUPIED",
          text2: this.deal.investment_details.squareFootageOccupied,
        },
        {
          text1: "NUMBER OF FLOORS",
          text2: this.deal.construction.floors,
        },
        {
          text1: "BUSINESS NAME",
          text2: this.deal.owner_occupied.business_name,
        },
        {
          text1: "WHAT DOES BUSINESS DO/SELL",
          text2: this.deal.owner_occupied.business_description,
        },
        {
          text1: "AMOUNT OF SALES IN MOST RECENT CALENDAR YEAR",
          text2: this.deal.owner_occupied.sales_amount
            ? "$" + this.formatDollars(this.deal.owner_occupied.sales_amount)
            : "",
        },
        {
          text1: "AMOUNT OF PROFITS IN A CALENDAR YEAR",
          text2: this.deal.owner_occupied.profit_amount
            ? "$" + this.formatDollars(this.deal.owner_occupied.profit_amount)
            : "",
        },
        {
          text1: "PERCENT OF BUSINESS THE BORROWER OWNS",
          text2: this.deal.owner_occupied.borrower_own
            ? this.deal.owner_occupied.borrower_own + " %"
            : "",
        },
        {
          text1: "BUSINESS AGE (years)",
          text2: this.deal.owner_occupied.business_age,
        },
        {
          text1: "AMOUNT OF SALES YTD",
          text2: this.deal.owner_occupied.sales_amount_YTD
            ? "$" +
              this.formatDollars(this.deal.owner_occupied.sales_amount_YTD)
            : "",
        },
        {
          text1: "AMOUNT OF PROFITS YTD",
          text2: this.deal.owner_occupied.profit_amount_YTD
            ? "$" +
              this.formatDollars(this.deal.owner_occupied.profit_amount_YTD)
            : "",
        },
        {
          text1: "NUMBER OF EMPLOYEES",
          text2: this.deal.owner_occupied.employees,
        },
        {
          text1: "LAND COST",
          text2: this.deal.construction.land_cost
            ? "$" + this.formatDollars(this.deal.construction.land_cost)
            : "",
        },
        {
          text1: "DATE PURCHASED",
          text2: this.changeDateFormat(this.deal.construction.date),
        },
        {
          text1: "HARD COSTS",
          text2: this.deal.construction.hard_cost
            ? "$" + this.formatDollars(this.deal.construction.hard_cost)
            : "",
        },
        {
          text1: "SOFT COSTS",
          text2: this.deal.construction.soft_cost
            ? "$" + this.formatDollars(this.deal.construction.soft_cost)
            : "",
        },
        {
          text1: "CURRENT LAND VALUE",
          text2: this.deal.construction.land_cost
            ? "$" + this.formatDollars(this.deal.construction.current_value)
            : "",
        },
        {
          text1: "CONTRACTOR NAME",
          text2: this.deal.construction.contractor_name,
        },
        {
          text1: "MIXED USE TYPE",
          text2: arrayToStringCommaUppercaseFirst(
            this.deal.investment_details.mixedUse,
          ),
        },
        {
          text1: "RETAIL NUMBER OF UNITS",
          text2: this.deal.investment_details.retailAmount,
        },
        {
          text1: "RETAIL NUMBER OF UNITS OCCUPIED",
          text2: this.deal.investment_details.retailNumberOfUnitsOccupied,
        },
        {
          text1: "RETAIL SQUARE FOOTAGE",
          text2: this.deal.investment_details.retailSquare,
        },
        {
          text1: "RETAIL SQUARE FOOTAGE OCCUPIED",
          text2: this.deal.investment_details.retailSquareFootageOccupied,
        },
        {
          text1: "RETAIL TYPE",
          text2: this.deal.investment_details.retailType,
        },
        {
          text1: "MULTIFAMILY NUMBER OF UNITS",
          text2: this.deal.investment_details.multiAmount,
        },
        {
          text1: "MULTIFAMILY NUMBER OF UNITS OCCUPIED",
          text2: this.deal.investment_details.multiNumberOfUnitsOccupied,
        },
        {
          text1: "MULTIFAMILY SQUARE FOOTAGE",
          text2: this.deal.investment_details.multiSquare,
        },
        {
          text1: "MULTIFAMILY SQUARE FOOTAGE OCCUPIED",
          text2: this.deal.investment_details.multiSquareFootageOccupied,
        },

        {
          text1: "OFFICE NUMBER OF UNITS",
          text2: this.deal.investment_details.officeAmount,
        },
        {
          text1: "OFFICE NUMBER OF UNITS OCCUPIED",
          text2: this.deal.investment_details.officeNumberOfUnitsOccupied,
        },
        {
          text1: "OFFICE SQUARE FOOTAGE",
          text2: this.deal.investment_details.officeSquare,
        },
        {
          text1: "OFFICE SQUARE FOOTAGE OCCUPIED",
          text2: this.deal.investment_details.officeSquareFootageOccupied,
        },

        {
          text1: "INDUSTRIAL NUMBER OF UNITS",
          text2: this.deal.investment_details.warehouseAmount,
        },
        {
          text1: "INDUSTRIAL NUMBER OF UNITS OCCUPIED",
          text2: this.deal.investment_details.warehouseNumberOfUnitsOccupied,
        },
        {
          text1: "INDUSTRIAL SQUARE FOOTAGE",
          text2: this.deal.investment_details.warehouseSquare,
        },
        {
          text1: "INDUSTRIAL SQUARE FOOTAGE OCCUPIED",
          text2: this.deal.investment_details.warehouseSquareFootageOccupied,
        },
        {
          text1: "POTENTIAL ANNUAL INCOME",
          text2: this.deal.rent_roll.potential_income
            ? "$" + this.formatDollars(this.deal.rent_roll.potential_income)
            : "",
        },
        {
          text1: "REASONS FOR INCREASED PROJECTIONS",
          text2: this.deal.rent_roll.increaseProjection,
        },
        {
          text1: "DETAILS REGARDING INCREASED OCCUPANCY",
          text2: this.deal.rent_roll.increasedNotes,
        },
        {
          text1: "DETAILS REGARDING BETTER LEASES",
          text2: this.deal.rent_roll.betterNotes,
        },
        {
          text1: "CAPEX BUDGET",
          text2: this.deal.rent_roll.capExBudget
            ? "$" + this.formatDollars(this.deal.rent_roll.capExBudget)
            : "",
        },
        {
          text1: "TI BUDGET",
          text2: this.deal.rent_roll.tiBudget
            ? "$" + this.formatDollars(this.deal.rent_roll.tiBudget)
            : "",
        },
        {
          text1: "LC BUDGET",
          text2: this.deal.rent_roll.lcBudget
            ? "$" + this.formatDollars(this.deal.rent_roll.lcBudget)
            : "",
        },
        {
          text1: "TIME FRAME",
          text2: this.deal.rent_roll.timeFrame,
        },

        {
          text1: "DETAILS REGARDING PLANNED IMPROVEMENTS",
          text2: this.deal.rent_roll.plannedImprovements,
        },
      ]

      this.tablesRefinanceDetails[0].items = this.checkData(
        this.tablesRefinanceDetails[0].items,
      )
    },

    additionalNotes() {
      this.tablesAdditionalNotes[0].items = [
        {
          text1: "ADDITIONAL NOTES",
          text2: this.deal.expenses.additionalNotes,
        },
         {
          text1: "NOTE TO LENDER",
          text2: this.deal.investment_details.noteToLender,
        },
      ]
    },

    propertyExpenses() {
      let isNull = ''

      this.tablesPropertyExpenses[0].items = [
        {
          text1: this.deal.rent_roll.vacancy !== '' ? "GROSS POTENTIAL RENTS" : "TOTAL IN-PLACE RENTAL INCOME",
          text2: this.deal.rent_roll.annual_income
            ? "$" + this.formatDollars(this.deal.rent_roll.annual_income)
            : "",
        },
        {
          text1: "VACANCY",
          text2: this.deal.rent_roll.vacancy
            ? "$-" + this.formatDollars(this.deal.rent_roll.vacancy)
            : "",
        },
      ]

      if(this.deal.rent_roll.vacancy !== '') {
        this.tablesPropertyExpenses[0].items.push({
          text1: "TOTAL IN-PLACE RENTAL INCOME",
          text2: this.deal.rent_roll.occupiedGroos !== ''
            ? "$" + this.formatDollars(this.deal.rent_roll.occupiedGroos)
            : "$0",
        })

        if(this.deal.rent_roll.occupiedGroos === '') {
          isNull = '$0'
        }
      }

      if (this.deal.rent_roll.other_income[0].type !== "") {
        const reversed = this.deal.rent_roll.other_income.reverse(
          this.deal.rent_roll.other_income,
        )
        reversed.forEach((element) => {
          this.tablesPropertyExpenses[0].items.push({
            text1: element.type.toUpperCase(),
            text2: "$" + element.amount,
          })
        })
      }

      const newArr = [
        {
          text1: "EXPENSE RECOVERIES ",
          text2:
            this.yesNo(this.deal.expenses.triple) === "Yes" &&
            this.deal.expenses.reimbursement
              ? ""
              : this.yesNo(this.deal.expenses.triple),
        },
        {
          text1: "EXPENSE RECOVERIES",
          text2: this.deal.expenses.reimbursement
            ? "$" + this.formatDollars(this.deal.expenses.reimbursement)
            : "",
        },
        {
          text1: "TOTAL INCOME",
          text2: this.deal.rent_roll.totalIncome
            ? "$" + this.formatDollars(this.deal.rent_roll.totalIncome)
            : isNull,
          text3: "bold",
        },
        {
          text1: "divider",
          text2: "",
        },
        {
          text1: "REAL ESTATE TAXES",
          text2: this.deal.expenses.taxNumber
            ? "$" + this.formatDollars(this.deal.expenses.taxNumber)
            : "",
        },
        {
          text1: "TAX ABATEMENT",
          text2: this.yesNo(this.deal.expenses.tax),
        },
        {
          text1: "EXPIRATION DATE",
          text2: this.changeDateFormat(this.deal.expenses.expDate),
        },
        {
          text1: "PHASE OUT STRUCTURE",
          text2: this.deal.expenses.phaseStructure,
        },
        {
          text1: "INSURANCE",
          text2: this.deal.expenses.insurance
            ? "$" + this.formatDollars(this.deal.expenses.insurance)
            : "",
        },
        {
          text1: "REPAIRS AND MAINTENANCE",
          text2: this.deal.expenses.repairs
            ? "$" + this.formatDollars(this.deal.expenses.repairs)
            : "",
        },
        {
          text1: "PAYROLL AND RESERVES",
          text2: this.payroll(),
        },
        {
          text1: "ELECTRICITY",
          text2: this.electricity(),
        },
        {
          text1: "ELECTRICITY SEPARATELY METERED",
          text2: this.yesNo(this.deal.expenses.electricitySeparatelyMetered),
        },
        {
          text1: "GAS",
          text2: this.gas(),
        },
        {
          text1: "GAS SEPARATELY METERED",
          text2: this.yesNo(this.deal.expenses.gasSeparatelyMetered),
        },
        {
          text1: "WATER AND SEWER",
          text2: this.water(),
        },
        {
          text1: "WATER AND SEWER SEPARATELY METERED",
          text2: this.yesNo(this.deal.expenses.waterSeparatelyMetered),
        },
        {
          text1: "WATER",
          text2: this.deal.expenses.ooWaterAmount
            ? "$" + this.formatDollars(this.deal.expenses.ooWaterAmount)
            : "",
        },
        {
          text1: "SEWER",
          text2: this.deal.expenses.ooSewerAmount
            ? "$" + this.formatDollars(this.deal.expenses.ooSewerAmount)
            : "",
        },
        {
          text1: "COMMON AREA UTILITIES",
          text2: this.common(),
        },
        {
          text1: "LEGAL AND PROFESSIONAL",
          text2: this.deal.expenses.legal
            ? "$" + this.formatDollars(this.deal.expenses.legal)
            : "",
        },
        {
          text1: "MANAGEMENT",
          text2: this.managment(),
        },
        {
          text1: "MANAGEMENT COMPANY NAME",
          text2: this.deal.expenses.managementCompanyName,
        },
        {
          text1: "ELEVATOR MAINTENANCE",
          text2: this.elevator(),
        },
      ]

      this.tablesPropertyExpenses[0].items = this.tablesPropertyExpenses[0].items.concat(
        newArr,
      )

      if (this.deal.expenses.otherExpenses[0].type !== "") {
        this.deal.expenses.otherExpenses.forEach((element) => {
          this.tablesPropertyExpenses[0].items.push({
            text1: element.type.toUpperCase(),
            text2: "$" + element.amount,
          })
        })
      }

      this.tablesPropertyExpenses[0].items.push({
        text1: "TOTAL EXPENSES",
        text2: this.deal.expenses.totalExpenses
          ? "$" + this.formatDollars(this.deal.expenses.totalExpenses)
          : "",
      })

      this.tablesPropertyExpenses[0].items.push({
        text1: "NET OPERATING INCOME",
        text2: this.deal.expenses.netOperatingIncome
          ? "$" + this.formatDollars(this.deal.expenses.netOperatingIncome)
          : "",
      })

      this.tablesPropertyExpenses[0].items.push({
        text1: "TOTAL BUSINESS OPERATING INCOME",
        text2: this.deal.expenses.totalBusinessOperatingIncome
          ? "$" +
            this.formatDollars(this.deal.expenses.totalBusinessOperatingIncome)
          : "",
      })

      if (this.deal.expenses.triple === "") {
        const index = this.tablesPropertyExpenses[0].items.findIndex(
          (ele) => ele.text1 === "divider",
        )
        this.tablesPropertyExpenses[0].items.splice(index, 1)
      }
      this.tablesPropertyExpenses[0].items = this.checkData(
        this.tablesPropertyExpenses[0].items,
      )

      if(this.totalForPropertyExpenses() !== '$0') {
        if(!this.deal.expenses.totalExpenses) {
          const newArrTotalExp = [
            {
              text1: "TOTAL EXPENSES",
              text2: this.totalForPropertyExpenses(),
              text3: 'bold',
            },
          ]
    
          this.tablesPropertyExpenses[0].items = this.tablesPropertyExpenses[0].items.concat(
            newArrTotalExp,
          )
        }
      }
    },
    purchaseDetails() {
      this.tablesPurchaseDetails[0].items = [
        {
          text1: "PROPERTY TYPE",
          text2:
            this.deal.property_type !== "UNDEFINED"
              ? this.changeSomeEnum(this.deal.property_type)
              : "",
        },
        {
          text1: "TYPE",
          text2:
            this.deal.investment_details.propType !== "UNDEFINED"
              ? this.changeSomeEnum(this.deal.investment_details.propType)
              : "",
        },
        {
          text1: "PROPOSED USE",
          text2: this.deal.investment_details.proposedUse,
        },
        {
          text1: "NUMBER OF UNITS",
          text2: this.deal.investment_details.numberUnit,
        },
        {
          text1: "NUMBER OF UNITS OCCUPIED",
          text2: this.deal.investment_details.numberUnitOccupied,
        },
        {
          text1: "SQUARE FOOTAGE",
          text2: this.deal.investment_details.squareFootage,
        },
        {
          text1: "SQUARE FOOTAGE OCCUPIED",
          text2: this.deal.investment_details.squareFootageOccupied,
        },
        {
          text1: "AMOUNT OF UNITS",
          text2: this.deal.construction.amount_units,
        },
        {
          text1: "NUMBER OF FLOORS",
          text2: this.deal.construction.floors,
        },
        {
          text1: "RENTABLE/SELLABLE SF",
          text2: this.deal.construction.square_footage,
        },
        {
          text1: "BUSINESS NAME",
          text2: this.deal.owner_occupied.business_name,
        },
        {
          text1: "WHAT DOES BUSINESS DO/SELL",
          text2: this.deal.owner_occupied.business_description,
        },
        {
          text1: "AMOUNT OF SALES IN MOST RECENT CALENDAR YEAR",
          text2: this.deal.owner_occupied.sales_amount
            ? "$" + this.formatDollars(this.deal.owner_occupied.sales_amount)
            : "",
        },
        {
          text1: "AMOUNT OF PROFITS IN A CALENDAR YEAR",
          text2: this.deal.owner_occupied.profit_amount
            ? "$" + this.formatDollars(this.deal.owner_occupied.profit_amount)
            : "",
        },
        {
          text1: "PERCENT OF BUSINESS THE BORROWER OWNS",
          text2: this.deal.owner_occupied.borrower_own
            ? this.deal.owner_occupied.borrower_own + " %"
            : "",
        },
        {
          text1: "BUSINESS AGE (years)",
          text2: this.deal.owner_occupied.business_age,
        },
        {
          text1: "AMOUNT OF SALES YTD",
          text2: this.deal.owner_occupied.sales_amount_YTD
            ? "$" +
              this.formatDollars(this.deal.owner_occupied.sales_amount_YTD)
            : "",
        },
        {
          text1: "AMOUNT OF PROFITS YTD",
          text2: this.deal.owner_occupied.profit_amount_YTD
            ? "$" +
              this.formatDollars(this.deal.owner_occupied.profit_amount_YTD)
            : "",
        },
        {
          text1: "NUMBER OF EMPLOYEES",
          text2: this.deal.owner_occupied.employees,
        },
        {
          text1: "LAND COST",
          text2: this.deal.construction.land_cost
            ? "$" + this.formatDollars(this.deal.construction.land_cost)
            : "",
        },
        {
          text1: "DATE PURCHASED",
          text2: this.changeDateFormat(this.deal.construction.date),
        },
        {
          text1: "HARD COSTS",
          text2: this.deal.construction.hard_cost
            ? "$" + this.formatDollars(this.deal.construction.hard_cost)
            : "",
        },
        {
          text1: "SOFT COSTS",
          text2: this.deal.construction.soft_cost
            ? "$" + this.formatDollars(this.deal.construction.soft_cost)
            : "",
        },
        {
          text1: 'TOTAL COSTS',
          text2: this.totalCostsForConstruction() !== '$0' ? this.totalCostsForConstruction() : '',
          text3: "bold",
        },
        {
          text1: "CURRENT LAND VALUE",
          text2: this.deal.construction.land_cost
            ? "$" + this.formatDollars(this.deal.construction.current_value)
            : "",
        },
        {
          text1: "CONTRACTOR NAME",
          text2: this.deal.construction.contractor_name,
        },
        {
          text1: "MIXED USE TYPE",
          text2: arrayToStringCommaUppercaseFirst(
            this.deal.investment_details.mixedUse,
          ),
        },
        {
          text1: "RETAIL NUMBER OF UNITS",
          text2: this.deal.investment_details.retailAmount,
        },
        {
          text1: "RETAIL NUMBER OF UNITS OCCUPIED",
          text2: this.deal.investment_details.retailNumberOfUnitsOccupied,
        },
        {
          text1: "RETAIL SQUARE FOOTAGE",
          text2: this.deal.investment_details.retailSquare,
        },
        {
          text1: "RETAIL SQUARE FOOTAGE OCCUPIED",
          text2: this.deal.investment_details.retailSquareFootageOccupied,
        },

        // --------------------------------------
        {
          text1: "RETAIL AMOUNT OF UNITS",
          text2: this.deal.investment_details.amountOfUnits,
        },

        {
          text1: "RETAIL RENTABLE/SELLABLE SF",
          text2: this.deal.investment_details.rentableSellable,
        },

        {
          text1: "RETAIL NUMBER OF FLOORS",
          text2: this.deal.investment_details.retailFloors,
        },
        // --------------------------------------
        {
          text1: "RETAIL TYPE",
          text2: this.deal.investment_details.retailType,
        },

        // --------------------------------------
        {
          text1: "MULTIFAMILY AMOUNT OF UNITS",
          text2: this.deal.investment_details.multiAmountOfUnits,
        },

        {
          text1: "MULTIFAMILY RENTABLE/SELLABLE SF",
          text2: this.deal.investment_details.multiRentableSellable,
        },

        {
          text1: "MULTIFAMILY NUMBER OF FLOORS",
          text2: this.deal.investment_details.multiFloors,
        },
        // --------------------------------------
        {
          text1: "MULTIFAMILY NUMBER OF UNITS",
          text2: this.deal.investment_details.multiAmount,
        },
        {
          text1: "MULTIFAMILY NUMBER OF UNITS OCCUPIED",
          text2: this.deal.investment_details.multiNumberOfUnitsOccupied,
        },
        {
          text1: "MULTIFAMILY SQUARE FOOTAGE",
          text2: this.deal.investment_details.multiSquare,
        },
        {
          text1: "MULTIFAMILY SQUARE FOOTAGE OCCUPIED",
          text2: this.deal.investment_details.multiSquareFootageOccupied,
        },

        // --------------------------------------
        {
          text1: "OFFICE AMOUNT OF UNITS",
          text2: this.deal.investment_details.officeAmountOfunits,
        },

        {
          text1: "OFFICE RENTABLE/SELLABLE SF",
          text2: this.deal.investment_details.officeRentableSellable,
        },

        {
          text1: "OFFICE NUMBER OF FLOORS",
          text2: this.deal.investment_details.officeFloors,
        },
        // --------------------------------------

        {
          text1: "OFFICE NUMBER OF UNITS",
          text2: this.deal.investment_details.officeAmount,
        },
        {
          text1: "OFFICE NUMBER OF UNITS OCCUPIED",
          text2: this.deal.investment_details.officeNumberOfUnitsOccupied,
        },
        {
          text1: "OFFICE SQUARE FOOTAGE",
          text2: this.deal.investment_details.officeSquare,
        },
        {
          text1: "OFFICE SQUARE FOOTAGE OCCUPIED",
          text2: this.deal.investment_details.officeSquareFootageOccupied,
        },

        // --------------------------------------
        {
          text1: "INDUSTRIAL AMOUNT OF UNITS",
          text2: this.deal.investment_details.industrialAmountOfUnits,
        },

        {
          text1: "INDUSTRIAL RENTABLE/SELLABLE SF",
          text2: this.deal.investment_details.industrialRentableSellable,
        },

        {
          text1: "INDUSTRIAL NUMBER OF FLOORS",
          text2: this.deal.investment_details.industrialFloors,
        },
        // --------------------------------------

        {
          text1: "INDUSTRIAL NUMBER OF UNITS",
          text2: this.deal.investment_details.warehouseAmount,
        },
        {
          text1: "INDUSTRIAL NUMBER OF UNITS OCCUPIED",
          text2: this.deal.investment_details.warehouseNumberOfUnitsOccupied,
        },
        {
          text1: "INDUSTRIAL SQUARE FOOTAGE",
          text2: this.deal.investment_details.warehouseSquare,
        },
        {
          text1: "INDUSTRIAL SQUARE FOOTAGE OCCUPIED",
          text2: this.deal.investment_details.warehouseSquareFootageOccupied,
        },
      ]

      if(this.deal.construction.projectionMixedUse.length > 0) {
        this.tablesPurchaseDetails[0].items.push(
          {
            text1: 'PRIMARY OPTION',
            text2: "",
            text3: "bold",
            text4: "show",
          },
        )
      }


      this.deal.construction.projectionMixedUse.forEach(projection => {
        
        let plansOrder;
        (projection.plans === 'sell')
          ? plansOrder = ['sell', 'rent']
          : plansOrder = ['rent', 'sell']

        plansOrder.forEach((element, index) => {
          if(element === 'sell') {
            if(index === 0) {
              if(projection.projections !== '') {
                this.tablesPurchaseDetails[0].items.push(
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER UNIT",
                    text2:
                      projection.projections_per_units &&
                      projection.projections === "both"
                        ? "$" +
                          this.formatDollars(projection.projections_per_units)
                        : "",
                  },
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER S/F",
                    text2:
                      projection.projections_per_sf &&
                      projection.projections === "both"
                        ? "$" +
                          this.formatDollars(projection.projections_per_sf)
                        : "",
                  },
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER UNIT",
                    text2:
                      projection.projections_sales &&
                      projection.projections === "unit"
                        ? "$" +
                          this.formatDollars(projection.projections_sales)
                        : "",
                  },
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER S/F",
                    text2:
                      projection.projections_sales &&
                      projection.projections === "sf"
                        ? "$" +
                          this.formatDollars(projection.projections_sales)
                        : "",
                  },
                )
              }
            }
          } else {
            if(index === 0) {
              if(projection.rental_per) {
                this.tablesPurchaseDetails[0].items.push(
                  {
                    text1: projection.tag+" RENTAL PROJECTIONS PER UNIT",
                    text2:
                      projection.rental_projections_per_units &&
                      projection.rental_per === "both"
                        ? "$" +
                          this.formatDollars(
                            projection.rental_projections_per_units,
                          )
                        : "",
                  },
                  {
                    text1: projection.tag+" RENTAL PROJECTIONS PER S/F",
                    text2:
                      projection.rental_projections_per_sf &&
                      projection.rental_per === "both"
                        ? "$" +
                          this.formatDollars(
                            projection.rental_projections_per_sf,
                          )
                        : "",
                  },
                  {
                    text1: projection.tag+" RENTAL PROJECTIONS PER UNIT",
                    text2:
                      projection.rental_per === "unit" &&
                      projection.rental_amount
                        ? "$" + this.formatDollars(projection.rental_amount)
                        : "",
                  },
                  {
                    text1: projection.tag+" RENTAL PROJECTIONS PER S/F",
                    text2:
                      projection.rental_per === "sf" &&
                      projection.rental_amount
                        ? "$" + this.formatDollars(projection.rental_amount)
                        : "",
                  },
                )
              }
            }
          }
        })

      })

      if(this.checkPrimaryAndFallBack()) {
        this.tablesPurchaseDetails[0].items.push(
          {
            text1: 'FALLBACK OPTION',
            text2: "",
            text3: "bold",
            text4: "show",
          },
        )
      }

      this.deal.construction.projectionMixedUse.forEach(projection => {
        
        let plansOrder;
        (projection.plans === 'sell')
          ? plansOrder = ['sell', 'rent']
          : plansOrder = ['rent', 'sell']

        plansOrder.forEach((element, index) => {
          if(element === 'sell') {
            if(index === 1) {
              if(projection.projections !== '') {
                this.tablesPurchaseDetails[0].items.push(
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER UNIT",
                    text2:
                      projection.projections_per_units &&
                      projection.projections === "both"
                        ? "$" +
                          this.formatDollars(projection.projections_per_units)
                        : "",
                  },
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER S/F",
                    text2:
                      projection.projections_per_sf &&
                      projection.projections === "both"
                        ? "$" +
                          this.formatDollars(projection.projections_per_sf)
                        : "",
                  },
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER UNIT",
                    text2:
                      projection.projections_sales &&
                      projection.projections === "unit"
                        ? "$" +
                          this.formatDollars(projection.projections_sales)
                        : "",
                  },
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER S/F",
                    text2:
                      projection.projections_sales &&
                      projection.projections === "sf"
                        ? "$" +
                          this.formatDollars(projection.projections_sales)
                        : "",
                  },
                )
              }
            }
          } else {
              if(index === 1) {
                if(projection.rental_per) {
                  this.tablesPurchaseDetails[0].items.push(
                    {
                      text1: projection.tag+" RENTAL PROJECTIONS PER UNIT",
                      text2:
                        projection.rental_projections_per_units &&
                        projection.rental_per === "both"
                          ? "$" +
                            this.formatDollars(
                              projection.rental_projections_per_units,
                            )
                          : "",
                    },
                    {
                      text1: projection.tag+" RENTAL PROJECTIONS PER S/F",
                      text2:
                        projection.rental_projections_per_sf &&
                        projection.rental_per === "both"
                          ? "$" +
                            this.formatDollars(
                              projection.rental_projections_per_sf,
                            )
                          : "",
                    },
                    {
                      text1: projection.tag+" RENTAL PROJECTIONS PER UNIT",
                      text2:
                        projection.rental_per === "unit" &&
                        projection.rental_amount
                          ? "$" + this.formatDollars(projection.rental_amount)
                          : "",
                    },
                    {
                      text1: projection.tag+" RENTAL PROJECTIONS PER S/F",
                      text2:
                        projection.rental_per === "sf" &&
                        projection.rental_amount
                          ? "$" + this.formatDollars(projection.rental_amount)
                          : "",
                    },
                  )
                }
              }
          }
        })

      })

      let plansOrder;
      (this.deal.construction.plans === 'sell')
				? plansOrder = ['sell', 'rent']
				: plansOrder = ['rent', 'sell']

      plansOrder.forEach((element, index) => {
        if(element === 'sell') {
          if(this.deal.construction.projections !== '') {
            this.tablesPurchaseDetails[0].items.push(
              {
                text1: index === 0 ? 'PRIMARY OPTION' : 'FALLBACK OPTION',
                text2: "",
                text3: "bold",
                text4: "show",
              },
              {
                text1: "SALES PROJECTIONS PER UNIT",
                text2:
                  this.deal.construction.projections_per_units &&
                  this.deal.construction.projections === "both"
                    ? "$" +
                      this.formatDollars(this.deal.construction.projections_per_units)
                    : "",
              },
              {
                text1: "SALES PROJECTIONS PER S/F",
                text2:
                  this.deal.construction.projections_per_sf &&
                  this.deal.construction.projections === "both"
                    ? "$" +
                      this.formatDollars(this.deal.construction.projections_per_sf)
                    : "",
              },
              {
                text1: "SALES PROJECTIONS PER UNIT",
                text2:
                  this.deal.construction.projections_sales &&
                  this.deal.construction.projections === "unit"
                    ? "$" +
                      this.formatDollars(this.deal.construction.projections_sales)
                    : "",
              },
              {
                text1: "SALES PROJECTIONS PER S/F",
                text2:
                  this.deal.construction.projections_sales &&
                  this.deal.construction.projections === "sf"
                    ? "$" +
                      this.formatDollars(this.deal.construction.projections_sales)
                    : "",
              },
              {
                text1: this.constructionNameNetProfites(),
                text2: this.constructionTotalNetProfites(),
                text3: "bold",
              },
            )
          }
        } else {
          if(this.deal.construction.rental_per) {
            this.tablesPurchaseDetails[0].items.push(
              {
                text1: index === 0 ? 'PRIMARY OPTION' : 'FALLBACK OPTION',
                text2: "",
                text3: "bold",
                text4: "show",
              },
              {
                text1: "RENTAL PROJECTIONS PER UNIT",
                text2:
                  this.deal.construction.rental_projections_per_units &&
                  this.deal.construction.rental_per === "both"
                    ? "$" +
                      this.formatDollars(
                        this.deal.construction.rental_projections_per_units,
                      )
                    : "",
              },
              {
                text1: "RENTAL PROJECTIONS PER S/F",
                text2:
                  this.deal.construction.rental_projections_per_sf &&
                  this.deal.construction.rental_per === "both"
                    ? "$" +
                      this.formatDollars(
                        this.deal.construction.rental_projections_per_sf,
                      )
                    : "",
              },
              {
                text1: "RENTAL PROJECTIONS PER UNIT",
                text2:
                  this.deal.construction.rental_per === "unit" &&
                  this.deal.construction.rental_amount
                    ? "$" + this.formatDollars(this.deal.construction.rental_amount)
                    : "",
              },
              {
                text1: "RENTAL PROJECTIONS PER S/F",
                text2:
                  this.deal.construction.rental_per === "sf" &&
                  this.deal.construction.rental_amount
                    ? "$" + this.formatDollars(this.deal.construction.rental_amount)
                    : "",
              },
              {
                text1: this.constructionNameTotalIncome(),
                text2: this.constructionTotalOperatingIncomeOnly(),
                text3: "bold",
              },
            )
          }
        }
      })


      this.tablesPurchaseDetails[0].items.push(
        {
          text1: "POTENTIAL ANNUAL INCOME",
          text2: this.deal.rent_roll.potential_income
            ? "$" + this.formatDollars(this.deal.rent_roll.potential_income)
            : "",
        },
        {
          text1: "REASONS FOR INCREASED PROJECTIONS",
          text2: this.deal.rent_roll.increaseProjection,
        },

        {
          text1: "DETAILS REGARDING INCREASED OCCUPANCY",
          text2: this.deal.rent_roll.increasedNotes,
        },
        {
          text1: "DETAILS REGARDING BETTER LEASES",
          text2: this.deal.rent_roll.betterNotes,
        },
        {
          text1: "CAPEX BUDGET",
          text2: this.deal.rent_roll.capExBudget
            ? "$" + this.formatDollars(this.deal.rent_roll.capExBudget)
            : "",
        },
        {
          text1: "TI BUDGET",
          text2: this.deal.rent_roll.tiBudget
            ? "$" + this.formatDollars(this.deal.rent_roll.tiBudget)
            : "",
        },
        {
          text1: "LC BUDGET",
          text2: this.deal.rent_roll.lcBudget
            ? "$" + this.formatDollars(this.deal.rent_roll.lcBudget)
            : "",
        },
        {
          text1: "TIME FRAME",
          text2: this.deal.rent_roll.timeFrame,
        },

        {
          text1: "DETAILS REGARDING PLANNED IMPROVEMENTS",
          text2: this.deal.rent_roll.plannedImprovements,
        },
      )

      this.tablesPurchaseDetails[0].items = this.checkData(
        this.tablesPurchaseDetails[0].items,
      )
    },
    loanDetailsPurches() {
      const sum =
        (parseInt(this.deal.purchase_loan.loan_amount) /
          parseInt(this.deal.purchase_loan.price)) *
        100
      this.tablesLoanDetailsPurches[0].items = [
        {
          text1: "LOAN TYPE",
          text2:
            this.deal.loan_type.charAt(0).toUpperCase() +
            this.deal.loan_type.slice(1).toLowerCase(),
        },
        {
          text1: "LENDER TYPE",
          text2: this.setLenderType(this.deal.type_of_loans),
        },
        {
          text1: "PURCHASE PRICE",
          text2: this.deal.purchase_loan.price
            ? "$" + this.formatDollars(this.deal.purchase_loan.price)
            : "",
        },
        {
          text1: "LOAN AMOUNT REQUESTED",
          text2: this.deal.purchase_loan.loan_amount
            ? "$" + this.formatDollars(this.deal.purchase_loan.loan_amount)
            : "",
        },
        {
          text1: "ESTIMATED VALUE",
          text2: this.deal.purchase_loan.estimated_value
            ? "$" + this.formatDollars(this.deal.purchase_loan.estimated_value)
            : "",
        },
        {
          text1: "ESTIMATED CAP RATE",
          text2: this.deal.purchase_loan.estimated_cap_rate
            ? this.formatPercent(this.deal.purchase_loan.estimated_cap_rate) +
              " %"
            : "",
        },
        {
          text1: "DAYS TO CLOSE",
          text2: this.deal.purchase_loan.days_to_close,
        },
        {
          text1: "LTC",
          text2: sum.toFixed(2) + "%",
        },
      ]

      this.tablesLoanDetailsPurches[0].items = this.checkData(
        this.tablesLoanDetailsPurches[0].items,
      )
    },
    sponsorDetails() {
      this.deal.sponsor.sponsorInfo.forEach((obj, index) => {

        if (this.deal.sponsor.sponsorInfo.length === 1) {
          this.tablesSponsorDetails[0].items.push({
            text1: "SPONSOR NAME",
            text2: this.deal.sponsor.sponsorInfo[0].name,
          })
        } else {
          this.tablesSponsorDetails[0].items.push({
            text1: "SPONSOR NAME " + (index + 1),
            text2: obj.name,
          })
        }

        if (obj.ownership !== "") {
          this.tablesSponsorDetails[0].items.push({
            text1: "SPONSOR " + (index + 1) + " OWNERSHIP",
            text2: obj.ownership + " %",
          })
        }
        if (obj.years_experience !== "") {
          this.tablesSponsorDetails[0].items.push({
            text1: "YEARS OF EXPERIENCE ",
            text2: obj.years_experience,
          })
        } 

        if (obj.family_experience !== "") {
          this.tablesSponsorDetails[0].items.push({
            text1: "FAMILY EXPERIENCE ",
            text2: this.yesNo(obj.family_experience),
          })
        } 

        if (obj.annual_income !== "") {
          this.tablesSponsorDetails[0].items.push({
            text1: "SPONSOR ANNUAL INCOME ",
            text2: obj.annual_income
              ? "$" + this.formatDollars(obj.annual_income)
              : "",
          })
        } 

        if (obj.annual_expenses !== "") {
          this.tablesSponsorDetails[0].items.push({
            text1: "SPONSOR ANNUAL EXPENSES ",
            text2: obj.annual_expenses
              ? "$" + this.formatDollars(obj.annual_expenses)
              : "",
          })
        } 

        if (obj.net_income !== "") {
          this.tablesSponsorDetails[0].items.push({
            text1: this.deal.sponsor.sponsorInfo.length > 1 ? "SPONSOR "+ (index + 1) +" ANNUAL NET INCOME" : 'ANNUAL NET INCOME',
            text2: obj.net_income
              ? "$" + this.formatDollars(obj.net_income)
              : "",
            text3: "bold",
          })
        } 

        this.tablesSponsorDetails[0].items.push({
          text1: "SPONSOR ASSETS",
          text2: "",
          text3: "bold",
          text4: "show",
        })

        if (obj.assets_real_estate !== "") {
          this.tablesSponsorDetails[0].items.push({
            text1: "-REAL ESTATE ",
            text2: obj.assets_real_estate
              ? "$" + this.formatDollars(obj.assets_real_estate)
              : "",
          })
        }

        if (obj.assets_companies !== "") {
          this.tablesSponsorDetails[0].items.push({
            text1: "-COMPANIES/CORPORATIONS ",
            text2: obj.assets_companies
              ? "$" + this.formatDollars(obj.assets_companies)
              : "",
          })
        }

        if (obj.assets_other !== "") {
          this.tablesSponsorDetails[0].items.push({
            text1: "-OTHER ASSETS ",
            text2: obj.assets_other
              ? "$" + this.formatDollars(obj.assets_other)
              : "",
          })
        }

        if (obj.assets_liquid !== "") {
          this.tablesSponsorDetails[0].items.push({
            text1: "-LIQUID ASSETS ",
            text2: obj.assets_liquid
              ? "$" + this.formatDollars(obj.assets_liquid)
              : "",
          })
        }

        if (obj.total_assets !== "") {
          this.tablesSponsorDetails[0].items.push({
            text1: this.deal.sponsor.sponsorInfo.length > 1 ? "SPONSOR "+ (index + 1) +" TOTAL ASSETS " : 'TOTAL ASSETS',
            text2: obj.total_assets
              ? "$" + this.formatDollars(obj.total_assets)
              : "",
            text3: "bold",
          })
        }

        if (obj.liabilities !== "") {
          this.tablesSponsorDetails[0].items.push({
            text1: "SPONSOR LIABILITIES ",
            text2: obj.liabilities
              ? "$" + this.formatDollars(obj.liabilities)
              : "",
          })
        }

        if (obj.net_worth !== "") {
          this.tablesSponsorDetails[0].items.push({
            text1: this.deal.sponsor.sponsorInfo.length > 1 ? "SPONSOR "+ (index + 1) +" NET WORTH " : 'NET WORTH',
            text2: obj.net_worth
              ? "$" + this.formatDollars(obj.net_worth)
              : "",
            text3: "bold",
          })
        }

      })
      
    },
    projectExspenses() {
      this.tablesProjectExspenses[0].items = [
        {
          text1: "EXPENSE RECOVERIES",
          text2: this.yesNo(this.deal.expenses.triple),
        },
        {
          text1: "EXPENSE RECOVERIES",
          text2: this.deal.expenses.reimbursement
            ? "$" + this.formatDollars(this.deal.expenses.reimbursement)
            : "",
        },
        {
          text1: "divider",
          text2: "",
        },
        {
          text1: "REAL ESTATE TAXES",
          text2: this.deal.expenses.taxNumber
            ? "$" + this.formatDollars(this.deal.expenses.taxNumber)
            : "",
        },
        {
          text1: "TAX ABATEMENT",
          text2: this.yesNo(this.deal.expenses.tax),
        },
        {
          text1: "EXPIRATION DATE",
          text2: this.changeDateFormat(this.deal.expenses.expDate),
        },
        {
          text1: "PHASE OUT STRUCTURE",
          text2: this.deal.expenses.phaseStructure,
        },
        {
          text1: "INSURANCE",
          text2: this.deal.expenses.insurance
            ? "$" + this.formatDollars(this.deal.expenses.insurance)
            : "",
        },
        {
          text1: "REPAIRS AND MAINTENANCE",
          text2: this.deal.expenses.repairs
            ? "$" + this.formatDollars(this.deal.expenses.repairs)
            : "",
        },
        {
          text1: "PAYROLL AND RESERVES",
          text2: this.payroll(),
        },
        {
          text1: "ELECTRICITY",
          text2: this.electricity(),
        },
        {
          text1: "ELECTRICITY SEPARATELY METERED",
          text2: this.yesNo(this.deal.expenses.electricitySeparatelyMetered),
        },
        {
          text1: "GAS",
          text2: this.gas(),
        },
        {
          text1: "GAS SEPARATELY METERED",
          text2: this.yesNo(this.deal.expenses.gasSeparatelyMetered),
        },
        {
          text1: "WATER AND SEWER",
          text2: this.water(),
        },
        {
          text1: "WATER AND SEWER SEPARATELY METERED",
          text2: this.yesNo(this.deal.expenses.waterSeparatelyMetered),
        },
        {
          text1: "COMMON AREA UTILITIES",
          text2: this.common(),
        },
        {
          text1: "LEGAL AND PROFESSIONAL",
          text2: this.deal.expenses.legal
            ? "$" + this.formatDollars(this.deal.expenses.legal)
            : "",
        },
        {
          text1: "MANAGEMENT",
          text2: this.managment(),
        },
        {
          text1: "MANAGEMENT COMPANY NAME",
          text2: this.deal.expenses.managementCompanyName,
        },
        {
          text1: "ELEVATOR MAINTENANCE",
          text2: this.elevator(),
        },
      ]

      if (this.deal.expenses.otherExpenses[0].type !== "") {
        this.deal.expenses.otherExpenses.forEach((element) => {
          this.tablesProjectExspenses[0].items.push({
            text1: element.type.toUpperCase(),
            text2: "$" + element.amount,
          })
        })
      }

      this.tablesProjectExspenses[0].items.push({
        text1: "TOTAL EXPENSES",
        text2: this.deal.expenses.totalExpenses
          ? "$" + this.formatDollars(this.deal.expenses.totalExpenses)
          : "",
      })

      this.tablesProjectExspenses[0].items.push({
        text1: "NET OPERATING INCOME",
        text2: this.deal.expenses.netOperatingIncome
          ? "$" + this.formatDollars(this.deal.expenses.netOperatingIncome)
          : "",
      })

      this.tablesProjectExspenses[0].items.push({
        text1: "TOTAL BUSINESS OPERATING INCOME",
        text2: this.deal.expenses.totalBusinessOperatingIncome
          ? "$" +
            this.formatDollars(this.deal.expenses.totalBusinessOperatingIncome)
          : "",
      })

      if (this.deal.expenses.triple === "") {
        this.tablesProjectExspenses[0].items.splice(2, 1)
      }

      this.tablesProjectExspenses[0].items = this.checkData(
        this.tablesProjectExspenses[0].items,
      )

      const newArrTotalExp = [
        {
          text1: "TOTAL EXPENSES",
          text2: this.totalForPropertyExpenses(),
          text3: 'bold',
        },
      ]

      this.tablesProjectExspenses[0].items = this.tablesProjectExspenses[0].items.concat(
        newArrTotalExp,
      )
    },
        constructionDetails() {
      this.tablesConstructionDetails[0].items = [
        {
          text1: "LAND COST",
          text2: this.deal.construction.land_cost
            ? "$" + this.formatDollars(this.deal.construction.land_cost)
            : "",
        },
        {
          text1: "DATE PURCHASED",
          text2: this.changeDateFormat(this.deal.construction.date),
        },
        {
          text1: "HARD COSTS",
          text2: this.deal.construction.hard_cost
            ? "$" + this.formatDollars(this.deal.construction.hard_cost)
            : "",
        },
        {
          text1: "SOFT COSTS",
          text2: this.deal.construction.soft_cost
            ? "$" + this.formatDollars(this.deal.construction.soft_cost)
            : "",
        },
        {
          text1: 'TOTAL COSTS',
          text2: this.totalCostsForConstruction() !== '$0' ? this.totalCostsForConstruction() : '',
          text3: "bold",
        },
        {
          text1: "CURRENT LAND VALUE",
          text2: this.deal.construction.land_cost
            ? "$" + this.formatDollars(this.deal.construction.current_value)
            : "",
        },
        {
          text1: "CONTRACTOR NAME",
          text2: this.deal.construction.contractor_name,
        },
        {
          text1: "TYPE",
          text2:
            this.deal.investment_details.propType.charAt(0).toUpperCase() +
            this.deal.investment_details.propType.slice(1).toLowerCase(),
        },
        {
          text1: "MIXED USE TYPE",
          text2: arrayToStringCommaUppercaseFirst(
            this.deal.investment_details.mixedUse,
          ),
        },
        // --------------------------------------
        {
          text1: "RETAIL AMOUNT OF UNITS",
          text2: this.deal.investment_details.amountOfUnits,
        },

        {
          text1: "RETAIL RENTABLE/SELLABLE SF",
          text2: this.deal.investment_details.rentableSellable,
        },

        {
          text1: "RETAIL NUMBER OF FLOORS",
          text2: this.deal.investment_details.retailFloors,
        },
        // --------------------------------------

        {
          text1: "RETAIL NUMBER OF UNITS",
          text2: this.deal.investment_details.retailAmount,
        },
        {
          text1: "RETAIL NUMBER OF UNITS OCCUPIED",
          text2: this.deal.investment_details.retailNumberOfUnitsOccupied,
        },
        {
          text1: "RETAIL SQUARE FOOTAGE",
          text2: this.deal.investment_details.retailSquare,
        },
        {
          text1: "RETAIL SQUARE FOOTAGE OCCUPIED",
          text2: this.deal.investment_details.retailSquareFootageOccupied,
        },
        {
          text1: "RETAIL TYPE",
          text2: this.deal.investment_details.retailType,
        },

        // --------------------------------------
        {
          text1: "MULTIFAMILY AMOUNT OF UNITS",
          text2: this.deal.investment_details.multiAmountOfUnits,
        },

        {
          text1: "MULTIFAMILY RENTABLE/SELLABLE SF",
          text2: this.deal.investment_details.multiRentableSellable,
        },

        {
          text1: "MULTIFAMILY NUMBER OF FLOORS",
          text2: this.deal.investment_details.multiFloors,
        },
        // --------------------------------------

        {
          text1: "MULTIFAMILY NUMBER OF UNITS",
          text2: this.deal.investment_details.multiAmount,
        },
        {
          text1: "MULTIFAMILY NUMBER OF UNITS OCCUPIED",
          text2: this.deal.investment_details.multiNumberOfUnitsOccupied,
        },
        {
          text1: "MULTIFAMILY SQUARE FOOTAGE",
          text2: this.deal.investment_details.multiSquare,
        },
        {
          text1: "MULTIFAMILY SQUARE FOOTAGE OCCUPIED",
          text2: this.deal.investment_details.multiSquareFootageOccupied,
        },


        // --------------------------------------
        {
          text1: "OFFICE AMOUNT OF UNITS",
          text2: this.deal.investment_details.officeAmountOfunits,
        },

        {
          text1: "OFFICE RENTABLE/SELLABLE SF",
          text2: this.deal.investment_details.officeRentableSellable,
        },

        {
          text1: "OFFICE NUMBER OF FLOORS",
          text2: this.deal.investment_details.officeFloors,
        },
        // --------------------------------------

        {
          text1: "OFFICE NUMBER OF UNITS",
          text2: this.deal.investment_details.officeAmount,
        },
        {
          text1: "OFFICE NUMBER OF UNITS OCCUPIED",
          text2: this.deal.investment_details.officeNumberOfUnitsOccupied,
        },
        {
          text1: "OFFICE SQUARE FOOTAGE",
          text2: this.deal.investment_details.officeSquare,
        },
        {
          text1: "OFFICE SQUARE FOOTAGE OCCUPIED",
          text2: this.deal.investment_details.officeSquareFootageOccupied,
        },

        // --------------------------------------
        {
          text1: "INDUSTRIAL AMOUNT OF UNITS",
          text2: this.deal.investment_details.industrialAmountOfUnits,
        },

        {
          text1: "INDUSTRIAL RENTABLE/SELLABLE SF",
          text2: this.deal.investment_details.industrialRentableSellable,
        },

        {
          text1: "INDUSTRIAL NUMBER OF FLOORS",
          text2: this.deal.investment_details.industrialFloors,
        },
        // --------------------------------------


        {
          text1: "INDUSTRIAL NUMBER OF UNITS",
          text2: this.deal.investment_details.warehouseAmount,
        },
        {
          text1: "INDUSTRIAL NUMBER OF UNITS OCCUPIED",
          text2: this.deal.investment_details.warehouseNumberOfUnitsOccupied,
        },
        {
          text1: "INDUSTRIAL SQUARE FOOTAGE",
          text2: this.deal.investment_details.warehouseSquare,
        },
        {
          text1: "INDUSTRIAL SQUARE FOOTAGE OCCUPIED",
          text2: this.deal.investment_details.warehouseSquareFootageOccupied,
        },
      ]

      if(this.deal.construction.projectionMixedUse.length > 0) {
        this.tablesConstructionDetails[0].items.push(
          {
            text1: 'PRIMARY OPTION',
            text2: "",
            text3: "bold",
            text4: "show",
          },
        )
      }

      this.deal.construction.projectionMixedUse.forEach(projection => {
        
        let plansOrder;
        (projection.plans === 'sell')
          ? plansOrder = ['sell', 'rent']
          : plansOrder = ['rent', 'sell']

        plansOrder.forEach((element, index) => {
          if(element === 'sell') {
            if(index === 0) {
              if(projection.projections !== '') {
                this.tablesConstructionDetails[0].items.push(
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER UNIT",
                    text2:
                      projection.projections_per_units &&
                      projection.projections === "both"
                        ? "$" +
                          this.formatDollars(projection.projections_per_units)
                        : "",
                  },
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER S/F",
                    text2:
                      projection.projections_per_sf &&
                      projection.projections === "both"
                        ? "$" +
                          this.formatDollars(projection.projections_per_sf)
                        : "",
                  },
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER UNIT",
                    text2:
                      projection.projections_sales &&
                      projection.projections === "unit"
                        ? "$" +
                          this.formatDollars(projection.projections_sales)
                        : "",
                  },
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER S/F",
                    text2:
                      projection.projections_sales &&
                      projection.projections === "sf"
                        ? "$" +
                          this.formatDollars(projection.projections_sales)
                        : "",
                  },
                )
              }
            }
          } else {
            if(index === 0) {
              if(projection.rental_per) {
                this.tablesConstructionDetails[0].items.push(
                  {
                    text1: projection.tag+" RENTAL PROJECTIONS PER UNIT",
                    text2:
                      projection.rental_projections_per_units &&
                      projection.rental_per === "both"
                        ? "$" +
                          this.formatDollars(
                            projection.rental_projections_per_units,
                          )
                        : "",
                  },
                  {
                    text1: projection.tag+" RENTAL PROJECTIONS PER S/F",
                    text2:
                      projection.rental_projections_per_sf &&
                      projection.rental_per === "both"
                        ? "$" +
                          this.formatDollars(
                            projection.rental_projections_per_sf,
                          )
                        : "",
                  },
                  {
                    text1: projection.tag+" RENTAL PROJECTIONS PER UNIT",
                    text2:
                      projection.rental_per === "unit" &&
                      projection.rental_amount
                        ? "$" + this.formatDollars(projection.rental_amount)
                        : "",
                  },
                  {
                    text1: projection.tag+" RENTAL PROJECTIONS PER S/F",
                    text2:
                      projection.rental_per === "sf" &&
                      projection.rental_amount
                        ? "$" + this.formatDollars(projection.rental_amount)
                        : "",
                  },
                )
              }
            }
          }
        })

      })

      if(this.checkPrimaryAndFallBack()) {
        this.tablesConstructionDetails[0].items.push(
          {
            text1: 'FALLBACK OPTION',
            text2: "",
            text3: "bold",
            text4: "show",
          },
        )
      }

      this.deal.construction.projectionMixedUse.forEach(projection => {
        
        let plansOrder;
        (projection.plans === 'sell')
          ? plansOrder = ['sell', 'rent']
          : plansOrder = ['rent', 'sell']

        plansOrder.forEach((element, index) => {
          if(element === 'sell') {
            if(index === 1) {
              if(projection.projections !== '') {
                this.tablesConstructionDetails[0].items.push(
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER UNIT",
                    text2:
                      projection.projections_per_units &&
                      projection.projections === "both"
                        ? "$" +
                          this.formatDollars(projection.projections_per_units)
                        : "",
                  },
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER S/F",
                    text2:
                      projection.projections_per_sf &&
                      projection.projections === "both"
                        ? "$" +
                          this.formatDollars(projection.projections_per_sf)
                        : "",
                  },
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER UNIT",
                    text2:
                      projection.projections_sales &&
                      projection.projections === "unit"
                        ? "$" +
                          this.formatDollars(projection.projections_sales)
                        : "",
                  },
                  {
                    text1: projection.tag+" SALES PROJECTIONS PER S/F",
                    text2:
                      projection.projections_sales &&
                      projection.projections === "sf"
                        ? "$" +
                          this.formatDollars(projection.projections_sales)
                        : "",
                  },
                )
              }
            }
          } else {
              if(index === 1) {
                if(projection.rental_per) {
                  this.tablesConstructionDetails[0].items.push(
                    {
                      text1: projection.tag+" RENTAL PROJECTIONS PER UNIT",
                      text2:
                        projection.rental_projections_per_units &&
                        projection.rental_per === "both"
                          ? "$" +
                            this.formatDollars(
                              projection.rental_projections_per_units,
                            )
                          : "",
                    },
                    {
                      text1: projection.tag+" RENTAL PROJECTIONS PER S/F",
                      text2:
                        projection.rental_projections_per_sf &&
                        projection.rental_per === "both"
                          ? "$" +
                            this.formatDollars(
                              projection.rental_projections_per_sf,
                            )
                          : "",
                    },
                    {
                      text1: projection.tag+" RENTAL PROJECTIONS PER UNIT",
                      text2:
                        projection.rental_per === "unit" &&
                        projection.rental_amount
                          ? "$" + this.formatDollars(projection.rental_amount)
                          : "",
                    },
                    {
                      text1: projection.tag+" RENTAL PROJECTIONS PER S/F",
                      text2:
                        projection.rental_per === "sf" &&
                        projection.rental_amount
                          ? "$" + this.formatDollars(projection.rental_amount)
                          : "",
                    },
                  )
                }
              }
          }
        })

      })

      this.tablesConstructionDetails[0].items.push(
        {
          text1: "AMOUNT OF UNITS",
          text2: this.deal.construction.amount_units,
        },
        {
          text1: "AMOUNT OF UNITS OCCUPIED",
          text2: this.deal.investment_details.numberUnitOccupied,
        },
        {
          text1: "RENTABLE/SELLABLE SF",
          text2: this.deal.construction.square_footage,
        },
        {
          text1: "NUMBER OF FLOORS",
          text2: this.deal.construction.floors,
        },
        {
          text1: "SQUARE FOOTAGE OCCUPIED",
          text2: this.deal.investment_details.squareFootageOccupied,
        },
      )

      let plansOrder;
      (this.deal.construction.plans === 'sell')
				? plansOrder = ['sell', 'rent']
				: plansOrder = ['rent', 'sell']

      plansOrder.forEach((element, index) => {
        if(element === 'sell') {
          if(this.deal.construction.projections !== '') {
            this.tablesConstructionDetails[0].items.push(
              {
                text1: index === 0 ? 'PRIMARY OPTION' : 'FALLBACK OPTION',
                text2: "",
                text3: "bold",
                text4: "show",
              },
              {
                text1: "SALES PROJECTIONS PER UNIT",
                text2:
                  this.deal.construction.projections_per_units &&
                  this.deal.construction.projections === "both"
                    ? "$" +
                      this.formatDollars(this.deal.construction.projections_per_units)
                    : "",
              },
              {
                text1: "SALES PROJECTIONS PER S/F",
                text2:
                  this.deal.construction.projections_per_sf &&
                  this.deal.construction.projections === "both"
                    ? "$" +
                      this.formatDollars(this.deal.construction.projections_per_sf)
                    : "",
              },
              {
                text1: "SALES PROJECTIONS PER UNIT",
                text2:
                  this.deal.construction.projections_sales &&
                  this.deal.construction.projections === "unit"
                    ? "$" +
                      this.formatDollars(this.deal.construction.projections_sales)
                    : "",
              },
              {
                text1: "SALES PROJECTIONS PER S/F",
                text2:
                  this.deal.construction.projections_sales &&
                  this.deal.construction.projections === "sf"
                    ? "$" +
                      this.formatDollars(this.deal.construction.projections_sales)
                    : "",
              },
              {
                text1: this.constructionNameNetProfites(),
                text2: this.constructionTotalNetProfites(),
                text3: "bold",
              },
            )
          }
        } else {
          if(this.deal.construction.rental_per) {
            this.tablesConstructionDetails[0].items.push(
              {
                text1: index === 0 ? 'PRIMARY OPTION' : 'FALLBACK OPTION',
                text2: "",
                text3: "bold",
                text4: "show",
              },
              {
                text1: "RENTAL PROJECTIONS PER UNIT",
                text2:
                  this.deal.construction.rental_projections_per_units &&
                  this.deal.construction.rental_per === "both"
                    ? "$" +
                      this.formatDollars(
                        this.deal.construction.rental_projections_per_units,
                      )
                    : "",
              },
              {
                text1: "RENTAL PROJECTIONS PER S/F",
                text2:
                  this.deal.construction.rental_projections_per_sf &&
                  this.deal.construction.rental_per === "both"
                    ? "$" +
                      this.formatDollars(
                        this.deal.construction.rental_projections_per_sf,
                      )
                    : "",
              },
              {
                text1: "RENTAL PROJECTIONS PER UNIT",
                text2:
                  this.deal.construction.rental_per === "unit" &&
                  this.deal.construction.rental_amount
                    ? "$" + this.formatDollars(this.deal.construction.rental_amount)
                    : "",
              },
              {
                text1: "RENTAL PROJECTIONS PER S/F",
                text2:
                  this.deal.construction.rental_per === "sf" &&
                  this.deal.construction.rental_amount
                    ? "$" + this.formatDollars(this.deal.construction.rental_amount)
                    : "",
              },
              {
                text1: this.constructionNameTotalIncome(),
                text2: this.constructionTotalOperatingIncomeOnly(),
                text3: "bold",
              },
            )
          }
        }
      })

      this.tablesConstructionDetails[0].items = this.checkData(
        this.tablesConstructionDetails[0].items,
      )
    },
    loanDetails() {
      this.tablesLoanDetails[0].items = [
        {
          text1: "LOAN TYPE",
          text2:
            this.deal.loan_type.charAt(0).toUpperCase() +
            this.deal.loan_type.slice(1).toLowerCase(),
        },
        {
          text1: "LENDER TYPE",
          text2: this.setLenderType(this.deal.type_of_loans),
        },
        {
          text1: "LOAN AMOUNT REQUESTED",
          text2: this.deal.construction_loan.loanAmount
            ? "$" + this.formatDollars(this.deal.construction_loan.loanAmount)
            : "",
        },
        {
          text1: "NEW PURCHASE",
          text2: this.yesNo(this.deal.construction_loan.buying_land),
        },
        {
          text1: "PROPERTY DEBT",
          text2: this.yesNo(this.deal.construction_loan.debt_on_property),
        },
        {
          text1: "INITIAL PURCHASE PRICE",
          text2: this.deal.construction_loan.purchase_price
            ? "$" +
              this.formatDollars(this.deal.construction_loan.purchase_price)
            : "",
        },
        {
          text1: "INITIAL PURCHASE DATE",
          text2: this.changeDateFormat(
            this.deal.construction_loan.purchase_date,
          ),
        },
        {
          text1: "DEBT AMOUNT",
          text2: this.deal.construction_loan.debt_amount
            ? "$" + this.formatDollars(this.deal.construction_loan.debt_amount)
            : "",
        },
        {
          text1: "LENDER NAME",
          text2: this.deal.construction_loan.lender_name,
        },
      ]

      this.tablesLoanDetails[0].items = this.checkData(
        this.tablesLoanDetails[0].items,
      )
    },
  },
})
</script>

<style lang="scss" scoped>
.individualDeal__wrapper {
  padding: 0 52px 26px 42px;

  @include mq($xl) {
    padding: 0 20px 26px;
  }
}
</style>
