<template>
  <div class="login">
    <div class="login__holder">
      <div class="login-block--form login__box">
        <transition name="fade-in">
          <div
            v-if="imageAnimation"
            class="login-block__form"
          >
            <transition name="fade-in">
              <div class="verify-token-wrap">
                <div class="login-form__top verify-token-top">
                  <h2
                    class="block-title login-form--title"
                    v-html="ignoreText"
                  />
                  <!-- <p class="login-form--text" v-html="ignoreText"></p> -->
                </div>
                <template>
                  <div class="verify-token-btn-holder">
                    <router-link
                      class="btn login-form-submit-btn"
                      to="/"
                    >
                      Back to Home
                    </router-link>
                  </div>
                </template>
                <div
                  v-if="loader"
                  class="verify-token-wrap__loader-wrapper"
                >
                  <img
                    src="@/assets/images/loader.gif"
                    alt="loader"
                    class="verify-token--btn-loader"
                  >
                </div>
              </div>
            </transition>
          </div>
        </transition>
      </div>
      <PartLoginImage
        :use-page-is-loaded="pageIsLoaded"
        :use-image-animation="imageAnimation"
        :use-lines-left-animation="linesLeftAnimation"
        :use-lines-right-animation="linesRightAnimation"
      />
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {getImagesAsset} from '@/config/util'
    import PartLoginImage from '@/components/parts/PartLoginImage.vue'

    interface Data {
        imageUrl: string
        pageIsLoaded: boolean
        imageAnimation: boolean
        linesLeftAnimation: boolean
        linesRightAnimation: boolean
        showLoader: boolean
        ignoreText: string
        loader: boolean
        recaptcha: string
    }

    export default Vue.extend({

        components: {
            PartLoginImage,
        },
        data(): Data {
            return {
                imageUrl: getImagesAsset('login/look.jpg'),
                pageIsLoaded: false,
                imageAnimation: false,
                linesLeftAnimation: false,
                linesRightAnimation: false,
                showLoader: false,
                ignoreText: '',
                loader: false,
                recaptcha: '',
            }
        },

        beforeMount(){
            this.init()
        },

        mounted() {
            this.afterPageLoaded()
        },

        methods: {

            /**
             * @author Milica Mihajlovic
             * @description
             *  get param from url and skip the deal
             */

            async init(){
                const tokenIgnoreDeal = this.$route.params.id
                if(tokenIgnoreDeal !== null){
                    this.loader = true
                    await this.$recaptchaLoaded()
                    const token = await this.$recaptcha('lenderIgnoreDeal')
                    this.recaptcha = token
                    this.$store.dispatch('lenderIgnoreDeal',{token: tokenIgnoreDeal, recaptcha: this.recaptcha})
                        .then(response => {
                            if(response.data.data.ignoreDeal.status) {
                                this.ignoreText = response.data.data.ignoreDeal.message
                            } else {
                                this.ignoreText = response.data.data.ignoreDeal.message
                            }
                            this.loader = false
                        }).catch(() => {
                            this.ignoreText = 'Ups something is wrong, please try later!'
                            this.loader = false
                    })
                }
            },

            afterPageLoaded() {
                setTimeout(() => {
                    this.pageIsLoaded = true
                }, 100)

                setTimeout(() => {
                    this.imageAnimation = true
                }, 800)

                setTimeout(() => {
                    this.linesLeftAnimation= true
                }, 1200)

                setTimeout(() => {
                    this.linesRightAnimation = true
                }, 1600)
            },
        },
    })
</script>

<style lang="scss" scoped>
    .login-block--form {
        position: relative;
    }

    .verify-token-top {
        text-align: center;
    }

    .verify-token-wrap {
        .login-form__signup {
            text-align: center;
        }
    }

    .verify-token-btn-holder {
        margin-top: 40px;
    }

    .verify-token-wrap__loader-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: $white;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .verify-token--btn-loader {
            position: static;
            transform: translate(-0, 0);
            width: 60px;
        }
    }
</style>
