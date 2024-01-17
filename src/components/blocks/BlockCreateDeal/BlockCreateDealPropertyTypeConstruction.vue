<template>
  <div class="cd-form-inner">
    <ValidationObserver ref="constructionForm">
      <div class="construction-form">
        <div class="input-holder">
          <label class="input-label">Land cost*</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="error-message-holder error-message-holder--block"
          >
            <div class="input-holder--with-placeholder">
              <input
                v-model="land_cost"
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
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div
          v-if="!construction"
          class="input-holder"
        >
          <label class="input-label">Date Purchased*</label>
          <div class="error-message-holder error-message-holder--block">
            <PartInputDate
              ref="partDate"
              :val-from-parent="date"
              @changeVal="changeVal"
            />
            <span
              v-if="validationError"
              class="error-message"
            >This field is required</span>
          </div>
        </div>

        <div class="input-holder">
          <label class="input-label">Hard costs*</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="error-message-holder error-message-holder--block"
          >
            <div class="input-holder--with-placeholder">
              <input
                v-model="hard_cost"
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
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="input-holder">
          <label class="input-label">Soft costs*</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="error-message-holder error-message-holder--block"
          >
            <div class="input-holder--with-placeholder">
              <input
                v-model="soft_cost"
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
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="input-holder">
          <label class="input-label">Current Land Value*</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="error-message-holder error-message-holder--block"
          >
            <div class="input-holder--with-placeholder">
              <input
                v-model="current_value"
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
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="input-holder">
          <label class="input-label">Contractor name</label>
          <input
            v-model="contractor_name"
            type="text"
            @change="change = true"
          />
        </div>

        <BlockCreateDealPropertyTypeInvestment
          ref="investment"
          :land="false"
          :construct="true"
          @propType="propType"
          @propTypeCheck="propTypeCheck"
          @clearValMixed="clearValMixed"
          @clearPropertyType="clearPropertyType"
          @clearMixedUseOrLand="clearMixedUseOrLand"
          @projectionMixedUseTypes="projectionMixedUseTypes"
        />

        <template
          v-if="propertyType === 'MIXEDUSE' && propertyTypeCheck.length > 0"
        >
          <div
            v-for="(projection, ind) in projectionMixedUse"
            :key="ind"
          >
            <div class="form-highlight form-highlight--projections">
              <div class="form__radio-holder">
                <h4 class="form__title projections-title">
                  {{ projection.tag.toLowerCase() }} Projections *
                </h4>
                <h3 class="form__question">
                  What are your plans concerning this property?
                </h3>
                <div class="input-holder">
                  <span class="input-label input-label--light">I'm planning to...</span>
                  <label class="radio-btn radio-btn--inline">
                    <input
                      type="radio"
                      :name="'plans-projections' + [ind]"
                      value="sell"
                      :checked="projection.plans === 'sell'"
                      @change="switchPlaceMixedUse(ind, 'sell')"
                    />
                    <span class="radio-btn-text">Sell the units</span>
                  </label>
                  <label class="radio-btn radio-btn--inline">
                    <input
                      type="radio"
                      :name="'plans-projections' + [ind]"
                      value="rent"
                      :checked="projection.plans === 'rent'"
                      @change="switchPlaceMixedUse(ind, 'rent')"
                    />
                    <span class="radio-btn-text">Rent out the units</span>
                  </label>
                  <span
                    v-if="projection.projectionErrorRentSell"
                    class="error-message"
                  >
                    This field is required
                  </span>
                </div>
              </div>

              <template v-if="projection.plans">
                <div
                  v-for="(plansOr, index) in projection.plansOrder"
                  :key="index"
                >
                  <div
                    v-if="plansOr === 'sell'"
                    class="form-split projections-wrapper"
                  >
                    <template v-if="checkSecundProjectionMixedUse(index, ind)">
                      <div class="input-holder">
                        <span class="input-label">Please fill out the sales projections for this
                          property *</span>
                        <label class="radio-btn radio-btn--inline">
                          <input
                            type="radio"
                            :name="'sales-projections' + [ind]"
                            value="unit"
                            :checked="projection.projections === 'unit'"
                            @change="
                              change = true;
                              projection.projectionErrorSell = false;
                              projection.projections_per_units = '';
                              projection.projections_per_sf = '';
                              changeCheckBoxmixedUseProjection(
                                ind,
                                'unit',
                                'projections'
                              );
                            "
                          />
                          <span class="radio-btn-text">Per unit</span>
                        </label>
                        <label class="radio-btn radio-btn--inline">
                          <input
                            type="radio"
                            :name="'sales-projections' + [ind]"
                            value="sf"
                            :checked="projection.projections === 'sf'"
                            @change="
                              change = true;
                              projection.projectionErrorSell = false;
                              projection.projections_per_units = '';
                              projection.projections_per_sf = '';
                              changeCheckBoxmixedUseProjection(
                                ind,
                                'sf',
                                'projections'
                              );
                            "
                          />
                          <span class="radio-btn-text">Per S/F</span>
                        </label>
                        <label class="radio-btn radio-btn--inline">
                          <input
                            type="radio"
                            :name="'sales-projections' + [ind]"
                            value="both"
                            :checked="projection.projections === 'both'"
                            @change="
                              change = true;
                              projection.projectionErrorSell = false;
                              projection.projections_sales = '';
                              changeCheckBoxmixedUseProjection(
                                ind,
                                'both',
                                'projections'
                              );
                            "
                          />
                          <span class="radio-btn-text">Both</span>
                        </label>
                      </div>
                      <div
                        v-if="
                          projection.projections.length > 0 &&
                            projection.projections !== 'both'
                        "
                        class="input-holder input-holder--alt"
                      >
                        <label class="input-label">
                          <span v-if="projection.projections === 'unit'">Sales Projections per unit</span>
                          <span v-else>Sales Projections per S/F</span>
                        </label>
                        <div class="input-holder--with-placeholder">
                          <input
                            v-model="projection.projections_sales"
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
                            @change="
                              change = true;
                              projection.projectionErrorSell = false;
                            "
                          />
                          <span class="input-placeholder">$</span>
                        </div>
                        <span class="error-message" />
                      </div>
                      <!-- If both is checked -->
                      <div
                        v-if="
                          projection.projections.length > 0 &&
                            projection.projections === 'both'
                        "
                        class="input-holder input-holder--alt"
                      >
                        <label class="input-label">Sales Projections per unit</label>
                        <div class="input-holder--with-placeholder">
                          <input
                            v-model="projection.projections_per_units"
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
                            @change="
                              change = true;
                              projection.projectionErrorSell = false;
                            "
                          />
                          <span class="input-placeholder">$</span>
                        </div>
                        <span class="error-message" />
                      </div>
                      <div
                        v-if="
                          projection.projections.length > 0 &&
                            projection.projections === 'both'
                        "
                        class="input-holder input-holder--alt"
                      >
                        <label class="input-label">Sales Projections per S/F</label>
                        <div class="input-holder--with-placeholder">
                          <input
                            v-model="projection.projections_per_sf"
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
                            @change="
                              change = true;
                              projection.projectionErrorSell = false;
                            "
                          />
                          <span class="input-placeholder">$</span>
                        </div>
                        <span class="error-message" />
                      </div>
                      <span
                        v-if="
                          projection.projectionErrorSell &&
                            projection.projections !== 'both'
                        "
                        class="error-message"
                      >
                        This field is required
                      </span>

                      <span
                        v-if="
                          projection.projectionErrorSell &&
                            projection.projections === 'both'
                        "
                        class="error-message"
                      >
                        These fields are required
                      </span>
                      <div
                        v-if="index === 0"
                        class="input-holder input-holder--alt input-holder--chekcbox"
                      >
                        <input
                          :id="'projectionOption' + [ind]"
                          type="checkbox"
                          :checked="projection.second_projection"
                          :name="'projectionOption' + [ind]"
                          @change="
                            hideShowOption($event, ind);
                            projection.rental_per = '';
                            projection.rental_amount = '';
                            projection.rental_projections_per_units = '';
                            projection.rental_projections_per_sf = '';
                          "
                        />
                        <label :for="'projectionOption' + [ind]">I want to fill out a fallback projection
                          option</label>
                      </div>
                    </template>
                  </div>
                  <div
                    v-if="plansOr === 'rent'"
                    class="form-split projections-wrapper"
                  >
                    <template v-if="checkSecundProjectionMixedUse(index, ind)">
                      <div class="input-holder input-holder--alt">
                        <span class="input-label">Please fill out the rental projections for this
                          property *</span>
                        <label class="radio-btn radio-btn--inline">
                          <input
                            type="radio"
                            :name="'rental-projections' + ind"
                            value="unit"
                            :checked="projection.rental_per === 'unit'"
                            @change="
                              change = true;
                              projection.projectionErrorRent = false;
                              projection.rental_projections_per_units = '';
                              projection.rental_projections_per_sf = '';
                              changeCheckBoxmixedUseProjection(
                                ind,
                                'unit',
                                'rental_per'
                              );
                            "
                          />
                          <span class="radio-btn-text">Per unit</span>
                        </label>
                        <label class="radio-btn radio-btn--inline">
                          <input
                            type="radio"
                            :name="'rental-projections' + ind"
                            value="sf"
                            :checked="projection.rental_per === 'sf'"
                            @change="
                              change = true;
                              projection.projectionErrorRent = false;
                              projection.rental_projections_per_units = '';
                              projection.rental_projections_per_sf = '';
                              changeCheckBoxmixedUseProjection(
                                ind,
                                'sf',
                                'rental_per'
                              );
                            "
                          />
                          <span class="radio-btn-text">Per S/F</span>
                        </label>
                        <label class="radio-btn radio-btn--inline">
                          <input
                            type="radio"
                            :name="'rental-projections' + ind"
                            value="both"
                            :checked="projection.rental_per === 'both'"
                            @change="
                              change = true;
                              projection.projectionErrorRent = false;
                              projection.rental_amount = '';
                              changeCheckBoxmixedUseProjection(
                                ind,
                                'both',
                                'rental_per'
                              );
                            "
                          />
                          <span class="radio-btn-text">Both</span>
                        </label>
                      </div>
                      <div
                        v-if="
                          projection.rental_per.length > 0 &&
                            projection.rental_per !== 'both'
                        "
                        class="input-holder input-holder--alt"
                      >
                        <label class="input-label">
                          <span v-if="projection.rental_per === 'unit'">Rental Projections per Unit</span>
                          <span v-else>Rental Projections per S/F</span>
                        </label>
                        <div class="input-holder--with-placeholder">
                          <input
                            v-model="projection.rental_amount"
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
                            @change="
                              change = true;
                              projection.projectionErrorRent = false;
                            "
                          />
                          <span class="input-placeholder">$</span>
                        </div>
                      </div>
                      <!-- If both is checked -->
                      <div
                        v-if="
                          projection.rental_per.length > 0 &&
                            projection.rental_per === 'both'
                        "
                        class="input-holder"
                      >
                        <label class="input-label">Rental Projections per unit</label>
                        <div class="input-holder--with-placeholder">
                          <input
                            v-model="projection.rental_projections_per_units"
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
                            @change="
                              change = true;
                              projection.projectionErrorRent = false;
                            "
                          />
                          <span class="input-placeholder">$</span>
                        </div>
                        <span class="error-message" />
                      </div>
                      <div
                        v-if="
                          projection.rental_per.length > 0 &&
                            projection.rental_per === 'both'
                        "
                        class="input-holder"
                      >
                        <label class="input-label">Rental Projections per S/F</label>
                        <div class="input-holder--with-placeholder">
                          <input
                            v-model="projection.rental_projections_per_sf"
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
                            @change="
                              change = true;
                              projection.projectionErrorRent = false;
                            "
                          />
                          <span class="input-placeholder">$</span>
                        </div>
                        <span class="error-message" />
                      </div>
                      <span
                        v-if="
                          projection.projectionErrorRent &&
                            projection.rental_per !== 'both'
                        "
                        class="error-message"
                      >
                        This field is required
                      </span>

                      <span
                        v-if="
                          projection.projectionErrorRent &&
                            projection.rental_per === 'both'
                        "
                        class="error-message"
                      >
                        These fields are required
                      </span>
                      <div
                        v-if="index === 0"
                        class="input-holder input-holder--alt input-holder--chekcbox"
                      >
                        <input
                          :id="'rentalProjectionOption' + ind"
                          type="checkbox"
                          :name="'rentalProjectionOption' + ind"
                          :checked="projection.second_projection"
                          @change="
                            hideShowOption($event, ind);
                            projection.projections = '';
                            projection.projections_sales = '';
                            projection.projections_per_units = '';
                            projection.projections_per_sf = '';
                          "
                        />
                        <label :for="'rentalProjectionOption' + ind">I want to fill out a fallback projection
                          option</label>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>

        <template v-if="propertyType !== 'MIXEDUSE'">
          <div
            v-if="propertyType === 'MULTIFAMILY'"
            class="input-holder"
          >
            <label class="input-label">Amount of units*</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="error-message-holder error-message-holder--block"
            >
              <input
                v-model="amount_units"
                type="text"
                @change="(change = true), allowOnlyNumbers($event)"
                @keydown="allowOnlyNumbers($event)"
                @wheel="$event.target.blur()"
                @keyup="numOfUnitsValidation(amount_units)"
              />
              <span class="error-message">{{ errors[0] }}</span>
              <span
                v-if="numOfUnitsLess && !errors[0]"
                class="error-message"
              >Minimum number of units is 4</span>
            </ValidationProvider>
          </div>

          <div
            v-else
            class="input-holder"
          >
            <label class="input-label">Amount of units*</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="error-message-holder error-message-holder--block"
            >
              <input
                v-model="amount_units"
                type="text"
                @change="(change = true), allowOnlyNumbers($event)"
                @keydown="allowOnlyNumbers($event)"
                @wheel="$event.target.blur()"
              />
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="input-holder">
            <label
              v-if="construction"
              class="input-label"
            >Rentable/Sellable SF*</label>
            <label
              v-else
              class="input-label"
            >Square footage*</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="error-message-holder error-message-holder--block"
            >
              <input
                v-model="square_footage"
                type="text"
                @change="(change = true), allowOnlyNumbers($event)"
                @keydown="allowOnlyNumbers($event)"
                @wheel="$event.target.blur()"
              />
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="input-holder">
            <label class="input-label">Floors*</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="error-message-holder error-message-holder--block"
            >
              <input
                v-model="floors"
                type="text"
                @change="(change = true), allowOnlyNumbers($event)"
                @keydown="allowOnlyNumbers($event)"
                @wheel="$event.target.blur()"
              />
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="form-highlight form-highlight--projections">
            <div class="form__radio-holder">
              <h4 class="form__title">Projections *</h4>
              <h3 class="form__question">
                What are your plans concerning this property?
              </h3>
              <div class="input-holder">
                <span class="input-label input-label--light">I'm planning to...</span>
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="plans"
                    type="radio"
                    name="plans-projections"
                    value="sell"
                    @change="switchPlace()"
                  />
                  <span class="radio-btn-text">Sell the units</span>
                </label>
                <label class="radio-btn radio-btn--inline">
                  <input
                    v-model="plans"
                    type="radio"
                    name="plans-projections"
                    value="rent"
                    @change="switchPlace()"
                  />
                  <span class="radio-btn-text">Rent out the units</span>
                </label>
                <span
                  v-if="projectionErrorRentSell"
                  class="error-message"
                >
                  This field is required
                </span>
              </div>
            </div>

            <template v-if="plans">
              <div
                v-for="(plansOr, index) in plansOrder"
                :key="index"
              >
                <div
                  v-if="plansOr === 'sell'"
                  class="form-split projections-wrapper"
                >
                  <template v-if="checkSecundProjection(index)">
                    <div class="input-holder">
                      <span class="input-label">Please fill out the sales projections for this property
                        *</span>
                      <label class="radio-btn radio-btn--inline">
                        <input
                          v-model="projections"
                          type="radio"
                          name="sales-projections"
                          value="unit"
                          @change="
                            change = true;
                            projections_per_units = '';
                            projections_per_sf = '';
                            projectionErrorSell = false;
                          "
                        />
                        <span class="radio-btn-text">Per unit</span>
                      </label>
                      <label class="radio-btn radio-btn--inline">
                        <input
                          v-model="projections"
                          type="radio"
                          name="sales-projections"
                          value="sf"
                          @change="
                            change = true;
                            projections_per_units = '';
                            projections_per_sf = '';
                            projectionErrorSell = false;
                          "
                        />
                        <span class="radio-btn-text">Per S/F</span>
                      </label>
                      <label class="radio-btn radio-btn--inline">
                        <input
                          v-model="projections"
                          type="radio"
                          name="sales-projections"
                          value="both"
                          @change="
                            change = true;
                            projections_sales = '';
                            projectionErrorSell = false;
                          "
                        />
                        <span class="radio-btn-text">Both</span>
                      </label>
                    </div>
                    <div
                      v-if="projections.length > 0 && projections !== 'both'"
                      class="input-holder input-holder--alt"
                    >
                      <label class="input-label">
                        <span v-if="projections === 'unit'">Sales Projections per unit</span>
                        <span v-else>Sales Projections per S/F</span>
                      </label>

                      <div class="input-holder--with-placeholder">
                        <input
                          v-model="projections_sales"
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
                          @change="
                            change = true;
                            projectionErrorSell = false;
                          "
                        />
                        <span class="input-placeholder">$</span>
                      </div>
                      <span class="error-message" />
                    </div>
                    <!-- If both is checked -->
                    <div
                      v-if="projections.length > 0 && projections === 'both'"
                      class="input-holder input-holder--alt"
                    >
                      <label class="input-label">Sales Projections per unit</label>
                      <div class="input-holder--with-placeholder">
                        <input
                          v-model="projections_per_units"
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
                          @change="
                            change = true;
                            projectionErrorSell = false;
                          "
                        />
                        <span class="input-placeholder">$</span>
                      </div>
                      <span class="error-message" />
                    </div>
                    <div
                      v-if="projections.length > 0 && projections === 'both'"
                      class="input-holder input-holder--alt"
                    >
                      <label class="input-label">Sales Projections per S/F</label>
                      <div class="input-holder--with-placeholder">
                        <input
                          v-model="projections_per_sf"
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
                          @change="
                            change = true;
                            projectionErrorSell = false;
                          "
                        />
                        <span class="input-placeholder">$</span>
                      </div>
                    </div>
                    <span
                      v-if="projectionErrorSell && projections !== 'both'"
                      class="error-message"
                    >
                      This field is required
                    </span>

                    <span
                      v-if="projectionErrorSell && projections === 'both'"
                      class="error-message"
                    >
                      These fields are required
                    </span>
                    <div
                      v-if="index === 0"
                      class="input-holder input-holder--alt input-holder--chekcbox"
                    >
                      <input
                        id="projectionOption"
                        v-model="second_projection"
                        type="checkbox"
                        name="projectionOption"
                        @change="
                          change = true;
                          rental_per = '';
                          rental_amount = '';
                          rental_projections_per_units = '';
                          rental_projections_per_sf = '';
                        "
                      />
                      <label for="projectionOption">I want to fill out a fallback projection option</label>
                    </div>
                  </template>
                </div>
                <div
                  v-if="plansOr === 'rent'"
                  class="form-split projections-wrapper"
                >
                  <template v-if="checkSecundProjection(index)">
                    <div class="input-holder input-holder--alt">
                      <span class="input-label">Please fill out the rental projections for this
                        property *</span>
                      <label class="radio-btn radio-btn--inline">
                        <input
                          v-model="rental_per"
                          type="radio"
                          name="rental-projections"
                          value="unit"
                          @change="
                            change = true;
                            projectionErrorRent = false;
                            rental_projections_per_units = '';
                            rental_projections_per_sf = '';
                          "
                        />
                        <span class="radio-btn-text">Per unit</span>
                      </label>
                      <label class="radio-btn radio-btn--inline">
                        <input
                          v-model="rental_per"
                          type="radio"
                          name="rental-projections"
                          value="sf"
                          @change="
                            change = true;
                            projectionErrorRent = false;
                            rental_projections_per_units = '';
                            rental_projections_per_sf = '';
                          "
                        />
                        <span class="radio-btn-text">Per S/F</span>
                      </label>
                      <label class="radio-btn radio-btn--inline">
                        <input
                          v-model="rental_per"
                          type="radio"
                          name="rental-projections"
                          value="both"
                          @change="
                            change = true;
                            projectionErrorRent = false;
                            rental_amount = '';
                          "
                        />
                        <span class="radio-btn-text">Both</span>
                      </label>
                    </div>
                    <div
                      v-if="rental_per.length > 0 && rental_per !== 'both'"
                      class="input-holder input-holder--alt"
                    >
                      <label class="input-label">
                        <span v-if="rental_per === 'unit'">Rental Projections per unit</span>
                        <span v-else>Rental Projections per S/F</span>
                      </label>
                      <div class="input-holder--with-placeholder">
                        <input
                          v-model="rental_amount"
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
                          @change="
                            change = true;
                            projectionErrorRent = false;
                          "
                        />
                        <span class="input-placeholder">$</span>
                      </div>
                    </div>
                    <!-- If both is checked -->
                    <div
                      v-if="rental_per.length > 0 && rental_per === 'both'"
                      class="input-holder"
                    >
                      <label class="input-label">Rental Projections per unit</label>
                      <div class="input-holder--with-placeholder">
                        <input
                          v-model="rental_projections_per_units"
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
                          @change="
                            change = true;
                            projectionErrorRent = false;
                          "
                        />
                        <span class="input-placeholder">$</span>
                      </div>
                      <span class="error-message" />
                    </div>
                    <div
                      v-if="rental_per.length > 0 && rental_per === 'both'"
                      class="input-holder"
                    >
                      <label class="input-label">Rental Projections per S/F</label>
                      <div class="input-holder--with-placeholder">
                        <input
                          v-model="rental_projections_per_sf"
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
                          @change="
                            change = true;
                            projectionErrorRent = false;
                          "
                        />
                        <span class="input-placeholder">$</span>
                      </div>
                    </div>

                    <span
                      v-if="projectionErrorRent && rental_per !== 'both'"
                      class="error-message"
                    >
                      This field is required
                    </span>

                    <span
                      v-if="projectionErrorRent && rental_per === 'both'"
                      class="error-message"
                    >
                      These fields are required
                    </span>
                    <div
                      v-if="index === 0"
                      class="input-holder input-holder--alt input-holder--chekcbox"
                    >
                      <input
                        id="rentalProjectionOption"
                        v-model="second_projection"
                        type="checkbox"
                        name="rentalProjectionOption"
                        @change="
                          change = true;
                          projections = '';
                          projections_sales = '';
                          projections_per_units = '';
                          projections_per_sf = '';
                        "
                      />
                      <label for="rentalProjectionOption">I want to fill out a fallback projection option</label>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </template>

        <!-- <div class="input-holder">
                    all projection questions should have these 2 options. the field should come first, then the n/
                    <label class="input-label">Sample question - not a field - for all Projections questions for mixed use</label>
                    sample question - not a field - for all Projections questions for mixed use
                </div> -->
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import PartInputDate from "@/components/parts/PartDateInputCustom.vue"
import BlockCreateDealPropertyTypeInvestment from "@/components/blocks/BlockCreateDeal/BlockCreateDealPropertyTypeInvestment.vue"
import { ValidationProvider, ValidationObserver, extend } from "vee-validate"
import {
  allowOnlyNumbersGlobal,
  errorScroll,
  formatNumber,
  stringToNumber,
} from "@/config/util"
import { CurrencyDirective } from "vue-currency-input"
/* eslint-disable */
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required",
});

interface Data {
  title: string;
  change: boolean;
  projectionErrorRent: boolean;
  projectionErrorSell: boolean;
  projectionErrorRentSell: boolean;
  propertyTypeCheck;

  date: string;
  land_cost: string;
  current_value: string;
  hard_cost: string;
  soft_cost: string;
  contractor_name: string;

  amount_units: string;
  square_footage: string;
  floors: string;

  projections: string;
  projections_sales: string;
  projections_per_units: string;
  projections_per_sf: string;

  rental_per: string;
  rental_amount: string;
  rental_projections_per_units: string;
  rental_projections_per_sf: string;

  validationError: boolean;

  propertyType: string;

  numOfUnitsLess: boolean;

  plans: string;
  second_projection: boolean;
  plansOrder;

  projectionMixedUse;
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

  data(): Data {
    return {
      title: 'This is title of "BlockCreateDealPropertyTypeConstruction"!',
      change: false,
      projectionErrorRent: false,
      projectionErrorSell: false,
      projectionErrorRentSell: false,
      propertyTypeCheck: [],

      date: "",
      land_cost: "",
      current_value: "",
      hard_cost: "",
      soft_cost: "",
      contractor_name: "",
      amount_units: "",
      square_footage: "",
      floors: "",
      projections: "",
      projections_sales: "",
      projections_per_units: "",
      projections_per_sf: "",
      rental_per: "",
      rental_amount: "",
      rental_projections_per_units: "",
      rental_projections_per_sf: "",
      validationError: false,
      propertyType: "",

      numOfUnitsLess: false,

      plans: "",
      second_projection: null,
      plansOrder: ["sell", "rent"],

      projectionMixedUse: [],
    };
  },
  components: {
    PartInputDate,
    BlockCreateDealPropertyTypeInvestment,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    currency: CurrencyDirective,
  },
  mounted() {
    this.setFields();
    this.$store.dispatch("ui", { overlay: false });
  },
  computed: {
    type_construction() {
      return this.$store.getters.getTypeConstruction;
    },
    investment() {
      return this.$store.getters.getInvestment;
    },
    id() {
      return this.$store.getters.getId;
    },
    construction() {
      return this.$store.getters.getConstruction;
    },
  },

  watch: {
    amount_units: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => (this.amount_units = result));
      }
    },

    square_footage: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => (this.square_footage = result));
      }
    },

    floors: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => (this.floors = result));
      }
    },

    propertyType() {
      if (this.propertyType !== "MIXEDUSE") {
        this.projectionMixedUse = [];
      }
    },
  },

  methods: {
    clearPropertyType() {
      this.change = true;
      this.plans = "";
      this.projectionMixedUse = [];
      this.projections = "";
      this.projections_sales = "";
      this.projections_per_units = "";
      this.projections_per_sf = "";
      this.rental_per = "";
      this.rental_amount = "";
      this.rental_projections_per_units = "";
      this.rental_projections_per_sf = "";
      this.second_projection = null;
    },
    hideShowOption(e, ind) {
      const { checked } = e.target;
      this.projectionMixedUse[ind].second_projection = checked;
      this.change = true;
    },
    changeCheckBoxmixedUseProjection(ind, val, flag) {
      this.projectionMixedUse[ind][flag] = val;
    },
    checkSecundProjection(index) {
      if (index === 0) return true;

      if (this.second_projection) return true;

      return false;
    },
    checkSecundProjectionMixedUse(index, ind) {
      if (index === 0) return true;

      if (this.projectionMixedUse[ind].second_projection) return true;
      return false;
    },
    switchPlaceMixedUse(ind, val) {
      this.projectionMixedUse[ind].projectionErrorRentSell = false;
      this.projectionMixedUse[ind].plans = val;
      val === "sell"
        ? (this.projectionMixedUse[ind].plansOrder = ["sell", "rent"])
        : (this.projectionMixedUse[ind].plansOrder = ["rent", "sell"]);

      this.change = true;
      this.projectionMixedUse[ind].projections = "";
      this.projectionMixedUse[ind].projections_sales = "";
      this.projectionMixedUse[ind].projections_per_units = "";
      this.projectionMixedUse[ind].projections_per_sf = "";
      this.projectionMixedUse[ind].rental_per = "";
      this.projectionMixedUse[ind].rental_amount = "";
      this.projectionMixedUse[ind].rental_projections_per_units = "";
      this.projectionMixedUse[ind].rental_projections_per_sf = "";
      this.projectionMixedUse[ind].second_projection = null;
    },
    switchPlace() {
      this.projectionErrorRentSell = false;

      this.plans === "sell"
        ? (this.plansOrder = ["sell", "rent"])
        : (this.plansOrder = ["rent", "sell"]);

      this.change = true;
      this.projections = "";
      this.projections_sales = "";
      this.projections_per_units = "";
      this.projections_per_sf = "";
      this.rental_per = "";
      this.rental_amount = "";
      this.rental_projections_per_units = "";
      this.rental_projections_per_sf = "";
      this.second_projection = null;
    },
    numOfUnitsValidation(data) {
      if (parseInt(data) < 4) {
        this.numOfUnitsLess = true;
      } else {
        this.numOfUnitsLess = false;
      }
    },
    clearValMixed(flag) {
      let index = this.projectionMixedUse.findIndex((ele) => ele.tag === flag);
      this.projectionMixedUse.splice(index, 1);
    },
    clearMixedUseOrLand() {
      this.amount_units = "";
      this.square_footage = "";
      this.floors = "";
      this.projections = "";
      this.projections_sales = "";
      this.projections_per_units = "";
      this.projections_per_sf = "";
      this.rental_per = "";

      this.rental_amount = "";
      this.rental_projections_per_units = "";
      this.rental_projections_per_sf = "";
    },
    validationSell() {
      if (this.projections === null || this.projections === "") {
        this.projectionErrorSell = true;
        return false;
      }
      if (this.projections === "unit" || this.projections === "sf") {
        if (this.projections_sales === "") {
          this.projectionErrorSell = true;
          return false;
        }
      } else {
        if (
          this.projections_per_units === "" ||
          this.projections_per_sf === ""
        ) {
          this.projectionErrorSell = true;
          return false;
        }
      }
      return true;
    },
    validationRent() {
      if (this.rental_per === null || this.rental_per === "") {
        this.projectionErrorRent = true;
        return false;
      }
      if (this.rental_per === "unit" || this.rental_per === "sf") {
        if (this.rental_amount === "") {
          this.projectionErrorRent = true;
          return false;
        }
      } else {
        if (
          this.rental_projections_per_units === "" ||
          this.rental_projections_per_sf === ""
        ) {
          this.projectionErrorRent = true;
          return false;
        }
      }
      return true;
    },
    validationSellMixedUse(projection) {
      if (projection.projections === null || projection.projections === "") {
        projection.projectionErrorSell = true;
        return false;
      }
      if (
        projection.projections === "unit" ||
        projection.projections === "sf"
      ) {
        if (projection.projections_sales === "") {
          projection.projectionErrorSell = true;
          return false;
        }
      } else {
        if (
          projection.projections_per_units === "" ||
          projection.projections_per_sf === ""
        ) {
          projection.projectionErrorSell = true;
          return false;
        }
      }
      return true;
    },
    validationRentMixedUse(projection) {
      if (projection.rental_per === null || projection.rental_per === "") {
        projection.projectionErrorRent = true;
        return false;
      }
      if (projection.rental_per === "unit" || projection.rental_per === "sf") {
        if (projection.rental_amount === "") {
          projection.projectionErrorRent = true;
          return false;
        }
      } else {
        if (
          projection.rental_projections_per_units === "" ||
          projection.rental_projections_per_sf === ""
        ) {
          projection.projectionErrorRent = true;
          return false;
        }
      }
      return true;
    },
    async next() {
      const success = await this.$refs.constructionForm.validate();

      const investmentError = await this.$refs.investment.validationFrom();

      // if (this.propertyType === "MIXEDUSE" && parseInt(this.$refs.investment.createObject().multiAmountOfUnits) < 4) {
      //     return;
      // }

      if (this.propertyType === "MULTIFAMILY" && this.amount_units < 4) {
        this.numOfUnitsLess = true;
        return;
      } else {
        this.numOfUnitsLess = false;
      }

      // if (this.propertyType === "MIXEDUSE" && parseInt(this.$refs.investment.createObject().multiAmountOfUnits) < 4) {
      //     return;
      // }

      if (this.propertyType !== "MIXEDUSE") {
        if (this.plans === "" || this.plans === null) {
          this.projectionErrorRentSell = true;
          errorScroll();
          return;
        } else if (this.plans === "sell") {
          let validation = this.validationSell();
          if (!validation) {
            errorScroll();
            return;
          }

          if (this.second_projection) {
            let validation = this.validationRent();
            if (!validation) {
              errorScroll();
              return;
            }
          }
        } else {
          let validation = this.validationRent();
          if (!validation) {
            errorScroll();
            return;
          }

          if (this.second_projection) {
            let validation = this.validationSell();
            if (!validation) {
              errorScroll();
              return;
            }
          }
        }
      } else {
        let flag = false;
        this.projectionMixedUse.forEach((projection) => {
          if (projection.plans === "" || projection.plans === null) {
            projection.projectionErrorRentSell = true;
            flag = true;
          } else if (projection.plans === "sell") {
            let validation = this.validationSellMixedUse(projection);
            if (!validation) {
              flag = true;
            }

            if (projection.second_projection) {
              let validation = this.validationRentMixedUse(projection);
              if (!validation) {
                flag = true;
              }
            }
          } else {
            let validation = this.validationRentMixedUse(projection);
            if (!validation) {
              flag = true;
            }

            if (projection.second_projection) {
              let validation = this.validationSellMixedUse(projection);
              if (!validation) {
                flag = true;
              }
            }
          }
        });
        if (flag) {
          errorScroll();
          return;
        }
      }
      errorScroll();
      this.projectionMixedUse.forEach((projection) => {
        projection.projectionErrorRent = false;
        projection.projectionErrorSell = false;
        projection.projectionErrorRentSell = false;
      });

      this.projectionErrorRent = false;
      this.projectionErrorSell = false;
      this.projectionErrorRentSell = false;
      if (this.construction === null) {
        if (this.date === "" || this.date === null) {
          this.validationError = true;

          if (!success) {
            return;
          }

          return;
        }
      } else {
        this.date = "";
        this.change = true;
      }

      if (!success || !investmentError) {
        return;
      }

      if (this.$refs.partDate) {
        if (this.$refs.partDate.isError()) {
          errorScroll();
          return;
        }
      }

      if (this.change) {
        await this.$store.dispatch("setBrokerDealPropertyTypeConstruction", {
          construction: this.createObject(),
          investment: this.$refs.investment.createObject(),
        });
        await this.$store.dispatch("getDealById", {
          id: this.$route.params.deal,
        });

        return this.nextAction;
      } else {
        return this.nextAction;
      }
    },
    skip() {
      return this.skipAction;
    },
    prev() {
      return this.prevAction;
    },
    pad2(n) {
      return (n < 10 ? "0" : "") + n;
    },
    changeVal(val) {
      this.validationError = false;
      const newDate = new Date(val);
      let month = this.pad2(newDate.getMonth() + 1);
      let day = this.pad2(newDate.getDate());
      let year = newDate.getFullYear();
      let formattedDate = year + "-" + month + "-" + day;
      this.date = formattedDate;
      this.change = true;
    },
    createObject() {
      this.projectionMixedUse.forEach((projection) => {
        delete projection.projectionErrorRent;
        delete projection.projectionErrorSell;
        delete projection.projectionErrorRentSell;
      });
      return {
        date: this.date,
        land_cost: this.land_cost
          ? stringToNumber(this.land_cost).toString()
          : "",
        current_value: this.current_value
          ? stringToNumber(this.current_value).toString()
          : "",
        hard_cost: this.hard_cost
          ? stringToNumber(this.hard_cost).toString()
          : "",
        soft_cost: this.soft_cost
          ? stringToNumber(this.soft_cost).toString()
          : "",
        contractor_name: this.contractor_name,
        amount_units: this.amount_units,
        square_footage: this.square_footage,
        floors: this.floors,
        plans: this.plans,
        second_projection: this.second_projection,

        projections: this.projections,
        projections_sales: this.projections_sales
          ? stringToNumber(this.projections_sales).toString()
          : "",
        projections_per_units: this.projections_per_units
          ? stringToNumber(this.projections_per_units).toString()
          : "",
        projections_per_sf: this.projections_per_sf
          ? stringToNumber(this.projections_per_sf).toString()
          : "",

        rental_per: this.rental_per,
        rental_amount: this.rental_amount
          ? stringToNumber(this.rental_amount).toString()
          : "",
        rental_projections_per_units: this.rental_projections_per_units
          ? stringToNumber(this.rental_projections_per_units).toString()
          : "",
        rental_projections_per_sf: this.rental_projections_per_sf
          ? stringToNumber(this.rental_projections_per_sf).toString()
          : "",
        projectionMixedUse: this.projectionMixedUse,
        step: "dealPropertyTypeConstruction",
      };
    },
    setFields() {
      if (this.type_construction) {
        const arr = JSON.parse(
          JSON.stringify(this.type_construction.projectionMixedUse)
        );
        if (arr && arr.length > 0) {
          this.projectionMixedUse = arr;
          this.projectionMixedUse.forEach((projection) => {
            projection.projectionErrorRent = false;
            projection.projectionErrorSell = false;
            projection.projectionErrorRentSell = false;
          });
        }

        this.second_projection = this.type_construction.second_projection;

        if (this.type_construction.plans !== "") {
          this.plans = this.type_construction.plans;
          this.plans === "sell"
            ? (this.plansOrder = ["sell", "rent"])
            : (this.plansOrder = ["rent", "sell"]);
        }

        if (this.type_construction.date !== "") {
          this.date = this.type_construction.date;
        }
        this.land_cost = this.type_construction.land_cost
          ? formatNumber(this.type_construction.land_cost)
          : "";
        this.current_value = this.type_construction.current_value
          ? formatNumber(this.type_construction.current_value)
          : "";
        this.hard_cost = this.type_construction.hard_cost
          ? formatNumber(this.type_construction.hard_cost)
          : "";
        this.soft_cost = this.type_construction.soft_cost
          ? formatNumber(this.type_construction.soft_cost)
          : "";
        this.contractor_name = this.type_construction.contractor_name;
        this.amount_units = this.type_construction.amount_units;
        this.square_footage = this.type_construction.square_footage;
        this.floors = this.type_construction.floors;

        this.projections = this.type_construction.projections;
        this.projections_sales = this.type_construction.projections_sales
          ? formatNumber(this.type_construction.projections_sales)
          : "";
        this.projections_per_units = this.type_construction
          .projections_per_units
          ? formatNumber(this.type_construction.projections_per_units)
          : "";
        this.projections_per_sf = this.type_construction.projections_per_sf
          ? formatNumber(this.type_construction.projections_per_sf)
          : "";

        this.rental_per = this.type_construction.rental_per;
        this.rental_amount = this.type_construction.rental_amount
          ? formatNumber(this.type_construction.rental_amount)
          : "";
        this.rental_projections_per_units = this.type_construction
          .rental_projections_per_units
          ? formatNumber(this.type_construction.rental_projections_per_units)
          : "";
        this.rental_projections_per_sf = this.type_construction
          .rental_projections_per_sf
          ? formatNumber(this.type_construction.rental_projections_per_sf)
          : "";
      }
    },
    allowOnlyNumbers(event) {
      allowOnlyNumbersGlobal(event);
    },

    /**
     * @author Branislav Jerinic
     * @description passing value from BlockCreateDealPropertyTypeInvestment component
     */
    propType(propTypeValue) {
      this.propertyType = propTypeValue;
    },

    propTypeCheck(check) {
      this.propertyTypeCheck = check;
    },
    projectionMixedUseTypes(flag, isChecked) {
      if (isChecked) {
        const obj = {
          tag: flag,
          projections: "",
          projections_sales: "",
          projections_per_units: "",
          projections_per_sf: "",
          rental_per: "",
          rental_amount: "",
          rental_projections_per_units: "",
          rental_projections_per_sf: "",
          plans: "",
          second_projection: null,
          plansOrder: ["sell", "rent"],
          projectionErrorRentSell: false,
          projectionErrorSell: false,
          projectionErrorRent: false,
        };
        this.projectionMixedUse.push(obj);
        let importOrder = ["RETAIL", "MULTIFAMILY", "OFFICE", "INDUSTRIAL"];
        const sortByObject = importOrder.reduce((obj, item, index) => {
          return {
            ...obj,
            [item]: index,
          };
        }, {});
        this.projectionMixedUse = this.projectionMixedUse.sort(
          (a, b) => sortByObject[a.tag] - sortByObject[b.tag]
        );
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.construction-form__wrap {
  max-width: 630px;
}
.error-color {
  font-size: 13px;
  color: #f82f10;
  line-height: 1.3;
  font-weight: 400;
  letter-spacing: 0.7px;
  width: 100%;
  z-index: 1;
}

.form-split__title {
  color: $mosque;
  margin-bottom: 10px;
}

.form-split__notice {
  font-size: 14px;
  color: $shark;
  font-weight: 600;
  letter-spacing: 0.08px;
  line-height: 1.37;
  display: block;

  @include mq($sm) {
    font-size: 13px;
  }
}

.projections-note {
  font-size: 14px;
  font-style: italic;
  color: $blue-chill;
  margin-bottom: 5px;
}

.input-holder--alt {
  max-width: 598px;

  @include mq(1024px) {
    max-width: 610px;
  }
}

.error-message--alt {
  bottom: 56px;
}

.projections-wrapper {
  margin-bottom: 80px;
}

.projections-title {
  text-transform: capitalize;
}
</style>
