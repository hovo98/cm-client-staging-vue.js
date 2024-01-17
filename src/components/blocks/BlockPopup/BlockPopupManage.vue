<template>
  <div class="popup__wrap">
    <div
      v-click-outside="hidePopup"
      class="popup"
    >
      <a
        class="popup__close"
        href="javascript:;"
        @click="hidePopup()"
      />
      <h3 class="title-extra-small popup__title">Customize Columns</h3>
      <span
        v-if="title === 'dealDefaultLender'"
        class="popup__subtitle"
      >Select the 6 columns you'd like to see</span>
      <span
        v-else
        class="popup__subtitle"
      >Select up to 4 columns you'd like to see</span>
      <ul class="popup__list error-message-holder">
        <perfect-scrollbar class="popup-list-ps">
          <template v-for="(item, index) in allColumns">
            <li
              :key="index"
              class="popup__list-item"
            >
              <label
                :for="`chk-${index}`"
                class="chk-box chk-box--alt"
              >
                <input
                  :id="`chk-${index}`"
                  type="checkbox"
                  :checked="columns.includes(item.field)"
                  @change="changeCheck($event, item.field)"
                >
                <span
                  class="chk-box-text"
                  v-html="item.label"
                />
              </label>
              <!-- <SvgIcon class="popup__list-item-dots" iconName="ico-dots"/> -->
            </li>
          </template>
        </perfect-scrollbar>
        <span
          v-if="msgShow"
          class="error-message"
        >Select up to 4 columns</span>
      </ul>
      <span
        v-if="title === 'dealDefaultLender'"
        class="popup__info"
      >More column types coming soon.</span>
      <div class="popup__btn-wrap">
        <div class="submit-btn-holder popup__btn-holder popup__btn">
          <a
            class="btn popup__btn"
            href="javascript:;"
            @click="saveChecked()"
          >Save</a>
          <img
            v-if="showLoader"
            src="@/assets/images/loader.gif"
            alt="loader"
            class="submit-btn-loader submit-btn-loader--inline"
          >
        </div>
        <a
          class="btn btn--alt popup__btn"
          href="javascript:;"
          @click="hidePopup()"
        >Cancel</a>
      </div>
    </div>
  </div>
</template>

<script>
    // import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue';
    import ClickOutside from 'vue-click-outside'

    export default {

        components: {
            // SvgIcon
        },

        directives: {
            ClickOutside,
        },
        props: {
            table: {
                type: Object,
            },
            title: {
                type: String,
            },
        },

        data() {
            return {
                msgShow: false,
                showLoader: false,
                arrChecked: [],
            }
        },

        computed: {
            columns() {
                return this.$store.getters[this.title]
            },
            allColumns() {
                return this.$store.getters[this.title+'Columns']
            },
        },

        beforeMount() {
            this.arrChecked = JSON.parse ( JSON.stringify (this.columns) )
        },

        methods: {
            hidePopup() {
                this.$emit('hidePopup')
            },

            changeCheck(e, field) {
                this.msgShow = false
                if(this.arrChecked.length === 3) {
                    if(!e.target.checked) {
                        e.target.checked = true
                        return false
                    }
                }

                if(this.title === 'dealDefaultLender') {
                    // if(this.arrChecked.length === 5) {
                    //     if(e.target.checked) { 
                    //         e.target.checked = false;
                    //         this.msgShow = true;
                    //         return false;
                    //     }
                    // }
                } else {
                    if(this.arrChecked.length === 4) {
                        if(e.target.checked) { 
                            e.target.checked = false
                            this.msgShow = true
                            return false
                        }
                    }
                }

                if(this.arrChecked.includes(field)) {
                    const index = this.arrChecked.findIndex(ele => ele === field)
                    this.arrChecked.splice(index, 1)
                } else {
                    this.arrChecked.push(field)
                }
            },

            async saveChecked() {
                if(!this.showLoader) {
                    this.showLoader = true
                    await this.$store.dispatch('setManageTable', {arr: this.arrChecked, title: this.title})
                    this.showLoader = false
                    this.hidePopup()
                }
            },
        },
    }
</script>

<style lang="scss" scoped>

    .popup__title {
        margin-bottom: 16px;

        // @include mq($sm) {
        //     margin-bottom: 20px;
        // }
    }

    .popup__subtitle {
        font-size: 14px;
        margin-bottom: 10px;
        display: block;
    }

    .popup__info {
        font-size: 14px;
        margin-bottom: 35px;
        font-style: italic;
        display: block;
        @include mq(640px) {
            margin-bottom: 20px;
        }
    }

    .popup-list-ps {
        max-height: 265px;
        padding-right: 20px;

        @include mq($md) {
            padding-right: 10px;
        }

        @include mq($sm) {
            max-height: 225px;
        }
    }

    .popup__list {
        margin-bottom: 20px;
        border: 2px solid $athens-gray;
        padding-right: 7px;
        padding-top: 11px;

        @include mq($sm) {
            margin-bottom: 10px;
            padding-right: 0;
            padding-top: 0;
        }
    }

    .popup__list-item {
        padding: 6px 25px 6px 18px;
        transition: $dur $ease;
        position: relative;

        @include mq($sm) {
            padding-left: 6px;
        }

        &:hover {
            background-color: $athens-gray;
            transition: $dur $ease;
        }
    }

    .popup__list-item-dots {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 9px;
        font-size: 15px;
        width: 10px;
        height: 15px;
        color: $santas-gray;
        cursor: pointer;
    }

    .chk-box {
        width: 100%;
        max-width: 100%;
    }

    :deep() {
        .ps__rail-y:hover > .ps__thumb-y,
        .ps__rail-y:focus > .ps__thumb-y,
        .ps__rail-y.ps--clicking .ps__thumb-y {
            width: 8px;
            background-color: $blue-chill;

            @include mq($md) {
                width: 4px;
            }
        }

        .ps .ps__rail-x:hover,
        .ps .ps__rail-y:hover,
        .ps .ps__rail-x:focus,
        .ps .ps__rail-y:focus,
        .ps .ps__rail-x.ps--clicking,
        .ps .ps__rail-y.ps--clicking {
            background-color: $athens-gray;
        }

        .ps__rail-y {
            width: 8px;
            max-height: 90%;
            margin-top: 10px;

            @include mq($md) {
                width: 4px;
            }
        }

        .ps__thumb-y {
            background-color: $blue-chill;
            width: 8px;
            max-height: 90%;

            @include mq($md) {
                width: 4px;
            }
        }
    }
</style>