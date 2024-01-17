<template>
  <div class="manage-deal-half-wrapper">
    <div
      v-for="(obj, indexCity) in googleLocation"
      :key="indexCity"
      class="manage-deal-half preferences__fieldset--holder"
    >
      <div class="manage-deal-half__wrap">
        <div class="manage-deal-half-box">
          <div class="manage-deal-half-box-top">
            <p class="preferences__fieldset-half-box-text">
              Area {{ indexCity + 1 }}
            </p>
          </div>
          <form
            class="input-holder manage-deal-half-box-inputs error-message-holder"
            autocomplete="off"
            @submit.prevent=""
          >
            <div class="wrap-input-loader">
              <input
                :ref="'autoCity' + indexCity"
                v-model="obj.area.formatted_address"
                type="text"
                class="form-control pac-target-input"
                placeholder="Search by state, city, zip or county"
                autocomplete="off"
                @keyup="search($event, 'city', indexCity)"
                @blur="loseFocus('predictionsCityShow')"
              />
              <div
                v-if="showLoader === 'showLoader' + indexCity"
                class="wrap-input-loader__inner"
              >
                <img
                  src="@/assets/images/loader.gif"
                  alt="loader"
                />
              </div>
              <a
                v-if="obj.area.formatted_address"
                href="javascript:;"
                class="manage-deal-half-box-loc-remove"
                @click="removeLocation(indexCity)"
              >
                <SvgIcon
                  class="manage-deal-half-box-loc-remove__icon"
                  icon-name="ico-close-thin"
                />
              </a>
            </div>

            <ul
              v-if="predictionsCityShow === 'predictionsCityShow' + indexCity"
              ref="list"
              class="autocomplete-loc__list"
            >
              <template v-for="(prediction, newIndex) in predictionsCity">
                <li
                  :key="newIndex"
                  :class="{ 'active-item': curentItem === newIndex }"
                  class="autocomplete-loc__list-item"
                  @click="
                    geocodeAddress(prediction, 'predictionsCityShow', indexCity)
                  "
                >
                  {{ prediction.description }}
                </li>
              </template>
            </ul>
            <span
              :ref="'checkCity' + indexCity"
              class="error-message"
            />
          </form>
        </div>

        <div class="manage-deal-half-box">
          <div class="manage-deal-half-box-top">
            <p
              v-if="!obj.area.formatted_address"
              class="manage-deal-half-box-text manage-deal-half-box-text--gray"
            >
              Optional: Is there an area within {{ indexCity + 1 }} that you're
              currently <b>excluding</b> due to concentration?
            </p>
            <p
              v-else
              class="manage-deal-half-box-text manage-deal-half-box-text--gray"
            >
              Optional: Is there an area within
              <span class="manage-deal-half-box-address">{{
                obj.area.formatted_address
              }}</span>
              that you're currently <b>excluding</b> due to concentration?
            </p>
          </div>

          <div class="manage-deal-half-box-inputs">
            <form
              class="multiple-select error-message-holder"
              autocomplete="off"
              @submit.prevent=""
            >
              <span
                v-for="(block, i) in obj.exclusions"
                :key="'block' + i"
                class="manage-deal-half-box-pill"
              >
                {{ block.formatted_address }}
                <a
                  href="javascript:;"
                  class="manage-deal-half-box-pill-remove"
                  @click="removeBlocks(block.place_id, indexCity, i)"
                >
                  <SvgIcon
                    class="manage-deal-half-box-pill-remove__icon"
                    icon-name="ico-close-thin"
                  />
                </a>
              </span>
              <div class="wrap-input-loader">
                <input
                  :ref="'autoBlock' + indexCity"
                  type="text"
                  class="form-control pac-target-input"
                  placeholder="Search by state, city, zip or county"
                  autocomplete="off"
                  @keyup="search($event, 'block', indexCity)"
                  @focus="focusInput(indexCity)"
                  @blur="loseFocus('predictionsBlockShow')"
                />
                <div
                  v-if="showLoaderBlock === 'showLoaderBlock' + indexCity"
                  class="wrap-input-loader__inner"
                >
                  <img
                    src="@/assets/images/loader.gif"
                    alt="loader"
                  />
                </div>
              </div>
              <ul
                v-if="
                  predictionsBlockShow === 'predictionsBlockShow' + indexCity
                "
                ref="list"
                class="autocomplete-loc__list"
              >
                <template v-for="(prediction, newIndex) in predictionsBlock">
                  <li
                    :key="newIndex"
                    :class="{ 'active-item': curentItemBlock === newIndex }"
                    class="autocomplete-loc__list-item"
                    @click="
                      geocodeAddress(
                        prediction,
                        'predictionsBlockShow',
                        indexCity
                      )
                    "
                  >
                    {{ prediction.description }}
                  </li>
                </template>
              </ul>
              <span
                :ref="'checkBlock' + indexCity"
                class="error-message"
              />
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="manage-deal-box-map">
      <GmapMap
        ref="mapRef"
        class="manage-deal-box-map__box"
        :center="center"
        :zoom="zoom"
        map-type-id="terrain"
        style="width: 100%; height: 300px"
        :options="options"
      />
    </div>

    <div
      class="preferences__fieldset-half-box-full preferences__fieldset-half-box manage-deal-half-btn-holder"
    >
      <a
        href="javascript:;"
        class="btn btn--wider"
        @click="addLocations"
      >
        <SvgIcon
          class="btn__icon"
          icon-name="ico-plus"
        />
        Add a location</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import SvgIcon from "@/components/base/SvgIcon/SvgIcon.vue"
import { escapeSingleDoubleQuotes } from "@/config/util"
import { gmapApi } from "vue2-google-maps"
import axios from "axios"
import GlobalNot from "@/services/Notification"

export default Vue.extend({
  components: {
    SvgIcon,
  },

  props: {
    profile: {
      type: Boolean,
    },
    locationFromProfile: {
      type: Array,
    },
  },

  data() {
    return {
      googleLocation: [],
      loadMoreCount: 0,
      curentItem: -1,
      curentItemBlock: -1,
      showLoader: "",
      showLoaderBlock: "",
      ifState: false,
      change: false,

      predictionsCityShow: "",
      predictionsCity: [],
      predictionsBlockShow: "",
      predictionsBlock: [],

      center: { lat: 37.09024, lng: -95.712891 },
      zoom: 4,
      options: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        styles: [
          {
            featureType: "administrative",
            elementType: "all",
            stylers: [
              {
                saturation: "-100",
              },
            ],
          },
          {
            featureType: "administrative.province",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: 65,
              },
              {
                visibility: "on",
              },
              {
                color: "#fbfbfb",
              },
            ],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "on",
              },
              {
                color: "#f6f6f6",
              },
            ],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.stroke",
            stylers: [
              {
                visibility: "on",
              },
              {
                color: "#000000",
              },
            ],
          },
          {
            featureType: "landscape.man_made",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "landscape.man_made",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: "50",
              },
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [
              {
                saturation: "-100",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#c3c3c3",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "all",
            stylers: [
              {
                lightness: "30",
              },
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "all",
            stylers: [
              {
                lightness: "40",
              },
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "transit.line",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                hue: "#C8D7D4",
              },
              {
                lightness: -25,
              },
              {
                saturation: -97,
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "on",
              },
              {
                color: "#C8D7D4",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels",
            stylers: [
              {
                lightness: -25,
              },
              {
                saturation: -100,
              },
            ],
          },
        ],
      },
      index: "",
      prefix: [],
      map: "",
      obj: {},
    }
  },

  computed: {
    google: gmapApi,
    personalSettingsChanged() {
      return this.$store.getters.getPersonalSettingsChanged
    },
    companySettingsChanged() {
      return this.$store.getters.getCompanySettingsChanged
    },
    profileSettingsChanged() {
      return this.$store.getters.getProfileSettingsChanged
    },
  },

  watch: {
    loadMoreCount() {
      if (this.locationFromProfile) {
        if (this.loadMoreCount === this.locationFromProfile.length) {
          this.locationFromProfile.forEach(async (element, index) => {
            await element.exclusions.forEach(async (ele, excIndex) => {
              await this.setPlace(
                ele,
                "block",
                index,
                "profile",
                false,
                excIndex,
              )
              this["predictionsBlockShow"] = false
            })
          })
        }
      }
    },
  },

  beforeMount() {
    if (!this.profile) {
      this.googleLocation.push({
        area: {
          formatted_address: "",
          place_id: "",
          long_name: "",
        },
        exclusions: [],
        geoConf: "",
        markers: [],
        zoom: 4,
      })
    }
  },

  methods: {
    validateLocaton() {
      this.googleLocation.map((item, index) => {
        if (
          item.area.country === undefined &&
          item.area.formatted_address === ""
        ) {
          this.$store.dispatch("profileSettingsChanged", false)
          const input = this.$refs["checkCity" + index][0]
          input.innerHTML =
            "Area not found. Please select an area from the dropdown menu."
          setTimeout(() => {
            input.innerHTML = ""
          }, 3500)
        }

        if (
          item.area.formatted_address !== "" &&
          item.area.country === undefined
        ) {
          this.$store.dispatch("profileSettingsChanged", false)
          const input = this.$refs["checkCity" + index][0]
          input.innerHTML = "Please select an address from the dropdown menu."
          setTimeout(() => {
            input.innerHTML = ""
          }, 3500)
        }
      })
    },
    changeValidation() {
      this.change = false
    },
    loadAll() {
      this.locationFromProfile.forEach(async (element, index) => {
        this.googleLocation.push({
          area: {
            formatted_address: "",
            place_id: "",
            long_name: "",
            polygon_location:
              this.locationFromProfile[index].area.polygon_location,
          },
          exclusions: [],
          geoConf: "",
          markers: [],
          zoom: 4,
        })

        if (element.formatted_address === "New York State, USA") {
          this.ifState = true
        }

        await this.setPlace(
          this.locationFromProfile[index].area,
          "city",
          index,
          "profile",
          false,
        )
        this["predictionsCityShow"] = "predictionsCityShow" + index
      })
      this.change = false
    },

    getlocationsValidation2() {
      if (this.googleLocation[0].area.formatted_address === "") {
        new GlobalNot("Location fields are required!", "error")
        return true
      } else {
        if (this.change) {
          return false
        } else {
          return true
        }
      }
    },

    getlocationsValidation() {
      if (this.googleLocation[0].area.formatted_address === "") {
        new GlobalNot("Location fields are required!", "error")
        return true
      } else {
        return false
      }
    },

    isChangeLocation() {
      if (this.change) {
        return false
      } else {
        return true
      }
    },

    getlocations() {
      if (
        this.googleLocation[this.googleLocation.length - 1].area
          .formatted_address === ""
      ) {
        this.googleLocation.splice(this.googleLocation.length - 1, 1)
        return this.googleLocation
      }
      return this.googleLocation
    },

    setZoom() {
      if (this.map) {
        this.map.setZoom(4)
      }
    },

    async removeLocation(index) {
      this.clearMap()
      if (this.map) {
        if (this.googleLocation.length === 1) {
          this.googleLocation = [
            {
              area: {
                formatted_address: "",
                place_id: "",
              },
              exclusions: [],
              geoConf: "",
              markers: [],
              zoom: 4,
            },
          ]

          this.map.setCenter(this.center)
          this.map.setZoom(4)
          this.prefix = []
          this.$refs["autoCity" + index][0].value = ""
          this.$refs["autoCity" + index][0].disabled = false
        } else {
          this.prefix.splice(index, 1)
          this.googleLocation.splice(index, 1)
          this.googleLocation.forEach((element) => {
            this.map.data.addGeoJson(element.geoConf, "")
          })
          const bounds = new this.google.maps.LatLngBounds()
          const newObj = this.googleLocation[this.googleLocation.length - 1]
          if (newObj.markers.length > 0) {
            for (let i = 0; i < newObj.markers.length; i++) {
              bounds.extend(newObj.markers[i].position)
            }
            this.map.fitBounds(bounds)
            this.map.setZoom(newObj.zoom)
          }
          this.$refs["autoCity" + index][0].value = ""
          this.$refs["autoCity" + index][0].disabled = false
          this.$refs["autoCity" + index][0].focus()
        }
        this.change = true
      }
    },

    /**
     * @description
     * clear all poly from map
     */
    clearMap(): void {
      if (this.map.data) {
        this.map.data.forEach((feature) => {
          this.map.data.remove(feature)
        })
      }
    },

    /**
     * @description
     * remove from marker
     */
    clearMarker(id, index): void {
      const markerIndex = this.googleLocation[index].markers.findIndex(
        (element) => {
          return element.place_id === id
        },
      )
      this.googleLocation[index].markers.splice(markerIndex, 1)
    },

    /**
     * @description
     * remove features from config
     */
    removeConfig(id, index, i): void {
      this.googleLocation[index].exclusions.find((ele) => {
        return ele.place_id === id
      })
      this.googleLocation[index].geoConf.features.splice(i + 1, 1)
    },

    /**
     * @description
     * remove blocks
     */
    removeBlocks(id, index, i): void {
      const block = this.googleLocation[index].exclusions
      if (block) {
        const blockIndex = block.findIndex(
          (element) => element.place_id === id,
        )
        block.splice(blockIndex, 1)
      }

      this.removeConfig(id, index, i)
      this.clearMarker(id, index)
      this.clearMap()

      this.googleLocation.forEach((element) => {
        this.map.data.addGeoJson(element.geoConf, "")
      })

      this.setBounds(index)
      this.change = true
    },

    addLocations() {
      const obj = this.googleLocation[this.googleLocation.length - 1]
      if (obj.area.formatted_address !== "") {
        this.googleLocation.push({
          area: {
            formatted_address: "",
            place_id: "",
          },
          exclusions: [],
          geoConf: "",
          markers: [],
          zoom: 4,
        })
      }
    },

    loseFocus(flag) {
      setTimeout(() => {
        this[flag] = false
      }, 400)
    },

    /**
     * @description on keyup search and get predictions ( city or area )
     */
    search(e, flag, index) {
      if (flag === "city") {
        if (e.target.value === "") return false

        if (e.keyCode === 13 && this.curentItem > -1) {
          this.geocodeAddress(
            this.predictionsCity[this.curentItem],
            "predictionsCityShow",
            index,
          )
          this.curentItem = -1
          return false
        }
        if (e.keyCode === 38 && this.curentItem >= 0) {
          this.curentItem--
        } else if (
          e.keyCode == 40 &&
          this.curentItem < this.predictionsCity.length
        ) {
          this.curentItem++
        }

        this.showLoader = "showLoader" + index

        let val = e.target.value
        if (val.toLowerCase().includes("washington")) {
          if (val.toLowerCase().includes("state")) {
            val = "washington state usa"
          }
          this.searchPrediction(
            "predictionsCity",
            "predictionsCityShow",
            val,
            ["(regions)"],
            index,
          )
        } else {
          this.searchPrediction(
            "predictionsCity",
            "predictionsCityShow",
            e.target.value,
            ["(regions)"],
            index,
          )
        }
      } else {
        if (this.prefix[index] !== "") {
          if (e.target.value === "") return false

          if (e.keyCode === 13 && this.curentItemBlock > -1) {
            this.geocodeAddress(
              this.predictionsBlock[this.curentItemBlock],
              "predictionsBlockShow",
              index,
            )
            this.curentItemBlock = -1
            return false
          }
          if (e.keyCode === 38 && this.curentItemBlock >= 0) {
            this.curentItemBlock--
          } else if (
            e.keyCode == 40 &&
            this.curentItemBlock < this.predictionsBlock.length
          ) {
            this.curentItemBlock++
          }

          this.showLoaderBlock = "showLoaderBlock" + index
          this.searchPrediction(
            "predictionsBlock",
            "predictionsBlockShow",
            this.prefix[index] + " " + e.target.value,
            ["(regions)"],
            index,
          )
        }
      }
    },

    /**
     * @description
     * Event on click get prediction place
     */
    geocodeAddress(prediction, flags, index): void {
      this[flags] = ""
      flags === "predictionsCityShow"
        ? this.cityValidation(prediction, index)
        : this.blockValidation(prediction, index)
    },

    /**
     * @description
     * city validation
     */
    async cityValidation(prediction, index) {
      const flag = this.googleLocation.find((ele) => {
        return ele.area.place_id === prediction.place_id
      })
      if (flag !== undefined) {
        this.$refs["autoCity" + index][0].value = ""
        this.$refs["autoCity" + index][0].focus()
        this.$refs["checkCity" + index][0].innerHTML =
          "Area is already selected."
        let errorMessageRemove = this.$refs["checkCity" + index][0]
        setTimeout(() => {
          errorMessageRemove.innerHTML = ""
        }, 2000)
        return false
      } else {
        this.$refs["autoCity" + index][0].disabled = true
        this.$refs["autoCity" + index][0].value = prediction.description
        let geocoder = new this.google.maps.Geocoder()
        if (prediction.description === "New York State, USA") {
          this.ifState = true
        }
        await geocoder.geocode(
          { placeId: prediction.place_id },
          (results) => {
            this.setPlace(results[0], "city", index, "", true)
          },
        )
      }
    },

    /**
     * @description
     * blocks validation
     */
    async blockValidation(prediction, index) {
      const flag = this.googleLocation[index].exclusions.find((ele) => {
        return ele.place_id === prediction.place_id
      })
      if (flag !== undefined) {
        this.$refs["checkBlock" + index][0].innerHTML =
          "Area is already selected."
        this.$refs["autoBlock" + index][0].value = ""
        this.$refs["autoBlock" + index][0].focus()
        setTimeout(() => {
          if (this.$refs["checkBlock" + index][0]) {
            this.$refs["checkBlock" + index][0].innerHTML = ""
          }
        }, 2000)
        return false
      } else {
        let newflag = false
        for (let i = 0; i < this.googleLocation.length; i++) {
          const ele = this.googleLocation[i]
          if (ele.area.place_id === prediction.place_id) {
            newflag = true
            break
          }
        }

        if (newflag) {
          this.$refs["checkBlock" + index][0].innerHTML =
            "Area is already selected."
          this.$refs["autoBlock" + index][0].value = ""
          this.$refs["autoBlock" + index][0].focus()
          setTimeout(() => {
            if (this.$refs["checkBlock" + index][0]) {
              this.$refs["checkBlock" + index][0].innerHTML = ""
            }
          }, 2000)
          return false
        }
      }
      let geocoder = new this.google.maps.Geocoder()
      await geocoder.geocode(
        { address: prediction.description },
        (results) => {
          if (
            results[0].formatted_address ===
            this.googleLocation[index].area.formatted_address
          ) {
            this.$refs["checkBlock" + index][0].innerHTML =
              "Area is already selected."
            this.$refs["autoBlock" + index][0].value = ""
            this.$refs["autoBlock" + index][0].focus()
            setTimeout(() => {
              if (this.$refs["checkBlock" + index][0]) {
                this.$refs["checkBlock" + index][0].innerHTML = ""
              }
            }, 1000)
            return false
          }
          this.setPlace(results[0], "block", index, "", true)
          this["predictionsBlockShow"] = false
        },
      )
    },

    /**
     * @description
     * get prediction
     */
    searchPrediction(pre, preShow, val, type, index): void {
      const displaySuggestions = (predictions) => {
        this[pre] = predictions
        this[preShow] = preShow + index
        this.showLoader = false
        this.showLoaderBlock = false
      }
      const service = new this.google.maps.places.AutocompleteService()
      service.getPlacePredictions(
        {
          input: val,
          types: type,
          componentRestrictions: {
            country: "us",
          },
        },
        displaySuggestions,
      )
    },

    /**
     * @description
     * set markers and bounds
     */
    async setPlace(place, inp, index, profile, profileFlag, excIndex) {
      // set marker and border line
      await this.$refs.mapRef.$mapPromise.then(async (map) => {
        this.map = map
        if (inp === "city") {
          if (this.ifState) {
            this.prefix[index] = "New York State, USA"
          } else {
            this.prefix[index] = place.formatted_address
          }
        }

        const marker = {
          lat: "",
          lng: "",
        }
        if (profile === "profile") {
          map.panTo({ lat: place.lat, lng: place.long })
          marker.lat = place.lat
          marker.lng = place.long
        } else {
          // center map
          map.panTo({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          })
          marker.lat = place.geometry.location.lat()
          marker.lng = place.geometry.location.lng()
        }

        // push marker location
        if (!this.googleLocation[index].markers) {
          this.googleLocation[index].markers = []
        }
        this.googleLocation[index].markers.push({
          position: marker,
          place_id: place.place_id,
        })
        await this.setMarkers(this.googleLocation[index].markers, index)
        // set zoom and center
        await this.setBounds(index)

        // get border line from nominatum
        if (profileFlag) {
          await this.preparePolygon(place, map, inp, index, profile)
        } else {
          await this.profilePreparePolygon(place, map, inp, index, excIndex)
        }
      })
    },

    setMarkers(markers, index) {
      this.googleLocation[index].markers = markers
    },

    /**
     * @description
     * set bounds from markers
     */
    setBounds(index): void {
      const bounds = new this.google.maps.LatLngBounds()
      if (this.googleLocation[index].markers.length > 1) {
        for (let i = 0; i < this.googleLocation[index].markers.length; i++) {
          bounds.extend(this.googleLocation[index].markers[i].position)
        }
        this.map.fitBounds(bounds)
      }
    },

    profilePreparePolygon(place, map, inp, index, excIndex) {
      if (inp === "city") {
        this.showLoader = "showLoader" + index
      } else {
        this.showLoaderBlock = "showLoaderBlock" + index
      }

      this.clearMap()

      if (this.googleLocation[index].geoConf === "") {
        if (this.locationFromProfile[index].area.polygon_location !== "") {
          let config = this.locationFromProfile[
            index
          ].area.polygon_location.replace(/\\/g, "")
          config = JSON.parse(config)
          this.googleLocation[index].geoConf = {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: config,
              },
            ],
          }
        } else {
          this.googleLocation[index].geoConf = this.prepareConfig(
            { data: [] },
            place,
            inp,
            "newConfig",
            index,
          )
        }
      } else {
        if (
          this.locationFromProfile[index].exclusions[excIndex]
            .polygon_location !== ""
        ) {
          let config = this.locationFromProfile[index].exclusions[
            excIndex
          ].polygon_location.replace(/\\/g, "")
          config = JSON.parse(config)
          this.googleLocation[index].geoConf.features.push({
            type: "Feature",
            geometry: config,
            properties: {
              color: "red",
              SD_NAME: "SD_NAME",
            },
          })
        }
      }

      this.googleLocation.forEach((ele) => {
        map.data.addGeoJson(ele.geoConf, "")
      })

      this.map.data.setStyle((feature) => {
        let SD_NAME = feature.getProperty("SD_NAME")
        let color = "#118f8c"
        if (SD_NAME == "SD_NAME") {
          color = "orange"
        }
        return {
          fillColor: color,
          fillOpacity: 0.15,
          strokeWeight: 1,
          strokeColor: "#055d64",
          strokeOpacity: 0.8,
        }
      })

      if (inp === "city") {
        const obj = this.googleLocation[index]
        obj.area.long_name = place.long_name
        obj.area.formatted_address = place.formatted_address
        obj.area.place_id = place.place_id
        obj.area.lat = place.lat
        obj.area.long = place.long

        obj.area.county = place.county
        obj.area.sublocality = place.sublocality
        obj.area.city = place.city
        obj.area.country = place.country
        obj.area.state = place.state
        obj.area.zip_code = place.zip_code
        obj.area.fips_code = place.fips_code

        obj.zoom = this.map.getZoom()
        if (!this.prefix.includes(place.formatted_address)) {
          this.prefix.push(place.formatted_address)
        }
      } else {
        const obj = this.googleLocation[index]
        const block = {
          formatted_address: place.formatted_address,
          place_id: place.place_id,
          long_name: "",
          lat: "",
          long: "",
          polygon_location: "",
          county: place.county,
          sublocality: place.sublocality,
          city: place.city,
          country: place.country,
          state: place.state,
          zip_code: place.zip_code,
          fips_code: place.fips_code,
        }

        block.lat = place.lat
        block.long = place.long
        block.long_name = place.long_name
        block.polygon_location =
          this.locationFromProfile[index].exclusions[excIndex].polygon_location

        obj.exclusions.push(block)
        obj.zoom = this.map.getZoom()
        this.setFocusAfterBlockAdd(index)
      }
      this.setBounds(index)
      this.showLoader = false
      this.showLoaderBlock = false
      this.loadMoreCount++
    },

    async callForApi(apiPath, params = null) {
      try {
        if (params) {
          return await axios.get(apiPath, { params: params })
        } else {
          return await axios.get(apiPath)
        }
      } catch (error) {
        return { data: [] }
      }
    },

    async prepareFips(lat, lng) {
      let apiPath = `https://geo.fcc.gov/api/census/block/find?format=json&latitude=${lat}&longitude=${lng}`
      try {
        let response = await this.callForApi(apiPath)
        if (this.getNested(response, "data", "Block", "FIPS") === undefined)
          return ""

        return response.data.Block.FIPS
      } catch (e) {
        return ""
      }
    },

    getNested(obj, ...args) {
      return args.reduce((obj, level) => obj && obj[level], obj)
    },

    /**
     * @description
     * set url, params
     * remove from map
     * prepeare config
     */
    async preparePolygon(place, map, inp, index, profile) {
      // api url
      let apiPath = "https://nominatim.openstreetmap.org/search.php"
      // get params
      const params = this.setParams(place)
      // emit prefix to anather map
      if (inp === "city") {
        this.showLoader = "showLoader" + index
      } else {
        this.showLoaderBlock = "showLoaderBlock" + index
      }

      let response = await this.callForApi(apiPath, params)

      if (profile !== "profile") {
        this.clearMap()
        if (!this.googleLocation[index].geoConf) {
          this.googleLocation[index].geoConf = ""
        }
        this.googleLocation[index].geoConf === ""
          ? (this.googleLocation[index].geoConf = this.prepareConfig(
              response,
              place,
              inp,
              "newConfig",
              index,
            ))
          : this.googleLocation[index].geoConf.features.push(
              this.prepareConfig(response, place, inp, "", index),
            )
        this.googleLocation.forEach((ele) => {
          map.data.addGeoJson(ele.geoConf, "")
        })
      } else {
        this.clearMap()
        this.googleLocation[index].geoConf === ""
          ? (this.googleLocation[index].geoConf = this.prepareConfig(
              response,
              place,
              inp,
              "newConfig",
              index,
              profile,
            ))
          : this.googleLocation[index].geoConf.features.push(
              this.prepareConfig(response, place, inp, "", index, profile),
            )
        this.googleLocation.forEach((ele) => {
          map.data.addGeoJson(ele.geoConf, "")
        })
      }
      this.map.data.setStyle((feature) => {
        let SD_NAME = feature.getProperty("SD_NAME")
        let color = "#118f8c"
        if (SD_NAME == "SD_NAME") {
          color = "orange"
        }
        return {
          fillColor: color,
          fillOpacity: 0.15,
          strokeWeight: 1,
          strokeColor: "#055d64",
          strokeOpacity: 0.8,
        }
      })

      this.showLoader = false
      this.showLoaderBlock = false
      this.loadMoreCount++
    },

    /**
     * @description
     * set paramas for request
     */
    setParams(place) {
      let val = ""
      if (place.formatted_address === "Washington, USA") {
        val = "Washington State"
      } else {
        if (this.ifState) {
          val = "New York State, USA"
          this.ifState = false
        } else {
          val = place.formatted_address
        }
      }

      return {
        q: val,
        polygon_geojson: 1,
        format: "json",
      }
    },

    /**
     * @description
     * get jsonConfig from nominate api and set to map
     */
    prepareConfig(response, place, inp, flags, index, profile) {
      let geoJSONDataChunk = {
        geojson: {
          coordinates: [],
          type: "",
        },
        boundingbox: [],
      }
      if (response.data.length === 1) {
        if (response.data[0].geojson) {
          if (response.data[0].geojson.type === "LineString") {
            geoJSONDataChunk.geojson.coordinates = [
              place.geometry.location.lng(),
              place.geometry.location.lat(),
            ]
            geoJSONDataChunk.geojson.type = "Point"
            geoJSONDataChunk.boundingbox = [
              place.geometry.location.lat().toString(),
              place.geometry.location.lat().toString(),
              place.geometry.location.lng().toString(),
              place.geometry.location.lng().toString(),
            ]
          } else {
            geoJSONDataChunk = response.data[0]
          }
        } else {
          geoJSONDataChunk.geojson.coordinates = [
            place.geometry.location.lng(),
            place.geometry.location.lat(),
          ]
          geoJSONDataChunk.geojson.type = "Point"
          geoJSONDataChunk.boundingbox = [
            place.geometry.location.lat().toString(),
            place.geometry.location.lat().toString(),
            place.geometry.location.lng().toString(),
            place.geometry.location.lng().toString(),
          ]
        }
      } else if (response.data.length === 0) {
        if (place.lat && place.long) {
          geoJSONDataChunk.geojson.coordinates = [place.long, place.lat]
          geoJSONDataChunk.geojson.type = "Point"
          geoJSONDataChunk.boundingbox = [
            place.lat.toString(),
            place.lat.toString(),
            place.long.toString(),
            place.long.toString(),
          ]
        } else {
          geoJSONDataChunk.geojson.coordinates = [
            place.geometry.location.lng(),
            place.geometry.location.lat(),
          ]
          geoJSONDataChunk.geojson.type = "Point"
          geoJSONDataChunk.boundingbox = [
            place.geometry.location.lat().toString(),
            place.geometry.location.lat().toString(),
            place.geometry.location.lng().toString(),
            place.geometry.location.lng().toString(),
          ]
        }
      } else {
        for (let i = 0; i < response.data.length; i++) {
          const element = response.data[i]
          if (element.geojson) {
            if (element.geojson.type) {
              if (
                element.geojson.type === "MultiPolygon" ||
                element.geojson.type === "Polygon"
              ) {
                if (Array.isArray(element.geojson.coordinates[0])) {
                  geoJSONDataChunk = element
                  break
                }
              }
            }
          }
        }
      }
      if (geoJSONDataChunk.boundingbox.length === 0) {
        geoJSONDataChunk.geojson.coordinates = [
          place.geometry.location.lng(),
          place.geometry.location.lat(),
        ]
        geoJSONDataChunk.geojson.type = "Point"
        geoJSONDataChunk.boundingbox = [
          place.geometry.location.lat().toString(),
          place.geometry.location.lat().toString(),
          place.geometry.location.lng().toString(),
          place.geometry.location.lng().toString(),
        ]
      }
      if (this.googleLocation[index].markers.length === 1) {
        const sw = new this.google.maps.LatLng(
          parseFloat(geoJSONDataChunk.boundingbox[0]),
          parseFloat(geoJSONDataChunk.boundingbox[2]),
        )
        const ne = new this.google.maps.LatLng(
          parseFloat(geoJSONDataChunk.boundingbox[1]),
          parseFloat(geoJSONDataChunk.boundingbox[3]),
        )
        const bounds = new this.google.maps.LatLngBounds(sw, ne)

        if (place.formatted_address === "United States") {
          this.zoom = 3
        } else {
          if (response.data.length === 0) {
            this.zoom = 5
          } else {
            this.map.fitBounds(bounds)
            this.map.panToBounds(bounds)
          }
        }
        //this.map.setCenter(bounds.getCenter(), this.map.getZoom(bounds));
        //this.map.panToBounds(bounds);
      }

      if (place.address_components) {
        if (inp === "city") {
          if (profile === "profile") {
            this.setCity(place, index, this.map.getZoom(), profile)
          } else {
            this.setCity(
              place,
              index,
              this.map.getZoom(),
              "",
              geoJSONDataChunk.geojson,
            )
          }
        } else {
          if (profile === "profile") {
            this.setBlock(place, index, this.map.getZoom(), profile)
          } else {
            this.setBlock(
              place,
              index,
              this.map.getZoom(),
              "",
              geoJSONDataChunk.geojson,
            )
          }
          this.setFocusAfterBlockAdd(index)
        }
      }

      if (place.formatted_address === "United States") {
        setTimeout(() => {
          if (this.zoom === 3) {
            this.zoom = 4
          } else {
            this.zoom = 3
          }
        }, 1000)
      }
      if (flags === "newConfig") {
        return {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: geoJSONDataChunk.geojson,
            },
          ],
        }
      } else {
        return {
          type: "Feature",
          geometry: geoJSONDataChunk.geojson,
          properties: {
            color: "red",
            SD_NAME: "SD_NAME",
          },
        }
      }
    },

    async setCity(placeResultData, index, zoom, profile, conf) {
      const obj = this.googleLocation[index]
      const block = await this.setNewBlock(placeResultData)

      obj.area.county = block.county
      obj.area.sublocality = block.sublocality
      obj.area.city = block.city
      obj.area.country = block.country
      obj.area.state = block.state
      obj.area.zip_code = block.zip_code
      obj.area.fips_code = block.fips_code

      if (profile === "profile") {
        obj.area.long_name = placeResultData.long_name
      } else {
        placeResultData.address_components.length > 0
          ? (obj.area.long_name =
              placeResultData.address_components[0].long_name)
          : (obj.area.long_name = "")
      }
      obj.area.formatted_address = placeResultData.formatted_address
      obj.area.place_id = placeResultData.place_id
      if (profile === "profile") {
        obj.area.lat = placeResultData.lat
        obj.area.long = placeResultData.long
      } else {
        obj.area.lat = placeResultData.geometry.location.lat()
        obj.area.long = placeResultData.geometry.location.lng()
      }
      obj.zoom = zoom
      if (!this.prefix.includes(placeResultData.formatted_address)) {
        this.prefix.push(placeResultData.formatted_address)
      }

      this.googleLocation[index].area.polygon_location =
        escapeSingleDoubleQuotes(JSON.stringify(conf))
      this.change = true
    },

    /**
     * @author Nikola Popov
     * @description
     *  set blocks by index
     *
     * @param addressData google api object location
     * @param placeResultData google api object place
     * @param id data index
     */
    async setBlock(placeResultData, index, zoom, profile, conf) {
      const obj = this.googleLocation[index]
      const block = await this.setNewBlock(placeResultData)

      if (profile === "profile") {
        block.lat = placeResultData.lat
        block.long = placeResultData.long
        block.long_name = placeResultData.long_name
      } else {
        block.lat = placeResultData.geometry.location.lat()
        block.long = placeResultData.geometry.location.lng()
        if (placeResultData.address_components.length > 0)
          block.long_name = placeResultData.address_components[0].long_name
      }
      block.polygon_location = escapeSingleDoubleQuotes(JSON.stringify(conf))

      obj.exclusions.push(block)
      obj.zoom = zoom
      this.change = true
      return
    },

    async setNewBlock(place) {
      const ShouldBeComponent = {
        sublocality: [
          "sublocality",
          "sublocality_level_1",
          "sublocality_level_2",
          "sublocality_level_3",
          "sublocality_level_4",
        ],
        zip_code: ["postal_code"],
        fips_code: ["fips_code"],
        city: ["locality"],
        county: ["administrative_area_level_2"],
        state: ["administrative_area_level_1"],
        country: ["country"],
      }

      var address = {
        state: "",
        county: "",
        sublocality: "",
        city: "",
        country: "",
        zip_code: "",
        fips_code: "",
        formatted_address: place.formatted_address,
        place_id: place.place_id,
        long_name: "",
        lat: "",
        long: "",
        polygon_location: "",
      }
      await this.prepareFips(
        place.geometry.location.lat(),
        place.geometry.location.lng(),
      ).then((result) => {
        address.fips_code = result
        if (place.formatted_address == "United States") address.fips_code = ""
      })

      let address_components = place.address_components
      address_components.forEach((component) => {
        for (var shouldBe in ShouldBeComponent) {
          if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
            if (shouldBe === "country") {
              address[shouldBe] = component.long_name
            } else {
              address[shouldBe] = component.long_name
            }
          }
        }
      })
      return address
    },

    /**
     * @description
     * Events of inputs
     */
    // on focus
    focusInput(index) {
      if (this.prefix[index] === undefined) {
        this.$refs["autoCity" + index][0].focus()
      }
    },
    // set focus
    setFocusAfterBlockAdd(index) {
      if (this.$refs["autoBlock" + index][0]) {
        this.$refs["autoBlock" + index][0].value = ""
        this.$refs["autoBlock" + index][0].focus()
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.manage-deal-half__wrap {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.wrap-input-loader {
  position: relative;
  width: 100%;

  input {
    width: 100%;
  }
}

.wrap-input-loader__inner {
  position: absolute;
  top: 50%;
  right: 30px;
  width: 30px;
  height: 30px;
  transform: translateY(-50%);

  img {
    width: 100%;
  }
}

.first-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: transparent;
  z-index: 99999;
}

.preferences__fieldset-half-box-inputs {
  position: relative;
}

.preferences__fieldset-half-box-text {
  font-size: 16px;
  font-weight: 600;

  @include mq(767px) {
    text-align: left;
  }
}

.multiple-select {
  background-color: $white;
  min-height: 46px;
}
.selectActive {
  color: silver;
}

.manage-deal-box-map {
  width: 100%;
  padding: 0;
  margin-bottom: 30px;

  @include mq($md) {
    margin-bottom: 20px;
  }
}

.manage-deal-box-map__box {
  height: 300px;
  width: 100%;

  @include mq($md) {
    height: 250px;
  }
}
</style>
