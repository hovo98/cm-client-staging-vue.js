<template>
  <div class="popup__wrap">
    <div class="popup">
      <a
        class="popup__close"
        href="javascript:;"
      />
      <h3 class="title-extra-small popup__title">Lenders who didn't see your deal</h3>
      <ul class="popup__list">
        <perfect-scrollbar class="popup-list-ps">
          <template v-for="(lender, index) in lenders">
            <li
              :key="index"
              class="popup__list-item"
            >
              <div
                class="popup__list-item-img"
                :style="{backgroundImage: 'url(' + lender.profile_image + ')'}"
              />
              <div class="popup__list-item-content">
                <h4
                  v-if="lender.first_name"
                  class="popup__list-item-title title-extra-small"
                >
                  {{ lender.first_name }} {{ lender.last_name }} <template v-if="lender.company">|</template> {{ lender.company }}
                </h4>
                <a
                  v-if="lender.email"
                  :href="`mailto:${lender.email}`"
                  class="popup__list-item-info"
                >{{ lender.email }}</a>
              </div>
            </li>
          </template>
        </perfect-scrollbar>
      </ul>
      <div class="popup__btn-wrap">
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
            lenders: [
                {
                    first_name: 'Sam',
                    last_name: 'Smith',
                    email: 'samsmith@gmail.com',
                    company: 'International Bank',
                    profile_image: 'https://ga.berkeley.edu/wp-content/uploads/2015/08/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
                },
                {
                    first_name: 'Sam',
                    last_name: 'Smith',
                    email: 'samsmith@gmail.com',
                    company: 'International Bank',
                    profile_image: 'https://ga.berkeley.edu/wp-content/uploads/2015/08/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
                },
                {
                    first_name: 'Sam',
                    last_name: 'Smith',
                    email: 'samsmith@gmail.com',
                    company: 'International Bank',
                    profile_image: 'https://ga.berkeley.edu/wp-content/uploads/2015/08/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
                },
                {
                    first_name: 'Sam',
                    last_name: 'Smith',
                    email: 'samsmith@gmail.com',
                    company: 'International Bank',
                    profile_image: 'https://ga.berkeley.edu/wp-content/uploads/2015/08/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
                },
            ],
        }
    },
}
</script>

<style lang="scss" scoped>
    .popup {
        max-width: 616px;
        width: 100%;
        padding: 50px 0px 50px 30px;

        @include mq($md) {
            padding: 50px 30px;
        }

        @include mq(640px) {
            max-width: 90%;
        }

        @include mq($sm) {
            padding: 40px 25px 20px;
        }
    }

    .popup__title {
        margin-bottom: 29px;

        @include mq($sm) {
            margin-bottom: 20px;
        }
    }

    .popup-list-ps {
        max-height: 302px;
        padding-right: 18px;
    }

    .popup__list {
        padding-right: 73px;
        margin-bottom: 49px;

        @include mq($md) {
            padding-right: 0;
        }

        @include mq($sm) {
            margin-bottom: 35px;
        }
    }

    .popup__list-item {
        display: flex;
        padding: 23px 30px 21px;
        border: 2px solid #f0f7f7;
        background-color: $white;

        &:not(:first-of-type) {
            border-top: none;
        }

        @include mq($md) {
            padding: 20px;
        }

        @include mq($sm) {
            padding: 15px 10px;
        }
    }

    .popup__list-item-img {
        height: 54px;
        width: 54px;
        border-radius: 50%;
        margin-right: 11px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;

        @include mq($sm) {
            width: 40px;
            height: 40px;
        }

        @include mq(400px) {
            min-width: 30px;
            height: 30px;
        }
    }

    .popup__list-item-content {
        display: flex;
        flex-direction: column;
        padding-top: 1px;
    }

    .popup__list-item-title {
        margin-bottom: 10px;
    }

    .popup__list-item-info {
        font-size: 14px;
        font-family: $font-main;
        color: $santas-gray;
        font-weight: 400;
    }

    :deep() {
        .ps__rail-y:hover > .ps__thumb-y,
        .ps__rail-y:focus > .ps__thumb-y,
        .ps__rail-y.ps--clicking .ps__thumb-y {
            width: 8px;
            background-color: $blue-chill;

            @include mq($md) {
                width: 4px;
            }
        }

        .ps .ps__rail-x:hover,
        .ps .ps__rail-y:hover,
        .ps .ps__rail-x:focus,
        .ps .ps__rail-y:focus,
        .ps .ps__rail-x.ps--clicking,
        .ps .ps__rail-y.ps--clicking {
            background-color: #f5f5f7;
        }

        .ps__rail-y {
            width: 8px;

            @include mq($md) {
                width: 4px;
            }
        }

        .ps__thumb-y {
            background-color: $blue-chill;
            width: 8px;

            @include mq($md) {
                width: 4px;
            }
        }
    }
</style>