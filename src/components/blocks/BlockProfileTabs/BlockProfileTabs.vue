<template>
  <div class="c-col profile-tabs-holder">
    <div class="profile-tabs">
      <ul class="profile-tabs__list">
        <li class="profile-tabs__list-item">
          <span
            :class="['profile-tabs__list-item-inner', activetab === 1 ? 'active' : '' ]"
            @click="activetab = 1, activeTabChange()"
          >Personal Settings</span>
        </li>
        <li class="profile-tabs__list-item">
          <span
            :class="['profile-tabs__list-item-inner', activetab === 2 ? 'active' : '' ]"
            @click="activetab = 2, activeTabChange()"
          >Company Settings</span>
        </li>
        <li class="profile-tabs__list-item">
          <span
            :class="['profile-tabs__list-item-inner', activetab === 3 ? 'active' : '' ]"
            @click="activetab = 3, activeTabChange()"
          ><template v-if="user?.role === 'lender'">Deal Preferences</template><template v-else>Lender Network</template></span>
        </li>
        <li
          v-if="user?.role === 'broker'"
          class="profile-tabs__list-item"
        >
          <a
            :class="['profile-tabs__list-item-inner', activetab === 4 ? 'active' : '' ]"
            @click="activetab = 4, activeTabChange()"
          >My Subscription</a>
        </li>
        <!-- <li class="profile-tabs__list-item"><span :class="['profile-tabs__list-item-inner', activetab === 4 ? 'active' : '' ]" @click="activetab = 4, activeTabChange()">Notifications</span></li> -->
      </ul>
      <div class="tabs-wrapper">
        <BlockProfilePersonalSettings
          v-show="activetab === 1"
          ref="profilePersonalSettings"
        />
        <BlockProfileCompanySettings
          v-show="activetab === 2"
          ref="profileCompanySettings"
        />
        <BlockProfileLanderDetails
          v-if="user?.role === 'lender'"
          v-show="activetab === 3"
          ref="profileLanderDetails"
          :activetab="activetab"
          :role="user?.role"
        />
        <BlockProfileBrokerDetails
          v-if="activetab === 3 && user?.role === 'broker'"
          :profile="true"
          :user-id="userId"
        />
        <BlockProfileSubscriptionDetails
          v-if="activetab === 4"
        />
        <!-- <BlockProfileNotifications v-show="activetab === 4"/> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import BlockProfilePersonalSettings from '@/components/blocks/BlockProfileTabs/BlockProfilePersonalSettings.vue'
    import BlockProfileCompanySettings from '@/components/blocks/BlockProfileTabs/BlockProfileCompanySettings.vue'
    import BlockProfileLanderDetails from '@/components/blocks/BlockProfileTabs/BlockProfileLanderDetails.vue'
    import BlockProfileBrokerDetails from '@/components/blocks/BlockProfileTabs/BlockProfileBrokerDetails.vue'
    import BlockProfileSubscriptionDetails from '@/components/blocks/BlockProfileTabs/BlockProfileSubscriptionDetails.vue'
    // import BlockProfileNotifications from '@/components/blocks/BlockProfileTabs/BlockProfileNotifications.vue';

    interface Data {
        activetab: number
    }

    export default Vue.extend({

        components: {
            BlockProfilePersonalSettings,
            BlockProfileCompanySettings,
            BlockProfileLanderDetails,
            BlockProfileBrokerDetails,
            BlockProfileSubscriptionDetails,
            // BlockProfileNotifications
        },
        props:[
            'changeBlockPreloader',
            'blockPreloader',
            'onTabChange',
        ],

        data(): Data {
            return {
                activetab: 1,
            }
        },

        computed: {
            user() {
                return this.$store.getters.getUser
            },
            userId() {
                return this.$store.getters.getUserId
            },
            activeTabLook() {
                return this.$store.getters.getActiveTab
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

        /**
         * @author Nikola Popov
         * @description
         *  get all data for user profile lender/broker
         */
        async beforeMount(){
            // These initial requests have to be executed synchronously, to handle token refreshing in the correct way
            await this.$store.dispatch('getProfileData', { id: parseInt(this.user.id), role: this.user?.role }).then(
                async () => {
                    if (this.user?.role === 'lender') {
                        await this.$store.dispatch('getLenderProfileData').then(() => {
                            this.$emit('changeBlockPreloader', false)
                        })
                    } else {
                        await this.$store.dispatch('getBrokerLender', parseInt(this.user.id)).then(() => {
                            this.$emit('changeBlockPreloader', false)
                        })
                    }
                },
            )

            if(this.activeTabLook) {
                this.activetab = 4
                this.$store.commit('SET_ACTIVE_TAB', false)
            } else {
                this.activetab = 1
            }
        },

        methods: {
            /**
             * @author Nikola Popov
             * @description
             *  check all form on user profile
             */

            updateChanges(flag) {
                this.$refs.profilePersonalSettings.updateChanges(flag)
                this.$refs.profileCompanySettings.updateChanges(flag)
            },

            async triggerUpdate(){
                let str = ''
                let objectFit = ''
                str = `mutation {`

                const personal = await this.$refs.profilePersonalSettings.updateForm()
                if(personal !== ''){
                    str += personal
                }
                const company = await this.$refs.profileCompanySettings.updateForm()
                if(company !== ''){
                    str += company
                }
                str += `}`

                if(this.$refs.profileLanderDetails){
                    const details = await this.$refs.profileLanderDetails.updateForm()

                    if(details !== ''){
                        objectFit = details
                    }
                }

                const object = {
                    str: str,
                    details: objectFit,
                }

                if(!this.personalSettingsChanged) {
                  this.activetab = 1
                  return object
                }

                if(!this.companySettingsChanged) {
                  this.activetab = 3
                  return object
                }

                if(!this.profileSettingsChanged) {
                  this.activetab = 4
                  return object
                }
                return object
            },

            activeTabChange() {
                this.$emit('onTabChange')
            },
        },
    })
</script>

<style lang="scss" scoped>
    .profile-tabs-holder {
        width: 100%;

         @include mq($lap-xs + 1, min) {
            flex: 0 0 71.2%;
            max-width: 71.2%;
        }
    }

    .profile-tabs {
        background-color: $white;
        border-radius: 15px;
        padding: 28px 31px 106px;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            height: 55px;
            width: 100%;
            border-radius: 0 0 15px 15px;
            background: linear-gradient(to top, rgba(255,255,255,1) 0%,rgba(255,255,255,1) 5%,rgba(255,255,255,1) 32%,rgba(255,255,255,0.33) 67%,rgba(255,255,255,0) 84%);
            pointer-events: none;
        }

        @include mq($lap-l) {
            // height: calc(100vh - 262px);
        }

        @include mq($lap-xs) {
            height: auto;
            padding: 25px 25px 40px;
        }

        @include mq($lg) {
            &::after {
                display: none;
            }
        }

        @include mq($md) {
            padding: 25px 15px 35px;
        }
    }

    .profile-tabs__list {
        display: flex;
        align-items: stretch;
        border-bottom: 1px solid #f0f7f7;
        margin-bottom: 50px;

        @include mq($lg) {
            flex-wrap: wrap;
            margin-bottom: 30px;
        }
    }

    .profile-tabs__list-item {
        margin-right: 80px;

        &:last-of-type {
            margin-right: 0;
        }

        @include mq($lap-l) {
            margin-right: 60px;
        }

        @include mq($lap-small) {
            margin-right: 35px;
            flex-grow: 1;
        }

        @include mq($lg) {
            width: 50%;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
        }

        @include mq($sm) {

        }
    }

    .profile-tabs__list-item-inner {
        font-family: $font-second;
        font-size: 18px;
        color: $santas-gray;
        font-weight: 400;
        letter-spacing: 0.09px;
        line-height: 1.2;
        padding-bottom: 30px;
        cursor: pointer;
        transition: $dur $ease;
        position: relative;
        display: inline-block;

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            height: 0;
            width: 100%;
            background-color: $yellow-orange;
            transition: $dur $ease;
            opacity: 0;
        }

        @include hover {
            color: $shark;
        }

        &.active {
            color: $shark;

            &::after {
                height: 4px;
                opacity: 1;
            }
        }


        @include mq($lap-l) {
            font-size: 17px;
        }

        @include mq($lap-small) {
            font-size: 16px;
        }

        @include mq($lg) {
            margin: 0;
            text-align: center;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }

        @include mq($sm) {
            font-size: 15px;
        }
    }
</style>
