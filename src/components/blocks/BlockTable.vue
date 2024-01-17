<template>
  <div
    class="deals-table-wrap"
    :class="noData ? 'deals-table-wrap--no-data' : ''"
  >
    {{ fillSensitivity() }}
    <!-- Table with row collapse -->
    <div
      v-if="tableCollapse"
      class="deals-table deals-table--collapse"
    >
      <VueGoodTable
        ref="my-table"
        :columns="table.columns"
        :rows="table.rows"
        :group-options="{
          enabled: true,
          collapsable: true
        }"
        :select-options="{
          enabled: true,
          disableSelectInfo: true
        }"
        :sort-options="{
          enabled: true,
        }"
        style-class="custom-vgt-table vgt-table"
        @on-row-click="onRowClick"
        @on-selected-rows-change="selectionChanged"
        @on-sort-change="onColumnFilter"
      >
        <!-- Clickable head -->
        <template
          slot="table-header-row"
          slot-scope="props"
        >
          <template
            v-if="props.column.field === 'location'"
          >
            <span
              v-if="tooltip.active"
              class="tooltip-msg tooltip-msg--extrasmall table-tooltip"
              :data-tooltip="tooltip.text"
            >
              <SvgIcon
                class="tooltip-msg__icon"
                icon-name="ico-exclamation"
              />
            </span>
            {{ streatAddress(props.formattedRow.location, props.row.show_address) }}
          </template>
          <template v-else-if="props.column.field === 'loan_amount'">
            $ {{ formatDollars(props.formattedRow.loan_amount) }}
          </template>
          <span v-else-if="props.column.field === 'sensitivity'">
            <template v-for="(sens) in sensitivity[props.row.id]">
              <span
                v-if="sens === 'fees'"
                :key="sens"
                class="table-sens-cell table-sens-cell--holder"
              >
                <span
                  class="table-sens-cell--item"
                  :class="{'input-select__text-green': sensitivityLabel(props.row.sensitivity[sens]) == 'Flexible', 'input-select__text-red': sensitivityLabel(props.row.sensitivity[sens]) == 'Dealbreaker'}"
                >
                  {{ sensitivityLabel(props.row.sensitivity[sens]) }}
                </span>
                <span class="table-sens-cell--item-sens">Low fees</span>
              </span>
              <span
                v-else-if="sens === 'interestRate'"
                :key="sens"
                class="table-sens-cell table-sens-cell--holder"
              ><span class="table-sens-cell--item">  {{ sensitivityLabel(props.row.sensitivity[sens]) }} </span> <span class="table-sens-cell--item-sens">Low interest rate</span></span>
              <span
                v-else-if="sens === 'leverage'"
                :key="sens"
                class="table-sens-cell table-sens-cell--holder"
              >
                <span
                  class="table-sens-cell--item"
                  :class="{'input-select__text-green': sensitivityLabel(props.row.sensitivity[sens]) == 'Flexible', 'input-select__text-red': sensitivityLabel(props.row.sensitivity[sens]) == 'Dealbreaker'}"
                >
                  {{ sensitivityLabel(props.row.sensitivity[sens]) }}
                </span>
                <span class="table-sens-cell--item-sens">High leverage</span>
              </span>
              <span
                v-else-if="sens === 'recourse'"
                :key="sens"
                class="table-sens-cell table-sens-cell--holder"
              ><span class="table-sens-cell--item">  {{ sensitivityLabel(props.row.sensitivity[sens]) }} </span> <span class="table-sens-cell--item-sens">No recourse</span></span>
              <span
                v-else-if="sens === 'timeToClose'"
                :key="sens"
                class="table-sens-cell table-sens-cell--holder"
              ><span class="table-sens-cell--item">  {{ sensitivityLabel(props.row.sensitivity[sens]) }} </span> <span class="table-sens-cell--item-sens">Speed</span></span>
            </template>
          </span>
          <span v-else-if="props.column.field === 'quotes'">
            {{ props.formattedRow.quotes.val }}
            <span
              v-if="props.formattedRow.quotes.new"
              class="quotes__btn"
            >NEW</span>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
        <!-- Collapsed body -->
        <template
          slot="table-row"
          slot-scope="props"
        >
          <template v-if="props.column.field === 'type'">
            <span class="cell-title">Interest rate</span>
          </template>
          <template v-else-if="props.column.field === 'broker'">
            <span class="cell-title">Rate term</span>
          </template>
          <template v-else-if="props.column.field === 'loan_amount'">
            <span class="cell-title">Orig. fee</span>
          </template>
          <template v-else-if="props.column.field === 'sensitivity'">
            <span class="cell-title">Exit fee</span>
          </template>
          <template v-else-if="props.column.field === 'quotes'">
            <span class="cell-title">Status</span>
          </template>
          <template v-else-if="props.column.field === 'deal_type'">
            <span class="cell-title">Deal Type</span>
          </template>
          {{ props.row[props.column.field] }}
        </template>
      </VueGoodTable>
    </div>
    <!-- Table without row collapse -->
    <div
      v-if="!tableCollapse"
      class="deals-table"
    >
      <VueGoodTable
        ref="my-table"
        :columns="table.columns"
        :rows="table.rows"
        :fixed-header="true"
        :select-options="{
          enabled: checkQuotes,
          disableSelectInfo: true
        }"
        :sort-options="{
          enabled: true,
        }"
        max-height="530px"
        style-class="custom-vgt-table vgt-table"
        @on-row-click="onRowClick"
        @on-selected-rows-change="selectionChanged"
        @on-sort-change="onColumnFilter"
      >
        <template
          v-if="!noData"
          slot="table-column"
          slot-scope="props"
        >
          <span
            v-if="props.column.field === 'location' && title === 'deals'"
            :class="checkClass('LOCATION')"
            @click="onColumnFilter(props.column.field)"
          >
            ADDRESS
          </span>
          <span
            v-if="props.column.field === 'finished_at' && title === 'deals'"
            :class="checkClass('DATE_POSTED')"
            @click="onColumnFilter(props.column.field)"
          >
            DATE PUBLISHED
          </span>
          <span
            v-if="props.column.field === 'type' && title === 'deals'"
            :class="checkClass('PROPERTY_TYPE')"
            @click="onColumnFilter(props.column.field)"
          >
            PROPERTY TYPE
          </span>
          <span v-if="props.column.field === 'sensitivity' && title === 'deals'">
            DEAL PRIORITIES
          </span>
          <span v-if="props.column.field === 'quotes' && title === 'deals'">
            QUOTES
          </span>


          <span v-if="props.column.field === 'finish' && title === 'drafts'">
            DEAL STATUS
          </span>
          <span v-if="props.column.field === 'location' && title === 'drafts'">
            ADDRESS
          </span>
          <span v-if="props.column.field === 'finished_at' && title === 'drafts'">
            DATE POSTED
          </span>
          <span v-if="props.column.field === 'property_type' && title === 'drafts'">
            PROPERTY TYPE
          </span>
          <span v-if="props.column.field === 'sensitivity' && title === 'drafts'">
            DEAL PRIORITIES
          </span>


          <span
            v-if="props.column.field === 'location' && title === 'quotes'"
            :class="checkClassQuote('LOCATION')"
            @click="onColumnFilter(props.column.field)"
          >
            ADDRESS
          </span>
          <span
            v-if="props.column.field === 'deal_type' && title === 'quotes'"
            :class="checkClassQuote('PROPERTY_TYPE')"
            @click="onColumnFilter(props.column.field)"
          >
            TYPE
          </span>
          <span
            v-if="props.column.field === 'dollarAmount' && title === 'quotes'"
            :class="checkClassQuote('DOLLAR_AMOUNT')"
            @click="onColumnFilter(props.column.field)"
          >
            DOLLAR AMOUNT
          </span>
          <span
            v-if="props.column.field === 'interestRate' && title === 'quotes'"
            :class="checkClassQuote('INTEREST_RATE')"
            @click="onColumnFilter(props.column.field)"
          >
            INTEREST RATE
          </span>
          <span
            v-if="props.column.field === 'origFee' && title === 'quotes'"
            :class="checkClassQuote('ORIGINATION_FEE')"
            @click="onColumnFilter(props.column.field)"
          >
            ORIGINATION FEE
          </span>
          <span
            v-if="props.column.field === 'rateTerm' && title === 'quotes'"
            :class="checkClassQuote('RATE_TERM')"
            @click="onColumnFilter(props.column.field)"
          >
            RATE TERM
          </span>


          <span
            v-if="props.column.field === 'location' && title === 'dealsLender'"
            :class="checkClass('LOCATION')"
            @click="onColumnFilter(props.column.field)"
          >
            ADDRESS
          </span>
          <span
            v-if="props.column.field === 'type' && title === 'dealsLender'"
            :class="checkClass('PROPERTY_TYPE')"
            @click="onColumnFilter(props.column.field)"
          >
            TYPE
          </span>
          <span
            v-if="props.column.field === 'loan_amount' && title === 'dealsLender'"
            :class="checkClass('LOAN_AMOUNT')"
            @click="onColumnFilter(props.column.field)"
          >
            LOAN AMOUNT
          </span>
          <span
            v-if="props.column.field === 'loan_type' && title === 'dealsLender'"
            :class="checkClass('LOAN_TYPE')"
            @click="onColumnFilter(props.column.field)"
          >
            LOAN TYPE
          </span>
          <span v-if="props.column.field === 'sensitivity' && title === 'dealsLender'">
            DEAL PRIORITIES
          </span>
          <span v-if="props.column.field === 'quoted' && title === 'dealsLender'">
            Quoted
          </span>
          <span v-if="props.column.field === 'quotes_status' && title === 'dealsLender'">
            Quote Status
          </span>

          <span v-if="props.column.field === 'location' && title === 'saved'">
            ADDRESS
          </span>
          <span v-if="props.column.field === 'type' && title === 'saved'">
            TYPE
          </span>
          <span v-if="props.column.field === 'loan_amount' && title === 'saved'">
            LOAN AMOUNT
          </span>
          <span v-if="props.column.field === 'loan_type' && title === 'saved'">
            LOAN TYPE
          </span>
          <span v-if="props.column.field === 'sensitivity' && title === 'saved'">
            DEAL PRIORITIES
          </span>

          <span v-if="props.column.field === 'location' && title === 'archived'">
            ADDRESS
          </span>
          <span v-if="props.column.field === 'type' && title === 'archived'">
            TYPE
          </span>
          <span v-if="props.column.field === 'loan_amount' && title === 'archived'">
            LOAN AMOUNT
          </span>
          <span v-if="props.column.field === 'loan_type' && title === 'archived'">
            LOAN TYPE
          </span>
          <span v-if="props.column.field === 'sensitivity' && title === 'archived'">
            DEAL PRIORITIES
          </span>

          <span v-if="props.column.field === 'deal_type'">
            DEAL TYPE
          </span>
        </template>

        <template
          slot="table-row"
          slot-scope="props"
        >
          <template v-if="props.column.field === 'location'">
            <span class="address-wrapper">{{ streatAddress(props.formattedRow.location, props.row.show_address) }} <span
              v-if="props.row.messages"
              class="message-indicator"
            >{{ props.row.messages }}</span></span>
          </template>
          <template v-else-if="props.column.field === 'deal_type'">
            <span>{{ props.row.deal_type }}</span>
          </template>
          <template v-else-if="props.column.field === 'loan_amount'">
            $ {{ formatDollars(props.row.loan_amount) }}
          </template>
          <template v-else-if="props.column.field === 'dollarAmount'">
            {{ props.row.dollarAmount }}
          </template>
          <template v-else-if="props.column.field === 'interestRate'">
            {{ props.row.interestRate }}
          </template>
          <template v-else-if="props.column.field === 'rateTerm'">
            {{ props.row.rateTerm }}
          </template>
          <template v-else-if="props.column.field === 'property_type'">
            <template v-if="props.row.property_type === 'OWNER_OCCUPIED'">
              Owner Occupied
            </template>
            <template v-else-if="props.row.property_type === 'MIXED_USE'">
              Mixed Use
            </template>
            <template v-else>
              {{ props.row.property_type !== 'UNDEFINED' ? props.row.property_type.charAt(0).toUpperCase() + props.row.property_type.slice(1).toLowerCase() : '/' }}
            </template>
          </template>
          <template v-else-if="props.column.field === 'type'">
            <template v-if="props.row.type === 'OWNER_OCCUPIED'">
              Owner Occupied
            </template>
            <template v-else-if="props.row.type === 'MIXED_USE'">
              Mixed Use
            </template>
            <template v-else>
              {{ props.row.type !== 'UNDEFINED' ? props.row.type.charAt(0).toUpperCase() + props.row.type.slice(1).toLowerCase() : '/' }}
            </template>
          </template>
          <template v-else-if="props.column.field === 'quoted'">
            <span v-if="props.row.quoted">
              <SvgIcon
                class="quote-check"
                icon-name="ico-check"
              />
            </span>
            <span v-else />
          </template>
          <template v-else-if="props.column.field === 'finished_at'">
            {{ props.row.finished_at }}
          </template>
          <span v-else-if="props.column.field === 'sensitivity'">
            <div v-if="sensitivity[props.row.id]">
              <template v-for="(sens) in sensitivity[props.row.id]">
                <span
                  v-if="sens === 'fees'"
                  :key="sens"
                  class="table-sens-cell table-sens-cell--holder"
                >
                  <span class="table-sens-cell--item-sens">Low fees</span>
                  <span
                    class="table-sens-cell--item"
                    :class="{'input-select__text-green': sensitivityLabel(props.row.sensitivity[sens]) == 'Flexible', 'input-select__text-red': sensitivityLabel(props.row.sensitivity[sens]) == 'Dealbreaker'}"
                  >
                    {{ sensitivityLabel(props.row.sensitivity[sens]) }}
                  </span>
                </span>
                <span
                  v-else-if="sens === 'interestRate'"
                  :key="sens"
                  class="table-sens-cell table-sens-cell--holder"
                >
                  <span class="table-sens-cell--item-sens">Low interest rate</span>
                  <span
                    class="table-sens-cell--item"
                    :class="{'input-select__text-green': sensitivityLabel(props.row.sensitivity[sens]) == 'Flexible', 'input-select__text-red': sensitivityLabel(props.row.sensitivity[sens]) == 'Dealbreaker'}"
                  >  {{ sensitivityLabel(props.row.sensitivity[sens]) }} </span>
                </span>
                <span
                  v-else-if="sens === 'leverage'"
                  :key="sens"
                  class="table-sens-cell table-sens-cell--holder"
                >
                  <span class="table-sens-cell--item-sens">High leverage</span>
                  <span
                    class="table-sens-cell--item"
                    :class="{'input-select__text-green': sensitivityLabel(props.row.sensitivity[sens]) == 'Flexible', 'input-select__text-red': sensitivityLabel(props.row.sensitivity[sens]) == 'Dealbreaker'}"
                  >
                    {{ sensitivityLabel(props.row.sensitivity[sens]) }}
                  </span>
                </span>
                <span
                  v-else-if="sens === 'recourse'"
                  :key="sens"
                  class="table-sens-cell table-sens-cell--holder"
                > <span class="table-sens-cell--item-sens">No recourse</span><span
                  class="table-sens-cell--item"
                  :class="{'input-select__text-green': sensitivityLabel(props.row.sensitivity[sens]) == 'Flexible', 'input-select__text-red': sensitivityLabel(props.row.sensitivity[sens]) == 'Dealbreaker'}"
                >  {{ sensitivityLabel(props.row.sensitivity[sens]) }} </span></span>
                <span
                  v-else-if="sens === 'timeToClose'"
                  :key="sens"
                  class="table-sens-cell table-sens-cell--holder"
                > <span class="table-sens-cell--item-sens">Speed</span><span
                  class="table-sens-cell--item"
                  :class="{'input-select__text-green': sensitivityLabel(props.row.sensitivity[sens]) == 'Flexible', 'input-select__text-red': sensitivityLabel(props.row.sensitivity[sens]) == 'Dealbreaker'}"
                >  {{ sensitivityLabel(props.row.sensitivity[sens]) }} </span></span>
                <span
                  v-else-if="sens === 'no'"
                  :key="sens"
                  class="table-sens-cell table-sens-cell--holder"
                >/</span>
              </template>
            </div>
          </span>
          <span v-else-if="props.column.field === 'quotes'">
            {{ props.row.total_quotes ? props.row.total_quotes : 0 }}
            <span
              v-if="props.row.has_new_quotes && props.row.total_quotes > 0"
              class="quotes__btn"
            >NEW</span>
          </span>
          <span
            v-else-if="props.column.field === 'quotes_status'"
            style="text-transform: capitalize;"
          >
            {{ getQuoteStatus(props.row) }}
          </span>
          <span
            v-else-if="props.column.field === 'finish' && activeIndex === 1"
            style="text-align: right; padding-right: 15px; width: 100px;"
          >
            <a
              class="finish__link"
              href="javascript:;"
            >Finish Deal</a>
          </span>
        </template>
      </VueGoodTable>
    </div>
    <!-- <a href="javascript:;" class="btn btn--small deals-table-wrap__btn" v-if="noData" >Test</a> -->
    <span
      v-if="noData && from === 'broker'"
      class="deals-table-wrap__btn"
    >Pssst - <a :href="postDeal">post a deal</a> to get started.</span>
    <span
      v-if="noData && from === 'lender'"
      class="deals-table-wrap__btn"
    >Still searching...we’ll email you soon!</span>
    <div
      v-if="loader"
      class="table-loader "
    >
      <span class="loader" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
import { mapState } from 'vuex'
import { changeDate, formatNumber } from '@/config/util'

interface Data {
    loader: boolean
    sensitivity
    rowSelection
    checkQuotes: boolean
    tableLoading: boolean
    loadMoreWork: boolean
    mem
    postDeal: string
}

export default Vue.extend({

    components: {
        VueGoodTable,
        SvgIcon,
    },

    props: ['table', 'activeIndex', 'tableCollapse', 'tooltip', 'title', 'from', 'noData'],

    data(): Data {
        return {
            loader: false,
            sensitivity: {},
            rowSelection: [],
            checkQuotes: true,
            tableLoading: false,
            loadMoreWork: false,
            mem: [],
            postDeal: '/create-deal',
        }
    },

    computed: {
        ...mapState({
            dealsPagination: state => state['FilterDeal'].dealsBrokerPagination,
            draftPagination: state => state['FilterDeal'].dealsDraftBrokerPagination,
            dealsLenderPagination: state => state['FilterDeal'].dealsLenderPagination,
            savedDealsPagination: state => state['FilterDeal'].savedDealsPagination,
            archivedDealsPagination: state => state['FilterDeal'].archivedDealsPagination,

            propertyType: state => state['FilterDeal'].propertyType,
            loanSize: state => state['FilterDeal'].loanSize,
            filterName: state => state['FilterDeal'].filterName,
            search: state => state['FilterDeal'].search,
            sort: state => state['FilterDeal'].sort,
            by: state => state['FilterDeal'].by,
            context: state => state['FilterDeal'].context,

            quotesBrokerPagination: state => state['FilterQuotes'].quotesBrokerPagination,
            searchQuote: state => state['FilterQuotes'].search,
            sortQuote: state => state['FilterQuotes'].sort,
            byQuote: state => state['FilterQuotes'].by,
            checkedSponsorNames: state => state['FilterQuotes'].checkedSponsorNames,

            user: state => state['User'].user,
        }),

      localTable: {
          get() {
              return this.table
          },
          set(newValue) {
              this.$emit('update:table', newValue)
          },
      },
    },

    mounted() {
        this.setScroll()
        if(this.title === 'quotes' && this.from === 'broker') {
            this.checkQuotes = false
        }
    },

    methods: {
        sensitivityLabel(key) {
            switch (key) {
                case '':
                    return 'Flexible'
                case 0:
                    return 'Flexible'
                case 4:
                    return 'Dealbreaker'
                case 3:
                    return 'Very important'
                case 2:
                    return 'Important'
                case 1:
                    return 'Somewhat Flexible'
                default:
                    return ''
            }
        },
        checkClass(row) {
            let classes = 'table-column__sorting '
            if(row === this.sort) {
                if(this.by === 'ASC') {
                    classes += 'asc'
                } else {
                    classes += 'desc'
                }
            }
            return classes
        },
        checkClassQuote(row) {
            let classes = 'table-column__sorting '
            if(row === this.sortQuote) {
                if(this.byQuote === 'ASC') {
                    classes += 'asc'
                } else {
                    classes += 'desc'
                }
            }
            return classes
        },
        changeLoader(flag) {
            this.loader = flag
            if(flag === false) {
                setTimeout(() => {
                    this.setScroll()
                }, 100)
            }
        },
        setScroll() {
            let listElm
            switch (this.title) {
                case 'drafts':
                    listElm = document.querySelectorAll('.broker-deals__table-holder--drafts .vgt-responsive')[0]
                    break
                case 'saved':
                    listElm = document.querySelectorAll('.lender-deals__table-holder--saved .vgt-responsive')[0]
                    break
                case 'archived':
                    listElm = document.querySelectorAll('.lender-deals__table-holder--archived .vgt-responsive')[0]
                    break
                case 'deals':
                    listElm = document.querySelector('.broker-deals__table-holder--deals .vgt-responsive')
                    break
                case 'dealsLender':
                    listElm = document.querySelector('.broker-deals__table-holder--deals .vgt-responsive')
                    break
                case 'quotes':
                    listElm = document.querySelector('.broker-quotes__table-holder .vgt-responsive')
                    break
                default:
                    break
            }

            if(listElm) {
                listElm.addEventListener('scroll', () => {
                    this.infiScroll(listElm)
                })
            }
        },
        async onColumnFilter(params) {
            this.loader = true
            let sort =  ''
            let by =  ''

            if(params === 'location') {
                sort = 'LOCATION'
            } else if(params === 'finished_at') {
                sort = 'DATE_POSTED'
            } else if(params === 'type') {
                sort = 'PROPERTY_TYPE'
            } else if(params === 'loan_amount') {
                sort = 'LOAN_AMOUNT'
            } else if(params === 'loan_type') {
                sort = 'LOAN_TYPE'
            } else if(params === 'interestRate') {
                sort = 'INTEREST_RATE'
            } else if(params === 'rateTerm') {
                sort = 'RATE_TERM'
            } else if(params === 'dollarAmount') {
                sort = 'DOLLAR_AMOUNT'
            } else if(params === 'deal_type') {
                sort = 'PROPERTY_TYPE'
            } else if(params === 'origFee') {
                sort = 'ORIGINATION_FEE'
            }

            if(this.from === 'broker' && this.title === 'quotes') {
                by = this.checkSortByQuote(sort)
                this.$store.commit('SET_QUOTE_SORT', sort)
                this.$store.commit('SET_QUOTE_BY', by)

                const newobj = {
                    searchLocation: this.searchQuote,
                    sort: sort,
                    by: by,
                    sponsorNames: this.checkedSponsorNames,
                    sponsorName: '',
                }
                await this.$store.dispatch('getQuotesBrokerFilter', { pagination: { page: 1 }, obj: newobj })
            } else {
                by = this.checkSortBy(sort)
                this.$store.commit('SET_DEAL_SORT', sort)
                this.$store.commit('SET_DEAL_BY', by)

                const newobj = {
                    context: this.context,
                    filterName: this.filterName,
                    searchTerms: this.search,
                    loanSize: {
                        min: this.loanSize[0],
                        max: this.loanSize[1],
                    },
                    assetTypes: this.propertyType,
                    sort: sort,
                    by: by,
                }

                if(this.from === 'broker') {
                    await this.$store.dispatch('getDealsBrokerFilter', { pagination: { page: 1 }, obj: newobj })
                } else {
                    await this.$store.dispatch('getDealsLenderFilter', { pagination: { page: 1 }, obj: newobj })
                }
            }
            this.$emit('clearMap')
            this.loader = false
            setTimeout(() => {
                this.setScroll()
            }, 100)
        },

        checkSortBy(label) {
            if(this.sort === label) {
                if(this.by === 'ASC') {
                    return 'DESC'
                } else {
                    return 'ASC'
                }
            } else {
                return 'DESC'
            }
        },

        checkSortByQuote(label) {
            if(this.sortQuote === label) {
                if(this.byQuote === 'ASC') {
                    return 'DESC'
                } else {
                    return 'ASC'
                }
            } else {
                return 'DESC'
            }
        },

        changeDateFormat(date) {
            return changeDate(date)
        },

        infiScroll(listElm) {
            if (listElm.scrollTop + listElm.clientHeight + 1 >= listElm.scrollHeight) {
                if(!this.loadMoreWork) {
                    this.loadMore()
                }
            }
        },

        async loadMore() {
            this.loadMoreWork = true
            this.loader = true
            const obj = {
                context: '',
                filterName: this.filterName,
                searchTerms: this.search,
                loanSize: {
                    min: this.loanSize[0],
                    max: this.loanSize[1],
                },
                assetTypes: this.propertyType,
                sort: this.sort,
                by: this.by,
            }
            switch (this.title) {
                case 'drafts':
                    if(this.draftPagination.hasMorePages) {
                        const newObj = {
                            context: 'DRAFT',
                            filterName: 'GENERAL',
                            searchTerms: '',
                            loanSize: {min:0, max:200000000},
                            assetTypes: ['GENERAL'],
                            sort: 'GENERAL',
                            by: 'DESC',
                        }
                        this.mem = this.rowSelection
                        await this.$store.dispatch('getDealsBroker', { pagination: { page: this.draftPagination.currentPage+1 }, obj: newObj })

                        if(this.mem.length !== 0) {
                            this.setSelectedRowsAfterLoadMore()
                        }
                    } else {
                        this.loader = false
                        this.loadMoreWork = false
                        return
                    }
                    break
                case 'saved':
                    if(this.savedDealsPagination.hasMorePages) {
                        const newObj = {
                            context: 'SAVED',
                            filterName: 'PERFECT_FIT',
                            searchTerms: '',
                            loanSize: {min:0, max:200000000},
                            assetTypes: ['GENERAL'],
                            sort: 'GENERAL',
                            by: 'DESC',
                        }
                        this.mem = this.rowSelection
                        await this.$store.dispatch('getDealsLender', { pagination: { page: this.savedDealsPagination.currentPage+1 }, obj: newObj })
                        this.removeActive()
                        if(this.mem.length !== 0) {
                            this.setSelectedRowsAfterLoadMore()
                        }
                    } else {
                        this.loader = false
                        this.loadMoreWork = false
                        return
                    }
                    break
                case 'archived':
                    if(this.archivedDealsPagination.hasMorePages) {
                        const newObj = {
                            context: 'ARCHIVED',
                            filterName: 'PERFECT_FIT',
                            searchTerms: '',
                            loanSize: {min:0, max:200000000},
                            assetTypes: ['GENERAL'],
                            sort: 'GENERAL',
                            by: 'DESC',
                        }
                        this.mem = this.rowSelection
                        await this.$store.dispatch('getDealsLender', { pagination: { page: this.archivedDealsPagination.currentPage+1 }, obj: newObj })
                        this.removeActive()
                        if(this.mem.length !== 0) {
                            this.setSelectedRowsAfterLoadMore()
                        }
                    } else {
                        this.loader = false
                        this.loadMoreWork = false
                        return
                    }
                    break
                case 'deals':
                    if(this.dealsPagination.hasMorePages) {
                        obj.context = 'GENERAL'
                        this.mem = this.rowSelection
                        await this.$store.dispatch('getDealsBroker', { pagination: { page: this.dealsPagination.currentPage+1 }, obj: obj })
                        if(this.mem.length !== 0) {
                            this.setSelectedRowsAfterLoadMore()
                        }
                    } else {
                        this.loader = false
                        this.loadMoreWork = false
                        return
                    }
                    break
                case 'dealsLender':
                    if(this.dealsLenderPagination.hasMorePages) {
                        obj.context = 'GENERAL'
                        obj.filterName = 'PERFECT_FIT'
                        this.mem = this.rowSelection
                        await this.$store.dispatch('getDealsLender', { pagination: { page: this.dealsLenderPagination.currentPage+1 }, obj: obj })
                        if(this.mem.length !== 0) {
                            this.setSelectedRowsAfterLoadMore()
                        }
                    }else {
                        this.loader = false
                        this.loadMoreWork = false
                        return
                    }
                    break
                case 'quotes':
                    if(this.quotesBrokerPagination.hasMorePages) {
                        await this.$store.dispatch('getQuotesBroker', { pagination: {page: this.quotesBrokerPagination.currentPage+1}, obj: {sponsorNames: this.checkedSponsorNames, sponsorName: "", searchLocation: this.searchQuote, sort: this.sortQuote, by: this.byQuote}})
                    } else {
                        this.loader = false
                        this.loadMoreWork = false
                        return
                    }
                    break
                default:
                    break
            }
            this.loader = false
            this.loadMoreWork = false
            setTimeout(() => {
                this.setScroll()
            }, 100)
        },

        setSelectedRowsAfterLoadMore() {
            let table = JSON.parse(JSON.stringify(this.table.rows))
            this.mem.forEach(async obj => {
                const index = table.findIndex(element => element.id === obj.id)
                await this.$set(table[index], 'vgtSelected', true)
            })
            this.localTable.rows = table
            this.mem = []
        },

        onRowClick(params) {
            const _self = params.event.target
            if (_self.classList.contains('vgt-checkbox-col')) {
                return false
            } else if(_self.classList.contains('finish__link')) {
                this.$router.push('/create-deal/'+params.row.step+'/'+params.row.id)
            } else {
                if(this.title === 'quotes') {
                    this.$router.push('/individual-quote-broker/'+params.row.id+'/'+params.row.lender_id)
                } else {
                    (this.from && this.from === 'broker')
                        ? this.$router.push('/individual-deal-broker/'+params.row.id)
                        : this.$router.push('/individual-deal/'+params.row.id)
                }
            }
        },

        fillSensitivity() {
            this.table.rows.forEach(element => {
                //let flag = false;
                const list = element.sensitivity
                if(list) {
                    // for(let key in list) {
                    //     if(list[key] !== 0) {
                    //         flag = true;
                    //     }
                    // }
                    // if(flag) {
                        const keysSorted = Object.keys(list).sort(function(a,b){return list[a]-list[b]})
                        this.sensitivity[element.id] = keysSorted.splice(2, 5).reverse()
                    // } else {
                    //     this.sensitivity[element.id] = ['no'];
                    // }
                }
            })
        },

        removeActive() {
            this.$refs['my-table'].unselectAllInternal()
            this.rowSelection = []
            this.$emit('getSelectedRows', [])
        },

        selectionChanged(params) {
            this.rowSelection = params.selectedRows
            this.$emit('getSelectedRows', this.rowSelection)
        },

        streatAddress(data, showAddress) {
            if (this.from === 'lender'){
                if(showAddress) {
                    return data.street_address+', '+data.city+', '+data.state+', '+data.zip_code
                } else {
                    return data.city+', '+data.state+', '+data.zip_code
                }
            } else {
                return data.street_address+', '+data.city+', '+data.state+', '+data.zip_code
            }
        },

        formatDollars(field) {
            return formatNumber(field)
      },

      getQuoteStatus(row) {
        if (!row.quotes.length) {
          return ''
        }

        let lenderQuote = row.quotes.find(c => c.lenderID == this.user.id && c.status === 'ACCEPTED')
        if (lenderQuote) {
          return 'Accepted'
        }
        lenderQuote = row.quotes.find(c => c.lenderID != this.user.id && c.status === 'ACCEPTED')
        return lenderQuote ? 'Not Accepted' : 'Open'
      },
    },
})
</script>

<style lang="scss" scoped>


.quotes__btn {
    font-size: 10px;
    font-family: $font-main;
    color: $blue-chill;
    text-transform: uppercase;
    background-color: #daeeee;
    border-radius: 57px;
    padding: 3px 11px;
    max-width: 48px;
    text-align: center;
    margin-left: 11px;
    display: inline-block;
}

.finish__link {
    font-family: $font-main;
    font-size: 14px;
    color: $mosque;
    text-decoration: underline;
    font-weight: 700;
    opacity: 0;
    transition: $dur $ease;

    @include mq(1024px) {
        opacity: 1;
    }
}

.table-tooltip {
    position: absolute;
    left: -40px;
    top: 50%;
    transform: translateY(-50%);

    @include mq($lap-small) {
        left: -47px;
    }

    &::before {
        left: -7px;

        @include mq($lap-small) {
            left: -18px;
        }

        @include mq($sm) {
            min-width: 200px;
        }
    }

    &::after {
        left: -3px;
    }
}

.table-loader {
    height: 100%;

    .loader {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.deals-table-wrap__btn {
    position: absolute;
    bottom: 78px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    font-weight: 600;

    a {
        text-decoration: underline;
        color: $mosque;
        cursor: pointer;

        &:hover {
            color: $yellow-orange;
        }
    }

    @include mq(1024px) {
        width: 100%;
        text-align: center;
        bottom: 35px;
        font-size: 22px;
    }

    @include mq(500px) {
        font-size: 14px;
    }
}


.table-sens-cell--holder {
    padding-right: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-self: flex-start;
    max-width: 100%;
    // min-width: 230px;
    margin-bottom: 4px;
}

.table-sens-cell--item {
    font-size: 12px;
    border: 1px solid $santas-gray;
    border-radius: 3px;
    background-color: rgba($santas-gray, 0.1);
    color: $santas-gray;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1px 4px 2px;
    white-space: nowrap;

    @include mq(1400px) {
        font-size: 12px;
    }
}

.input-select__text-red {
    color: $red;
    border: 1px solid $red;
    background-color: rgba($red, 0.1);
}

.input-select__text-green {
    color: $blue-chill;
    border: 1px solid $blue-chill;
    background-color: rgba($blue-chill, 0.1);
}

.table-sens-cell--item-sens {
    // width: 50%;
    // min-width: 50%;
    font-weight: 400;
    margin-bottom: 2px;
    font-size: 13px;
    margin-right: 5px;
    white-space: nowrap;

    @include mq(1400px) {
        font-size: 12px;
    }
}

.quote-check {
    width: 100%;
    height: 16px;
    display: flex;
    justify-content: center;
    color: $mosque;
}

.message-indicator {
    width: 20px;
    height: 15px;
    border-radius: 2px;
    background-color: $blue-chill;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: $white;
    font-size: 10px;
    position: absolute;
    top: 2px;
    right: -27px;
}

.address-wrapper {
    width: auto;
    display: inline;
    position: relative;
}
</style>