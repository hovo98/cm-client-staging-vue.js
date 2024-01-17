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
                  <h2 class="block-title login-form--title">{{ verificationTitle }}</h2>
                  <p
                    class="login-form--text"
                    v-html="verificationText"
                  />
                </div>
                <template v-if="success">
                  <div class="verify-token-btn-holder">
                    <router-link
                      class="btn login-form-submit-btn"
                      to="login"
                    >
                      Log in
                    </router-link>
                  </div>
                </template>
                <template v-if="expired">
                  <form
                    action=""
                    class="login-form"
                    @submit.prevent="processForm"
                  >
                    <div class="login-form__body">
                      <div class="login-form-fieldset input-holder">
                        <label
                          for="user-email"
                          class="input-label"
                        >Email</label>
                        <ValidationProvider
                          v-slot="{ errors }"
                          rules="required|email"
                          class="error-message-holder error-message-holder--block"
                        >
                          <input
                            id="user-email"
                            v-model="email"
                            type="email"
                            name="Email"
                            required
                          >
                          <span class="error-message">{{ errors[0] }}</span>
                          <span
                            v-if="successMessage && !errors[0]"
                            class="login-form__error notice-message"
                          >{{ successText }}</span>
                        </ValidationProvider>
                      </div>
                    </div>
                    <div class="login-form-fieldset login-form--submit error-message-holder">
                      <button
                        type="submit"
                        class="btn login-form-submit-btn"
                      >
                        <img
                          v-if="showLoader"
                          src="@/assets/images/loader.gif"
                          alt="loader"
                          class="submit-btn-loader"
                        >Send new verification
                      </button>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required|email"
                        class="error-message-holder error-message-holder--block"
                      >
                        <span
                          v-if="errorMessage && !errors[0]"
                          class="login-form__error error-message"
                        >{{ errorText }}</span>
                      </ValidationProvider>
                    </div>
                                        
                    <div class="login-form__signup">
                      Don’t have an account? <router-link to="/sign-up">Sign Up Here.</router-link>
                    </div>
                  </form>
                </template>
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
    import { ValidationProvider, extend } from 'vee-validate'
    /* eslint-disable */
    import { required, email, min } from 'vee-validate/dist/rules';

    extend('email', email);

    extend('required', {
        ...required,
        message: 'This field is required'
    });

    interface Data {
        imageUrl: string
        pageIsLoaded: boolean
        imageAnimation: boolean
        linesLeftAnimation: boolean
        linesRightAnimation: boolean
        verificationTitle: string
        verificationText: string
        errorMessage: boolean
        showLoader: boolean
        email: string
        success: boolean
        expired: boolean
        errorText: string
        successMessage: boolean
        successText: string
        recaptcha: string
    }

    export default Vue.extend({
        data(): Data {
            return {
                imageUrl: getImagesAsset('login/look.jpg'),
                pageIsLoaded: false,
                imageAnimation: false,
                linesLeftAnimation: false,
                linesRightAnimation: false,
                verificationTitle: '',
                verificationText: '',
                errorMessage: false,
                showLoader: false,
                email: '',
                success: false,
                expired: false,
                errorText: '',
                successMessage: false,
                successText: '',
                recaptcha: '',
            };
        },

        beforeMount(){
            this.init();
        },

        components: {
            PartLoginImage,
            ValidationProvider
        },

        methods: {

            /**
             * @author Nikola Popov
             * @description
             *  get param from url and send to verify email
             */

            async init(){
                const hash = this.checkUrl();
                if(hash !== null){
                    await this.$recaptchaLoaded();
                    const token = await this.$recaptcha('userVerify');
                    this.recaptcha = token;
                    this.$store.dispatch('userVerify', {email: hash, recaptcha: this.recaptcha})
                    .then(response => {
                        if(!response.data.errors){
                            this.verificationTitle = 'You\'re all set!';
                            this.verificationText = 'Thanks for verifying your account. You\'re all set to start meeting your deals.';
                            this.success = true;
                        } else {
                            this.verificationTitle = 'Your verification link has expired!';
                            this.verificationText = 'Please enter your email to send a new link.';
                            this.expired = true;
                        }
                    }).catch(error => {
                        this.verificationTitle = 'Verification';
                        this.verificationText = 'Ups something is wrong, please try later!';
                        this.errorText = error;
                        this.expired = true;
                    });
                } else {
                    this.$router.push('login');
                }
            },

            /**
             * @author Nikola Popov
             * @description
             *  check if exsist param
             */

            checkUrl() {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                return urlParams.get('id');
            },

            removeErrorMessage() {
                this.errorMessage = false;
                this.errorText = '';
                this.successMessage = false;
                this.successText = ''
            },

            afterPageLoaded() {
                setTimeout(() => {
                    this.pageIsLoaded = true;
                }, 100);

                setTimeout(() => {
                    this.imageAnimation = true;
                }, 800);

                setTimeout(() => {
                    this.linesLeftAnimation= true;
                }, 1200);

                setTimeout(() => {
                    this.linesRightAnimation = true;
                }, 1600);
            },

            /**
             * @author Nikola Popov
             * @description
             *  if token expire send new one by email
             */

            processForm() {
                this.showLoader = true;
                this.$store.dispatch('sendNewVerify', {email: this.email})
                .then(response => {
                    if(response.data.data.getVerificationMailByEmail){
                        if(response.data.data.getVerificationMailByEmail.success){
                            this.successMessage = true;
                            this.successText = response.data.data.getVerificationMailByEmail.message;
                        }else{
                            this.errorMessage = true;
                            this.errorText = response.data.data.getVerificationMailByEmail.message;
                        }
                    }
                    this.showLoader = false;
                    setTimeout(() => {
                        this.removeErrorMessage();
                    }, 4000);
                }).catch(error => {
                    this.showLoader = false;
                    this.errorMessage = true;
                    this.errorText = error;
                });
            },
        },

        mounted() {
            this.afterPageLoaded();
        }
    });
</script>

<style lang="scss" scoped>
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

    .login-form__error {
        bottom: -7px;
        width: 90%;

        @include mq(1480px) {
            bottom: -2px;
        }
    }
</style>