<template>
  <div
    class="scroll-table-wrapper scroll-table-wrapper--alt error-message-holder"
  >
    <div
      ref="scrollWrapper"
      :class="manualOrCopyPast ? 'scroll-wrapper manual' : 'scroll-wrapper'"
    >
      <table class="scroll-table">
        <tr>
          <th
            :class="
              !manualOrCopyPast
                ? 'spreadsheet__head-cell occupied'
                : 'spreadsheet__head-cell manual occupied'
            "
          >
            Occupied
          </th>
          <template v-if="!manualOrCopyPast">
            <template v-for="thIndex in countLengthOfRows">
              <th
                :key="thIndex"
                :class="
                  thMapData[thIndex - 1] === '' || !thMapData[thIndex - 1]
                    ? 'spreadsheet__head-cell'
                    : 'spreadsheet__head-cell spreadsheet__head-cell--alt'
                "
              >
                <select
                  :ref="`select${thIndex - 1}`"
                  :value="thMapData[thIndex - 1]"
                  class="spreadsheet__head-cell-select"
                  :title="
                    !thMapData[thIndex - 1]
                      ? 'Select Title'
                      : thMapData[thIndex - 1]
                  "
                  @change="changeColumnOrder($event, thIndex - 1)"
                >
                  <option value="">Select Title</option>
                  <template v-for="(key, optionIndex) in option">
                    <option
                      :key="optionIndex"
                      :value="key"
                    >
                      {{ capitalize(key) }}
                      <span v-if="checkIfRequired(key)">*</span>
                    </option>
                  </template>
                </select>
              </th>
            </template>
          </template>
          <template
            v-for="(key, index) in thForManualTable"
            v-else
          >
            <th
              :key="index"
              class="spreadsheet__head-cell manual"
              :title="key"
            >
              {{ capitalize(key) }} <span v-if="checkIfRequired(key)">*</span>
            </th>
          </template>
        </tr>
        <template v-for="(tr, rowIndex) in table">
          <tr
            :key="rowIndex"
            class="rent-roll-row"
          >
            <td class="spreadsheet__col-td checkbox">
              <input
                type="checkbox"
                :checked="occupiedArr[rowIndex]"
                @change="changeValueCheckBox($event, rowIndex)"
              />
              <span class="spreadsheet__col-td__custom-checkbox" />
            </td>
            <td
              v-for="(td, tdIndex) in tr"
              :key="tdIndex"
              :title="td.value"
              :class="[
                thMapData[tdIndex] === 'REMOVE COLUMN'
                  ? 'remove spreadsheet__col-td'
                  : 'spreadsheet__col-td',
                thMapData[tdIndex] === 'LEASE START' ||
                  thMapData[tdIndex] === 'LEASE END'
                  ? 'datepicker'
                  : '',
              ]"
            >
              <template
                v-if="
                  thMapData[tdIndex] === 'LEASE START' ||
                    thMapData[tdIndex] === 'LEASE END'
                "
              >
                <input
                  type="text"
                  :value="td.value"
                  :class="
                    td.valid ? 'ok spreadsheet__cell' : 'red spreadsheet__cell'
                  "
                  @change="
                    changeValue($event, rowIndex, tdIndex, thMapData[tdIndex])
                  "
                />
                <Datepicker
                  class="rent-roll-datepicker"
                  format="MM/dd/yyyy"
                  :value="td.value"
                  @selected="
                    changeValueDate(
                      $event,
                      rowIndex,
                      tdIndex,
                      thMapData[tdIndex]
                    )
                  "
                />
                <SvgIcon
                  class="rent-roll-datepicker-icon"
                  icon-name="ico-calendar"
                />
              </template>
              <template v-else>
                <input
                  type="text"
                  :disabled="
                    thMapData[tdIndex] === 'ANNUAL RENT' ||
                      thMapData[tdIndex] === 'ANNUAL RENT/SF'
                  "
                  :value="td.value"
                  :class="
                    td.valid ? 'ok spreadsheet__cell' : 'red spreadsheet__cell'
                  "
                  @change="
                    changeValue($event, rowIndex, tdIndex, thMapData[tdIndex])
                  "
                />
              </template>
            </td>
            <div
              class="remove-row"
              title="Remove row"
              @click="removeRowToParent(rowIndex)"
            />
          </tr>
        </template>
        <template v-if="manualOrCopyPast">
          <tr
            v-if="monthlyTotal !== 0 || annualSFTotal !== 0"
            class="rent-roll-row total"
          >
            <td class="spreadsheet__col-td total">Totals:</td>
            <template v-for="(key, tdIndex) in thForManualTable">
              <td
                v-if="key === 'MONTHLY RENT'"
                :key="tdIndex"
                class="spreadsheet__col-td"
              >
                <span
                  v-if="monthlyTotal !== 0"
                  class="spreadsheet__cell totals"
                >{{
                  "$" +
                    monthlyTotal
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}</span>
              </td>
              <td
                v-else-if="key === 'ANNUAL RENT'"
                :key="tdIndex"
                class="spreadsheet__col-td"
              >
                <span
                  v-if="annualTotal !== 0"
                  class="spreadsheet__cell totals"
                >{{
                  "$" +
                    annualTotal
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}</span>
              </td>
              <td
                v-else-if="key === 'ANNUAL RENT/SF'"
                :key="tdIndex"
                class="spreadsheet__col-td"
              >
                <span
                  v-if="annualSFTotal !== 0"
                  class="spreadsheet__cell totals"
                >{{
                  "$" +
                    annualSFTotal
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}</span>
              </td>
              <td
                v-else
                :key="tdIndex"
                class="spreadsheet__col-td"
              />
            </template>
          </tr>
        </template>
        <template v-else>
          <tr
            v-if="monthlyTotal !== 0 || annualSFTotal !== 0"
            class="rent-roll-row total"
          >
            <td class="spreadsheet__col-td total">Totals:</td>
            <template v-for="tdIndex in countLengthOfRows">
              <td
                v-if="thMapData[tdIndex - 1] === 'MONTHLY RENT'"
                :key="tdIndex"
                class="spreadsheet__col-td"
              >
                <span
                  v-if="monthlyTotal !== 0"
                  class="spreadsheet__cell totals"
                >{{
                  "$" +
                    monthlyTotal
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}</span>
              </td>
              <td
                v-else-if="thMapData[tdIndex - 1] === 'ANNUAL RENT'"
                :key="tdIndex"
                class="spreadsheet__col-td"
              >
                <span
                  v-if="annualTotal !== 0"
                  class="spreadsheet__cell totals"
                >{{
                  "$" +
                    annualTotal
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}</span>
              </td>
              <td
                v-else-if="thMapData[tdIndex - 1] === 'ANNUAL RENT/SF'"
                :key="tdIndex"
                class="spreadsheet__col-td"
              >
                <span
                  v-if="annualSFTotal !== 0"
                  class="spreadsheet__cell totals"
                >{{
                  "$" +
                    annualSFTotal
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}</span>
              </td>
              <td
                v-else
                :key="tdIndex"
                class="spreadsheet__col-td"
              />
            </template>
          </tr>
        </template>
      </table>
    </div>

    <div class="spreadsheet__footer">
      <a
        href="javascript:;"
        class="link"
        @click="createRowToParent()"
      >
        <SvgIcon
          class="link__icon"
          icon-name="ico-plus-circle"
        />
        Add row
      </a>
    </div>

    <div class="table-error-wrapper">
      <span
        v-if="dateError"
        class="error-message"
      >Please enter the Lease End date in the supported format (mm/dd/yyyy) or
        write "month to month" if there is no lease</span>
      <span
        v-if="dateErrorFormat"
        class="error-message"
      >Date format for Lease Start is incorrect (Supported format
        mm/dd/yyyy)</span>
      <span
        v-if="monthlyRequiredFields"
        class="error-message"
      >Monthly rent is a required field</span>
      <span
        v-if="leaseRequiredFields"
        class="error-message"
      >Lease End is a required field</span>
      <span
        v-if="monthlyAndLeaseRequiredFields"
        class="error-message"
      >Lease End and Monthly rent are required fields</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Datepicker from 'vuejs-datepicker'
import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'

export default Vue.extend({

  components: {
    Datepicker,
    SvgIcon,
  },
  props: [
    'table',
    'countLengthOfRows',
    'resetAnnualIncome',
    'exsistData',
    'occupiedArr',
    'firstRowTh',
    'propType',
    'mixedUse',
    'changeOccupied',
    'dataFromDatabase',
    'createRow',
    'calculateRentalIncome',
    'removeRow',
    'changeInputValue',
    'manualOrCopyPast',
    'setTableAndOccupiedWithDatabaseData',
    'calculateGroos',
    'resetGroos',
    'calculateVacancy',
    'resetVacancy',
  ],

  data() {
    return {
      option: [
        'OCCUPIED',
        'UNIT TYPE',
        'TENANTS NAME',
        'UNIT',
        'BEDROOM/ BATHROOM',
        'LEASE START',
        'LEASE END',
        'SF',
        'MONTHLY RENT',
        'ANNUAL RENT',
        'ANNUAL RENT/SF',
        'REMOVE COLUMN',
      ],
      thForManualTable: [
        'UNIT TYPE',
        'TENANTS NAME',
        'UNIT',
        'BEDROOM/ BATHROOM',
        'LEASE START',
        'LEASE END',
        'SF',
        'MONTHLY RENT',
        'ANNUAL RENT',
        'ANNUAL RENT/SF',
      ],
      mapObject: {
        'UNIT TYPE': 'unit_type',
        'TENANTS NAME': 'name',
        UNIT: 'unit',
        'BEDROOM/ BATHROOM': 'bedroom',
        'LEASE START': 'lease_start',
        'LEASE END': 'lease_end',
        SF: 'sf',
        'MONTHLY RENT': 'monthle_rent',
        'ANNUAL RENT': 'annual_rent',
        'ANNUAL RENT/SF': 'annual_rent_sf',
      },
      thMapData: {},
      monthlyTotal: 0,
      annualTotal: 0,
      annualSFTotal: 0,
      dateError: false,
      limitErrors: false,
      monthlyRequiredFields: false,
      leaseRequiredFields: false,
      monthlyAndLeaseRequiredFields: false,
      dateErrorFormat: false,
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

  async beforeMount() {
    this.setManualThMapDataAndPropType()
    if (this.exsistData.length > 0) {
      await this.setExsistData()
      for (const key in this.thMapData) {
        this.checkColumnValue(this.thMapData[key].toLowerCase(), key)
      }
    } else {
      for (const key in this.firstRowTh) {
        this.changeThMapData(this.firstRowTh[key], key)
        this.checkColumnValue(this.firstRowTh[key].toLowerCase(), key)
      }
    }
  },

  methods: {
    capitalize(key) {
      if (key === 'ANNUAL RENT/SF') {
        return 'Annual Rent/SF'
      } else if (key === 'SF') {
        return key
      } else {
        // This capitilizes the first letter of the string
        return key.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
      }
    },
    setExsistData() {
      let table = []
      let occupiedArr = []
      this.exsistData.forEach((obj) => {
        let wrapArrRow = []
        for (const key in this.mapObject) {
          let flag = false
          for (const thKey in this.thMapData) {
            if (this.thMapData[thKey] === key) flag = true
          }
          if (flag) {
            wrapArrRow = [
              ...wrapArrRow,
              {
                valid: true,
                value: obj[this.mapObject[key]],
              },
            ]
          }
        }
        occupiedArr = [...occupiedArr, obj['occupied']]
        table = [...table, wrapArrRow]
      })
      this.$emit('setTableAndOccupiedWithDatabaseData', table, occupiedArr)
    },

    scrollToBottom(event) {
      const objDiv = this.$refs.scrollWrapper
      //get scroll position of event target from top

      objDiv.scrollTop = event.target.scrollTop
    },

    checkIfRequired(key) {
      if (key === 'MONTHLY RENT') return true

      if (key === 'LEASE END') {
        if (this.propType === 'MULTIFAMILY') {
          return false
        } else if (this.propType === 'MIXEDUSE') {
          if (this.mixedUse.includes('MULTIFAMILY')) {
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      }

      return false
    },
    setManualThMapDataAndPropType() {
      if (this.propType === 'MULTIFAMILY') {
        this.setThAndData([
          'TENANTS NAME',
          'UNIT',
          'BEDROOM/ BATHROOM',
          'LEASE START',
          'LEASE END',
          'SF',
          'MONTHLY RENT',
          'ANNUAL RENT',
          'ANNUAL RENT/SF',
          'REMOVE COLUMN',
        ])
      } else if (this.propType === 'MIXEDUSE') {
        if (this.mixedUse.includes('MULTIFAMILY')) {
          this.setThAndData([
            'UNIT TYPE',
            'TENANTS NAME',
            'UNIT',
            'BEDROOM/ BATHROOM',
            'LEASE START',
            'LEASE END',
            'SF',
            'MONTHLY RENT',
            'ANNUAL RENT',
            'ANNUAL RENT/SF',
            'REMOVE COLUMN',
          ])
        } else {
          this.setThAndData([
            'UNIT TYPE',
            'TENANTS NAME',
            'UNIT',
            'LEASE START',
            'LEASE END',
            'SF',
            'MONTHLY RENT',
            'ANNUAL RENT',
            'ANNUAL RENT/SF',
            'REMOVE COLUMN',
          ])
        }
      } else {
        this.setThAndData([
          'TENANTS NAME',
          'UNIT',
          'LEASE START',
          'LEASE END',
          'SF',
          'MONTHLY RENT',
          'ANNUAL RENT',
          'ANNUAL RENT/SF',
          'REMOVE COLUMN',
        ])
      }
    },
    setThAndData(arr) {
      if (this.manualOrCopyPast) arr.pop()

      const obj = {}
      arr.forEach((element, index) => {
        obj[index] = element
      })
      if (this.manualOrCopyPast) {
        this.thMapData = obj
        this.thForManualTable = arr
      } else {
        arr.unshift('OCCUPIED')
        this.option = arr
      }
    },
    changeColumnOrder(e, index) {
      const { value } = e.target

      // map column
      this.resetErrors()
      this.changeThMapData(value.toUpperCase(), index)
      this.checkColumnValue(value, index)
    },
    resetErrors() {
      this.limitErrors = false
      this.monthlyRequiredFields = false
      this.leaseRequiredFields = false
      this.monthlyAndLeaseRequiredFields = false
    },
    checkColumnValue(value, index) {
      this.dateErrorFormat = false
      this.dateError = false
      this.resetErrors()
      switch (value.toLowerCase()) {
        case 'occupied':
          this.occupiedRow(index)
          break
        case 'unit type':
          this.lettersAndNumber(index)
          break
        case 'tenants name':
          this.lettersAndNumber(index)
          break
        case 'unit':
          this.lettersAndNumber(index)
          break
        case 'bedroom/ bathroom':
          this.lettersAndNumber(index)
          break
        case 'lease start':
          this.dateAndLettersStart(index)
          break
        case 'lease end':
          this.dateAndLettersEnd(index)
          break
        case 'sf':
          this.numbers(index)
          break
        case 'monthly rent':
          this.dolarAmount(index, value.toUpperCase())
          break
        case 'annual rent':
          this.dolarAmount(index, value.toUpperCase())
          break
        case 'annual rent/sf':
          this.dolarAmount(index, value.toUpperCase())
          break
        default:
          this.lettersAndNumber(index)
          break
      }
    },
    changeThMapData(key, index) {
      if (key === 'REMOVE COLUMN') {
        this.removeColumn(index)
        return
      }

      const newObj = JSON.parse(JSON.stringify(this.thMapData))
      for (const newKey in newObj) {
        if (key === '') {
          if (parseInt(newKey) === parseInt(index)) {
            this.checkColumnValue('', newKey)
            delete newObj[newKey]
          }
        } else {
          if (newObj[newKey] === key) {
            this.checkColumnValue('', newKey)
            delete newObj[newKey]
          }
        }
      }
      if (key !== '') newObj[index] = key
      this.thMapData = newObj
    },
    numbers(index) {
      this.annualTotal = 0
      this.monthlyTotal = 0
      this.annualSFTotal = 0
      this.$emit('resetAnnualIncome')
      this.$emit('resetVacancy')
      this.$emit('resetGroos')
      this.table.forEach((tr, trIndex) => {
        if (tr) {
          tr.forEach((td, tdIndex) => {
            if (parseInt(tdIndex) === parseInt(index)) {
              td.valid = true
              const val = td.value.replace(/\$|,/g, '')
              if (!isNaN(val)) td.value = val
              this.calculateCondition(tr, trIndex)
            }
          })
        }
      })
    },
    calculateARSFWithoutAnnual(tr, sfIndex, monthlyIndex, annualRentSfIndex) {
      const annualRent =
        parseFloat(tr[monthlyIndex].value.replace(/\$|,/g, '')) * 12
      const sf = tr[sfIndex].value

      if (isNaN(sf) || sf === '') return false

      const sum = annualRent / sf

      if (!isFinite(sum)) {
        tr[annualRentSfIndex].value = ''
      } else {
        this.annualSFTotal += sum
        tr[annualRentSfIndex].value =
          '$' +
          sum
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    },
    occupiedRow(index) {
      this.annualTotal = 0
      this.monthlyTotal = 0
      this.annualSFTotal = 0
      this.$emit('resetAnnualIncome')
      this.$emit('resetVacancy')
      this.$emit('resetGroos')
      this.table.forEach((tr, trIndex) => {
        if (tr) {
          tr.forEach((td, tdIndex) => {
            if (parseInt(tdIndex) === parseInt(index)) {
              td.valid = true
              if (td.value.toLowerCase() === 'vacant') {
                this.$emit('changeOccupied', false, trIndex)
              } else {
                this.$emit('changeOccupied', true, trIndex)
              }
              this.calculateCondition(tr, trIndex)
            }
          })
        }
      })
      for (const key in this.thMapData) {
        if (this.thMapData[key].toLowerCase() === 'lease end') {
          this.checkColumnValue(this.thMapData[key].toLowerCase(), key)
        }
      }
    },
    dolarAmount(index, flag) {
      this.annualTotal = 0
      this.monthlyTotal = 0
      this.annualSFTotal = 0
      this.$emit('resetAnnualIncome')
      this.$emit('resetVacancy')
      this.$emit('resetGroos')

      this.table.forEach((tr, trIndex) => {
        if (tr) {
          tr.forEach((td, tdIndex) => {
            if (parseInt(tdIndex) === parseInt(index)) {
              if (flag === 'MONTHLY RENT') {
                this.calculateCondition(tr, trIndex)
              } else if (flag === 'ANNUAL RENT') {
                td.valid = true
                this.calculateCondition(tr, trIndex)
              } else {
                td.valid = true
                this.calculateCondition(tr, trIndex)
              }
            }
          })
        }
      })
    },
    calculateCondition(tr, trIndex) {
      const isAnnualExsist = this.checkIfThExsist('ANNUAL RENT')
      const isSFExsist = this.checkIfThExsist('SF')
      const isAnnualSFExsist = this.checkIfThExsist('ANNUAL RENT/SF')
      const isMonthlyExsist = this.checkIfThExsist('MONTHLY RENT')
      if (isMonthlyExsist !== -1) {
        if (isAnnualExsist !== -1) {
          // calculate without annual column | total monthly
          this.calculateMonthlyAndAnnual(
            tr,
            trIndex,
            isMonthlyExsist,
            isAnnualExsist,
          )
        } else {
          // calculate with annual column | total monthly and annual
          this.calculateMonthlyAndAnnual(tr, trIndex, isMonthlyExsist)
        }
      }

      if (isSFExsist !== -1) {
        if (isAnnualSFExsist !== -1) {
          if (isAnnualExsist !== -1) {
            // calculate rent/sf if exist annual, sf and rent/sf column | total annual and rent/sf
            this.calculateRentSF(
              tr,
              isMonthlyExsist,
              isAnnualSFExsist,
              isSFExsist,
              isAnnualExsist,
            )
          } else {
            if (isMonthlyExsist !== -1) {
              // calculate rent/sf without annual column | total rent/sf
              this.calculateRentSF(
                tr,
                isMonthlyExsist,
                isAnnualSFExsist,
                isSFExsist,
              )
            } else {
              // calculate if rent/sf exist column | total rent/sf
              this.calculateRentSF(tr, isMonthlyExsist, isAnnualSFExsist)
            }
          }
        }
      } else {
        if (isAnnualSFExsist !== -1) {
          // calculate if rent/sf exist column | total rent/sf
          this.calculateRentSF(tr, isMonthlyExsist, isAnnualSFExsist)
        }
      }
    },
    calculateMonthlyAndAnnual(tr, trIndex, monthlyIndex, annualIndex) {
      let monthly = tr[monthlyIndex].value
      if (!this.checkIsNumber(monthly)) {
        tr[monthlyIndex].valid = false
        return false
      } else {
        tr[monthlyIndex].valid = true
      }
      monthly = parseFloat(tr[monthlyIndex].value.replace(/\$|,/g, ''))
      const sum = monthly * 12

      if (!this.occupiedArr[trIndex]) {
        this.$emit('calculateVacancy', sum)
      } else {
        this.$emit('calculateGroos', sum)
      }

      this.monthlyTotal += parseFloat(
        tr[monthlyIndex].value.replace(/\$|,/g, ''),
      )
      this.$emit('calculateRentalIncome', sum)

      if (annualIndex) {
        this.annualTotal += sum
        tr[annualIndex].value =
          '$' +
          sum
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }

      tr[monthlyIndex].value =
        '$' +
        monthly
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    calculateRentSF(tr, monthlyIndex, annualRentSFIndex, sfIndex, annualIndex) {
      let annualRentSF = tr[annualRentSFIndex].value

      if (sfIndex && tr[sfIndex].value !== '') {
        const sf = tr[sfIndex].value
        if (!this.checkIsNumber(sf)) {
          if (this.checkIsNumber(annualRentSF)) {
            annualRentSF = annualRentSF.replace(/\$|,/g, '')
            this.annualSFTotal += parseFloat(annualRentSF)
            tr[annualRentSFIndex].value =
              '$' +
              parseFloat(annualRentSF)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          return false
        }

        let sum

        if (annualIndex) {
          const annualRent = tr[annualIndex].value.replace(/\$|,/g, '')
          sum = parseInt(annualRent) / parseInt(sf)
        } else {
          if (monthlyIndex !== -1) {
            let monthly = tr[monthlyIndex].value
            monthly = parseFloat(tr[monthlyIndex].value.replace(/\$|,/g, ''))
            const annualRent = monthly.toFixed(2) * 12
            sum = annualRent / parseInt(sf)
          }
        }

        if (sum) {
          if (!isFinite(sum)) {
            tr[annualRentSFIndex].value = ''
          } else {
            this.annualSFTotal += sum
            tr[annualRentSFIndex].value =
              '$' +
              sum
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
        }
      } else {
        if (this.checkIsNumber(annualRentSF)) {
          annualRentSF = annualRentSF.replace(/\$|,/g, '')
          this.annualSFTotal += parseFloat(annualRentSF)
          tr[annualRentSFIndex].value =
            '$' +
            parseFloat(annualRentSF)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      }
    },
    checkIsNumber(val) {
      const dollar = val.replace(/\$|,/g, '')

      if (!isNaN(dollar) && dollar !== '') {
        return true
      } else {
        return false
      }
    },
    formatDollar(val) {
      const dollar = val.replace(/\$|,/g, '')
      return (
        '$' +
        parseFloat(dollar)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      )
    },
    checkIfThExsist(flag) {
      let index = -1
      for (const key in this.thMapData) {
        if (this.thMapData[key] === flag) {
          index = parseInt(key)
        }
      }
      return index
    },
    lettersAndNumber(index) {
      this.annualTotal = 0
      this.monthlyTotal = 0
      this.annualSFTotal = 0
      this.$emit('resetAnnualIncome')
      this.$emit('resetVacancy')
      this.$emit('resetGroos')
      this.table.forEach((tr, trIndex) => {
        if (tr) {
          tr.forEach((td, tdIndex) => {
            if (parseInt(tdIndex) === parseInt(index)) {
              td.valid = true
              this.calculateCondition(tr, trIndex)
            }
          })
        }
      })
    },
    removeColumn(index) {
      const newObj = JSON.parse(JSON.stringify(this.thMapData))
      newObj[index] = 'REMOVE COLUMN'
      this.thMapData = newObj
    },
    dateAndLettersStart(index) {
      let leaseStartEror = false

      this.table.forEach((tr) => {
        if (tr) {
          tr.forEach((td, tdIndex) => {
            if (parseInt(tdIndex) === parseInt(index)) {
              const date_regex =
                /^(0?[1-9]|1[0-2])\/(0?[1-9]|1[0-9]|2[0-9]|3(0|1))\/\d{4}$/
              if (!date_regex.test(td.value)) {
                if (td.value === '') {
                  td.valid = true
                } else {
                  const date_yy_regex =
                    /^(0?[1-9]|1[0-2])\/(0?[1-9]|1[0-9]|2[0-9]|3(0|1))\/\d{2}$/
                  if (!date_yy_regex.test(td.value)) {
                    td.valid = false
                    leaseStartEror = true
                  } else {
                    td.valid = true
                  }
                }
              } else {
                td.valid = true
              }
            }
          })
        }
      })
      leaseStartEror
        ? (this.dateErrorFormat = true)
        : (this.dateErrorFormat = false)
    },
    dateAndLettersEnd(index) {
      let leaseEndError = false
      this.table.forEach((tr, trIndex) => {
        if (tr) {
          tr.forEach((td, tdIndex) => {
            if (parseInt(tdIndex) === parseInt(index)) {
              const isChecked = this.occupiedArr[trIndex]

              const date_regex =
                /^(0?[1-9]|1[0-2])\/(0?[1-9]|1[0-9]|2[0-9]|3(0|1))\/\d{4}$/
              if (!date_regex.test(td.value)) {
                if (!isChecked) {
                  if (
                    td.value.toLowerCase().replace(/\s/g, '') !== 'mtm' &&
                    td.value.toLowerCase().replace(/\s/g, '') !==
                      'monthtomonth' &&
                    td.value.toLowerCase().replace(/\s/g, '') !== 'monthly'
                  ) {
                    if (td.value === '') {
                      td.valid = true
                    } else {
                      const date_yy_regex =
                        /^(0?[1-9]|1[0-2])\/(0?[1-9]|1[0-9]|2[0-9]|3(0|1))\/\d{2}$/
                      if (!date_yy_regex.test(td.value)) {
                        td.valid = false
                        leaseEndError = true
                      } else {
                        td.valid = true
                      }
                    }
                  } else {
                    td.valid = true
                  }
                  return
                }

                if (this.propType === 'MULTIFAMILY') {
                  // lease end *
                  if (
                    td.value.toLowerCase().replace(/\s/g, '') !== 'mtm' &&
                    td.value.toLowerCase().replace(/\s/g, '') !==
                      'monthtomonth' &&
                    td.value.toLowerCase().replace(/\s/g, '') !== 'monthly'
                  ) {
                    if (td.value === '') {
                      td.valid = true
                    } else {
                      const date_yy_regex =
                        /^(0?[1-9]|1[0-2])\/(0?[1-9]|1[0-9]|2[0-9]|3(0|1))\/\d{2}$/
                      if (!date_yy_regex.test(td.value)) {
                        td.valid = false
                        leaseEndError = true
                      } else {
                        td.valid = true
                      }
                    }
                  } else {
                    td.valid = true
                  }
                } else if (this.propType === 'MIXEDUSE') {
                  if (this.mixedUse.includes('MULTIFAMILY')) {
                    // lease end *
                    if (
                      td.value.toLowerCase().replace(/\s/g, '') !== 'mtm' &&
                      td.value.toLowerCase().replace(/\s/g, '') !==
                        'monthtomonth' &&
                      td.value.toLowerCase().replace(/\s/g, '') !== 'monthly'
                    ) {
                      if (td.value === '') {
                        td.valid = true
                      } else {
                        const date_yy_regex =
                          /^(0?[1-9]|1[0-2])\/(0?[1-9]|1[0-9]|2[0-9]|3(0|1))\/\d{2}$/
                        if (!date_yy_regex.test(td.value)) {
                          td.valid = false
                          leaseEndError = true
                        } else {
                          td.valid = true
                        }
                      }
                    } else {
                      td.valid = true
                    }
                  } else {
                    if (
                      td.value.toLowerCase().replace(/\s/g, '') !== 'mtm' &&
                      td.value.toLowerCase().replace(/\s/g, '') !==
                        'monthtomonth' &&
                      td.value.toLowerCase().replace(/\s/g, '') !== 'monthly'
                    ) {
                      const date_yy_regex =
                        /^(0?[1-9]|1[0-2])\/(0?[1-9]|1[0-9]|2[0-9]|3(0|1))\/\d{2}$/
                      if (!date_yy_regex.test(td.value)) {
                        td.valid = false
                        leaseEndError = true
                      } else {
                        td.valid = true
                      }
                    } else {
                      td.valid = true
                    }
                  }
                } else {
                  if (
                    td.value.toLowerCase().replace(/\s/g, '') !== 'mtm' &&
                    td.value.toLowerCase().replace(/\s/g, '') !==
                      'monthtomonth' &&
                    td.value.toLowerCase().replace(/\s/g, '') !== 'monthly'
                  ) {
                    const date_yy_regex =
                      /^(0?[1-9]|1[0-2])\/(0?[1-9]|1[0-9]|2[0-9]|3(0|1))\/\d{2}$/
                    if (!date_yy_regex.test(td.value)) {
                      td.valid = false
                      leaseEndError = true
                    } else {
                      td.valid = true
                    }
                  } else {
                    td.valid = true
                  }
                }
              } else {
                td.valid = true
              }
            }
          })
        }
      })
      leaseEndError ? (this.dateError = true) : (this.dateError = false)
    },
    async createRowToParent() {
      await this.$emit('createRow')
      for (const key in this.thMapData) {
        this.checkColumnValue(this.thMapData[key].toLowerCase(), key)
      }
      const objDiv = this.$refs.scrollWrapper
      objDiv.scrollTop = objDiv.scrollHeight
    },

    async removeRowToParent(index) {
      await this.$emit('removeRow', index)
      for (const key in this.thMapData) {
        this.checkColumnValue(this.thMapData[key].toLowerCase(), key)
      }
    },
    changeValue(e, trIndex, tdIndex, key) {
      const { value } = e.target
      this.$emit('changeInputValue', value, trIndex, tdIndex)
      if (key) this.checkColumnValue(key, tdIndex)
    },
    changeValueDate(value, trIndex, tdIndex, key) {
      this.$nextTick(() => {
        this.$emit(
          'changeInputValue',
          this.changeFormatDate(value),
          trIndex,
          tdIndex,
        )
        this.checkColumnValue(key, tdIndex)
      })
    },
    changeValueCheckBox(e, rowIndex) {
      this.annualTotal = 0
      this.monthlyTotal = 0
      this.annualSFTotal = 0
      this.$emit('resetAnnualIncome')
      this.$emit('resetVacancy')
      this.$emit('resetGroos')
      this.$emit('changeOccupied', e.target.checked, rowIndex)
      for (const key in this.thMapData) {
        if (this.thMapData[key].toLowerCase() === 'lease end')
          this.checkColumnValue(this.thMapData[key].toLowerCase(), key)
      }
      this.table.forEach((tr, trIndex) => {
        this.calculateCondition(tr, trIndex)
      })
    },
    changeFormatDate(date) {
      return (
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '/' +
        ('0' + date.getDate()).slice(-2) +
        '/' +
        date.getFullYear()
      )
    },
    validationWithLease() {
      const isMonthlyExsist = this.checkIfThExsist('MONTHLY RENT')
      const isLeastEndExsist = this.checkIfThExsist('LEASE END')
      const isLeastStartExsist = this.checkIfThExsist('LEASE START')

      if (isMonthlyExsist === -1 && isLeastEndExsist === -1) {
        this.monthlyAndLeaseRequiredFields = true
        return false
      } else {
        if (isMonthlyExsist === -1) {
          this.monthlyRequiredFields = true
          return false
        }

        if (isLeastEndExsist === -1) {
          this.leaseRequiredFields = true
          return false
        }
      }

      let flagMonthly = false
      let flagLease = false
      let flagDateStart = false

      if (this.table[0][isMonthlyExsist].value === '') {
        this.localTable[0][isMonthlyExsist].valid = false
        flagMonthly = true
      }

      if (this.table[0][isLeastEndExsist].value === '') {
        const isChecked = this.occupiedArr[0]
        if (isChecked) {
          this.localTable[0][isLeastEndExsist].valid = false
          flagLease = true
        }
      }

      this.table.forEach((tr) => {
        if (!tr[isMonthlyExsist].valid) flagMonthly = true

        if (!tr[isLeastEndExsist].valid) flagLease = true

        if (isLeastStartExsist !== -1) {
          if (!tr[isLeastStartExsist].valid) flagDateStart = true
        }
      })

      if (flagDateStart) {
        this.dateErrorFormat = true
        return false
      }

      if (flagMonthly && flagLease) {
        this.monthlyAndLeaseRequiredFields = true
      } else {
        this.monthlyRequiredFields = flagMonthly
        this.leaseRequiredFields = flagLease
      }

      if (
        this.monthlyAndLeaseRequiredFields ||
        this.monthlyRequiredFields ||
        this.leaseRequiredFields
      )
        return false

      return true
    },
    validationWithOutLease() {
      const isMonthlyExsist = this.checkIfThExsist('MONTHLY RENT')
      const isLeastEndExsist = this.checkIfThExsist('LEASE END')
      const isLeastStartExsist = this.checkIfThExsist('LEASE START')

      if (isMonthlyExsist === -1) {
        this.monthlyRequiredFields = true
        return false
      }

      let flagMonthly = false
      let flagDateEnd = false
      let flagDateStart = false

      if (this.table[0][isMonthlyExsist].value === '') {
        this.localTable[0][isMonthlyExsist].valid = false
        flagMonthly = true
      }

      this.table.forEach((tr) => {
        if (!tr[isMonthlyExsist].valid) flagMonthly = true

        if (isLeastEndExsist !== -1) {
          if (!tr[isLeastEndExsist].valid) flagDateEnd = true
        }

        if (isLeastStartExsist !== -1) {
          if (!tr[isLeastStartExsist].valid) flagDateStart = true
        }
      })

      if (flagDateEnd) {
        this.dateError = true
        return false
      }

      if (flagDateStart) {
        this.dateErrorFormat = true
        return false
      }

      if (flagMonthly) {
        this.monthlyRequiredFields = true
        return false
      }

      return true
    },
    isTableValid() {
      if (this.dateErrorFormat) return false

      if (this.dateError) return false

      if (this.propType === 'MULTIFAMILY') {
        return this.validationWithOutLease()
      } else if (this.propType === 'MIXEDUSE') {
        if (this.mixedUse.includes('MULTIFAMILY')) {
          return this.validationWithOutLease()
        } else {
          // lease end *
          return this.validationWithLease()
        }
      } else {
        // lease end *
        return this.validationWithLease()
      }
    },
    createObjectTable() {
      let table = []
      this.table.forEach((tr, trIndex) => {
        const obj = {}
        tr.forEach((td, tdIndex) => {
          const key = this.thMapData[tdIndex]
          if (
            key !== undefined &&
            key !== 'OCCUPIED' &&
            key !== 'REMOVE COLUMN'
          ) {
            obj[this.mapObject[key]] = td.value
          }
        })
        for (const key in this.mapObject) {
          if (!obj[this.mapObject[key]]) obj[this.mapObject[key]] = ''
        }

        if (obj['annual_rent'] === '') {
          const sum = parseFloat(obj['monthle_rent'].replace(/\$|,/g, '')) * 12
          obj['annual_rent'] = sum.toFixed(2).toString()
        } else {
          obj['annual_rent'] = obj['annual_rent'].replace(/\$|,/g, '')
        }

        if (obj['sf'] !== '') {
          const newSum = obj['annual_rent'] / obj['sf']
          !isFinite(newSum)
            ? (obj['annual_rent_sf'] = '')
            : (obj['annual_rent_sf'] = newSum.toFixed(2).toString())
        } else {
          if (obj['annual_rent_sf'] !== '') {
            const str = obj['annual_rent_sf'].replace(/\$|,/g, '')
            if (!isNaN(str)) {
              obj['annual_rent_sf'] = str
            }
          }
        }

        obj['monthle_rent'] = obj['monthle_rent'].replace(/\$|,/g, '')

        obj['occupied'] = this.occupiedArr[trIndex]
        table = [...table, obj]
      })
      return table
    },
    limitError(flag) {
      this.limitErrors = flag
    },
  },
})
</script>

<style lang="scss" scoped>
.scroll-table-wrapper {
  margin-bottom: 35px;
  // @include mq(1025px, min) {
  //     @include scroll-style($blue-chill, transparent, 20px, 0.4vw);
  // }

  @include mq($md) {
    position: relative;
    // overflow: visible;
    // overflow-x: scroll;
    min-height: 148px;
  }
}

.scroll-table-wrapper--alt {
  margin-bottom: 50px;
  width: 100%;

  // @include mq(1024px) {
  //     overflow-y: scroll;
  // }

  @include mq(767px) {
    // overflow-y: scroll;
    // max-height: 60vh;
  }
}

.scroll-wrapper {
  max-height: 50vh;
  overflow: scroll;

  @include mq(991px, min) {
    @include scroll-style($blue-chill, transparent, 20px, 0.4vw, 4px);
  }
  scroll-behavior: smooth;

  &.manual {
    overflow: visible;
    max-height: 100%;

    @include mq(1385px) {
      overflow: scroll;
    }
  }
}

// .scroll-table-wrapper--alt.scroll-table-remove-scroll {
//     overflow-y: visible;
// }

.scroll-table {
  width: 99.3%;
  @include mq($md) {
    min-width: 800px;
  }
}

.scroll-table-wrapper--alt {
  .scroll-table {
    @include mq(1300px) {
      min-width: 1180px;
    }
  }

  // @include mq(767px) {
  //     max-height: 50vh;
  // }
}

.scroll-table__icon-holder {
  position: relative;
  padding-top: 30px;

  @include mq($md + 1, min) {
    display: none;
  }
}

.scroll-table__icon {
  font-size: 22px;
  color: $mosque;
  position: absolute;
  right: 25px;
  top: 0;
  display: block;
  animation: swipe 1.5s ease-in-out infinite alternate;
}

.spreadsheet__col-td {
  background-color: $white;
  border: 1px solid $azure;
  position: relative;
  max-width: 117px;

  &.remove {
    pointer-events: none;
    opacity: 0.6;
  }

  &.total {
    text-align: center;
    vertical-align: middle;
    text-transform: uppercase;
    font-weight: 700;
  }
}

.spreadsheet__col-td.datepicker .spreadsheet__cell {
  padding: 8px 25px 8px 8px;
}

.checkbox.checkbox {
  vertical-align: middle;
  padding: 0 10px;
  accent-color: $blue-chill;

  input {
    opacity: 0;
    position: relative;
    z-index: 1;
    cursor: pointer;
  }

  input:checked + .spreadsheet__col-td__custom-checkbox::after {
    opacity: 1;
  }
}

.spreadsheet__head-cell {
  color: $santas-gray;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: 0.06px;
  text-transform: capitalize;
  text-align: center;
  border: 1px solid $azure;
  background-color: $white;
  white-space: nowrap;
  padding: 0;
  background-color: $scarlet;
  color: $white;

  @include mq($lap-l) {
    padding: 0;
  }

  @include mq($md) {
    font-size: 11px;
    letter-spacing: 0;
    font-weight: 400;
  }

  &.occupied {
    padding: 0 10px;
    background-color: $white;
    color: $black;
  }
}

.spreadsheet__head-cell.manual {
  color: #9da0ae;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: 0.06px;
  padding: 17px 10px;
  text-transform: capitalize;
  text-align: center;
  border: 1px solid #f0f7f7;
  background-color: #fff;
}

.spreadsheet__head-cell.manual.occupied {
  padding: 17px 5px;
}

.spreadsheet__head-cell--alt {
  padding: 0;
  color: $black;
  background-color: $white;

  .spreadsheet__head-cell-select {
    color: $black;
  }
}

.spreadsheet__head-cell-container {
  width: 100%;
  // padding: 0;
  cursor: pointer;
  position: relative;
  select {
    width: 100%;
    border: none;
    appearance: none;
    font-size: 13px;
    cursor: pointer;
    padding: 17px 20px 17px 10px;
    text-transform: capitalize;
    letter-spacing: -0.3px;
  }

  .site-nav__icon {
    position: absolute;
    right: 1px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: $blue-chill;
    pointer-events: none;
  }
}

.spreadsheet__head-cell-select {
  padding: 17px 5px;
  border: none;
  // max-width: 98px;
  font-size: 12px;
  background-color: transparent;
  width: 100%;
  color: $white;
  text-transform: capitalize;

  option {
    color: $black;
    text-transform: capitalize;
  }

  @include mq(1200px) {
    padding: 15px 5px;
  }
}

.spreadsheet__cell {
  background-color: $white;
  padding: 8px 10px;
  display: block;
  width: 100%;
  transition: $dur $ease;
  border: 1px solid $azure;
  border: 0;
  color: $shark;
  font-size: 14px;
  letter-spacing: 0.07px;
  border: 1px solid transparent;
  transition: 0.2s ease-in-out;

  &:hover,
  &:focus,
  &:active {
    border-color: $blue-chill;
  }

  &[disabled="disabled"] {
    pointer-events: none;
  }

  &.red {
    background-color: rgba($red, 0.2);
  }

  :deep() {
    input {
      border: 0;
      width: 100%;
      color: $shark;
      font-size: 14px;
      letter-spacing: 0.07px;
      transition: 0.2s ease-in-out;
    }
  }

  @include mq(1400px) {
    font-size: 12px;
  }

  @include mq(1400px) {
    padding: 8px 10px;
  }
}

.spreadsheet__cell.totals {
  padding: 8px 2px 8px 11px;
  white-space: nowrap;
  overflow: hidden;
  background-color: #fcf8f2;
  font-weight: 700;
  color: $blue-chill;
}

.spreadsheet--alt .spreadsheet__cell {
  padding: 8px 10px;
}

.rent-roll-row {
  position: relative;

  &:hover {
    .remove-row {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &.total {
    td {
      background-color: #fcf8f2;
      height: 41px;
      font-size: 14px;
    }
  }
}

.remove-row {
  width: 20px;
  height: 20px;
  background-color: $blue-chill;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 28px;
  // position: absolute;
  // top: 50%;

  // right: -8px;
  z-index: 1;
  cursor: pointer;
  transition: $dur $ease;
  margin: 10px 0 0 -11px;
  position: relative;

  @include mq(1025px, min) {
    opacity: 0;
    transform: translateX(-10px);
  }

  &::before {
    content: "";
    width: 50%;
    height: 2px;
    background-color: $white;
  }
}

.rent-roll-datepicker {
  position: absolute;
  top: 5px;
  right: 4px;
  width: 20px;

  // input styules are in helper scss file
}

.rent-roll-datepicker-icon {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  color: $blue-chill;
  pointer-events: none;
  width: 12px;
}

.spreadsheet__col-td__custom-checkbox {
  display: flex;
  align-items: center;
  justify-self: center;
  width: 12px;
  height: 12px;
  border: 1px solid $blue-chill;
  position: relative;
  position: absolute;
  top: 14px;
  left: 10px;
  cursor: pointer;
  &::after {
    content: "";
    display: inline-block;
    transform: rotate(45deg);
    height: 9px;
    width: 4px;
    border-bottom: 2px solid $blue-chill;
    border-right: 2px solid $blue-chill;
    position: absolute;
    top: 0px;
    left: 3px;
    opacity: 0;
    transition: $dur $ease;
  }
}

.table-error-wrapper {
  position: relative;
  margin-bottom: 10px;
  height: 50px;
}

.spreadsheet__footer {
  margin-top: 12px;
  margin-bottom: 7px;
}

.error-message {
  position: relative;
  display: block;
  transform: translate(0);
}
</style>
