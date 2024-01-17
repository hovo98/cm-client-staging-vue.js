<template>
  <div class="manage-deal-half__wrap">
    <div class="manage-deal-half-box">
      <div class="manage-deal-half-box-top">
        <p class="preferences__fieldset-half-box-text">Area {{ index + 1 }}</p>
      </div>
      <form
        class="input-holder manage-deal-half-box-inputs error-message-holder"
        autocomplete="nope"
        @submit.prevent=""
      >
        <div class="wrap-input-loader">
          <input
            ref="autoCity"
            type="text"
            class="form-control pac-target-input"
            placeholder="Search by state, city, zip or neighbourhood"
            autocomplete="nope"
            @keyup="search($event, 'city')"
            @blur="loseFocus('predictionsCityShow')"
          />
          <div
            v-if="showLoader"
            class="wrap-input-loader__inner"
          >
            <img
              src="@/assets/images/loader.gif"
              alt="loader"
            />
          </div>
          <a
            v-if="obj.area.formatted_address !== ''"
            href="javascript:;"
            class="manage-deal-half-box-loc-remove"
            @click="removeLocation(index)"
          >
            <SvgIcon
              class="manage-deal-half-box-loc-remove__icon"
              icon-name="ico-close-thin"
            />
          </a>
        </div>

        <ul
          v-if="predictionsCityShow"
          ref="list"
          class="autocomplete-loc__list"
        >
          <template v-for="(prediction, newIndex) in predictionsCity">
            <li
              :key="newIndex"
              :class="{ 'active-item': curentItem === newIndex }"
              class="autocomplete-loc__list-item"
              @click="geocodeAddress(prediction, 'predictionsCityShow')"
            >
              {{ prediction.description }}
            </li>
          </template>
        </ul>
        <span
          ref="checkCity"
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
          Optional: Is there an area within {{ index + 1 }} that you're
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
          autocomplete="nope"
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
              @click="removeBlocks(block.place_id, index, i)"
            >
              <SvgIcon
                class="manage-deal-half-box-pill-remove__icon"
                icon-name="ico-close-thin"
              />
            </a>
          </span>
          <div class="wrap-input-loader">
            <input
              ref="autoBlock"
              type="text"
              class="form-control pac-target-input"
              placeholder="Search by state, city, zip or neighbourhood"
              autocomplete="nope"
              @keyup="search($event, 'block')"
              @focus="focusInput()"
              @blur="loseFocus('predictionsBlockShow')"
            />
            <div
              v-if="showLoaderBlock"
              class="wrap-input-loader__inner"
            >
              <img
                src="@/assets/images/loader.gif"
                alt="loader"
              />
            </div>
          </div>
          <ul
            v-if="predictionsBlockShow"
            ref="list"
            class="autocomplete-loc__list"
          >
            <template v-for="(prediction, newIndex) in predictionsBlock">
              <li
                :key="newIndex"
                :class="{ 'active-item': curentItemBlock === newIndex }"
                class="autocomplete-loc__list-item"
                @click="geocodeAddress(prediction, 'predictionsBlockShow')"
              >
                {{ prediction.description }}
              </li>
            </template>
          </ul>
          <span
            ref="checkBlock"
            class="error-message"
          />
        </form>
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
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import SvgIcon from "@/components/base/SvgIcon/SvgIcon.vue"
import { gmapApi } from "vue2-google-maps"

export default Vue.extend({

  components: {
    SvgIcon,
  },
  props: {
    googleLocation: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    obj: {
      type: Object,
      required: true,
    },
    details: {
      type: Array,
      required: false,
    },
  },

  data() {
    return {
      predictionsCityShow: false,
      predictionsCity: [],
      predictionsBlockShow: false,
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
      prefix: "",
      map: "",
      showLoader: false,
      showLoaderBlock: false,
      curentItem: -1,
      curentItemBlock: -1,
      ifState: false,
    }
  },

  computed: {
    google: gmapApi,
  },

  watch: {
    googleLocation() {
      if (this.obj.area.formatted_address !== "") {
        this.$refs.autoCity.value = this.obj.area.formatted_address
        this.clearMap()
        this.setBounds()
        this.map.data.addGeoJson(this.obj.geoConf, "")
        this.prefix = this.obj.area.formatted_address
      }
    },
  },

  mounted() {
    setTimeout(() => {
      if (!this.obj.geoConf) {
        if (this.details) {
          if (this.details[this.index] !== undefined) {
            this.loadData(this.details[this.index])
          }
        }
      }
    }, 500)
  },

  methods: {
    async removeLocation(index) {
      this.googleLocation.length === 1
        ? this.removeFromMap(true)
        : this.removeFromMap(false)

      await this.$emit("removelocation", index)
      const bounds = new this.google.maps.LatLngBounds()
      if (this.obj.markers.length > 0) {
        for (let i = 0; i < this.obj.markers.length; i++) {
          bounds.extend(this.obj.markers[i].position)
        }
        this.map.fitBounds(bounds)
        this.map.setZoom(this.googleLocation[this.index].zoom)
      }
    },

    /**
     * @author Nikola Popov
     */
    async loadData(areas) {
      let geocoder = new this.google.maps.Geocoder()
      geocoder.geocode(
        { address: areas.area.formatted_address },
        (results, status) => {
          if (this.$refs.autoCity) {
            this.$refs.autoCity.value = areas.area.formatted_address
            this.$refs.autoCity.disabled = true
          }
          if (status === "OK") {
            this.setPlace(results[0], "city")
          }
        },
      )
      await areas.exclusions.forEach((element) => {
        let geocoder = new this.google.maps.Geocoder()
        geocoder.geocode(
          { address: element.formatted_address },
          (results, status) => {
            if (status === "OK") {
              this.setPlace(results[0], "block")
            }
          },
        )
      })
      setTimeout(() => {
        this.$emit("changeScrollFlag")
      }, 2000)
    },

    /**
     * @description on keyup search and get predictions ( city or area )
     */
    search(e, flag) {
      if (flag === "city") {
        if (e.target.value === "") return false

        if (e.keyCode === 13 && this.curentItem > -1) {
          this.geocodeAddress(
            this.predictionsCity[this.curentItem],
            "predictionsCityShow",
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

        this.showLoader = true
        this.searchPrediction(
          "predictionsCity",
          "predictionsCityShow",
          e.target.value,
          ["geocode"],
        )
      } else {
        if (this.prefix !== "") {
          if (e.target.value === "") return false

          if (e.keyCode === 13 && this.curentItemBlock > -1) {
            this.geocodeAddress(
              this.predictionsBlock[this.curentItemBlock],
              "predictionsBlockShow",
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

          this.showLoaderBlock = true
          this.searchPrediction(
            "predictionsBlock",
            "predictionsBlockShow",
            this.prefix + " " + e.target.value,
            ["geocode"],
          )
        }
      }
    },

    /**
     * @description
     * clear all poly from map, set center and zoom, remove value from input
     */
    clearMapAndAll(): void {
      this.clearMap()
      this.map.setCenter(this.center)
      this.map.setZoom(4)
      this.prefix = ""
      this.$refs.autoCity.value = ""
      this.$refs.autoCity.disabled = false
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
     * trigger from parent component
     */
    removeFromMap(flag): void {
      if (flag) this.clearMapAndAll()
    },

    /**
     * @description
     * remove from marker
     */
    clearMarker(id): void {
      const markerIndex = this.obj.markers.findIndex((element) => {
        return element.place_id === id
      })
      this.obj.markers.splice(markerIndex, 1)
    },

    /**
     * @description
     * remove features from config
     */
    removeConfig(id, index, i): void {
      const obj = this.googleLocation[index].exclusions.find((ele) => {
        return ele.place_id === id
      })
      this.obj.geoConf.features.splice(i + 1, 1)
    },

    /**
     * @description
     * set bounds from markers
     */
    setBounds(): void {
      const bounds = new this.google.maps.LatLngBounds()
      if (this.obj.markers.length > 1) {
        for (let i = 0; i < this.obj.markers.length; i++) {
          bounds.extend(this.obj.markers[i].position)
        }
        this.map.fitBounds(bounds)
      }
    },

    /**
     * @description
     * remove blocks
     */
    removeBlocks(id, index, i): void {
      this.$emit("removeblock", id, index)
      this.removeConfig(id, index, i)
      this.clearMarker(id)
      this.clearMap()
      this.map.data.addGeoJson(this.obj.geoConf, "")
      this.setBounds()
    },

    /**
     * @description
     * Events of inputs
     */
    // lose focus
    loseFocus(flag) {
      setTimeout(() => {
        this[flag] = false
      }, 400)
    },
    // on focus
    focusInput() {
      if (this.prefix === "") {
        this.$refs.autoCity.focus()
      }
    },
    // set focus
    setFocusAfterBlockAdd() {
      if (this.$refs.autoBlock) this.$refs.autoBlock.value = ""
    },

    /**
     * @description
     * get prediction
     */
    searchPrediction(pre, preShow, val, type): void {
      const displaySuggestions = (predictions, status) => {
        this[pre] = predictions
        this[preShow] = true
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
     * Event on click get prediction place
     */
    geocodeAddress(prediction, flags): void {
      this[flags] = false
      flags === "predictionsCityShow"
        ? this.cityValidation(prediction)
        : this.blockValidation(prediction)
    },

    /**
     * @description
     * city validation
     */
    async cityValidation(prediction) {
      const flag = this.googleLocation.find((ele) => {
        return ele.area.place_id === prediction.place_id
      })
      if (flag !== undefined) {
        this.$refs.autoCity.value = ""
        this.$refs.autoCity.focus()
        this.$refs.checkCity.innerHTML = "Area is already selected."
        setTimeout(() => {
          this.$refs.checkCity.innerHTML = ""
        }, 2000)
        return false
      } else {
        this.$refs.autoCity.disabled = true
        this.$refs.autoCity.value = prediction.description
        let geocoder = new this.google.maps.Geocoder()
        if (prediction.description === "New York State, USA") {
          this.ifState = true
        }
        await geocoder.geocode(
          { placeId: prediction.place_id },
          (results, status) => {
            this.setPlace(results[0], "city")
            this["predictionsCityShow"] = false
          },
        )
      }
    },

    /**
     * @description
     * blocks validation
     */
    async blockValidation(prediction) {
      const flag = this.googleLocation[this.index].exclusions.find((ele) => {
        return ele.place_id === prediction.place_id
      })
      if (flag !== undefined) {
        this.$refs.checkBlock.innerHTML = "Area is already selected."
        this.$refs.autoBlock.value = ""
        this.$refs.autoBlock.focus()
        setTimeout(() => {
          this.$refs.checkBlock.innerHTML = ""
        }, 2000)
        return false
      } else {
        const newflag = this.googleLocation.find((ele) => {
          return ele.area.place_id === prediction.place_id
        })
        if (newflag !== undefined) {
          this.$refs.checkBlock.innerHTML = "Area is already selected."
          this.$refs.autoBlock.value = ""
          this.$refs.autoBlock.focus()
          setTimeout(() => {
            this.$refs.checkBlock.innerHTML = ""
          }, 2000)
          return false
        }
      }
      let geocoder = new this.google.maps.Geocoder()
      await geocoder.geocode(
        { address: prediction.description },
        (results, status) => {
          this.setPlace(results[0], "block")
          this["predictionsBlockShow"] = false
        },
      )
    },

    /**
     * @description
     * set markers and bounds
     */
    async setPlace(place, inp) {
      // set marker and border line
      await this.$refs.mapRef.$mapPromise.then((map) => {
        this.map = map
        if (inp === "city") {
          if (this.ifState) {
            this.prefix = "New York State, USA"
          } else {
            this.prefix = place.formatted_address
          }
        }

        // center map
        map.panTo({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        })
        const marker = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
        // push marker location
        if (!this.obj.markers) {
          this.obj.markers = []
        }
        this.obj.markers.push({ position: marker, place_id: place.place_id })
        this.$emit("setMarkers", this.obj.markers, this.index)
        // set zoom and center
        this.setBounds()
        // get border line from nominatum
        this.preparePolygon(place, map, inp)
      })
    },

    /**
     * @description
     * set url, params
     * remove from map
     * prepeare config
     */
    preparePolygon(place, map, inp) {
      // api url
      let apiPath = "https://nominatim.openstreetmap.org/search.php"
      // get params
      const params = this.setParams(place)
      // emit prefix to anather map
      if (inp === "city") {
        this.showLoader = true
      } else {
        this.showLoaderBlock = true
      }
      axios.get(apiPath, { params: params }).then((response) => {
        if (response.data.length === 0) {
          if (inp === "city") {
            this.$refs.checkCity.innerHTML = "Area not found"
            this.$refs.autoCity.disabled = false
            this.$refs.autoCity.value = ""
            this.$refs.autoCity.focus()
            setTimeout(() => {
              this.$refs.checkCity.innerHTML = ""
            }, 2000)
          } else {
            this.$refs.checkBlock.innerHTML = "Area not found"
            this.$refs.autoBlock.value = ""
            this.$refs.autoBlock.focus()
            setTimeout(() => {
              this.$refs.checkBlock.innerHTML = ""
            }, 2000)
          }
          this.showLoader = false
          this.showLoaderBlock = false
          return false
        }
        // remove all from map
        this.clearMap()
        // prepeare config
        if (!this.obj.geoConf) {
          this.obj.geoConf = ""
        }
        this.obj.geoConf === ""
          ? (this.obj.geoConf = this.prepareConfig(
              response,
              place,
              inp,
              "newConfig",
            ))
          : this.obj.geoConf.features.push(
              this.prepareConfig(response, place, inp, ""),
            )
        map.data.addGeoJson(this.obj.geoConf, "")

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

        this.$emit("setGeoJson", this.obj.geoConf, this.index)
        this.showLoader = false
        this.showLoaderBlock = false
      })
    },

    /**
     * @description
     * set paramas for request
     */
    setParams(place) {
      let val = ""
      if (this.ifState) {
        val = "New York State, USA"
        this.ifState = false
      } else {
        val = place.formatted_address
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
    prepareConfig(response, place, inp, flags) {
      let flag = false
      let geoJSONDataChunk = {
        geojson: "",
        boundingbox: [],
      }
      if (response.data.length <= 1) {
        geoJSONDataChunk = response.data[0]
      } else {
        for (let i = 0; i < response.data.length; i++) {
          const element = response.data[i]
          if (
            element.geojson.type === "MultiPolygon" ||
            element.geojson.type === "Polygon"
          ) {
            if (Array.isArray(element.geojson.coordinates[0])) {
              geoJSONDataChunk = element
              flag = true
              break
            }
          }
        }
      }
      if (!flag) geoJSONDataChunk = response.data[0]
      if (this.obj.markers.length === 1) {
        const sw = new this.google.maps.LatLng(
          parseFloat(geoJSONDataChunk.boundingbox[0]),
          parseFloat(geoJSONDataChunk.boundingbox[2]),
        )
        const ne = new this.google.maps.LatLng(
          parseFloat(geoJSONDataChunk.boundingbox[1]),
          parseFloat(geoJSONDataChunk.boundingbox[3]),
        )
        const bounds = new this.google.maps.LatLngBounds(sw, ne)
        //this.map.setCenter(bounds.getCenter(), this.map.getZoom(bounds));
        this.map.fitBounds(bounds)
        this.map.panToBounds(bounds)
      }

      if (inp === "city") {
        this.$emit("setCity", place, this.index, this.map.getZoom())
      } else {
        this.$emit("setBlock", place, this.index, this.map.getZoom())
        this.setFocusAfterBlockAdd()
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
  right: 1px;
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
  padding: 0 15px;
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
