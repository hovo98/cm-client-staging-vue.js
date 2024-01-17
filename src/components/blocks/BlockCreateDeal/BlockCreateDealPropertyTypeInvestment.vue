<template>
  <div class="cd-form-inner cd-form-inner--full">
    <div class="cf-form-block cf-form-block--create-deal">
      <div class="cf-form-block__sec">
        <h4 class="title-extra-small cf-form__sub-title">
          What’s the property type?*
        </h4>
        <div class="error-message-holder error-message-holder--block">
          <div class="rdb-box-items input-holder-wrap">
            <div class="rdb-box-item">
              <label
                class="rdb-box rdb-box-with-img cf-form-block--create-deal__rdb-box"
              >
                <img
                  src="@/assets/images/checkbox_icons/retail.png"
                  alt="Retail"
                />
                <input
                  v-model="propType"
                  type="radio"
                  name="prop-type"
                  value="RETAIL"
                  @change="
                    changeform();
                    changePropType();
                    isChecked($event);
                    validationError = false;
                    removeValue('RETAIL');
                    changePropertyMethod();
                  "
                />
                <span class="rdb-box-text">Retail</span>
                <span class="rdb-box-hv" />
              </label>
            </div>
            <div class="rdb-box-item">
              <label
                class="rdb-box rdb-box-with-img cf-form-block--create-deal__rdb-box"
              >
                <img
                  src="@/assets/images/checkbox_icons/multifamily.png"
                  alt="Multifamily"
                />
                <input
                  v-model="propType"
                  type="radio"
                  name="prop-type"
                  value="MULTIFAMILY"
                  @change="
                    changeform();
                    changePropType();
                    isChecked($event);
                    numOfUnitsLess = false;
                    validationError = false;
                    removeValue('MULTIFAMILY');
                    changePropertyMethod();
                  "
                />
                <span class="rdb-box-text">Multifamily</span>
                <span class="rdb-box-hv" />
              </label>
            </div>
            <div class="rdb-box-item">
              <label
                class="rdb-box rdb-box-with-img cf-form-block--create-deal__rdb-box"
              >
                <img
                  src="@/assets/images/checkbox_icons/office.png"
                  alt="Office"
                />
                <input
                  v-model="propType"
                  type="radio"
                  name="prop-type"
                  value="OFFICE"
                  @change="
                    changeform();
                    changePropType();
                    isChecked($event);
                    validationError = false;
                    removeValue('OFFICE');
                    changePropertyMethod();
                  "
                />
                <span class="rdb-box-text">Office</span>
                <span class="rdb-box-hv" />
              </label>
            </div>
            <div class="rdb-box-item">
              <label
                class="rdb-box rdb-box-with-img cf-form-block--create-deal__rdb-box"
              >
                <img
                  src="@/assets/images/checkbox_icons/industrial.png"
                  alt="Industrial"
                />
                <input
                  v-model="propType"
                  type="radio"
                  name="prop-type"
                  value="INDUSTRIAL"
                  @change="
                    changeform();
                    changePropType();
                    isChecked($event);
                    validationError = false;
                    removeValue('INDUSTRIAL');
                    changePropertyMethod();
                  "
                />
                <span class="rdb-box-text">Industrial</span>
                <span class="rdb-box-hv" />
              </label>
            </div>
            <div class="rdb-box-item">
              <label
                class="rdb-box rdb-box-with-img cf-form-block--create-deal__rdb-box"
              >
                <img
                  src="@/assets/images/checkbox_icons/mixed-use.png"
                  alt="Mixed Use"
                />
                <input
                  v-model="propType"
                  type="radio"
                  name="prop-type"
                  value="MIXEDUSE"
                  @change="
                    changeform();
                    changePropType();
                    isChecked($event);
                    validationError = false;
                    removeValue('MIXEDUSE');
                    changePropertyMethod();
                  "
                />
                <span class="rdb-box-text">Mixed Use</span>
                <span class="rdb-box-hv" />
              </label>
            </div>
            <div
              v-if="land"
              class="rdb-box-item"
            >
              <label
                class="rdb-box rdb-box-with-img cf-form-block--create-deal__rdb-box"
              >
                <img
                  src="@/assets/images/checkbox_icons/land.png"
                  alt="Land"
                />
                <input
                  v-model="propType"
                  type="radio"
                  name="prop-type"
                  value="LAND"
                  @change="
                    changeform();
                    changePropType();
                    isChecked($event);
                    validationError = false;
                    removeValue('LAND');
                    changePropertyMethod();
                  "
                />
                <span class="rdb-box-text">Land</span>
                <span class="rdb-box-hv" />
              </label>
            </div>
          </div>
          <span
            v-show="validationError"
            class="error-message"
          >You must select a property type</span>
        </div>
      </div>
      <h4
        v-if="
          !checkShow('LAND') &&
            !checkShow('MIXEDUSE') &&
            propertyTypes !== 'CONSTRUCTION'
        "
        class="title-extra-small cf-form__sub-title"
      >
        Tell us about your property’s occupancy levels
      </h4>
      <div
        v-if="checkShow('MIXEDUSE')"
        class="cf-form-block__sec"
      >
        <h4 class="title-extra-small cf-form__sub-title">Mixed Use types*</h4>
        <div class="error-message-holder error-message-holder--block">
          <div class="rdb-box-items input-holder-wrap">
            <div class="rdb-box-item">
              <label
                for="prop-type-7"
                class="rdb-box rdb-box-with-img cf-form-block--create-deal__rdb-box"
              >
                <img
                  src="@/assets/images/checkbox_icons/retail.png"
                  alt="Retail"
                />
                <input
                  id="prop-type-7"
                  v-model="mixedUse"
                  type="checkbox"
                  name="prop-type"
                  value="RETAIL"
                  @change="
                    changeform();
                    validationError2 = false;
                    $emit('propTypeCheck', mixedUse);
                    $emit(
                      'projectionMixedUseTypes',
                      'RETAIL',
                      $event.target.checked
                    );
                    removeValFrom('RETAIL');
                  "
                />
                <span class="rdb-box-text">Retail</span>
                <span class="rdb-box-hv" />
              </label>
            </div>
            <div class="rdb-box-item">
              <label
                for="prop-type-8"
                class="rdb-box rdb-box-with-img cf-form-block--create-deal__rdb-box"
              >
                <img
                  src="@/assets/images/checkbox_icons/multifamily.png"
                  alt="Multifamily"
                />
                <input
                  id="prop-type-8"
                  v-model="mixedUse"
                  type="checkbox"
                  name="prop-type"
                  value="MULTIFAMILY"
                  @change="
                    changeform();
                    numOfUnitsLess = false;
                    validationError2 = false;
                    $emit('propTypeCheck', mixedUse);
                    $emit(
                      'projectionMixedUseTypes',
                      'MULTIFAMILY',
                      $event.target.checked
                    );
                    removeValFrom('MULTIFAMILY');
                  "
                />
                <span class="rdb-box-text">Multifamily</span>
                <span class="rdb-box-hv" />
              </label>
            </div>
            <div class="rdb-box-item">
              <label
                for="prop-type-9"
                class="rdb-box rdb-box-with-img cf-form-block--create-deal__rdb-box"
              >
                <img
                  src="@/assets/images/checkbox_icons/office.png"
                  alt="Office"
                />
                <input
                  id="prop-type-9"
                  v-model="mixedUse"
                  type="checkbox"
                  name="prop-type"
                  value="OFFICE"
                  @change="
                    changeform();
                    validationError2 = false;
                    $emit('propTypeCheck', mixedUse);
                    $emit(
                      'projectionMixedUseTypes',
                      'OFFICE',
                      $event.target.checked
                    );
                    removeValFrom('OFFICE');
                  "
                />
                <span class="rdb-box-text">Office</span>
                <span class="rdb-box-hv" />
              </label>
            </div>
            <div class="rdb-box-item">
              <label
                for="prop-type-10"
                class="rdb-box rdb-box-with-img cf-form-block--create-deal__rdb-box"
              >
                <img
                  src="@/assets/images/checkbox_icons/industrial.png"
                  alt="Industrial"
                />
                <input
                  id="prop-type-10"
                  v-model="mixedUse"
                  type="checkbox"
                  name="prop-type"
                  value="INDUSTRIAL"
                  @change="
                    changeform();
                    validationError2 = false;
                    $emit('propTypeCheck', mixedUse);
                    $emit(
                      'projectionMixedUseTypes',
                      'INDUSTRIAL',
                      $event.target.checked
                    );
                    removeValFrom('INDUSTRIAL');
                  "
                />
                <span class="rdb-box-text">Industrial</span>
                <span class="rdb-box-hv" />
              </label>
            </div>
          </div>
          <span
            v-show="validationError2"
            class="error-message"
          >The mixed use type field is required.</span>
        </div>
      </div>

      <ValidationObserver ref="propTypeInvestmentForm">
        <div
          v-if="showSplitForm"
          class="cf-form-block__sec cf-form-block__sec--wrap"
        >
          <div v-if="checkShow('RETAIL')">
            <!-- Retail Details -->
            <div
              class="form-split"
              :class="checkShow('MIXEDUSE') ? 'form-split--mixed' : ''"
            >
              <h4
                v-if="checkShow('MIXEDUSE')"
                class="title-extra-small form-split__title"
              >
                Retail details
              </h4>
              <div
                v-if="!construct"
                class="form-split__holder"
              >
                <div
                  v-if="checkShowRetail()"
                  class="input-holder form-split__input-holder"
                >
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-units"
                      class="input-label"
                    >Retail number of units*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="retailAmount"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div
                  v-if="checkShowRetail()"
                  class="input-holder form-split__input-holder"
                >
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-square-foo"
                      class="input-label"
                    >Retail number of units occupied*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="retailNumberOfUnitsOccupied"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <span
                      v-if="retailNumberOfUnitsOccupiedError"
                      class="notice-message units-occupied-notice"
                    >The entered value must not exceed the<br />
                      number of units</span>
                  </div>
                </div>

                <div
                  v-if="checkShowRetail()"
                  class="input-holder form-split__input-holder"
                >
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-square-foo"
                      class="input-label"
                    >Retail square footage*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="retailSquare"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div
                  v-if="checkShowRetail() && retailFlagForFootageOccupied"
                  class="input-holder form-split__input-holder"
                >
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-square-foo"
                      class="input-label"
                    >Retail square footage occupied*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="retailSquareFootageOccupied"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <span
                      v-if="retailSquareFootageOccupiedError"
                      class="notice-message units-occupied-notice"
                    >The entered value must not exceed the<br />
                      total square footage</span>
                  </div>
                </div>
                <div
                  :class="
                    !checkShow('LAND') &&
                      !checkShow('MIXEDUSE') &&
                      propertyTypes !== 'CONSTRUCTION'
                      ? 'input-holder'
                      : 'input-holder__retail-type input-holder'
                  "
                >
                  <label
                    class="input-label"
                    for="retail-type"
                  >Retail type</label>
                  <textarea
                    v-model="retailType"
                    rows="5"
                    placeholder="Write..."
                    @change="changeform()"
                  />
                </div>
              </div>

              <!-- // This prints if construction type and retail is selected -->
              <!-- TODO: CS part -->
              <div
                v-else-if="checkShow('MIXEDUSE') && construct"
                class="form-split__holder"
              >
                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-units"
                      class="input-label"
                    >Amount of units*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="amountOfUnits"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-units"
                      class="input-label"
                    >Rentable/Sellable SF*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="rentableSellable"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-units"
                      class="input-label"
                    >Floors*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="retailFloors"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div
                  :class="
                    !checkShow('LAND') &&
                      !checkShow('MIXEDUSE') &&
                      propertyTypes !== 'CONSTRUCTION'
                      ? 'input-holder'
                      : 'input-holder__retail-type input-holder'
                  "
                >
                  <label
                    class="input-label"
                    for="retail-type"
                  >Retail type</label>
                  <textarea
                    v-model="retailType"
                    rows="5"
                    placeholder="Write..."
                    @change="changeform()"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="checkShow('MULTIFAMILY') && checkShow('MIXEDUSE')"
            class="form-highlight"
          >
            <!-- Multi-family Details -->
            <div class="form-split">
              <h4 class="title-extra-small form-split__title">
                Multifamily Details
              </h4>
              <div
                v-if="!construct"
                class="form-split__holder"
              >
                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="multifamily-units"
                      class="input-label"
                    >Multifamily number of units*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="multiAmount"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                      <!-- <span class="error-message" v-if="numOfUnitsLess && !errors[0]">Minimum number of units is 4</span> -->
                    </ValidationProvider>
                  </div>
                </div>

                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="multifamily-units-num"
                      class="input-label"
                    >Multifamily number of units occupied*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="multiNumberOfUnitsOccupied"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <span
                      v-if="multiNumberOfUnitsOccupiedError"
                      class="notice-message units-occupied-notice"
                    >The entered value must not exceed the<br />
                      number of units</span>
                  </div>
                </div>

                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="multifamily-square-foo"
                      class="input-label"
                    >Multifamily square footage*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="multiSquare"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div
                  v-if="multiFlagForFootageOccupied"
                  class="input-holder form-split__input-holder"
                >
                  <div class="form-split__input-holder-col">
                    <label
                      for="multifamily-square-foo"
                      class="input-label"
                    >Multifamily square footage occupied*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="multiSquareFootageOccupied"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <span
                      v-if="multiSquareFootageOccupiedError"
                      class="notice-message units-occupied-notice"
                    >The entered value must not exceed the<br />
                      total square footage</span>
                  </div>
                </div>
              </div>

              <!-- // This prints if construction and Multi-family type is selected -->
              <!-- TODO: CS part -->
              <div
                v-else
                class="form-split__holder"
              >
                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-units"
                      class="input-label"
                    >Amount of units*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="multiAmountOfUnits"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                      <!-- <span class="error-message" v-if="numOfUnitsLess && !errors[0]">Minimum number of units is 4</span> -->
                    </ValidationProvider>
                  </div>
                </div>

                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-units"
                      class="input-label"
                    >Rentable/Sellable SF*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="multiRentableSellable"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-units"
                      class="input-label"
                    >Floors*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="multiFloors"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Office Details -->
          <div
            v-if="checkShow('OFFICE') && checkShow('MIXEDUSE')"
            class="form-highlight"
          >
            <div class="form-split">
              <h4 class="title-extra-small form-split__title">
                Office Details
              </h4>
              <div
                v-if="!construct"
                class="form-split__holder"
              >
                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="office-units"
                      class="input-label"
                    >Office number of units*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="officeAmount"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="office-units-num"
                      class="input-label"
                    >Office number of units occupied*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="officeNumberOfUnitsOccupied"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <span
                      v-if="officeNumberOfUnitsOccupiedError"
                      class="notice-message units-occupied-notice"
                    >The entered value must not exceed the<br />
                      number of units</span>
                  </div>
                </div>

                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="office-square-foo"
                      class="input-label"
                    >Office square footage*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="officeSquare"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div
                  v-if="officeFlagForFootageOccupied"
                  class="input-holder form-split__input-holder"
                >
                  <div class="form-split__input-holder-col">
                    <label
                      for="office-square-foo"
                      class="input-label"
                    >Office square footage occupied*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="officeSquareFootageOccupied"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <span
                      v-if="officeSquareFootageOccupiedError"
                      class="notice-message units-occupied-notice"
                    >The entered value must not exceed the<br />
                      total square footage</span>
                  </div>
                </div>
              </div>

              <!-- // This prints if construction and Office type is selected -->
              <!-- TODO: CS part -->
              <div
                v-else
                class="form-split__holder"
              >
                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-units"
                      class="input-label"
                    >Amount of units*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="officeAmountOfunits"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-units"
                      class="input-label"
                    >Rentable/Sellable SF*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="officeRentableSellable"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-units"
                      class="input-label"
                    >Floors*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="officeFloors"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Warehouse Details -->
          <div
            v-if="checkShow('INDUSTRIAL') && checkShow('MIXEDUSE')"
            class="form-highlight"
          >
            <div class="form-split">
              <h4 class="title-extra-small form-split__title">
                Industrial Details
              </h4>
              <div
                v-if="!construct"
                class="form-split__holder"
              >
                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="warehouse-units"
                      class="input-label"
                    >Industrial number of units*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="warehouseAmount"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="industrial-units-num"
                      class="input-label"
                    >Industrial number of units occupied*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="warehouseNumberOfUnitsOccupied"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <span
                      v-if="warehouseNumberOfUnitsOccupiedError"
                      class="notice-message units-occupied-notice"
                    >The entered value must not exceed the<br />
                      number of units</span>
                  </div>
                </div>

                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="warehouse-square-foo"
                      class="input-label"
                    >Industrial square footage*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="warehouseSquare"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                        @keypress="allowOnlyNumbers($event)"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div
                  v-if="warehouseFlagForFootageOccupied"
                  class="input-holder form-split__input-holder"
                >
                  <div class="form-split__input-holder-col">
                    <label
                      for="industrial-square-foo"
                      class="input-label"
                    >Industrial square footage occupied*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="warehouseSquareFootageOccupied"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <span
                      v-if="warehouseSquareFootageOccupiedError"
                      class="notice-message units-occupied-notice"
                    >The entered value must not exceed the<br />
                      total square footage</span>
                  </div>
                </div>
              </div>

              <!-- // This prints if construction and industrial type is selected -->
              <!-- TODO: CS part -->
              <div
                v-else
                class="form-split__holder"
              >
                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-units"
                      class="input-label"
                    >Amount of units*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="industrialAmountOfUnits"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-units"
                      class="input-label"
                    >Rentable/Sellable SF*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="industrialRentableSellable"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="input-holder form-split__input-holder">
                  <div class="form-split__input-holder-col">
                    <label
                      for="retail-units"
                      class="input-label"
                    >Floors*</label>
                  </div>
                  <div class="form-split__input-holder-col">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="error-message-holder error-message-holder--block"
                    >
                      <input
                        v-model="industrialFloors"
                        type="text"
                        placeholder="0"
                        @change="changeform(), allowOnlyNumbers($event)"
                        @keydown="allowOnlyNumbers($event)"
                        @wheel="$event.target.blur()"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <template v-if="!construct">
          <div
            v-if="!checkShow('LAND') && !checkShow('MIXEDUSE')"
            class="cf-form-block__sec cf-form-block__sec--wrap"
          >
            <div
              v-if="checkShow('MULTIFAMILY')"
              class="input-holder"
            >
              <label class="input-label">Number of units*</label>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="error-message-holder error-message-holder--block"
              >
                <input
                  ref="numberOfUnits"
                  v-model="numberUnit"
                  type="text"
                  placeholder="E.g. 55"
                  @change="changeform(), allowOnlyNumbers($event)"
                  @keydown="allowOnlyNumbers($event)"
                  @wheel="$event.target.blur()"
                  @keyup="
                    numOfUnitsValidation(numberUnit),
                    occupiedCheck($event, true)
                  "
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
              <label class="input-label">Number of units*</label>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="error-message-holder error-message-holder--block"
              >
                <input
                  v-model="numberUnit"
                  type="text"
                  placeholder="E.g. 55"
                  @change="changeform(), allowOnlyNumbers($event)"
                  @keydown="allowOnlyNumbers($event)"
                  @wheel="$event.target.blur()"
                  @keyup="occupiedCheck($event, true)"
                />
                <span class="error-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="input-holder">
              <label class="input-label">Number of units occupied*</label>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="error-message-holder error-message-holder--block"
              >
                <input
                  v-model="numberUnitOccupied"
                  type="text"
                  placeholder="E.g. 55"
                  @change="changeform(), allowOnlyNumbers($event)"
                  @keydown="allowOnlyNumbers($event)"
                  @keyup="occupiedCheck($event, false)"
                  @wheel="$event.target.blur()"
                />
                <span
                  v-if="errors[0]"
                  class="error-message"
                >{{
                  errors[0]
                }}</span>
                <span
                  v-else-if="showMsg"
                  class="notice-message"
                >The entered value must not exceed the number of units</span>
              </ValidationProvider>
            </div>
            <div class="input-holder">
              <label class="input-label">Square footage*</label>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="error-message-holder error-message-holder--block"
              >
                <input
                  v-model="squareFootage"
                  type="text"
                  placeholder="E.g. 55"
                  @change="changeform(), allowOnlyNumbers($event)"
                  @keydown="allowOnlyNumbers($event)"
                  @wheel="$event.target.blur()"
                  @keyup="footageOccupiedCheck($event, true)"
                />
                <span
                  v-if="errors[0]"
                  class="error-message"
                >{{
                  errors[0]
                }}</span>
                <!-- <span class="notice-message" v-else-if="showMsg">The number of units occupied can't be larger than the number of units.</span> -->
              </ValidationProvider>
            </div>
            <div
              v-if="parseInt(numberUnit) !== parseInt(numberUnitOccupied)"
              class="input-holder"
            >
              <!-- if the number of units occupied is = to the number of units, then this question should not show up. -->
              <label class="input-label">Square footage occupied*</label>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="error-message-holder error-message-holder--block"
              >
                <input
                  v-model="squareFootageOccupied"
                  type="text"
                  placeholder="E.g. 55"
                  @change="changeform(), allowOnlyNumbers($event)"
                  @keydown="allowOnlyNumbers($event)"
                  @wheel="$event.target.blur()"
                  @keyup="footageOccupiedCheck($event, false)"
                />
                <span
                  v-if="errors[0]"
                  class="error-message"
                >{{
                  errors[0]
                }}</span>
                <span
                  v-else-if="showMsgOcc"
                  class="notice-message"
                >The entered value must not exceed the total square
                  footage</span>
              </ValidationProvider>
            </div>
          </div>
        </template>

        <!-- Land Fields -->
        <div
          v-if="checkShow('LAND')"
          class="cf-form-block__sec cf-form-block__sec--wrap"
        >
          <div class="input-holder">
            <label class="input-label">Proposed use *</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="error-message-holder error-message-holder--block"
            >
              <input
                v-model="proposedUse"
                type="text"
                @change="changeform()"
              />
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="input-holder">
            <label class="input-label">Why would this be a good deal for lenders to pursue?*</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="error-message-holder error-message-holder--block"
            >
              <textarea
                v-model="noteToLender"
                rows="5"
                placeholder="(1-2 sentences)"
                @change="changeform()"
              />
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { ValidationProvider, ValidationObserver, extend } from "vee-validate"
/* eslint-disable */
import { required } from "vee-validate/dist/rules";
import { allowOnlyNumbersGlobal, errorScroll } from "@/config/util";

extend("required", {
  ...required,
  message: "This field is required",
});

interface Data {
  title: string;
  propType: string;
  showSplitForm: boolean;
  change: boolean;
  mixedUse;

  retailAmount: string;
  retailSquare: string;
  retailType: string;
  retailNumberOfUnitsOccupied: string;
  retailSquareFootageOccupied: string;

  multiAmount: string;
  multiSquare: string;
  multiNumberOfUnitsOccupied: string;
  multiSquareFootageOccupied: string;

  officeAmount: string;
  officeSquare: string;
  officeNumberOfUnitsOccupied: string;
  officeSquareFootageOccupied: string;

  warehouseAmount: string;
  warehouseSquare: string;
  warehouseNumberOfUnitsOccupied: string;
  warehouseSquareFootageOccupied: string;

  numberUnit: string;
  numberUnitOccupied: string;
  squareFootage: string;
  squareFootageOccupied: string;

  validationError: boolean;
  validationError2: boolean;

  showMsg: boolean;
  showMsgOcc: boolean;

  selectedType: string;

  proposedUse: string;
  noteToLender: string;

  changeProperty: boolean;

  retailFlagForFootageOccupied: boolean;
  multiFlagForFootageOccupied: boolean;
  officeFlagForFootageOccupied: boolean;
  warehouseFlagForFootageOccupied: boolean;
  retailNumberOfUnitsOccupiedError: boolean;
  warehouseSquareFootageOccupiedError: boolean;
  multiNumberOfUnitsOccupiedError: boolean;
  warehouseNumberOfUnitsOccupiedError: boolean;
  officeNumberOfUnitsOccupiedError: boolean;
  multiSquareFootageOccupiedError: boolean;
  officeSquareFootageOccupiedError: boolean;
  retailSquareFootageOccupiedError: boolean;

  amountOfUnits: string;
  rentableSellable: string;
  retailFloors: string;
  multiAmountOfUnits: string;
  multiRentableSellable: string;
  multiFloors: string;
  officeAmountOfunits: string;
  officeRentableSellable: string;
  officeFloors: string;
  industrialAmountOfUnits: string;
  industrialRentableSellable: string;
  industrialFloors: string;

  numOfUnitsLess: boolean;
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
    land: {
      type: Boolean,
      default: true,
    },
    construct: {
      type: Boolean,
    },
  },

  data(): Data {
    return {
      title: 'This is title of "BlockCreateDealPropertyTypeInvestment"!',
      showSplitForm: false,
      change: false,

      propType: "",
      mixedUse: [],
      retailAmount: "",
      retailSquare: "",
      retailType: "",
      retailNumberOfUnitsOccupied: "",
      retailSquareFootageOccupied: "",

      multiAmount: "",
      multiSquare: "",
      multiNumberOfUnitsOccupied: "",
      multiSquareFootageOccupied: "",

      officeAmount: "",
      officeSquare: "",
      officeNumberOfUnitsOccupied: "",
      officeSquareFootageOccupied: "",

      warehouseAmount: "",
      warehouseSquare: "",
      warehouseNumberOfUnitsOccupied: "",
      warehouseSquareFootageOccupied: "",

      numberUnit: "",
      numberUnitOccupied: "",
      squareFootage: "",
      squareFootageOccupied: "",

      validationError: false,
      validationError2: false,

      showMsg: false,
      showMsgOcc: false,

      selectedType: "",

      proposedUse: "",
      noteToLender: "",

      changeProperty: false,

      retailFlagForFootageOccupied: true,
      multiFlagForFootageOccupied: true,
      officeFlagForFootageOccupied: true,
      warehouseFlagForFootageOccupied: true,
      retailNumberOfUnitsOccupiedError: false,
      warehouseSquareFootageOccupiedError: false,
      multiNumberOfUnitsOccupiedError: false,
      warehouseNumberOfUnitsOccupiedError: false,
      officeNumberOfUnitsOccupiedError: false,
      officeSquareFootageOccupiedError: false,
      multiSquareFootageOccupiedError: false,
      retailSquareFootageOccupiedError: false,

      amountOfUnits: "",
      rentableSellable: "",
      retailFloors: "",
      multiAmountOfUnits: "",
      multiRentableSellable: "",
      multiFloors: "",
      officeAmountOfunits: "",
      officeRentableSellable: "",
      officeFloors: "",
      industrialAmountOfUnits: "",
      industrialRentableSellable: "",
      industrialFloors: "",

      numOfUnitsLess: false,
    };
  },
  mounted() {
    this.setFields();
    this.$store.dispatch("ui", { overlay: false });
    this.numOfUnitsValidation();
  },
  computed: {
    investment() {
      return this.$store.getters.getInvestment;
    },
    id() {
      return this.$store.getters.getId;
    },
    propertyTypes() {
      return this.$store.getters.getPropertyType;
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  watch: {
    retailAmount: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => {
          this.retailAmount = result;
          this.retailNumberOfUnitsOccupied = "";
          this.retailSquareFootageOccupied = "";
        });
      }
    },
    retailNumberOfUnitsOccupied: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(async () => {
          await this.equalOrLess(
            "retailNumberOfUnitsOccupied",
            "retailAmount",
            result,
            "retailSquareFootageOccupied",
            "retailFlagForFootageOccupied"
          );
        });
      }
    },
    retailSquare: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => (this.retailSquare = result));
      }
    },
    retailSquareFootageOccupied: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(async () => {
          await this.footageEqualOrLess(
            "retailSquareFootageOccupied",
            "retailSquare",
            result
          );
        });
      }
    },
    multiAmount: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => {
          this.multiAmount = result;
          this.multiNumberOfUnitsOccupied = "";
          this.multiSquareFootageOccupied = "";
        });
      }
    },
    multiNumberOfUnitsOccupied: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(async () => {
          await this.equalOrLess(
            "multiNumberOfUnitsOccupied",
            "multiAmount",
            result,
            "multiSquareFootageOccupied",
            "multiFlagForFootageOccupied"
          );
        });
      }
    },
    multiSquare: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => (this.multiSquare = result));
      }
    },
    multiSquareFootageOccupied: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(async () => {
          await this.footageEqualOrLess(
            "multiSquareFootageOccupied",
            "multiSquare",
            result
          );
        });
      }
    },
    officeAmount: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => {
          this.officeAmount = result;
          this.officeNumberOfUnitsOccupied = "";
          this.officeSquareFootageOccupied = "";
        });
      }
    },
    officeNumberOfUnitsOccupied: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(async () => {
          await this.equalOrLess(
            "officeNumberOfUnitsOccupied",
            "officeAmount",
            result,
            "officeSquareFootageOccupied",
            "officeFlagForFootageOccupied"
          );
        });
      }
    },
    officeSquare: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => (this.officeSquare = result));
      }
    },
    officeSquareFootageOccupied: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(async () => {
          await this.footageEqualOrLess(
            "officeSquareFootageOccupied",
            "officeSquare",
            result
          );
        });
      }
    },
    warehouseAmount: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => {
          this.warehouseAmount = result;
          this.warehouseNumberOfUnitsOccupied = "";
          this.warehouseSquareFootageOccupied = "";
        });
      }
    },
    warehouseNumberOfUnitsOccupied: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(async () => {
          await this.equalOrLess(
            "warehouseNumberOfUnitsOccupied",
            "warehouseAmount",
            result,
            "warehouseSquareFootageOccupied",
            "warehouseFlagForFootageOccupied"
          );
        });
      }
    },
    warehouseSquare: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => (this.warehouseSquare = result));
      }
    },
    warehouseSquareFootageOccupied: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(async () => {
          await this.footageEqualOrLess(
            "warehouseSquareFootageOccupied",
            "warehouseSquare",
            result
          );
        });
      }
    },
    numberUnit: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => (this.numberUnit = result));
      }
    },
    numberUnitOccupied: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => (this.numberUnitOccupied = result));
      }
    },

    squareFootage: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => (this.squareFootage = result));
      }
    },

    squareFootageOccupied: function (newValue) {
      if (newValue) {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        Vue.nextTick(() => (this.squareFootageOccupied = result));
      }
    },
  },

  methods: {
    numOfUnitsValidation(data) {
      if (parseInt(data) < 4) {
        this.numOfUnitsLess = true;
      } else {
        this.numOfUnitsLess = false;
      }
      return this.numOfUnitsLess;
    },

    equalOrLess(e, flag, resultValue, footage, error) {
      const regex = /[.,\s]/g;
      const result = this[flag].replace(regex, "");
      const match = resultValue.replace(regex, "");
      if (parseInt(match) > parseInt(result)) {
        setTimeout(() => {
          this[e] = this[flag];
        }, 300);
        this[error] = false;
        this[footage] = "";
        this[e + "Error"] = true;
      } else {
        this[e] = resultValue;
        this[error] = true;
      }

      if (parseInt(match) === parseInt(result)) {
        this[error] = false;
        this[footage] = "";

        setTimeout(() => {
          this[e + "Error"] = false;
        }, 3000);
      }
    },
    footageEqualOrLess(e, flag, resultValue) {
      const regex = /[.,\s]/g;
      const result = this[flag].replace(regex, "");
      const match = resultValue.replace(regex, "");
      if (parseInt(match) > parseInt(result)) {
        setTimeout(() => {
          this[e] = this[flag];
        }, 300);

        this[e + "Error"] = true;
      } else {
        this[e] = resultValue;
        setTimeout(() => {
          this[e + "Error"] = false;
        }, 3000);
      }
    },
    changePropertyMethod() {
      this.changeProperty = true;
    },
    async validationFrom() {
      const success = await this.$refs.propTypeInvestmentForm.validate();
      if (this.propType === "MIXEDUSE") {
        if (this.mixedUse.length === 0) {
          this.validationError2 = true;
          return false;
        }
      }

      // if (this.propType === "MIXEDUSE" && this.mixedUse.includes('MULTIFAMILY')) {
      //     if(this.numOfUnitsValidation(this.multiAmountOfUnits)) {
      //         return;
      //     }
      // }

      if (
        this.propType === "" ||
        this.propType === null ||
        this.propType === "UNDEFINED"
      ) {
        this.validationError = true;
        return false;
      }

      if (!success) {
        return false;
      }

      return true;
    },

    removeValFrom(flag) {
      const n = this.mixedUse.includes(flag);
      if (!n) {
        switch (flag) {
          case "RETAIL":
            this.retailAmount = "";
            this.retailSquare = "";
            this.retailType = "";
            this.retailNumberOfUnitsOccupied = "";
            this.retailSquareFootageOccupied = "";
            this.retailType = "";

            this.amountOfUnits = "";
            this.rentableSellable = "";
            this.retailFloors = "";
            break;
          case "MULTIFAMILY":
            this.multiAmount = "";
            this.multiSquare = "";
            this.multiNumberOfUnitsOccupied = "";
            this.multiSquareFootageOccupied = "";

            this.multiAmountOfUnits = "";
            this.multiRentableSellable = "";
            this.multiFloors = "";
            break;
          case "OFFICE":
            this.officeAmount = "";
            this.officeSquare = "";
            this.officeNumberOfUnitsOccupied = "";
            this.officeSquareFootageOccupied = "";

            this.officeAmountOfunits = "";
            this.officeRentableSellable = "";
            this.officeFloors = "";
            break;
          case "INDUSTRIAL":
            this.warehouseAmount = "";
            this.warehouseSquare = "";
            this.warehouseNumberOfUnitsOccupied = "";
            this.warehouseSquareFootageOccupied = "";

            this.industrialAmountOfUnits = "";
            this.industrialRentableSellable = "";
            this.industrialFloors = "";
            break;

          default:
            break;
        }
        this.$emit("clearValMixed", flag);
      }
    },
    removeValue(flag) {
      // if(flag !== 'RETAIL') {
      //     this.retailType = '';
      // }

      if (flag !== "LAND") {
        this.proposedUse = "";
        this.noteToLender = "";
      }

      if (flag !== "MIXEDUSE") {
        this.mixedUse = [];
        this.retailAmount = "";
        this.retailSquare = "";
        this.retailNumberOfUnitsOccupied = "";
        this.retailSquareFootageOccupied = "";
        this.retailType = "";
        this.multiAmount = "";
        this.multiSquare = "";
        this.multiNumberOfUnitsOccupied = "";
        this.multiSquareFootageOccupied = "";
        this.officeAmount = "";
        this.officeSquare = "";
        this.officeNumberOfUnitsOccupied = "";
        this.officeSquareFootageOccupied = "";
        this.warehouseAmount = "";
        this.warehouseSquare = "";
        this.warehouseNumberOfUnitsOccupied = "";
        this.warehouseSquareFootageOccupied = "";
      }

      if (flag === "MIXEDUSE") {
        this.amountOfUnits = "";
        this.rentableSellable = "";
        this.retailFloors = "";
        this.multiAmountOfUnits = "";
        this.multiRentableSellable = "";
        this.multiFloors = "";
        this.officeAmountOfunits = "";
        this.officeRentableSellable = "";
        this.officeFloors = "";
        this.industrialAmountOfUnits = "";
        this.industrialRentableSellable = "";
        this.industrialFloors = "";
      }

      if (flag === "MIXEDUSE" || flag === "LAND") {
        this.numberUnit = "";
        this.numberUnitOccupied = "";
        this.squareFootage = "";
        this.squareFootageOccupied = "";
        this.$emit("clearMixedUseOrLand");
      }

      this.$emit("clearPropertyType");
    },
    async next() {
      const success = await this.$refs.propTypeInvestmentForm.validate();
      errorScroll();

      if (
        this.propType === "" ||
        this.propType === null ||
        this.propType === "UNDEFINED"
      ) {
        this.validationError = true;

        if (!success) {
          return;
        }
        return;
      }

      if (this.propType === "MULTIFAMILY" && this.numberUnit < 4) {
        this.numOfUnitsLess = true;
        return;
      } else {
        this.numOfUnitsLess = false;
      }

      // if(this.propType === 'MIXEDUSE') {
      //     if (this.mixedUse.includes('MULTIFAMILY') && this.multiAmount < 4) {
      //         this.numOfUnitsLess = true;
      //         return;
      //     } else {
      //         this.numOfUnitsLess = false;
      //     }
      // }

      if (this.propType === "MIXEDUSE") {
        if (this.mixedUse.length === 0) {
          this.validationError2 = true;

          if (!success) {
            return;
          }
          return;
        }
      }

      if (!success) {
        return;
      }

      if (this.change) {
        await this.$store.dispatch(
          "setBrokerDealInvestment",
          this.createObject()
        );

        if (this.changeProperty) {
          await this.$store.dispatch("getDealById", {
            id: this.$route.params.deal,
          });
          this.changeProperty = false;
        }

        if (this.propType === "LAND") {
          return "dealSponsor";
        }

        return this.nextAction;
      } else {
        if (this.propType === "LAND") {
          return "dealSponsor";
        }

        if (this.investment) {
          return this.nextAction;
        }
      }
    },
    skip() {
      return this.skipAction;
    },
    prev() {
      return this.prevAction;
    },
    createObject() {
      return {
        propType: this.propType,
        mixedUse: this.mixedUse,
        retailAmount: this.retailAmount,
        retailSquare: this.retailSquare,
        retailType: this.retailType,
        retailNumberOfUnitsOccupied: this.retailNumberOfUnitsOccupied,
        retailSquareFootageOccupied: this.retailSquareFootageOccupied,
        multiAmount: this.multiAmount,
        multiSquare: this.multiSquare,
        multiNumberOfUnitsOccupied: this.multiNumberOfUnitsOccupied,
        multiSquareFootageOccupied: this.multiSquareFootageOccupied,
        officeAmount: this.officeAmount,
        officeSquare: this.officeSquare,
        officeNumberOfUnitsOccupied: this.officeNumberOfUnitsOccupied,
        officeSquareFootageOccupied: this.officeSquareFootageOccupied,
        warehouseAmount: this.warehouseAmount,
        warehouseSquare: this.warehouseSquare,
        warehouseNumberOfUnitsOccupied: this.warehouseNumberOfUnitsOccupied,
        warehouseSquareFootageOccupied: this.warehouseSquareFootageOccupied,
        numberUnit: this.numberUnit,
        numberUnitOccupied: this.numberUnitOccupied,
        squareFootage: this.squareFootage,
        squareFootageOccupied: this.squareFootageOccupied
          ? this.squareFootageOccupied.toString()
          : this.squareFootageOccupied,
        proposedUse: this.proposedUse,
        noteToLender: this.noteToLender,
        step: "dealPropertyTypeInvestment",

        amountOfUnits: this.amountOfUnits,
        rentableSellable: this.rentableSellable,
        retailFloors: this.retailFloors,
        multiAmountOfUnits: this.multiAmountOfUnits,
        multiRentableSellable: this.multiRentableSellable,
        multiFloors: this.multiFloors,
        officeAmountOfunits: this.officeAmountOfunits,
        officeRentableSellable: this.officeRentableSellable,
        officeFloors: this.officeFloors,
        industrialAmountOfUnits: this.industrialAmountOfUnits,
        industrialRentableSellable: this.industrialRentableSellable,
        industrialFloors: this.industrialFloors,
      };
    },
    setFields() {
      if (this.investment) {
        this.propType = this.investment.propType;
        this.mixedUse = this.investment.mixedUse;
        this.retailAmount = this.investment.retailAmount;
        this.retailSquare = this.investment.retailSquare;
        this.retailType = this.investment.retailType;
        (this.retailNumberOfUnitsOccupied =
          this.investment.retailNumberOfUnitsOccupied),
          (this.retailSquareFootageOccupied =
            this.investment.retailSquareFootageOccupied),
          (this.multiAmount = this.investment.multiAmount);
        this.multiSquare = this.investment.multiSquare;
        (this.multiNumberOfUnitsOccupied =
          this.investment.multiNumberOfUnitsOccupied),
          (this.multiSquareFootageOccupied =
            this.investment.multiSquareFootageOccupied),
          (this.officeAmount = this.investment.officeAmount);
        this.officeSquare = this.investment.officeSquare;
        (this.officeNumberOfUnitsOccupied =
          this.investment.officeNumberOfUnitsOccupied),
          (this.officeSquareFootageOccupied =
            this.investment.officeSquareFootageOccupied),
          (this.warehouseAmount = this.investment.warehouseAmount);
        this.warehouseSquare = this.investment.warehouseSquare;
        (this.warehouseNumberOfUnitsOccupied =
          this.investment.warehouseNumberOfUnitsOccupied),
          (this.warehouseSquareFootageOccupied =
            this.investment.warehouseSquareFootageOccupied),
          (this.numberUnit = this.investment.numberUnit);
        this.numberUnitOccupied = this.investment.numberUnitOccupied;
        this.squareFootage = this.investment.squareFootage;
        this.squareFootageOccupied = this.investment.squareFootageOccupied;
        this.proposedUse = this.investment.proposedUse;
        this.noteToLender = this.investment.noteToLender;
        this.changePropType();
        this.$emit("propTypeCheck", this.mixedUse);

        this.amountOfUnits = this.investment.amountOfUnits;
        this.rentableSellable = this.investment.rentableSellable;
        this.retailFloors = this.investment.retailFloors;
        this.multiAmountOfUnits = this.investment.multiAmountOfUnits;
        this.multiRentableSellable = this.investment.multiRentableSellable;
        this.multiFloors = this.investment.multiFloors;
        this.officeAmountOfunits = this.investment.officeAmountOfunits;
        this.officeRentableSellable = this.investment.officeRentableSellable;
        this.officeFloors = this.investment.officeFloors;
        this.industrialAmountOfUnits = this.investment.industrialAmountOfUnits;
        this.industrialRentableSellable =
          this.investment.industrialRentableSellable;
        this.industrialFloors = this.investment.industrialFloors;
      }
    },
    /** on change form field set tu true */
    changeform() {
      this.change = true;
    },
    changePropType() {
      this.$emit("propType", this.propType);
    },
    /**
     * @author Nikola Popov
     * @description if state for all cases
     */
    checkShow(flag) {
      if (this.propType !== "") {
        this.showSplitForm = true;
      }

      // if( flag === 'MULTIFAMILY') {
      //     this.numberUnit = '';
      // }

      if (this.checkBox(flag)) return true;

      if (this.propType === flag) {
        return true;
      } else {
        return false;
      }
    },
    checkShowRetail() {
      if (this.propType === "MIXEDUSE" && this.mixedUse.includes("RETAIL")) {
        return true;
      } else {
        return false;
      }
    },
    checkBox(flag) {
      if (
        this.propType === "MIXEDUSE" &&
        this.mixedUse.includes("RETAIL") &&
        flag === "RETAIL"
      ) {
        return true;
      } else if (
        this.propType === "MIXEDUSE" &&
        this.mixedUse.includes("MULTIFAMILY") &&
        flag === "MULTIFAMILY"
      ) {
        return true;
      } else if (
        this.propType === "MIXEDUSE" &&
        this.mixedUse.includes("OFFICE") &&
        flag === "OFFICE"
      ) {
        return true;
      } else if (
        this.propType === "MIXEDUSE" &&
        this.mixedUse.includes("INDUSTRIAL") &&
        flag === "INDUSTRIAL"
      ) {
        return true;
      }
    },
    allowOnlyNumbers(event) {
      allowOnlyNumbersGlobal(event);
    },
    occupiedCheck(e, flag) {
      if (flag) {
        if (this.numberUnitOccupied !== "") {
          if (parseInt(this.numberUnitOccupied) >= parseInt(e.target.value)) {
            this.numberUnitOccupied = this.numberUnit;
          }
        }
      } else {
        if (this.numberUnit !== "") {
          if (
            parseInt(e.target.value.replace(/,/g, ""), 10) >
            parseInt(this.numberUnit.replace(/,/g, ""), 10)
          ) {
            this.numberUnitOccupied = this.numberUnit;
            this.showMsg = true;

            setTimeout(() => {
              this.showMsg = false;
            }, 3000);
          } else {
            this.showMsg = false;
          }
        }
      }
    },
    footageOccupiedCheck(e, flag) {
      if (flag) {
        if (this.squareFootageOccupied !== "" && this.squareFootageOccupied !== null) {
          if (
            parseInt(this.squareFootageOccupied.replace(/,/g, ""), 10) >=
            parseInt(e.target.value.replace(/,/g, ""), 10)
          ) {
            this.squareFootageOccupied = this.squareFootage;
          }
        }
      } else {
        if (this.squareFootage !== "") {
          if (
            parseInt(e.target.value.replace(/,/g, ""), 10) >=
            parseInt(this.squareFootage.replace(/,/g, ""), 10)
          ) {
            (this.squareFootageOccupied = this.squareFootage.replace(/,/g, "")),
              10 - 1;
            this.showMsgOcc = true;

            setTimeout(() => {
              this.showMsgOcc = false;
            }, 3000);
          }
        }
      }
    },

    isChecked(event) {
      const _self = event.currentTarget;
      const currentText = _self.nextSibling.textContent;

      this.selectedType = currentText;
    },
  },
});
</script>

<style lang="scss" scoped>
.cf-form-block__sec {
  margin-bottom: 50px;

  @include mq($sm) {
    margin-bottom: 20px;
  }
}

.cf-form-block__sec--wrap {
  width: 100%;
  // max-width: 630px;
}

.form-split--mixed {
  background-color: #f0f7f7;
  padding: 33px 33px 41px;
  margin-bottom: 1px;

  @include mq(1024px) {
    padding: 20px 20px 45px;
  }

  .input-holder__retail-type {
    @include mq(1024px) {
      max-width: 600px;
    }
  }
}

.cf-form__sub-title {
  margin-bottom: 15px;
}

.form-split__title {
  color: $mosque;
}

.form-highlight {
  margin-bottom: 1px;
}

.form-split__input-holder-col {
  position: relative;
}

.units-occupied-notice {
  bottom: 0px;
  left: 15px;
  font-size: 12px;

  @include mq(767px) {
    left: 0;
    br {
      display: none;
    }
  }
}

.input-holder__retail-type {
  max-width: 600px;

  @include mq(1024px) {
    max-width: 630px;
  }
}
</style>
