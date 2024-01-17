<template>
  <div
    :class="[
      !noData ? 'lender-deals' : 'lender-deals page-no-data',
      activeIndex !== 0 ? 'lender-deals__table-holder--white-bg' : '',
    ]"
  >
    <div class="lender-deals__tabs-holder">
      <PartTableTabs
        ref="tableTabsActive"
        :table-tabs="tableTabs"
        :table-saved-rows="tableSaved.rows"
        :table-archived-rows="tableArchived.rows"
        @setActiveIndex="setActiveIndex"
      />
    </div>
    <div
      class="lender-deals__filters-holder"
      :class="non_beta_user === true ? 'hidden' : ''"
    >
      <BlockLenderFilters
        v-show="activeIndex === 0"
        :pro="'deal'"
        @clearMap="clearMap"
        @setTableLoader="setTableLoader"
      />
    </div>
    <div
      v-show="activeIndex === 0"
      class="lender-deals__table-holder broker-deals__table-holder--deals"
    >
      <PartTableHead
        :table="table"
        :table-buttons="tableButtons"
        :selected-rows="selectedRows"
        :component-index="0"
        :title="'dealDefaultLender'"
        @removeFromTableArrayLender="removeFromTableArrayLender"
        @unCheckRows="unCheckRows"
      />
      <b-row v-if="!non_beta_user">
        <template v-if="!tableShowSec">
          <div class="side-table">
            <BlockTable
              ref="childComponent0"
              :table.sync="table"
              :title="'dealsLender'"
              :no-data="noData"
              :active-index="activeIndex"
              :from="'lender'"
              @getSelectedRows="getSelectedRows"
              @clearMap="clearMap"
            />
          </div>
          <div class="side-map">
            <MapFilter
              ref="table"
              :role="'lender'"
              :rows="table.rows"
            />
          </div>
        </template>
        <template v-else>
          <div class="side-table side-table--alt">
            <div class="side-table__non-beta-wrapper">
              <div class="side-table__non-beta-content">
                <span class="side-table__non-beta-pretitle">Your deals will show up here.</span>
                <h1 class="side-table__non-beta-title">
                  This site is currently undergoing closed beta testing
                </h1>
                <p class="side-table__non-beta-text">
                  <span class="bigger-text">But stay tuned - you'll be notified when<br />
                    we're ready with the perfect deal for you.</span>
                </p>
              </div>

              <div class="side-table__non-beta-image">
                <video
                  autoplay
                  loop
                  muted
                  playsinline
                >
                  <source
                    src="@/assets/images/lender-non-beta-video.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>
        </template>
      </b-row>

      <b-row v-else>
        <div class="side-table side-table--alt">
          <div class="side-table__non-beta-wrapper">
            <div class="side-table__non-beta-content">
              <span class="side-table__non-beta-pretitle">Your deals will show up here.</span>
              <h1 class="side-table__non-beta-title">
                This site is currently undergoing closed beta testing
              </h1>
              <p class="side-table__non-beta-text">
                <span class="bigger-text">But stay tuned - you'll be notified when<br />
                  we're ready with the perfect deal for you.</span>
              </p>
            </div>

            <div class="side-table__non-beta-image">
              <video
                autoplay
                loop
                muted
                playsinline
              >
                <source
                  src="@/assets/images/lender-non-beta-video.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </b-row>
    </div>
    <div
      v-show="activeIndex === 1"
      class="lender-deals__table-holder lender-deals__table-holder--saved"
      :class="tableSaved.rows.length !== 0 ? '' : 'table-tabs-disable'"
    >
      <PartTableHead
        :table="tableSaved"
        :table-buttons="tableButtonsSaved"
        :selected-rows="selectedRows"
        :component-index="1"
        @unCheckRows="unCheckRows"
        @removeFromTableArrayLender="removeFromTableArrayLender"
      />
      <b-row>
        <div class="side-table">
          <BlockTable
            v-if="tableSavedShow"
            ref="childComponent1"
            :table.sync="tableSaved"
            :active-index="activeIndex"
            :title="'saved'"
            :from="'lender'"
            @getSelectedRows="getSelectedRows"
          />
        </div>
        <div class="side-map">
          <MapFilter
            ref="tableSaved"
            :rows="tableSaved.rows"
          />
        </div>
      </b-row>
    </div>
    <div
      v-show="activeIndex === 2"
      class="lender-deals__table-holder lender-deals__table-holder--archived"
      :class="tableArchived.rows.length !== 0 ? '' : 'table-tabs-disable'"
    >
      <PartTableHead
        :table="tableArchived"
        :table-buttons="tableButtonsArchived"
        :selected-rows="selectedRows"
        :component-index="2"
        @checkRows="checkRows"
        @unCheckRows="unCheckRows"
        @removeFromTableArrayLender="removeFromTableArrayLender"
      />
      <b-row>
        <div class="side-table">
          <BlockTable
            v-if="tableArchivedShow"
            ref="childComponent2"
            :table.sync="tableArchived"
            :active-index="activeIndex"
            :title="'archived'"
            :from="'lender'"
            @getSelectedRows="getSelectedRows"
          />
        </div>
        <div class="side-map">
          <MapFilter
            ref="tableArchived"
            :rows="tableArchived.rows"
          />
        </div>
      </b-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import PartTableTabs from "@/components/parts/PartTableTabs.vue"
import BlockLenderFilters from "@/components/blocks/BlockLenderFilters.vue"
import BlockTable from "@/components/blocks/BlockTable.vue"
import PartTableHead from "@/components/parts/PartTableHead.vue"
import { mapState } from "vuex"
import MapFilter from "@/components/blocks/BlockMapFilter.vue"

interface Data {
  tableTabs;
  table;
  tableSaved;
  tableArchived;
  tableButtons;
  tableButtonsSaved;
  tableButtonsArchived;
  activeIndex: number;
  selectedRows;
  tableShow: boolean;
  tableShowSec: boolean;
  tableSavedShow: boolean;
  tableArchivedShow: boolean;
  uncheckAll: boolean;
  noData: boolean;
}

export default Vue.extend({

  components: {
    PartTableTabs,
    BlockLenderFilters,
    BlockTable,
    PartTableHead,
    MapFilter,
  },
  data(): Data {
    return {
      activeIndex: 0,
      tableShowSec: false,
      selectedRows: [],
      noData: false,
      tableButtons: [
        {
          title: "Add to Favorites ",
          icon: "save-regular",
          dispatch: "saveDeal",
        },
        {
          title: "Archive Deal",
          icon: "archive",
          dispatch: "archiveDeal",
        },
        {
          title: "Open deals",
          icon: "external",
          dispatch: "openDeal",
        },
      ],

      tableButtonsSaved: [
        {
          title: "Remove from Favorites",
          icon: "save-regular",
          dispatch: "unsavedDeal",
        },
        {
          title: "Open deals",
          icon: "external",
          dispatch: "openDeal",
        },
      ],

      tableButtonsArchived: [
        {
          title: "Unarchive this deal",
          icon: "archive",
          dispatch: "unarchivedDeal",
        },
        {
          title: "Open deals",
          icon: "external",
          dispatch: "openDeal",
        },
      ],

      table: {
        columns: [
          {
            label: "Address",
            field: "location",
            sortable: false,
          },
          {
            label: "Type",
            field: "type",
            sortable: false,
          },
          {
            label: "Loan amount",
            field: "loan_amount",
            type: "number",
            sortable: false,
          },
          {
            label: "Loan type",
            field: "loan_type",
            sortable: false,
          },
          {
            label: "Deal sensitivities",
            field: "sensitivity",
            sortable: false,
          },
          {
            label: "Quoted",
            field: "quoted",
            sortable: false,
          },
          {
            label: "Quote status",
            field: "quotes_status",
            sortable: false,
          },
        ],
        rows: [],
      },

      tableSaved: {
        columns: [
          {
            label: "Address",
            field: "location",
            sortable: false,
          },
          {
            label: "Type",
            field: "type",
            sortable: false,
          },
          {
            label: "Loan amount",
            field: "loan_amount",
            type: "number",
            sortable: false,
          },
          {
            label: "Loan type",
            field: "loan_type",
            sortable: false,
          },
          {
            label: "Deal sensitivities",
            field: "sensitivity",
            sortable: false,
          },
        ],
        rows: [],
      },

      tableArchived: {
        columns: [
          {
            label: "Address",
            field: "location",
            sortable: false,
          },
          {
            label: "Type",
            field: "type",
            sortable: false,
          },
          {
            label: "Loan amount",
            field: "loan_amount",
            type: "number",
            sortable: false,
          },
          {
            label: "Loan type",
            field: "loan_type",
            sortable: false,
          },
          {
            label: "Deal sensitivities",
            field: "sensitivity",
            sortable: false,
          },
        ],
        rows: [],
      },

      tableTabs: {
        tabsInfo: true,
        isHovering: false,
        dealsNum: 132,
        hiddenNum: 360,
        info: `
                        <p>There are 360 deals hidden based on your preferences. Adjust the filters to temporarily view more deals. To save the adjusted filters as your account preference, click 'Save as my account preferences'. </p>
                        <ul>
                            <li><strong>3 </strong>Deals are below your preferred price range</li>
                            <li><strong>55 </strong>Deals are out of your preferred location </li>
                            <li><strong>188 </strong>Deals are not your preferred loan type</li>
                        </ul>
                    `,
        titles: [
          {
            title: "All Deals",
            tab: "GENERAL",
          },
          {
            title: "Favorites",
            tab: "SAVED",
          },
          {
            title: "Archived Deals",
            tab: "ARCHIVED",
          },
        ],
      },

      tableShow: false,
      tableSavedShow: false,
      tableArchivedShow: false,
      uncheckAll: false,
    }
  },

  watch: {
    deals() {
      this.table.rows = this.deals
    },
    savedDeals() {
      if (this.savedDeals === null) {
        return
      }
      this.tableSaved.rows = this.savedDeals
      this.tableSavedShow = true
    },
    archivedDeals() {
      if (this.archivedDeals === null) {
        return
      }
      this.tableArchived.rows = this.archivedDeals
      this.tableArchivedShow = true
    },
    dealDefaultLender() {
      this.table.columns = this.dealDefaultLenderColumns.filter((ele) =>
        this.dealDefaultLender.includes(ele.field),
      )
    },
  },

  /**
   * @author Nikola Popov
   * @description
   *  get all deals
   */
  async beforeMount() {
    this.$store.commit("SET_DEAL_CONTEXT", "GENERAL")
    if (this.non_beta_user) {
      this.$emit("getPreloader")
      return
    }

    if (!this.deals) {
      await this.$store.dispatch("getDealsLender", {
          pagination: { page: 1 },
          obj: {
            context: "GENERAL",
            filterName: "PERFECT_FIT",
            searchTerms: "",
            loanSize: { min: 0, max: 200000000 },
            assetTypes: ["GENERAL"],
            sort: "GENERAL",
            by: "DESC",
          },
        })
    } else {
      this.table.rows = this.deals
    }

    this.tableShow = true
    this.$emit("getPreloader")

    !this.savedDeals
      ? await this.$store.dispatch("getDealsLender", {
          pagination: { page: 1 },
          obj: {
            context: "SAVED",
            filterName: "PERFECT_FIT",
            searchTerms: "",
            loanSize: { min: 0, max: 200000000 },
            assetTypes: ["GENERAL"],
            sort: "GENERAL",
            by: "DESC",
          },
        })
      : (this.tableSaved.rows = this.savedDeals)
    this.tableSaved.rows.length
      ? (this.tableSavedShow = true)
      : (this.tableSavedShow = false)

    !this.archivedDeals
      ? await this.$store.dispatch("getDealsLender", {
          pagination: { page: 1 },
          obj: {
            context: "ARCHIVED",
            filterName: "PERFECT_FIT",
            searchTerms: "",
            loanSize: { min: 0, max: 200000000 },
            assetTypes: ["GENERAL"],
            sort: "GENERAL",
            by: "DESC",
          },
        })
      : (this.tableArchived.rows = this.archivedDeals)
    this.tableArchived.rows.length
      ? (this.tableArchivedShow = true)
      : (this.tableArchivedShow = false)

    await this.$store.dispatch("getDealManageTableLender")
    if (this.deals?.length === 0) {
      this.tableShowSec = true
    } else {
      this.tableShowSec = false
    }
    this.checkRows()
  },

  computed: {
    ...mapState({
      propertyType: (state) => state["FilterDeal"].propertyType,
      neighbourhoods: (state) => state["FilterDeal"].neighbourhoods,
      loanSize: (state) => state["FilterDeal"].loanSize,
      deals: (state) => state["FilterDeal"].dealsLender,
      savedDeals: (state) => state["FilterDeal"].savedDeals,
      archivedDeals: (state) => state["FilterDeal"].archivedDeals,

      search: (state) => state["FilterDeal"].search,
      sort: (state) => state["FilterDeal"].sort,
      by: (state) => state["FilterDeal"].by,
      context: (state) => state["FilterDeal"].context,

      dealsLenderPagination: (state) =>
        state["FilterDeal"].dealsLenderPagination,

      dealDefaultLender: (state) => state["ManageTable"].dealDefaultLender,
      dealDefaultLenderColumns: (state) =>
        state["ManageTable"].dealDefaultLenderColumns,

      non_beta_user: (state) => state["User"].non_beta_user,
    }),
  },

  methods: {
    unCheckRows(index) {
      this.$refs["childComponent" + index].removeActive()
    },
    setTableLoader(flag) {
      if (this.$refs["childComponent0"]) {
        this.$refs["childComponent0"].changeLoader(flag)
      }
      if (this.$refs["childComponent1"]) {
        this.$refs["childComponent1"].changeLoader(flag)
      }
      if (this.$refs["childComponent2"]) {
        this.$refs["childComponent2"].changeLoader(flag)
      }
    },
    clearMap() {
      if (this.$refs["table"]) {
        this.$refs["table"].removeMarkerFromTable()
      }
    },
    setActiveIndex(index) {
      this.activeIndex = index
      if (this.$refs["childComponent" + index]) {
        this.$refs["childComponent" + index].removeActive()
      }
    },
    getSelectedRows(arr) {
      this.selectedRows = arr
    },
    async removeFromTableArrayLender(str, ids, state, index) {
      if (str === "tableSaved" && index === 0) {
        this.$refs["childComponent" + index].removeActive()
      } else {
        const arr = this.removeRows(str, ids)
        if (this.$refs["childComponent0"] !== undefined) {
          this.$refs["childComponent0"].removeActive()
        }
        if (this.$refs["childComponent1"] !== undefined) {
          this.$refs["childComponent1"].removeActive()
        }
        if (this.$refs["childComponent2"] !== undefined) {
          this.$refs["childComponent2"].removeActive()
        }
        this.$refs[str].removeMarker(ids)
        this.$store.commit("REMOVE_ROW", { str: state, arr: arr })

        if (this[state]?.length === 0) {
          this.activeIndex = 0
          this.$store.commit("SET_DEAL_CONTEXT", "GENERAL")
          this.$refs["tableTabsActive"].setNewTab(0)
        }

        if (str === "table") {
          if (this.dealsLenderPagination.total > 0) {
            this.setTableLoader(true)
            this.clearMap()
            const obj = {
              context: "GENERAL",
              filterName: "PERFECT_FIT",
              searchTerms: this.search,
              loanSize: {
                min: this.loanSize[0],
                max: this.loanSize[1],
              },
              assetTypes: this.propertyType,
              sort: this.sort,
              by: this.by,
            }
            await this.$store.dispatch("getDealsLenderFilter", {
              pagination: { page: 1 },
              obj: obj,
            })
            this.setTableLoader(false)
          }
        }

        if (str === "tableSaved") {
          this.setTableLoader(true)
          this.$store.commit("SET_FAVORITE_DEALS_NULL")
          await this.$store.dispatch("getDealsLender", {
            pagination: { page: 1 },
            obj: {
              context: "SAVED",
              filterName: "PERFECT_FIT",
              searchTerms: "",
              loanSize: { min: 0, max: 200000000 },
              assetTypes: ["GENERAL"],
              sort: "GENERAL",
              by: "DESC",
            },
          })
          this.setTableLoader(false)
        }

        if (str === "tableArchived") {
          this.setTableLoader(true)
          this.clearMap()
          const obj = {
            context: "GENERAL",
            filterName: "PERFECT_FIT",
            searchTerms: this.search,
            loanSize: {
              min: this.loanSize[0],
              max: this.loanSize[1],
            },
            assetTypes: this.propertyType,
            sort: this.sort,
            by: this.by,
          }
          await this.$store.dispatch("getDealsLenderFilter", {
            pagination: { page: 1 },
            obj: obj,
          })
          this.$store.commit("SET_ARCHIVE_DEALS_NULL")
          await this.$store.dispatch("getDealsLender", {
            pagination: { page: 1 },
            obj: {
              context: "ARCHIVED",
              filterName: "PERFECT_FIT",
              searchTerms: "",
              loanSize: { min: 0, max: 200000000 },
              assetTypes: ["GENERAL"],
              sort: "GENERAL",
              by: "DESC",
            },
          })
          this.setTableLoader(false)
        }
      }
      this.checkRows()
    },
    removeRows(str, ids) {
      const arr = []
      this[str].rows.forEach((element) => {
        if (!ids.includes(parseInt(element.id))) {
          arr.push(element)
        }
      })
      return arr
    },
    // Check if there is table data
    checkRows() {
      if (this.table.rows.length === 0) {
        if (
          this.search === "" &&
          this.propertyType.length === 0 &&
          this.loanSize[0] === 0 &&
          this.loanSize[1] === 200000000
        ) {
          this.noData = true
        }
      } else {
        this.noData = false
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.lender-deals__filters-holder {
  background-color: $white;
}

.lender-deals__table-holder {
  padding-top: 23px;
}

.lender-deals__filters-holder.hidden {
  pointer-events: none;
  opacity: 0.6;
}

.lender-deals__table-holder--white-bg .lender-deals__table-holder {
  background-color: $white;
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

.table-tabs-disable {
  display: none;
}

.page-lender-deals .lender-deals__table-holder .side-table--alt {
  max-width: 100%;
  flex: 0 0 99%;

  .side-table__non-beta-wrapper {
    width: 100%;
    height: 100%;
    background-color: $white;
  }
}

.side-table__non-beta-wrapper {
  display: flex;
  padding: 129px 10px;

  @include mq(1199px) {
    flex-direction: column;
    padding: 20px 10px;
  }
}

.side-table__non-beta-content {
  padding: 20px 20px 20px 6.6%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 67px;
  min-width: 587px;

  @include mq(1199px) {
    height: auto;
    align-items: center;
    min-width: auto;
    margin-right: 0;
  }

  @include mq(640px) {
    padding: 0 15px;
  }
}

.side-table__non-beta-pretitle {
  font-size: 21px;
  font-weight: 700;
  color: $shark;
  margin-bottom: 40px;

  @include mq(1199px) {
    font-size: 18px;
    margin-bottom: 30px;
    text-align: center;
  }
}

.side-table__non-beta-title {
  font-weight: 700;
  font-family: $font-second;
  font-size: 34px;
  letter-spacing: 0.7px;
  line-height: 1.3;
  margin-bottom: 40px;
  color: $mosque;
  max-width: 537px;
  span {
    color: $mosque;
  }

  @include mq(1280px) {
    font-size: 28px;
  }

  @include mq(1199px) {
    margin-bottom: 26px;
    text-align: center;
    font-size: 20px;
    br {
      display: none;
    }
  }

  @include mq(640px) {
    font-size: 20px;
  }
}

.side-table__non-beta-text {
  letter-spacing: 0.38px;
  font-size: 18px;

  a {
    color: $blue-chill;
    font-weight: 600;
    text-decoration: underline;
  }
  @include mq(1199px) {
    margin-bottom: 26px;
    text-align: center;
    display: block;
    br {
      display: none;
    }
  }

  @include mq(640px) {
    font-size: 14px;
  }
}

.bigger-text {
  font-size: 21px;
  font-weight: 700;
  color: $shark;

  @include mq(1199px) {
    display: block;
    font-size: 16px;
  }
}

.side-table__non-beta-image {
  max-width: 650px;
  width: 100%;
  // height: 483px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;

  @include mq(1199px) {
    max-width: 100%;
    align-items: flex-start;
  }

  video {
    width: 100%;
  }
}
</style>
