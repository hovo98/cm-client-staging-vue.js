import Quote from '@/services/Quote'
import CreateQuote from '@/services/graphql/Lender/CreateQuote'
import {changeData} from '@/config/util'
import GlobalNot from '@/services/Notification'

/* eslint-disable */

/**
 * @author Nikola Popov
 * Vuex store broker deal
 */

export default {
	namespaced: false,
	state: {
        quoteSidebar: {
            state: {}, // [obj]
            history: [], // [ref]; ref = string
        },
        appendSidebar: false,
        offer: null,
        id: null,
        dealId: null,
        dealLoanType: null,
        dealPropertyType: null,
        pageTwo: null,
        pageThree: null,
        pageFour: null,
        info: null,
        interest: null,
        stepThree: null,
        dealForQuoteForm: null,
        quoteFinished: false,
        lastStepBtn: false,

        dealFinished: null,
	},
	mutations: {
        SET_QUOTE_SIDEBAR_HISTORY(state, data) {
            state.quoteSidebar.history = data;
        },
        SET_LAST_STEP_BTN(state) {
            state.lastStepBtn = !state.lastStepBtn;
        },
        SET_QUOTE_FINISHED(state, data) {
            state.quoteFinished = data
        },
        SET_QUOTE_ID(state, data){
            state.id = data;
        },
        SET_QUOTE_SIDEBAR_STATE(state, data){
            state.quoteSidebar = data
        },
        SET_QUOTE_SIDEBAR_LIST(state, data){
            state.quoteSidebar.state = data
        },
        PUSH_QUOTE_SIDEBAR_HISTORY(state, str_ref) {
            if(!state.quoteSidebar.history.includes(str_ref)) {
                state.quoteSidebar.history.push(str_ref);
            }
        },
        POP_QUOTE_SIDEBAR_HISTORY(state) {
            state.quoteSidebar.history.pop()
        },
        SET_APPEND_QUOTE_SIDEBAR(state, data) {
          state.appendSidebar = data
        },
        SET_LOAN_TYPE_QUOTE(state, data){
            state.dealLoanType = data;
        },
        SET_PROPERTY_TYPE_QUOTE(state, data){
            state.dealPropertyType = data;
        },
        SET_DEAL_ID_QUOTE(state, data){
            state.dealId = data;
        },
        SET_OFFER(state, data){
            data = changeData(data);
            state.offer = data;
        },
        SET_PAGE_TWO(state, data){
            data = changeData(data);
            state.pageTwo = data;
        },
        SET_PAGE_THREE(state, data){
            data = changeData(data);
            state.pageThree = data;
        },
        SET_PAGE_FOUR(state, data){
            data = changeData(data);
            state.pageFour = data;
        },
        SET_INFO(state, data){
            data = changeData(data);
            state.info = data;
        },
        SET_INTEREST(state, data){
            data = changeData(data);
            state.interest = data;
        },
        SET_QUOTE_STEP_THREE(state, data){
            data = changeData(data);
            state.stepThree = data;
        },
        SET_DEAL_FOR_QUOTE_FORM(state, data) {
            state.dealForQuoteForm = data
        },
        RESET_QUOTE(state) {
            state.pageTwo = null,
            state.pageThree = null,
            state.pageFour = null,
            state.info = null,
            state.interest = null,
            state.stepThree = null,
            state.offer = null,
            state.quoteFinished = false
        },

        SET_DEAL_FINISHED(state, data){
            state.dealFinished = data;
        },
    },
	actions: {

        setOffer({commit, state}, obj){
            return CreateQuote.setOffer(obj, state.id, state.dealId).then(
                response => {
                    if(response.data.errors) {
                        // new GlobalNot(response.data.errors[0].debugMessage, 'error');
                        // this.$router.push({ path: "/lender-deals" });
                    } else {
                        commit('SET_OFFER', response.data.data.quote.purchaseAndRefinanceLoans);
                        commit('SET_QUOTE_ID', response.data.data.quote.id);
                        return Promise.resolve(response);
                    }
                },
            );
        },

        setPageTwo({commit, state}, obj){
            return CreateQuote.setPageTwo(obj, state.id, state.dealId).then(
                response => {
                    if(response.data.errors) {
                        // new GlobalNot(response.data.errors[0].debugMessage, 'error');
                    } else {
                        commit('SET_PAGE_TWO', response.data.data.quote.purchaseAndRefinanceLoans);
                        commit('SET_QUOTE_ID', response.data.data.quote.id);
                        return Promise.resolve(response);
                    }
                },
            );
        },

        setPageThree({commit, state}, obj){
            return CreateQuote.setPageThree(obj, state.id, state.dealId).then(
                response => {
                    if(response.data.errors) {
                        // new GlobalNot(response.data.errors[0].debugMessage, 'error');
                    } else {
                        commit('SET_PAGE_THREE', response.data.data.quote.purchaseAndRefinanceLoans);
                        commit('SET_QUOTE_ID', response.data.data.quote.id);
                        return Promise.resolve(response);
                    }
                },
            );
        },

        setPageFour({commit, state}, obj){
            return CreateQuote.setPageFour(obj, state.id, state.dealId).then(
                response => {
                    if(response.data.errors) {
                        // new GlobalNot(response.data.errors[0].debugMessage, 'error');
                    } else {
                        commit('SET_PAGE_FOUR', response.data.data.quote.purchaseAndRefinanceLoans);
                        commit('SET_QUOTE_ID', response.data.data.quote.id);
                        return Promise.resolve(response);
                    }
                },
            );
        },

        setInfo({commit, state}, obj){
            return CreateQuote.setInfo(obj, state.id, state.dealId).then(
                response => {
                    if(response.data.errors) {
                        new GlobalNot(response.data.errors[0].debugMessage, 'error');
                    } else {
                        commit('SET_INFO', response.data.data.quote.constructionLoans);
                        commit('SET_QUOTE_ID', response.data.data.quote.id);
                        return Promise.resolve(response);
                    }
                },
            );
        },

        setInterest({commit, state}, obj){
            return CreateQuote.setInterest(obj, state.id, state.dealId).then(
                response => {
                    if(response.data.errors) {
                        new GlobalNot(response.data.errors[0].debugMessage, 'error');
                    } else {
                        commit('SET_INTEREST', response.data.data.quote.constructionLoans);
                        commit('SET_QUOTE_ID', response.data.data.quote.id);
                        return Promise.resolve(response);
                    }
                },
            );
        },

        setQuoteStepThree({commit, state}, obj){
            return CreateQuote.setQuoteStepThree(obj, state.id, state.dealId).then(
                response => {
                    if(response.data.errors) {
                        new GlobalNot(response.data.errors[0].debugMessage, 'error');
                    } else {
                        commit('SET_QUOTE_STEP_THREE', response.data.data.quote.constructionLoans);
                        commit('SET_QUOTE_ID', response.data.data.quote.id);
                        return Promise.resolve(response);
                    }
                },
            );
        },

        getDealByIdQuote({commit}, obj){
            return CreateQuote.getDealByIdQuote(obj).then(
                response => {
                    commit('SET_LOAN_TYPE_QUOTE', response.data.data.dealObject.deal.loan_type);
                    commit('SET_PROPERTY_TYPE_QUOTE', response.data.data.dealObject.deal.property_type);
                    commit('SET_DEAL_ID_QUOTE', response.data.data.dealObject.deal.id);
                    commit('SET_DEAL_FINISHED', response.data.data.dealObject.deal.finished);
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        getDealForCreateQuote({commit}, obj) {
            return CreateQuote.getDealForCreateQuote(obj).then(
                response => {
                    commit('SET_DEAL_FOR_QUOTE_FORM', response.data.data.getDealForCreateQuote)
                    return Promise.resolve(response.data.data.getDealForCreateQuote);
                },
                error => { return Promise.reject(error); }
            );
        },

        finishQuote({commit, state}, obj){
            return CreateQuote.finishQuote(obj, state.id, state.dealId).then(
                response => {
                    commit('CHANGE_DEAL_QUOTED', state.dealId)
                    return Promise.resolve(response);
                },
            );
        },

        quoteErrorMessage({commit, state}, obj){
            return CreateQuote.quoteErrorMessage(obj).then(
                response => {
                    return Promise.resolve(response);
                },
            );
        },

        getQuote({commit}, obj){
            return CreateQuote.getQuote(obj).then(
                response => {
                    commit('SET_QUOTE_SIDEBAR_STATE', JSON.parse(response.data.data.quoteObject.lastStepStatus));
                    commit('SET_QUOTE_STEP_THREE', response.data.data.quoteObject.constructionLoans);
                    commit('SET_OFFER', response.data.data.quoteObject.purchaseAndRefinanceLoans);
                    commit('SET_INTEREST', response.data.data.quoteObject.constructionLoans);
                    commit('SET_PAGE_FOUR', response.data.data.quoteObject.purchaseAndRefinanceLoans);
                    commit('SET_INFO', response.data.data.quoteObject.constructionLoans);
                    commit('SET_PAGE_THREE', response.data.data.quoteObject.purchaseAndRefinanceLoans);
                    commit('SET_PAGE_TWO', response.data.data.quoteObject.purchaseAndRefinanceLoans);
                    commit('SET_QUOTE_ID', response.data.data.quoteObject.id);
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        async appendQuoteSidebar({commit}, append) {
            commit('SET_APPEND_QUOTE_SIDEBAR', append);
        },

        async resetQuoteID({commit}) {
            commit('SET_QUOTE_ID', null);
            commit('RESET_QUOTE');
        },

        resetHistory({commit}) {
            commit('SET_QUOTE_SIDEBAR_HISTORY', []);
        },

        /**
         * @author Vladislav Mosnak
         * @description Generate sidebar list
         */
        quoteSidebar({commit, state}, mutatedElement = null){
            let sidebarType = ''
            if (state.dealForQuoteForm?.loan_type === 'CONSTRUCTION' && !state.appendSidebar) {
                sidebarType = 'construction'
            }
            if (state.dealForQuoteForm?.loan_type === 'CONSTRUCTION' && state.appendSidebar) {
                sidebarType = 'combined'
            }
            if (state.dealForQuoteForm?.loan_type === 'PURCHASE' ||  state.dealForQuoteForm?.loan_type === 'REFINANCE') {
                sidebarType = 'pr'
            }
            const sidebarChoices = {
                type: sidebarType,
            }

            const updatedList = Quote.sidebar.replaceElement(mutatedElement, sidebarChoices)
            if(updatedList) {
                commit('SET_QUOTE_SIDEBAR_LIST', updatedList)
            }


            if(mutatedElement.prevRef && mutatedElement.prevRef != 'prev') {
                const prevRef =  mutatedElement.prevRef
                commit('PUSH_QUOTE_SIDEBAR_HISTORY', prevRef)
            }

            if(mutatedElement.prevRef === 'prev'){
                commit('POP_QUOTE_SIDEBAR_HISTORY', {})
            }

            return CreateQuote.setLastStepStatus({
                id: state.id,
                status: state.quoteSidebar
            })
        },

    },
    getters: {
	    getQuoteSidebarAppendedStatus(state) {
	      return state.appendSidebar
        },
        getQuoteSidebar(state) {
            return state.quoteSidebar.state;
        },
        getQuoteSidebarHistory(state) {
            return state.quoteSidebar.history
        },
        getDealId(state) {
            return state.dealId;
        },
        getQuoteID(state) {
            return state.id
        },
        getDealLoanType(state) {
	        return state.dealLoanType
        },
        getDealForQuoteForm(state) {
            return state.dealForQuoteForm
        },
        getQuoteFinishedStatus(state) {
            return state.quoteFinished
        },
        getStepThree(state) {
            return state.stepThree;
        },
        getQuoteDeal(state) {
            return state.dealForQuoteForm;
        },
        getQuoteProgress(state) {
	        const sidebar = state.quoteSidebar.state
            if(Array.isArray(sidebar)) {
                const el = sidebar.filter(s => s.currentStep)[0]
                return {
                    title: el.title,
                    percentage: el.percentage
                }
            }
            return {
                title: 'Start',
                percentage: 0
            }
        }
    }
};