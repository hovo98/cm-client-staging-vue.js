<template>
  <div class="individualQuoteTable">
    <div class="row">
      <div class="col-xl-12">
        <div class="individualQuoteTable__wrap active">
          <div
            class="individualQuoteTable__wrap-shown"
            @click="toggleClass"
          >
            <h3
              v-if="rows.length > 1"
              class="individualQuoteTable__wrap-shown-title"
            >
              <SvgIcon
                class="individualQuoteTable__wrap-text-icon"
                icon-name="ico-arrow-df"
              />My Quotes for this Deal
            </h3>
            <h3
              v-else
              class="individualQuoteTable__wrap-shown-title"
            >
              <SvgIcon
                class="individualQuoteTable__wrap-text-icon"
                icon-name="ico-arrow-df"
              />My Quote for this Deal
            </h3>
            <SvgIcon
              class="scroll-indicator"
              icon-name="ico-hand"
            />
          </div>
          <div class="individualQuoteTable__wrap-hidden quotes-table">
            <perfect-scrollbar class="table-ps">
              <VueGoodTable
                :columns="columns"
                :rows="rows"
                :sort-options="{
                  enabled: false,
                }"
                style-class="custom-table-individual-deal vgt-table"
              >
                <template
                  slot="table-row"
                  slot-scope="props"
                >
                  <template v-if="props.column.field == 'empty'">
                    <a
                      :href="'/individual-quote/'+$route.params.id+'/'+props.row.id"
                      style="position: relative; color: #055d64; font-size: 14px; font-weight: 700;"
                    >{{ props.row.empty }}View</a>
                  </template>
                  <template v-else-if="props.column.field === 'dollar_amount'">
                    <span :data-color="props.row.dollar_amount.color">
                      {{ props.row.dollar_amount.val }}
                    </span>
                  </template>
                  <template v-else-if="props.column.field === 'interestRate'">
                    <span :data-color="props.row.interestRate.color">
                      {{ props.row.interestRate.val }}
                    </span>
                  </template>
                  <template v-else-if="props.column.field === 'rateTerm'">
                    <span :data-color="props.row.rateTerm.color">
                      {{ props.row.rateTerm.val }}
                    </span>
                  </template>
                  <template v-else-if="props.column.field === 'orig'">
                    <span :data-color="props.row.orig.color">
                      {{ props.row.orig.val }}
                    </span>
                  </template>
                  <template v-else-if="props.column.field === 'status'">
                    <span
                      v-if="props.row.status.val != 'DECLINED'"
                      :class="(props.row.status.val === 'ACCEPTED' || props.row.status.val === 'SECOND_ACCEPTED') ? 'quote-status-text' : ''"
                      :data-color="props.row.status.color"
                    >
                      {{ enumType(props.row.status.val) }}
                    </span>

                    <span
                      v-else
                      :class="(props.row.status.val === 'ACCEPTED' || props.row.status.val === 'SECOND_ACCEPTED') ? 'quote-status-text' : ''"
                      :data-color="props.row.status.color"
                    >
                      {{ enumType(props.row.status.val) }} <div
                        class="tooltip-msg tooltip-msg--small"
                        data-tooltip="Broker has chosen to no longer proceed with this quote. While uncommon, this does occasionally occur."
                      ><SvgIcon
                        class="tooltip-msg__icon"
                        icon-name="ico-exclamation"
                      /></div>
                    </span>
                  </template>
                </template>
              </VueGoodTable>
            </perfect-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import 'vue-good-table/dist/vue-good-table.css'
    import { VueGoodTable } from 'vue-good-table'
    import { mapState } from 'vuex'
    import { formatMilion } from '@/config/util'

    interface Data {
        title: string
        columns,
        rows,
        flag: number
    }

    export default Vue.extend({
        components: {
            SvgIcon,
            VueGoodTable,
        },

		computed: {
			...mapState({
				quotes: state => state['FilterDeal'].dealQuotes,
			}),
		},

        mounted() {
            const colors = document.querySelectorAll('[data-color]')
            colors.forEach(el => {
                if (el) {
                    el.parentElement.classList.add('colored-cell')
                }
            })
            this.setTable()
        },

        data(): Data {
            return {
                title: 'This is title of "BlockIndividualQuoteTable"!',
                columns: [
                    {
                        label: 'DOLLAR AMOUNT',
                        field: 'dollar_amount',
                        sortable: false,
                    },
                    {
                        label: 'INTEREST RATE',
                        field: 'interestRate',
                        sortable: false,
                    },
                    {
                        label: 'RATE TERM',
                        field: 'rateTerm',
                        sortable: false,
                    },
                    {
                        label: 'ORIGINATION FEE',
                        field: 'orig',
                        sortable: false,
                    },
                    {
                        label: 'STATUS',
                        field: 'status',
                        sortable: false,
                    },
                    {
                        label: '',
                        field: 'empty',
                        sortable: false,
                    },
                ],
                rows: [],
                flag: null,
            }
        },

        methods: {
            enumType(str) {
                if(str === 'SECOND_ACCEPTED') {
                    return 'Accepted'
                } else if(str === 'OPENED') {
                    return 'Open'
                }

                str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
                return str.split('_').join(' ')
            },

            formatPercent(num) {
                if(num.toString().length === 3 || num.toString().length === 4) {
                    return num.toString().replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1.') + '%'
                } else if(num.toString().length === 2) {
                    return num.toString().replace(/(\d)(?=(\d{1})+(?!\d))/g, '$1.') + '%'
                } else if(num.toString().length === 5) {
                    return '100.00%'
                } else {
                    return num
                }
            },

            formatMilionFromUtil(labelValue) {
                return formatMilion(labelValue)
            },

            toggleClass() {
                const wrapper = document.querySelector('.individualQuoteTable__wrap')
                wrapper.classList.toggle('active')
            },

            hideBtn() {
                const btn = document.querySelector('.individualQuoteTable__wrap-link-drop')
                btn.classList.remove('active-btn')
            },

            toggleActive() {
                const btn = document.querySelector('.individualQuoteTable__wrap-link-drop')
                btn.classList.toggle('active-btn')
            },

            setTable() {
                if(this.quotes.quotes) {
                    const rows = []
                    this.quotes.quotes.forEach(element => {
                        const obj = {
                            id: '',
                            dollar_amount: {
                                val: '',
                                color: false,
                            },
                            interestRate: {
                                val: '',
                                color: false,
                            },
                            rateTerm: {
                                val: '',
                                color: false,
                            },
                            orig: {
                                val: '',
                                color: false,
                            },
                            status: {
                                val: '',
                                color: false,
                            },
                            empty: '',
                        }

                        if(element.id) {
                            obj.id = element.id
                        }

                        if(element.dollarAmount) {
                            obj.dollar_amount.val = element.dollarAmount
                        }

                        if(element.interestRate) {
                            obj.interestRate.val = element.interestRate
                        }

                        if(element.origFee) {
                            obj.orig.val = element.origFee
                        }

                        if(element.rateTerm) {
                            obj.rateTerm.val = element.rateTerm
                        }

                        if(element.status) {
                            obj.status.val = element.status
                        }

                        rows.push(obj)
                    })
                    this.rows = rows
                }
            },
        },
    })
</script>

<style lang="scss" scoped>

    .individualQuoteTable {
        padding-left: 42px;
        padding-right: 52px;
        margin-top: 30px;
        @include mq($xl) {
            padding: 0 20px;
            margin-top: 20px;
        }
    }

    .individualQuoteTable__wrap {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        min-height: 62px;
        border: 2px solid $athens-gray;
        background-color: #daeeee;
        transition: $dur $ease;
        cursor: pointer;

        &.active {

            .individualQuoteTable__wrap-text-icon {
                transform: rotate(180deg);
                top: 4px;
            }

            .individualQuoteTable__wrap-shown-link {
                opacity: 1;
                visibility: visible;
                pointer-events: all;
            }

            .individualQuoteTable__wrap-links {
                opacity: 1;
                visibility: visible;
                pointer-events: all;
            }

            .individualQuoteTable__wrap-hidden {
                display: block;
            }
        }
    }

    .individualQuoteTable__wrap-shown {
        width: 100%;
        padding: 21px 30px 18px 30px;

        @include mq($sm) {
            padding: 21px 15px 18px;
        }
    }

    .individualQuoteTable__wrap-shown-title {
        position: relative;
        color: $shark;
        font-family: $font-main;
        font-weight: 600;
        line-height: 1.2;
        font-size: 16px;
        padding-left: 20px;

        @include mq($sm) {
            font-size: 15px;
        }
    }

    .individualQuoteTable__wrap-text-icon {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        font-size: 11px;
        transition: $dur $ease;
    }

    .individualQuoteTable__wrap-links {
        position: absolute;
        top: 16px;
        right: 47px;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: $dur $ease;

        @include mq(650px) {
            top: auto;
            bottom: 15px;
            left: 30px;
            width: 100%;
        }
    }

    .individualQuoteTable__wrap-link {
        position: relative;
        font-size: 14px;
        font-family: $font-main;
        color: $mosque;
        font-weight: 700;
        padding: 2px 14px 2px 26px;
        margin-right: 18px;
        transition: $dur $ease;

        &:last-child {
            margin-right: 0;
        }

        &:hover {
            color: $yellow-orange;
        }

        @include mq(430px) {
            font-size: 13px;
            padding: 2px 14px 2px 22px;
            margin-right: 0;
        }
    }

    .individualQuoteTable__wrap-link-text-icon {
        font-size: 18px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);

    }

    .individualQuoteTable__wrap-link-big-icon {
        font-size: 17px;
        left: 0;
    }

    .individualQuoteTable__wrap-link-small-icon {
        font-size: 10px;
        left: auto;
        right: 0;
        top: 6px;
        transform: translateY(0);
    }

    .individualQuoteTable__wrap-link-drop {
        
        &.active-btn {

            .individualQuoteTable__wrap-dropper {
                opacity: 1;
                visibility: visible;
                pointer-events: all;
            }
        }
    }

     .individualQuoteTable__wrap-dropper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: absolute;
        top: 20px;
        right: 1px;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        background-color: $white;
        min-width: 214px;
        padding: 16px 20px 15px 20px;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        z-index: 10;
        transition: $dur $ease;

        @include mq($xl) {
            min-width: 170px;
        }

        @include mq(650px) {
            left: 50%;
            transform: translateX(-50%);
            min-width: 140px;
            padding: 5px 10px;
            min-width: 140px;
        }
    }
    
    .individualQuoteTable__wrap-dropper-link {
        font-size: 14px;
        font-family: $font-main;
        font-weight: 700;
        letter-spacing: 0.07px;
        line-height: 30px;
        margin-bottom: 4px;
        color: $mosque;
        transition: $dur $ease;

        &:last-child {
            margin-bottom: 0;
        }

        &:hover {
            color: $yellow-orange;
        }

        @include mq(650px) {
            font-size: 13px;
        }
    }

    .individualQuoteTable__wrap-hidden {
        width: 100%;
        padding: 5px 30px 26px;
        display: none;

        @include mq(650px) {
            padding: 5px 30px 50px;
        }

        @include mq($sm) {
            padding: 5px 15px 50px;
        }
    }

    .table-ps {
        max-height: 250px;
        padding-right: 20px;
    }

    :deep() {
        .ps__rail-y:hover > .ps__thumb-y,
        .ps__rail-y:focus > .ps__thumb-y,
        .ps__rail-y.ps--clicking .ps__thumb-y {
            width: 8px;
            background-color: $blue-chill;

            @include mq($md) {
                width: 4px;
            }
        }

        .ps__rail-y {
            width: 8px;

            @include mq($md) {
                width: 4px;
            }
        }

        .ps__thumb-y {
            background-color: $blue-chill;
            width: 8px;

            @include mq($md) {
                width: 4px;
            }
        }
    }

    .scroll-indicator {
        position: absolute;
        top: 19px;
        right: 35px;
        font-size: 19px;
        height: 23px;
        color: $mosque;
        animation: scroll-finger 2.5s ease-in-out infinite alternate;
        animation-direction: alternate;
        z-index: 2;
        display: none;

        @keyframes scroll-finger {
            0% {
                transform: translateX(30px);
            }
        
            100% {
                transform: translateX(-30px);
            }
        }

        @include mq($md) {
            display: block;
        }

        @include mq(374px) {
            top: 1px;
        }
    }

    .tooltip-msg {
        margin: 0 3px;

        &::before {
            right: -115px;
            left: auto;
            text-transform: initial;
        }
        .tooltip-msg__icon {
            color: $yellow-orange;
            padding: 0 !important;
        }
    }

</style>
