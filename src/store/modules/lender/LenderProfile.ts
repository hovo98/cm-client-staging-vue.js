import Lender from '@/services/graphql/Lender/LenderProfile'

/**
 * @author Nikola Popov
 * Vuex store Lender 
 * 
 * @action 
 *  getLenderProfileData
 *  setMetaFieldForLender
 * @getters
 *  getLenderProfile
 * @mutation
 *  
 */

export default{
	namespaced: false,
	state: {
        metas: null,
        details: null,
        signupIncomplete: null,
        // loanSizeSettings: null,
        tempToken: localStorage.getItem('tempToken') || '',
        type_of_loan: null,
	},
	mutations: {
        SET_PROFILE_METAS(state, data): void{
            state.metas = data
        },
        CHANGE_META_FIELD(state, obj): void{
            state.metas.biography = obj.biography
            state.metas.specialty = obj.specialty
            state.metas.linkedin_url = obj.linkedin_url
        },
        SET_DETAILS(state, data): void{
            state.details = data
        },
        SET_SIGNUP_INCOMPLETE(state, bool): void {
            state.signupIncomplete = bool
        },
        SET_TEMP_TOKEN(state, token): void {
            state.tempToken = token
        },
        SET_LOAN_AFTER_SUBMIT(state, arr): void {
            state.type_of_loan = arr
        },
        // setLoanSizeSettings(state, data) {
        //     state.loanSizeSettings = {
        //         min: data.loan_size_min ? data.loan_size_min : 100000,
        //         max: data.loan_size_max ? data.loan_size_max : 100000000,
        //         step: data.loan_size_step ? data.loan_size_step : 100000
        //     };
        // }
	},
	actions: {
        async activeQuote(context, token) {
            
            const res = await Lender.activeQuote(token)
            return res
        },
        async chooseQuote(context, token) {
            const res = await Lender.chooseQuote(token)
            return res
        },
        getLenderProfileData({commit}){
            return Lender.getLenderProfileData().then(
                response => {
                    if(response.data.data){
                        commit('SET_PROFILE_METAS', response.data.data.getProfileInfoLender)
                        commit('SET_DETAILS', response.data.data.getFit)
                        //commit('setLoanSizeSettings', response.data.data.getLoanSize);
                    }
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.reject(error)
                },
            )
        },
        setMetaFieldForLender({commit}, obj){
            return Lender.setMetaFieldForLender(obj).then(
                response => {
                    if(response.data.data.setProfileInfoLender)
                        commit('CHANGE_META_FIELD', obj)
                },
            )
        },
        // fetchLoanSizeSettings({commit}) {
        //     return Settings.loanSize().then(response => {
        //         commit('setLoanSizeSettings', response.data.data.getLoanSize);
        //     });
        // }
    },
    getters: {
        getLenderMetas(state) {
            return state.metas
        },
        getDetails(state){
            return JSON.parse(JSON.stringify(state.details))
        },
        isSignupIncomplete(state) {
            return state.signupIncomplete
        },
        // getLoanSizeSettings(state) {
        //     return state.loanSizeSettings;
        // },
        getTempToken(state) {
            return state.tempToken
        },
        getLoanTemp(state) {
            return state.type_of_loan
        },
    },
}