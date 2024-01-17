<template>
  <div
    v-if="open"
    class="popup__wrap"
    @click="close"
  >
    <div class="popup">
      <a
        class="popup__close"
        href="javascript:;"
        @click.stop="$emit('close')"
      />
      <h3 class="popup__title">
        Unlock Zoom Call Feature
      </h3>
      <p class="popup__subtitle">
        Zoom Calls are included as part of premium features.
      </p>

      <div class="popup__plans">
        <div class="popup__plan popup__plan--recommended">
          <div class="popup__plan__highlight">
            <span>Recommended</span>
          </div>
          <div class="popup__plan__body">
            <p class="popup__plan__heading">Subscribe</p>
            <p class="popup__plan__description">Subscribe to the plan that best suits your needs and enjoy premium features for all your deals.</p>
            <div class="popup__btn-wrap">
              <button
                class="btn btn--small"
                @click="handleSubscribe"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import ClickOutside from "vue-click-outside"

export default Vue.extend({
  directives: {
    ClickOutside,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },

    deal: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      oneTimePayment: {
        checkout_url: null,
        price: null,
      },
    }
  },

  methods: {
    close(event) {
      const isInsideModal = event.target.closest('.popup')
      if (!isInsideModal) {
        this.$emit("close")
      }
    },

    async handleSubscribe() {
      const response = await this.$store.dispatch('getSparkUrl', {
        return_url: `${window.location.origin}${window.location.pathname}`,
      })
      window.location.href = response.data.data.sparkLogin.success
    },
  },
})
</script>

<style lang="scss" scoped>
.popup__wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  overflow-y: auto;
  max-height: 80vh;
  box-shadow: 0 2px 30px rgba($black, 0.1);
}

.popup__title {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin: auto;
  margin-bottom: 24px;
  max-width: 300px;
}

.popup__subtitle {
  font-size: 16px;
  margin: auto;
  margin-bottom: 40px;
  text-align: center;
  max-width: 460px;
  color: $grey;
}

.popup__subtitle > span {
  font-weight: 600;
}

.popup__btn-wrap {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  position: relative;

  @include mq($md, min) {
    gap: 20px;
  }

  @include mq(374px) {
    justify-content: space-between;
    flex-wrap: nowrap;
  }
}

.popup__close {
  z-index: 2;
}

.popup__wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  max-height: 80vh;
  box-shadow: 0 2px 30px rgba($black, 0.1);
  max-width: 710px;
}

.popup__title {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin: auto;
  margin-bottom: 24px;
  max-width: 300px;
}

.popup__subtitle {
  font-size: 16px;
  margin: auto;
  margin-bottom: 40px;
  text-align: center;
  max-width: 460px;
  color: $grey;
}

.popup__subtitle > span {
  font-weight: 600;
}

.popup__btn-wrap {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  position: relative;

  @include mq($md, min) {
    gap: 20px;
  }

  @include mq(374px) {
    justify-content: space-between;
    flex-wrap: nowrap;
  }
}

.popup__close {
  z-index: 2;
}

.popup__plans {
  display: flex;
  justify-content: center;
  align-items: center;

  & > * + * {
    margin-left: 32px;
  }

  & > .popup__plan {
    border: 0.75px solid $mosque;
    width: 50%;
    padding: 30px 15px;
    border-radius: 4px;
    min-height: 308px;
    display: flex;
    flex-direction: column;

    &:hover {
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
    }

    &--recommended {
      padding: 0px;

      & .popup__plan__body {
        padding: 30px 15px;
      }
    }

    & > .popup__plan__body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      flex-grow: 1;
    }


    & > .popup__plan__highlight {
      text-align: center;
      padding: 4px 0;
      background: $mosque;
      color: $white;
      font-style: italic;
      font-size: 14px;
    }

    & .popup__plan__heading {
      font-size: 18px;
      color: $grey-dark;
      text-align: center;
      font-weight: 600;
    }

    & .popup__plan__description {
      font-size: 14px;
      text-align: center;
      color: $grey;
      font-weight: 400;
      margin-top: 24px;
      min-height: 75px;
      height: 100%;
    }
  }
}

.popup__plan--free {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
  text-decoration: underline;
}
</style>
