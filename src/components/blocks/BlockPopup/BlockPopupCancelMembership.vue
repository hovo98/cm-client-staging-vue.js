<template>
  <div class="popup__wrap">
    <div
      v-click-outside="cancelForm"
      class="popup"
    >
      <a
        class="popup__close"
        href="javascript:;"
        @click.stop="cancelForm"
      />
      <template v-if="!membershipSuccesfullyCanceled">
        <h3 class="popup__title">
          Are you sure you want to cancel your membership?
        </h3>
        <p class="popup__subtitle">
          By canceling, you'll forgo the {{ quotesNumber }} soft quotes you currently have
          under broker consideration.
        </p>

        <div class="popup__btn-wrap">
          <a
            class="btn btn--small"
            href="javascript:;"
            @click="cancelMembership()"
          >Cancel Plan</a>
          <a
            class="btn btn--alt btn--small"
            href="javascript:;"
            @click.stop="cancelForm"
          >Keep Membership</a>
        </div>
      </template>
      <template v-else>
        <h3 class="popup__title">We'll miss you, <br /> {{ user.first_name }}</h3>
        <p class="popup__subtitle">
          You've successfully cancelled your membership. You will not be charged for any further billing periods.
        </p>
        <div class="popup__btn-wrap">
          <a
            class="btn btn--alt btn--small"
            href="javascript:;"
            @click="cancelForm"
          >Close</a>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import ClickOutside from "vue-click-outside"

interface Data {
  membershipSuccesfullyCanceled: boolean;
}

export default Vue.extend({
  directives: {
    ClickOutside,
  },
  props:{
    quotesNumber:{
      type: Number,
      default: 0,
    },
  },
  data(): Data {
    return {
      membershipSuccesfullyCanceled: false,
    }
  },
  computed: {
        user() {
            return this.$store.getters.getUser
        },
    },
  methods: {
    cancelForm() {
      this.$emit("closePopup")
    },
    async cancelMembership() {
      try {
        //Cancel membership
        this.membershipSuccesfullyCanceled = true
      } catch (error) {
        console.log(error)
      }
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
  max-height: 80vh;
  box-shadow: 0 2px 30px rgba($black, 0.1);
}

.popup__title {
  font-size: 20px;
    font-weight: 600;
  text-align: center;
  margin: auto;
  margin-bottom: 40px;
  max-width: 300px;
}

.popup__subtitle {
  font-size: 16px;
  margin: auto;
  margin-bottom: 40px;
  text-align: center;
  max-width: 300px;
}


.popup__btn-wrap {
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
</style>
