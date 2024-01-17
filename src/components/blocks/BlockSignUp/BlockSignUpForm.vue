<template>
  <div class="sign-up-form-wrap">
    <ValidationObserver
      v-slot="{ invalid }"
      ref="signUpForm"
    >
      <form
        class="sign-up-form"
        novalidate
        @submit.prevent="processForm"
      >
        <div class="sign-up-form__top">
          <span
            v-if="useRoleLender"
            class="sign-up-form__top-pretitle"
          >Create account</span>

          <h2 class="sign-up-form__title block-title">Let's create your account</h2>
          <!--                    <p class="sign-up-form__txt txt-with-link">Already have an account? <router-link to="/login">Log In.</router-link></p>-->
          <p
            v-if="useRoleLender"
            class="sign-up-form__desc"
          >
            Get pre-qualified leads matching your ideal lending criteria
          </p>
          <p
            v-else
            class="sign-up-form__desc"
          >
            Go forth with terms that matter most to your clients.<br> Without all the back and forth.
          </p>
          <p
            v-if="useRoleLender"
            class="sign-up-form__txt txt-with-link"
          >
            Already have an account? <router-link to="/login">Log in.</router-link>
          </p>
          <p
            v-else
            class="sign-up-form__txt txt-with-link"
          >
            Got an existing account? <router-link to="/login">Log in.</router-link>
          </p>
        </div>
        <div class="sign-up-form__body">
          <div class="sign-up-form-fieldset input-holder">
            <label
              for="first-name"
              class="input-label"
            >First Name</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|min:2"
              class="error-message-holder error-message-holder--block"
            >
              <input
                id="first-name"
                v-model="first_name"
                type="text"
                name="First name"
                required
                minlength="2"
              >
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="sign-up-form-fieldset input-holder">
            <label
              for="last-name"
              class="input-label"
            >Last Name</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|min:2"
              class="error-message-holder error-message-holder--block"
            >
              <input
                id="last-name"
                v-model="last_name"
                type="text"
                name="Last name"
                required
                minlength="2"
              >
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="sign-up-form-fieldset input-holder">
            <label
              for="user-email"
              class="input-label input-label--no-margin"
            >Email</label>
            <span
              v-if="useRoleLender"
              class="input-sublabel"
            >Enter your work email. We use it to identify the bank where you do your magic!</span>
            <span
              v-if="useRoleBroker"
              class="input-sublabel"
            >Enter your work email. We use it to identify the company where you do your magic!</span>
            <ValidationProvider
              v-slot="{ errors, valid }"
              rules="required|email"
              class="error-message-holder error-message-holder--block"
            >
              <input
                id="user-email"
                v-model="email"
                type="email"
                name="Email"
                required
                @change="checkEmail(valid)"
                @input="checkEmail(valid)"
              >
              <span
                v-if="!emailPreloader"
                class="error-message"
              >{{ errors[0] }}</span>
              <span
                v-if="checkEmailError && !errors[0] && !emailPreloader"
                class="error-message"
                v-html="checkEmailErrorMessage"
              />
              <img
                v-if="emailPreloader"
                src="@/assets/images/loader.gif"
                class="error-message-loader"
                alt="loader"
              >
            </ValidationProvider>
          </div>
          <input
            v-model="gtm_hidden_id"
            type="hidden"
          >
          <div class="sign-up-form-fieldset input-holder">
            <label
              for="user-password"
              class="input-label"
            >Password</label>
            <div class="input-holder__pass">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:8|verify_password"
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
                <div :class="['input-tooltip', passwordShow ? 'active' : null]">
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
          <div class="sign-up-form-fieldset sign-up-form__submit error-message-holder">
            <button
              type="submit"
              :blur="invalid"
              class="btn sign-up-form__submit-btn"
            >
              <img
                v-if="showLoader"
                src="@/assets/images/loader.gif"
                alt="loader"
                class="submit-btn-loader"
              >
              <template v-if="useRoleLender">Next</template>
              <template v-else>Create Account</template>
            </button>
            <span
              v-if="errorMessage"
              class="login-form__error error-message"
            >{{ noticeMessage }}</span>
          </div>
        </div>
        <div class="sign-up-form__note">
          <p
            v-if="useRoleLender"
            class="txt-note"
          >
            Your information is 100% secure and will only be used for important communications and to send you deal recommendations at the frequency you request.
          </p>
          <p
            v-else
            class="txt-note"
          >
            We protect your data like it’s our own, and use it only for important communication and to send you relevant quotes from lenders.
          </p>
        </div>
        <!-- <p class="txt-with-link">By creating an account, you agree to our <router-link to="/terms-of-service">Terms of Service</router-link>, <router-link to="/cookie-policy">Cookie Policy</router-link> and <router-link to="/privacy-policy">Privacy Policy.</router-link></p> -->
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
    /* eslint-disable */
    import { required, email, min } from 'vee-validate/dist/rules';
    declare const window: any;

    extend('email', {
        ...email,
        message: 'Please enter your email address in format: yourname@example.com'
    });

    extend('required', {
        ...required,
        message: 'This field is required'
    });

    extend('min', {
        validate(password, args) {
            return password.length >= args.length;
        },
        params: ['length'],
        message: '{_field_} field must have at least {length} characters'
    });

    extend('verify_password', {
        message: ``,
        validate: value => {
            var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\"#$%&'()*+,-.:;<\\/=>?@€[\\\\\\]^_`{|}~])(?=.{8,})");
            return strongRegex.test(value);
        }
    });

    interface Data {
        role: string
        first_name: string
        last_name: string
        email: string
        password: string
        showLoader: boolean
        errorMessage: boolean
        thankYouMessage: boolean
        type: string
        passIcon: string
        noticeMessage: string
        checkEmailError: boolean
        checkEmailErrorMessage: string
        emailPreloader: boolean
        passwordObj
        passwordShow: boolean
        token_track_referral: string
        recaptcha: string
        gtm_hidden_id: string
        invited_by: number
    }

    export default Vue.extend({
        data() {
			return {
                role: '',
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                showLoader: false,
                errorMessage: false,
                noticeMessage: '',
                thankYouMessage: false,
                type: 'password',
                passIcon: 'ico-eye',
                checkEmailError: false,
                checkEmailErrorMessage: '',
                emailPreloader: false,
                inProgress: false,
                gtm_hidden_id: '',
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
                token_track_referral: '',
                recaptcha: '',
			}
        },

        props: {
            useRoleLender: {
                required: true
            },
            useRoleBroker: {
                required: true
            },
        },

        beforeMount(){
            this.trackReferralLinks();
            this.gtm_hidden_id = this.getCookie('__gtm_campaign_url');
        },

        components: {
            SvgIcon,
            ValidationProvider,
            ValidationObserver,
        },

        methods: {
            getCookie(cname) {
                let name = cname + "=";
                let decodedCookie = decodeURIComponent(document.cookie);
                let ca = decodedCookie.split(';');
                for(let i = 0; i <ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                    }
                }
                return "";
            },
            trackReferralLinks(){
                const ref = localStorage.getItem('tempTokenRef');
                if(ref) {
                    this.token_track_referral = ref;
                    localStorage.removeItem('tempTokenRef');
                }
            },

            checkUrl(param) {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                return urlParams.get(param);
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
                return (/[!"#$%&'()*+,-.:;<\/=>?@€[\\\]^_`{|}~]/.test(str));
            },

            /**
             * @author Nikola Popov
             * @description
             * set object with user information and send to server side
             * role ( broker or lander )
             */

            async processForm() {
                await this.$refs.signUpForm.validate().then(async success => {
                    if (!success) {
                        return;
                    }

                    if (this.inProgress) {
                        return;
                    }
                    this.inProgress = true;

                    // Check email again before submitting
                    await this.checkEmail(true);

                    if(this.checkEmailError) {
                        this.inProgress = false;
                        return;
                    }

                    await this.sendForm();
                    
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({ 'event': 'forms' });
                    setTimeout(() => {
                        this.inProgress = false;
                    }, 2000);
                });
            },

            /**
             * @author Nikola Popov
             * @description
             * send signup form
             */

            async sendForm(){
                if(!this.showLoader) {
                    this.showLoader = true;
                    await this.$recaptchaLoaded();
                    const token = await this.$recaptcha('registerUser');
                    this.recaptcha = token;
                    const userInfo = this.createUser();
                    this.$store.dispatch('registerUser', userInfo).then(response => {
                        this.showLoader = false;

                        if (response.data.errors) {
                            this.setErrorMsg('errorMessage', 'noticeMessage', response.data.errors[0].message);

                            return;
                        }

                        if (response.data?.data?.register?.token) {
                            localStorage.setItem('tempToken', response.data.data.register.token);
                            this.$store.commit('SET_TEMP_TOKEN', response.data.data.register.token);
                        }

                        this.afterSuccess();
                    }).catch(error => {
                        this.setErrorMsg('errorMessage', 'noticeMessage', error);
                        return;
                    });
                }
            },

            /**
             * @author Nikola Popov
             * @description
             * set notification msg
             */

            setErrorMsg(x, y, msg) {
                this[x] = true;
                this[y] = msg;
                setTimeout(() => {
                    this[x] = false;
                    this[y] = '';
                }, 4000);
            },

            /**
             * @author Nikola Popov
             * @description
             * create user object
             */

            createUser() {
              this.role = this.useRoleLender ? 'lender' : 'broker'

              return {
                    role : this.role,
                    first_name: this.first_name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                    last_name: this.last_name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                    email: this.email,
                    password: this.password,
                    token_track_referral: this.token_track_referral,
                    recaptcha : this.recaptcha,
                    gtm_hidden_id: this.gtm_hidden_id,
                    invited_by: this.$route.query.invited_by || null
                }
            },

            /**
             * @description
             * if submit form success
             */

            afterSuccess() {
                (this.role === 'broker')
                    ? this.thankYouStatus()
                    : this.LenderSignUp();
            },

            /**
             * @author Nikola Popov
             * @description
             * check email after input change
             * @param valid boolean ( variable from validation )
             */

            async checkEmail(valid) {
                if(valid) {
                    let emailCheck = this.email.split('@');
                    const forbidenDomenEmails = [
                        'gmail.com', 
                        'yahoo.com', 
                        'yahoo.fr',
                        'yahoo.co.uk',
                        'yahoo.com.br',
                        'yahoo.co.in',
                        'yahoo.es',
                        'yahoo.it',
                        'yahoo.de',
                        'yahoo.in',
                        'yahoo.ca',
                        'yahoo.co.jp',
                        'yahoo.com.au',
                        'yahoo.com.ar',
                        'yahoo.com.mx',
                        'yahoo.co.id',
                        'yahoo.com.sg',
                        'outlook.com', 
                        'aol.com', 
                        'hotmail.com', 
                        'hotmail.co.uk',
                        'hotmail.fr',
                        'hotmail.it',
                        'hotmail.es',
                        'hotmail.de',
                        'icloud.com', 
                        'inbox.com', 
                        'mail.com', 
                        'zoho.com',
                        'msn.com',
                        'wanadoo.fr',
                        'orange.fr',
                        'comcast.net',
                        'live.com',
                        'live.co.uk',
                        'live.fr',
                        'live.nl',
                        'live.it',
                        'live.com.au',
                        'rediffmail.com',
                        'free.fr',
                        'gmx.de',
                        'web.de',
                        'yandex.ru',
                        'ymail.com',
                        'libero.it',
                        'uol.com.br',
                        'bol.com.br',
                        'mail.ru',
                        'cox.net',
                        'sbcglobal.net',
                        'sfr.fr',
                        'verizon.net',
                        'googlemail.com',
                        'ig.com.br',
                        'bigpond.com',
                        'terra.com.br',
                        'neuf.fr',
                        'alice.it',
                        'rocketmail.com',
                        'att.net',
                        'laposte.net',
                        'facebook.com',
                        'bellsouth.net',
                        'charter.net',
                        'rambler.ru',
                        'tiscali.it',
                        'shaw.ca',
                        'sky.com',
                        'earthlink.net',
                        'optonline.net',
                        'freenet.de',
                        't-online.de',
                        'aliceadsl.fr',
                        'virgilio.it',
                        'home.nl',
                        'qq.com',
                        'telenet.be',
                        'me.com',
                        'tiscali.co.uk',
                        'voila.fr',
                        'gmx.net',
                        'planet.nl',
                        'tin.it',
                        'ntlworld.com',
                        'arcor.de',
                        'frontiernet.net',
                        'hetnet.nl',
                        'zonnet.nl',
                        'club-internet.fr',
                        'juno.com',
                        'optusnet.com.au',
                        'blueyonder.co.uk',
                        'bluewin.ch',
                        'skynet.be',
                        'sympatico.ca',
                        'windstream.net',
                        'mac.com',
                        'centurytel.net',
                        'chello.nl',
                        'live.ca',
                        'aim.com',
                        'bigpond.net.au'
                        ];
                    if (forbidenDomenEmails.includes(emailCheck[1])) {
                        this.checkEmailErrorMessage = 'Please enter a corporate email address.';
                        this.checkEmailError = true;
                        return false;
                    } else {
                        this.emailPreloader = true;
                        await this.$store.dispatch('checkRegisterEmail', {'email': this.email})
                        .then(response => {
                            if(!response.data.errors){
                                this.checkEmailError = false;
                                this.checkEmailErrorMessage = '';
                            }else{
                                this.checkEmailError = true;
                                this.checkEmailErrorMessage = response.data.errors[0].message;
                            }
                            this.emailPreloader = false;
                        }).catch(error => {
                            this.setErrorMsg('checkEmailError', 'checkEmailErrorMessage', error);
                            return;
                        });
                    }
                } else {
                    this.checkEmailError = false;
                    this.checkEmailErrorMessage = '';
                }
            },
            thankYouStatus() {
                this.$emit('onBrokerSuccess');
            },
            LenderSignUp() {
                this.$emit('onContinueToLender');
            },
            showPass() {
                if(this.type === 'password') {
                    this.type = 'text';
                    this.passIcon = 'ico-eyeslash';
                } else {
                    this.type = 'password';
                    this.passIcon = 'ico-eye';
                }
            }
        }
    });
</script>

<style lang="scss" scoped>
    .sign-up-form-wrap {
        background-color: $white;
        width: 100%;
        max-width: 1290px;
        margin: 0 auto;
        padding: 95px 50px;

        @include mq($lap-l) {
            padding: 70px 50px;
        }

        @include mq($lg) {
            padding: 50px 30px;
        }

        @include mq($sm) {
            padding: 50px 15px;
        }
    }

    .sign-up-form {
        width: 100%;
        max-width: 630px;
        margin: 0 auto;
    }

    .sign-up-form__top {
        text-align: center;
        margin-bottom: 48px;

        @include mq($lg) {
            margin-bottom: 30px;
        }
    }

    .sign-up-form__top-pretitle {
        display: block;
        font-size: 14px;
        font-family: $font-second;
        font-weight: 600;
        text-transform: uppercase;
        color: $blue-chill;
        margin-bottom: 14px;
    }

    .sign-up-form__title {
        margin-bottom: 25px;

        @include mq($lg) {
            margin-bottom: 15px;
        }
    }

    .sign-up-form__desc {
        text-align: center;
        font-size: 16px;
        letter-spacing: 0.15px;
        margin-bottom: 27px;

        @include mq($sm) {
            font-size: 14px;
            margin-bottom: 15px;
        }
    }

    .sign-up-form__body {
        margin-bottom: 48px;

        @include mq($lg) {
            margin-bottom: 30px;
        }
    }

    .sign-up-form__submit {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        
        @include mq($sm) {
            justify-content: center;
            padding-top: 15px;
        }
    }

    .sign-up-form__submit-btn {
        display: block;
        position: relative;
    }

    .sign-up-form__note {
        margin-bottom: 30px;
    }

    .input-sublabel {
        font-size: 12px;
        line-height: 0.1;

        @include mq(640px) {
            line-height: 1.3;
            display: block;
            margin: 10px 0 5px;
        }
    }

    .input-label--no-margin {
        margin-bottom: 0;
    }
</style>