<template>
  <div class="c-col profile-sidebar--holder">
    <div class="profile-sidebar">
      <div class="profile-sidebar-upload-holder img-upload-holder">
        <PartUploadImage :data="user" />
      </div>
      <ul
        v-if="user.role === 'broker'"
        class="profile-sidebar__list profile-sidebar__list--basic"
      >
        <perfect-scrollbar
          class="sidebar-ps"
          :options="options"
        >
          <li class="profile-sidebar__list-item">
            <h4 class="profile-sidebar__list-title">Deals Posted</h4>
            <span class="profile-sidebar__list-num">{{ dealsPosted }}</span>
          </li>
          <li class="profile-sidebar__list-item">
            <h4 class="profile-sidebar__list-title">Quotes Received</h4>
            <span class="profile-sidebar__list-num">{{ quotesReceived }}</span>
          </li>
          <li class="profile-sidebar__list-item">
            <h4 class="profile-sidebar__list-title">Successfully Paired Deals</h4>
            <span class="profile-sidebar__list-num">{{ pairedDeals }}</span>
          </li>
          <li
            v-if="user.role === 'broker'"
            class="profile-sidebar__list-item"
          >
            <h4 class="profile-sidebar__list-title">Subscription</h4>
            <span
              v-if="subscription?.status === 'active'"
              class="profile-sidebar__list-num"
            >
              {{ subscription?.name }}
            </span>
            <span
              v-else-if="subscription?.status === 'trialing'"
              class="profile-sidebar__list-num"
            >
              {{ subscription?.name }} - Free
          </span>
            <span
              v-else
              class="profile-sidebar__list-num"
            >
              Free tier
            </span>
          </li>
        </perfect-scrollbar>
      </ul>
      <ul
        v-if="user.role === 'lender'"
        class="profile-sidebar__list"
      >
        <perfect-scrollbar
          class="sidebar-ps"
          :options="options"
        >
          <li class="profile-sidebar__list-item">
            <div class="profile-sidebar__list-item__top">
              <h4 class="profile-sidebar__list-title profile-sidebar__list-title--with-icon">
                Your Biography
                <span
                  class="profile-sidebar__list-item__edit"
                  @click="editFields('biography', 'editBiography')"
                ><SvgIcon
                  class="profile-sidebar__list-item__edit-icon"
                  icon-name="ico-edit"
                /></span>
              </h4>
            </div>
            <div class="profile-sidebar__list-item__bottom">
              <div
                v-if="biography && !editBiography"
                class="profile-sidebar__list-item__bottom-txt"
              >
                {{ biography }}
              </div>
              <div
                v-if="editBiography"
                class="input-holder input-holder--no-focus profile-sidebar__list-item__input-holder"
              >
                <textarea
                  id="edit-biography"
                  v-model="biography"
                  name="edit-biography"
                  rows="5"
                />
                <div class="profile-sidebar__list-item__btn-holder align--right">
                  <a
                    class="btn btn--small"
                    href="javascript:;"
                    @click="saveUserMeta('biography')"
                  >Save</a>
                </div>
              </div>
            </div>
          </li>
          <li class="profile-sidebar__list-item">
            <div class="profile-sidebar__list-item__top">
              <h4 class="profile-sidebar__list-title profile-sidebar__list-title--with-icon">
                Your Specialty
                <span
                  class="profile-sidebar__list-item__edit"
                  @click="editFields('specialty', 'editSpecialist')"
                ><SvgIcon
                  class="profile-sidebar__list-item__edit-icon"
                  icon-name="ico-edit"
                /></span>
              </h4>
            </div>
            <div class="profile-sidebar__list-item__bottom">
              <div
                v-if="specialty && !editSpecialist"
                class="profile-sidebar__list-item__bottom-txt"
              >
                {{ specialty }}
              </div>
              <div
                v-if="editSpecialist"
                class="input-holder input-holder--no-focus profile-sidebar__list-item__input-holder"
              >
                <input
                  v-model="specialty"
                  type="text"
                />
                <div class="profile-sidebar__list-item__btn-holder align--right">
                  <a
                    class="btn btn--small"
                    href="javascript:;"
                    @click="saveUserMeta('specialty')"
                  >Save</a>
                </div>
              </div>
            </div>
          </li>
          <li class="profile-sidebar__list-item">
            <div class="profile-sidebar__list-item__top">
              <h4 class="profile-sidebar__list-title profile-sidebar__list-title--with-icon">
                Linkedin URL
                <span
                  class="profile-sidebar__list-item__edit"
                  @click="editFields('linkedin_url', 'editLinkedin')"
                ><SvgIcon
                  class="profile-sidebar__list-item__edit-icon"
                  icon-name="ico-edit"
                /></span>
              </h4>
            </div>
            <div class="profile-sidebar__list-item__bottom">
              <div
                v-if="linkedin_url && !editLinkedin"
                class="profile-sidebar__list-item__bottom-txt"
              >
                {{ linkedin_url }}
              </div>
              <div
                v-if="editLinkedin"
                class="input-holder input-holder--no-focus profile-sidebar__list-item__input-holder"
              >
                <div class="error-message-holder error-message-holder--block">
                  <input
                    v-model="linkedin_url"
                    type="url"
                  />
                  <span
                    v-if="linkedinErrMsg"
                    class="error-message"
                  > {{ linkedinErrText }} </span>
                </div>
                <div class="profile-sidebar__list-item__btn-holder align--right">
                  <a
                    class="btn btn--small"
                    href="javascript:;"
                    @click="saveUserMeta('linkedin_url')"
                  >Save</a>
                </div>
              </div>
            </div>    
          </li>
        </perfect-scrollbar>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import PartUploadImage from '@/components/parts/PartUploadImage.vue'

    interface Data {
        biography: string
        specialty: string
        linkedin_url: string
        editBiography: boolean
        editSpecialist: boolean
        editLinkedin: boolean
        options
        linkedinErrMsg: boolean
        linkedinErrText: string
        dealsPosted: number
        quotesReceived: number
        pairedDeals: number,
        subscriptionTier: string,
    }

    export default Vue.extend({
        
        components: {
            SvgIcon,
            PartUploadImage,
        },
        data(): Data {
            return {
                biography: '',
                specialty: '',
                linkedin_url: '',
                editBiography: false,
                editSpecialist: false,
                editLinkedin: false,
                linkedinErrMsg: false,
                linkedinErrText: '',
                options: {
                    suppressScrollX: true,
                    wheelSpeed: 0.4,
                },
                dealsPosted: 0,
                quotesReceived: 0,
                pairedDeals: 0,
                subscriptionTier: '',
            }
        },

        computed: {
            isTrialing() {
              return this.$store.getters.subscriptionIsTrial
            },
            subscription() {
              return this.$store.state.Broker.subscription
            },
            // get user from state
			      user() {
				      return this.$store.getters.getUser
            },
            // get lender meta fields
            getProfileInfoLender() {
                return this.$store.getters.getLenderMetas
            },
            // get broker info
            profileInfoBroker() {
                return this.$store.getters.getProfileInfoBroker
            },
		},

        watch: {
            getProfileInfoLender(obj) {
                this.biography = obj.biography
                this.specialty = obj.specialty
                this.linkedin_url = obj.linkedin_url
            },
            profileInfoBroker() {
                this.dealsPosted = this.profileInfoBroker.dealsPosted
                this.quotesReceived = this.profileInfoBroker.quotesReceived
                this.pairedDeals = this.profileInfoBroker.pairedDeals
            },

            biography:  function(val) {
                this.biography = val.replace(/<br>/g, '\n')
            },

            specialty: function(val) {
                this.specialty = val.replace(/<br>/g, '\n')
            },
        },

        methods: {
            disableEditing() {
                this.editBiography = false
                this.editSpecialist = false
                this.editLinkedin = false
            },

            /**
             * @author Nikola Popov
             * @description
             *  if user cancel editing
             * @param prop string 
             * @param action string 
             */
            editFields(prop, action){
                if(this[action]){
                    const obj = this.getProfileInfoLender
                        if(prop === 'biography') {
                            obj.biography === undefined ? this[prop] = '' : this[prop] = obj.biography
                        }
                        if(prop === 'specialty') {
                            obj.specialty === undefined ? this[prop] = '' : this[prop] = obj.specialty
                        }
                        if(prop === 'linkedin_url') {
                            obj.linkedin_url === undefined ? this[prop] = '' : this[prop] = obj.linkedin_url
                        }
                }
                this[action] = !this[action]
            },

            /**
             * @author Nikola Popov
             * @description
             *  create meta object
             * @param meta string meta key
             */
            saveUserMeta(meta) {
                if(meta === 'linkedin_url'){
                    const val = this[meta]
                    if(!this.validURL(val) && val !== ''){
                        return
                    }
                }

                const obj = {
                    biography: meta === 'biography' ? this[meta].replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/"/g, '\'') : this.biography.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/"/g, '\''),
                    specialty: meta === 'specialty' ? this[meta].replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/"/g, '\'') : this.specialty.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/"/g, '\''),
                    linkedin_url: meta === 'linkedin_url' ? this[meta] : this.linkedin_url,
                }
                this.setMetaFields(obj)
            },

            validURL(str) {
                let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                    '(\\#[-a-z\\d_]*)?$','i') // fragment locator


                    // '^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)'; // linkedin

                    const v = !!pattern.test(str)
                    if (!v) {
                        this.linkedinErrMsg = true
                        this.linkedinErrText = 'You must insert a valid Linkedin URL'

                        setTimeout(() => {
                            this.linkedinErrText = ''
                            this.linkedinErrMsg = false
                        }, 3000)
                    }

                return v
            },

            /**
             * @author Nikola Popov
             * @description
             *  meta object send to save
             * @param obj object
             */

            setMetaFields(obj) {
                this.$store.dispatch('setMetaFieldForLender', obj)
                this.disableEditing()
            },
        },
    })
</script>

<style lang="scss" scoped>
    .profile-sidebar--holder {
        @include mq($lap-xs + 1, min) {
            flex: 0 0 28.7%;
            max-width: 28.7%;
        }

        @include mq($lap-xs) {
            width: 100%;
            margin: 0 auto 30px;
        }
    }
    
    .profile-sidebar {
        background-color: $white;
        border-radius: 15px;
        padding: 59px 0;

        // @include mq($lap-xs + 1, min) {
        //     .sticky & {
        //         position: fixed;
        //         top: 90px;
        //         width: 100%;
        //         max-width: calc(28.7% - 59px);
        //     }
        // }

        @include mq($lap-xs) {
            min-height: auto;
        }

        @include mq($sm) {
            padding: 40px 0;
        }
    }

    .profile-sidebar-upload-holder {
        margin-bottom: 65px;

        @include mq($lap-l) {
            margin-bottom: 40px;
        }
    }

    .profile-sidebar__list-item {
        padding: 20px 32px;
        border-bottom: 1px solid $aqua-haze;

        &:first-of-type {
            border-top: 1px solid $aqua-haze;
        }

        .profile-sidebar__list--basic & {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .input-holder {
            margin-bottom: 0;
        }

        @include mq($lap-l) {
            padding: 17px 32px;
        }

        @include mq($sm) {
            padding: 15px;
        }
    }

    .profile-sidebar__list-title {
        font-size: 16px;
        color: $shark;
        font-weight: 700;
        letter-spacing: 0.08px;
        line-height: 1.2;
        margin-right: 30px;
        position: relative;

        @include mq($lap-l) {
            font-size: 15px;
        }
    }

    .profile-sidebar__list-title--with-icon {
        padding-right: 40px;
        margin-right: 0;
    }

    .profile-sidebar__list-item__edit {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;

        @include hover {
            .profile-sidebar__list-item__edit-icon {
                color: $blue-chill;
            }
        }
    }

    .profile-sidebar__list-item__edit-icon {
        font-size: 16px;
        height: 16px;
        color: $santas-gray;
        transition: $dur $ease;
    }

    .profile-sidebar__list-num {
        font-size: 16px;
        color: $yellow-orange;
        font-weight: 700;
        letter-spacing: 0.08px;
        line-height: 1;
        white-space: nowrap;
    }

    .profile-sidebar__list-item__btn-holder {
        display: flex;
        align-items: center;
        margin-top: 20px;
    }

    .profile-sidebar__list-item__top {
        margin-bottom: 25px;
    }

    .profile-sidebar__list-item__bottom-txt {
        font-size: 14px;
        letter-spacing: 0.07px;
        line-height: 1.7;
        color: $shark;
        font-weight: 400;
    }

    .sidebar-ps {
        // height: calc(100vh - 650px);

        @include mq($lap-l) {
            // height: calc(100vh - 550px);
        }

        @include mq($lap-xs) {
            height: auto;
        }
    }

    :deep() {
        .ps__rail-y:hover > .ps__thumb-y,
        .ps__rail-y:focus > .ps__thumb-y,
        .ps__rail-y.ps--clicking .ps__thumb-y {
            width: 10px;
            background-color: $blue-chill;
            opacity: 1;
        }

        .ps:hover > .ps__rail-x,
        .ps:hover > .ps__rail-y,
        .ps--focus > .ps__rail-x,
        .ps--focus >
        .ps__rail-y,
        .ps--scrolling-x >
        .ps__rail-x,
        .ps--scrolling-y > .ps__rail-y {
            opacity: 1;
        }
    
        .ps .ps__rail-x:hover,
        .ps .ps__rail-y:hover,
        .ps .ps__rail-x:focus,
        .ps .ps__rail-y:focus,
        .ps .ps__rail-x.ps--clicking,
        .ps .ps__rail-y.ps--clicking {
            background-color: $athens-gray;
        }
    
        .ps__rail-y {
            width: 14px;
            opacity: 1;
        }
    
        .ps__thumb-y {
            background-color: $blue-chill;
            width: 10px;
        }
    }
</style>
