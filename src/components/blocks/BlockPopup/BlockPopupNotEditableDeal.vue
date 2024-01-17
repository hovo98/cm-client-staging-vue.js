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
        <p class="popup__title">Deals can only be edited once every <span>24 hours.</span></p>
        <p
          v-if="until_next_edit === 1"
          class="popup__title"
        >
          You can edit this deal in <span class="red">{{ until_next_edit }} hour.</span>
        </p>
        <p
          v-else
          class="popup__title"
        >
          You can edit this deal in <span class="red">{{ until_next_edit }} hours.</span>
        </p>
      </div>
      <div class="popup__btn-wrap">
        <a
          class="btn popup__btn btn--alt"
          href="javascript:;"
          @click="closePopup"
        >Close</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {

    props: {
        until_next_edit: {
            type: Number,
        },
    },

	data() {
		return {
			editDealAccept: false,
		}
	},
	methods: {
		closePopup() {
			this.$emit('closePopup')
		},
		editDeal() {
			this.$emit('editDeal')
		},
		isChecked(event) {
			if(event.target.checked) {
				this.editDealAccept = true
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
	}

    .popup__image {
        width: 100px;
        margin: 0 auto 20px;
    }

	.popup .entry-content .popup__text {
		font-weight: 500;
	}

    .popup .entry-content p {
        margin-bottom: 5px;

		span {
			display: inline-block;
		}

        .red {
            color: $red;
        }
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

</style>