<template>
  <div
    v-if="imageUrl"
    :class="['login__box login__box--image', usePageIsLoaded ? 'show' : '']"
  >
    <div class="login-box__img-wrap">
      <transition name="fade-in-left">
        <SvgIcon
          v-if="useLinesLeftAnimation"
          class="login-box__logo login-box__logo--left"
          icon-name="ico-lines"
        />
      </transition>
      <transition name="fade-in-right">
        <SvgIcon
          v-if="useLinesRightAnimation"
          class="login-box__logo login-box__logo--right"
          icon-name="ico-lines-right"
        />
      </transition>
      <transition name="fade-in">
        <img
          v-if="useImageAnimation"
          src="@/assets/images/login/look.jpg"
          alt="Login image"
          class="login-box__img"
        >
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {getImagesAsset} from '@/config/util'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'

    interface Data {
        imageUrl: string
    }

    export default Vue.extend({

        components: {
            SvgIcon,
        },
        props: {
            usePageIsLoaded: {
                required: true,
            },
            useImageAnimation: {
                required: true,
            },
            useLinesLeftAnimation: {
                required: true,
            },
            useLinesRightAnimation: {
                required: true,
            },
        },

        data(): Data {
            return {
                imageUrl: getImagesAsset('login/look.jpg'),
            }
        },
    })
</script>

<style lang="scss" scoped>
    .login__box--image {
        &::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            height: 100vh;
            width: 100vw;
            background-color: $aqua-haze;
            z-index: 0;
            transition: 0.4s ease-in-out;
        }

        &.show {
            &::before {
                width: 50vw;
            }
        }
    }

    .login-box__img {
        position: relative;
        z-index: 1;
        max-width: 580px;
        width: 100%;
    }

    .login-box__img-wrap {
        position: relative;
        width: 60.5%;
        max-width: 580px;
    }

    .login-box__logo {
        position: absolute;
        font-size: 471px;
        color: $yellow-orange;
    }

    .login-box__logo--left {
        left: -9.8%;
        bottom: 7.2%;
        z-index: 2;
        width: 81.2%;
    }

    .login-box__logo--right {
        right: -9.8%;
        bottom: -4.1%;
        z-index: 0;
        width: 80%;

        :deep() {
            svg {
                opacity: 0.5 !important;
            }
        }
    }
</style>
