<template>
  <div class="cd-form-inner cd-form-inner--full">
    <ValidationObserver ref="propIncomeForm">
      <div class="property-income">
        <div class="property-income__head">
          <h2 class="title-extra-small property-income__title">
            Setup and rent roll
          </h2>
        </div>
        <div class="property-income__body">
          <h3 class="title-extra-small property-income__body-title">
            Rent Roll*
          </h3>
          <div class="tables-wrapper">
            <span
              v-if="!manualOrCopyPast && hideOrShowTextarea"
              class="spreadsheet-instructons"
            >Paste your spreadsheet below. Our system will auto-sort and
              generate a rent roll table for you based on the data.<span
                class="spreadsheet-instructons-video"
                @click="triggerPopup"
              >Watch tutorial</span></span>
            <span class="spreadsheet-instructons italic">If there is no long-term lease, please write “MTM” or “month to
              month” in the “Lease End” column.<span
                v-if="manualOrCopyPast || !hideOrShowTextarea"
                class="spreadsheet-instructons-video"
                @click="triggerPopup"
              >Watch tutorial</span></span>
            <div
              v-if="!manualOrCopyPast && hideOrShowTextarea"
              class="spreadsheet spreadsheet-copy"
            >
              <div class="spreadsheet--alt">
                <textarea
                  ref="textarea"
                  class="rent-table-textarea"
                  cols="77"
                  rows="17"
                  placeholder="Tenants Name   Unit   Bedroom/Bathroom	Lease Start   Lease End   SF       Monthly Rent   Annual Rent
Calvin                  101    n/a		                        2/1/13           2/15/2023   1500   $8,900.00         $106,800.00
Marie                   102    n/a                                  2/1/13           2/15/2023   2000   $3,400.00         $40,800.00
Amelia                 103    n/a                                  2/1/13           MTM            1400   $2,300.00         $27,600.00"
                  @paste="onPaste"
                />
              </div>
            </div>

            <div
              v-else
              class="scroll-table__clear-btn--wrapper"
            >
              <button
                class="scroll-table__clear-btn"
                @click="clearTable()"
              >
                Clear table
              </button>
              <SvgIcon
                class="svg-icon scroll-table__icon-clear"
                icon-name="ico-eraser"
              />
            </div>
            <span
              v-if="numberOfRows"
              class="error-message"
            >Paste at least one row of data</span>
            <span
              v-if="limitErrors"
              class="error-message limit"
            >Limit is 1000 units</span>
            <TableRentRoll
              v-if="table.length > 0 || isExsistData"
              ref="tableRentRoll"
              :table="table"
              :data-from-database="propertyIncam.table"
              :count-length-of-rows="countLengthOfRows"
              :first-row-th="firstRowTh"
              :manual-or-copy-past="manualOrCopyPast"
              :prop-type="investment.propType"
              :mixed-use="investment.mixedUse"
              :occupied-arr="occupiedArr"
              :exsist-data="exsistData"
              @createRow="createRow"
              @removeRow="removeRow"
              @changeInputValue="changeInputValue"
              @calculateRentalIncome="calculateRentalIncome"
              @changeOccupied="changeOccupied"
              @setTableAndOccupiedWithDatabaseData="
                setTableAndOccupiedWithDatabaseData
              "
              @resetAnnualIncome="resetAnnualIncome"
              @calculateVacancy="calculateVacancy"
              @resetVacancy="resetVacancy"
              @calculateGroos="calculateGroos"
              @resetGroos="resetGroos"
            />
            <span
              v-if="rentRollRequired && !manualOrCopyPast"
              class="error-message rent-roll-required"
            >This is a required filed</span>
          </div>

          <label class="radio-btn radio-btn--inline toggle toggle-wrapper">
            <input
              v-model="manualOrCopyPast"
              type="checkbox"
              @click="changeViewTable()"
            />
            <span class="slider round" />
            <span class="radio-btn-text toggle-btn">Enter data manually instead</span>
          </label>

          <div class="input-holder input-holder--white-bg">
            <label class="input-label other-income-title">Other Income
              <span
                class="tooltip-msg tooltip-msg--small"
                data-tooltip="This refers to additional sources of income such as a laundromat or parking garage."
              ><SvgIcon
                class="tooltip-msg__icon"
                icon-name="ico-question"
              /></span></label>
            <span class="other-income-subtitle">At the next step, you will be asked to input expense
              recoveries.</span>
            <template v-for="(exp, index) in otherExpenses">
              <div
                :key="index"
                class="input-holder__other-expenses"
              >
                <div
                  class="input-holder error-message-holder other-expenses__input-wrapper"
                >
                  <label class="input-label normal">Type</label>
                  <input
                    type="text"
                    :value="exp.type"
                    placeholder="e.g. Parking Garage"
                    @change="
                      setValueExpense($event, 'type', index);
                      change = true;
                    "
                    @keyup="removeErrorIncome('type', index)"
                    @keypress="preventNumbers"
                  />
                </div>
                <div
                  class="input-holder error-message-holder other-expenses__input-wrapper"
                >
                  <label class="input-label normal">Amount</label>
                  <div class="input-holder--with-placeholder">
                    <input
                      type="text"
                      :value="exp.amount"
                      @change="change = true"
                      @keyup="
                        removeErrorIncome('amount', index);
                        numberFormatting($event, 'amount', index);
                      "
                    />
                    <span class="input-placeholder">$</span>
                  </div>
                </div>
                <span
                  :ref="'type' + index"
                  class="error-message error-expense-fields"
                />
                <span
                  :ref="'amount' + index"
                  class="error-message error-expense-fields"
                />
                <a
                  v-if="otherExpenses.length > 1"
                  href="javascript:;"
                  class="link link--sm remove-income-row"
                  title="Remove expense"
                  @click="removeExpense(index)"
                ><SvgIcon
                  class="link__icon link__icon--right link__icon--remove"
                  icon-name="ico-minus"
                /></a>
              </div>
            </template>
            <div class="input-holder input-holder--button add-another-type">
              <a
                href="javascript:;"
                class="link"
                @click="
                  createExpenses();
                  change = true;
                "
              >
                <SvgIcon
                  class="link__icon"
                  icon-name="ico-plus-circle"
                />
                Add another type
              </a>
            </div>
          </div>

          <div class="property-income__inner-wrap">
            <div class="form-split__holder">
              <div
                class="input-holder input-holder--with-placeholder form-split__input-holder"
              >
                <div class="form-split__input-holder-col">
                  <label
                    v-if="vacancy !== ''"
                    class="input-label"
                  >Gross Potential Rents*</label>
                  <label
                    v-else
                    class="input-label"
                  >Total In-Place Rental Income*</label>
                </div>
                <div class="form-split__input-holder-col">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    class="error-message-holder error-message-holder--block"
                  >
                    <input
                      ref="annualIncome"
                      v-model="annual_income"
                      v-currency="{
                        locale: 'en',
                        currency: null,
                        valueAsInteger: true,
                        distractionFree: false,
                        precision: 0,
                        autoDecimalMode: true,
                        valueRange: { min: 0 },
                        allowNegative: false,
                      }"
                      type="text"
                      class="readonly"
                      @change="change = true"
                    />
                    <span class="error-message">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>

              <div
                v-if="vacancy !== ''"
                class="input-holder input-holder--with-placeholder form-split__input-holder"
              >
                <div class="form-split__input-holder-col">
                  <label class="input-label">Vacancy</label>
                </div>
                <div class="form-split__input-holder-col">
                  <input
                    ref="annualIncome"
                    v-model="vacancy"
                    v-currency="{
                      locale: 'en',
                      currency: null,
                      valueAsInteger: true,
                      distractionFree: false,
                      precision: 0,
                      autoDecimalMode: true,
                      valueRange: { min: 0 },
                      allowNegative: false,
                    }"
                    type="text"
                    class="readonly"
                    @change="change = true"
                  />
                </div>
              </div>

              <div
                v-if="vacancy !== ''"
                class="input-holder input-holder--with-placeholder form-split__input-holder"
              >
                <div class="form-split__input-holder-col">
                  <label class="input-label">Total In-Place Rental Income</label>
                </div>
                <div class="form-split__input-holder-col">
                  <input
                    ref="annualIncome"
                    v-model="occupiedGroos"
                    v-currency="{
                      locale: 'en',
                      currency: null,
                      valueAsInteger: true,
                      distractionFree: false,
                      precision: 0,
                      autoDecimalMode: true,
                      valueRange: { min: 0 },
                      allowNegative: false,
                    }"
                    type="text"
                    class="readonly"
                    @change="change = true"
                  />
                </div>
              </div>

              <div class="input-holder--white-bg">
                <div
                  class="input-holder input-holder--with-placeholder form-split__input-holder potentional-income"
                >
                  <div class="form-split__input-holder-col no-padding">
                    <label class="input-label input-label--alt">Upside Potential</label>
                    <label class="input-label">
                      If this property is underperforming, what would the
                      potential annual income be?</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <input
                      ref="annualIncomePot"
                      v-model="potential_income"
                      v-currency="{
                        locale: 'en',
                        currency: null,
                        valueAsInteger: true,
                        distractionFree: false,
                        precision: 0,
                        autoDecimalMode: true,
                        valueRange: { min: 0 },
                        allowNegative: false,
                      }"
                      type="text"
                      @change="
                        checkCurentAnnual($event);
                        change = true;
                      "
                      @keyup="annualValidationFlag = false"
                    />
                    <span class="input-placeholder">$</span>
                    <span
                      v-if="annualValidationFlag"
                      class="error-message left"
                    >The entered value must be higher than the Total In-Place
                      Rental Income</span>
                  </div>
                </div>
                <!-- Reason for Increase -->
                <template>
                  <div
                    class="input-holder input-holder--white-bg potentional-income"
                  >
                    <span class="input-label">Reason for projected increase to annual income</span>
                    <label
                      class="potential-income__custom-checkbox-wrapper occupancy"
                    >
                      <input
                        v-model="increaseProjection"
                        type="checkbox"
                        name="potentional-income"
                        value="Increased Occupancy"
                        @change="change = true"
                        @click="deleteDataIfUnchecked($event)"
                      />
                      <span><span class="potential-income__custom-checkbox" />Increased Occupancy</span>
                    </label>
                    <label
                      class="potential-income__custom-checkbox-wrapper leases"
                    >
                      <input
                        v-model="increaseProjection"
                        type="checkbox"
                        name="potentional-income"
                        value="Better Leases"
                        @change="change = true"
                        @click="deleteDataIfUnchecked($event)"
                      />
                      <span><span class="potential-income__custom-checkbox" />Better Leases</span>
                    </label>
                    <label
                      class="potential-income__custom-checkbox-wrapper improvments"
                    >
                      <input
                        v-model="increaseProjection"
                        type="checkbox"
                        name="potentional-income"
                        value="CapEx/TI/LC"
                        @change="change = true"
                        @click="deleteDataIfUnchecked($event)"
                      />
                      <span><span class="potential-income__custom-checkbox" />CapEx/TI/LC</span>
                    </label>
                  </div>

                  <div
                    v-if="increaseProjection.includes('Increased Occupancy')"
                    class="input-holder input-holder--potential-income"
                  >
                    <span class="potential-income__title">Increased Occupancy</span>
                    <label class="input-label">Share more details on how your client plans to increase
                      occupancy</label>
                    <textarea
                      v-model="increasedNotes"
                      rows="5"
                      placeholder="E.g. Hiring a superintendent"
                      @change="change = true"
                    />
                  </div>
                  <div
                    v-if="increaseProjection.includes('Better Leases')"
                    class="input-holder input-holder--potential-income"
                  >
                    <span class="potential-income__title">Better Leases</span>
                    <label class="input-label">Share more details on how your client will secure better
                      leases</label>
                    <textarea
                      v-model="betterNotes"
                      rows="5"
                      placeholder="E.g. Currently leases at $20/sq ft. Average leases in this area are $50/sq ft."
                      @change="change = true"
                    />
                  </div>

                  <template v-if="increaseProjection.includes('CapEx/TI/LC')">
                    <div class="input-holder input-holder--potential-income">
                      <span class="potential-income__title">CapEx/TI/LC</span>
                      <div class="form-split__input-holder input-holder">
                        <label class="input-label form-split__input-holder-col">CapEx Budget</label>
                        <div
                          class="input-holder--with-placeholder input-holder form-split__input-holder-col"
                        >
                          <input
                            v-model="capExBudget"
                            v-currency="{
                              locale: 'en',
                              currency: null,
                              valueAsInteger: true,
                              distractionFree: false,
                              precision: 0,
                              autoDecimalMode: true,
                              valueRange: { min: 0 },
                              allowNegative: false,
                            }"
                            @change="change = true"
                          />
                          <span class="input-placeholder">$</span>
                        </div>
                      </div>

                      <div class="form-split__input-holder input-holder">
                        <label class="input-label form-split__input-holder-col">TI Budget</label>
                        <div
                          class="input-holder--with-placeholder input-holder form-split__input-holder-col"
                        >
                          <input
                            v-model="tiBudget"
                            v-currency="{
                              locale: 'en',
                              currency: null,
                              valueAsInteger: true,
                              distractionFree: false,
                              precision: 0,
                              autoDecimalMode: true,
                              valueRange: { min: 0 },
                              allowNegative: false,
                            }"
                            @change="change = true"
                          />
                          <span class="input-placeholder">$</span>
                        </div>
                      </div>

                      <div class="form-split__input-holder input-holder">
                        <label class="input-label form-split__input-holder-col">LC Budget</label>
                        <div
                          class="input-holder--with-placeholder input-holder form-split__input-holder-col"
                        >
                          <input
                            v-model="lcBudget"
                            v-currency="{
                              locale: 'en',
                              currency: null,
                              valueAsInteger: true,
                              distractionFree: false,
                              precision: 0,
                              autoDecimalMode: true,
                              valueRange: { min: 0 },
                              allowNegative: false,
                            }"
                            @change="change = true"
                          />
                          <span class="input-placeholder">$</span>
                        </div>
                      </div>
                      <div class="input-holder form-split__input-holder">
                        <label class="input-label form-split__input-holder-col">Time frame (months)</label>
                        <div
                          class="input-holder--with-placeholder input-holder form-split__input-holder-col"
                        >
                          <input
                            v-model="timeFrame"
                            type="text"
                            @change="change = true"
                          />
                        </div>
                      </div>
                      <div class="input-holder">
                        <label class="input-label">Share more details about your client’s plans for
                          renovation</label>
                        <textarea
                          v-model="plannedImprovements"
                          rows="5"
                          placeholder="E.g. New lobby, elevator"
                          @change="change = true"
                        />
                      </div>
                    </div>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-if="loader && !rowCount" class="rent-roll-loader">
                <img src="@/assets/images/loader.gif" alt="loader">
            </div> -->

      <div
        v-if="popupActive"
        class="explainer-video-popup"
        @click="clickOutside($event)"
      >
        <div class="explainer-video-popup-content">
          <div
            ref="closeVideo"
            class="explainer-video-popup-close"
            @click="clickOutside($event)"
          />
          <div class="explainer-video-popup-content-video">
            <video
              ref="video"
              controls
              class="explainer-video-popup-content-video-player"
              :src="explainerVideo"
              autoplay
              controlsList="nodownload"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Datepicker from "vuejs-datepicker"
import SvgIcon from "@/components/base/SvgIcon/SvgIcon.vue"
import { ValidationProvider, ValidationObserver, extend } from "vee-validate"
/* eslint-disable */
import { required } from "vee-validate/dist/rules";

import { formatNumber, errorScroll } from "@/config/util";
import { CurrencyDirective } from "vue-currency-input";
import { stringToNumber } from "@/config/util";
import Papa from "papaparse";
import TableRentRoll from "@/components/parts/PartTableRentRoll.vue";

extend("required", {
  ...required,
  message: "This field is required",
});

interface Data {
  title: string;
  change: boolean;
  annual_income: string;
  potential_income: string;
  tableValidationFlag: boolean;
  annualValidationFlag: boolean;
  increaseProjection: [];
  increasedNotes: boolean;
  betterNotes: string;
  timeFrame: string;
  plannedImprovements: string;
  otherExpenses;
  popupActive: boolean;
  explainerVideo: string;
  includesmultifamily: boolean;
  vacancy: string;
  occupiedGroos: string;

  capExBudget: string;
  tiBudget: string;
  lcBudget: string;

  table;
  countLengthOfRows;
  firstRowTh;
  manualOrCopyPast: boolean;
  hideOrShowTextarea: boolean;
  occupiedArr;
  isExsistData;
  exsistData;
  limitErrors: boolean;
  rentRollRequired: boolean;
  numberOfRows: boolean;
}

export default Vue.extend({
  props: {
    dealID: {
      type: Number,
      default: 0,
    },
    nextAction: {
      type: String,
      default: "",
    },
    prevAction: {
      type: String,
      default: "",
    },
    skipAction: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.setFields();
    this.$store.dispatch("ui", { overlay: false });
  },
  computed: {
    propertyIncam() {
      return JSON.parse(JSON.stringify(this.$store.getters.getPropertyIncam));
    },
    id() {
      return this.$store.getters.getId;
    },
    investment() {
      return this.$store.getters.getInvestment;
    },
  },
  directives: {
    currency: CurrencyDirective,
  },

  watch: {
    timeFrame: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => (this.timeFrame = result));
      }
    },
  },

  methods: {
    deleteDataIfUnchecked(event) {
      if (
        event.target.checked &&
        event.target.defaultValue === "Increased Occupancy"
      ) {
        this.increasedNotes = "";
      } else if (
        event.target.checked &&
        event.target.defaultValue === "Better Leases"
      ) {
        this.betterNotes = "";
      } else if (
        event.target.checked &&
        event.target.defaultValue === "CapEx/TI/LC"
      ) {
        this.capExBudget = "";
        this.tiBudget = "";
        this.lcBudget = "";
        this.timeFrame = "";
        this.plannedImprovements = "";
      }
    },
    onPaste() {
      this.rentRollRequired = false;
      setTimeout(() => {
        let firstRow = false;
        let count = 0;
        this.limitErrors = false;
        Papa.parse(this.$refs.textarea.value, {
          step: (row, parser) => {
            count++;
            if (count === 1000) {
              this.limitErrors = true;
              parser.abort();
            }

            let isFirstRow = false;
            if (!firstRow) {
              row.data.forEach((element, index) => {
                if (this.checkTitles(element, index)) isFirstRow = true;
              });
              firstRow = true;
            }

            if (!isFirstRow) {
              let wrapArrRow = [];
              row.data.forEach((element, index) => {
                wrapArrRow = [
                  ...wrapArrRow,
                  {
                    valid: true,
                    value: element,
                  },
                ];
              });

              this.table = [...this.table, wrapArrRow];
              this.occupiedArr = [...this.occupiedArr, true];

              if (this.countLengthOfRows < row.data.length)
                this.countLengthOfRows = row.data.length;
            }
          },
          complete: () => {
            if (this.table.length > 0) {
              if (
                this.table[this.table.length - 1].length <
                this.countLengthOfRows
              ) {
                this.table.splice(this.table.length - 1, 1);
              }
              this.$refs.textarea.value = "";
              this.hideOrShowTextarea = false;
              this.numberOfRows = false;
            } else {
              if (this.table[this.table.length] < this.countLengthOfRows) {
                this.table.splice(this.table.length - 1, 1);
              }
              this.numberOfRows = true;
            }
          },
        });
      }, 100);
    },

    checkTitles(value, index) {
      let isFirstRow = false;
      value = value.replace(/\s/g, "");
      value = value.toLowerCase();

      const letters = [
        {
          label: "OCCUPIED",
          letters: ["occupied"],
        },
        {
          label: "UNIT TYPE",
          letters: ["unittype"],
        },
        {
          label: "TENANTS NAME",
          letters: ["tenantsname", "tenantname", "tenants", "tenant"],
        },
        {
          label: "UNIT",
          letters: ["unit"],
        },
        {
          label: "BEDROOM/ BATHROOM",
          letters: [
            "bedroom/bathroom",
            "bedroombathroom",
            "bedroom",
            "bathroom",
          ],
        },
        {
          label: "LEASE START",
          letters: ["leasestart"],
        },
        {
          label: "LEASE END",
          letters: ["leaseend"],
        },
        {
          label: "SF",
          letters: ["sf"],
        },
        {
          label: "MONTHLY RENT",
          letters: ["monthlyrent"],
        },
        {
          label: "ANNUAL RENT",
          letters: ["annualrent"],
        },
        {
          label: "ANNUAL RENT/SF",
          letters: ["annualrent/sf", "rent/sf", "annualrentsf"],
        },
      ];
      letters.forEach((obj) => {
        if (obj.letters.includes(value)) {
          isFirstRow = true;
          if (this.investment?.propType === "MULTIFAMILY") {
            if (obj.label !== "UNIT TYPE") this.firstRowTh[index] = obj.label;
          } else if (this.investment?.propType === "MIXEDUSE") {
            if (this.investment?.mixedUse.includes("MULTIFAMILY")) {
              this.firstRowTh[index] = obj.label;
            } else {
              if (obj.label !== "BEDROOM/ BATHROOM")
                this.firstRowTh[index] = obj.label;
            }
          } else {
            if (obj.label !== "BEDROOM/ BATHROOM" && obj.label !== "UNIT TYPE")
              this.firstRowTh[index] = obj.label;
          }
        }
      });

      return isFirstRow;
    },

    createRow() {
      let arr = [];
      for (let i = 0; i < this.table[0].length; i++) {
        arr = [...arr, { valid: true, value: "" }];
      }
      this.table = [...this.table, arr];
      this.occupiedArr = [...this.occupiedArr, true];
    },

    createFirstRowForManualTable() {
      let arr = [];
      let count = 0;

      if (this.investment.propType === "MULTIFAMILY") {
        count = 9;
      } else if (this.investment.propType === "MIXEDUSE") {
        if (this.investment.mixedUse.includes("MULTIFAMILY")) {
          count = 10;
        } else {
          count = 9;
        }
      } else {
        count = 8;
      }

      for (let i = 0; i < count; i++) {
        arr = [...arr, { valid: true, value: "" }];
      }
      this.table = [...this.table, arr];
      this.occupiedArr = [true];
    },

    removeRow(index) {
      if (this.table.length > 1) {
        this.table.splice(index, 1);
        this.occupiedArr.splice(index, 1);
      }
    },

    changeInputValue(value, trIndex, tdIndex) {
      this.table[trIndex][tdIndex].value = value;
    },

    createObject() {
      const table = this.$refs.tableRentRoll.createObjectTable();
      return {
        table: table,
        annual_income: this.annual_income.replace(/\$|,/g, ""),
        potential_income: this.potential_income,
        increaseProjection: this.increaseProjection.join(", "),
        increasedNotes: this.increaseProjection.includes("Increased Occupancy")
          ? this.increasedNotes
          : "",
        betterNotes: this.increaseProjection.includes("Better Leases")
          ? this.betterNotes
          : "",
        capExBudget:
          this.capExBudget && this.increaseProjection.includes("CapEx/TI/LC")
            ? stringToNumber(this.capExBudget).toString()
            : "",
        tiBudget:
          this.tiBudget && this.increaseProjection.includes("CapEx/TI/LC")
            ? stringToNumber(this.tiBudget).toString()
            : "",
        lcBudget:
          this.lcBudget && this.increaseProjection.includes("CapEx/TI/LC")
            ? stringToNumber(this.lcBudget).toString()
            : "",
        timeFrame: this.increaseProjection.includes("CapEx/TI/LC")
          ? this.timeFrame
          : "",
        plannedImprovements: this.increaseProjection.includes("CapEx/TI/LC")
          ? this.plannedImprovements
          : "",
        enterCopy: this.enterCopy,
        step: "dealPropertyIncome",
        other_income: this.otherExpenses,
        vacancy: this.vacancy.replace(/\$|,|-/g, ""),
        occupiedGroos:
          this.vacancy !== "" ? this.occupiedGroos.replace(/\$|,/g, "") : "",
      };
    },
    clearTable() {
      this.table = [];
      this.manualOrCopyPast = false;
      this.hideOrShowTextarea = true;
      this.limitErrors = false;
      this.countLengthOfRows = 0;
      this.occupiedArr = [];
      this.annual_income = "";
      this.occupiedGroos = "";
      this.vacancy = "";
      this.firstRowTh = {};
      this.isExsistData = false;
      this.exsistData = [];
    },
    calculateRentalIncome(value) {
      let incomeValue;
      if (this.annual_income !== "") {
        incomeValue = this.annual_income.replace(/\$|,/g, "");
      } else {
        incomeValue = 0;
      }
      const sum = parseFloat(incomeValue) + value;
      this.annual_income =
        "$" +
        sum
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    calculateGroos(value) {
      let occupiedValue;
      if (this.occupiedGroos !== "") {
        occupiedValue = this.occupiedGroos.replace(/\$|,/g, "");
      } else {
        occupiedValue = 0;
      }
      const sum = parseFloat(occupiedValue) + value;
      this.occupiedGroos =
        "$" +
        sum
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    resetGroos() {
      this.occupiedGroos = "";
    },
    calculateVacancy(value) {
      let vacancyValue;
      if (this.vacancy !== "") {
        vacancyValue = this.vacancy.replace(/\$|,|-/g, "");
      } else {
        vacancyValue = 0;
      }
      const sum = parseFloat(vacancyValue) + value;
      this.vacancy =
        "-$" +
        sum
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      let annual_income = this.annual_income.replace(/\$|,/g, "");
      let annualSum = parseFloat(annual_income);
      if (isNaN(annualSum)) {
        if (value - sum === 0) {
          this.occupiedGroos = "$0";
        }
      } else {
        if (annualSum + value - sum === 0) {
          this.occupiedGroos = "$0";
        }
      }
    },
    resetVacancy() {
      this.vacancy = "";
    },
    resetAnnualIncome() {
      this.annual_income = "";
    },
    changeOccupied(value, index) {
      this.occupiedArr[index] = value;
    },
    checkIfTableExsist(data) {
      if (data.length === 1) {
        if (data[0].monthle_rent === "") return;
      }

      this.setTableFromBackend(data);
    },
    setTableFromBackend(data) {
      this.isExsistData = true;
      this.manualOrCopyPast = true;
      this.countLengthOfRows = data.length;
      this.exsistData = data;
    },
    async changeViewTable() {
      this.annual_income = "";
      if (this.manualOrCopyPast) this.hideOrShowTextarea = true;
      this.rentRollRequired = false;

      if (!this.manualOrCopyPast) {
        setTimeout(() => {
          this.createFirstRowForManualTable();
        }, 100);
      }
      this.clearTable();
    },
    setTableAndOccupiedWithDatabaseData(table, occupiedArr) {
      this.table = table;
      this.occupiedArr = occupiedArr;
      this.countLengthOfRows = table[0].length;
    },

    triggerPopup() {
      this.popupActive = true;
    },

    clickOutside(event) {
      // If target is not video, then close popup
      if (this.$refs.video && !this.$refs.video.contains(event.target)) {
        this.popupActive = false;
      }
    },

    removeExpense(index) {
      this.otherExpenses.splice(index, 1);
      this.change = true;
    },
    removeErrorIncome(flag, index) {
      this.$refs[flag + index][0].style.display = "none";
      this.$refs[flag + index][0].innerHTML = "";
    },

    numberFormatting(event, flag, index) {
      event.target.value = event.target.value
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.setValueExpense(event, flag, index);
    },

    setValueExpense(e, flag, index) {
      const { value } = e.target;
      this.otherExpenses[index][flag] = value;
    },
    createExpenses() {
      if (
        this.otherExpenses[this.otherExpenses.length - 1].type === "" &&
        this.otherExpenses[this.otherExpenses.length - 1].amount === ""
      ) {
        return false;
      }
      this.otherExpenses.push({
        type: "",
        amount: "",
      });
    },
    preventNumbers(e) {
      e = e || window.event;
      var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
      var charStr = String.fromCharCode(charCode);
      if (/\d/.test(charStr)) {
        e.preventDefault();
      }
    },
    expensValidation() {
      let flag = true;
      let arrForRemove = [];

      this.otherExpenses.forEach((element, index) => {
        if (element.type === "" && element.amount !== "") {
          this.$refs["type" + index][0].style.display = "block";
          this.$refs["type" + index][0].innerHTML =
            "Please complete information for this type of income";
          flag = false;
        } else if (element.amount === "" && element.type !== "") {
          this.$refs["amount" + index][0].style.display = "block";
          this.$refs["amount" + index][0].innerHTML =
            "Please complete information for this type of income";
          flag = false;
        } else if (element.amount === "" && element.type === "") {
          arrForRemove.push(index);
        }
      });
      if (this.otherExpenses.length > 1) {
        arrForRemove.forEach((index) => {
          this.otherExpenses.splice(index, 1);
        });
      }
      return flag;
    },

    async next() {
      if (!this.$refs.tableRentRoll) {
        this.rentRollRequired = true;
        errorScroll();
        return;
      }
      const tableFlag = this.$refs.tableRentRoll.isTableValid();
      const success = await this.$refs.propIncomeForm.validate();
      const expFlag = this.expensValidation();
      const obj = this.createObject();

      if (!expFlag) {
        errorScroll();
        return false;
      }

      if (!tableFlag) {
        errorScroll();
        return;
      }

      if (this.annualValidationFlag) {
        errorScroll();
        return;
      }

      if (!success) {
        errorScroll();
        return;
      }

      const val = this.$refs.annualIncomePot.value;
      let annual;
      if (this.vacancy === "") {
        annual = parseFloat(this.annual_income.replace(/\$|,/g, ""));
      } else {
        annual = parseFloat(this.occupiedGroos.replace(/\$|,/g, ""));
      }

      errorScroll();
      if (annual > parseInt(val.replace(/,/g, ""))) {
        this.annualValidationFlag = true;
        return;
      } else {
        await this.$store.dispatch("setBrokerDealPropertyIncome", obj);
        return this.nextAction;
      }
    },
    setFields() {
      if (this.propertyIncam) {
        this.checkIfTableExsist(this.propertyIncam.table);
        this.otherExpenses = this.propertyIncam.other_income;
        this.annual_income = this.propertyIncam.annual_income;
        this.potential_income = this.propertyIncam.potential_income;
        this.propertyIncam.increaseProjection === ""
          ? (this.increaseProjection = [])
          : (this.increaseProjection =
              this.propertyIncam.increaseProjection.split(", "));
        // this.increaseProjection = this.propertyIncam.increaseProjection.split(', ');
        this.increasedNotes = this.propertyIncam.increasedNotes;
        this.betterNotes = this.propertyIncam.betterNotes;
        this.capExBudget = formatNumber(this.propertyIncam.capExBudget);
        this.tiBudget = formatNumber(this.propertyIncam.tiBudget);
        this.lcBudget = formatNumber(this.propertyIncam.lcBudget);
        this.timeFrame = this.propertyIncam.timeFrame;
        this.plannedImprovements = this.propertyIncam.plannedImprovements;
        this.enterCopy = this.propertyIncam.enterCopy;
        this.vacancy = this.propertyIncam.vacancy;
        this.occupiedGroos = this.propertyIncam.occupiedGroos;
        if (this.enterCopy === "YES" && this.propertyIncam.table.length > 0) {
          this.editFlag = false;
        }
      }
    },

    skip() {
      return this.skipAction;
    },
    prev() {
      return this.prevAction;
    },
    /** on change form field set tu true */
    checkCurentAnnual(e) {
      const val = e.target.value;

      let annual;
      if (this.vacancy === "") {
        annual = parseFloat(this.annual_income.replace(/\$|,/g, ""));
      } else {
        annual = parseFloat(this.occupiedGroos.replace(/\$|,/g, ""));
      }
      if (annual) {
        annual > parseInt(val.replace(/,/g, ""))
          ? (this.annualValidationFlag = true)
          : (this.annualValidationFlag = false);
      }
    },
  },

  components: {
    Datepicker,
    SvgIcon,
    ValidationProvider,
    ValidationObserver,
    TableRentRoll,
  },

  data(): Data {
    return {
      annualValidationFlag: false,
      title: 'This is title of "BlockCreateDealPropertyIncome"!',
      change: false,
      annual_income: "",
      potential_income: "",
      tableValidationFlag: true,
      increaseProjection: [],
      increasedNotes: false,
      betterNotes: "",
      capExBudget: "",
      tiBudget: "",
      lcBudget: "",
      timeFrame: "",
      plannedImprovements: "",
      otherExpenses: [],
      includesmultifamily: false,
      popupActive: false,
      explainerVideo:
        "https://financelobby-production.s3.amazonaws.com/assets/Explainer%20video_%20FL_14.mp4",
      vacancy: "",
      occupiedGroos: "",

      table: [],
      countLengthOfRows: 0,
      firstRowTh: {},
      manualOrCopyPast: false,
      hideOrShowTextarea: true,
      occupiedArr: [],
      isExsistData: false,
      exsistData: [],
      limitErrors: false,
      rentRollRequired: false,
      numberOfRows: false,
    };
  },
});
</script>

<style lang="scss" scoped>
.red {
  background: #ffdcd6 !important;
  // color: $red !important;
}

.property-income__head {
  margin-bottom: 11px;
}

.property-income__body {
  background-color: $azure;
  padding: 31px 31px 44px;
  max-width: 1223px;

  @include mq($lap-l) {
    padding: 31px 15px;
  }

  @include mq($md) {
    padding: 25px 15px;
  }
}

.property-income__body-title {
  margin-bottom: 5px;
}

.property-income__body-text {
  margin-bottom: 25px;
  font-size: 15px;

  @include mq($md) {
    margin-bottom: 10px;
  }
}

.property-income__inner-wrap {
  // max-width: 630px;
  margin-top: 40px;
}

.scroll-table-wrapper {
  margin-bottom: 0;
  // @include mq(1025px, min) {
  //     @include scroll-style($blue-chill, transparent, 20px, 0.4vw);
  // }

  @include mq($md) {
    position: relative;
    // overflow: visible;
    // overflow-x: scroll;
    min-height: 104px;
  }
}

// .scroll-table-wrapper--alt {
//     overflow-y: scroll;
//     // overflow-x: hidden;
//     max-height: 671px;
//     margin-bottom: 5px;
//     width: 101%;

//     @include mq(1024px) {
//         overflow-y: scroll;
//     }
// }

.scroll-table-wrapper--alt.scroll-table-remove-scroll {
  // overflow-y: visible;
  // overflow-x: scroll;
}

.scroll-table {
  width: 99.3%;
  @include mq($md) {
    min-width: 800px;
  }
}

.scroll-table-wrapper--alt {
  .scroll-table {
    @include mq(1024px) {
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
  // z-index: 1;
}

.spreadsheet__head-cell {
  color: $santas-gray;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: 0.06px;
  padding: 17px 10px;
  text-transform: capitalize;
  text-align: center;
  border: 1px solid $azure;
  background-color: $white;

  @include mq($lap-l) {
    padding: 12px 8px;
  }

  @include mq($md) {
    font-size: 11px;
    letter-spacing: 0;
    font-weight: 400;
  }
}

.spreadsheet__head-cell--alt {
  padding: 0;
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

.spreadsheet__head-cell--remove .spreadsheet__head-cell-select {
  color: $red;
  // background-color: $aqua-haze;

  option {
    color: $black;
    cursor: pointer;
  }

  option.disabled {
    background-color: $white;
    color: rgba($black, 0.5);
    font-weight: 600;
  }
}

.spreadsheet__cell {
  background-color: $white;
  padding: 8px 20px;
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

  @include mq($md) {
    padding: 8px 22px;
  }
}

.spreadsheet--alt .spreadsheet__cell {
  padding: 8px 10px;
}

.spreadsheet-copy {
  position: relative;
  margin-bottom: 35px;
}

.spreadsheet__footer {
  margin: 20px 0 35px;

  @include mq($md) {
    margin: 5px 0 30px;
  }
}

.spreadsheet__footer.disable {
  opacity: 0.5;
  pointer-events: none;
}

// Datepicker
:deep() {
  .vdp-datepicker__calendar {
    font-size: 14px;
    width: 291px;
    padding-bottom: 10px;

    header {
      line-height: 36px;
    }

    .cell {
      height: 25px;
      line-height: 25px;
    }

    @include mq($md) {
      font-size: 11px;
      // width: 200px;
      top: -20px;

      header {
        line-height: 20px;
      }

      .cell {
        height: 16px;
        line-height: 16px;
      }

      .day__month_btn,
      .month__year_btn {
        &::after {
          font-size: 9px;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 40%);
        }
      }
    }
  }
}

.input-placeholder-table {
  position: absolute;
  top: 50%;
  transform: translateY(-54%);
  left: 10px;
  color: $santas-gray;
}

.input-holder--white {
  background-color: $white;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px 10px 40px;

  &::after {
    right: -10px;
  }

  .radio-btn--inline {
    margin-bottom: 10px;
  }
}

.spreadsheet--alt {
  overflow-x: scroll;
  overflow-y: hidden;
  margin-bottom: 0;
  @include scroll-style($blue-chill, $athens-gray, 20px, 0.5vw);

  textarea {
    width: 100%;
    height: 220px;
    resize: none;
    border-radius: 10px;
    padding: 20px;
    min-width: 716px;
    margin-bottom: 5px;
  }

  .text-area-empty {
    border-color: red;
  }

  .scroll-table-wrapper {
    @include mq(767px) {
      overflow: hidden;
      // overflow-x: scroll;
      padding-bottom: 0;

      .scroll-table {
        min-width: 1150px;
      }
    }
  }
}

.spreadsheet-error-msg {
  display: block;
  margin-left: auto;
  text-align: right;
  color: $red;
  font-size: 14px;
  height: 22px;
}

.spreadsheet__head-cell--red {
  .spreadsheet__head-cell-container {
    background-color: $scarlet;
  }

  .spreadsheet__head-cell-select {
    background-color: transparent;
    color: $white;

    option {
      color: $black;
      cursor: pointer;
    }

    option.disabled {
      background-color: $white;
      color: rgba($black, 0.5);
      font-weight: 600;
    }
  }
}

.spreadsheet__head-cell--red {
  .site-nav__icon {
    color: $white;
  }
}

.scroll-table__icon-clear {
  color: $blue-chill;
  transition: $dur $ease;
}

.scroll-table__clear-btn--wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 3px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.scroll-table__clear-btn {
  border: none;
  background-color: transparent;
  color: $blue-chill;
  font-weight: bold;
  margin-bottom: 0;
  transition: $dur $ease;

  &:hover {
    color: $yellow-orange;
    & + .scroll-table__icon-clear {
      color: $yellow-orange;
    }
  }
}

.table-error-wrapper {
  height: 70px;
}

.table-error-message {
  font-size: 13px;
  color: $scarlet;
  line-height: 1.3;
  font-weight: 400;
  letter-spacing: 0.7px;
  display: block;
}

.table-error-message--align-right {
  text-align: right;
  margin-right: 13px;
  font-weight: 600;

  @include mq(1024px) {
    margin-right: 0;
  }
}

.spreadsheet-continue-btn {
  color: $blue-chill;
  font-weight: bold;
  margin-top: 0;
  display: inline-block;
  transition: $dur $ease;
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0;
  text-decoration: underline;
  &:hover {
    color: $yellow-orange;
  }
}

.rent-roll-row {
  position: relative;

  &:hover {
    .remove-row {
      opacity: 1;
      transform: translateX(0);
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

.rent-table-textarea {
  &::placeholder {
    font-size: 14px;
    color: $shark;
    opacity: 0.4;
    font-weight: 600;
  }
}

.spreadsheet-instructons {
  font-size: 14px;
  color: $grey-dark;
  margin-bottom: 15px;
  margin-top: 13px;
  display: inline-block;

  &.italic {
    font-style: italic;
  }
}

.spreadsheet-instructons-video {
  color: $blue-chill;
  margin-left: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: $dur $ease;
  white-space: nowrap;
  text-decoration: underline;
  &:hover {
    color: $yellow-orange;
  }
}

.spreadsheet-instructons-video--alt {
  margin-left: 0;
  font-size: 15px;
}

.blur input {
  background-color: $aqua-haze;
  color: rgba($black, 0.5);
  opacity: 0.5;
  pointer-events: none;
}

.scroll-table-wrapper--scroll {
  // overflow-y: scroll;
  overflow-x: hidden;
  max-height: 75vh;

  // @include mq(767px) {
  //     overflow-x: scroll;
  // }
}

@include browser-support(safari) {
  .vdp-datepicker {
    padding: 8px 10px;
    width: 103px;

    input {
      text-align: center;
    }
  }

  .rent-table-textarea {
    &::placeholder {
      font-size: 14px;
      color: $shark;
      color: transparent;
      font-family: $font-second;
    }
  }
}

.rent-roll-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($black, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000;

  img {
    width: 100px;
  }
}

.input-holder.input-holder--smaller {
  max-width: 600px;
}
.spreadsheet--relative {
  position: relative;
}

.error-message.left {
  left: 0;
  bottom: 15px;
}

.error-message--alt {
  bottom: 47px;
}

.input-holder--white-bg {
  background: $white;
  padding: 20px;
  max-width: 100%;
}

.input-holder__other-expenses {
  position: relative;
  display: flex;
  max-width: 590px;
  justify-content: space-between;
  margin: 0 -5px;

  @include mq(767px) {
    flex-direction: column;
    max-width: 100%;
    margin: 0;
  }
}

.other-expenses__input-wrapper {
  max-width: 300px;
  width: 100%;
  margin: 0 5px 30px;

  @include mq(767px) {
    max-width: 100%;
    margin: 0 0 20px;
  }
}

.remove-income-row {
  position: absolute;
  right: -13px;
  top: 50%;
  transform: translateY(-50%);
  @include mq(767px) {
    right: -17px;
    top: 56%;
  }
}

.add-another-type {
  margin-bottom: 0;
}

.error-expense-fields {
  left: 5px;
  bottom: 25px;

  @include mq(767px) {
    left: 0px;
    bottom: 17px;
  }
}

.explainer-video-popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba($white, 0.7);
}

.explainer-video-popup-content-video-player {
  max-width: 980px;
  width: 100%;
}

.explainer-video-popup-content {
  position: relative;
  padding: 0 10px;
}

.explainer-video-popup-close {
  position: absolute;
  top: -2px;
  right: -33px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: $dur $ease;

  @include mq(1200px) {
    top: -27px;
    right: 8px;
  }

  &:hover {
    &::before,
    &::after {
      transition: $dur $ease;
      transform: translate(-50%, -50%) rotate(0);
    }
  }

  &::before,
  &::after {
    content: "";
    height: 2px;
    width: 21px;
    background-color: $santas-gray;
    @include center;
    transition: $dur $ease;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}

.toggle {
  position: relative;
  height: 30px;
  padding: 0 0 0 30px;
  display: inline-flex;
  justify-content: center;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 3px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.radio-btn--inline input:checked + .slider {
  background-color: $blue-chill;
}

.radio-btn--inline input:focus + .slider {
  box-shadow: 0 0 1px $blue-chill;
}

.radio-btn--inline input:checked + .slider:before {
  transform: translateX(20px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
  width: 47px;
  height: 24px;
}

.slider.round:before {
  border-radius: 50%;
}

.toggle-wrapper {
  margin-bottom: 50px;
}

.tables-wrapper {
  min-height: 320px;
  position: relative;
}

.error-message.limit {
  text-align: right;
  bottom: 89px;
  right: 25px;
  left: auto;

  @include mq(1300px) {
    right: 0;
  }
}

.potentional-income {
  margin: 0;
  padding: 20px 0;
}

.input-label--alt {
  margin-bottom: 20px;
}

.input-holder--potential-income {
  max-width: 100%;
  background: #f0f7f7;
  padding: 20px 15px;

  textarea {
    max-width: 630px;
    @include mq(767px) {
      max-width: 100%;
    }
  }

  .form-split__input-holder {
    margin: 0 -15px;

    @include mq(767px) {
      margin: 0 0 15px;
    }
  }

  .input-label {
    @include mq(767px) {
      margin-bottom: 10px;
    }
  }
}

.potential-income__title {
  color: $blue-chill;
  font-weight: 700;
  display: block;
  margin-bottom: 20px;
}

.potential-income__custom-checkbox-wrapper {
  position: relative;
  padding-left: 25px;
  margin-right: 20px;
  input {
    display: none;
  }

  & > span {
    display: inline-block;
  }
  .potential-income__custom-checkbox {
    display: flex;
    align-items: center;
    justify-self: center;
    width: 12px;
    height: 12px;
    border: 1px solid $blue-chill;
    position: relative;
    position: absolute;
    top: 6px;
    left: 2px;
    color: $black;
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

  input:checked + span > .potential-income__custom-checkbox::after {
    opacity: 1;
  }
}

.no-padding {
  padding: 0;
}
.rent-roll-required {
  bottom: 45px;

  @include mq(1345px) {
    bottom: 25px;
  }

  @include mq(1189px) {
    bottom: 14px;
  }

  @include mq(514px) {
    bottom: -10px;
  }
}

.tooltip-msg::before {
  @include mq(390px) {
    left: -73px;
  }
}

.other-income-title {
  margin-bottom: 5px;
}

.other-income-subtitle {
  margin-bottom: 15px;
  display: block;
  font-style: italic;
  line-height: 1.2;
  font-size: 14px;
}

.input-label.other-income-title {
  .tooltip-msg::before {
    @include mq(514px) {
      left: -136px;
      top: 1px;
    }

    @include mq(390px) {
      left: -136px;
      top: 1px;
    }
  }
}
</style>
