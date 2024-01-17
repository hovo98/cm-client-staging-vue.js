<template>
  <div class="search-area">
    <div class="search-area__input-holder input-holder">
      <!-- v-on:keyup.enter="search($event)"  set on pagination -->
      <input
        v-model="searchSponsorNames"
        class="search-area__input input-with-icon"
        type="text"
        placeholder="Search by sponsor name..."
      >
    </div>
    <label class="chk-box chk-box--alt">
      <b @click="removeAll()">Deselect All</b>
    </label>
    <ul class="search-area__list">
      <perfect-scrollbar class="search-area-ps">
        <template v-for="(item, index) in arrSponsorNames">
          <li
            v-show="!item.hidden"
            :key="index"
            class="search-area__list-item"
          >
            <label class="chk-box chk-box--alt">
              <input
                v-model="checkedSponsorNamesData"
                type="checkbox"
                :value="item.name"
                @change="checkList()"
              >
              <span class="chk-box-text">{{ item.name }}</span>
            </label>
          </li>
        </template>
      </perfect-scrollbar>
    </ul>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapState } from 'vuex'

    export default Vue.extend({

        data() {
            return {
                checkedSponsorNamesData: [],
                searchSponsorNames: '',
                arrSponsorNames: [],
            }
        },

        watch: {
            checkedSponsorNames() {
                if(this.checkedSponsorNames.length === 0) {
                    this.checkedSponsorNamesData = []
                }
            },
            searchSponsorNames() {
                this.searchList()
            },
            sponsorNames() {
                this.setNames()
            },
        },

        mounted() {
            this.checkedSponsorNamesData = this.checkedSponsorNames
            this.setNames()
        },

        computed: {
            ...mapState({
                sponsorNames: state => state['FilterQuotes'].sponsorNames,
                checkedSponsorNames: state => state['FilterQuotes'].checkedSponsorNames,

                searchQuote: state => state['FilterQuotes'].search,
                sortQuote: state => state['FilterQuotes'].sort,
                byQuote: state => state['FilterQuotes'].by,
			}),
        },

        methods: {
            setNames() {
                const arr = []
                this.sponsorNames.forEach(element => {
                    const obj = {
                        name: element,
                        hidden: false,
                    }
                    arr.push(obj)
                })
                this.arrSponsorNames = arr
                this.searchSponsorNames = ''
                this.searchList()
            },
            searchList(){
                let val = this.searchSponsorNames
                val = val.toLowerCase()
                const arr = this.arrSponsorNames
                arr.forEach(element => {
                    if(val === ''){
                        element.hidden = false
                        return false
                    }
                    let name = element.name
                    name = name.toLowerCase();
                    (name.includes(val))
                        ? element.hidden = false
                        : element.hidden = true
                })
            },
            checkList() {
                this.$store.commit('SET_CHECKED_SPONSOR_NAME', this.checkedSponsorNamesData)
            },
            async removeAll() {
                this.$store.commit('SET_CHECKED_SPONSOR_NAME', [])
                this.$emit('setTable', true)
                const newobj = {
                    searchLocation: this.searchQuote,
                    sort: this.sortQuote,
                    by: this.byQuote,
                    sponsorNames: this.checkedSponsorNames,
                    sponsorName: '',
                }
                await this.$store.dispatch('getQuotesBrokerFilter', { pagination: { page: 1 }, obj: newobj })
                this.$emit('emitClearMap')
                this.$emit('setTable', false)
            },
            async search(e) {
                this.$emit('setTable', true)
                const val = e.target.value
                const obj = {
                    searchLocation: this.searchQuote,
                    sort: this.sortQuote,
                    by: this.byQuote,
                    sponsorNames: [],
                    sponsorName: val,
                }
                //this.$emit('toggle');
                await this.$store.dispatch('getQuotesBrokerFilter', { pagination: { page: 1 }, obj: obj })
                this.$emit('emitClearMap')
                this.$emit('setTable', false)
            },
        },
    })
</script>

<style lang="scss" scoped>
    .search-area {
        .chk-box-text {
            padding-left: 30px;
        }
    }

    .search-area__input-holder {
        margin-bottom: 24px;
        position: relative;

        @include mq($sm) {
            margin-bottom: 15px;
        }
    }

    .search-area__input {
        padding-left: 46px;
        padding-right: 15px;

        @include mq($sm) {
            padding-left: 34px;
            
            &::placeholder {
                font-size: 14px;
            }
        }

        &:focus {
            padding-left: 46px !important;

            @include mq($sm) {
                padding-left: 34px !important;
            }
        }
    }

    .search-area__input-icon {
        font-size: 15px;
        height: 17px;
        left: 18px;

        @include mq($sm) {
            left: 12px;
        }
    }

    .search-area__list {
        margin-top: 23px;
    }

    .search-area__list-item {
        margin-bottom: 12px;
    }

    .search-area-ps {
        max-height: 270px;
        padding-right: 11px;

        @include mq($lg) {
            max-height: 280px;
        }
    }

    :deep() {
        .ps__rail-y {
            opacity: 1;
        }

        .ps__thumb-y {
            right: 0px;
        }

        .ps__rail-y:hover > .ps__thumb-y,
        .ps__rail-y:focus > .ps__thumb-y,
        .ps__rail-y.ps--clicking .ps__thumb-y {
            width: 6px;

            @include mq($md) {
                width: 4px;
            }
        }
    }
</style>
