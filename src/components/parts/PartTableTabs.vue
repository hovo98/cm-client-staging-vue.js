<template>
  <div class="deals-tabs">
    <ul class="deals-tabs__list">
      <template v-for="(title, index) in tableTabs.titles">
        <li
          :key="index"
          class="deals-tabs__list-item"
          :class="
            (title.title === 'Favorites' && tableSavedRows.length === 0) || (title.title === 'Archived Deals' && tableArchivedRows.length === 0) || (title.title === 'Drafts' && tableDraftRows.length === 0)
              ? 'table-tabs-disable' : ''"
        >
          <span
            class="deals-tabs__list-item-inner"
            :class="{'actives' : activetab === index}"
            @click="activeIndex(index, title.tab)"
          >{{ title.title }}</span>
        </li>
      </template>
    </ul>
    <!-- <div class="deals-tabs__info" v-if="tableTabs.tabsInfo">
            <div class="deals-tabs__info-top">
                <span class="deals-tabs__info-top-text">{{tableTabs.dealsNum}} Deals,</span>
                <span class="deals-tabs__info-top-text">{{tableTabs.hiddenNum}} Hidden</span>
                <SvgIcon class="tooltip-msg__icon deals-tabs__info-top-icon" iconName="ico-exclamation" @mouseover.native="tableTabs.isHovering = true" @mouseout.native="tableTabs.isHovering=false"/>
            </div>
            <div :class="['deals-tabs__info-bottom', tableTabs.isHovering ? 'deals-tabs__info-bottom active' : '']">
                <div class="entry-content" v-html="tableTabs.info"></div>
            </div>
        </div> -->
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapState } from 'vuex'

    interface Data {
        activetab: number
    }

    export default Vue.extend({
        props: ['tableTabs', 'tableSavedRows', 'tableArchivedRows', 'tableDraftRows', 'indexActive'],

        computed: {
            ...mapState({
                draftLink: state => state['CreateDeal'].draftLink,
			}),
        },

        data(): Data {
            return {
                activetab: 0,
            }
        },

        mounted() {
            if(this.draftLink) {
                this.activeIndex(1, 'DRAFT')
                this.$store.commit('SET_DRAFT_LINK', false)
            }
        },

        methods: {
            activeIndex(index, tab) {
                this.activetab = index
                this.$emit('setActiveIndex', index)
                this.$store.commit('SET_DEAL_CONTEXT', tab)
            },
            setNewTab(num) {
                this.activetab = num
            },
        },
    })
</script>

<style lang="scss" scoped>
    .deals-tabs {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-right: 23px;

        @include mq($lg) {
            padding-right: 0;
            flex-direction: column-reverse;
        }
    }

    .deals-tabs__list {
        display: flex;
    }

    .deals-tabs__list-item {
        padding-bottom: 8px;

        @include mq($lg) {
            padding-bottom: 5px;
        }

        @include mq($sm) {
            padding-bottom: 0;
        }
    }

    .deals-tabs__list-item-inner {
        font-family: $font-second;
        font-size: 20px;
        font-weight: 400;
        color: $santas-gray;
        transition: $dur $ease;
        padding: 12px 30px;
        cursor: pointer;

        @include mq($lg) {
            font-size: 18px;
            padding: 10px 20px;
        }

        @include mq($sm) {
            font-size: 16px;
            padding: 10px 15px;
        }

        @include mq(450px) {
            font-size: 15px;
            padding: 7px;
        }

        &:hover {
            color: $shark;
            transition: $dur $ease;
        }

        &.actives {
            font-weight: 400;
            color: $shark;
            background-color: $white;
            border-radius: 10px 10px 0 0;
        }
    }

    .deals-tabs__info {
        position: relative;
        padding-top: 4px;

        @include mq($lg) {
            align-self: flex-end;
            padding-top: 0;
            margin-bottom: 10px;
        }
    }

    .deals-tabs__info-top {
        display: flex;
        align-items: center;
    }

    .deals-tabs__info-top-text {
        font-size: 16px;
        font-family: $font-main;
        color: $shark;
        font-weight: 600;
        letter-spacing: .08px;
        font-style: italic;

        @include mq($sm) {
            font-size: 15px;
        }

        &:first-of-type {
            margin-right: 5px;
        }
    }

    .deals-tabs__info-top-icon {
        font-size: 20px;
        height: 21px;
        margin-left: 16px;
        cursor: pointer;

        @include mq($sm) {
            font-size: 17px;
            height: 17px;
            margin-left: 9px;
        }
    }

    .deals-tabs__info-bottom {
        width: 495px;
        padding: 28px 30px 22px;
        background-color: $white;
        box-shadow: 0 2px 20px rgba(0, 0, 0, .05);
        position: absolute;
        top: 40px;
        right: -27px;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        border-radius: 6px;

        @include mq($sm) {
            width: 300px;
            right: -10px;
            padding: 20px 10px;
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            right: 23px;
            width: 0;
            height: 0;
            border-bottom: 14px solid $white;
            border-left: 14px solid transparent;
            border-right: 14px solid transparent;
            transform: translateY(-100%);
            transition: $dur $ease;
            opacity: 0;
            visibility: hidden;
            z-index: 9;
            pointer-events: none;

            @include mq($sm) {
                right: 6px;
            }
        }

        &.actives {
            opacity: 1;
            visibility: visible;
            transition: $dur $ease;
            z-index: 5;
            top: 49px;
            pointer-events: all;

            &:before {
                opacity: 1;
                visibility: visible;
                transition: $dur $ease;
            }
        }
    }
    .table-tabs-disable {
        display: none;
    }
</style>
