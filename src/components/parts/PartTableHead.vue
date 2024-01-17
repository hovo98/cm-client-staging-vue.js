<template>
  <div class="table-head ">
    <div class="table-head-left">
      <div class="table-head-left-btn-outer">
        <span
          class="table-head-left-btn-drop btn-inline"
          @click.stop="openDrop"
        >
          Options <SvgIcon
            class="table-head-left-btn-drop-icon"
            icon-name="ico-arrow-df"
          />
        </span>
        <div
          ref="dropdown"
          class="table-head-left-btn-wrap"
        >
          <template v-for="(btn, index) in tableButtons">
            <a
              v-if="btn.dispatch !== 'openDeal'"
              :key="index"
              class="btn-inline table-head-left-btn"
              :class="{'btn-disabled': selectedRows.length === 0}"
              href="javascript:;"
              @click="clickEvent(btn.dispatch)"
            >
              <SvgIcon
                class="table-head-left-btn-icon"
                :icon-name="`ico-${btn.icon}`"
              />
              {{ btn.title }}
            </a>
            <a
              v-else
              :key="index"
              class="btn-inline table-head-left-btn"
              :class="{'btn-disabled': selectedRows.length === 0 || selectedRows.length === 1}"
              href="javascript:;"
              @click="clickEvent(btn.dispatch)"
            >
              <SvgIcon
                class="table-head-left-btn-icon"
                :icon-name="`ico-${btn.icon}`"
              />
              {{ btn.title }}
            </a>
          </template>
        </div>
      </div>
    </div>
    <!-- TODO: Commented for MVP, this goes to Post-MVP  -->
    <div
      v-if="title === 'dealDefault' || title === 'dealDefaultLender' || title === 'quoteDefaultBroker'"
      class="table-head-right"
    >
      <!-- <div class="table-head-right-icon-btn-wrap">
                <a class="btn-inline table-head-right-icon-btn" href="javascript:;">
                    <SvgIcon class="table-head-right-icon-btn-icon" iconName="ico-list"/>
                </a>
                <a class="btn-inline table-head-right-icon-btn active" href="javascript:;">
                    <SvgIcon class="table-head-right-icon-btn-icon" iconName="ico-table"/>
                </a>
            </div> -->
      <a
        v-if="!non_beta_user"
        class="btn-inline table-head-right-btn"
        href="javascript:;"
        @click.stop="showPopUp = true"
      >
        <SvgIcon
          class="table-head-right-btn-icon"
          icon-name="ico-manage"
        />
        Customize Columns
      </a>
    </div>
    <SvgIcon
      class="scroll-indicator"
      icon-name="ico-hand"
    />
    <transition name="fade-in-fast">
      <BlockPopupManage 
        v-if="showPopUp"
        :table="table"
        :title="title"
        @hidePopup="hidePopup"
      />
    </transition>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import GlobalNot from "@/services/Notification"
    import BlockPopupManage from "@/components/blocks/BlockPopup/BlockPopupManage.vue"
    import { mapState } from 'vuex'

    export default Vue.extend({

        components: {
            SvgIcon,
            BlockPopupManage,
        },
        props: {
            tableButtons: {
                type: Array,
                required: true,
            },
            selectedRows: {
                type: Array,
                required: false,
            },
            table: {
                type: Object,
                required: true,
            },
            title: {
                type: String,
            },
            activeIndex: {
                type: Number,
            },
            componentIndex: {
                type: Number,
            },
        },

        data() {
            return {
                showPopUp: false,
                showPopup1: false,
            }
        },

        computed: {
            ...mapState({
                non_beta_user: state => state['User'].non_beta_user,
			}),
        },
        methods: {
            hidePopup() {
                this.showPopUp = false
            },

            openDrop() {
                if(this.$refs.dropdown.classList.contains('active')) {
                    this.$refs.dropdown.classList.remove('active')
                } else {
                    this.$refs.dropdown.classList.add('active')
                }
            },

            // hideDrop() {
            //     this.showPopup1 = false;
            // },

            clickEvent(title) {
                if(this.selectedRows.length === 0) {
                    return false
                }
                const ids = []
                const rows = []
                const toLender = []
                this.selectedRows.forEach(element => {
                    ids.push({
                        id: element.id,
                    })
                    rows.push(element)
                    toLender.push(parseInt(element.id))
                })
                if(title === 'sendToLenders') {
                    this.$emit('openPopup', toLender)
                    return false
                }

                if(title === 'deleteDeal') {
                    this.$emit('openPopupDelete', ids)
                    return false
                }

                if(title === 'openDeal') {
                    ids.forEach((obj) => {
                        window.open(`/individual-deal/${obj.id}`)
                    })
                    this.$emit('unCheckRows', this.componentIndex)
                    return false
                }

                this.$store.dispatch(title, ids).then(response => {
                    if(response.status) {
                        if(title === 'archiveDeal') {
                            this.$emit('removeFromTableArrayLender', 'table', toLender, 'dealsLender', 0)
                            this.$emit('removeFromTableArrayLender', 'tableSaved', toLender, 'savedDeals', 1)
                            this.$store.commit('SET_DEALS_LENDER_PAGINATION_TOTAL', rows.length)
                            this.$store.commit('SET_DEALS_LENDER_ARCHIVED', rows)
                            new GlobalNot(response.message, 'success')
                        } else if(title === 'saveDeal') {
                            this.$emit('removeFromTableArrayLender', 'tableSaved', toLender, 'savedDeals', 1)
                            new GlobalNot(response.message, 'success')
                            this.$store.commit('SET_DEALS_LENDER_SAVED', rows)
                        } else if(title === 'unarchivedDeal') {
                            this.$emit('removeFromTableArrayLender', 'tableArchived', toLender, 'archivedDeals', 2)
                            this.$store.commit('SET_DEALS_LENDER', rows)
                        } else if(title === 'unsavedDeal') {
                            this.$emit('removeFromTableArrayLender', 'tableSaved', toLender, 'savedDeals', 1)
                        }
                        this.$emit('checkRows')
                    } else if(!response.status && (title === 'saveDeal' || title === 'archiveDeal')) {
                        new GlobalNot(response.message, 'error')
                    }
                })
            },
        },
    })
</script>

<style lang="scss" scoped>
    .table-head {
        margin-bottom: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        position: relative;
        
        @include mq($xl + 1, min) {
            flex: 0 0 75%;
            max-width: 75%;
        }

        @include mq($md) {
            margin-bottom: 33px;
        }
    }

    .table-head-left {
        display: flex;
        align-items: center;
    }

    .table-head-left-check {
        margin-right: 13px;

        .chk-box-text {
            height: 18px;
        }
    }

    .table-head-left-btn {
        display: inline-flex;
        align-items: center;
        margin-right: 31px;

        @include mq($md) {
            margin-right: 0;
            margin-bottom: 10px;
        }

        &:last-of-type {
            margin-right: 0;
            margin-bottom: 0;
        }
    }

    .table-head-left-btn-icon {
        font-size: 14px;
        height: 14px;
        margin-right: 5px;
    }

    .table-head-left-btn-outer {
        position: relative;
    }

    .table-head-left-btn-drop {
        position: relative;
        padding-right: 15px;
        display: none;

        @include mq($md) {
            display: block;
        }
    }

    .table-head-left-btn-drop-icon {
        font-size: 10px;
        right: 0;
        left: auto;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin-top: 2px;
    }

    .table-head-left-btn-wrap {

        @include mq($md) {
            position: absolute;
            bottom: -15px;
            left: 0;
            opacity: 0;
            pointer-events: none;
            transition: $dur $ease;
            transform: translateY(100%);
            z-index: 10;
            background-color: $white;
            padding: 10px 15px;
            width: 180px;
            box-shadow: 0 0 5px 0 rgba($black, .15);
        }

        &.active {
            opacity: 1;
            pointer-events: all;
            bottom: -8px;
            transition: $dur $ease;
        }
    }

    .table-head-right {
        display: flex;
        align-items: center;

        .page-no-data & {
            pointer-events: none;
            opacity: 0.6;
        }
    }

    .table-head-right-icon-btn-wrap {
        display: flex;
        align-items: center;
    }

    .table-head-right-icon-btn {
        margin-left: 5px;
        width: 41px;
        height: 30px;
        background-color: transparent;
        color: $santas-gray;
        border-radius: 11px;
        transition: $dur $ease;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            color: $yellow-orange;
            transition: $dur $ease;
        }

        &:first-of-type {
            margin-left: 0;
        }

        &.active {
            color: $blue-chill;
            background-color: rgba($blue-chill, .1);
            transition: $dur $ease;
        }
    }

    .table-head-right-icon-btn-icon {
        font-size: 15px;
        height: 15px;
    }

    .table-head-right-btn {
        display: inline-flex;
        align-items: center;
        margin-left: 0;
    }

    .table-head-right-btn-icon {
        font-size: 20px;
        height: 20px;
        margin-right: 8px;
    }

    .scroll-indicator {
        position: absolute;
        bottom: -27px;
        right: 45px;
        font-size: 19px;
        height: 23px;
        color: $mosque;
        animation: scroll-finger 2.5s ease-in-out infinite alternate;
        animation-direction: alternate;
        z-index: 2;
        display: none !important;

        @keyframes scroll-finger {
            0% {
                transform: translateX(30px);
            }
        
            100% {
                transform: translateX(-30px);
            }
        }

        @include mq($lg) {
            display: block !important;
        }
    }

    .btn-disabled {
        pointer-events: none;
        color: $silver;
    }
</style>
