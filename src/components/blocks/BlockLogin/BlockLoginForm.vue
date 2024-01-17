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
              <div v-show="LoginPass">
                <ValidationObserver ref="loginForm">
                  <form
                    action=""
                    class="login-form"
                    novalidate
                    @submit.prevent="processForm"
                  >
                    <div class="login-form__top">
                      <h2 class="block-title login-form--title">Welcome Back!</h2>
                      <p class="login-form--text">Log in to get going.</p>
                    </div>
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
                        </ValidationProvider>
                      </div>
                      <div class="login-form-fieldset input-holder">
                        <label
                          for="password"
                          class="input-label"
                        >Password</label>
                        <div class="input-holder__pass error-message-holder">
                          <ValidationProvider
                            v-slot="{ errors }"
                            rules="required"
                            class="error-message-holder error-message-holder--block"
                          >
                            <input
                              id="password"
                              v-model="password"
                              :type="type"
                              name="Password"
                              required
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
                              v-if="!errorMessage"
                              class="error-message"
                            >{{ errors[0] }}</span>
                            <span
                              v-if="errorMessage"
                              class="login-form__error error-message"
                            >{{ errorText }}
                              <template v-if="verificationEmailError && errorText"><a
                                href="javascript:;"
                                @click="toggleVerificationEmailForm"
                              >Send a new verification email</a></template>
                            </span>
                          </ValidationProvider>
                        </div>
                      </div>
                    </div>
                    <div class="login-form-fieldset login-form--submit">
                      <button
                        type="submit"
                        class="btn login-form-submit-btn"
                      >
                        <img
                          v-if="showLoader"
                          src="@/assets/images/loader.gif"
                          alt="loader"
                          class="submit-btn-loader"
                        >Login
                      </button>
                      <div class="login-form__fp">
                        <a
                          href="javascript:;"
                          class="btn-inline"
                          @click="toggleForgotPass"
                        >Forgot password?</a>
                      </div>
                    </div>
                    <div class="login-form__signup">
                      New to Finance Lobby? <router-link to="/sign-up">Sign Up Here.</router-link>
                    </div>
                  </form>
                </ValidationObserver>
              </div>
            </transition>
            <transition name="fade-in">
              <div v-show="forgotPass">
                <ValidationObserver
                  v-slot="{ invalid }"
                  ref="rrPassword"
                >
                  <form
                    action=""
                    class="login-form forget-pass--form"
                    @submit.prevent="processResetPassForm"
                  >
                    <div class="login-form__top">
                      <h2 class="block-title login-form--title">Reset your Finance Lobby Password</h2>
                      <p class="login-form--text">Enter your email below and we’ll email you a link to reset password</p>
                    </div>
                    <div class="login-form__body">
                      <div class="login-form-fieldset input-holder">
                        <label
                          for="reset-email"
                          class="input-label"
                        >Email</label>
                        <ValidationProvider
                          v-slot="{ errors }"
                          rules="required|email"
                          class="error-message-holder error-message-holder--block"
                        >
                          <input
                            id="reset-email"
                            v-model="email"
                            type="email"
                            name="Email"
                            minlength="6"
                            required
                          >
                          <span
                            v-if="errors[0]"
                            class="error-message"
                          >{{ errors[0] }}</span>
                          <span
                            v-show="noticeMessage"
                            v-else
                            class="login-form__error notice-message"
                          >{{ noticeText }}</span>
                        </ValidationProvider>
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
                          href="javascript:;"
                          class="btn-inline"
                          @click="toggleForgotPass"
                        >Back to Login</a>
                      </div>
                    </div>
                  </form>
                </ValidationObserver>
              </div>
            </transition>
            <transition name="fade-in">
              <ValidationObserver
                v-slot="{ invalid }"
                ref="verificationEmailForm"
              >
                <form
                  v-show="verificationEmailForm"
                  action=""
                  class="login-form forget-pass--form"
                  @submit.prevent="processConfirmationEmailForm"
                >
                  <div class="login-form__top">
                    <h2 class="block-title login-form--title">Resend Verification Email</h2>
                    <p class="login-form--text">Enter your email below and we’ll send it right over.</p>
                    <p class="login-form--text">Trouble receiving our verification email?</p>
                    <p class="login-form--text">Check your spam folder, and please add hello@financelobby.com to your trusted list of senders, contacts, or address book.</p>
                  </div>
                  <div class="login-form__body">
                    <div class="login-form-fieldset input-holder">
                      <label
                        for="confirmation-email"
                        class="input-label"
                      >Email</label>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required|email"
                        class="error-message-holder error-message-holder--block"
                      >
                        <input
                          id="confirmation-email"
                          v-model="email"
                          type="email"
                          name="Email"
                          minlength="6"
                          required
                        >
                        <span class="error-message">{{ errors[0] }}</span>
                      </ValidationProvider>
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
                      >Send Confirmation Link
                    </button>
                    <div class="login-form__fp">
                      <a
                        href="javascript:;"
                        class="btn-inline"
                        @click="toggleVerificationEmailForm"
                      >Back to Login</a>
                    </div>

                    <span
                      v-show="noticeMessage && !greenRed"
                      class="login-form__error notice-message"
                    >{{ noticeText }}</span>
                    <span
                      v-show="noticeMessage && greenRed"
                      class="error-message error-message--shrink"
                    >{{ noticeText }}</span>
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
    import Pusher from '../../../services/pusher/index'
    /* eslint-disable */
    import { required, email, min } from 'vee-validate/dist/rules';
    import PartLoginImage from '@/components/parts/PartLoginImage.vue';
    import GlobalNot from "@/services/Notification"

    extend('email', email);

    extend('required', {
        ...required,
        message: 'This field is required'
    });

    interface Data {
        info: string
        value:string
        imageUrl: string
        forgotPass: boolean
        email: string
        user_email: string
        password: string
        showLoader: boolean
        errorMessage: boolean
        errorText: string
        LoginPass: boolean
        verificationEmailForm: boolean
        verificationEmailError: boolean
        type: string
        passIcon: string
        pageIsLoaded: boolean
        imageAnimation: boolean
        linesLeftAnimation: boolean
        linesRightAnimation: boolean
        noticeMessage: boolean
        noticeText: string
        recaptcha: string
        greenRed: boolean
    }

    export default Vue.extend({
        data(): Data {
            return {
                info: null,
                value: '',
                imageUrl: getImagesAsset('login/look.jpg'),
                forgotPass: false,
                email: '',
                user_email: '',
                password: '',
                showLoader: false,
                errorMessage: false,
                LoginPass: true,
                verificationEmailForm: false,
                verificationEmailError: false,
                type: 'password',
                passIcon: 'ico-eye',
                errorText: '',
                pageIsLoaded: false,
                imageAnimation: false,
                linesLeftAnimation: false,
                linesRightAnimation: false,
                noticeMessage: false,
                noticeText: '',
                recaptcha: '',
                greenRed: false
            };
        },

        components: {
            SvgIcon,
            ValidationProvider,
            PartLoginImage,
            ValidationObserver,
        },

        computed: {
            user() {
                return this.$store.getters.getUser;
            },
            loggedIn() {
                return this.$store.getters.getLoggedIn;
            }
        },

        methods: {

            /**
             * @author Nikola Popov
             * @description
             *  After submit form check validation
             */

            processForm() {
                if(!this.showLoader) {
                    this.$refs.loginForm.validate().then(success => {
                        if (!success) {
                            return;
                        }
                        this.showLoader = true;
                        this.errorMessage = true;
                        const obj = this.createLoginObject();
                        this.sendLoginForm(obj);
                    });
                }
            },

            /**
             * @author Nikola Popov
             * @description
             *  create login object and prepare for send ( email, password )
             * @returns { object }
             */

            createLoginObject() {
                return {
                    'email': this.email,
                    'password': this.password
                }
            },

            /**
             * @author Nikola Popov
             * @description
             *  send login form ( email, password )
             * @param { object } obj (email,password)
             */

            sendLoginForm(obj: any): void {
                this.$store.dispatch('login', obj)
                .then(response => {
                    if (!response.data.errors) {
                        this.$store.dispatch('getSubscriptionPlan')
                        const lStorage = localStorage.getItem('auth') || null;
                        if (lStorage) {
                            const data = JSON.parse(lStorage);
                            const path = localStorage.getItem('rememberPath');
                            new Pusher();
                            if(path) {
                                localStorage.removeItem('rememberPath');
                                this.$router.push(JSON.parse(path));
                            } else {
                                // (data.user.role === 'lender')
                                //     ? this.$router.push('/lender-deals')
                                //     : this.$router.push('/broker-deals');
                                if(data.user.role === 'lender') {
                                    window.location.href = '/lender-deals';
                                } else {
                                    window.location.href = '/broker-deals'
                                }
                            }
                        } else {
                            this.$router.push('/login');
                        }
                        this.errorText = '';
                    } else {
                        this.errorText = response.data.errors[0].extensions.reason || response.data.errors[0].debugMessage;

                        if (this.errorText === 'The user with that email address doesn\'t exist.') {
                            this.errorText = 'Incorrect username or password';
                        }

                        // Display button to send another verification link email
                        if (this.errorText === 'Verify your account to get started') {
                            this.verificationEmailError = true;
                        }

                        setTimeout(() => {
                            this.removeErrorMessage();
                        }, 10000);
                    }
                    this.showLoader = false;

                    if(process.env.VUE_APP_GTM_ENVIRONMENT === 'production' && localStorage.getItem('auth')) {
                        //Google Analytics userID
                        var auth = JSON.parse(localStorage.getItem('auth'));

                        window['dataLayer'] = window['dataLayer'] || [];
                        window['dataLayer'].push({
                            'event' : 'login',
                            'userId' : auth?.user?.id
                        });
                    }
                })
                  .catch(error => {
                    this.errorText = error?.response?.status === 403 ? error?.response?.data?.errors[0].extensions.reason : 'We\'re sorry, there seems to be a problem. Please try again in a few minutes.';
                    this.verificationEmailError = error?.response?.data?.errors[0].extensions?.show_resend
                    this.showLoader = false;
                    return;
                });
            },

            /**
             * Restart password
             *
             * @author Nikola Popov
             * @description
             *  After submit form check validation
             */

            processResetPassForm() {
                this.$refs.rrPassword.validate().then(success => {
                    if (!success) {
                        return;
                    }
                    this.showLoader = true;
                    this.sendEmailForRrPassword();
                });
            },

            /**
             * Send another verification email
             *
             * @author Boris Djemrovski
             */
            processConfirmationEmailForm() {
                this.$refs.verificationEmailForm.validate().then(success => {
                    if (!success) {
                        return;
                    }
                    this.showLoader = true;
                    this.sendEmailForConfirmationEmail();
                });
            },

            /**
             * Restart password
             *
             * @author Nikola Popov
             * @description
             *  Send email
             */

            async sendEmailForRrPassword(){
                await this.$recaptchaLoaded();
                const token = await this.$recaptcha('resetPassword');
                this.recaptcha = token;
                this.$store.dispatch('resetPassword', {'email': this.email, 'recaptcha': this.recaptcha})
                .then(response => {
                    if(!response.data.errors){
                        this.noticeText = response.data.data.forgotPassword.message;
                        this.noticeMessage = true;
                    } else {
                        this.noticeMessage = true;
                        this.noticeText = response.data.errors[0].message;
                    }
                    this.showLoader = false;
                })
                .catch(error => {
                    this.noticeText = error;
                    this.showLoader = false;
                    return;
                });
            },
            sendEmailForConfirmationEmail() {
                this.$store.dispatch('sendNewVerify', {'email': this.email})
                    .then(response => {
                        if(!response.data.errors){
                            this.noticeText = response.data.data.getVerificationMailByEmail.message;
                            this.noticeMessage = true;
                            if(response.data.data.getVerificationMailByEmail.success) {
                                this.greenRed = false;
                            } else {
                                this.greenRed = true;
                            }
                        } else {
                            this.noticeMessage = true;
                            this.noticeText = response.data.errors[0].message;
                        }
                        setTimeout(() => {
                            this.noticeMessage = false;
                            this.noticeText = '';
                            this.toggleVerificationEmailForm();
                        }, 4000);
                        this.showLoader = false;
                    })
                    .catch(error => {
                        this.noticeText = error;
                        this.showLoader = false;
                        return;
                    });
            },
            toggleVerificationEmailForm() {
                if (this.LoginPass) {
                    this.LoginPass = !this.LoginPass;
                    setTimeout(() => {
                        this.verificationEmailForm = !this.verificationEmailForm;
                        this.removeErrorMessage();
                    }, 500);
                } else {
                    this.verificationEmailForm = !this.verificationEmailForm;
                    setTimeout(() => {
                        this.LoginPass = !this.LoginPass;
                        this.removeErrorMessage();
                    }, 500);
                }
            },
            toggleForgotPass() {
                if (this.LoginPass) {
                    this.LoginPass = !this.LoginPass;
                    setTimeout(() => {
                        this.forgotPass = !this.forgotPass;
                        this.removeErrorMessage();
                    }, 500);
                } else {
                    this.forgotPass = !this.forgotPass;
                    setTimeout(() => {
                        this.LoginPass = !this.LoginPass;
                        this.removeErrorMessage();
                    }, 500);
                }
            },
            removeErrorMessage() {
                this.errorMessage = false;
                this.errorText = '';
                this.noticeMessage = false;
                this.noticeText = '';
                this.verificationEmailError = false;
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
            },
        },
        mounted() {
          this.afterPageLoaded();

          if (Number(this.$route.query.password_changed) === 1) {
            new GlobalNot('Your password has been changed successfully', 'success')
          }
        }
    });
</script>

<style lang="scss" scoped>
    .login-form__body {
        margin-bottom: 73px;

        @include mq($lap-xxl) {
            margin-bottom: 48px;
        }
    }

    .error-message--shrink {
        max-width: 290px;
        width: 100%;

        @include mq(767px) {
            max-width: 280px;
        }
    }
</style>