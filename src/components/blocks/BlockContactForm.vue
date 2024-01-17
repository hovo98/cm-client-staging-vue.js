<template>
  <div class="contact-form">
    <ValidationObserver ref="contactForm">
      <form
        class="sign-up-form"
        @submit.prevent="processContactForm"
      >
        <div class="contact-form__holder">
          <form action="">
            <div class="contact-form__top">
              <h2 class="block-title contact-form--title">CUSTOMER SERVICE AND CALIFORNIA CONSUMER PRIVACY ACT REQUESTS</h2>
            </div>
            <div class="contact-form__body">
              <div class="row input-holder-wrap">
                <div class="input-holder col-md-6">
                  <label
                    for="first-name"
                    class="input-label"
                  >First Name *</label>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|min:2"
                    class="error-message-holder error-message-holder--block"
                  >
                    <input
                      id="first-name"
                      v-model="firstName"
                      type="text"
                      name="first name"
                      required
                      minlength="2"
                    >
                    <span class="error-message">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="input-holder col-md-6">
                  <label
                    for="last-name"
                    class="input-label"
                  >Last Name *</label>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|min:2"
                    class="error-message-holder error-message-holder--block"
                  >
                    <input
                      id="last-name"
                      v-model="lastName"
                      type="text"
                      name="last name"
                      required
                      minlength="2"
                    >
                    <span class="error-message">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="input-holder">
                <label
                  for="email"
                  class="input-label"
                >Email Address *</label>
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|email"
                  class="error-message-holder error-message-holder--block"
                >
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    name="email"
                    required
                  >
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="input-holder">
                <label
                  for="subject"
                  class="input-label"
                >Subject *</label>
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|min:2"
                  class="error-message-holder error-message-holder--block"
                >
                  <input
                    id="subject"
                    v-model="subject"
                    type="text"
                    name="subject"
                    required
                  >
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="input-holder">
                <label
                  for="message"
                  class="input-label"
                >Message *</label>
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|min:2"
                  class="error-message-holder error-message-holder--block"
                >
                  <textarea
                    id="message"
                    v-model="message"
                    name="message"
                    rows="5"
                    required
                    minlength="2"
                  />
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="contact-form--submit">
              <button
                type="submit"
                class="btn contact-form-submit-btn"
                @click="processContactForm"
              >
                <img
                  v-if="showLoader"
                  src="@/assets/images/loader.gif"
                  alt="loader"
                  class="submit-btn-loader"
                >Send
              </button>
            </div>
          </form>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
    /* eslint-disable */
    import { required, email, min } from 'vee-validate/dist/rules';
    import Contact from "@/services/graphql/Contact";
    import { contactFormData } from "@/services/graphql/Contact";
    import GlobalNot from "@/services/Notification";

    extend('email', email);

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
        title: string
        firstName: string
        lastName: string
        email: string
        subject: string
        message: string
        showLoader: boolean
    }

    export default Vue.extend({
        props: {
        },

        data(): Data {
            return {
                title: 'This is title of "BlockContactForm"!',
                firstName: '',
                lastName: '',
                email: '',
                subject: '',
                message: '',
                showLoader: false
            };
        },

        components: {
            ValidationProvider,
            ValidationObserver
        },

        methods: {
			/**
			 * Process the form, validate the inputs
			 *
			 * @param e
			 */
			processContactForm(e) {
                e.preventDefault();

                // Show the loader animation
                this.showLoader = true;

                // Validate and send the form
                this.$refs.contactForm.validate().then(success => {
                    if (!success) {
                        this.showLoader = false;

                        return;
                    }

                    this.sendForm();
                });
            },

			/**
			 * Pack the data and send
			 */
            async sendForm () {
                const obj:contactFormData = {
					firstName: this.firstName,
					lastName: this.lastName,
					email: this.email,
					subject: this.subject,
					message: this.message,
					recaptcha: await this.$recaptcha('contactForm')
                };

                Contact.sendForm(obj).then(response => {
					this.showLoader = false;
					const success = response?.data?.data?.contactForm?.success;

					if (success) {
						new GlobalNot('Your message was successfully sent! Thank you for contacting us.', 'success');
						this.emptyForm();

						return;
					}

					new GlobalNot('There was an error sending your message! Please try again.', 'error');
				});
            },

			/**
			 * Clear the form
			 */
			emptyForm() {
				this.firstName = '';
				this.lastName = '';
				this.email = '';
				this.subject = '';
				this.message = '';

				this.$refs.contactForm.reset();
			}
        }
    });
</script>

<style lang="scss" scoped>
    .contact-form__holder {
        max-width: 630px;
        margin: 60px auto;
        padding: 0 15px;
    }

    .contact-form__top {
        text-align: center;
        margin-bottom: 50px;
    }
</style>
