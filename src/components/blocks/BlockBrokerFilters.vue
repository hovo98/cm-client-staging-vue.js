<template>
  <div>
    <div class="broker-filters">
      <div class="broker-filters__left">
        <div class="broker-filters__search-input-holder input-with-icon-holder">
          <input
            v-model="searchAddress"
            class="broker-filters__search-input input-with-icon"
            type="text"
            :placeholder="pro === 'quote' ? 'Search by address' : 'Search by address or sponsor\'s name'"
            @keyup.enter="onEnter()"
            @change="setSearch()"
          >
          <SvgIcon
            class="broker-filters__search-input-icon input-with-icon__icon"
            icon-name="ico-search"
          />
        </div>
        <div class="broker-filters__category">
          <PartCategory
            :pro="pro"
            :tab="'broker'"
            @setTableLoader="setTableLoader"
            @clearMap="clearMap"
          />
        </div>
      </div>
      <div class="broker-filters__btn-wrap">
        <!-- TODO: Commented for MVP, this go on Post-MVP -->
        <!-- <a class="btn-inline btn__icon broker-filters__btn" href="javascript:;">
                    <SvgIcon class="broker-filters__btn-icon" iconName="ico-save-regular"/>
                    Saved Searches
                </a> -->
        <a
          class="btn btn__icon broker-filters__btn"
          :class="{'active' : showFilters}"
          href="javascript:;"
          @click="toggleFilters()"
        >
          <SvgIcon
            class="broker-filters__btn-icon"
            icon-name="ico-sliders-h"
          />
          Filters
        </a>
      </div>
    </div>
    <transition name="fade-in">
      <div
        v-show="showFilters"
        class="broker-filters__filter-wrap"
      >
        <BlockAllFilters
          :tab="'broker'"
          :pro="pro"
          @toggleFilters="toggleFilters"
          @clearMap="clearMap"
          @setTableLoader="setTableLoader"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import PartCategory from '@/components/parts/PartCategory.vue'
    import BlockAllFilters from '@/components/blocks/BlockAllFilters.vue'
    import { mapState } from 'vuex'

    interface Data {
        showFilters: boolean
        searchAddress: string
    }

    export default Vue.extend({
        props: ['pro'],

        data(): Data {
            return {
                showFilters: false,
                searchAddress: '',
            }
        },

        watch: {
            search() {
                this.searchAddress = this.search
            },
            searchQuote() {
                this.searchAddress = this.searchQuote
            },
        },

        computed: {
            ...mapState({
                propertyType: state => state['FilterDeal'].propertyType,
                loanSize: state => state['FilterDeal'].loanSize,
                context: state => state['FilterDeal'].context,
                filterName: state => state['FilterDeal'].filterName,
                sort: state => state['FilterDeal'].sort,
                by: state => state['FilterDeal'].by,
                search: state => state['FilterDeal'].search,

                searchQuote: state => state['FilterQuotes'].search,
                sortQuote: state => state['FilterQuotes'].sort,
                byQuote: state => state['FilterQuotes'].by,
                checkedSponsorNames: state => state['FilterQuotes'].checkedSponsorNames,
			}),
        },

        methods: {
            async onEnter() {
                this.$emit('setTableLoader', true)
                if(this.pro === 'deal') {
                    const obj = {
                        context: this.context,
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
                    this.toggleFilters1()
                    await this.$store.dispatch('getDealsBrokerFilter', { pagination: { page: 1 }, obj: obj })
                    this.searchAddress = ''
                } else {
                    const obj = {
                        searchLocation: this.searchQuote,
                        sort: this.sortQuote,
                        by: this.byQuote,
                        sponsorNames: this.checkedSponsorNames,
                        sponsorName: '',
                    }
                    this.toggleFilters1()
                    await this.$store.dispatch('getQuotesBrokerFilter', { pagination: { page: 1 }, obj: obj })
                    this.searchAddress = ''
                }
                this.$emit('clearMap')
                this.$emit('setTableLoader', false)
            },
            setTableLoader(flag) {
                this.$emit('setTableLoader', flag)
            },
            clearMap() {
                this.$emit('clearMap')
            },
            toggleFilters() {
                this.showFilters = !this.showFilters
            },
            toggleFilters1() {
                if (this.showFilters) {
                    this.showFilters = false
                    this.scrollToFilters()
                }
            },
            scrollToFilters() {
                setTimeout(() => {
                    const filters = document.getElementById('all-filters')
                    filters.scrollIntoView({
                        behavior : 'smooth',
                    })
                }, 500)
            },
            setSearch() {
                if(this.pro === 'deal') {
                    this.$store.commit('SET_DEALS_BROKER_SEARCH', this.searchAddress)
                } else {
                    this.$store.commit('SET_QUOTE_SEARCH', this.searchAddress)
                }
            },
        },

        components: {
            SvgIcon,
            PartCategory,
            BlockAllFilters,
        },
    })
</script>

<style lang="scss" scoped>
    .broker-filters {
        padding: 17px 24px 14px 78px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .page-no-data & {
            pointer-events: none;
            opacity: 0.6;
        }

        @include mq($lg) {
            flex-direction: column;
        }

        @include mq($md) {
            padding: 14px 50px;
        }

        @include mq($sm) {
            padding: 20px 25px;
        }
    }

    .broker-filters__left {
        display: flex;
        width: 100%;
        padding-top: 5px;
        flex-wrap: wrap;
    }

    .broker-filters__search-input-holder {
        padding-top: 6px;
        margin-right: 13px;

        @include mq($lg) {
            max-width: 100%;
            width: 100%;
            margin-right: 0;
        }

        @include mq($sm) {
            padding-left: 35px;
        }
    }

    .broker-filters__search-input {
        min-width: 305px;
        border: none;
        border-bottom: 2px solid $santas-gray;
        border-radius: 0;
        padding: 0;
        font-size: 14px;
        color: $shark;
        margin-bottom: 15px;

        @include mq($sm) {
            min-width: 200px;
            max-width: 100%;
            width: 100%;
        }

        &::placeholder {
            font-size: 14px;
            color: $santas-gray;
        }
    }

    .broker-filters__search-input-icon {
        left: -49px;
        top: 7px;
        transform: translateY(0);

        @include mq($md) {
            font-size: 20px;
            height: 20px;
            left: -34px;
            top: 12px;
        }

        @include mq($sm) {
            left: 2px;
        }
    }

    .broker-filters__btn-wrap {
        display: flex;
        align-items: center;

        @include mq($md) {
            width: 100%;
            justify-content: space-between;
        }

        @include mq($sm) {
            flex-wrap: wrap;
        }
    }

    .broker-filters__btn {
        font-size: 12px;
        min-width: 150px;
        padding: 10px 15px;
        margin-right: 13px;
        transition: $dur $ease;

        @include mq($lap-l) {
            margin-right: 15px;
        }

        @include mq($sm) {
            margin-right: 0;
            margin-bottom: 5px;
        }

        &:last-of-type {
            margin-right: 0;
        }

        &.btn-inline {
            font-size: 14px;
            padding: 10px 5px;
            display: flex;
            align-items: flex-end;


            .broker-filters__btn-icon {
                font-size: 14px;
                height: 14px;
                margin-top: 3px;
            }
        }

        &.active {
            background-color: $yellow-orange;
            border: 2px solid $yellow-orange;
            transition: $dur $ease;

            &:not(.disabled) {
                @include hover {
                    color: $white;
                    background-color: $mosque;
                    border: 2px solid $mosque;
                }
            }
        }
    }

    .broker-filters__btn-icon {
        margin-right: 6px;
    }
</style>
