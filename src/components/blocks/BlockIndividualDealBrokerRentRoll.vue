<template>
  <div class="accordion-wrapper accordion-wrapper--table">
    <div
      class="accordion__wrap"
      :class="{'active': flag }"
    >
      <div
        class="accordion__wrap-shown"
        @click="flag = !flag"
      >
        <h3 class="accordion__wrap-shown-title">
          <SvgIcon
            class="accordion__wrap-text-icon"
            icon-name="ico-arrow-df"
          />Rent Roll
          <span
            v-if="!name && titles !=='broker'"
            class="tooltip-msg tooltip-msg--break-on-mobile"
            data-tooltip="The broker has chosen to keep the tenant's personal details private until after a quote is received."
          ><SvgIcon
            class="tooltip-msg__icon"
            icon-name="ico-question"
          /></span>
        </h3>
        <SvgIcon
          class="scroll-indicator"
          icon-name="ico-hand"
        />
      </div>
      <div
        v-if="flag"
        class="accordion__wrap-hidden"
      >
        <div class="individualDealBrokerTableRentRoll">
          <VueGoodTable 
            :columns="columns"
            :rows="table[0].items"
            :select-options="{ 
              enabled: false,
              disableSelectInfo: true
            }"
            :sort-options="{
              enabled: true,
            }"
            :fixed-header="table[0].items.length > 12 ? true : false"
            max-height="726px"
            style-class="custom-table-individual-deal custom-table-individual-deal-broker custom-table-broker vgt-table"
          >
            <template
              slot="table-row"
              slot-scope="props"
            >
              <template v-if="props.column.field === 'occupied'">
                {{ props.row.occupied }}
              </template>
              <template v-if="props.column.field === 'name'">
                {{ props.row.name }}
              </template>
              <template v-if="props.column.field === 'name' && !name && titles !== 'broker'">
                <span class="blur">Tenants name is hidden</span>
              </template>
              <template v-if="props.column.field === 'unit'">
                {{ props.row.unit }}
              </template>
              <template v-if="props.column.field === 'sf'">
                {{ props.row.sf.replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </template>
              <template v-if="props.column.field === 'unit_type'">
                {{ props.row.unit_type }}
              </template>
              <template v-if="props.column.field === 'bedroom'">
                {{ props.row.bedroom }}
              </template>
              <template v-if="props.column.field === 'lease_start'">
                {{ props.row.lease_start }}
              </template>
              <template v-else-if="props.column.field === 'lease_end'">
                <template v-if="props.row.lease_end.toLowerCase() === 'mtm' || props.row.lease_end.toLowerCase() === 'month to month' || props.row.lease_end.toLowerCase() === 'monthly'">
                  MTM
                </template>
                <template v-else>
                  {{ props.row.lease_end }}
                </template>
              </template>
              <template v-else-if="props.column.field === 'monthle_rent'">
                ${{ formatDollars(props.row.monthle_rent) }}
              </template>
              <template v-else-if="props.column.field === 'annual_rent'">
                ${{ formatDollars(props.row.annual_rent) }}
              </template>
              <template v-if="props.column.field === 'annual_rent_sf'">
                <template v-if="props.row.annual_rent_sf !== ''">
                  ${{ formatDollars(props.row.annual_rent_sf) }}
                </template>
              </template>
            </template>
          </VueGoodTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import { VueGoodTable } from 'vue-good-table'
    import 'vue-good-table/dist/vue-good-table.css'
    import { formatNumber, changeDate } from '@/config/util'

    export default Vue.extend({
        components: {
            VueGoodTable,
            SvgIcon,
        },

        props: {
            table: {
                required: true,
            },
            name: {
                required: true,
            },
            titles: {
                type: String,
                required: false,
            },
            annual_total: {
                required: true,
            },
            monthle_total: {
                required: true,
            },
            occupied_total: {
                required: true,
            },
            annual_sf_total: {
                required: true,
            },
        },

        data() {
            return {
                columns: [
                    {
                        label: 'Status',
                        field: 'occupied',
                        sortable: false,
                    },
                    {
                        label: 'Tenants name',
                        field: 'name',
                        sortable: false,
                    },
                    {
                        label: 'Unit',
                        field: 'unit',
                        sortable: false,
                    },
                    {
                        label: 'Lease start',
                        field: 'lease_start',
                        sortable: false,
                    },
                    {
                        label: 'Lease end',
                        field: 'lease_end',
                        sortable: false,
                    },
                    {
                        label: 'SF',
                        field: 'sf',
                        sortable: false,
                    },
                    {
                        label: 'Monthly rent',
                        field: 'monthle_rent',
                        sortable: false,
                    },
                    {
                        label: 'Annual rent',
                        field: 'annual_rent',
                        sortable: false,
                    },
                    {
                        label: 'Annual rent/SF',
                        field: 'annual_rent_sf',
                        sortable: false,
                    },
                ],
                flag: true,
            }
        },

        computed: {
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
            if(this.table[0].items[0].unit_type !== '') {
                this.columns.splice(1, 0,{
                    label: 'Unit type',
                    field: 'unit_type',
                    sortable: false,
                })
            }

            if(this.table[0].items[0].bedroom !== '' && this.table[0].items[0].unit_type === '') {
                this.columns.splice(2, 0, {
                    label: 'Bedroom/Bathroom',
                    field: 'bedroom',
                    sortable: false,
                })
            } else if(this.table[0].items[0].bedroom !== '' && this.table[0].items[0].unit_type !== '') {
                this.columns.splice(3, 0, {
                    label: 'Bedroom/Bathroom',
                    field: 'bedroom',
                    sortable: false,
                })
            }
            
            this.localTable[0].items.push(
                {
                    occupied: '',
                    unit_type: '',
                    name: '',
                    unit: '',
                    bedroom: '',
                    lease_start: '',
                    lease_end: '',
                    sf: 'TOTALS:',
                    monthle_rent: this.monthle_total,
                    annual_rent: this.annual_total,
                    annual_rent_sf: this.annual_sf_total,
                },
            )
        },

        methods: {
            changeDateFormat(date) {
                return changeDate(date)
            },
            formatDollars(field) {
                return formatNumber(field)
			},
        },
    })
</script>

<style lang="scss" scoped>

    .accordion-wrapper {
        margin-top: 30px;

        // &:nth-child(-n+2) {
        //     margin-top: 0;
        // }

        @include mq($xl) {
            margin-top: 20px;

            &:nth-child(-n+2) {
                margin-top: 20px;
            }
        }
    }

    .accordion-wrapper--table {
        margin-top: 30px;
    }

    .accordion__wrap {
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

            .accordion__wrap-text-icon {
                transform: rotate(180deg);
                top: 4px;
            }

            .accordion__wrap-shown-link {
                opacity: 1;
                visibility: visible;
                pointer-events: all;
            }
        }
    }

    .accordion__wrap-shown {
        width: 100%;
        padding: 21px 30px 18px 30px;

        @include mq($sm) {
            padding: 20px 15px 20px;
        }

        @include mq(640px) {
            display: flex;
            justify-content: space-between;
        }
    }

    .accordion__wrap-shown-title {
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

    .accordion__wrap-text-icon {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        font-size: 11px;
        height: 11px;
        transition: $dur $ease;
    }

    .accordion__wrap-shown-link {
        position: absolute;
        top: 10px;
        right: 20px;
        padding: 10px;
        font-size: 14px;
        font-family: $font-main;
        color: $mosque;
        font-weight: 700;
        transition: $dur $ease;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;

        &:hover {
            color: $yellow-orange;
        }
    }

    .accordion__wrap-hidden {
        background-color: $white;
        width: 100%;
        // min-height: 278px;
        transition: $dur $ease;
        padding: 0 30px 40px;

        @include mq($xl) {
            min-height: 100%;
        }
    }

    .custom-table-individual-deal .vgt-right-align {
        text-align: left;
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

    .blur {
        color: transparent;
        text-shadow: 0 0 5px rgba(0,0,0,0.5);
    }

    .tooltip-msg::before {
        @include mq(767px) {
            left: -21px;
        }
    }
</style>
