<template>
  <div
    class="profile-tabs__content profile-tab-details profile-tab-details-broker"
    :class="lenders.length ? '' : 'profile-tabs__content--alt'"
  >
    <div
      class="filer-list-wrap"
      :class="lenders.length ? '' : 'filer-list-wrap--alt'"
    >
      <div
        v-if="lenders.length"
        class="filer-list-holder"
      >
        <p class="filer-list__desc-text bold">Would you like to give lenders you know “first priority” to review your deals?</p>
        <p class="filer-list__desc-text">Preferred lenders will have a 3-day “rights of first refusal”, at which point your deals will be visible by all other colleagues at their bank.</p>
        <p class="filer-list__desc-text">Your deals will still be immediately available to the 1000s of other loan officers who are not part of the banking institution with which your “first priority” lenders are affiliated.</p>
        <span class="filer-list__title title-extra-small">Add or remove Lenders from your list</span>
        <div class="filer-list__input-holder input-with-icon-holder">
          <input
            v-model="searchInput"
            type="text"
            placeholder="Search Lenders.."
            class="filer-list__input input-with-icon"
          >
          <SvgIcon
            class="filer-list__input-icon input-with-icon__icon"
            icon-name="ico-loop"
          />
        </div>
        <ul class="filter-list">
          <perfect-scrollbar
            class="filter-list-ps"
            :options="options"
          >
            <template v-for="(list, index) in lenders">
              <li
                v-if="!list.hidden"
                :key="list.id"
                class="filter-list__item"
              >
                <label
                  :for="`lender-chkb-${index}`"
                  class="filter-list__item-label"
                >
                  <div
                    class="filter-list__item-img"
                    :style="{backgroundImage: 'url(' + (list.profile_image ? list.profile_image : placeholderImageUser) + ')'}"
                  />
                  <div class="filter-list__item-content">
                    <h4
                      v-if="list.first_name"
                      class="filter-list__item-title title-extra-small"
                    >{{ list.first_name }} {{ list.last_name }} <template v-if="list.company">|</template> {{ list.company }}</h4>
                    <a
                      v-if="list.email"
                      :href="`mailto:${list.email}`"
                      class="filter-list__item-info"
                    >{{ list.email }}</a>
                  </div>
                  <input
                    :id="`lender-chkb-${index}`"
                    type="checkbox"
                    hidden
                    class="filter-list__item-input"
                    @click="lenderId = list.email"
                  >
                  <span
                    v-if="openPopup !== index"
                    class="filter-list__item-check"
                    @click="openPopup = index"
                  >
                    <SvgIcon
                      class="filter-list__item-check-icon"
                      icon-name="ico-close-circle"
                    />
                  </span>
                  <div
                    v-if="openPopup === index"
                    class="filter-list__item-confirm"
                  >
                    <span class="filter-list__item-confirm-name">Are you sure?</span>
                    <div class="filter-list__item-confirm-icons">
                      <span
                        class="filter-list__item-confirm-ico"
                        @click="popupRes('remove')"
                      >
                        <SvgIcon
                          class="filter-list__item-check-icon"
                          icon-name="ico-check-circle"
                        />
                      </span>
                      <span
                        class="filter-list__item-confirm-ico"
                        @click="popupRes('cancel');"
                      >
                        <SvgIcon
                          class="filter-list__item-check-icon"
                          icon-name="ico-close-circle"
                        />
                      </span>
                    </div>
                  </div>
                </label>
              </li>
            </template>
          </perfect-scrollbar>
        </ul>
      </div>
      <div
        class="profile-tabs__content-video-wrapper"
        @click="triggerPopup"
      >
        <div class="profile-tabs__content-video-play-btn" />
        <img
          class="cover-img"
          :src="videoThumbnailImg"
        >
      </div>
      <div
        v-if="popupActive"
        class="profile-tabs__content-video-popup"
        @click="clickOutside($event)"
      >
        <div class="profile-tabs__content-video-popup-content">
          <div
            class="profile-tabs__content-video-popup-close"
            @click="popupClose"
          />
          <div class="profile-tabs__content-video-popup-content-video">
            <video
              ref="video"
              controls
              class="profile-tabs__content-video-popup-content-video-player"
              :src="lenderVideo"
              autoplay
              controlsList="nodownload"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="filer-list-wrap filer-list-wrap--empty" v-else>
            <span class="filer-list__title title-extra-small">At the moment, you are not connected to any Lender <br> on our platform. Below you can add or invite Lenders by email.</span>
        </div> -->

    <div :class="{'import-block': lenders.length, 'import-block import-block--empty': !lenders.length}">
      <div class="cd-form-inner">
        <div :class="['manage-lenders', profile ? 'manage-lenders--profile':'']">
          <div class="manage-lenders__wrap">
            <div
              v-if="!lenders.length"
              class="manage-lenders__head"
            >
              <h2 class="manage-lenders__head-title title-small">Would you like to give lenders you know<br> “first priority” to review this deal? </h2>
              <div class="manage-lenders__head-content entry-content">
                <p>Preferred lenders will have a 3-day “rights of first refusal”, at which point your deal will be visible by all other colleagues at their bank.</p>
                <p>Your deal will still be immediately available to the 1000s of other loan officers who are not part of the banking institution with which your “first priority” lenders are affiliated.</p>
              </div>
            </div>
            <div class="manage-lenders__body">
              <h3 class="title-extra-small">Upload a list of email addresses <br><span class="title-extra-small__thin title-extra-small__em">Types of files you can upload: TXT, CSV</span></h3>
              <div class="manage-lenders__actions">
                <div class="manage-lenders__actions-wrap">
                  <b-row>
                    <b-col lg="6">
                      <PartInputFile
                        id="computer"
                        label="Upload List"
                        icon="ico-desktop" 
                        @addToEmails="addToEmails"
                      />
                    </b-col>
                    <b-col sm="12">
                      <!-- modifier class - link-holder--justify-right -->
                      <div class="manage-lenders__actions-footer">
                        <div class="link-holder">
                          <a
                            href="/csv/email.csv"
                            download
                            class="link link--sm"
                          >
                            <SvgIcon
                              class="link__icon"
                              icon-name="ico-download"
                            />
                            Download sample list
                          </a>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>

              <h3 class="title-extra-small">Enter email addresses online</h3>
              <div class="manage-lenders__invite-form">
                <div class="input-holder error-message-holder">
                  <label class="input-label">Copy/Paste email addresses into the field below.<br> Or, type them up individually and press “Enter” after each email address</label>
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
                            @click="removeEmail(index)"
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
                      placeholder="Email Addresses"
                      @keyup="checkString($event)"
                      @change="checkLongString($event)"
                    >
                  </div>
                  <span
                    v-if="errorEmail"
                    class="error-message"
                  >Invalid email address</span>
                </div>
                <div class="btn-holder btn-holder--justify-right">
                  <div class="submit-btn-holder">
                    <img
                      v-if="showLoader"
                      src="@/assets/images/loader.gif"
                      alt="loader"
                      class="submit-btn-loader"
                    >
                    <a
                      class="btn"
                      href="javascript:;"
                      @click="sendInvite()"
                    >Connect to Lenders</a>
                  </div>
                </div>
                <div class="error-list">
                  <a
                    v-if="errorArray.length"
                    href="javascript:;"
                    class="link"
                    @click="errorArray = []"
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
          </div>
        </div>
      </div>

      <!-- <BlockCreateDealFinishManageLenders :profile="true" @addLenderParent="addLenderParent"/> -->
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import PartInputFile from '@/components/parts/PartInputFile.vue'
    import {getDemoAsset, getImagesAsset} from '@/config/util'
    import ClickOutside from 'vue-click-outside'
    //import BlockCreateDealFinishManageLenders from '@/components/blocks/BlockCreateDeal/BlockCreateDealFinishManageLenders.vue';

    interface Data {
        options
        imageUrl: string
        placeholderImage: string
        placeholderImageUser: string
        searchInput: string
        invite: string
        messageText: string
        message: boolean
        openPopup: string
        lenderId: string
        videoThumbnailImg
        lenderVideo: string

        emails
        email: string
        errorEmail: boolean
        errorArray
        showLoader: boolean
        popupActive: boolean
    }

    export default Vue.extend({

        components: {
            PartInputFile,
            SvgIcon,
           // BlockCreateDealFinishManageLenders
        },

        directives: {
            ClickOutside,
        },

        props: {
            profile: {
                type: Boolean,
            },
            userId: {
                type: String,
            },
        },

        data(): Data {
            return {
                options: {
                    suppressScrollX: true,
                    wheelSpeed: 0.2,
                },
                imageUrl: getDemoAsset('dashboard/user_lander.jpg'),
                placeholderImage: getImagesAsset('placeholders/logo-placeholder.png'),
                placeholderImageUser: getImagesAsset('placeholders/user_placeholder_round.png'),
                videoThumbnailImg: getImagesAsset('video-thumbnail.png'),
                lenderVideo: 'https://financelobby-production.s3.amazonaws.com/assets/Finance%20Lobby%20animation.mp4',
                searchInput: null,
                invite: '',
                messageText: '',
                message: false,
                openPopup: '',
                lenderId: '',

                email: "",
                emails: [],
                errorEmail: false,
                errorArray: [],
                showLoader: false,
                popupActive: false,
            }
        },

        computed: {
            lenders() {
                return this.$store.getters.getBrokerLenders
            }, 
        },

        watch: {
            searchInput(){
                this.searchList()
            },
        },

        methods: {
            async sendInvite() {
                if(!this.showLoader) {
                    this.showLoader = true
                    if(!this.errorEmail) {
                        if(this.emails.length > 0) {
                            await this.$store.dispatch('addLender', this.emails).then((res) => {
                                this.$store.dispatch('getBrokerLender', this.userId)
                                this.emails = []
                                this.errorArray = res.data.data.addLender
                            })
                        }
                    }
                    this.showLoader = false
                }
            },

            triggerPopup() {
                this.popupActive = true
            },

            popupClose() {
                this.popupActive = false
            },

            clickOutside(event) {
                // If target is not video, then close popup
                if(!this.$refs.video.contains(event.target)) {
                    this.popupActive = false
                }
            },
            searchList(){
                let val = this.searchInput
                val = val.toLowerCase()
                let arr = this.lenders
                arr.forEach(element => {
                    if(val === ''){
                        element.hidden = false
                        return false
                    }
                    let name = element.first_name +' '+ element.last_name
                    name = name.toLowerCase();
                    (name.includes(val) || element.email.includes(val))
                        ? element.hidden = false
                        : element.hidden = true
                })
                this.$store.commit('SET_LENDER_LIST', arr)
            },
            async popupRes(flag) {
                if(flag === 'remove') {
                    await this.$store.dispatch('removeLender', this.lenderId)
                    .then(response => {
                        const removeLender = response.data.data.removeLender
                        if(removeLender.success){
                            this.$store.dispatch('getBrokerLender', this.userId)
                        }
                    })
                }
                this.lenderId = ''
                this.openPopup = ''
            },

            checkString(e) {
                this.errorEmail = false
                const emailVal = e.target.value
                const last = emailVal.substr(emailVal.length - 1)
                if(last === ';' || last === ',') {
                    const email = emailVal.slice(0, -1)
                    this.sendToCheck(email)
                }
            },
            checkLongString(e) {
                this.errorArray = []
                const emailVal = e.target.value
                let commaSplice = emailVal.split(/[ ,]+/)
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
                    const flag = this.checkEmail(email)
                    if(flag) {
                        const check = this.checkIfExsist(email)
                        if(check) {
                            this.emails.push(email)
                        } 
                    } else {
                        this.setError({
                            email: email,
                            message: 'Email format',
                        })
                    }
                })

                this.email = ''
            },
            sendToCheck(email) {
                const flag = this.checkEmail(email)
                if(flag) {
                    const check = this.checkIfExsist(email)
                    if(check) {
                        this.emails.push(email)
                        this.errorEmail = false
                        this.email = ''
                    }
                } else {
                    this.errorEmail = true
                }
            },
            removeEmail(index) {
                this.emails.splice(index, 1)
            },
            addToEmails(emails) {
                if(this.emails.length === 0) {
                    this.emails = emails
                } else {
                    emails.forEach(element => {
                        const flag = this.checkEmail(element)
                        if(flag) {
                            const check = this.checkIfExsist(element)
                            if(check) {
                                this.emails.push(element)
                            }
                        } else {
                            this.setError({
                                email: element,
                                message: 'Email format',
                            })
                        }
                    })
                }
            },
            setError(obj){
                this.errorArray.push(obj)
            },
            checkIfExsist(email) {
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
            },
            checkEmail(email) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(String(email).toLowerCase())
            },
        },
    })
</script>

<style lang="scss" scoped>
    .filer-list-wrap--empty {
        .filer-list__title {
            font-size: 26px;
            text-align: center;

            @include mq($lap-l) {
                font-size: 24px;
            }

            @include mq($lap-small) {
                font-size: 22px;
            }

            @include mq($md) {
                font-size: 20px;

                br {
                    display: none;
                }
            }

            @include mq(640px) {
                font-size: 18px;
            }
        }
    }

    .filer-list-wrap {
        display: flex;

        @include mq(1200px) {
            flex-direction: column-reverse;

            .profile-tabs__content-video-wrapper {
                margin-left: 0;
                margin-right: auto;
                margin-bottom: 20px;
            }
        }
    }

    .filer-list-wrap--alt {
        .profile-tabs__content-video-wrapper {
            margin: 0;
            min-width: auto;
            max-width: 350px;
            width: 100%;

            @include mq(1024px) {
                margin: 0 auto;
            }
        }

    }

    .link-holder {
        @include mq(1024px) {
            justify-content: center;
        }
    }

    .filer-list-holder {
        max-width: 650px;
        width: 100%;
        margin-right: 20px;

        @include mq(1200px) {
            margin-right: 0;
        }
    }


    .filer-list__desc-text.bold {
        font-weight: bold;
        margin-bottom: 10px;
        font-style: normal;
    }

    .filer-list__desc-text {
        font-size: 14px;
        font-style: italic;
    }

    .filer-list__title {
        margin-bottom: 10px;
        margin-top: 20px;
    }

    .filer-list__input-holder {
        margin-bottom: 20px;
    }

    .filter-list {
        border: 1px solid $aqua-haze;
    }

    .filter-list__item {
        border-bottom: 1px solid $aqua-haze;

        &:last-of-type {
            border-bottom: 0;
        }

        @include hover {
            .filter-list__item-img {
                border-color: rgba($yellow-orange, 0.7);
                box-shadow: 0 0 15px 0 rgba($yellow-orange, 0.4);
            }

            .filter-list__item-title {
                color: $yellow-orange;
            }
        }
    }

    .filter-list__item-label {
        padding: 24px 120px 23px 27px;
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;

        @include mq($lap-l) {
            padding: 20px 120px 19px 27px;
        }

        @include mq($lg) {
            padding: 10px 70px 14px 5px;
        }
    }

    .filter-list__item-input {
        &:checked {
            + .filter-list__item-check .filter-list__item-check-icon {
                color: $yellow-orange;
            }
        }
    }

    .filter-list__item-img {
        width: 54px;
        height: 54px;
        border-radius: 50px;
        border: 1px solid rgba($aqua-haze, 0.5);
        margin-right: 13px;
        overflow: hidden;
        transition: $dur $ease;
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;

        @include mq($lg) {
            width: 40px;
            height: 40px;
            margin-right: 10px;
        }
    }

    .filter-list__item-content {
        @include mq($sm) {
            @include text-overflow;
        }
    }

    .filter-list__item-title {
        margin-bottom: 7px;
        transition: $dur $ease;

        @include mq($lg) {
            margin-bottom: 1px;
        }
    }
    
    .filter-list__item-info {
        font-size: 14px;
        color: $santas-gray;
        font-weight: 400;
        letter-spacing: 0.07px;
        line-height: 1.2;
    }

    a.filter-list__item-info {
        transition: $dur $ease;

        @include hover {
            color: $yellow-orange;
        }
    }

    .filter-list__item-check {
        @include center(y, absolute);
        right: 32px;
        cursor: pointer;

        @include mq($lg) {
            right: 10px;
        }
    }

    .filter-list__item-check-icon {
        font-size: 33px;
        color: $yellow-orange;

        @include mq($lg) {
            font-size: 25px;
        }
    }

    .filter-list__item-confirm-name {
        font-size: 15px;
        line-height: 1;
        color: $yellow-orange;
        display: block;
        text-align: center;
        margin-bottom: 5px;

        @include mq($sm) {
            font-size: 13px;
        }
    }

    .filter-list__item-confirm {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        @include center(y, absolute);
        right: 8px;

        @include mq($sm) {
            max-width: 70px;
            right: -3px;
        }
    }

    .filter-list__item-confirm-icons {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .filter-list__item-confirm-ico {
        margin: 0 8px;

        @include mq($sm) {
            margin: 0 2px;
        }
    }

    .filter-list-ps {
        height: 420px;
        padding-right: 20px;

        @include mq($lg) {
            padding-right: 8px;
        }
    }

    // Import Block
    .import-block {
        margin-top: 40px;

        @include mq($lg) {
            margin-top: 30px;
            text-align: center;
        }
    }

    .import-block--empty {

        @include mq(640px) {
            margin-top: 20px;
        }

        .import-block__title {
            text-align: center;
        }

        .import-block__services {
            justify-content: center;
            margin-bottom: 40px;

            @include mq($lg) {
                margin-bottom: 30px;
            }

            @include mq(640px) {
                margin-bottom: 20px;
            }
        }

        .import-block__services-title {
            margin-right: 0;
        }

        .import-block__input-holder {
            max-width: 500px;
            margin: 0 auto 40px;

            @include mq($lg) {
                margin-bottom: 30px;
            }

            @include mq(640px) {
                margin-bottom: 20px;
            }
        }

        .import-block__btn {
            margin: 0 auto;
        }
    }

    .import-block__title {
        margin-bottom: 5px;
    }

    .import-block__services {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 8px;

        @include mq($lg) {
            flex-direction: column;
        }
    }

    .import-block__services-title {
        margin-right: 47px;

        @include mq($lg) {
            margin-right: 0;
        }
    }

    .import-block__services-box {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .import-block__services-box-item {
        display: block;
        padding-right: 42px;
        margin-right: 42px;
        position: relative;

        &::after {
            content: '';
            @include center(y, absolute);
            right: 0;
            width: 2px;
            height: 32px;
            background-color: $mosque;
        }

        &:last-of-type {
            padding-right: 0;
            margin-right: 0;

            &::after {
                display: none;
            }
        }

        @include mq($lg) {
            padding-right: 15px;
            margin-right: 15px;
        }
    }

    .import-block__input-holder {
        margin-bottom: 30px;
    }

    .import-block__btn-holder {
        @include mq($lg) {
            justify-content: center;
        }
    }

    .error-list-holder {
        padding: 15px 0;

        @include mq($sm) {
            padding-top: 25px;
        }
    }

    .error-list {
        margin-top: 15px;
    }

    .error-list__inner {
        margin-bottom: 5px;
    }

    .error-list__title {
        font-size: 15px;
        color: $blue-chill;
        font-weight: 500;
    }

    .error-list__text {
        font-size: 15px;
        color: $shark;
    }

    .manage-lenders {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 50px;

        @include mq($lap-l) {
            flex-direction: column-reverse;
        }
    }

    .manage-lenders__wrap {
        max-width: 630px;
        width: 100%;
    }

    .manage-lenders--profile {
        .manage-lenders__wrap {
            max-width: 800px;
        }
    }

    .manage-lenders__aside {
        flex: 1;
        max-width: 390px;
        margin: 0 auto;

        @include mq($lap-l) {
            max-width: 100%;
            margin: 0 0 20px;
        }
    }

    .manage-lenders__head {
        margin-bottom: 50px;
    }

    .manage-lenders__head-title {
        line-height: 1.55;
        letter-spacing: 0.09px;
        margin-bottom: 20px;
    }

    .manage-lenders__invite-form {
        margin: 30px 0 43px;
    }

    .manage-lenders__actions-wrap {
        margin: 20px 0;
    }

    .manage-lenders__actions-footer {
        margin-top: 40px;
    }

    .manage-lenders__actions {
        margin-bottom: 50px;
    }

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

    .profile-tabs__content-video-wrapper {
        max-width: 350px;
        width: 100%;
        height: 200px;
        border-radius: 10px;
        margin-left: auto;
        margin-right: 0;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        transition: $dur $ease;

        @include mq(400px) {
            width: 100%;
            min-width: 100%;
        }

        &:hover {
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }

        .profile-tabs__content-video-play-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 4px solid rgba($white, 1);
            background-color: rgba($yellow-orange, 1);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            
            &::before {
                content: '';
                width: 0;
                height: 0;
                border-top: 10px solid transparent;
                border-left: 15px solid $white;
                border-bottom: 10px solid transparent;
                margin-left: 5px;
            }
        }
    }

    .profile-tabs__content-video-popup {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000000;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba($white, 0.7);
    }

    .profile-tabs__content-video-popup-content-video-player {
        max-width: 980px;
        width: 100%;
    }

    .profile-tabs__content-video-popup-content {
        position: relative;
        padding: 0 10px;
    }

    .profile-tabs__content-video-popup-close {
        position: absolute;
        top: -2px;
        right: -33px;
        width: 24px;
        height: 24px;
        cursor: pointer;
        transition: $dur $ease;

        @include mq(1200px) {
            top: -27px;
            right: 8px;
        }

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
            width: 21px;
            background-color: $santas-gray;
            @include center;
            transition: $dur $ease;
        }

        &::before {
            transform: translate(-50%, -50%) rotate(45deg);
        }

        &::after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
    }

    .title-extra-small, .filter-list__item-info {
        white-space: nowrap;
    }

    .profile-tabs__content--alt {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;

        @include mq(1200px) {
            flex-direction: column;
        }

        @include mq(1024px) {
            .manage-lenders__wrap {
                margin: 0 auto;
            }
        }

        .filer-list-wrap--alt {
            max-width: 350px;
            width: 100%;
            margin-left: auto;
            margin-top: 40px;

            @include mq(1200px) {
                margin-left: 0;
            }

            @include mq(1024px) {
                margin-left: auto;
                margin-right: auto;
            }
        }

        .import-block {
            margin-right: 10px;
        }
    }
</style>
