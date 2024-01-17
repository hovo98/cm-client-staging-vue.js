<template>
  <div class="popup__wrap">
    <div class="popup">
      <a
        class="popup__close"
        href="javascript:;"
      />
      <h3 class="title-extra-small popup__title">Save your Filters</h3>
      <div class="entry-content">
        <p>{{ info.text }}</p>
      </div>
      <div class="popup__input-wrap">
        <div class="input-holder">
          <label
            for="filter-name"
            class="input-label"
          >Filters Name</label>
          <input
            id="filter-name"
            type="text"
            name="FilterName"
          >
        </div>
      </div>
      <div class="popup__info-wrap">
        <h3 class="title-extra-small popup__info-title">Filters conditions to be saved</h3>
        <ul class="popup__info-list">
          <template v-for="(item, index) in items">
            <li
              :key="index"
              class="popup__info-list-item"
            >
              <span class="popup__info-list-item-name">{{ item.title }}</span>
              <span class="popup__info-list-item-val">{{ item.val }}</span>
            </li>
          </template>
        </ul>
      </div>
      <div class="popup__btn-wrap">
        <a
          class="btn popup__btn"
          href="javascript:;"
        >Save Filters</a>
        <a
          class="btn btn--alt popup__btn"
          href="javascript:;"
        >Cancel</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            info: {
                text: "Save current filters' criteria. After saving, they can be reached from the Filters button.",
            },
            items: [
                {
                    title: 'Property type:',
                    val: 'Retail, Warehouse',
                },
                {
                    title: 'Date posted:',
                    val: 'Today',
                },
                {
                    title: 'Status:',
                    val: 'Term Sheet',
                },
                {
                    title: 'Loan size:',
                    val: '$5k - $10k',
                },
            ],
        }
    },
}
</script>

<style lang="scss" scoped>
    .popup {
        max-width: 616px;
        padding: 50px 30px;

        @include mq($sm) {
            max-width: 90%;
            padding: 40px 30px 20px;
        }

        @include mq(450px) {
            width: 100%;
            padding: 40px 25px 20px;
        }

        .entry-content {
            margin-bottom: 5px;
            padding-right: 44px;

            @include mq($lap-small) {
                padding-right: 0;
            }

            p {
                font-weight: 400;
                letter-spacing: .1px;
                line-height: 1.6;
                margin-bottom: 25px;

                @include mq($sm) {
                    font-size: 15px;
                    margin-bottom: 15px;
                }
            }
        }
    }

    .input-holder {
        margin-bottom: 0;
        max-width: 512px;
    }

    .input-label {
        letter-spacing: -.2px;
    }

    .popup__title {
        margin-bottom: 33px;

        @include mq($sm) {
            margin-bottom: 20px;
        }
    }

    .popup__input-wrap {
        margin-bottom: 30px;
        padding-right: 44px;

        @include mq($lap-small) {
            padding-right: 0;
        }

        @include mq($sm) {
            margin-bottom: 20px;
        }
    }

    .popup__info-wrap {
        margin-bottom: 49px;
        padding-right: 44px;

        @include mq($lap-small) {
            padding-right: 0;
        }

        @include mq($md) {
            margin-bottom: 30px;
        }

        @include mq($sm) {
            margin-bottom: 20px;
        }
    }

    .popup__info-title {
        margin-bottom: 10px;
    }

    .popup__info-list-item-name {
        display: inline-block;
        font-family: $font-main;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: .08px;
        color: $santas-gray;
        margin-right: 5px;

        @include mq($sm) {
            font-size: 15px;
        }
    }

    .popup__info-list-item-val {
        display: inline-block;
        font-family: $font-main;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: .08px;
        color: $shark;

        @include mq($sm) {
            font-size: 15px;
        }
    }
</style>