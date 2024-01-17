<template>
  <div class="page-404">
    <div class="s-404__wrap">
      <router-link
        class="s-404__logo"
        to="/"
        rel="home"
      >
        <img
          src="@/assets/images/logo.png"
          alt="logo-small"
        >
      </router-link>
      <h1 class="s-404__title">
        <span class="s-404__title-1">4</span>
        <span class="s-404__title-2">0</span>
        <span class="s-404__title-3">4</span>
      </h1>
      <div class="s-404__text">Looks like you are lost!</div>
      <router-link
        to="/"
        class="s-404__btn btn"
      >
        Back to homepage
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    interface Data {
        title: string
    }

    export default Vue.extend({
        props: {
        },

        data(): Data {
            return {
                title: 'This is title of "BlockNotFound"!',
            }
        },
    })
</script>

<style lang="scss" scoped>
    ///* ========================================================================
    //   #404/403
    //   ======================================================================== */
    .page-404 {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        overflow: hidden;
        background-color: $aqua-haze;
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        min-height: 100vh;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }

    .s-404__logo {
        display: inline-block;
        animation: puff-in-middle 0.35s cubic-bezier(0.47, 0, 0.745, 0.715) both 1.5s;

        &:hover {
            img {
                transform: scale(1.05);
            }
        }

        img {
            width: 250px;
            transition: transform 0.2s ease-in-out;
        }
    }

    .s-404__title {
        animation: puff-in-middle 0.35s cubic-bezier(0.47, 0, 0.745, 0.715) both .5s;

        span {
            font-size: 250px;
            line-height: 1;
            color: $c-404-numbers;
            display: inline-block;
            position: relative;
            margin: 0 10px;

            @include mq($lg) {
                font-size: 200px;
            }

            @include mq($sm) {
                font-size: 125px;
            }
        }

        &-1 {
            transform: rotate(-7deg);
            animation: 5s float ease-in-out infinite alternate-reverse 0.5s;
        }

        &-2 {
            transform: translateY(10%);
            animation: 5s float-2 ease-in-out infinite alternate-reverse 0.5s;
        }

        &-3 {
            transform: rotate(10deg);
            animation: 5s float-3 ease-in-out infinite alternate-reverse 0.5s;
        }
    }

    .s-404__title-icon {
        font-size: 62px;
        color: $c-404-numbers;
        @include center;

        @include mq($lg) {
            font-size: 55px;
        }

        @include mq($sm) {
            font-size: 40px;
        }
    }

    .s-404__text {
        font-size: 40px;
        line-height: 1.1;
        color: $c-404-text;
        letter-spacing: 1px;
        animation: puff-in-middle 0.35s cubic-bezier(0.47, 0, 0.745, 0.715) both .8s;
        margin-top: 40px;
        padding: 0 15px;

        @include mq($sm) {
            margin-top: 25px;
            font-size: 30px;
        }
    }

    .s-404__btn {
        margin-top: 35px;
        animation: puff-in-middle 0.35s cubic-bezier(0.47, 0, 0.745, 0.715) both 1s;

        @include mq($lg) {
            margin-top: 25px;
        }
    }


    @keyframes puff-in-center {
        0% {
            transform: scale(0.5);
            filter: blur(2px);
            opacity: 0;
        }

        100% {
            transform: scale(1);
            filter: blur(0);
            opacity: 1;
        }
    }

    @keyframes puff-in-middle {
        0% {
            transform: scale(1.4);
            filter: blur(2px);
            opacity: 0;
        }

        100% {
            transform: scale(1);
            filter: blur(0);
            opacity: 1;
        }
    }

    // 404 / 403 floating animation
    @keyframes float {
        0% {
            transform: rotate(-1deg) translate(0, 0);
        }

        100% {
            transform: rotate(-7deg) translate(10%, 10%);
        }
    }

    @keyframes float-2 {
        0% {
            transform: translateY(0);
        }

        100% {
            transform: translateY(10%);
        }
    }

    @keyframes float-3 {
        0% {
            transform: rotate(-4deg) translateY(0);
        }

        100% {
            transform: rotate(10deg) translateY(-10%);
        }
    }
</style>
