<template>
  <div class="category__wrap">
    <ul
      v-if="propertyType.length > 0 && pro === 'deal'"
      class="category__list"
    >
      <li class="category__list-item category__list-item-with-icon">
        Property Type :
        {{ arrToString(propertyType) }}
        <span
          class="category__list-item-close"
          @click="removeFilter('Property Type')"
        />
      </li>
    </ul>
        
    <ul
      v-if="pro === 'deal' && checkLoanSize()"
      class="category__list"
    >
      <li class="category__list-item category__list-item-with-icon">
        Loan Size :
        ${{ format(loanSize[0]) }} - 
        ${{ format(loanSize[1]) }}
        <span
          class="category__list-item-close"
          @click="removeFilter('Loan size')"
        />
      </li>
    </ul>

    <ul
      v-if="search !== '' && pro === 'deal'"
      class="category__list"
    >
      <li class="category__list-item category__list-item-with-icon">
        Search :
        {{ search }}
        <span
          class="category__list-item-close"
          @click="removeFilter('Search1')"
        />
      </li>
    </ul>
        
    <ul
      v-if="searchQuote !== '' && pro === 'quote'"
      class="category__list"
    >
      <li class="category__list-item category__list-item-with-icon">
        Search :
        {{ searchQuote }}
        <span
          class="category__list-item-close"
          @click="removeFilter('Search2')"
        />
      </li>
    </ul>

    <ul class="category__list">
      <li
        v-if="checkedSponsorNames.length > 0 && pro === 'quote'"
        class="category__list-item category__list-item-with-icon"
      >
        Sponsor names : 
        {{ checkedSponsorNames.toString() }}
        <span
          class="category__list-item-close"
          @click="removeFilter('sponsorNames')"
        />
      </li>
    </ul>
    <!-- TODO @nikolapopov save search for post-mvp -->
    <!-- <a class="category__btn" href="javascript:;" v-if="categorys.btn">Save Search</a> -->
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import { formatNumber } from '@/config/util'

    export default Vue.extend({
        props: ['pro', 'tab'],

        methods: {
            checkLoanSize() {
                if(this.loanSizeApply) {
                    return true
                } else {
                    return false
                }
            },
            replaceStr(str) {
                return str.replace(/_/g, ' ')
            },
            format(label) {
                if(label === '0' || label === 0) {
                    return '0'
                } else {
                    return formatNumber(label)
                }
            },
            async removeFilter(title) {
                if(title === 'Property Type') {
                    await this.$store.commit('SET_FILTER_PROPERTY_TYPE', [])
                    await this.callDeal()
                } else if(title === 'Search1') {
                    this.$store.commit('SET_DEALS_BROKER_SEARCH', '')
                    await this.callDeal()
                } else if(title === 'Search2') {
                    this.$store.commit('SET_QUOTE_SEARCH', '')
                    await this.callQuote()
                } else if(title === 'sortBy1') {
                    this.$store.commit('SET_DEAL_SORT', 'GENERAL')
                    this.$store.commit('SET_DEAL_BY', 'DESC')
                    await this.callDeal()
                } else if(title === 'sortBy2') {
                    this.$store.commit('SET_QUOTE_SORT', 'GENERAL')
                    this.$store.commit('SET_QUOTE_BY', 'DESC')
                    await this.callQuote()
                } else if(title === 'sponsorNames') {
                    this.$store.commit('SET_CHECKED_SPONSOR_NAME', [])
                    await this.callQuote()
                } else if(title === 'Loan size') {
                    this.$store.commit('SET_LOAN_SIZE_APPLY', false)
                    this.$store.commit('SET_FILTER_LOAN_SIZE', [0, 200000000])
                    await this.callDeal()
                }
            },
            async callQuote() {
                this.$emit('setTableLoader', true)
                const newobj = {
                    searchLocation: this.searchQuote,
                    sort: this.sortQuote,
                    by: this.byQuote,
                    sponsorNames: this.checkedSponsorNames,
                    sponsorName: '',
                }
                await this.$store.dispatch('getQuotesBrokerFilter', { pagination: { page: 1 }, obj: newobj })
                this.$emit('clearMap')
                this.$emit('setTableLoader', false)
            },
            async callDeal() {
                this.$emit('setTableLoader', true)
                const newobj = {
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
                if(this.tab === 'lender') {
                    await this.$store.dispatch('getDealsLenderFilter', { pagination: { page: 1 }, obj: newobj })
                } else {
                    await this.$store.dispatch('getDealsBrokerFilter', { pagination: { page: 1 }, obj: newobj })
                }
                
                this.$emit('clearMap')
                this.$emit('setTableLoader', false)
            },

            arrToString(arr) {
                let str = ''
                arr.forEach((element, i) => {
                    const replace = element.replace(/_/g, ' ')
                    if(i === arr.length - 1) {
                        str += replace
                    } else {
                        str += replace+', '
                    }
                })
                return str
            },
        },

        computed: {
            ...mapState({
                filterName: state => state['FilterDeal'].filterName,
                context: state => state['FilterDeal'].context,
                propertyType: state => state['FilterDeal'].propertyType,
                loanSize: state => state['FilterDeal'].loanSize,
                search: state => state['FilterDeal'].search,
                sort: state => state['FilterDeal'].sort,
                by: state => state['FilterDeal'].by,
                loanSizeApply: state => state['FilterDeal'].loanSizeApply,

                searchQuote: state => state['FilterQuotes'].search,
                sortQuote: state => state['FilterQuotes'].sort,
                byQuote: state => state['FilterQuotes'].by,
                checkedSponsorNames: state => state['FilterQuotes'].checkedSponsorNames,
			}),
        },
    })
    
</script>

<style lang="scss" scoped>
    .category__wrap {
        display: flex;
        align-items: center;

        @include mq($lg) {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    .category__list {
        display: flex;
        flex-wrap: wrap;
        margin-right: 29px;

        @include mq($lg) {
            margin-right: 0;
            margin-bottom: 10px;
        }

        @include mq($sm) {
            justify-content: flex-start;
            flex-wrap: wrap;
        }
    }

    .category__list-item {
        font-size: 13px;
        font-family: $font-main;
        color: $shark;
        font-weight: 600;
        min-width: 140px;
        padding: 6px 34px 6px 15px;
        position: relative;
        background-color: $pani;
        letter-spacing: -.6px;
        margin-right: 20px;
        margin-bottom: 10px;

        @include mq($lg) {
            padding: 6px 25px 6px 10px;
            margin-right: 10px;
        }

        @include mq($sm) {
            margin-right: 5px;
            padding: 6px 20px 6px 10px;
        }

        &:last-of-type {
            margin-right: 0;
        }
    }

    .category__list-item-with-icon {
        padding: 6px 30px 6px 11px;

        .category__list-item-close {
            right: 9px;
        }
    }

    .category__list-item-icon {
        font-size: 12px;
        height: 12px;
        color: $yellow-orange;
        margin-right: 5px;
    }

    .category__list-item-close {
        position: absolute;
        right: 13px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        width: 11px;
        height: 11px;

        @include mq($lg) {
            right: 7px;
        }

        @include mq($sm) {
            right: 5px;
        }

        &:hover {
            &::before,
            &::after {
                transform: rotate(0) translate(-50%, -50%);
            }
        }

        &::before,
        &::after {
            content: '';
            width: 11px;
            height: 1px;
            font-size: 11px;
            background-color: $shark;
            @include center;
            transition: $dur $ease;

            &:hover {
                transition: $dur $ease;
                background-color: $mosque;
            }
        }

        &::before {
            transform: translate(-50%, -50%) rotate(45deg);
        }

        &::after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
    }

    .category__btn {
        font-family: $font-main;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: .07px;
        color: $mosque;
        position: relative;
        transition: $dur $ease;
        cursor: pointer;
        min-width: 84px;
        margin-bottom: 7px;

        @include mq($lg) {
            text-align: center;
        }

        &:hover {
            color: $yellow-orange;
            transition: $dur $ease;

            &::after {
                background-color: $yellow-orange;
                transition: $dur $ease;
            }
        }

        &::after {
            content: '';
            position: absolute;
            bottom: 3px;
            left: 0;
            display: inline-block;
            background-color: $mosque;
            height: 1px;
            width: 100%;
            transition: $dur $ease;
        }
    }
</style>
