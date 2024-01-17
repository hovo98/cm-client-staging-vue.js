<template>
  <div class="profile-tabs__content profile-tab-company">
    <ValidationObserver ref="companyForm">
      <form
        action=""
        class="profile-tab-company"
      >
        <b-row>
          <b-col
            lg="6"
            class="input-holder"
          >
            <label class="input-label">Company Name</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="min:2"
              class="error-message-holder error-message-holder--block"
            >
              <input
                v-model="companyName"
                type="text"
                minlength="2"
                @change="changeForm = true"
              >
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-col>
          <b-col
            lg="6"
            class="input-holder"
          >
            <label class="input-label">Address</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="min:2"
              class="error-message-holder error-message-holder--block"
            >
              <input
                v-model="companyAddress"
                type="text"
                minlength="2"
                @change="changeForm = true"
              >
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-col>
          <b-col
            lg="6"
            class="input-holder"
          >
            <label class="input-label">City</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="min:2"
              class="error-message-holder error-message-holder--block"
            >
              <input
                v-model="companyCity"
                type="text"
                minlength="2"
                @change="changeForm = true"
              >
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-col>
          <b-col
            lg="6"
            class="input-holder"
          >
            <label class="input-label">State</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="min:2"
              class="error-message-holder error-message-holder--block"
            >
              <input
                v-model="companyState"
                type="text"
                minlength="2"
                @change="changeForm = true"
              >
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-col>
          <b-col
            lg="6"
            class="input-holder"
          >
            <label class="input-label">ZIP</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="min:5"
              class="error-message-holder error-message-holder--block"
            >
              <input
                v-model="companyZip"
                type="text"
                minlength="5"
                @change="changeForm = true"
              >
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-col>
          <b-col
            lg="6"
            class="input-holder"
          >
            <label class="input-label">Phone</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="min:17"
              class="error-message-holder error-message-holder--block"
            >
              <TheMask
                v-model="companyPhone"
                :mask="['+1 (###) ###-####']"
                :masked="true"
                @change.native="changeForm = true"
              />
              <span class="error-message">{{ errors[0] === 'The field must have at least 17 characters' ? 'The field must have 11 numbers' : errors[0] }}</span>
            </ValidationProvider>
          </b-col>
        </b-row>
        <div
          v-if="user?.role === 'broker'"
          class="upload-logo"
        >
          <div class="upload-logo__top">
            <div class="upload-logo__top-title">Upload your company logo</div>
            <i class="upload-logo__top-desc">Supported formats: JPG, JPEG, PNG</i>
          </div>
          <div class="upload-logo__bottom">
            <div
              v-if="!loaderImage"
              class="upload-logo__img-holder"
              :style="{backgroundImage: 'url(' + (imageUrl ? imageUrl : placeholderImage) + ')'}"
            />
            <div
              v-else
              class="upload-logo__img-holder"
            >
              <div class="upload-logo__img-loader"><div /><div /><div /><div /></div>
            </div>
            <div class="upload-logo__btns">
              <input
                ref="logoUpload"
                type="file"
                style="display: none"
                accept=".png, .jpeg, .jpg"
                @change="onFileChange"
              >
              <a
                href="javascript:;"
                class="btn btn--small upload-logo__btn"
                @click="$refs.logoUpload.click()"
              >Upload</a>
              <a
                v-if="imageUrl"
                href="javascript:;"
                class="btn btn--alt btn--small upload-logo__btn"
                @click="removeFile"
              >Remove</a>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {getImagesAsset} from '@/config/util'
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
    import { required } from 'vee-validate/dist/rules'
    import GlobalNot from "@/services/Notification"
    import {TheMask} from 'vue-the-mask'

    extend('required', {
        ...required,
        message: 'This field is required',
    })

    extend('min', {
        validate(password, args) {
            return password.length >= args.length
        },
        params: ['length'],
        message: 'The field must have at least {length} characters',
    })


    interface Data {
        companyName: string
        companyAddress: string
        companyCity: string
        companyState: string
        companyZip: string
        companyPhone: string
        imageUrl: string
        placeholderImage: string
        changeForm: boolean
        loaderImage: boolean
    }

    export default Vue.extend({

        components: {
            ValidationProvider,
            ValidationObserver,
            TheMask,
        },
        props: {
        },

        data(): Data {
            return {
                companyName: '',
                companyAddress: '',
                companyCity: '',
                companyState: '',
                companyZip: '',
                companyPhone: '',
                imageUrl: '',
                placeholderImage: getImagesAsset('placeholders/logo-placeholder.png'),
                changeForm: false,
                loaderImage: false,
            }
        },

        computed: {
            company() {
                return this.$store.getters.getCompanySettings
            },
            company_logo_url() {
                return this.$store.getters.getCompanyLogo
            },
            user() {
                return this.$store.getters.getUser
            },

            personalSettingsChanged() {
                return this.$store.getters.getPersonalSettingsChanged
            },
            companySettingsChanged() {
                return this.$store.getters.getCompanySettingsChanged
            },
            profileSettingsChanged() {
                return this.$store.getters.getProfileSettingsChanged
            },
		},

        watch: {
            company() {
                this.companyName = this.company.company_name
                this.companyAddress = this.company.company_address
                this.companyCity = this.company.company_city
                this.companyState = this.company.company_state
                this.companyZip = this.company.company_zip_code
                this.companyPhone = this.company.company_phone
            },
            company_logo_url() {
                this.imageUrl = this.company_logo_url
            },
        },

        mounted() {
            this.imageUrl = this.company_logo_url
        },

        methods: {
            async onFileChange(e) {
                const file = e.target.files[0]
                this.loaderImage = true
                if (!file) {
                    this.loaderImage = false
                    return
                }

                if (file.size > 2048000) {
                    new GlobalNot('Image is too big. Maximum 2 MB images are allowed.', 'error')

                    return
                }

                await this.$store.dispatch('updateCompanyLogo', file)
                this.loaderImage = false
            },
            async removeFile() {
                if(!this.loaderImage){
                    this.loaderImage = true
                    this.$refs.logoUpload.value = ''
                    await this.$store.dispatch('deleteCompanyLogo')
                    this.loaderImage = false
                }
            },

            updateChanges(flag) {
                this.changeForm = flag
            },

            async updateForm() {
                let str = ''
                await this.$refs.companyForm.validate().then(success => {
                    if (success) {
                       if(this.changeForm){
                            str += `
                                updateCompany(input: {
                                    company_name: "${this.companyName}"
                                    company_address: "${this.companyAddress}"
                                    company_city: "${this.companyCity}"
                                    company_state: "${this.companyState}"
                                    company_zip_code: "${this.companyZip}"
                                    company_phone: "${this.companyPhone}"
                                }){
                                    success
                                    message
                                }`
                        }
                    } else {
                        this.$store.dispatch('companySettingsChanged', false)
                    }
                })
                return str
            },
        },
    })
</script>

<style lang="scss" scoped>
    .upload-logo__top {
        margin-bottom: 25px;
    }

    .upload-logo__top-title {
        font-size: 16px;
        line-height: 1.25;
        color: $shark;
        font-weight: 600;
        letter-spacing: 0.08px;
        margin-bottom: 2px;

        @include mq($lap-l) {
            font-size: 15px;
        }
    }

    .upload-logo__top-desc {
        font-size: 14px;
        color: $shark;
        letter-spacing: 0.07px;
        line-height: 1.25;
    }

    .upload-logo__bottom {
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;

        @include mq($md) {
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    }

    .upload-logo__img-holder {
        margin-right: 121px;
        height: 95px;
        width: 95px;
        background-size: contain;
        background-position: 50% 50%;
        background-repeat: no-repeat;

        @include mq($lap-l) {
            margin-right: 80px;
        }

        @include mq($md) {
            margin-right: 0;
            margin-bottom: 20px;
            height: 75px;
            width: 75px;
        }
    }

    .upload-logo__img {
        max-width: 100%;
        max-height: 100%;
    }

    .upload-logo__btns {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 10px;

        @include mq($md) {
            justify-content: center;
        }
    }

    .upload-logo__btn {
        margin-right: 30px;

        &:last-of-type {
            margin-top: 0;

            @include mq($md) {
                margin-right: 0;
            }
        }

        @include mq($md) {
            margin-right: 15px;
            margin-bottom: 15px;
        }
    }

    .tooltip-msg::before {
        @include mq(767px) {
            left: 0;
        }
    }
</style>
