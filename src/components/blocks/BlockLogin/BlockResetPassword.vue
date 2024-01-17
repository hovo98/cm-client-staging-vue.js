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
              <ValidationObserver
                v-slot="{ invalid }"
                ref="rrPassword"
              >
                <form
                  action=""
                  class="login-form forget-pass--form"
                  @submit.prevent="processResetPass"
                >
                  <div class="login-form__top">
                    <h2 class="block-title login-form--title">Reset Your Finance Lobby Password</h2>
                    <!-- <p class="login-form--text">Enter New Password</p> -->
                  </div>
                  <div class="login-form__body">
                    <div class="login-form-fieldset input-holder">
                      <label
                        for="password"
                        class="input-label"
                      >New Password</label>
                      <div class="input-holder__pass">
                        <ValidationProvider
                          v-slot="{ errors }"
                          rules="required|min:8"
                          class="error-message-holder error-message-holder--block"
                        >
                          <input
                            id="password"
                            v-model="password"
                            :type="type"
                            name="Password"
                            minlength="6"
                            required
                            @focus="passwordShow = true"
                            @blur="passwordShow = false"
                            @keyup="checkPassword()"
                          >
                          <a
                            v-if="password"
                            href="javascript:;"
                            class="show-pass"
                            @click="showPass"
                          ><SvgIcon
                            class="show-pass__icon"
                            :icon-name="passIcon"
                          /></a>
                          <span
                            v-if="!passwordShow"
                            class="error-message"
                          >{{ errors[0] }}</span>
                          <div :class="['input-tooltip input-tooltip--reset-pass', passwordShow ? 'active' : null]">
                            <template v-for="obj in passwordObj">
                              <span
                                :key="obj.id"
                                :class="'input-tooltip__text input-tooltip__text-'+obj.class"
                              >{{ obj.text }}</span>
                            </template>
                          </div>
                        </ValidationProvider>
                      </div>
                    </div>
                  </div>
                  <div class="login-form-fieldset login-form--submit error-message-holder">
                    <button
                      type="submit"
                      :disabled="invalid"
                      class="btn login-form-submit-btn"
                    >
                      <img
                        v-if="showLoader"
                        src="@/assets/images/loader.gif"
                        alt="loader"
                        class="submit-btn-loader"
                      >Reset Password
                    </button>
                    <div class="login-form__fp">
                      <a
                        href="/login"
                        class="btn-inline"
                      >Back to Login</a>
                    </div>
                    <div v-show="noticeMessage">
                      <span
                        v-if="passwordUpdated != 'PASSWORD_UPDATED'"
                        class="login-form__error notice-message"
                      >{{ noticeText }}</span>
                      <div
                        v-else
                        class="notice-message__popup-wrapper"
                      >
                        <div class="notice-message__popup">
                          <a
                            class="popup__close"
                            href="javascript:;"
                            @click="loginRedirect"
                          />
                          <div class="notice-message__popup-icon">
                            <img
                              :src="noticeImg"
                              alt=""
                            >
                          </div>
                          <h3 class="notice-message__popup-title">Password Reset Success!</h3>
                          <p class="notice-message__popup-text">{{ noticeText }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </ValidationObserver>
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
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
    /* eslint-disable */
    import { required, min } from 'vee-validate/dist/rules';
    import PartLoginImage from '@/components/parts/PartLoginImage.vue';

    extend('required', {
        ...required,
        message: 'This field is required'
    });

    extend('min', {
        validate(password, args) {
            return password.length >= args.length;
        },
        params: ['length'],
        message: 'The {_field_} field must have at least {length} characters'
    });

    extend('verify_password', {
        message: ``,
        validate: value => {
            var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\"#$%&'()*+,-.:;<=>?@[\\]^_`{|}~])(?=.{8,})");
            return strongRegex.test(value);
        }
    });

    interface Data {
        info: string
        value:string
        imageUrl: string
        noticeImg: string
        password: string
        showLoader: boolean
        errorMessage: boolean
        errorText: string
        LoginPass: boolean
        type: string
        passIcon: string
        pageIsLoaded: boolean
        imageAnimation: boolean
        linesLeftAnimation: boolean
        linesRightAnimation: boolean
        noticeMessage: boolean
        noticeText: string
        hash: string
        passwordObj
        passwordShow: boolean
        passwordUpdated: string
        recaptcha: string
    }

    export default Vue.extend({
        data(): Data {
            return {
                info: null,
                value: '',
                imageUrl: getImagesAsset('login/look.jpg'),
                noticeImg: getImagesAsset('reset-password/all-reset-password.png'),
                password: '',
                showLoader: false,
                errorMessage: false,
                LoginPass: true,
                type: 'password',
                passIcon: 'ico-eye',
                errorText: '',
                pageIsLoaded: false,
                imageAnimation: false,
                linesLeftAnimation: false,
                linesRightAnimation: false,
                noticeMessage: false,
                noticeText: '',
                hash: '',
                passwordUpdated: '',
                passwordObj: [
                    {
                        id: 0,
                        text: 'Password must include at least:',
                        class: 'input-tooltip__title'
                    },
                    {
                        id: 1,
                        text: '8 characters',
                        class: 'error'
                    },
                    {
                        id: 2,
                        text: '1 uppercase letter',
                        class: 'error'
                    },
                    {
                        id: 3,
                        text: '1 lowercase letter',
                        class: 'error'
                    },
                    {
                        id: 4,
                        text: '1 number',
                        class: 'error'
                    },
                    {
                        id: 5,
                        text: '1 special character (E.g. , . _ & ? etc)',
                        class: 'error'
                    },
                ],
                passwordShow: false,
                recaptcha: '',
            };
        },

        components: {
            SvgIcon,
            ValidationProvider,
            PartLoginImage,
            ValidationObserver
        },

        beforeMount(){
            this.init();
        },

        methods: {

            /**
             * @author Nikola Popov
             * @description 
             *  on reload check if exsist hash parametar
             */

            init(){
                const hash = this.checkUrl();
                (hash !== null)
                    ? this.hash = hash
                    : this.$router.push('Login');
            },

            /**
             * @author Nikola Popov
             * @description 
             *  get parametar from url 
             */

            checkUrl() {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                return urlParams.get('id');
            },

            checkPassword() {
                this.passwordShow = true;
                if(this.password.length >= 8){
                    this.passwordObj[1].class = 'valid';
                } else {
                    this.passwordObj[1].class = 'error';
                }

                if(this.hasUpperCase(this.password)){
                    this.passwordObj[2].class = 'valid';
                } else {
                    this.passwordObj[2].class = 'error';
                }

                if(this.hasLowerCase(this.password)){
                    this.passwordObj[3].class = 'valid';
                } else {
                    this.passwordObj[3].class = 'error';
                }

                if(this.hasNumber(this.password)){
                    this.passwordObj[4].class = 'valid';
                } else {
                    this.passwordObj[4].class = 'error';
                }

                if(this.hasSpecial(this.password)){
                    this.passwordObj[5].class = 'valid';
                } else {
                    this.passwordObj[5].class = 'error';
                }
            },

            hasLowerCase(str) {
                return (/[a-z]/.test(str));
            },

            hasUpperCase(str) {
                return (/[A-Z]/.test(str));
            },

            hasNumber(str) {
                return (/\d/.test(str));
            },

            hasSpecial(str) {
                return (/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/.test(str));
            },

            /**
             * @author Nikola Popov
             * @description 
             *  check if validation ok 
             */

            processResetPass() {
                this.$refs.rrPassword.validate().then(async success => {
                    if (!success) {
                        return;
                    }
                    this.showLoader = true;

                    await this.$recaptchaLoaded();
                    const token = await this.$recaptcha('userRestartPassword');
                    this.recaptcha = token;
                    const obj = this.createObject();
                    this.sendForm(obj);
                });
            },

            /**
             * @author Nikola Popov
             * @description 
             *  create object ( password and token from url )
             */

            createObject() {
                return {
                    'password': this.password,
                    'token': this.hash,
                    'recaptcha': this.recaptcha
                }
            },

            /**
             * @author Nikola Popov
             * @description 
             *  send form
             * @param { object } obj ( password and token from url )
             */

            sendForm(obj) {
                this.$store.dispatch('userRestartPassword', obj)
                .then(response => {
                    this.showLoader = false;
                    if(response.data.data.updateForgottenPassword){
                        this.noticeMessage = true;
                        this.noticeText = response.data.data.updateForgottenPassword.message;
                        this.passwordUpdated = response.data.data.updateForgottenPassword.status
                    } else {
                        this.noticeMessage = true;
                        this.noticeText = 'Ups something is wrong, please try later!';
                    }
                    setTimeout(() => {
                        this.noticeMessage = false;
                        this.$router.push('Login');
                    }, 6000);
                }).catch(error => {
                    this.showLoader = false;
                    this.noticeMessage = true;
                    this.noticeText = error;
                });
            },

            loginRedirect() {
                this.$router.push('Login');
            },

            showPass() {
                if(this.type === 'password') {
                    this.type = 'text';
                    this.passIcon = 'ico-eyeslash';
                } else {
                    this.type = 'password';
                    this.passIcon = 'ico-eye';
                }
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
            }
        },

        mounted() {
            this.afterPageLoaded();
        }
    });
</script>

<style lang="scss" scoped>
    .forget-pass--form {
        .login-form-body {
            padding-top: 40px;
        }
    }

    .notice-message__popup-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;
        background-color: rgba($white, 0.9);
        padding: 0 15px;
    }

    .notice-message__popup {
        background-color: $white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 58px 62px;
        max-width: 600px;
        box-shadow: 0 0 10px rgba($black, 0.3);
        position: relative;
        width: 100%;

        @include mq(640px) {
            padding: 60px 15px 62px;
        }
    }

     .notice-message__popup-icon {
        margin-bottom: 44px;
        height: 160px;
     }

    .notice-message__popup-title {
        font-weight: 600;
        font-size: 26px;
        margin-bottom: 20px;
        letter-spacing: 0.1px;
        margin-bottom: 22px;
        text-align: center;
    }

    .notice-message__popup-text {
        text-align: center;
    }

    .login-form__error {
        color: $red;
    }
</style>