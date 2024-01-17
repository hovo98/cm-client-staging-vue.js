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
      <h3 class="block-title popup__title">Sorry, nothing to see here.</h3>
      <div class="entry-content">
        <p>This quote has been deleted because the deal was edited and reposted. </p>
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
			this.$router.push({ path: '/broker-deals' })
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

	.popup__title {
        font-family: $font-second;
        font-size: 24px;
        text-align: center;
        font-weight: 700;
        line-height: 1.3;
        color: $shark;
        letter-spacing: 0.15px;
        margin-bottom: 29px;

        @include mq($md) {
            font-size: 22px;
            line-height: 1.2;
        }

        @include mq($sm) {
            margin-bottom: 20px;
        }
    }
</style>