<template>
  <div :class="!noData ? 'broker-quotes' : 'broker-quotes page-no-data'">
    <div class="broker-quotes__tabs-holder">
      <PartTableTabs
        :table-tabs="tableTabs"
        @setActiveIndex="setActiveIndex"
      />
    </div>
    <div class="broker-quotes__filters-holder">
      <BlockBrokerFilters
        :pro="'quote'"
        @clearMap="clearMap"
        @setTableLoader="setTableLoader"
      />
    </div>
    <div
      v-if="activeIndex === 0"
      class="broker-quotes__table-holder"
    >
      <PartTableHead
        :table-buttons="tableButtons"
        :selected-rows="selectedRows"
        :table="table"
        :title="'quoteDefaultBroker'"
        @openPopup="openPopup"
        @openPopupDelete="openPopupDelete"
      />

      <b-row>
        <div class="side-table">
          <BlockTable
            ref="childComponent0"
            :table.sync="table"
            :active-index="activeIndex"
            :title="'quotes'"
            :from="'broker'"
            @clearMap="clearMap"
            @getSelectedRows="getSelectedRows"
          />
          <span
            v-if="noData"
            class="broker-quotes__no-data"
          >No quotes yet</span>
        </div>
        <div class="side-map">
          <MapFilter
            ref="table"
            :rows="table.rows"
          />
        </div>
      </b-row>
    </div>
    <!-- For post-mvp -->
    <!-- <div class="broker-quotes__table-holder broker-quotes__table-holder--hidden" v-else>
            <PartTableHead :tableButtons="tableButtonsHidden" :selectedRows="selectedRows"/>
            <BlockTable 
                :table="tableHidden"
                :title="'quotesHidden'"
                :from="'broker'"
                @getSelectedRows="getSelectedRows"
                ref="childComponent"
            />
        </div> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import PartTableTabs from "@/components/parts/PartTableTabs.vue"
import BlockBrokerFilters from "@/components/blocks/BlockBrokerFilters.vue"
import BlockTable from "@/components/blocks/BlockTable.vue"
import PartTableHead from "@/components/parts/PartTableHead.vue"
import MapFilter from "@/components/blocks/BlockMapFilter.vue"
import { mapState } from "vuex"

interface Data {
  tableTabs;
  table;
  //tableHidden, post-mvp
  //brokerFilters,
  tableButtons;
  tableButtonsHidden;
  activeIndex: number;
  selectedRows;
  noData: boolean;
}

export default Vue.extend({

  components: {
    PartTableTabs,
    BlockBrokerFilters,
    BlockTable,
    PartTableHead,
    MapFilter,
  },
  data(): Data {
    return {
      activeIndex: 0,
      noData: false,
      selectedRows: [],
      tableButtons: [
        // post-mvp
        // {
        //     title: 'Hide Quotes',
        //     icon: 'eye'
        // },
      ],

      tableButtonsHidden: [
        // post-mvp
        // {
        //     title: 'Unhide Quotes',
        //     icon: 'eyeslash'
        // }
      ],

      // brokerFilters: {
      //     categorys: {
      //         btn: false,
      //         list: [
      //             {
      //                 icon: 'location',
      //                 title: 'Brooklyn, New York'
      //             }
      //         ]
      //     }
      // },

      table: {
        columns: [
          {
            label: "Address",
            field: "location",
            sortable: false,
          },
          {
            label: "Type",
            field: "deal_type",
            sortable: false,
          },
          {
            label: "Dollar amount",
            field: "dollarAmount",
            sortable: false,
          },
          {
            label: "Interest rate",
            field: "interestRate",
            sortable: false,
          },
        ],
        rows: [],
      },

      // post-mvp
      // tableHidden: {
      //     columns: [
      //         {
      //             label: 'Address',
      //             field: 'location',
      //         },
      //         {
      //             label: 'Type',
      //             field: 'property_type'
      //         },
      //         {
      //             label: 'Dollar amount',
      //             field: 'dollar_amount',
      //         },
      //         {
      //             label: 'Interest rate',
      //             field: 'interest_rate',
      //         },
      //         {
      //             label: 'Rate Term',
      //             field: 'rate_term',
      //         },
      //         {
      //             label: 'Deal sensitivities',
      //             field: 'sensitivity',
      //         }
      //     ],
      //     rows: [
      //         {
      //             id: 0,
      //             location: {
      //                 street_address: 'Brooklyn, Cypress Hills, Fulton St',
      //             },
      //             property_type: 'Retail',
      //             dollar_amount: '5600000',
      //             interest_rate: '85%',
      //             rate_term: '5 yrs',
      //             sensitivity: {
      //                 dollarAmount: 1,
      //                 fees: 1,
      //                 interestRate: 1,
      //                 leverage: 3,
      //                 recourse: 4,
      //                 timeToClose: 4
      //             }
      //         },
      //     ],
      // },

      tableTabs: {
        tabsInfo: false,
        // titles: ['View/Manage Quotes', 'Hidden Quotes']          post-mvp
        titles: [
          {
            title: "View/Manage Quotes",
            tab: "GENERAL",
          },
        ],
      },
    }
  },

  computed: {
    ...mapState({
      allQuotes: (state) => state["FilterQuotes"].allQuotes,

      searchQuote: (state) => state["FilterQuotes"].search,
      checkedSponsorNames: (state) => state["FilterQuotes"].checkedSponsorNames,

      quoteDefaultBroker: (state) => state["ManageTable"].quoteDefaultBroker,
      quoteDefaultBrokerColumns: (state) =>
        state["ManageTable"].quoteDefaultBrokerColumns,
    }),
  },

  watch: {
    allQuotes() {
      this.setQuotes()
    },
    quoteDefaultBroker() {
      this.table.columns = this.quoteDefaultBrokerColumns.filter((ele) =>
        this.quoteDefaultBroker.includes(ele.field),
      )
    },
    activeIndex() {
      this.selectedRows = []
    },
  },

  async beforeMount() {
    !this.allQuotes
      ? await this.$store.dispatch("getQuotesBroker", {
          pagination: { page: 1 },
          obj: {
            sponsorNames: [],
            sponsorName: "",
            searchLocation: "",
            sort: "GENERAL",
            by: "DESC",
          },
        })
      : this.setQuotes()

    await this.$store.dispatch("getQuoteManageTableBroker")

    this.$emit("getPreloader")
    this.checkRows()
  },

  methods: {
    setTableLoader(flag) {
      this.$refs["childComponent0"].changeLoader(flag)
    },

    clearMap() {
      this.$refs["table"].removeMarkerFromTable()
    },

    openPopup() { console.log('openPopup') },

    openPopupDelete() { console.log('openPopupDelete') },

    setQuotes() {
      const arr = []
      this.allQuotes.forEach((element) => {
        const obj = {
          id: "",
          location: "",
          deal_type: "",
          dollarAmount: "",
          interestRate: "",
          rateTerm: "",
          origFee: "",
          sensitivities: "",
          lender_id: "",
          quote_id: "",
        }
        obj.id = element.deal?.id

        if (element.deal?.address) {
          obj.location = element.deal?.address
        }

        if (element.deal?.deal_type) {
          obj.deal_type = element.deal?.deal_type
        }

        if (element.dollarAmount) {
          obj.dollarAmount = element.dollarAmount
        }

        if (element.rateTerm) {
          obj.rateTerm = element.rateTerm
        }

        if (element.interestRate) {
          obj.interestRate = element.interestRate
        }

        if (element.lender_id) {
          obj.lender_id = element.lender_id
        }

        if (element.origFee) {
          obj.origFee = element.origFee
        }

        if (element.quote_id) {
          obj.quote_id = element.quote_id
        }

        arr.push(obj)
      })
      this.table.rows = arr
    },
    setActiveIndex(index) {
      this.activeIndex = index
      if (this.$refs.childComponent) {
        this.$refs.childComponent.removeActive()
      }
    },
    getSelectedRows(arr) {
      this.selectedRows = arr
    },
    // Check if there is table data
    checkRows() {
      if (this.table.rows.length === 0) {
        if (this.searchQuote === "" && this.checkedSponsorNames.length === 0) {
          this.noData = true
        }
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.broker-quotes__filters-holder {
  background-color: $white;
}

.broker-quotes__table-holder {
  padding-top: 18px;
  max-height: 764px;
}

.side-table {
  padding: 0 0 0 15px;
  position: relative;
  width: 100%;
  min-height: 450px;

  @include mq($xl + 1, min) {
    flex: 0 0 75%;
    max-width: 75%;
  }

  @include mq(1199px) {
    min-height: auto;
    padding: 0 15px;
  }
}

.side-map {
  padding: 0 15px;
  position: relative;
  width: 100%;

  @include mq($xl + 1, min) {
    flex: 0 0 25%;
    max-width: 25%;
  }

  :deep() {
    .slider {
      min-height: 300px;
      height: 100%;
    }

    .vue-map-container {
      height: 100% !important;
      max-height: 600px;
    }
  }

  @include mq($xl) {
    margin-top: 30px;
    margin-bottom: 40px;
  }
}

.broker-quotes__no-data {
  position: absolute;
  bottom: 78px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: 600;

  @include mq(375px) {
    font-size: 20px;
  }
}
</style>
