<template>
  <div class="popup__wrap">
    <perfect-scrollbar class="popup__wrap-ps">
      <div
        v-click-outside="cancelForm"
        class="popup"
      >
        <a
          class="popup__close"
          href="javascript:;"
          @click="cancelForm"
        />
        <h3 class="title-extra-small popup__title">Invite people you know to Finance Lobby</h3>
        <span class="popup__subtitle">Gift your favorite professionals the gift of perfection.</span>
        <span class="popup__subtitle popup__subtitle--italic">Enter as many emails as you’d like. Press the “Enter” key after each one.</span>
        <div class="popup__input-wrap">
          <div class="manage-lenders__invite-form">
            <div class="input-holder error-message-holder">
              <label class="input-label">Lender's Emails</label>
              <div class="manage-lenders__fake-input">
                <template v-for="(email, index) in emails">
                  <span
                    :key="index"
                    class="manage-lenders__pill"
                  >
                    {{ email }} <span>
                      <a
                        href="javascript:;"
                        class="manage-lenders__pill-remove"
                        @click.stop="removeEmail(index, 'lender')"
                      >
                        <SvgIcon
                          class="manage-lenders__pill-remove__icon"
                          icon-name="ico-close-thin"
                        />
                      </a>
                    </span>
                  </span>
                </template>
                <input
                  v-model="email"
                  placeholder="Enter email addresses"
                  @keyup="checkString($event, 'lender')"
                  @change="checkLongString($event, 'lender')"
                >
              </div>
              <span
                v-if="errorEmail"
                class="error-message"
              >Invalid email address</span>
            </div>
          </div>
        </div>

        <div class="popup__input-wrap">
          <div class="manage-lenders__invite-form">
            <div class="input-holder error-message-holder">
              <label class="input-label">Broker's Emails</label>
              <div class="manage-lenders__fake-input">
                <template v-for="(email, index) in emailsBroker">
                  <span
                    :key="index"
                    class="manage-lenders__pill"
                  >
                    {{ email }} <span>
                      <a
                        href="javascript:;"
                        class="manage-lenders__pill-remove"
                        @click.stop="removeEmail(index, 'broker')"
                      >
                        <SvgIcon
                          class="manage-lenders__pill-remove__icon"
                          icon-name="ico-close-thin"
                        />
                      </a>
                    </span>
                  </span>
                </template>
                <input
                  v-model="emailBroker"
                  placeholder="Enter email addresses"
                  @keyup="checkString($event, 'broker')"
                  @change="checkLongString($event, 'broker')"
                >
              </div>
              <span
                v-if="errorEmailBroker"
                class="error-message"
              >Invalid email address</span>
            </div>
            <div class="error-list">
              <a
                v-if="errorArray.length"
                href="javascript:;"
                class="link"
                @click.stop="errorArray = []"
              ><SvgIcon
                class="link__icon"
                icon-name="ico-eraser"
              /> Clear notifications</a>
              <template v-for="(err, index) in errorArray">
                <div
                  :key="index"
                  class="error-list__inner"
                >
                  <span class="error-list__title">{{ err.message }}</span>:
                  <span class="error-list__text">{{ err.email }}</span> 
                </div>
              </template>
            </div>
          </div>
        </div>
        <div
          v-if="success"
          class="popup__btn-wrap-success"
        >
          <span class="popup__btn-wrap-success-content-wrapper"><SvgIcon
            class="popup__btn-wrap-success-icon"
            icon-name="ico-check-circle"
          />You’re the best</span><span class="popup__btn-wrap-success-content-sub">Thanks for sharing Finance Lobby with others. The bigger the network, the better the deals get for all of us.</span>
        </div>
        <div class="popup__btn-wrap">
          <a
            class="btn"
            href="javascript:;"
            @click="sendInvite()"
          ><img
            v-if="showLoader"
            src="@/assets/images/loader.gif"
            alt="loader"
            class="submit-btn-loader"
          >Send Invite</a>
          <a
            class="btn btn--alt popup__btn"
            href="javascript:;"
            @click="cancelForm"
          >Cancel</a>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
import ClickOutside from 'vue-click-outside'

interface Data {
    inviteLender
    inviteBroker
    messageInviteLender
    messageInviteBroker
    successInviteLender
    successInviteBroker
    formSent: boolean
    success: boolean

    emails
    email: string
    errorEmail: boolean
    errorArray

    emailsBroker
    emailBroker: string
    errorEmailBroker: boolean
    showLoader: boolean
}

export default Vue.extend({

    components: {
        SvgIcon,
    },
    directives: {
        ClickOutside,
    },
    data(): Data {
        return {
            inviteLender: '',
            inviteBroker: '',
            messageInviteLender: '',
            messageInviteBroker: '',
            successInviteLender: false,
            successInviteBroker: false,
            formSent: false,
            success: false,

            email: "",
            emails: [],
            errorEmail: false,
            errorArray: [],

            emailBroker: "",
            emailsBroker: [],
            errorEmailBroker: false,
            showLoader: false,
        }
    },

    methods: {
        cancelForm(){
            this.$emit('closePopup')
        },
        removeEmail(index, flag) {
            (flag === 'lender') ? this.emails.splice(index, 1) : this.emailsBroker.splice(index, 1)
        },
        checkString(e, flag) {
            if(flag === 'lender') {
                this.errorEmail = false
                const emailVal = e.target.value
                const last = emailVal.substr(emailVal.length - 1)
                if(last === ';' || last === ',') {
                    const email = emailVal.slice(0, -1)
                    this.sendToCheck(email, 'lender')
                }
            } else {
                this.errorEmailBroker = false
                const emailVal = e.target.value
                const last = emailVal.substr(emailVal.length - 1)
                if(last === ';' || last === ',') {
                    const email = emailVal.slice(0, -1)
                    this.sendToCheck(email, 'broker')
                }
            }
        },
        sendToCheck(email, is) {
            const flag = this.checkEmail(email)
            if(is === 'lender') {
                if(flag) {
                    const check = this.checkIfExsist(email, 'lender')
                    if(check) {
                        this.emails.push(email)
                        this.errorEmail = false
                        this.email = ''
                    }
                } else {
                    this.errorEmail = true
                }
            } else {
                if(flag) {
                    const check = this.checkIfExsist(email, 'broker')
                    if(check) {
                        this.emailsBroker.push(email)
                        this.errorEmailBroker = false
                        this.emailBroker = ''
                    }
                } else {
                    this.errorEmailBroker = true
                }
            }
        },
        checkLongString(e, is) {
            this.errorArray = []
            const emailVal = e.target.value
            let commaSplice = emailVal.split(',')
            if(emailVal === '') {
                return
            }
            if(commaSplice.length === 0) {
                commaSplice = emailVal.split(';')
                if(commaSplice.length === 0) {
                    return
                }
            }

            commaSplice.forEach(email => {
                const flag = this.checkEmail(email, is)
                if(flag) {
                    const check = this.checkIfExsist(email, is)
                    if(check) {
                        (is === 'lender') ? this.emails.push(email) : this.emailsBroker.push(email)
                    } 
                } else {
                    this.setError({
                        email: email,
                        message: 'Email format',
                    })
                }
            });

            (is === 'lender') ? this.email = '' : this.emailBroker = ''
        },
        setError(obj){
            this.errorArray.push(obj)
        },
        checkIfExsist(email, is) {
            if(is === 'lender') {
                let flag = false
                this.emails.forEach(element => {
                    if(element === email) {
                        this.setError({
                            email: email,
                            message: 'We already have that email',
                        })
                        flag = true
                    }
                })
                if(flag) {
                    return false
                } else {
                    return true
                }
            } else {
                let flag = false
                this.emailsBroker.forEach(element => {
                    if(element === email) {
                        this.setError({
                            email: email,
                            message: 'We already have that email',
                        })
                        flag = true
                    }
                })
                if(flag) {
                    return false
                } else {
                    return true
                }
            }
        },
        checkEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(String(email).toLowerCase())
        },
        async sendInvite() {
            if(!this.showLoader) {
                this.showLoader = true
                let flag = true
                let flag1 = true
                if(this.emails.length > 0 || this.emailsBroker.length) {
                    await this.$store.dispatch('sendInvitationEmail', {inviteLender: this.emails, inviteBroker: this.emailsBroker}).then(response => {
                        if(response.data.data?.invitationEmail?.errorsResponseBroker?.length > 0) {
                            response.data.data.invitationEmail.errorsResponseBroker.forEach(obj => {
                                this.errorArray.push(obj)
                            })
                            flag = false
                        }
                        if(response.data.data?.invitationEmail?.errorsResponseLender?.length > 0) {
                            response.data.data.invitationEmail.errorsResponseLender.forEach(obj => {
                                this.errorArray.push(obj)
                            })
                            flag1 = false
                        }
                        this.emails = []
                        this.emailsBroker = []
                    })
                    if(flag && flag1) {
                        this.success = true
                        setTimeout(() => {
                            this.success = false
                        }, 5000)
                    }
                }
                this.showLoader = false
            }
        },
    },
})
</script>

<style lang="scss" scoped>

.manage-lenders__fake-input {
    border: 1px solid #2f3034;
    width: 100%;
    border-radius: 4px;
    padding: 7px 10px 5px;
    min-height: 55px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    input {
        padding: 3px;
        border: 0;
        flex-grow: 1;
        width: auto;
    }

    @include mq($lap-l) {
        padding: 5px 10px;
        min-height: 46px;
    }
}

.manage-lenders__pill {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.2;
    position: relative;
    color: $shark;
    display: inline-block;
    border: 1px solid $yellow-orange;
    background-color: $fantasy;
    border-radius: 24px;
    padding: 5px 30px 5px 10px;
    margin: 3px;

    @include mq($sm) {
        font-size: 15px;
    }
}

.manage-lenders__pill-remove__icon {
    font-weight: 600;
}

.manage-lenders__pill-remove {
    position: absolute;
    color: $shark;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    height: 16px;
    width: 16px;
    border-radius: 50%;
    border: 1px solid transparent;
    font-size: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: $dur $ease;

    @include hover {
        border: 1px solid $yellow-orange;
        color: $yellow-orange;
    }
}

.popup__wrap {
    display: flex;
    align-items: center;
    justify-content: center;

    .ps {
        max-height: 80vh;
        box-shadow: 0 2px 30px rgba($black, 0.1);
    }
}

.popup {
    box-shadow: none;
    position: static;
    transform: translate(0);
}

.popup__title {
    margin-bottom: 10px;
}

.popup__subtitle {
    font-size: 14px;
    margin-bottom: 20px;
    display: block;
    margin-bottom: 10px;
    &:last-child {
        margin-bottom: 30px;
    }

    @include mq($sm) {
        margin-bottom: 20px;
    }
}

.popup__subtitle--italic {
    font-style: italic;
}

.input-holder {
    margin-bottom: 26px;

    @include mq($sm) {
        margin-bottom: 20px;
    }
}

.popup__input-wrap {
    margin-bottom: 50px;
    margin-top: 25px;

    @include mq($sm) {
        margin-bottom: 20px;
    }
}

.input-label {
    letter-spacing: -.2px;
}

.popup__btn-wrap {
    justify-content: center;
    position: relative;

    @include mq(374px) {
        justify-content: space-between;
        flex-wrap: nowrap;
    }
}

.popup__btn {
    margin: 0 0 0 29px;
}

.popup__btn:hover .lds-spinner div:after {
    background: $mosque;
}

.submit-btn-loader {
    left: 8px;
    width: 30px;
}

.popup__btn-wrap-success {
    z-index: 1;
    position: absolute;
    top: 0;
    color: #055d64;
    width: 100%;
    background-color: $white;
    height: 100%;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    padding: 0 60px;
}

.popup__btn-wrap-success-content-sub {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
}

.popup__btn-wrap-success-content-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup__btn-wrap-success-icon {
    margin-right: 9px;
    margin-top: 3px;
}

.popup__close {
    z-index: 2;
}

.input-label__subtext {
    font-size: 11px;
}

</style>