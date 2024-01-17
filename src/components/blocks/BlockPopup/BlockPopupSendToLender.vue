<template>
  <div class="popup__wrap">
    <perfect-scrollbar class="popup__wrap-ps">
      <div class="popup">
        <a
          class="popup__close"
          href="javascript:;"
          @click="cancelForm()"
        />
        <div class="popup__top">
          <h2 class="title-extra-small popup__title">Share your deal with a lender</h2>
          <span class="popup__subtitle">We’ll email them the details of your deal.</span>
          <template v-for="(email, index) in emails">
            <div
              :key="index"
              class="input-holder input-with-icon-holder error-message-holder"
            >
              <input
                type="text"
                :value="email"
                @change="setValue($event, index)"
                @keyup="$refs['error'+index][0].style.display = 'none'"
              >
              <a
                class="input-remove-btn"
                href="javascript:;"
                @click="removeEmails(index)"
              />
              <span
                :ref="'error'+index"
                class="error-message"
              >Email format is not valid</span>
            </div>
          </template>
          <a
            class="link link--sm"
            href="javascript:;"
            @click="addMoreEmails"
          >
            <SvgIcon
              class="link__icon"
              icon-name="ico-plus-circle"
            />
            Add another email
          </a>
        </div>
        <div class="popup__btn-wrap">
          <div class="submit-btn-holder popup__btn-holder popup__btn">
            <a
              class="btn popup__btn"
              href="javascript:;"
              @click="sendForm()"
            >Send</a>
            <img
              v-if="showLoader"
              src="@/assets/images/loader.gif"
              alt="loader"
              class="submit-btn-loader submit-btn-loader--inline"
            >
          </div>
          <a
            class="btn btn--alt popup__btn"
            href="javascript:;"
            @click="cancelForm()"
          >Cancel</a>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import GlobalNot from "@/services/Notification"

    interface Data {
        emails,
        showLoader: boolean
    }

    export default Vue.extend({

        components: {
            SvgIcon,
        },
        
        props: ['sendTolenderRows'],

        data(): Data {
            return {
                emails: [''],
                showLoader: false,
            }
        },

        methods: {
            cancelForm() {
                this.$emit('closePopup')
            },
            async sendForm() {
                if(this.showLoader) {
                    return
                }
                
                const arr = []
                let flag = false
                this.showLoader = true
                this.emails.forEach((value, index) => {
                    const checkEmailFlag = this.checkEmail(value)
                    if(value !== '' && checkEmailFlag) {
                        arr.push(value)
                    } else {
                        if(this.$refs['error'+index][0]) {
                            this.$refs['error'+index][0].style.display = 'block'
                        }
                        flag = true
                        this.showLoader = false
                    }
                })
                if(!flag) {
                    await this.$store.dispatch('sendToLenders', {emails: this.emails, ids: this.sendTolenderRows}).then(response => {
                        if(response.errorMessage.length === 0) {
                            new GlobalNot('Your deal was sent. We’ll let you know when they respond.', 'success')
                        } else {
                            if(this.emails.length !== response.errorMessage.length) {
                                new GlobalNot('Your deal was sent. We’ll let you know when they respond.', 'success')
                            }
                            for (let index = 0; index < response.errorMessage.length; index++) {
                                new GlobalNot(response.errorMessage[index].message, 'error')
                            }
                        }
                        this.$emit('closePopup')
                        this.emails = ['']
                        this.showLoader = false
                    })
                }
            },
            addMoreEmails() {
                this.emails.push('')
            },
            removeEmails(index) {
                if(this.emails.length !== 1) {
                    this.emails = this.emails.filter(function (item, newIndex) {
                        return newIndex !== index
                    })
                } else {
                    this.emails = ['']
                }
            },
            setValue(e, index) {
                this.emails[index] = e.target.value
            },
            checkEmail(email) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(String(email).toLowerCase())
            },
        },
    })
</script>

<style lang="scss" scoped>
    .error-message{
        display: none;   
    }

    .popup__wrap {
        display: flex;
        align-items: center;
        justify-content: center;

        .ps {
            max-height: 80vh;
            box-shadow: 0 2px 30px rgba($black, 0.1);

            .ps__thumb-y {
                background-color: $blue-chill;
            }
        }
    }

    .popup {
        box-shadow: none;
        position: static;
        transform: translate(0);
    }

    .input-remove-btn {
        position: absolute;
        top: 27px;
        right: 6px;
        transform: translateY(-50%);
        width: 19px;
        height: 19px;
        cursor: pointer;
        transition: $dur $ease;

        &:hover {
            &::before,
            &::after {
                transition: $dur $ease;
                transform: translate(-50%, -50%) rotate(0);
            }
        }

        &::before,
        &::after {
            content: '';
            height: 2px;
            width: 100%;
            background-color: $yellow-orange;
            @include center;
            transition: $dur $ease;
        }

        &::before {
            transform: translate(-50%, -50%) rotate(45deg);
        }

        &::after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }

        @include mq($lap-l) {
            top: 23px;
        }
    }

    .popup__title {
        margin-bottom: 0;

        @include mq($sm) {
            margin-bottom: 30px;
        }
    }

    .popup__subtitle {
        margin-bottom: 33px;
        display: block;
        font-size: 14px;
        font-style: italic;
    }

    .input-holder {
        &:last-of-type {
            margin-bottom: 25px;
        }
    }

    .popup__top {
        margin-bottom: 30px;
    }
</style>