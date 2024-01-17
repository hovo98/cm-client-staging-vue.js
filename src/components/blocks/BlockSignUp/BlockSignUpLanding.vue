<template>
  <div class="sign-up-welcome">
    <h2 class="sign-up-welcome__title block-title">You look new! Let’s get you going.</h2>
    <span class="sign-up-welcome__subtitle">Tell us a bit about yourself</span>
    <div class="sign-up-welcome__inner">
      <div class="sign-up-welcome__box">
        <div class="sign-up-welcome__box-inner">
          <div class="sign-up-welcome__box-img">
            <div class="sign-up-welcome__box-img-inner">
              <img
                :src="imageBrokerUrl"
                alt="Broker"
              >
            </div>
          </div>
          <div class="sign-up-welcome__box-content">
            <h3 class="sign-up-welcome__box-title">I’m a broker</h3>
            <div class="sign-up-welcome__box-btn-holder">
              <a
                href="javascript:;"
                class="btn sign-up-welcome__box-btn"
                @click="selectRoleBroker()"
              >Create Account</a>
            </div>
          </div>
        </div>
      </div>
      <div class="sign-up-welcome__box">
        <div class="sign-up-welcome__box-inner">
          <div class="sign-up-welcome__box-img">
            <div class="sign-up-welcome__box-img-inner">
              <img
                :src="imageLenderUrl"
                alt="Lender"
              >
            </div>
          </div>
          <div class="sign-up-welcome__box-content">
            <h3 class="sign-up-welcome__box-title">I’m a lender</h3>
            <div class="sign-up-welcome__box-btn-holder">
              <a
                href="javascript:;"
                class="btn sign-up-welcome__box-btn"
                @click="selectRoleLender()"
              >Create Account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
	import {getImagesAsset} from '@/config/util'

    interface Data {
        imageBrokerUrl: string
        imageLenderUrl: string
    }

    export default Vue.extend({
        data(): Data {
            return {
                imageBrokerUrl: getImagesAsset('sign-up/broker.png'),
                imageLenderUrl: getImagesAsset('sign-up/lender.png'),
            }
        },

        methods: {
            selectRoleBroker() {
                let newurl = window.location.href + '?broker'

                window.history.pushState({ path: newurl }, 'title',newurl)
                this.$emit('onRoleBroker')
            },
            selectRoleLender() {
                let newurl = window.location.href + '?lender'

                window.history.pushState({ path: newurl }, 'title',newurl)
                this.$emit('onRoleLender')
            },
        },
    })
</script>

<style lang="scss" scoped>
    .sign-up-welcome {
        width: 100%;
        max-width: 760px;
        margin-left: -15px;
        margin-right: -15px;
        text-align: center;
    }

    .sign-up-welcome__inner {
        display: flex;
        align-items: stretch;

        @include mq($sm) {
            flex-direction: column;
            align-items: center;
        }
    }

    .sign-up-welcome__box {
        padding: 0 15px;
        flex: 0 0 50%;
        max-width: 50%;

        @include mq($sm) {
            width: 100%;
            max-width: 500px;
            margin-bottom: 25px;
        }
    }

    .sign-up-welcome__box-inner {
        display: block;
        background-color: $white;
        padding: 57px 60px;
        position: relative;

        &::after {
            content: '';
            width: 100%;
            height: 0;
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: $blue-chill;
            transition: 0.2s linear;
        }

        @include hover {
            &::after {
                height: 7px;
            }

            .sign-up-welcome__box-btn-holder {
                opacity: 1;
                transform: translateY(0);
                visibility: visible;
                transition: 0.35s linear;
            }
        }

        @include mq($lap-xxl) {
            padding: 45px 55px;
        }

        @include mq($lg) {
            padding: 40px 30px;
        }

        @include mq($sm) {
            padding: 30px 15px;
        }
    }

    .sign-up-welcome__box-title {
        font-family: $font-second;
        font-size: 26px;
        color: $shark;
        font-weight: 700;
        letter-spacing: 0.13px;
        line-height: 1.35;
        margin-bottom: 40px;

        @include mq($lg) {
            font-size: 22px;
            margin-bottom: 25px;
        }

        @include mq($md) {
            font-size: 20px;
        }

        @include mq($sm) {
            margin-bottom: 15px;
        }
    }

    .sign-up-welcome__title {
        margin-bottom: 25px;

        @include mq($lap-xxl) {
            margin-bottom: 35px;
        }
    }

    .sign-up-welcome__subtitle {
        text-align: center;
        font-size: 20px;
        margin-bottom: 25px;
        display: block;
    }

    .sign-up-welcome__box-img {
        margin-bottom: 51px;
        min-height: 173px;
        display: flex;
        align-items: flex-end;
        justify-content: center;

        img {
            max-width: 100%;
            margin: 0 auto;
        }

        @include mq($lap-xxl) {
            max-width: 200px;
            min-height: 160px;
            margin: 0 auto 40px;
        }

        @include mq($lg) {
            max-width: 160px;
            min-height: 127px;
            margin-bottom: 25px;
        }

        @include mq($sm) {
            max-width: 130px;
            min-height: auto;
            margin-bottom: 15px;
        }
    }

    .sign-up-welcome__box-btn-holder {
        transition: 0.2s ease-in-out;

        @include mq($lg + 1, min) {
            opacity: 0;
            visibility: hidden;
            transform: translateY(30px);
        }
    }

    .sign-up-welcome__box-btn {
        @include mq($md + 1, min) {
            width: 100%;
        }
    }
</style>