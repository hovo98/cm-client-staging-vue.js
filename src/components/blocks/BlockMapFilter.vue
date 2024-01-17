<template>
  <div class="slider">
    <GmapMap
      ref="mapRef"
      class="manage-deal-box-map__box"
      :center="center"
      :zoom="zoom"
      map-type-id="terrain"
      style="width: 100%; height: 300px"
      :options="options"
    >
      <gmap-marker
        v-for="marker in markers"
        :key="marker.place_id"
        :icon="{ url: require('@/assets/images/location_pin.png') }"
        :position="marker"
      />
      <!-- <gmap-marker
                :icon="{ url: require('@/assets/images/location_pin.png')}"
                :position="marker">
            </gmap-marker> -->
    </GmapMap>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { gmapApi } from 'vue2-google-maps'

export default Vue.extend({
  props: {
    rows: {
      type: Array,
    },
    role: {
      type: String,
    },
  },

  data() {
    return {
      count: 0,
      center: { lat: 37.09024, lng: -95.712891 },
      zoom: 3.6,
      map: '',
      markers: [],
      options: {
        maxZoom: this.role === 'lender' ? 13 : 30,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        styles: [
          {
            featureType: 'administrative',
            elementType: 'all',
            stylers: [
              {
                saturation: '-100',
              },
            ],
          },
          {
            featureType: 'administrative.province',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: 65,
              },
              {
                visibility: 'on',
              },
              {
                color: '#fbfbfb',
              },
            ],
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'geometry.fill',
            stylers: [
              {
                visibility: 'on',
              },
              {
                color: '#f6f6f6',
              },
            ],
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'geometry.stroke',
            stylers: [
              {
                visibility: 'on',
              },
              {
                color: '#000000',
              },
            ],
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: '50',
              },
              {
                visibility: 'simplified',
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'all',
            stylers: [
              {
                saturation: '-100',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#c3c3c3',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road.arterial',
            elementType: 'all',
            stylers: [
              {
                lightness: '30',
              },
              {
                visibility: 'on',
              },
            ],
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road.local',
            elementType: 'all',
            stylers: [
              {
                lightness: '40',
              },
              {
                visibility: 'simplified',
              },
            ],
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road.local',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'transit',
            elementType: 'all',
            stylers: [
              {
                saturation: -100,
              },
              {
                visibility: 'simplified',
              },
            ],
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry.fill',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                hue: '#C8D7D4',
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
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [
              {
                visibility: 'on',
              },
              {
                color: '#C8D7D4',
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'labels',
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
    }
  },

  computed: {
    google: gmapApi,
  },

  watch: {
    rows() {
      this.setmap()
    },
  },

  mounted() {
    this.setmap()
  },

  methods: {
    removeMarkerFromTable() {
      const arr = []
      this.markers.forEach((element) => {
        const id = element.id
        const index = this.rows.find((row) => row.id === id)
        if (index) {
          arr.push(element)
        }
      })
      this.markers = arr
    },
    async setmap() {
      await this.$refs.mapRef.$mapPromise.then((map) => {
        this.map = map
        this.count = this.rows.length
        this.rows.forEach((element) => {
          const ele = element
          if (ele.location.place_id) {
            const index = this.markers.find((marker) => marker.id === ele.id)
            if (index === undefined) {
              const marker = {
                id: ele.id,
                lat: parseFloat(ele.location.lat),
                lng: parseFloat(ele.location.long),
              }
              this.markers.push(marker)
              // geocoder.geocode({'address': ele.location.neighbourhood}, (results, status) => {
              //     if(status === 'OK') {
              //         const place = results[0];
              //         const marker = {
              //             id: ele.id,
              //             lat: place.geometry.location.lat(),
              //             lng: place.geometry.location.lng()
              //         };
              //         this.markers.push(marker);
              //     }
              // });
            }
          }
        })
      })
    },
    setBounds() {
      const bounds = new this.google.maps.LatLngBounds()
      if (this.markers.length > 1) {
        for (let i = 0; i < this.markers.length; i++) {
          const myLatLng = new this.google.maps.LatLng(
            this.markers[i].lat,
            this.markers[i].lng,
          )
          bounds.extend(myLatLng)
        }
        this.map.fitBounds(bounds)
      }
    },
    removeMarker(ids) {
      ids.forEach((id) => {
        const markerindex = this.markers.findIndex(
          (marker) => marker.id === id,
        )
        this.markers.splice(markerindex, 1)
      })
    },
  },
})
</script>

<style lang="scss" scoped></style>
