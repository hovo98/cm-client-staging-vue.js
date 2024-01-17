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
        <p>That’s Odd…</p>
        <p class="popup-text">This deal has been deleted or doesn’t exist anymore.<br> Try another one.</p>
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
import { mapState } from 'vuex'
export default {
	methods: {
		closePopup() {
			this.$store.dispatch('dealDoesntExistChange', false)
		},
	},

	computed: {
    ...mapState({
		deal: (state) => state['FilterDeal'].deal,
		quotes: (state) => state['FilterDeal'].dealQuotes,
		dealSheet: (state) => state['FilterDeal'].dealSheet,
		is_skipped: (state) => state['FilterDeal'].is_skipped,
    }),
  },

}
</script>

<style lang="scss" scoped>
	.popup {
		padding: 55px 30px 50px 30px;
	}

	.entry-content {
		text-align: center;
		.popup-text {
			font-weight: 500;
			margin-bottom: 0;
		}
	}

	.popup__btn {
		margin-top: 10px;
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