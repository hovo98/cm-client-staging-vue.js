<template>
  <div class="lender-signup-wrapper">
    <div class="lender-signup__inner">
      <form
        class="lender-signup"
        @submit.prevent="processForm"
      >
        <div class="lender-signup__top">
          <span class="lender-signup__pretitle">Create Account</span>
          <h2 class="lender-signup__title block-title">Finish setting up your profile!</h2>
        </div>
        <div class="lender-signup__img-upload-holder img-upload-holder">
          <div class="txt-with-link lender-signup__img-upload-text">Upload your photo, bio and write about your specialty.</div>
          <PartUploadImage :data="userData" />
        </div>
        <h4 class="lender-signup__title part-title">Contact Information</h4>
        <div class="lender-signup__body">
          <div class="lender-signup-fieldset input-holder">
            <label
              for="contact-phone"
              class="input-label"
            >Contact phone</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="numeric"
              class="error-message-holder error-message-holder--block"
            >
              <input
                id="contact-phone"
                v-model="contact_phone"
                type="number"
                name="Contact Phone"
              >
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="lender-signup-fieldset input-holder">
            <label
              for="user-biography"
              class="input-label"
            >Your biography</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="min:10"
              class="error-message-holder error-message-holder--block"
            >
              <textarea
                id="user-biography"
                v-model="user_biography"
                name="Biography"
                rows="3"
                placeholder="Write 200-500 words"
                minlength="10"
                maxlength="500"
              />
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="lender-signup-fieldset input-holder">
            <label
              for="specialties"
              class="input-label"
            >Write about your specialties</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="min:10"
              class="error-message-holder error-message-holder--block"
            >
              <textarea
                id="specialties"
                v-model="specialties"
                name="Specialties"
                rows="3"
                placeholder="E.g.: purchase, refinance, commercial, multifamily"
                minlength="10"
                maxlength="500"
              />
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="lender-signup-fieldset input-holder">
            <label
              for="linkedin"
              class="input-label"
            >Your Linkedin URL</label>
            <input
              id="linkedin"
              v-model="linkedin"
              type="url"
              name="linkedin"
              placeholder="www.linkedin.com/in/"
            >
          </div>
          <div class="lender-signup-fieldset lender-signup__submit error-message-holder">
            <a
              href="javascript:;"
              class="btn-direction btn-direction--back lender-signup__back"
              @click="goBack"
            >Back</a>
            <button
              type="submit"
              class="btn lender-signup__submit-btn"
            >
              <img
                v-if="showLoader"
                src="@/assets/images/loader.gif"
                alt="loader"
                class="submit-btn-loader"
              >Next
            </button>
            <span
              v-if="errorMessage"
              class="login-form__error error-message"
            >Some error message</span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { ValidationProvider, extend } from 'vee-validate'
    import PartUploadImage from '@/components/parts/PartUploadImage.vue'
    /* eslint-disable */
    import { required, email, min, numeric } from 'vee-validate/dist/rules';

    extend('email', email);
    extend('numeric', numeric);

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


    interface Data {
        contact_email: string
        contact_phone: string
        user_biography: string
        specialties: string
        linkedin: string
        showLoader: boolean
        errorMessage: boolean
        status: string
        userData
    }

    export default Vue.extend({

        data(): Data {
            return {
                contact_email: '',
                contact_phone: '',
                user_biography: '',
                specialties: '',
                linkedin: '',
                showLoader: false,
                errorMessage: false,
                status: '',
                userData: {
                    url: '',
                    name: 'Sam Smith',
                    position: 'International Bank'
                }
            };
        },
        components: {
            ValidationProvider,
            PartUploadImage
        },

        methods: {
            processForm() {
                const userAditionalInfo = {
                    contact_email: '',
                    contact_phone: '',
                    user_biography: '',
                    specialties: '',
                    linkedin: '',
                }

                this.showLoader = true;
                this.status = 'SUCCESS';

                setTimeout(() => {
                    this.showLoader = false;
                    // TODO Remove variable errorMessage after real data is implemented
                    // this.errorMessage = true;
                }, 2000);

                if (this.status === 'SUCCESS') {
                    this.dealerPreferences();
                }
            },
            dealerPreferences() {
                this.$emit('onContinueToDealerPreferences');
            },
            goBack() {
                this.$emit('onGoBackToSignUpForm');
            },
            allowOnlyNumbers (event) {
                const char = String.fromCharCode(event.keyCode)
                if (!/[0-9]/.test(char)) {
                    event.preventDefault();
                }
            }
        }
    });
</script>

<style lang="scss" scoped>
    .lender-signup-wrapper {
        width: calc(100% - 60px);
        max-width: 1290px;
        background-color: $white;
        border-top: 6px solid $yellow-orange;
        padding: 97px 35px;
    }

    .lender-signup__inner {
        width: 100%;
        max-width: 630px;
        margin: 0 auto;

    }
    .lender-signup__top {
        text-align: center;
    }

    .lender-signup__pretitle {
        font-family: $font-second;
        font-size: 14px;
        line-height: 1.35;
        color: $mosque;
        display: block;
        letter-spacing: 0.14px;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 15px;
    }

    .lender-signup__title {
        margin-bottom: 25px;
        display: block;
    }

    .lender-signup__submit {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 20px;
    }

    .lender-signup__img-upload-holder {
        margin-bottom: 51px;
    }

    .lender-signup__img-upload-text {
        text-align: center;
        margin-bottom: 50px;
        display: block;
    }
</style>
