<template>
  <div class="cd-form-inner">
    <ValidationObserver ref="propExpensesForm">
      <h4 class="title-extra-small cf-form__sub-title">Taxes</h4>
      <div class="form-highlight">
        <div class="input-holder input-holder--smaller">
          <label class="input-label">Real Estate taxes*</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="error-message-holder error-message-holder--block input-holder--with-placeholder"
          >
            <input
              v-model="taxNumber"
              v-currency="{
                locale: 'en',
                currency: null,
                valueAsInteger: true,
                distractionFree: false,
                precision: 0,
                autoDecimalMode: true,
                valueRange: { min: 0 },
                allowNegative: false
              }"
              @change="change = true"
            >
            <span class="input-placeholder">$</span>
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <!-- Taxes -->
        <div class="form-split">
          <h4 class="title-extra-small form-split__title">Is there tax abatement?*</h4>
          <div class="form-split__holder error-message-holder">
            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="tax"
                    type="radio"
                    name="tax-abatement"
                    value="true"
                    @change="change = true, abatementValidation = false"
                  >
                  <span class="radio-btn-text">Yes</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="tax"
                    type="radio"
                    name="tax-abatement"
                    value="false"
                    @change="change = true, abatementValidation = false, expDate = '', phaseStructure = ''"
                  >
                  <span class="radio-btn-text">No</span>
                </label>
              </div>
            </div>
            <span
              v-if="abatementValidation"
              class="error-message"
            >This field is required</span>
          </div>
          <div
            v-show="tax === 'true'"
            class="form-split__inner-box"
          >
            <h4 class="title-extra-small form-split__title">Which applies?</h4>
            <div class="form-split__holder error-message-holder error-message-holder--block">
              <div class="form-split__input-holder--align-top">
                <div class="input-holder__foot input-holder input-holder--smaller">  
                  <label class="input-label">Expiration date</label>
                  <PartInputDate
                    ref="partDate"
                    :val-from-parent="expDate"
                    @changeVal="changeVal"
                  />
                </div> 
                <div class="condition-txt condition-txt--btw-inputs">OR</div>
                <div class="input-holder__foot input-holder input-holder--small-space input-holder--smaller">  
                  <label class="input-label">Phase out structure</label>
                  <textarea
                    v-model="phaseStructure"
                    rows="5"
                    placeholder="Write..."
                    @change="change = true"
                    @keyup="abatementFieldsValidation = false"
                  />
                </div>
              </div>
              <span
                v-if="abatementFieldsValidation"
                class="error-message"
              >At least one field must be filled</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Operational Expenses -->
      <h4 class="title-extra-small cf-form__sub-title">Operational Expenses</h4>
      <div class="form-highlight">
        <div class="form-split">
          <!-- Mutual fields for all PROPERTY TYPES -->
          <template>
            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="input-label">Insurance*</label>
              </div>
              <div class="form-split__input-holder-col">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="error-message-holder error-message-holder--block input-holder--with-placeholder"
                >
                  <input
                    v-model="insurance"
                    v-currency="{
                      locale: 'en',
                      currency: null,
                      valueAsInteger: true,
                      distractionFree: false,
                      precision: 0,
                      autoDecimalMode: true,
                      valueRange: { min: 0 },
                      allowNegative: false
                    }"
                    @change="change = true"
                  >
                  <span class="input-placeholder">$</span>
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>

            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="input-label">Repairs & Maintenance*</label>
              </div>
              <div class="form-split__input-holder-col">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="error-message-holder error-message-holder--block input-holder--with-placeholder"
                >
                  <input
                    v-model="repairs"
                    v-currency="{
                      locale: 'en',
                      currency: null,
                      valueAsInteger: true,
                      distractionFree: false,
                      precision: 0,
                      autoDecimalMode: true,
                      valueRange: { min: 0 },
                      allowNegative: false
                    }"
                    @change="change = true"
                  >
                  <span class="input-placeholder">$</span>
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
          </template><!-- End of Mutual fields for all PROPERTY TYPES -->
          <template v-if="propertyType === 'OWNER_OCCUPIED' || ifExisting === 'OWNER_OCUPIED'">
            <!-- Owner occupied Electricity -->
            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="input-label">Electricity</label>
              </div>
              <div class="form-split__input-holder-col input-holder--with-placeholder">
                <input
                  v-model="electricityAmount"
                  v-currency="{
                    locale: 'en',
                    currency: null,
                    valueAsInteger: true,
                    distractionFree: false,
                    precision: 0,
                    autoDecimalMode: true,
                    valueRange: { min: 0 },
                    allowNegative: false
                  }"
                  @change="change = true"
                >
                <span class="input-placeholder">$</span>
              </div>
            </div>
            <!-- Owner occupied Gas -->
            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="input-label">Gas</label>
              </div>
              <div class="form-split__input-holder-col input-holder--with-placeholder">
                <input
                  v-model="gasAmount"
                  v-currency="{
                    locale: 'en',
                    currency: null,
                    valueAsInteger: true,
                    distractionFree: false,
                    precision: 0,
                    autoDecimalMode: true,
                    valueRange: { min: 0 },
                    allowNegative: false
                  }"
                  @change="change = true"
                >
                <span class="input-placeholder">$</span>
              </div>
            </div>
            <!-- Owner occupied Water -->
            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="input-label">Water</label>
              </div>
              <div class="form-split__input-holder-col input-holder--with-placeholder">
                <input
                  v-model="ooWaterAmount"
                  v-currency="{
                    locale: 'en',
                    currency: null,
                    valueAsInteger: true,
                    distractionFree: false,
                    precision: 0,
                    autoDecimalMode: true,
                    valueRange: { min: 0 },
                    allowNegative: false
                  }"
                  @change="change = true"
                >
                <span class="input-placeholder">$</span>
              </div>
            </div>
            <!-- Owner occupied Sewer -->
            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="input-label">Sewer</label>
              </div>
              <div class="form-split__input-holder-col input-holder--with-placeholder">
                <input
                  v-model="ooSewerAmount"
                  v-currency="{
                    locale: 'en',
                    currency: null,
                    valueAsInteger: true,
                    distractionFree: false,
                    precision: 0,
                    autoDecimalMode: true,
                    valueRange: { min: 0 },
                    allowNegative: false
                  }"
                  @change="change = true"
                >
                <span class="input-placeholder">$</span>
              </div>
            </div>
            <!-- Legal and Profesional -->
            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="input-label">Legal and professional</label>
              </div>
              <div class="form-split__input-holder-col">
                <div class="error-message-holder error-message-holder--block input-holder--with-placeholder">
                  <input
                    v-model="legal"
                    v-currency="{
                      locale: 'en',
                      currency: null,
                      valueAsInteger: true,
                      distractionFree: false,
                      precision: 0,
                      autoDecimalMode: true,
                      valueRange: { min: 0 },
                      allowNegative: false
                    }"
                    @change="change = true"
                  >
                  <span class="input-placeholder">$</span>
                </div>
              </div>
            </div>
          </template>
          <!-- If PROPERTY TYPE investment & construction are selected those field will show up -->
          <template v-if="loan_type === 'CONSTRUCTION' || propertyType === 'INVESTMENT' || ifExisting === 'INVESTMENT'">
            <h4 class="title-extra-small form-split__title">Payroll and Reserves</h4>
            <div class="input-holder form-split__input-holder form-split__input-holder--align-top">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="payroll"
                    type="radio"
                    name="payroll-reserves"
                    value="true"
                    @change="change = true;payrollAmount = ''"
                  >
                  <span class="radio-btn-text">n/a</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="payroll"
                    type="radio"
                    name="payroll-reserves"
                    value="false"
                    @change="change = true;"
                    @click="focusOnInput('payrollAmountInput')"
                  >
                  <span class="radio-btn-text">Enter amount</span>
                </label>
                <div
                  v-if="payroll !== '' && payroll !== 'true'"
                  class="input-holder__foot"
                >  
                  <label class="screen-reader-text">Phase out structure</label>
                  <div class="input-holder--with-placeholder">
                    <input
                      ref="payrollAmountInput"
                      v-model="payrollAmount"
                      v-currency="{
                        locale: 'en',
                        currency: null,
                        valueAsInteger: true,
                        distractionFree: false,
                        precision: 0,
                        autoDecimalMode: true,
                        valueRange: { min: 0 },
                        allowNegative: false
                      }"
                      :disabled="payroll === 'true' || payroll === ''"
                      @change="change = true"
                    >
                    <span class="input-placeholder">$</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Electricity -->
            <h4 class="title-extra-small form-split__title">Electricity</h4>
            <div class="input-holder form-split__input-holder form-split__input-holder--align-top">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="electricity"
                    type="radio"
                    name="electricity"
                    value="true"
                    @change="change = true; electricityAmount = ''; "
                  >
                  <span class="radio-btn-text">Paid by tenant</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="electricity"
                    type="radio"
                    name="electricity"
                    value="false"
                    @change="change = true; electricitySeparatelyMetered = ''"
                    @click="focusOnInput('electricityAmountInput')"
                  >
                  <span class="radio-btn-text">Enter amount</span>
                </label>
                <div
                  v-if="electricity !== '' && electricity !== 'true'"
                  class="input-holder__foot"
                >  
                  <label class="screen-reader-text">Phase out structure</label>
                  <div class="input-holder--with-placeholder">
                    <input
                      ref="electricityAmountInput"
                      v-model="electricityAmount"
                      v-currency="{
                        locale: 'en',
                        currency: null,
                        valueAsInteger: true,
                        distractionFree: false,
                        precision: 0,
                        autoDecimalMode: true,
                        valueRange: { min: 0 },
                        allowNegative: false
                      }"
                      :disabled="electricity === 'true' || electricity === '' "
                      @change="change = true"
                    >
                    <span class="input-placeholder">$</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Electricity separately metered -->
            <div
              v-if="electricity === 'true'"
              class="form-fields--group"
            >
              <h4 class="title-extra-small form-split__title">Electricity separately metered?</h4>
              <div class="input-holder form-split__input-holder form-split__input-holder--align-top">
                <div class="form-split__input-holder-col">
                  <label class="radio-btn radio-btn--inline">
                    <input
                      v-model="electricitySeparatelyMetered"
                      type="radio"
                      name="electricitySeparatelyMetered"
                      value="true"
                      @change="change = true"
                    >
                    <span class="radio-btn-text">Yes</span>
                  </label>
                </div>
                <div class="form-split__input-holder-col">
                  <label class="radio-btn radio-btn--inline">
                    <input
                      v-model="electricitySeparatelyMetered"
                      type="radio"
                      name="electricitySeparatelyMetered"
                      value="false"
                      @change="change = true"
                    >
                    <span class="radio-btn-text">No</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Gas -->
            <h4 class="title-extra-small form-split__title">Gas</h4>
            <div class="input-holder form-split__input-holder form-split__input-holder--align-top">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="gas"
                    type="radio"
                    name="gas"
                    value="true"
                    @change="change = true; gasAmount = ''"
                  >
                  <span class="radio-btn-text">Paid by tenant</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="gas"
                    type="radio"
                    name="gas"
                    value="false"
                    @change="change = true; gasSeparatelyMetered = ''"
                    @click="focusOnInput('gasAmountInput')"
                  >
                  <span class="radio-btn-text">Enter amount</span>
                </label>
                <div
                  v-if="gas !== '' && gas !== 'true'"
                  class="input-holder__foot"
                >  
                  <label class="screen-reader-text">Gas Amount</label>
                  <div class="input-holder--with-placeholder">
                    <input
                      ref="gasAmountInput"
                      v-model="gasAmount"
                      v-currency="{
                        locale: 'en',
                        currency: null,
                        valueAsInteger: true,
                        distractionFree: false,
                        precision: 0,
                        autoDecimalMode: true,
                        valueRange: { min: 0 },
                        allowNegative: false
                      }"
                      :disabled="gas === 'true' || gas === ''"
                      @change="change = true"
                    >
                    <span class="input-placeholder">$</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Gas separately metered -->
            <div
              v-if="gas === 'true'"
              class="form-fields--group"
            >
              <h4 class="title-extra-small form-split__title">Gas separately metered?</h4>
              <div class="input-holder form-split__input-holder form-split__input-holder--align-top">
                <div class="form-split__input-holder-col">
                  <label class="radio-btn radio-btn--inline">
                    <input
                      v-model="gasSeparatelyMetered"
                      type="radio"
                      name="gasSeparatelyMetered"
                      value="true"
                      @change="change = true"
                    >
                    <span class="radio-btn-text">Yes</span>
                  </label>
                </div>
                <div class="form-split__input-holder-col">
                  <label class="radio-btn radio-btn--inline">
                    <input
                      v-model="gasSeparatelyMetered"
                      type="radio"
                      name="gasSeparatelyMetered"
                      value="false"
                      @change="change = true"
                    >
                    <span class="radio-btn-text">No</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Water and Sewer -->
            <h4 class="title-extra-small form-split__title">Water and Sewer</h4>
            <div class="input-holder form-split__input-holder form-split__input-holder--align-top">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="water"
                    type="radio"
                    name="water-sewer"
                    value="true"
                    @change="change = true; waterAmount = ''"
                  >
                  <span class="radio-btn-text">Paid by tenant</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="water"
                    type="radio"
                    name="water-sewer"
                    value="false"
                    @change="change = true; waterSeparatelyMetered = ''"
                    @click="focusOnInput('waterAmountInput')"
                  >
                  <span class="radio-btn-text">Enter amount</span>
                </label>
                <div
                  v-if="water !== '' && water !== 'true'"
                  class="input-holder__foot"
                >  
                  <label class="screen-reader-text">Water and Sewer Amount</label>
                  <div class="input-holder--with-placeholder">
                    <input
                      ref="waterAmountInput"
                      v-model="waterAmount"
                      v-currency="{
                        locale: 'en',
                        currency: null,
                        valueAsInteger: true,
                        distractionFree: false,
                        precision: 0,
                        autoDecimalMode: true,
                        valueRange: { min: 0 },
                        allowNegative: false
                      }"
                      :disabled="water === 'true' || water === ''"
                      @change="change = true"
                    >
                    <span class="input-placeholder">$</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="water === 'true'"
              class="form-fields--group"
            >
              <h4 class="title-extra-small form-split__title">Water and Sewer separately metered?</h4>
              <div class="input-holder form-split__input-holder form-split__input-holder--align-top">
                <div class="form-split__input-holder-col">
                  <label class="radio-btn radio-btn--inline">
                    <input
                      v-model="waterSeparatelyMetered"
                      type="radio"
                      name="waterSeparatelyMetered"
                      value="true"
                      @change="change = true"
                    >
                    <span class="radio-btn-text">Yes</span>
                  </label>
                </div>
                <div class="form-split__input-holder-col">
                  <label class="radio-btn radio-btn--inline">
                    <input
                      v-model="waterSeparatelyMetered"
                      type="radio"
                      name="waterSeparatelyMetered"
                      value="false"
                      @change="change = true"
                    >
                    <span class="radio-btn-text">No</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Common Area Utilities -->
            <h4 class="title-extra-small form-split__title">Common Area Utilities</h4>
            <div class="input-holder form-split__input-holder form-split__input-holder--align-top">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="commonArea"
                    type="radio"
                    name="common-area-utilities"
                    value="true"
                    @change="change = true; commonAreaAmount = ''"
                  >
                  <span class="radio-btn-text">Paid by tenant</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="commonArea"
                    type="radio"
                    name="common-area-utilities"
                    value="false"
                    @change="change = true"
                    @click="focusOnInput('commonAmountInput')"
                  >
                  <span class="radio-btn-text">Enter amount</span>
                </label>
                <div
                  v-if="commonArea !== '' && commonArea !== 'true'"
                  class="input-holder__foot"
                >  
                  <label class="screen-reader-text">Common Area Utilities Amount</label>
                  <div class="input-holder--with-placeholder">
                    <input
                      ref="commonAmountInput"
                      v-model="commonAreaAmount"
                      v-currency="{
                        locale: 'en',
                        currency: null,
                        valueAsInteger: true,
                        distractionFree: false,
                        precision: 0,
                        autoDecimalMode: true,
                        valueRange: { min: 0 },
                        allowNegative: false
                      }"
                      :disabled="commonArea === 'true' || commonArea === ''"
                      @change="change = true"
                    >
                    <span class="input-placeholder">$</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Legal and Profesional -->
            <div class="input-holder form-split__input-holder">
              <div class="form-split__input-holder-col">
                <label class="input-label">Legal and professional</label>
              </div>
              <div class="form-split__input-holder-col">
                <div class="error-message-holder error-message-holder--block input-holder--with-placeholder">
                  <input
                    v-model="legal"
                    v-currency="{
                      locale: 'en',
                      currency: null,
                      valueAsInteger: true,
                      distractionFree: false,
                      precision: 0,
                      autoDecimalMode: true,
                      valueRange: { min: 0 },
                      allowNegative: false
                    }"
                    @change="change = true"
                  >
                  <span class="input-placeholder">$</span>
                </div>
              </div>
            </div>

            <!-- Management -->
            <h4 class="title-extra-small form-split__title">Management*</h4>
            <div class="input-holder form-split__input-holder form-split__input-holder--align-top">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="management"
                    type="radio"
                    name="management"
                    value="true"
                    @change="change = true; managementAmount = ''; managementCompanyName = ''"
                  >
                  <span class="radio-btn-text">Self managed</span>
                </label>
                <div
                  v-show="managementError"
                  class="error-messages"
                >
                  This field is required
                </div>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="management"
                    type="radio"
                    name="management"
                    value="false"
                    @change="change = true"
                    @click="focusOnInput('managementAmountInput')"
                  >
                  <span class="radio-btn-text">Management cost</span>
                </label>
                <div
                  v-if="management !== '' && management !== 'true'"
                  class="input-holder__foot"
                >  
                  <label class="screen-reader-text">Management cost amount</label>
                  <div class="input-holder--with-placeholder">
                    <input
                      ref="managementAmountInput"
                      v-model="managementAmount"
                      v-currency="{
                        locale: 'en',
                        currency: null,
                        valueAsInteger: true,
                        distractionFree: false,
                        precision: 0,
                        autoDecimalMode: true,
                        valueRange: { min: 0 },
                        allowNegative: false
                      }"
                      :disabled="management === 'true' || management === ''"
                      @change="change = true"
                    >
                    <span class="input-placeholder">$</span>
                    <div
                      v-show="managementErrorAmount"
                      class="error-messages"
                    >
                      This field is required
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="management === 'false'"
              class="input-holder form-split__input-holder form-fields--group"
            >
              <div class="form-split__input-holder-col">
                <label class="input-label">Management company name</label>
              </div>
              <label class="form-split__input-holder-col">
                <input
                  v-model="managementCompanyName"
                  type="text"
                  value="false"
                  @change="change = true"
                >
              </label>
            </div>
          </template><!-- End of PROPERTY TYPE Investment & Construction is selected -->

          <!-- If PROPERTY TYPE Construction is selected -->
          <template v-if="loan_type === 'CONSTRUCTION'">
            <!-- Elevator Maintenance -->
            <h4 class="title-extra-small form-split__title">Elevator Maintenance</h4>
            <div class="input-holder form-split__input-holder form-split__input-holder--align-top">
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="elevatorMaintenance"
                    type="radio"
                    name="elevatorMaintenance"
                    value="true"
                    @change="change = true; elevatorMaintenanceAmount = ''"
                  >
                  <span class="radio-btn-text">Paid by tenant</span>
                </label>
              </div>
              <div class="form-split__input-holder-col">
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="elevatorMaintenance"
                    type="radio"
                    name="elevatorMaintenance"
                    value="false"
                    @change="change = true"
                    @click="focusOnInput('elevatorAmountInput')"
                  >
                  <span class="radio-btn-text">Enter amount</span>
                </label>
                <div
                  v-if="elevatorMaintenance !== '' && elevatorMaintenance !== 'true'"
                  class="input-holder__foot"
                >  
                  <label class="screen-reader-text">Elevator Maintenance Amount</label>
                  <div class="input-holder--with-placeholder">
                    <input
                      ref="elevatorAmountInput"
                      v-model="elevatorMaintenanceAmount"
                      v-currency="{
                        locale: 'en',
                        currency: null,
                        valueAsInteger: true,
                        distractionFree: false,
                        precision: 0,
                        autoDecimalMode: true,
                        valueRange: { min: 0 },
                        allowNegative: false
                      }"
                      :disabled="elevatorMaintenance === 'true' || elevatorMaintenance === ''"
                      @change="change = true"
                    >
                    <span class="input-placeholder">$</span>
                  </div>
                </div>
              </div>
            </div>
          </template><!-- End of PROPERTY TYPE Construction is selected -->

          <template>
            <div class="input-holder input-holder--white-bg">
              <label class="input-label">Any other expenses</label>
              <!-- <textarea rows="5" placeholder="E.g. landscaping" v-model="otherExpenses" @change="change = true"></textarea> -->

              <template v-for="(exp, index) in otherExpenses">
                <div
                  :key="index"
                  class="input-holder__other-expenses"
                >
                  <div class="input-holder error-message-holder">
                    <label class="input-label normal">Type of expense</label>
                    <input
                      type="text"
                      placeholder="e.g. Landscaping"
                      :value="exp.type"
                      @change="setValueExpense($event, 'type', index); change = true"
                      @keyup="removeError('type', index)"
                      @keypress="preventNumbers"
                    >
                  </div>
                  <div class="input-holder error-message-holder">
                    <label class="input-label normal">Amount of expense</label>
                    <div class="input-holder--with-placeholder">
                      <input
                        type="text"
                        :value="exp.amount"
                        @change="change = true"
                        @keyup="removeError('amount', index); numberFormatting($event, 'amount', index)"
                      >
                      <span class="input-placeholder">$</span>
                    </div>
                  </div>
                  <span
                    :ref="'type'+index"
                    class="error-message error-expense-fields"
                  />
                  <span
                    :ref="'amount'+index"
                    class="error-message error-expense-fields"
                  />
                  <a
                    v-if="otherExpenses.length > 1"
                    href="javascript:;"
                    class="link link--sm"
                    @click="removeExpense(index)"
                  ><SvgIcon
                    class="link__icon link__icon--right link__icon--remove"
                    icon-name="ico-minus"
                  /></a>
                </div>
              </template>
              <div class="input-holder input-holder--button">
                <a
                  href="javascript:;"
                  class="link"
                  @click="createExpenses(); change = true"
                >
                  <SvgIcon
                    class="link__icon"
                    icon-name="ico-plus-circle"
                  />
                  Add another expense
                </a>
              </div>
            </div>
          </template>

          <!-- If PROPERTY TYPE Investment is selected  -->
          <template v-if="propertyType === 'INVESTMENT' || ifExisting === 'INVESTMENT'">
            <!-- Expenses Tripple Net -->
            <div class="input-holder">
              <span class="input-label">Are any expenses recovered? *</span>
              <label class="radio-btn radio-btn--inline">
                <input
                  v-model="triple"
                  type="radio"
                  name="exp-triple-net"
                  value="true"
                  @change="change = true; someFlag = false;"
                >
                <span class="radio-btn-text">Yes</span>
              </label>
              <label class="radio-btn radio-btn--inline">
                <input
                  v-model="triple"
                  type="radio"
                  name="exp-triple-net"
                  value="false"
                  @change="change = true; someFlag = false; reimbursement = ''"
                >
                <span class="radio-btn-text">No</span>
              </label>
              <div
                v-show="someFlag"
                class="error-messages"
              >
                This field is required
              </div>
            </div>

            <div
              v-if="triple === 'true'"
              class="input-holder input-holder--smaller"
            >
              <label class="input-label">How much of the expenses are reimbursed?</label>

              <div class="input-holder--with-placeholder">
                <input
                  v-model="reimbursement"
                  v-currency="{
                    locale: 'en',
                    currency: null,
                    valueAsInteger: true,
                    distractionFree: false,
                    precision: 0,
                    autoDecimalMode: true,
                    valueRange: { min: 0 },
                    allowNegative: false
                  }"
                  @change="change = true"
                >
                <span class="input-placeholder">$</span>
              </div>
            </div>
          </template><!-- End of PROPERTY TYPE Investment is selected  -->

          <!-- Mutual fields for all PROPERTY TYPES -->
          <template>
            <div class="input-holder input-holder--smaller">
              <label class="input-label">Why would this be a good deal for lenders to pursue? *</label>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="error-message-holder error-message-holder--block input-holder--with-placeholder"
              >
                <textarea
                  v-model="additionalNotes"
                  rows="5"
                  placeholder="(1-2 sentences)"
                  @change="change = true"
                />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </template><!-- End of Mutual fields for all PROPERTY TYPES -->
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import PartInputDate from '@/components/parts/PartDateInputCustom.vue'
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
    import { allowOnlyNumbersGlobal, errorScroll, formatNumber, stringToNumber } from '@/config/util'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import { CurrencyDirective } from 'vue-currency-input'
    /* eslint-disable */
    import { required } from 'vee-validate/dist/rules';

    extend('required', {
        ...required,
        message: 'This field is required'
    });

    interface Data {
        title: string
        change: boolean
        someFlag: boolean
        ifExisting: string
        managementError: boolean
        managementErrorAmount: boolean
        taxNumber: string
        tax: string
        expDate: string
        phaseStructure: string
        payroll: string
        repairs: string
        insurance: string
        payrollAmount: string
        electricity: string
        electricityAmount: string
        electricitySeparatelyMetered: string
        gas: string
        gasAmount: string
        gasSeparatelyMetered: string
        commonArea: string
        water: string
        waterAmount: string
        waterSeparatelyMetered: string
        elevatorMaintenance: string
        elevatorMaintenanceAmount: string
        management: string
        managementAmount: string
        managementCompanyName: string
        commonAreaAmount: string
        legal: string
        triple: string
        reimbursement: string
        otherExpenses
        additionalNotes: string
        abatementValidation: boolean
        abatementFieldsValidation: boolean
        ooWaterAmount: string
        ooSewerAmount: string
    }

    export default Vue.extend({
        props: {
            dealID: {
                type: Number,
                default: 0
            },
            nextAction: {
                type: String,
                default: ''
            },
            prevAction: {
                type: String,
                default: ''
            },
            skipAction: {
                type: String,
                default: ''
            }
        },

        data(): Data {
            return {
                title: 'This is title of "BlockCreateDealPropertyExpenses"!',
                change: false,
                someFlag: false,
                ifExisting: '',
                managementError: false,
                managementErrorAmount: false,
                taxNumber: '',
                tax: '',
                expDate: '',
                phaseStructure: '',
                payroll: '',
                insurance: '',
                repairs: '',
                payrollAmount: '',
                electricity: '',
                electricityAmount: '',
                electricitySeparatelyMetered: '',
                gas: '',
                gasAmount: '',
                gasSeparatelyMetered: '',
                commonArea: '',
                commonAreaAmount: '',
                water: '',
                waterAmount: '',
                waterSeparatelyMetered: '',
                elevatorMaintenance: '',
                elevatorMaintenanceAmount: '',
                management: '',
                managementAmount: '',
                managementCompanyName: '',
                legal: '',
                triple: '',
                reimbursement: '',
                otherExpenses: [],
                additionalNotes: '',
                abatementFieldsValidation: false,
                abatementValidation: false,
                ooWaterAmount: '',
                ooSewerAmount: ''
            };
        },
        components: {
            SvgIcon,
            PartInputDate,
            ValidationProvider,
            ValidationObserver
        },
        mounted() {
            this.setFields();
            this.$store.dispatch('ui', {overlay: false})
        },
        computed: {
            expenses() {
                return this.$store.getters.getExpenses;
            },
            id() {
                return this.$store.getters.getId;
            },
            propertyType() {
                return this.$store.getters.getPropertyType;
            },
            existing() {
                return this.$store.getters.getExisting;
            },
            loan_type() {
                return this.$store.getters.getLoanType;
            }
        },
        directives: {
            currency: CurrencyDirective
        },
        methods: {
            removeExpense(index) {
                this.otherExpenses.splice(index, 1);
                this.change = true;
            },
            removeError(flag, index){
                this.$refs[flag+index][0].style.display = 'none';
                this.$refs[flag+index][0].innerHTML = '';
            },

            numberFormatting(event, flag, index) {
                event.target.value = event.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.setValueExpense(event, flag, index);
            },

            setValueExpense(e, flag, index) {
                const { value } = e.target;
                this.otherExpenses[index][flag] = value;
            },
            createExpenses() {
                if(this.otherExpenses[this.otherExpenses.length - 1].type === '' && this.otherExpenses[this.otherExpenses.length - 1].amount === '') {
                    return false;
                }
                this.otherExpenses.push(
                    {
                        type: '',
                        amount: ''
                    }
                )
            },
            preventNumbers(e) {
                e = e || window.event;
                var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
                var charStr = String.fromCharCode(charCode);
                if (/\d/.test(charStr)) {
                    e.preventDefault();
                } 
            },
            expensValidation() {
                let flag = true;
                let arrForRemove = [];
                
                this.otherExpenses.forEach((element, index) => {
                    if(element.type === '' && element.amount !== '') {
                        this.$refs['type'+index][0].style.display = 'block';
                        this.$refs['type'+index][0].innerHTML = 'Please complete information for this expense';
                        flag = false;
                    } else if(element.amount === '' && element.type !== '') {
                        this.$refs['amount'+index][0].style.display = 'block';
                        this.$refs['amount'+index][0].innerHTML = 'Please complete information for this expense';
                        flag = false;
                    } else if(element.amount === '' && element.type === '') {
                        arrForRemove.push(index);
                    }
                });
                if(this.otherExpenses.length > 1) {
                    arrForRemove.forEach(index => {
                        this.otherExpenses.splice(index, 1);
                    });
                }
                return flag;
            },
            focusOnInput(ref) {
                const me = this;
                Vue.nextTick(function() {
                    setTimeout(() => {
                        me.$refs[ref].focus();
                    }, 10);
                });
            },
            async next() {
                const success = await this.$refs.propExpensesForm.validate();
                const expFlag = this.expensValidation();
                errorScroll();

                if(!expFlag) {
                    return false;
                }
                let validationFlag = false;

                if(this.propertyType === 'INVESTMENT' && this.triple === '') {
                    this.someFlag = true;
                    return;
                }

                if (this.tax === 'true' && (!this.phaseStructure && !this.expDate)) {
                    validationFlag = true;
                    this.abatementFieldsValidation = true; 
                } else {
                    this.abatementFieldsValidation = false;
                }

                if(this.loan_type === 'CONSTRUCTION' || this.propertyType === 'INVESTMENT') {
                    if(this.management !== '') {
                        if(this.management === 'false' && this.managementAmount === '') {
                            this.managementErrorAmount = true;
                            validationFlag = true;
                        } else {
                            this.managementErrorAmount = false;
                        }
                        this.managementError = false;
                    } else {
                        this.managementError = true;
                        validationFlag = true;
                    }
                }

                if (!this.tax) {
                    this.abatementValidation = true;
                    validationFlag = true;
                }

                if (!success || validationFlag) {
                    return;
                }
                
                if(this.$refs.partDate) {
                    if(this.$refs.partDate.isError()) {
                        errorScroll();
                        return;
                    }
                }
                
                if (this.change) {
                    const obj = this.createObject();
                    await this.$store.dispatch('setBrokerDealPropertyExpenses', obj);

                    return this.nextAction;
                } else {
                    if(this.expenses) {
                        return this.nextAction;
                    }
                }
            },
            skip() {
                return this.skipAction
            },
            prev() {
                return this.prevAction
            },
            createObject(){
                return {
                    taxNumber: this.taxNumber ? stringToNumber(this.taxNumber).toString() : '',
                    tax: this.tax,
                    expDate: this.expDate,
                    phaseStructure: this.phaseStructure,
                    payroll: this.payroll,
                    insurance: this.insurance ? stringToNumber(this.insurance).toString() : '',
                    repairs: this.repairs ? stringToNumber(this.repairs).toString() : '',
                    payrollAmount: this.payrollAmount ? stringToNumber(this.payrollAmount).toString() : '',
                    electricity: this.electricity,
                    electricityAmount: this.electricityAmount ? stringToNumber(this.electricityAmount).toString() : '',
                    electricitySeparatelyMetered: this.electricitySeparatelyMetered,
                    gas: this.gas,
                    gasAmount: this.gasAmount ? stringToNumber(this.gasAmount).toString() : '',
                    commonArea: this.commonArea,
                    commonAreaAmount: this.commonAreaAmount ? stringToNumber(this.commonAreaAmount).toString() : '',
                    water: this.water,
                    elevatorMaintenance: this.elevatorMaintenance,
                    elevatorMaintenanceAmount: this.elevatorMaintenanceAmount ? stringToNumber(this.elevatorMaintenanceAmount).toString() : '',
                    ooWaterAmount: this.ooWaterAmount ? stringToNumber(this.ooWaterAmount).toString() : '',
                    ooSewerAmount: this.ooSewerAmount ? stringToNumber(this.ooSewerAmount).toString() : '',
                    waterSeparatelyMetered: this.waterSeparatelyMetered,
                    managementCompanyName: this.managementCompanyName,
                    gasSeparatelyMetered: this.gasSeparatelyMetered,
                    legal: this.legal ? stringToNumber(this.legal).toString() : '',
                    waterAmount: this.waterAmount ? stringToNumber(this.waterAmount).toString() : '',
                    management: this.management,
                    managementAmount: this.managementAmount ? stringToNumber(this.managementAmount).toString() : '',
                    triple: this.triple,
                    reimbursement: this.reimbursement ? stringToNumber(this.reimbursement).toString() : '',
                    otherExpenses: this.otherExpenses,
                    additionalNotes: this.additionalNotes,
                    step: 'dealPropertyExpenses2'
                }
            },
            pad2(n) {
                return (n < 10 ? '0' : '') + n;
            },
            changeVal(val) {
                const newDate = new Date(val);
                let month = this.pad2(newDate.getMonth()+1);
                let day = this.pad2(newDate.getDate());
                let year= newDate.getFullYear();
                let formattedDate =  year+"-"+month+"-"+day;
                this.expDate = formattedDate;
                this.change = true;
                this.abatementFieldsValidation = false;
            },
            setFields() {
                if(this.expenses) {
                    if(this.expenses.expDate !== '') {
                        this.expDate = this.expenses.expDate;
                    }
                    this.taxNumber = this.expenses.taxNumber ? formatNumber(this.expenses.taxNumber) : '';
                    this.tax = this.expenses.tax;
                    this.phaseStructure = this.expenses.phaseStructure;
                    this.payroll = this.expenses.payroll;
                    this.insurance = this.expenses.insurance ? formatNumber(this.expenses.insurance) : '';
                    this.repairs = this.expenses.repairs ? formatNumber(this.expenses.repairs) : '';
                    this.payrollAmount = this.expenses.payrollAmount ? formatNumber(this.expenses.payrollAmount) : '';
                    this.electricity = this.expenses.electricity;
                    this.electricityAmount = this.expenses.electricityAmount ? formatNumber(this.expenses.electricityAmount) : '';
                    this.electricitySeparatelyMetered = this.expenses.electricitySeparatelyMetered;
                    this.gas = this.expenses.gas;
                    this.gasAmount = this.expenses.gasAmount ? formatNumber(this.expenses.gasAmount) : '';
                    this.commonArea = this.expenses.commonArea;
                    this.commonAreaAmount = this.expenses.commonAreaAmount ? formatNumber(this.expenses.commonAreaAmount) : '';
                    this.water = this.expenses.water;
                    this.waterAmount = this.expenses.waterAmount ? formatNumber(this.expenses.waterAmount) : '';
                    this.elevatorMaintenance = this.expenses.elevatorMaintenance;
                    this.elevatorMaintenanceAmount = this.expenses.elevatorMaintenanceAmount ? formatNumber(this.expenses.elevatorMaintenanceAmount) : '';
                    this.ooWaterAmount = this.expenses.ooWaterAmount ? formatNumber(this.expenses.ooWaterAmount) : '';
                    this.ooSewerAmount = this.expenses.ooSewerAmount ? formatNumber(this.expenses.ooSewerAmount) : '';
                    this.waterSeparatelyMetered = this.expenses.waterSeparatelyMetered;
                    this.managementCompanyName = this.expenses.managementCompanyName;
                    this.gasSeparatelyMetered = this.expenses.gasSeparatelyMetered;
                    this.legal = this.expenses.legal ? formatNumber(this.expenses.legal) : '';
                    this.management = this.expenses.management;
                    this.managementAmount = this.expenses.managementAmount ? formatNumber(this.expenses.managementAmount) : '';
                    this.triple = this.expenses.triple;
                    this.reimbursement = this.expenses.reimbursement ? formatNumber(this.expenses.reimbursement) : '';
                    this.otherExpenses = JSON.parse(JSON.stringify(this.expenses.otherExpenses));
                    this.additionalNotes = this.expenses.additionalNotes;
                }
                if(this.existing) {
                    this.ifExisting = this.existing.propertyType;
                }
            },
            allowOnlyNumbers(event) {
                allowOnlyNumbersGlobal(event)
            },
        }
    });
</script>

<style lang="scss" scoped>
    .cf-form__sub-title {
        margin-bottom: 15px;
    }
    .error-expense-fields {
        display: none;
        bottom: 30px;

        @include mq(640px) {
            bottom: 10px;
        }
    }

    .error-messages {
        font-size: 13px;
        color: #f82f10;
        line-height: 1.3;
        font-weight: 400;
        letter-spacing: 0.7px;
        width: 100%;
        margin-top: 10px;
    }

    .input-holder--white-bg {
        background: $white;
        padding: 15px 25px;
        margin-bottom: 40px;

        max-width: 100%;

        .input-holder__other-expenses {
            max-width: 575px;
        }

        .input-label.normal {
            font-weight: 500;
        }
    }

    .input-holder--smaller {
        max-width: 600px;
    }

    .input-holder__other-expenses {
        display: flex;
        width: 100%;
        position: relative;

        .input-holder {
            margin-bottom: 40px;
            width: 100%;
            margin-right: 10px;

            &:nth-child(even) {
                margin-right: 0;
            }

            @include mq(1480px) {
                margin-bottom: 30px;
            }

            @include mq(640px) {
                margin-bottom: 20px;
                margin-right: 0;
            }

            .link {
                @include mq(340px) {
                    font-size: 12px;
                }
            }
        }

        .link--sm {
            position: absolute;
            right: -18px;
            top: 50%;
            transform: translateY(-53%);
        }

        @include mq(640px) {
            flex-direction: column;
            position: relative;
            margin-bottom: 20px;
            // border-top: 2px solid $mosque;
            padding-top: 15px;

            &:nth-child(2) {
                border-top: none;
            }

            .link--sm {
                right: -16px;
                top: 110px;
            }
        }
    }

    .input-holder--button {
        margin-bottom: 0;
    }
</style>
