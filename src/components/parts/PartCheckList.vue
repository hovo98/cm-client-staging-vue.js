<template>
  <div class="check-list">
    <h3 class="title-small check-list__title">Property type</h3>
    <perfect-scrollbar
      ref="scroll"
      class="all-filters-ps"
    >
      <ul class="check-list__list">
        <template v-for="(item, index) in assetTypes">
          <li
            :key="index"
            class="check-list__list-item"
          >
            <label class="chk-box chk-box--alt">
              <input
                v-model="checkedList"
                type="checkbox"
                :value="item"
                @change="checkList()"
              >
              <span class="chk-box-text">{{ replaceStr(item) }}</span>
            </label>
          </li>
        </template>
      </ul>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapState } from 'vuex'

    export default Vue.extend({
        props: ['from'],

        data() {
            return {
                checkedList: [],
            }
        },

        beforeMount() {
            this.checkedList = this.propertyType
        },

        computed: {
            ...mapState({
                propertyType: state => state['FilterDeal'].propertyType,
                assetTypes: state => state['FilterDeal'].assetTypes,
			}),
        },

        watch: {
            propertyType() {
                if(this.propertyType.length === 0) {
                    this.checkedList = []
                }
            },
        },

        methods: {
            replaceStr(str) {
                return str.replace(/_/g, ' ')
            },
            checkList() {
                if(this.from === 'propertyType') {
                    this.$store.commit('SET_FILTER_PROPERTY_TYPE', this.checkedList)
                }
            },
        },
    })
</script>

<style lang="scss" scoped>
    .check-list__title {
        letter-spacing: -.6px;
        margin-bottom: 29px;

        @include mq($sm) {
            margin-bottom: 15px;
        }
    }

    .check-list__list-item {
        margin-bottom: 12px;

        &:last-of-type {
            margin-bottom: 0;
        }
    }

    .all-filters-ps {
        max-height: 250px;
        padding-right: 15px;

        @include mq($lg) {
            max-height: 179px;
        }
    }

    :deep() {
        .ps__rail-y {
            opacity: 1;
        }

        .ps__thumb-y {
            right: 0px;
        }

        .ps__rail-y:hover > .ps__thumb-y,
        .ps__rail-y:focus > .ps__thumb-y,
        .ps__rail-y.ps--clicking .ps__thumb-y {
            width: 6px;

            @include mq($md) {
                width: 4px;
            }
        }
    }
</style>
