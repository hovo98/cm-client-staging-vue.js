<template>
  <div class="popup__wrap">
    <div class="popup">
      <a
        class="popup__close"
        href="javascript:;"
        @click="closePopup"
      />
      <div class="popup__image">
        <img
          src="@/assets/images/sad-smiley.png"
          alt=""
        >
      </div>
      <div class="entry-content">
        <p>Sorry, this deal has been edited and no longer fits your preferences.</p>
      </div>
      <div class="popup__btn-wrap">
        <a
          class="btn popup__btn"
          href="javascript:;"
          @click="closePopup"
        >Browse All Deals</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	methods: {
		closePopup() {
			this.$router.push({ path: '/lender-deals' })
		},
	},
}
</script>

<style lang="scss" scoped>
    .popup {
        padding: 40px 30px 50px 30px;
        max-width: 560px;
    }

    .entry-content {
        p {
            text-align: center;
        }
    }

    .popup__image {
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 110px;
		width: 100%;
		margin: 34px auto 20px;
	}
</style>