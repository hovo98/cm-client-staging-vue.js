<template>
  <div class="popup__wrap">
    <div class="popup">
      <a
        class="popup__close"
        href="javascript:;"
        @click="closePopup"
      />
      <div class="entry-content">
        <p class="popup__title">Are you sure you want<br> to edit your deal?</p>
        <ul class="popup__list">
          <li class="popup__list-item">Your deal will be moved to your drafts folder, and it will be removed from lenders’ dashboards.</li>
          <li class="popup__list-item">Any quotes you received will be deleted and unable to be recovered.</li>
          <li class="popup__list-item">When you publish the deal again, lenders will be notified as if it’s a new deal.</li>
        </ul>
      </div>
      <label class="chk-box chk-box--alt popup__checkbox">
        <input
          v-model="editDealAccept"
          type="checkbox"
          @click="isChecked($event)"
        >
        <span
          class="chk-box-text chk-box-text__left"
          :class="validation ? 'chk-box-text chk-box-text__left red':'chk-box-text chk-box-text__left'"
        >I understand I can only edit a deal once every 24 hours.</span>
      </label>
      <div class="popup__btn-wrap">
        <a
          class="btn popup__btn btn--alt"
          href="javascript:;"
          @click="closePopup"
        >Nevermind</a>
        <a
          :class="editDealAccept ? 'btn popup__btn':'btn popup__btn'"
          href="javascript:;"
          @click="editDeal"
        >Edit Deal</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {

	data() {
		return {
			editDealAccept: false,
			validation: false,
		}
	},
	methods: {
		closePopup() {
			this.$emit('closePopup')
		},
		editDeal() {
			if(this.editDealAccept) {
				this.$emit('editDeal')
				return
			}
			this.validation = true
		},
		isChecked(event) {
			if(event.target.checked) {
				this.editDealAccept = true
				this.validation = false
				return
			}
			this.editDealAccept = false
		},
	},
}
</script>

<style lang="scss" scoped>
	.popup {
		padding: 55px 30px 50px 30px;
		text-align: center;

		@include mq(500px) {
			padding: 81px 15px 50px 15px;
		}

		@media (max-height: 640px) {
			& {
				height: 100%;
				overflow: scroll;
			}
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

	.popup .entry-content .popup__title {
		font-size: 25px;
		font-weight: 700;
		// padding: 0 62px;

		@include mq(640px) {
			font-size: 18px;
			padding: 0;
			line-height: 1.2;
		}
	}

	.popup__list {
		text-align: left;
		background-color: $aqua-haze;
		padding: 25px 15px;
		margin: 0;
	}

	.popup__list .popup__list-item {
		list-style-type: none;
		&::before {
			background-color:#0C8E8B;
			height: 8px;
			width: 8px;
		}
	}

	.popup__checkbox {
		width: 100%;
		margin-bottom: 25px;
		position: relative;
	}

	.chk-box-text {
		text-transform: none;
	}

	.chk-box-text::before {
		top: 1px;
	}

	.chk-box-text.chk-box-text__left {
		color: $mosque;
		font-weight: 600;
		font-size: 14px;
	}

	.chk-box-text.chk-box-text__left.red {
		color: $red;
	}

	.chk-box--alt .chk-box-text::after {
		top: 4px;
	}
	
	.btn.popup__btn.disabled {
		pointer-events: all;
	}
</style>