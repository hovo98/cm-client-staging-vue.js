<template>
  <div :class="!noData ? 'broker-deals' : 'broker-deals page-no-data'">
    <div class="broker-deals__banner"><!-- v-if="!hasSubscription">-->
        <div class="broker-deals__banner-text">
            <h1>Post Unlimited Deals for FREE on Finance Lobby!</h1>
            <ul>
                <li>Absolutely no charge for posting deals</li>
                <li>No credit card required to get started</li>
                <li>Pay only if you accept a quote</li>
            </ul>
        </div>
    </div>
    <div class="broker-deals__tabs-holder">
      <PartTableTabs
        ref="tableTabsActive"
        :table-tabs="tableTabs"
        :table-draft-rows="tableDrafts.rows"
        @setActiveIndex="setActiveIndex"
      />
    </div>
    <div
      v-show="activeIndex === 0"
      class="broker-deals__filters-holder"
      :class="non_beta_user === true ? 'hidden':''"
    >
      <BlockBrokerFilters
        :pro="'deal'"
        @clearMap="clearMap"
        @setTableLoader="setTableLoader"
      />
    </div>
    <div
      v-show="activeIndex === 0"
      class="broker-deals__table-holder broker-deals__table-holder--deals"
    >
      <PartTableHead
        :table-buttons="tableButtons"
        :selected-rows="selectedRows"
        :table="table"
        :title="'dealDefault'"
        @openPopup="openPopup"
        @openPopupDelete="openPopupDelete"
      />

      <b-row v-if="!non_beta_user">
        <div class="side-table">
          <BlockTable
            ref="childComponent0"
            :table.sync="table"
            :title="'deals'"
            :from="'broker'"
            :no-data="noData"
            @getSelectedRows="getSelectedRows"
            @clearMap="clearMap"
          />
        </div>
        <div class="side-map">
          <MapFilter
            ref="table"
            :rows="table.rows"
          />
        </div>
      </b-row>
      <b-row v-else>
        <div class="side-table side-table--alt">
          <div class="side-table__non-beta-wrapper">
            <div class="side-table__non-beta-content">
              <span class="side-table__non-beta-pretitle">We're nearly ready -<br> and you'll be the first to know when we are!</span>
              <h1 class="side-table__non-beta-title">ELATED CLIENTS<br> EFFORTLESS DEALS<br> EXTRAORDINARY GROWTH<br> EARTHSHAKING TECHNOLOGY<br> <span>COMING SOON</span></h1>
              <p class="side-table__non-beta-text"><span class="bigger-text">Want beta access?</span><br> Contact us at <a href="mailto:hello@financelobby.com">hello@financelobby.com</a></p>
            </div>

            <div class="side-table__non-beta-image">
              <img
                src="@/assets/images/brokers-gif.gif"
                alt=""
              >
            </div>
          </div>
        </div>
      </b-row>
    </div>
    <div
      v-show="activeIndex === 1"
      class="broker-deals__table-holder broker-deals__table-holder--drafts"
      :class="tableDrafts.rows.length !== 0 ? '' : 'table-tabs-disable'"
    >
      <PartTableHead
        :table-buttons="tableButtonsDrafts"
        :selected-rows="selectedRows"
        :table="tableDrafts"
        :title="'dealDefaultDraft'"
        @openPopupDelete="openPopupDelete"
      />
      <b-row>
        <div class="side-table">
          <BlockTable
            ref="childComponent1"
            :table.sync="tableDrafts"
            :active-index="activeIndex"
            :title="'drafts'"
            :from="'broker'"
            @getSelectedRows="getSelectedRows"
          />
        </div>
        <div class="side-map">
          <MapFilter
            ref="tableDrafts"
            :rows="tableDrafts.rows"
          />
        </div>
      </b-row>
    </div>
    <transition name="fade-in-fast">
      <Popup
        v-if="showPopup"
        :send-tolender-rows="sendTolenderRows"
        @closePopup="closePopup"
      />
    </transition>
    <transition name="fade-in-fast">
      <BlockPopupDeleteDeal
        v-if="showPopupDelete"
        @closePopupDelete="closePopupDelete"
        @confirmDeleteDeal="confirmDeleteDeal"
      />
    </transition>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import PartTableTabs from '@/components/parts/PartTableTabs.vue'
    import BlockBrokerFilters from '@/components/blocks/BlockBrokerFilters.vue'
    import BlockTable from '@/components/blocks/BlockTable.vue'
    import PartTableHead from '@/components/parts/PartTableHead.vue'
    import { mapState } from 'vuex'
    import Popup from '@/components/blocks/BlockPopup/BlockPopupSendToLender.vue'
    import MapFilter from '@/components/blocks/BlockMapFilter.vue'
    import BlockPopupDeleteDeal from '@/components/blocks/BlockPopup/BlockPopupDeleteDeal.vue'
    import GlobalNot from "@/services/Notification"

    interface Data {
        tableTabs,
        table,
        tableDrafts,
        tableButtons,
        tableButtonsDrafts,
        activeIndex: number,
        selectedRows,
        showPopup: boolean,
        showPopupDelete: boolean,
        sendTolenderRows,
        sendLoaderState: string
        deleteIds,
        noData: boolean
    }

    export default Vue.extend({

        components: {
            PartTableTabs,
            BlockBrokerFilters,
            BlockTable,
            PartTableHead,
            Popup,
            MapFilter,
            BlockPopupDeleteDeal,
        },

        data(): Data {
            return {
                showPopup: false,
                showPopupDelete: false,
                sendTolenderRows: [],
                activeIndex: 0,
                selectedRows: [],
                sendLoaderState: '',
                deleteIds: [],
                noData: false,
                tableButtons: [
                    {
                        title: 'Share Deal',
                        icon: 'plane-cl',
                        dispatch: 'sendToLenders',
                    },
                    // TODO for post MVP
                    // {
                    //     title: 'Block a Lender',
                    //     icon: 'ban-solid',
                    //     dispatch: 'blockALenders'
                    // },
                    {
                        title: 'Delete Deal',
                        icon: 'trash',
                        dispatch: 'deleteDeal',
                    },
                ],

                tableButtonsDrafts: [
                    {
                        title: 'Delete Deal',
                        icon: 'trash',
                        dispatch: 'deleteDeal',
                    },
                ],

                table: {
                    columns: [
                        {
                            label: 'Address',
                            field: 'location',
                            sortable: false,
                        },
                        {
                            label: 'Date posted',
                            field: 'finished_at',
                            sortable: false,
                            type: 'date',
                            dateInputFormat: 'Pp',
                            dateOutputFormat: 'Pp',
                        },
                        {
                            label: 'Property type',
                            field: 'type',
                            sortable: false,
                        },
                        {
                            label: 'Deal sensitivities',
                            field: 'sensitivity',
                            sortable: false,
                        },
                        {
                            label: 'Deal Type',
                            field: 'deal_type',
                            sortable: false,
                        },
                    ],
                    rows: [],
                },

                tableDrafts: {
                    columns: [
                        {
                            label: 'Address',
                            field: 'location',
                            sortable: false,
                        },
                        {
                            label: 'Date posted',
                            field: 'finished_at',
                            sortable: false,
                            type: 'date',
                            dateInputFormat: 'Pp',
                            dateOutputFormat: 'Pp',
                        },
                        {
                            label: 'Property type',
                            field: 'property_type',
                            sortable: false,
                        },
                        {
                            label: 'Deal sensitivities',
                            field: 'sensitivity',
                            sortable: false,
                        },
                        {
                            field: 'finish',
                            label: 'Deal status',
                            sortable: false,
                        },
                    ],
                    rows: [],
                },

                tableTabs: {
                    tabsInfo: false,
                    titles: [
                        {
                            title: 'Published Deals',
                            tab: 'GENERAL',
                        },
                        {
                            title: 'Drafts',
                            tab: 'DRAFT',
                        },
                    ],
                },
            }
        },

        watch: {
            deals() {
                this.table.rows = this.deals
            },
          dealDefault() {
                this.table.columns = this.dealDefaultColumns.filter(ele => this.dealDefault.includes(ele.field))
            },
            dealsDraft() {
                this.tableDrafts.rows = this.dealsDraft
            },
            activeIndex() {
                this.selectedRows = []
            },
        },

		/**
         * @author Nikola Popov
         * @description
         *  get all deals
         */
        async beforeMount(){
            this.$store.commit('SET_DEAL_CONTEXT', 'GENERAL')
            if(this.non_beta_user) {
                this.$emit('getPreloader')
                return
            }
            (!this.deals)
                ? await this.$store.dispatch('getDealsBroker', { pagination: {page: 1}, obj: {context: 'GENERAL', filterName: 'GENERAL', searchTerms: '', loanSize: {min:0, max:200000000}, assetTypes: ['GENERAL'], sort: 'GENERAL', by: 'DESC'}})
                : this.table.rows = this.deals;

            (!this.dealsDraft)
                ? await this.$store.dispatch('getDealsBroker', { pagination: {page: 1}, obj: {context: 'DRAFT', filterName: 'GENERAL', searchTerms: '', loanSize: {min:0, max:200000000}, assetTypes: ['GENERAL'], sort: 'GENERAL', by: 'DESC'}})
                : this.tableDrafts.rows = this.dealsDraft

            await this.$store.dispatch('getDealManageTableBroker')

            this.$emit('getPreloader')

            this.checkRows()
        },

        computed: {
            ...mapState({
                deals: state => state['FilterDeal'].dealsBroker,
                dealsDraft: state => state['FilterDeal'].dealsDraftBroker,

                propertyType: state => state['FilterDeal'].propertyType,
                loanSize: state => state['FilterDeal'].loanSize,
                search: state => state['FilterDeal'].search,

                dealDefault: state => state['ManageTable'].dealDefault,
                dealDefaultColumns: state => state['ManageTable'].dealDefaultColumns,
                non_beta_user: state => state['User'].non_beta_user,
			}),

            subscription() {
                return this.$store.state.Broker.subscription
            },
            hasSubscription() {
                return this.subscription?.status
            },
        },

        methods: {
            setTableLoader(flag) {
                this.$refs['childComponent0'].changeLoader(flag)
            },
            setActiveIndex(index) {
                this.activeIndex = index
                if(this.$refs['childComponent'+index]) {
                    this.$refs['childComponent'+index].removeActive()
                }
            },
            getSelectedRows(arr) {
                this.selectedRows = arr
            },
            clearMap() {
                this.$refs['table'].removeMarkerFromTable()
            },
            openPopup(rows) {
                this.showPopup = true
                this.sendTolenderRows = rows
            },
            closePopup() {
                this.showPopup = false
                this.sendTolenderRows = []
            },
            openPopupDelete(ids) {
                this.showPopupDelete = true
                this.deleteIds = ids
                const arrIds = []
                ids.forEach(element => {
                    arrIds.push(element.id)
                })
                this.arrIds = arrIds
            },
            closePopupDelete() {
                this.showPopupDelete = false
                this.deleteIds = []
                this.arrIds = []
            },
            async confirmDeleteDeal() {
                await this.$store.dispatch('deleteDeal', this.deleteIds).then(async response => {
                    if(response.status) {
                        (this.activeIndex === 1)
                            ? this.removeFromTableArray('tableDrafts', this.arrIds, 'dealsDraftBroker', this.activeIndex)
                            : this.removeFromTableArray('table', this.arrIds, 'dealsBroker', this.activeIndex)
                    }

                    if(this.activeIndex === 1) {
                        this.setTableLoader(true)
                        this.clearMap()
                        await this.$store.dispatch('getDealsBroker', { pagination: {page: 1}, obj: {context: 'GENERAL', filterName: 'GENERAL', searchTerms: '', loanSize: {min:0, max:200000000}, assetTypes: ['GENERAL'], sort: 'GENERAL', by: 'DESC'}})
                        this.setTableLoader(false)
                    } else {
                        this.setTableLoader(true)
                        this.clearMap()
                        await this.$store.dispatch('getDealsBroker', { pagination: {page: 1}, obj: {context: 'DRAFT', filterName: 'GENERAL', searchTerms: '', loanSize: {min:0, max:200000000}, assetTypes: ['GENERAL'], sort: 'GENERAL', by: 'DESC'}})
                        this.setTableLoader(false)
                    }
                });
                (this.arrIds.length > 1)
                    ? new GlobalNot('Deals are deleted', 'success')
                    : new GlobalNot('Deal has been deleted', 'success')
                this.showPopupDelete = false
                this.deleteIds = []
                this.arrIds = []
            },
            removeFromTableArray(str, ids, state, index) {
                const arr = []
                this[str].rows.forEach((element) => {
                    if(!ids.includes(parseInt(element.id))) {
                        arr.push(element)
                    }
                })
                this.selectedRows = []
                if(this.$refs['childComponent'+index]) {
                    this.$refs['childComponent'+index].removeActive()
                }
                this.$refs[str].removeMarker(ids)
                this.$store.commit('REMOVE_ROW', {str: state, arr: arr})

                if(str === 'tableDrafts' && this.dealsDraft.length === 0) {
                    this.activeIndex = 0
                    this.$refs['tableTabsActive'].setNewTab(0)
                }
            },

            // Check if there is table data
            checkRows() {
                if (this.table.rows.length === 0) {
                    if(this.search === '' && this.propertyType.length === 0 && this.loanSize[0] === 0 && this.loanSize[1] === 200000000) {
                        this.noData = true
                    }
                }
            },
        },
    })
</script>

<style lang="scss" scoped>
    .broker-deals__filters-holder {
        background-color: $white;
    }

    .broker-deals__filters-holder.hidden {
        pointer-events: none;
        opacity: 0.6;
    }

    .broker-deals__table-holder {
        padding-top: 14px;
        max-height: 764px;
    }

    .broker-deals__table-holder--drafts {
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

    .side-table--alt {
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

         @include mq(640px) {
             font-size: 16px;
         }
    }

    .side-table__non-beta-title {
        font-weight: 700;
        font-family: $font-second;
        font-size: 34px;
        letter-spacing: 0.7px;
        line-height: 1.3;
        margin-bottom: 40px;
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
            font-size: 18px;
        }
    }

    .side-table__non-beta-text {
        letter-spacing: 0.38px;
        font-size: 18px;

        a {
            color: $blue-chill;
            font-weight: 600;

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
        font-size: 26px;
        font-weight: 700;
        color: $shark;

        @include mq(1199px) {
            display: block;
            font-size: 20px;
        }
    }

    .side-table__non-beta-image {
        max-width: 650px;
        width: 100%;
        height: auto;
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 0 auto;

        img {
            border-radius: 10px;
        }

        @include mq(1199px) {
            max-width: 100%;
            align-items: flex-start;
        }
    }
</style>