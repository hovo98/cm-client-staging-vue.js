<template>
  <div class="dots-dropdown">
    <div v-click-outside="hideBtn" class="blockList-wrap__button" @click="toggleActive">
      <button class="blockList-wrap__btn">
        <SvgIcon class="blockList-wrap__link-icon" icon-name="ico-dots-three" />
      </button>
      <div class="blockList-wrap__button-drop">
        <a v-if="quote && quoteLink === ''" class="blockList-wrap__button-drop-link" href="javascript:;"
          @click="$router.push({ path: '/create-quote/' + $route.params.id });">
          <SvgIcon class="blockList-wrap__button-drop-link-icon" icon-name="ico-comm-cl" />Create soft quote
        </a>
        <a v-if="quote && quoteLink !== ''" class="blockList-wrap__button-drop-link" :href="quoteLink">
          <SvgIcon class="blockList-wrap__button-drop-link-icon" icon-name="ico-comm-cl" />Continue soft quote
        </a>


        <a v-if="send" class="blockList-wrap__button-drop-link" href="javascript:;">
          <SvgIcon class="blockList-wrap__button-drop-link-icon" icon-name="ico-plane-cl" />Send
        </a>
        <!-- <a v-if="print" class="blockList-wrap__button-drop-link" href="javascript:;"><SvgIcon class="blockList-wrap__button-drop-link-icon" iconName="ico-print"/>Print</a> -->
        <a v-if="del" class="blockList-wrap__button-drop-link" href="javascript:;" @click="openPopup">
          <SvgIcon class="blockList-wrap__button-drop-link-icon" icon-name="ico-trash" />Delete
        </a>

        <a v-if="del && isFinished" class="blockList-wrap__button-drop-link" href="javascript:;"
          @click="openPopupEditDeal">
          <SvgIcon class="blockList-wrap__button-drop-link-icon" icon-name="ico-edit" />Edit Deal
        </a>

        <a v-if="del && isFinished && !isPremium" class="blockList-wrap__button-drop-link" href="javascript:;"
          @click="handleUpgradeDeal">
          <SvgIcon class="blockList-wrap__button-drop-link-icon" icon-name="ico-plus-circle" />Upgrade Deal
        </a>

        <a v-if="del && isFinished" class="blockList-wrap__button-drop-link" href="javascript:;"
          @click="openPopupShareFromCom">
          <SvgIcon class="blockList-wrap__button-drop-link-icon" icon-name="ico-paper-plane" />Share Deal
        </a>

        <a v-if="is_skipped" class="blockList-wrap__button-drop-link" href="javascript:;" @click="skipDeal">
          <SvgIcon class="blockList-wrap__button-drop-link-icon" icon-name="ico-skip" /> Skip deal
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
import ClickOutside from 'vue-click-outside'

interface Data {
  title: string
}

export default Vue.extend({

  components: {
    SvgIcon,
  },

  directives: {
    ClickOutside,
  },
  props: {
    quote: {
      type: Boolean,
      default: true,
    },
    send: {
      type: Boolean,
      default: true,
    },
    print: {
      type: Boolean,
      default: true,
    },
    del: {
      type: Boolean,
      default: true,
    },
    is_skipped: {
      type: Boolean,
    },
    isFinished: {
      type: Boolean,
    },
    quoteLink: {
      type: String,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
  },

  data(): Data {
    return {
      title: '',
    }
  },

  methods: {
    skipDeal() {
      this.$emit('skipDeal')
    },

    hideBtn() {
      const btn = document.querySelector('.blockList-wrap__button')
      if (btn)
        btn.classList.remove('active-btn')
    },

    toggleActive() {
      const btn = document.querySelector('.blockList-wrap__button')
      if (btn)
        btn.classList.toggle('active-btn')
    },

    openPopup() {
      this.$emit('openPopupDelete')
    },

    openPopupSkip() {
      this.$emit('openPopupDelete')
    },

    openPopupShareFromCom() {
      this.$emit('openPopupShare')
    },

    openPopupEditDeal() {
      this.$emit('openPopupEditDeal')
    },

    closePopupShareFromCom() {
      this.$emit('closePopupShare')
    },

    handleUpgradeDeal() {
      this.$emit('upgradeDeal')
    },
  },
})
</script>

<style lang="scss" scoped>
.blockList-wrap__button {
  position: relative;

  &.active-btn {

    .blockList-wrap__button-drop {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }
  }
}

.blockList-wrap__button {
  position: relative;

  &.active-btn {

    .blockList-wrap__button-drop {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }
  }
}

.blockList-wrap__btn {
  position: relative;
  width: 49px;
  height: 20px;
  background-color: rgba(12, 142, 139, 0.1);
  border-radius: 4px;
  border: none;
  transition: $dur $ease;

  .blockList-wrap__link-icon {
    @include center;
    color: $blue-chill;
    font-size: 24px;
    transition: $dur $ease;
  }

  &:hover {
    background-color: $blue-chill;

    .blockList-wrap__link-icon {
      color: $grey-light;
    }
  }

  &:focus {
    outline: none;
  }
}

.blockList-wrap__button-drop {
  display: flex;
  flex-direction: column;
  min-width: 214px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  background: $white;
  padding: 16px 0 14px 19px;
  position: absolute;
  top: 31px;
  right: 0;
  z-index: 5;
  transition: $dur $ease;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.blockList-wrap__button-drop-link {
  position: relative;
  font-size: 14px;
  font-family: $font-main;
  font-weight: 700;
  line-height: 30px;
  color: $mosque;
  padding-left: 23px;
  margin-top: 4px;
  transition: $dur $ease;

  &:first-child {
    margin-top: 0;
  }

  @include hover {
    color: $yellow-orange;
  }

  @include mq(450px) {
    font-size: 13px;
    padding-left: 20px;
  }
}

.blockList-wrap__button-drop-link-icon {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);

  @include mq(450px) {
    font-size: 12px;
  }
}
</style>
