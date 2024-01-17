<template>
  <div>
    <div class="lender-filters">
      <div class="lender-filters__top">
        <div class="lender-filters__top-option">
          <span
            v-if="dealsLenderPagination"
            class="lender-filters__top-option-text"
          ><SvgIcon
            class="tooltip-msg__icon tooltip-msg__icon--absolute"
            icon-name="ico-info"
          />We found {{ dealsLenderPagination.total }} new deals<br> that fit your preferences.</span>
          <!-- <PartPills/> -->
          <span class="lender-filters__top-option-title txt-with-link">Add deals that sound promising to <span>Favorites</span>.<br>  <span>Archive</span> the ones that don’t. <br> <a
            href="javascript:;"
            @click="goTo()"
          >Adjust your deal preferences </a></span>
        </div>
        <div class="lender-filters__top-search">
          <div class="lender-filters__top-search-input-holder input-with-icon-holder">
            <input
              v-model="searchAddress"
              class="lender-filters__top-search-input input-with-icon"
              type="text"
              placeholder="Search by address"
              @keyup.enter="onEnter()"
              @change="setSearch()"
            >
            <SvgIcon
              class="lender-filters__top-search-input-icon input-with-icon__icon"
              icon-name="ico-search"
            />
          </div>
          <div class="lender-filters__top-search-btn-wrap">
            <a
              class="btn btn__icon lender-filters__top-search-btn"
              :class="{'active' : showFilters}"
              href="javascript:;"
              @click="toggleFilters()"
            >
              <SvgIcon
                class="lender-filters__top-search-btn-icon"
                icon-name="ico-sliders-h"
              />
              All Filters</a>
            <!-- TODO: Commented for MVP, this go on Post-MVP -->
            <!-- <a class="btn btn__icon lender-filters__top-search-btn" href="javascript:;">
                            <SvgIcon class="lender-filters__top-search-btn-icon" iconName="ico-save-regular"/>
                            Saved Searches</a> -->
          </div>
        </div>
      </div>
      <div class="lender-filters__bottom">
        <PartCategory
          :pro="pro"
          :tab="'lender'"
          @setTableLoader="setTableLoader"
          @clearMap="clearMap"
        />
      </div>
    </div>
    <transition name="fade-in">
      <div
        v-show="showFilters"
        class="lender-filters__filter-wrap"
      >
        <BlockAllFilters
          :tab="'lender'"
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
    // import PartPills from '@/components/parts/PartPills.vue';
    import { mapState } from 'vuex'
    import BlockAllFilters from '@/components/blocks/BlockAllFilters.vue'

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
        },

        methods: {
            async onEnter() {
                this.$emit('setTableLoader', true)
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
                await this.$store.dispatch('getDealsLenderFilter', { pagination: { page: 1 }, obj: obj })
                
                this.$emit('clearMap')
                this.$emit('setTableLoader', false)
                this.searchAddress = ''
            },
            toggleFilters1() {
                if (this.showFilters) {
                    this.showFilters = false
                    this.scrollToFilters()
                }
            },
            setTableLoader(flag) {
                this.$emit('setTableLoader', flag)
            },
            goTo() {
                this.$store.commit('SET_ACTIVE_TAB', true)
                this.$router.push('/profile-settings')
            },
            clearMap() {
                this.$emit('clearMap')
            },
            toggleFilters() {
                this.showFilters = !this.showFilters
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
                this.$store.commit('SET_DEALS_BROKER_SEARCH', this.searchAddress)
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

                dealsLenderPagination: state => state['FilterDeal'].dealsLenderPagination,
			}),
        },

        components: {
            SvgIcon,
            PartCategory,
            // PartPills,
            BlockAllFilters,
        },
    })
</script>

<style lang="scss" scoped>
    .lender-filters {
        padding: 21px 24px 20px 29px;

        @include mq($sm) {
            padding: 20px 25px;
        }
    }

    .lender-filters__top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 18px;

        @include mq($lg) {
            flex-direction: column-reverse;
            margin-bottom: 5px;
        }

        @include mq($sm) {
            margin-bottom: 10px;
            justify-content: center;
            align-items: center;
        }
    }

    .lender-filters__top-option {
        display: flex;
        padding-top: 11px;
        max-width: 600px;
        width: 100%;
        justify-content: space-around;

        @include mq($lg) {
            padding-top: 15px;
        }

        @include mq(767px) {
            flex-direction: column;
                padding-left: 24px;
        }

        @include mq($sm) {
            align-items: flex-start;
            padding-top: 10px;
            width: 100%;
            max-width: 100%;
        }
    }

    .lender-filters__top-option-text {
        font-family: $font-main;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: .07px;
        color: $shark;
        margin-right: 20px;
        position: relative;

        @include mq($md) {
            margin-bottom: 15px;
        }

        @include mq(767px) {
            br {
                display: none;
            }
        }

        @include mq(375px) {
            font-size: 12px;
        }
    }

    .lender-filters__top-option-title {
        font-family: $font-main;
        font-size: 14px;

        span {
            font-style: italic;
            font-weight: 600;
            color: $mosque;
        }

        a {
            margin-top: 20px;
            display: inline-block;
        }

        @include mq(767px) {
            br {
                display: none;
            }
        }

        @include mq($sm) {
            text-align: left;
        }

        @include mq(375px) {
            font-size: 12px;
        }
    }

    .lender-filters__top-search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 54.5%;

        .page-no-data & {
            pointer-events: none;
            opacity: 0.6;
        }

        @include mq(1400px) {
            width: 40%;
            flex-direction: column;
            align-items: flex-start;
        }

        @include mq($lg) {
            width: 100%;
            max-width: 100%;
        }
    }

    .lender-filters__top-search-input-holder {
        margin-right: 30px;
        padding-left: 49px;
        width: 100%;

        @include mq(1400px) {
            margin-bottom: 10px;
        }

        @include mq($lg) {
            margin-right: 0;
            margin-bottom: 15px;
            padding-left: 0;
        }

        @include mq($md) {
            // padding-left: 35px;
        }
    }

    .lender-filters__top-search-input {
        // max-width: 526px;
        max-width: 100%;
        border: none;
        border-bottom: 1px solid $santas-gray;
        border-radius: 0;
        padding: 0;
        padding-left: 30px;
        font-size: 14px;
        color: $shark;

        @include mq($lg) {
            max-width: 100%;
        }

        &::placeholder {
            font-size: 14px;
            color: $santas-gray;
        }
    }

    .lender-filters__top-search-input-icon {
        left: 2px;

        @include mq($lg) {
            font-size: 20px;
            height: 20px;
        }
    }

    .lender-filters__top-search-btn-wrap {
        display: flex;

        @include mq($lap-l) {
            align-self: flex-end;
        }

        @include mq($lg) {
            align-self: flex-start;
        }

        @include mq($sm) {
            width: 100%;
            max-width: 100%;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }

    .lender-filters__top-search-btn {
        font-size: 12px;
        min-width: 150px;
        padding: 10px 15px;
        margin-right: 30px;

        @include mq($lap-l) {
            margin-right: 15px;
        }

        @include mq($sm) {
            margin-bottom: 5px;
            margin-right: 0;
        }

        &:last-of-type {
            margin-right: 0;
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

    .lender-filters__top-search-btn-icon {
        margin-right: 7px;
    }

    .tooltip-msg__icon--absolute {
        position: absolute;
        left: -25px;
    }
    
</style>
