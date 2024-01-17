<template>
  <div class="individualDealBrokerTable">
    <div class="row">
      <div class="col-xl-12">
        <div class="individualDealBrokerTable__wrap active">
          <div
            class="individualDealBrokerTable__wrap-shown"
            @click="toggleClass"
          >
            <h3 class="individualDealBrokerTable__wrap-shown-title">
              <SvgIcon
                class="individualDealBrokerTable__wrap-text-icon"
                icon-name="ico-arrow-df"
              />Quotes for this Deal
            </h3>
            <SvgIcon
              class="scroll-indicator"
              icon-name="ico-hand"
            />
          </div>
          <div class="individualDealBrokerTable__wrap-hidden quotes-table">
            <perfect-scrollbar class="table-ps">
              <VueGoodTable
                :columns="columns"
                :rows="rows"
                :select-options="{
                  enabled: false,
                  disableSelectInfo: true
                }"
                :sort-options="{
                  enabled: false
                }"
                style-class="custom-table-individual-deal custom-table-individual-deal-broker custom-table-broker vgt-table"
              >
                <!-- <div slot="emptystate">
                                    This will show up when there are no rows
                                </div> -->
                <template
                  slot="table-row"
                  slot-scope="props"
                >
                  <template v-if="props.column.field === 'dollar_amount'">
                    <table class="broker-sub-table">
                      <tr
                        v-for="(item, index) in props.row.dollar_amount"
                        :key="index"
                      >
                        <td>
                          {{ item }}
                        </td>
                      </tr>
                    </table>
                  </template>
                  <template v-else-if="props.column.field === 'interestRate'">
                    <table class="broker-sub-table">
                      <tr
                        v-for="(item, index) in props.row.interestRate"
                        :key="index"
                      >
                        <td>
                          {{ item }}
                        </td>
                      </tr>
                    </table>
                  </template>
                  <template v-else-if="props.column.field === 'rateTerm'">
                    <table class="broker-sub-table">
                      <tr
                        v-for="(item, index) in props.row.rateTerm"
                        :key="index"
                      >
                        <td>
                          {{ item }}
                        </td>
                      </tr>
                    </table>
                  </template>
                  <template v-else-if="props.column.field === 'orig'">
                    <table class="broker-sub-table">
                      <tr
                        v-for="(item, index) in props.row.orig"
                        :key="index"
                      >
                        <td>
                          {{ item }}
                        </td>
                      </tr>
                    </table>
                  </template>
                  <template v-else-if="props.column.field === 'status'">
                    <table class="broker-sub-table">
                      <tr
                        v-for="(item, index) in props.row.status"
                        :key="index"
                      >
                        <td
                          v-if="item != 'NOT_AVAILABLE' && item != 'DECLINED'"
                          :class="(item === 'ACCEPTED' || item === 'SECOND_ACCEPTED') ? 'quote-status-text' : ''"
                        >
                          {{ enumType(item) }}
                        </td>
                        <td
                          v-else-if="item === 'NOT_AVAILABLE'"
                          :class="(item === 'ACCEPTED' || item === 'SECOND_ACCEPTED') ? 'quote-status-text' : ''"
                        >
                          <span>{{ enumType(item) }} <div
                            class="tooltip-msg tooltip-msg--small"
                            data-tooltip="The lender has chosen to no longer offer the terms of this particular quote. This sometimes happens when too much time lapses between quote date and date of acceptance."
                          >
                            <SvgIcon
                              class="tooltip-msg__icon"
                              icon-name="ico-exclamation"
                            />
                          </div></span>
                        </td>
                        <td
                          v-else-if="item === 'DECLINED'"
                          :class="(item === 'ACCEPTED' || item === 'SECOND_ACCEPTED') ? 'quote-status-text' : ''"
                        >
                          <span>{{ enumType(item) }} </span>
                        </td>
                      </tr>
                    </table>
                  </template>
                  <span
                    v-else-if="props.column.field === 'empty'"
                    style="text-align: center;"
                  >
                    <a
                      :href="'/individual-quote-broker/' + $route.params.id + '/' + props.row.id"
                      style="position: relative; color: #055d64; font-size: 14px; font-weight: 700;"
                    >{{ props.row.empty }}View</a>
                  </span>
                </template>
              </VueGoodTable>
            </perfect-scrollbar>
          </div>
          <!--<div class="individualDealBrokerTable__wrap-links">
                         <div class="individualDealBrokerTable__wrap-links-left">
                            <div class="individualDealBrokerTable__wrap-check">
                                 <label class="chk-box chk-box--alt">
                                    <input type="checkbox">
                                    <span class="chk-box-text"></span>
                                </label>
                            </div>
                            <a class="individualDealBrokerTable__wrap-link individualDealBrokerTable__wrap-link-drop" href="javascript:;" @click="toggleActive" v-click-outside="hideBtn">
                                <SvgIcon class="individualDealBrokerTable__wrap-link-text-icon individualDealBrokerTable__wrap-link-big-icon" iconName="ico-file"/>Export<SvgIcon class="individualDealBrokerTable__wrap-link-text-icon individualDealBrokerTable__wrap-link-small-icon" iconName="ico-arrow-df"/>
                                <div class="individualDealBrokerTable__wrap-dropper">
                                    <a class="individualDealBrokerTable__wrap-dropper-link" href="javascript:;">Send via Email</a>
                                    <a class="individualDealBrokerTable__wrap-dropper-link" href="javascript:;">Export to Excel</a>
                                    <a class="individualDealBrokerTable__wrap-dropper-link" href="javascript:;">Export as PDF</a>
                                </div>
                            </a>
                        </div>
                        <div class="individualDealBrokerTable__wrap-links-right">
                            <a class="individualDealBrokerTable__wrap-link" href="javascript:;"><SvgIcon class="individualDealBrokerTable__wrap-link-text-icon" iconName="ico-m-table"/>Manage Table</a>
                        </div>
                    </div>-->
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
import ClickOutside from 'vue-click-outside'
import { formatMilion } from '@/config/util'

interface Data {
  title: string
  columns,
  flag: number
}

export default Vue.extend({
  components: {
    SvgIcon,
    VueGoodTable,
  },

  directives: {
    ClickOutside,
  },
  props: {
    quotes: {
      required: true,
    },
  },

  data(): Data {
    return {
      title: 'This is title of "BlockindividualDealBrokerTable"!',
      columns: [
        {
          label: 'BANK NAME',
          field: 'company',
          sortable: false,
        },
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
      flag: null,
    }
  },

  computed: {
    rows() {
      const rows = []
      const bigObj = {}
      this.quotes.forEach(ele => {

        const lender_id = ele.lender.id
        const name = ele.lender.firstName + ' ' + ele.lender.lastName
        const company = ele.lender.company
        if (!bigObj[lender_id]) {
          bigObj[lender_id] = {
            id: ele.lender.id,
            lender_name: this.subscription.status === 'active' || this.subscription.status === 'trialing' ? name : '[Free Deal - upgrade to see this detail.]',
            company: this.subscription.status === 'active' || this.subscription.status === 'trialing'  ? company : '[Free Deal - upgrade to see this detail.]',
            dollar_amount: [],
            interestRate: [],
            rateTerm: [],
            orig: [],
            status: [],
            empty: '',
          }
        }

        ele.quotes.forEach(element => {
          if (element.dollarAmount) {
            bigObj[lender_id].dollar_amount.push(element.dollarAmount)
          } else {
            bigObj[lender_id].dollar_amount.push('')
          }

          if (element.interestRate) {
            bigObj[lender_id].interestRate.push(element.interestRate)
          } else {
            bigObj[lender_id].interestRate.push('')
          }

          if (element.origFee) {
            bigObj[lender_id].orig.push(element.origFee)
          } else {
            bigObj[lender_id].orig.push('')
          }

          if (element.rateTerm) {
            bigObj[lender_id].rateTerm.push(element.rateTerm)
          } else {
            bigObj[lender_id].rateTerm.push('')
          }

          if (element.status) {
            bigObj[lender_id].status.push(element.status)
          } else {
            bigObj[lender_id].status.push('')
          }
        })

      })
      for (let key in bigObj) {
        rows.push(bigObj[key])
      }
      return rows
    },

    subscription() {
      return this.$store.state.Broker.subscription
    },
  },

  methods: {
    enumType(str) {
      if (str === 'SECOND_ACCEPTED') {
        return 'Accepted'
      } else if (str === 'OPENED') {
        return 'Open'
      }
      str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
      return str.split('_').join(' ')
    },
    formatPercent(num) {
      if (num.toString().length === 3 || num.toString().length === 4) {
        return num.toString().replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1.') + '%'
      } else if (num.toString().length === 2) {
        return num.toString().replace(/(\d)(?=(\d{1})+(?!\d))/g, '$1.') + '%'
      } else if (num.toString().length === 5) {
        return '100.00%'
      } else {
        return num
      }
    },

    toggleClass() {
      const wrapper = document.querySelector('.individualDealBrokerTable__wrap')
      wrapper.classList.toggle('active')
    },

    hideBtn() {
      const btn = document.querySelector('.individualDealBrokerTable__wrap-link-drop')
      btn.classList.remove('active-btn')
    },

    toggleActive() {
      const btn = document.querySelector('.individualDealBrokerTable__wrap-link-drop')
      btn.classList.toggle('active-btn')
    },

    formatMilionFromUtil(labelValue) {
      return formatMilion(labelValue)
    },
  },
})
</script>

<style lang="scss" scoped>
.individualDealBrokerTable {
  margin-top: 30px;
  padding-left: 42px;
  padding-right: 52px;

  @include mq($xl) {
    padding: 0 20px;
    margin-top: 20px;
  }
}

.individualDealBrokerTable__wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 62px;
  border: 2px solid $athens-gray;
  background-color: $white;
  transition: $dur $ease;
  cursor: pointer;

  &.active {
    .individualDealBrokerTable__wrap-text-icon {
      transform: rotate(180deg);
      top: 4px;
    }

    .individualDealBrokerTable__wrap-shown-link {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }

    .individualDealBrokerTable__wrap-dropper-link {
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
    }

    .individualDealBrokerTable__wrap-links {
      display: flex;
      justify-content: space-between;
      // opacity: 1;
      // visibility: visible;
      // pointer-events: all;
    }

    .individualDealBrokerTable__wrap-hidden {
      display: block;
    }
  }
}

.individualDealBrokerTable__wrap-shown {
  width: 100%;
  padding: 21px 30px 18px 30px;

  @include mq($sm) {
    padding: 21px 15px 18px;
  }
}

.individualDealBrokerTable__wrap-shown-title {
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

.individualDealBrokerTable__wrap-text-icon {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 11px;
  transition: $dur $ease;
}

.individualDealBrokerTable__wrap-links {
  position: absolute;
  top: 69px;
  right: 0;
  display: none;
  // opacity: 0;
  // visibility: hidden;
  // pointer-events: none;
  transition: 350ms ease;
  // display: flex;
  // justify-content: space-between;
  width: 100%;
  padding-left: 49px;
  padding-right: 18px;

  @include mq($sm) {
    padding-left: 33px;
  }

  @include mq(400px) {
    flex-direction: column-reverse;
    padding-left: 33px;
  }
}

.individualDealBrokerTable__wrap-links-right {
  display: flex;
}

.individualDealBrokerTable__wrap-links-left {
  display: flex;
  align-items: center;

  @include mq(400px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
}

.individualDealBrokerTable__wrap-check {
  margin-right: 23px;
}

.chk-box {
  transform: translateY(-15px);
}

.individualDealBrokerTable__wrap-link {
  position: relative;
  font-size: 14px;
  font-family: $font-main;
  color: $mosque;
  font-weight: 700;
  padding: 2px 14px 2px 26px;
  transition: $dur $ease;

  &:hover {
    color: $yellow-orange;
  }

  @include mq(430px) {
    font-size: 13px;
    padding: 2px 14px 2px 22px;
    margin-right: 0;
  }

  @include mq(350px) {
    font-size: 12px;
  }
}

.individualDealBrokerTable__wrap-link-text-icon {
  font-size: 18px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);

}

.individualDealBrokerTable__wrap-link-big-icon {
  font-size: 17px;
  left: 0;
}

.individualDealBrokerTable__wrap-link-small-icon {
  font-size: 10px;
  right: 0;
  left: auto;
}

.individualDealBrokerTable__wrap-link-drop {

  &.active-btn {

    .individualDealBrokerTable__wrap-dropper {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }
  }
}

.individualDealBrokerTable__wrap-dropper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
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

.individualDealBrokerTable__wrap-dropper-link {
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

.individualDealBrokerTable__wrap-hidden {
  width: 100%;
  padding: 10px 30px 26px;
  display: none;

  @include mq(650px) {
    padding: 10px 30px 30px;
  }

  @include mq($sm) {
    padding: 10px 15px 30px;
  }

  @include mq(400px) {
    padding: 10px 15px 40px;
  }
}

.broker-sub-table {
  width: 100%;

  td {
    padding: 14px 19px !important;
    border: none;
  }
}

.quote-status-text {
  color: $blue-chill !important;
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

.custom-table-individual-deal-broker tbody td:first-child span {
  padding: 0 !important;
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
}</style>
