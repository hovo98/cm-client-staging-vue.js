<template>
  <div class="popup__wrap">
    <div
      v-click-outside="cancelForm"
      class="popup"
    >
      <a
        class="popup__close"
        href="javascript:;"
        @click="cancelForm"
      />
      <h3 class="popup__title-small part-title">Lender Profile</h3>
      <div class="popup__inner">
        <div class="popup-image-holder">
          <div
            class="popup-image__img"
            :style="{backgroundImage: 'url(' + (data.profileImage ? data.profileImage : placeholderImage) + ')'}"
          />
        </div>
        <div class="popup-profile__info">
          <h4 class="popup-profile__info-title">{{ data.firstName }} {{ data.lastName }}</h4>
          <div
            v-if="data.bank"
            class="popup-profile__info-txt"
          >
            {{ data.bank }}
          </div>
        </div>
        <div class="popup-profile__box">
          <h4 class="popup-profile__subtitle part-title">Contact Information</h4>
          <div class="popup-profile__box-inner">
            <div class="popup-profile__box-link-holder">
              <a
                :href="'mailto:'+data.email"
                class="link link--thin"
              ><SvgIcon
                class="link__icon"
                icon-name="ico-envelope-solid"
              />{{ data.email }}</a>
            </div>
            <div
              v-if="data.lenderPhone"
              class="popup-profile__box-link-holder"
            >
              <a
                :href="'tel:'+data.phone"
                class="link link--thin"
              ><SvgIcon
                class="link__icon"
                icon-name="ico-phone"
              />{{ data.phone }}</a>
            </div>
          </div>
        </div>
        <div
          v-if="data.biography"
          class="popup-profile__box"
        >
          <h4 class="popup-profile__subtitle part-title">Biography</h4>
          <p class="popup-profile__box-text">
            {{ data.biography }}
          </p>
        </div>
        <div
          v-if="data.specialty"
          class="popup-profile__box"
        >
          <h4 class="popup-profile__subtitle part-title">Specialty</h4>
          <p class="popup-profile__box-text">{{ data.specialty }}</p>
        </div>
      </div>
      <div class="popup__btn-wrap">
        <a
          class="btn btn--alt popup__btn"
          href="javascript:;"
          @click="cancelForm"
        >Cancel</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import ClickOutside from 'vue-click-outside'
    import {getImagesAsset} from '@/config/util'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'

    interface Data {
        placeholderImage: string
        image: string
    } 

    export default Vue.extend({

        components: {
            SvgIcon,
        },

        directives: {
            ClickOutside,
        },

        props: {
            data: {
                required: true,
            },
        },
        data(): Data {
            return {
                placeholderImage: getImagesAsset('placeholders/user_placeholder.png'),
                image: getImagesAsset('sign-up/sam.jpg'),
            }
        },

        methods: {
            cancelForm(){
                this.$emit('closePopup')
            },
        },
    })
</script>>

<style lang="scss" scoped>
    .popup {
        padding-right: 30px;
        max-height: 90vh;
        overflow: auto;
    }

    .popup__inner {
        text-align: center;
    }

    .popup__title-small {
        margin-bottom: 30px;

        @include mq($lap-l) {
            margin-bottom: 20px;
        }
    }

    .popup-profile__info {
        margin-bottom: 50px;

        @include mq($lap-l) {
            margin-bottom: 30px;
        }
    }

    .popup-profile__info-title {
        font-size: 20px;
        line-height: 1.3;
        color: $shark;
        font-weight: 700;
        letter-spacing: 0.1px;
        margin-bottom: 4px;
        text-align: center;

        @include mq($lap-l) {
            font-size: 18px;
        }
    }

    .popup-image-holder {
        width: 100%;
        max-width: 150px;
        margin: 0 auto;
        position: relative;
        margin-bottom: 30px;

        @include mq($lap-l) {
            max-width: 120px;
            margin-bottom: 20px;
        }
    }

    .popup-image__img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        border: 1px solid $aqua-haze;

        @include mq($lap-l) {
            width: 120px;
            height: 120px;
        }
    }

    .popup-profile__info-txt {
        font-size: 16px;
        color: $santas-gray;
        font-weight: 400;
        letter-spacing: 0.08px;
        line-height: 1.35;
        text-align: center;

        @include mq($lap-l) {
            font-size: 15px;
        }
    }

    .popup-profile__subtitle {
        margin-bottom: 20px;

        @include mq($lap-l) {
            margin-bottom: 15px;
        }
    }

    .popup-profile__box-link-holder {
        margin-bottom: 12px;
    }

    .popup-profile__box {
        margin-bottom: 53px;

        @include mq($lap-l) {
            margin-bottom: 30px;
        }
    }

    .popup-profile__box-text {
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.07px;
        color: $shark;
        line-height: 1.7;
    }
</style>