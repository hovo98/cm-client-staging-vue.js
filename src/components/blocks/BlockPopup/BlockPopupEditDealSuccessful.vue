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
          src="@/assets/images/accepted/accepted.png"
          alt=""
        >
      </div>
      <div class="entry-content">
        <p class="popup__title">Success!</p>
        <p class="popup__text">This deal has been moved to your drafts folder, and was removed from lenders’ dashboards.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	methods: {
		closePopup() {
			this.$store.commit('REMOVE_DEAL_QUOTES', true)
			this.$emit('closePopupSuccess')
		},
	},
}
</script>

<style lang="scss" scoped>
	.popup {
		padding: 81px 30px 50px 30px;
		text-align: center;

		@include mq(500px) {
			padding: 81px 15px 50px 15px;
		}
	}

	.popup .entry-content .popup__text {
		font-weight: 500;
	}

	.popup__btn-wrap {
		@include mq(420px) {
			flex-direction: column;
			.btn {
				min-width: 100%;
				margin: 0 0 10px;
			}
		}
	}

	.entry-content .popup__title {
		font-size: 22px;
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