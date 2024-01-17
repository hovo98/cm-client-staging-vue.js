<template>
  <div class="crd-sidebar-holder">
    <div class="crd-sidebar">
      <h2 class="dash-title crd-sidebar--title">Create soft quote</h2>
      <ul class="crd-list">
        <li
          v-for="(listItem, index) in sidebarList"
          :key="listItem.id"
          :class="['crd-sidebar__step', listItem.stepStatus ? 'crd-sidebar__step-passed' : null, listItem.currentStep ? 'active': null, listItem.subList && listItem.openSidebar ? 'is_parent' : '']"
        >
          <div>
            <router-link
              v-if="listItem.stepStatus"
              class="crd-sidebar__step-inner"
              :to="url(listItem.reference)"
            >
              <div class="crd-sidebar__step-circle">
                <span
                  v-if="!listItem.stepStatus"
                  class="crd-sidebar__step-num"
                >{{ index + 1 }}</span>
                <SvgIcon
                  v-else
                  class="crd-sidebar__step-status"
                  icon-name="ico-check"
                />
              </div>
              <span class="crd-sidebar__step-title crb-step-title">{{ listItem.title }}</span>
            </router-link>

            <div
              v-else
              class="crd-sidebar__step-inner"
            >
              <div class="crd-sidebar__step-circle">
                <span
                  v-if="!listItem.stepStatus"
                  class="crd-sidebar__step-num"
                >{{ index + 1 }}</span>
                <SvgIcon
                  v-else
                  class="crd-sidebar__step-status"
                  icon-name="ico-check"
                />
              </div>
              <span class="crd-sidebar__step-title crb-step-title">{{ listItem.title }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'

interface Data {
  title: string,
}

export default Vue.extend({
  components: {
    SvgIcon,
  },
  props: {
    dealID: {
      type: Number,
      required: true,
    },
    quoteID: {
      type: String,
      required: true,
    },
  },
  data(): Data {
    return {
      title: 'This is title of "BlockCreateDealSidebar"!',
    }
  },
  computed: {
    showLinks() {
      return this.$store.getters.getQuoteFinishedStatus
    },
    sidebarList() {
      if(this.type === 'deal') {
        return this.$store.getters.getSidebar
      } else {
        return this.$store.getters.getQuoteSidebar
      }
    },
  },
  methods: {
    url(reference) {
      if(this.quoteID !== 0) {
        return '/create-quote/' + this.dealID + '/' + reference + '/' + this.quoteID
      }
      return this.dealID

    },
  },
})
</script>

<style lang="scss" scoped>
.crd-sidebar-holder {
  padding-left: 28px;
  flex: 0 0 22.2%;
  min-width: 22.2%;

  @include mq($lg) {
    padding-left: 0;
    flex: 0 0 100%;
  }
}

.crd-sidebar {
  background-color: $fantasy;
  padding: 26px 30px;
  min-height: calc(100vh - 234px);
  height: 100%;

  @include mq($lap-l) {
    padding: 26px 15px;
  }

  @include mq($lg) {
    min-height: auto;
  }
}

.crd-sidebar--title {
  margin-bottom: 29px;
}

.crd-list {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 12px;
    height: calc(100% - 30px);
    width: 2px;
    top: 50%;
    transform: translateY(-50%);
    background-color: $yellow-orange;
  }

  @include mq($lg) {
    display: flex;

    &::before {
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      height: 2px;
      width: calc(80% - 26px);
    }
  }
}

.crd-sidebar__step {
  position: relative;
  padding-left: 62px;
  margin-bottom: 24px;

  > a {
    display: inline-block;
  }

  &.active {
    .crd-sidebar__step-inner {
      >.crb-step-title.crd-sidebar__step-title {
        color: $yellow-orange;
      }

      > .crd-sidebar__step-circle {
        background-color: $yellow-orange;
        border-color: $yellow-orange;

        .crd-sidebar__step-num  {
          color: $white;
        }
      }
    }
  }

  &.is_parent {
    .crd-sidebar__step-inner {
      > .crb-step-title.crd-sidebar__step-title {
        color: $yellow-orange;
      }

      > .crd-sidebar__step-circle {
        background-color: $yellow-orange;
        border-color: $yellow-orange;

        .crd-sidebar__step-num  {
          color: $white;
        }

        > .crd-sidebar__step-status {
          color: $white;
        }
      }
    }
  }

  & .crd-sidebar__step-passed {
    .crd-sidebar__step-inner {
      > .crb-step-title {
        color: #2f3034;
      }
    }
  }

  @include mq($lg + 1, min) {
    &:last-of-type {
      &::before {
        content: '';
        position: absolute;
        width: 4px;
        height: 100%;
        top: 0;
        left: 11px;
        background-color: $fantasy;
        display: block;
        z-index: 0;
      }
    }
  }

  @include mq($lap-l) {
    padding-left: 40px;
    margin-bottom: 17px;
  }

  @include mq($lg) {
    padding: 30px 5px 0;
    text-align: center;
    width: 20%;
    flex: 0 0 20%;
  }
}

.crd-sidebar__step-circle {
  height: 26px;
  width: 26px;
  border-radius: 50%;
  border: 1px solid $santas-gray;
  background-color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;

  @include mq($lg) {
    left: 50%;
    margin-left: -13px;
  }
}

.crd-sidebar__step-passed {
  .crd-sidebar__step-inner .crb-step-title {
    color: $shark;
  }

  .crd-sidebar__step-inner > {
    .crd-sidebar__step-circle {
      border-color: $yellow-orange;
    }
  }
}

.crd-sidebar__step-num {
  font-family: $font-second;
  color: $santas-gray;
  font-size: 15px;
  font-weight: 600;
  line-height: 0;
}

.crb-step-title {
  font-family: $font-second;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0.09px;
  color: $santas-gray;
  line-height: 1.2;
  display: inline-block;

  &.active {
    color: $yellow-orange;
  }

  @include mq($lap-l) {
    font-size: 16px;
  }

  @include mq($lap-small) {
    font-size: 14px;
  }

  @include mq($lg) {
    font-size: 12px;
  }

  @include mq($sm) {
    font-size: 10px;
  }
}

.crd-sublist {
  margin-top: 25px;

  .active-sublist .crb-step-title {
    color: $yellow-orange;
  }

  @include mq($lap-l) {
    margin-top: 18px;
  }

  @include mq($lg) {
    display: none;
  }
}

.crd-sublist__step {
  padding-left: 24px;
  margin-bottom: 26px;
  position: relative;

  > a {
    display: inline-block;
  }

  @include mq($lap-l) {
    margin-bottom: 15px;
  }
}

.crd-sidebar__step-status {
  font-size: 11px;
  color: $yellow-orange;
}

.crd-sublist__step-status {
  position: absolute;
  left: 0;
  top: 5px;
}

</style>
