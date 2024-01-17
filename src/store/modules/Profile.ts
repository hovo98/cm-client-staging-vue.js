import Profile from '@/services/graphql/Profile'

/**
 * @author Nikola Popov
 * Vuex store Broker
 *
 * @action
 *  getBrokerProfileData
 *  setMetaFieldForBroker
 * @getters
 *  getBrokerProfile
 * @mutation
 *
 */

export default{
	namespaced: false,
	state: {
        personalSettings: null,
        companySettings: null,
        updateForm: {},
        verify: true,
        profile: null,
        image: '',
        company_logo_url: '',
        active_tab: false,
        ifTimeZoneChange: false,
	},
	mutations: {
        CHANGE_TIME_ZONE(state, data) {
            state.ifTimeZoneChange = data
        },
        SET_PROFILE(state, data): void{
            state.profile = data
        },
        SET_PROFILE_IMAGE(state, data): void{
            (data === 'There is no image.')
                ? state.image = ''
                : state.image = data
        },
        UPDATE_PROFILE_IMAGE(state, data): void{
            state.image = data
        },
        SET_PERSONAL_SETTINGS(state, data): void{
            state.personalSettings = data
        },
        SET_COMPANY_SETTINGS(state, data): void{
            state.companySettings = data
        },
        SET_VERIFY(state, data): void{
            if(data === null){
                state.verify = false
            }
        },
        SET_COMPANY_LOGO(state, data): void{
            (data === 'There is no image.')
                ? state.company_logo_url = ''
                : state.company_logo_url = data
        },
        UPDATE_COMPANY_LOGO(state, data): void{
            state.company_logo_url = data
        },
        SET_ACTIVE_TAB(state, data): void{
            state.active_tab = data
        },
	},
	actions: {
        getProfileData({commit}, obj){
            return Profile.getProfileData(obj).then(
                response => {
                    if(response.data.data){
                        commit('SET_PROFILE', response.data.data)
                        commit('SET_PERSONAL_SETTINGS', response.data.data[obj.role])
                        commit('SET_COMPANY_SETTINGS', response?.data?.data?.getCompany?.company_data)
                        commit('SET_VERIFY', response.data.data[obj.role]?.email_verified_at)
                        if(response.data.data.broker) {
                            commit('SET_COMPANY_LOGO', response.data.data.getCompanyLogo.company_logo_url)
                        }
                    }
                    return Promise.resolve(response)
                },
                error => { return Promise.reject(error) },
            )
        },
        getProfileImage({commit}){
            return Profile.getProfileImage().then(
                response => {
                    if(response?.data?.data){
                        commit('SET_PROFILE_IMAGE', response?.data?.data?.getProfileImage?.image)
                    }
                    return Promise.resolve(response)
                },
                error => { return Promise.reject(error) },
            )
        },
        updateProfileImage({commit}, file){
            return Profile.updateProfileImage(file).then(
                response => {
                    commit('SET_PROFILE_IMAGE', response.data.data.updateProfileImage.image)
                },
            )
        },
        deleteProfileImage() {
            return Profile.deleteProfileImage().then(() => {
                this.commit('UPDATE_PROFILE_IMAGE', '')
            })
        },
        updateCompanyLogo({commit}, file){
            return Profile.updateCompanyLogo(file).then(
                response => {
                    commit('SET_COMPANY_LOGO', response.data.data.updateCompanyLogo.company_logo_url)
                },
            )
        },
        deleteCompanyLogo() {
            return Profile.deleteCompanyLogo().then(() => {
                this.commit('UPDATE_COMPANY_LOGO', '')
            })
        },
        updateProfile(context, str){
            return Profile.updateProfile(str).then(
                response => { return Promise.resolve(response) },
                error => { return Promise.reject(error) },
            )
        },
        sendVerifyEmailFromDashboard(){
            return Profile.sendVerifyEmailFromDashboard().then(
                response => { return Promise.resolve(response) },
                error => { return Promise.reject(error) },
            )
        },
        sendInvitationEmail(context,obj){
            return Profile.sendInvitationEmail(obj).then(
                response => { return Promise.resolve(response) },
                error => { return Promise.reject(error) },
            )
        },
    },
    getters: {
        getTimeZoneChange(state) {
            return state.ifTimeZoneChange
        },
        getLenderProfile(state) {
            return state.profile
        },
        getProfileImage(state) {
            return state.image
        },
        getPersonalSettings(state) {
            return state.personalSettings
        },
        getCompanySettings(state) {
            return state.companySettings
        },
        getIfVerify(state){
            return state.verify
        },
        getCompanyLogo(state) {
            return state.company_logo_url
        },
        getActiveTab(state) {
            return state.active_tab
        },
    },
}