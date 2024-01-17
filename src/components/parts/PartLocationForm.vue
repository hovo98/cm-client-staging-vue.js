<template>
  <form class="location-form">
    <ValidationObserver
      ref="locationObserver"
      v-slot="{ invalid }"
    >
      <div :class="['input-holder', invalid ? '' : null]">
        <label class="input-label">Address*</label>
        <div
          rules="required"
          class="error-message-holder error-message-holder--block"
        >
          <input
            style="display: none"
            type="text"
            placeholder=""
          />
          <GmapAutocomplete
            ref="autocompleteAddress"
            :options="{
              types: ['address'],
              componentRestrictions: { country: 'us' },
            }"
            placeholder=""
            :value="address"
            data="autocomplete"
            :autocomplete="AutocompleteOFF"
            @place_changed="updateAddress"
          />
          <span
            v-show="validationError"
            class="error-message"
          >This field is required</span>
        </div>
      </div>
      <div class="input-holder">
        <label class="input-label">Street Address Line 2</label>
        <input
          v-model="address1"
          type="text"
          placeholder=""
          @change="$emit('changeform')"
        />
      </div>
      <div class="row input-holder-wrap">
        <div class="input-holder col-md-6">
          <label class="input-label">City*</label>
          <div
            rules="required"
            class="error-message-holder error-message-holder--block"
          >
            <input
              v-if="cityReadOnly"
              v-model="city"
              type="text"
              placeholder=""
              class="readonly"
              autocomplete="chrome-off"
            />
            <input
              v-else
              v-model="city"
              type="text"
              autocomplete="chrome-off"
              @keyup="search2($event)"
              @blur="loseFocus('predictionsToShow2')"
            />

            <ul
              v-if="predictionsToShow2"
              class="autocomplete-loc__list"
            >
              <template v-for="(prediction, newIndex) in predictionsBlock2">
                <li
                  :key="newIndex"
                  :class="{ 'active-item': curentItem2 === newIndex }"
                  class="autocomplete-loc__list-item"
                  @click="geocodeAddress2(prediction)"
                >
                  {{ prediction.description }}
                </li>
              </template>
            </ul>
            <span
              v-show="cityError"
              class="error-message"
            >This field is required</span>
          </div>
        </div>
        <div class="input-holder col-md-6">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="error-message-holder error-message-holder--block"
          >
            <label class="input-label">State*</label>
            <input
              v-model="state"
              type="text"
              :class="stateReadOnly ? 'readonly' : ''"
              :tabindex="stateReadOnly && address ? '3201' : ''"
            />
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
      <div class="input-holder">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="error-message-holder error-message-holder--block"
        >
          <label class="input-label">Postal code*</label>
          <input
            v-model="postal_code"
            type="text"
            minlength="5"
            :class="postalReadOnly ? 'readonly' : ''"
            :tabindex="postalReadOnly && address ? '3202' : ''"
            autocomplete="chrome-off"
            @change="$emit('changeform')"
          />
          <span class="error-message">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div :class="['input-holder', invalid ? '' : null]">
        <label
          v-if="countyStar"
          class="input-label"
        >County*</label>
        <label
          v-else
          class="input-label"
        >County</label>
        <div
          rules="required"
          class="error-message-holder error-message-holder--block"
        >
          <input
            v-model="county"
            type="text"
            placeholder=""
            class="readonly"
          />
          <!-- <input type="text"
                        v-else
                        v-model="county"
                        @keyup="search($event)"
                        @blur="loseFocus('predictionsToShow')"
                    >

                    <ul class="autocomplete-loc__list" v-if="predictionsToShow">
                        <template v-for="(prediction, newIndex) in predictionsBlock">
                            <li :class='{"active-item": curentItem === newIndex}' class="autocomplete-loc__list-item" :key="newIndex" @click="geocodeAddress(prediction)">
                                {{prediction.description}}
                            </li>
                        </template>
                    </ul>
                    <span class="error-message" v-show="countyError">This field is required</span> -->
        </div>
      </div>
      <GmapMap
        style="display: none"
        :center="{ lat: 37.09024, lng: -95.712891 }"
        :zoom="4"
      />
    </ValidationObserver>
  </form>
</template>

<script lang="ts">
import Vue from "vue"
import SvgIcon from "@/components/base/SvgIcon/SvgIcon.vue"
import { ValidationProvider, ValidationObserver, extend } from "vee-validate"
import { gmapApi } from "vue2-google-maps"
/* eslint-disable */
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required",
});

extend("min", {
  validate(password, args) {
    return password.length >= args.length;
  },
  params: ["length"],
  message: "The field must have at least {length} characters",
});

interface Data {
  title: string;
  address: string;
  address1: string;
  city: string;
  state: string;
  place_id: string;
  county: string;
  street: string;
  postal_code: string;
  sublocality: string;
  predictionsShow: boolean;
  predictions;
  validationError: boolean;
  vicinity: string;
  cityReadOnly: boolean;
  countyReadOnly: boolean;
  stateReadOnly: boolean;
  postalReadOnly: boolean;
  requiredValidation: boolean;
  AutocompleteOFF: string;
  predictionsBlock;
  predictionsBlock2;
  lat: string;
  long: string;
  curentItem: number;
  curentItem2: number;
  predictionsToShow: boolean;
  predictionsToShow2: boolean;
  cityError: boolean;
  countyError: boolean;
  countyStar: boolean;
}

export default Vue.extend({
  props: ["proportyInfo"],

  data(): Data {
    return {
      title: 'This is title of "PartLocationForm"!',
      address: "",
      address1: "",
      city: "",
      state: "",
      postal_code: "",
      lat: "",
      long: "",
      place_id: "",
      county: "",
      street: "",
      sublocality: "",
      predictionsShow: false,
      predictions: [],
      validationError: false,
      vicinity: "",
      cityReadOnly: true,
      countyReadOnly: true,
      stateReadOnly: true,
      postalReadOnly: true,
      requiredValidation: false,
      AutocompleteOFF: "nopes",
      predictionsBlock: [],
      predictionsBlock2: [],
      curentItem: -1,
      curentItem2: -1,
      predictionsToShow: true,
      predictionsToShow2: true,
      cityError: false,
      countyError: false,
      countyStar: true,
    };
  },

  components: {
    SvgIcon,
    ValidationProvider,
    ValidationObserver,
  },

  computed: {
    google: gmapApi,
  },

  mounted() {
    this.setField();
    this.replaceAutocomplete();
  },

  watch: {
    proportyInfo() {
      if (!this.proportyInfo) {
        this.address = "";
        this.address1 = "";
        this.city = "";
        this.state = "";
        this.postal_code = "";
        this.place_id = "";
        this.lat = "";
        this.long = "";
        this.county = "";
        this.street = "";
        this.sublocality = "";
      }
    },
  },

  methods: {
    cityErrorVal() {
      this.cityError = true;
    },
    countyErrorVal() {
      this.countyError = true;
    },
    loseFocus(flag) {
      setTimeout(() => {
        this[flag] = false;
      }, 400);
    },
    geocodeAddress(prediction) {
      let geocoder = new this.google.maps.Geocoder();
      geocoder.geocode({ placeId: prediction.place_id }, (results, status) => {
        const parseAddressComponents = this.setNewBlock(results[0]);
        if (parseAddressComponents.county !== "") {
          this.county = parseAddressComponents.county;
        }
      });
    },
    geocodeAddress2(prediction) {
      let geocoder = new this.google.maps.Geocoder();
      geocoder.geocode({ placeId: prediction.place_id }, (results, status) => {
        const parseAddressComponents = this.setNewBlock(results[0]);
        if (parseAddressComponents.city !== "") {
          this.city = parseAddressComponents.city;
          if (this.county === "") {
            this.county = parseAddressComponents.county;
          }
        }
      });
    },
    search(e) {
      this.countyError = false;
      if (e.target.value === "") {
        this.county = "";
        return false;
      }

      if (e.keyCode === 38 && this.curentItem >= 0) {
        this.curentItem--;
        return false;
      } else if (
        e.keyCode == 40 &&
        this.curentItem < this.predictionsBlock.length
      ) {
        this.curentItem++;
        return false;
      }

      if (e.keyCode === 13 && this.curentItem > -1) {
        this.geocodeAddress(this.predictionsBlock[this.curentItem]);
        this.predictionsToShow = false;
        this.curentItem = -1;
        return false;
      }

      this.predictionsToShow = true;
      const displaySuggestions = (predictions, status) => {
        this.predictionsBlock = predictions;
      };
      const service = new this.google.maps.places.AutocompleteService();
      const val = this.state + " " + this.city + " " + e.target.value;
      service.getPlacePredictions(
        {
          input: val,
          types: ["(regions)"],
          componentRestrictions: {
            country: "us",
          },
        },
        displaySuggestions
      );
    },
    search2(e) {
      this.cityError = false;
      if (e.target.value === "") {
        this.city = "";
        return false;
      }

      if (e.keyCode === 38 && this.curentItem2 >= 0) {
        this.curentItem2--;
        return false;
      } else if (
        e.keyCode == 40 &&
        this.curentItem2 < this.predictionsBlock2.length
      ) {
        this.curentItem2++;
        return false;
      }

      if (e.keyCode === 13 && this.curentItem2 > -1) {
        this.geocodeAddress2(this.predictionsBlock2[this.curentItem2]);
        this.predictionsToShow2 = false;
        this.curentItem2 = -1;
        return false;
      }

      this.predictionsToShow2 = true;
      const displaySuggestions = (predictions, status) => {
        this.predictionsBlock2 = predictions;
      };
      const service = new this.google.maps.places.AutocompleteService();
      const val = this.state + " " + e.target.value;
      service.getPlacePredictions(
        {
          input: val,
          types: ["(cities)"],
          componentRestrictions: {
            country: "us",
          },
        },
        displaySuggestions
      );
    },
    updateCounty(place) {
      const parseAddressComponents = this.setNewBlock(place);
      this.county = parseAddressComponents.county;
    },
    updateAddress(place) {
      this.countyStar = true;
      const parseAddressComponents = this.setNewBlock(place);
      this.$emit("changeform");
      this.place_id = place.place_id;
      this.address = place.name;
      this.vicinity = place.vicinity;
      this.sublocality = parseAddressComponents.sublocality;
      this.city = parseAddressComponents.city;
      this.state = parseAddressComponents.state;
      this.county = parseAddressComponents.county;
      this.postal_code = "";
      this.street = parseAddressComponents.street;
      const componentForm = {
        locality: "long_name",
        administrative_area_level_1: "long_name",
        sublocality_level_1: "long_name",
        postal_code: "short_name",
      };
      for (const component of place.address_components) {
        const addressType = component.types[0];
        if (componentForm[addressType]) {
          const val = component[componentForm[addressType]];
          switch (addressType) {
            case "locality":
              this.city = val;
              break;
            case "sublocality_level_1":
              if (this.city === "") {
                this.city = val;
              }
              break;
            // case 'administrative_area_level_1':
            //     this.state = val;
            //     break;
            case "postal_code":
              this.postal_code = val;
              break;
          }
        }
      }

      this.city === ""
        ? (this.cityReadOnly = false)
        : (this.cityReadOnly = true);

      this.state === ""
        ? (this.stateReadOnly = false)
        : (this.stateReadOnly = true);

      this.postal_code === ""
        ? (this.postalReadOnly = false)
        : (this.postalReadOnly = true);

      this.county === ""
        ? (this.countyReadOnly = false)
        : (this.countyReadOnly = true);

      if (this.city !== "" && this.county === "") {
        this.callForCounty();
      }

      this.lat = place.geometry.location.lat();
      this.long = place.geometry.location.lng();
    },

    callForCounty() {
      const displaySuggestions = async (predictions, status) => {
        await this.geocodeAddress(predictions[0]);
        if (this.county === "") {
          this.countyStar = false;
        }
      };
      const service = new this.google.maps.places.AutocompleteService();
      const val = this.city;
      service.getPlacePredictions(
        {
          input: val,
          types: ["(cities)"],
          componentRestrictions: {
            country: "us",
          },
        },
        displaySuggestions
      );
    },

    createObject() {
      return {
        address: this.address,
        address1: this.address1,
        city: this.city,
        state: this.state,
        postal_code: this.postal_code,
        place_id: this.place_id,
        sublocality: this.sublocality,
        lat: this.lat,
        long: this.long,
        county: this.county,
        street: this.street,
      };
    },
    async formValidation() {
      const isValid = await this.$refs.locationObserver.validate();

      if (!isValid) {
        return;
      }

      if (this.address === "") {
        this.validationError = true;
        return false;
      } else {
        this.validationError = false;
        return true;
      }
    },
    setField() {
      if (this.proportyInfo) {
        this.address = this.proportyInfo.street_address;
        this.address1 = this.proportyInfo.street_address_2;
        this.city = this.proportyInfo.city;
        this.state = this.proportyInfo.state;
        this.postal_code = this.proportyInfo.zip_code;
        this.place_id = this.proportyInfo.place_id;
        this.lat = this.proportyInfo.lat;
        this.long = this.proportyInfo.long;
        if (this.county === "") {
          this.countyStar = false;
        }
        this.county = this.proportyInfo.county;
        this.street = this.proportyInfo.street;
        this.sublocality = this.proportyInfo.sublocality;
      }
    },
    replaceAutocomplete() {
      setTimeout(() => {
        this.AutocompleteOFF = "nope";
      }, 500);
    },
    setNewBlock(place) {
      const ShouldBeComponent = {
        street: ["street_address", "route"],
        sublocality: [
          "sublocality",
          "sublocality_level_1",
          "sublocality_level_2",
          "sublocality_level_3",
          "sublocality_level_4",
        ],
        city: ["locality"],
        county: ["administrative_area_level_2"],
        state: ["administrative_area_level_1"],
        country: ["country"],
      };

      var address = {
        state: "",
        street: "",
        county: "",
        sublocality: "",
        city: "",
        country: "",
        formatted_address: place.formatted_address,
        place_id: place.place_id,
        long_name: "",
        lat: "",
        long: "",
        polygon_location: "",
      };
      let address_components = place.address_components;
      if (address_components) {
        address_components.forEach((component) => {
          for (var shouldBe in ShouldBeComponent) {
            if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
              if (shouldBe === "country") {
                address[shouldBe] = component.long_name;
              } else {
                address[shouldBe] = component.long_name;
              }
            }
          }
        });
      }
      return address;
    },
  },
});
</script>

<style lang="scss" scoped></style>
