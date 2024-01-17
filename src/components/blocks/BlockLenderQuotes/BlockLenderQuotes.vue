<template>
  <div class="lender-quotes">
    <div class="lender-quotes__tabs-holder">
      <PartTableTabs
        :table-tabs="tableTabs"
        @setActiveIndex="setActiveIndex"
      />
    </div>
    <div class="lender-quotes__filters-holder">
      <BlockLenderFilters :lender-filters="lenderFilters" />
    </div>
    <div class="lender-quotes__table-holder">
      <PartTableHead :table-buttons="tableButtons" />
      <perfect-scrollbar class="table-holder-ps">
        <template v-for="(table, index) in tables">
          <BlockTable 
            ref="childComponent"
            :key="index"
            :table="table"
            :table-collapse="true"
            :tooltip="tooltip"
          />
        </template>
      </perfect-scrollbar>
      <!-- TODO: Show loader when new data comes in -->
      <div
        v-if="loader"
        class="table-loader"
      >
        <span class="loader" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import PartTableTabs from '@/components/parts/PartTableTabs.vue'
    import BlockLenderFilters from '@/components/blocks/BlockLenderFilters.vue'
    import BlockTable from '@/components/blocks/BlockTable.vue'
    import PartTableHead from '@/components/parts/PartTableHead.vue'

    interface Data {
        tableTabs,
        tables,
        lenderFilters,
        tableButtons,
        tooltip,
        activeIndex: number,
        loader: boolean
    }

    export default Vue.extend({

        components: {
            PartTableTabs,
            BlockLenderFilters,
            BlockTable,
            PartTableHead,
        },

        data(): Data {
            return {
                loader: false,
                activeIndex: 0,

                tableButtons: [
                    {
                        title: 'Delete Quotes',
                        icon: 'trash',
                    },
                ],

                tooltip: {
                    text: 'Some text goes here',
                    active: true,
                },

                lenderFilters: {
                    deals: 29,
                    categorys: {
                        btn: true,
                        list: [
                            {
                                title: 'Property Type',
                                val: 'Retail',
                            },
                            {
                                title: 'Neighbourhoods',
                                val: 'Bronx',
                            },
                            {
                                title: 'Date Posted',
                                val: 'Today',
                            },
                            {
                                title: 'Status',
                                val: 'Term Sheet',
                            },
                            {
                                title: 'Loan Size',
                                val: '$5k - $10k',
                            },
                            {
                                title: 'Priority',
                                val: 'Recourse',
                            },
                        ],
                    },
                },

                tables: [
                    {
                        columns: [
                            {
                                label: 'Address',
                                field: 'location',
                            },
                            {
                                label: 'Type',
                                field: 'property_type',
                            },
                            {
                                label: 'Broker',
                                field: 'broker',
                            },
                            {
                                label: 'Loan amount',
                                field: 'purchase_loan',
                            },
                            {
                                label: 'Deal sensitivities',
                                field: 'sensitivity',
                            },
                            {
                                label: 'Quotes',
                                field: 'quotes',
                            },
                            {
                                label: 'Notes',
                                field: 'notes',
                            },
                        ],
                        rows: [
                            {
                                id: 0, 
                                location: {
                                    street_address: 'Brooklyn, Cypress Hills, Fulton St',
                                },
                                property_type: 'Retail',
                                broker: 'John Johnson',
                                purchase_loan: {
                                    loan_amount: 5600000,
                                },
                                sensitivity: {
                                    dollarAmount: 4,
                                    fees: 4,
                                    interestRate: 4,
                                    leverage: 10,
                                    recourse: 10,
                                    timeToClose: 4,
                                },
                                quotes: {
                                    val: '21',
                                    new: false,
                                },
                                notes: 2,
                                children: [
                                    { 
                                        id: 1, 
                                        location: 'QUOTE 1',
                                        property_type: '80%',
                                        broker: '5 yrs',
                                        purchase_loan: 1600,
                                        sensitivity: 1600,
                                        quotes: 'Term Sheet',
                                    },
                                    { 
                                        id: 2, 
                                        location: 'QUOTE 1',
                                        property_type: '80%',
                                        broker: '5 yrs',
                                        purchase_loan: 1600,
                                        sensitivity: 1600,
                                        quotes: 'Term Sheet',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        buttons: [
                            {
                                title: 'Delete Quotes',
                                icon: 'trash',
                            },
                        ],
                        columns: [
                            {
                                label: 'Address',
                                field: 'location',
                            },
                            {
                                label: 'Type',
                                field: 'property_type',
                            },
                            {
                                label: 'Broker',
                                field: 'broker',
                            },
                            {
                                label: 'Loan amount',
                                field: 'purchase_loan',
                            },
                            {
                                label: 'Deal sensitivities',
                                field: 'sensitivity',
                            },
                            {
                                label: 'Quotes',
                                field: 'quotes',
                            },
                            {
                                label: 'Notes',
                                field: 'notes',
                            },
                        ],
                        rows: [
                            {
                                id: 0, 
                                location: {
                                    street_address: 'Brooklyn, Cypress Hills, Fulton St',
                                },
                                type: 'Retail',
                                broker: 'John Johnson',
                                purchase_loan: {
                                    loan_amount: 5600000,
                                },
                                sensitivity: {
                                    dollarAmount: 4,
                                    fees: 4,
                                    interestRate: 0,
                                    leverage: 0,
                                    recourse: 0,
                                    timeToClose: 4,
                                },
                                quotes: {
                                    val: '21',
                                    new: false,
                                },
                                notes: 2,
                                children: [
                                    { 
                                        id: 1, 
                                        location: 'QUOTE 1',
                                        property_type: '80%',
                                        broker: '5 yrs',
                                        purchase_loan: 1600,
                                        sensitivity: 1600,
                                        quotes: 'Term Sheet',
                                    },
                                    { 
                                        id: 2, 
                                        location: 'QUOTE 1',
                                        property_type: '80%',
                                        broker: '5 yrs',
                                        purchase_loan: 1600,
                                        sensitivity: 1600,
                                        quotes: 'Term Sheet',
                                    },
                                ],
                            },
                        ],
                    },
                ],

                tableTabs: {
                    titles: ['Manage Quotes'],
                },
            }
        },

        // TODO @nikola popov this is just copied from Block Broker quotes so please check this 
        async beforeMount(){
            (!this.allQuotes) 
                // ? await this.$store.dispatch('getQuotesBroker', {page: 1})
                // : this.table.rows = this.allQuotes;
                // TODO @nikola popov please check if this preloader $emit is in right place
                this.$emit('getPreloader')
        },

        methods: {
            setActiveIndex(index) {
                this.activeIndex = index
                this.$refs.childComponent.removeActive()
            },
        },
    })
</script>

<style lang="scss" scoped>
    .lender-quotes__filters-holder {
        background-color: $white;
        margin-right: 15px;

        @include mq(1024px) {
            margin-right: 10px;
        }
    }

    .lender-quotes__tabs-holder {
        padding-right: 15px;

        @include mq(1024px) {
            padding-right: 10px;
        }
    }

    .lender-quotes__table-holder {
        padding-top: 23px;
        position: relative;
    }

    .table-holder-ps {
        max-height: 55vh;
        padding-right: 15px;

        @include mq(1024px) {
            padding-right: 10px;
        }
    }

    .table-loader {
        width: calc(100% - 30px);
    }

    :deep() {
        .ps__rail-y:hover > .ps__thumb-y,
        .ps__rail-y:focus > .ps__thumb-y,
        .ps__rail-y.ps--clicking .ps__thumb-y {
            width: 8px;
            background-color: $blue-chill;

            @include mq(1024px) {
                width: 4px;
            }
        }

        .ps .ps__rail-x:hover,
        .ps .ps__rail-y:hover,
        .ps .ps__rail-x:focus,
        .ps .ps__rail-y:focus,
        .ps .ps__rail-x.ps--clicking,
        .ps .ps__rail-y.ps--clicking {
            background-color: $athens-gray;
        }

        .ps__rail-y {
            width: 8px;
            max-height: 90%;

            @include mq(1024px) {
                width: 4px;
            }
        }

        .ps__thumb-y {
            background-color: $blue-chill;
            width: 8px;
            max-height: 90%;

            @include mq(1024px) {
                width: 4px;
            }
        }
    }
</style>