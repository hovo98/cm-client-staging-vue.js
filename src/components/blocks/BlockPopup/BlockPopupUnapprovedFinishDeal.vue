<template>
  <div class="popup__wrap">
    <div class="popup">
      <a
        class="popup__close"
        @click="emitClose"
      />
      <div class="entry-content">
        <p>We’ve saved this deal as a draft</p>
        <p>Your account should be fully approved shortly. We’ll email you once you’re approved and can publish drafted deals for lenders in your area to review.</p>
      </div>
      <div class="popup__btn-wrap">
        <router-link
          class="btn btn--small crd-sidebar__step-inner"
          :to="'/create-deal/'"
        >
          Add another deal
        </router-link>
        <a
          class="btn btn--small crd-sidebar__step-inner"
          href="javascript:;"
          @click="goTo()"
        >View Drafts</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    emitClose: function () {
      this.$emit('close')
    },
    async goTo() {
      await this.$store.commit('SET_DRAFT_LINK', true)
      this.$router.push({path: '/broker-deals'})
    },
  },
}
</script>

<style lang="scss" scoped>

  .popup {
      padding: 55px 30px 50px 30px;
  }
  
  .crd-sidebar__step-inner {
    margin: 0 10px;
  }

</style>