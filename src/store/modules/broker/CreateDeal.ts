import CreateDeal from '@/services/graphql/Broker/CreateDeal'
import Deal from '@/services/Deal'
import {changeData} from '@/config/util'
//import State from 'vue-slider-component/typings/utils/state';
/* eslint-disable */

/**
 * @author Nikola Popov
 * Vuex store broker deal
 */

export default {
	namespaced: false,
	state: {
	    UI: {
	        overlay: true
        },
        finished: null,
        finishApproved: false,
        proportyInfo: null,
        sponsor: null,
        loan_type: null,
        purchase: null,
        id: null,
        construction: null,
        propertyType: null,
        sidebar: {
            state: [], // [obj]
            history: [], // [ref]; ref = string
        },
        investment: null,
        propertyIncam: null,
        refinance: null,
        expenses: null,
        existing: null,
        type_construction: null,
        owner: null,
        sensitivity: null,
        block_and_lot: null,
        sponsorNames: [],
        draftLink: false,
        show_address_purchase: '',
        type_of_loans: []
	},
	mutations: {
        SET_DRAFT_LINK(state, data) {
            state.draftLink = data;
        },
        SET_FINISHED(state, data) {
            state.finished = data
        },
        SET_FINISH_APPROVED(state, data) {
            state.finishApproved = data
        },
        SET_SPONSOR_ARR(state, data){
            state.sponsorNames.push(data);
        },
        REMOVE_SPONSOR_ARR(state, index){
            state.sponsorNames.splice(index, 1);
        },
        SET_VALUE_SPONSOR_ARR(state, obj){
            state.sponsorNames[obj.index][obj.prop] = obj.val;
        },
        SET_PROPERTY_INFO(state, data){
            data = changeData(data);
            state.proportyInfo = data;
        },
        SET_PURCHASE(state, data){
            data = changeData(data);
            state.purchase = data;
        },
        SET_LOAN_TYPE(state, data){
            data = changeData(data);
            state.loan_type = data;
        },
        SET_SHOW_ADDRESS(state, data){
            state.show_address_purchase = data;
        },
        SET_SPONSOR(state, data){
            data = changeData(data);
            state.sponsorNames = data.sponsorInfo;
            state.sponsor = data;
        },
        SET_DEAL_ID(state, data){
            state.id = data;
        },
        SET_CONSTRUCTION(state, data){
            data = changeData(data);
            state.construction = data;
        },
        SET_PROPERTY_TYPE(state, data){
            data = changeData(data);
            state.propertyType = data;
        },
        SET_SIDEBAR_STATE(state, data){
            state.sidebar = data
        },
        SET_SIDEBAR_LIST(state, data){
            state.sidebar.state = data
        },
        PUSH_SIDEBAR_HISTORY(state, str_ref) {
            if(!state.sidebar.history.includes(str_ref)) {
                state.sidebar.history.push(str_ref);
            }
        },
        POP_SIDEBAR_HISTORY(state) {
            state.sidebar.history.pop()
        },
        SET_UI_OVERLAY(state, data) {
            data = changeData(data);
            state.UI.overlay = data
        },
        SET_INVESTMENT(state, data){
            data = changeData(data);
            state.investment = data;
        },
        SET_PROPERTY_INCAM(state, data){
            data = changeData(data);
            state.propertyIncam = data;
        },
        SET_REFINANCE(state, data){
            data = changeData(data);
            state.refinance = data;
        },
        SET_PROPERTY_EXPENSES(state, data){
            data = changeData(data);
            state.expenses = data;
        },
        SET_EXISTING(state, data){
            data = changeData(data);
            state.existing = data;
            // state.propertyType = data.propertyType;
        },
        SET_TYPE_CONSTRUCTION(state, data){
            data = changeData(data);
            state.type_construction = data;
        },
        SET_OWNER(state, data){
            data = changeData(data);
            state.owner = data;
        },
        SET_SENSITIVITY(state, data){
            data = changeData(data);
            state.sensitivity = data;
        },
        SET_BLOCK_LOT(state, data){
            data = changeData(data);
            state.block_and_lot = data;
        },
        SET_SIDEBAR_HISTORY(state, data){
            state.sidebar.history = data;
        },
        SET_TYPE_OF_LOANS(state, data){
            state.type_of_loans = data;
        },
        REMOVE_CMBS(state, index){
            state.type_of_loans.splice(index, 1);
        },
        REMOVE_DEAL(state) {
            state.proportyInfo = null;
            state.sponsor = null;
            state.sponsorNames = [];
            state.loan_type = null;
            state.purchase = null;
            state.id = null;
            state.investment = null;
            state.propertyIncam = null;
            state.refinance = null;
            state.expenses = null;
            state.existing = null;
            state.type_construction = null;
            state.construction = null;
            state.owner = null;
            state.sensitivity = null;
            state.block_and_lot = null;
            state.sidebar.history = [];
            state.propertyType = null;
            state.show_address_purchase = '';
            state.type_of_loans = [];
        }
    },
	actions: {
	    resetFirstStep({commit}) {
            commit('SET_BLOCK_LOT', null);
            commit('SET_PROPERTY_INFO', null);
            commit('SET_DEAL_ID', null);
            commit('SET_PROPERTY_TYPE', null);
        },
        /**
         * @author Nikola Popov
         * @description send proporty information
         * @param obj Form object
         */
        setBrokerDealInfo({commit, state}, obj){
            return CreateDeal.setBrokerDealInfo(obj).then(
                response => {
                    if(!response.data.errors){
                        response.data.data.deal.location.block = response.data.data.deal.block_and_lot.block;
                        response.data.data.deal.location.lot = response.data.data.deal.block_and_lot.lot;
                        response.data.data.deal.location.blockAndLot = response.data.data.deal.block_and_lot.blockAndLot;

                        commit('SET_BLOCK_LOT', response.data.data.deal.block_and_lot);
                        commit('SET_PROPERTY_INFO', response.data.data.deal.location);
                        commit('SET_DEAL_ID', response.data.data.deal.id);
                        commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                    }
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        /**
         * @author Nikola Popov
         * @description send Loan Type
         * @param obj Form object
         */
        setBrokerDealLoanType({commit, state}, obj){
            obj.id = state.id;
            return CreateDeal.setBrokerDealLoanType(obj).then(
                response => {
                    if(!response.data.errors){
                        commit('SET_LOAN_TYPE', response.data.data.deal.loan_type);
                        commit('SET_SHOW_ADDRESS', response.data.data.deal.show_address_purchase);
                        commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                    }
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        /**
         * @author Nikola Popov
         * @description send sponsor
         * @param obj Form object
         */
        setBrokerSponsor({commit, state}, obj){
            obj.id = state.id;
            return CreateDeal.setBrokerSponsor(obj).then(
                response => {
                    if(!response.data.errors){
                        commit('SET_SPONSOR', response.data.data.deal.sponsor);
                        commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                    }
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        /**
         * @author Nikola Popov
         * @description send Purchase
         * @param obj Form object
         */
        setBrokerDealPurchase({commit, state}, obj){
            obj.id = state.id;
            return CreateDeal.setBrokerDealPurchase(obj).then(
                response => {
                    if(!response.data.errors){
                        commit('SET_PURCHASE', response.data.data.deal.purchase_loan);
                        commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                    }
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        /**
         * @author Nikola Popov
         * @description send construction
         * @param obj Form object
         */
        setBrokerDealConstruction({commit, state}, obj){
            obj.id = state.id;
            return CreateDeal.setBrokerDealConstruction(obj).then(
                response => {
                    if(!response.data.errors){
                        commit('SET_CONSTRUCTION', response.data.data.deal.construction_loan);
                        commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                    }
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        /**
         * @author Nikola Popov
         * @description send property type
         * @param obj Form object
         */
        setBrokerDealPropertyType({commit, state}, obj){
            obj.id = state.id;
            return CreateDeal.setBrokerDealPropertyType(obj).then(
                response => {
                    if(!response.data.errors){
                        commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                        commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                    }
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        /**
         * @author Nikola Popov
         * @description send investment
         * @param obj Form object
         */
        setBrokerDealInvestment({commit, state}, obj){
            obj.id = state.id;
            return CreateDeal.setBrokerDealInvestment(obj).then(
                response => {
                    if(!response.data.errors){

                        commit('SET_INVESTMENT', response.data.data.deal.investment_details);
                        commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                    }
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        /**
         * @author Nikola Popov
         * @description send investment
         * @param arr table array
         */
        setBrokerDealPropertyIncome({commit, state}, obj){
            return CreateDeal.setBrokerDealPropertyIncome({id: state.id, form: obj}).then(
                response => {
                    if(!response.data.errors){
                        commit('SET_PROPERTY_INCAM', response.data.data.deal.rent_roll);
                        commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                    }
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        /**
         * @author Nikola Popov
         * @description send Refinance
         * @param obj object
         */
        setBrokerDealRefinance({commit, state}, obj){
            obj.id = state.id;
            return CreateDeal.setBrokerDealRefinance(obj).then(
                response => {
                    if(!response.data.errors){
                        commit('SET_REFINANCE', response.data.data.deal.refinance_loan);
                        commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                    }
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        /**
         * @author Nikola Popov
         * @description send Property expenses
         * @param obj object
         */
        setBrokerDealPropertyExpenses({commit, state}, obj){
            obj.id = state.id;
            return CreateDeal.setBrokerDealPropertyExpenses(obj).then(
                response => {
                    if(!response.data.errors){
                        commit('SET_PROPERTY_EXPENSES', response.data.data.deal.expenses);
                        commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                    }
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        /**
         * @author Nikola Popov
         * @description send Loan Existing
         * @param obj object
         */
        setBrokerDealLoanExisting({commit, state}, obj){
            obj.id = state.id;
            return CreateDeal.setBrokerDealLoanExisting(obj).then(
                response => {
                    if(!response.data.errors){
                        commit('SET_EXISTING', response.data.data.deal.existing);
                        commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                    }
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        /**
         * @author Nikola Popov
         * @description send Construction
         * @param obj object
         */
        setBrokerDealPropertyTypeConstruction({commit, state}, obj){
            obj.id = state.id;
            return CreateDeal.setBrokerDealPropertyTypeConstruction(obj).then(
                response => {
                    // if(!response.data.errors){
                    //     commit('SET_TYPE_CONSTRUCTION', response.data.data.deal.construction);
                    //     commit('SET_INVESTMENT', response.data.data.deal.investment_details);
                    //     commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                    // }
                    // return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        /**
         * @author Nikola Popov
         * @description send Owner
         * @param obj object
         */
        setBrokerDealOwner({commit, state}, obj){
            obj.id = state.id;
            return CreateDeal.setBrokerDealOwner(obj).then(
                response => {
                    if(!response.data.errors){
                        commit('SET_OWNER', response.data.data.deal.owner_occupied);
                        commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                    }
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        /**
         * @author Nikola Popov
         * @description send Sensitivity
         * @param obj object
         */
        setBrokerDealLevelSensitivity({commit, state}, obj){
            obj.id = state.id;
            return CreateDeal.setBrokerDealLevelSensitivity(obj).then(
                response => {
                    if(!response.data.errors){
                        commit('SET_SENSITIVITY', response.data.data.deal.sensitivity);
                        commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                        commit('SET_TYPE_OF_LOANS', response.data.data.deal.type_of_loans);
                    }
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        /**
         * @author Nikola Popov
         * @description set finished deal
         */
        setBrokerFinish({ commit, state }, force) {
            return CreateDeal.setBrokerFinish({id: state.id}, force).then(
                response => {
                    return Promise.resolve(response);
                },
                error => { return Promise.reject(error); }
            );
        },

        removeDealFinish({commit}) {
            commit('REMOVE_DEAL');
        },


        removeCMBS({commit}, index) {
            commit('REMOVE_CMBS', index);
        },

        /**
         * @author Nikola Popov
         * @description get Deal By Id
         * @param obj id
         */
        getDealById({commit}, obj){
            return CreateDeal.getDealById(obj).then(
                response => {
                    if(response.data.errors) {
                        return Promise.resolve(response);
                    } else {
                        commit('SET_FINISHED', response.data.data.deal.finished);
                        commit('SET_FINISH_APPROVED', response.data.data.deal.finishApproved);
                        commit('SET_BLOCK_LOT', response.data.data.deal.block_and_lot);
                        commit('SET_LOAN_TYPE', response.data.data.deal.loan_type);
                        commit('SET_SHOW_ADDRESS', response.data.data.deal.show_address_purchase);
                        commit('SET_SPONSOR', response.data.data.deal.sponsor);
                        commit('SET_PURCHASE', response.data.data.deal.purchase_loan);
                        commit('SET_CONSTRUCTION', response.data.data.deal.construction_loan);
                        commit('SET_PROPERTY_TYPE', response.data.data.deal.property_type);
                        commit('SET_INVESTMENT', response.data.data.deal.investment_details);
                        commit('SET_PROPERTY_INCAM', response.data.data.deal.rent_roll);
                        commit('SET_REFINANCE', response.data.data.deal.refinance_loan);
                        commit('SET_PROPERTY_EXPENSES', response.data.data.deal.expenses);
                        commit('SET_EXISTING', response.data.data.deal.existing);
                        commit('SET_TYPE_CONSTRUCTION', response.data.data.deal.construction);
                        commit('SET_OWNER', response.data.data.deal.owner_occupied);
                        commit('SET_SENSITIVITY', response.data.data.deal.sensitivity);
                        commit('SET_PROPERTY_INFO', response.data.data.deal.location);
                        commit('SET_DEAL_ID', response.data.data.deal.id);
                        commit('SET_TYPE_OF_LOANS', response.data.data.deal.type_of_loans);
                        if(response.data.data.deal.lastStepStatus != '') {
                            commit('SET_SIDEBAR_STATE', JSON.parse(response.data.data.deal.lastStepStatus));
                        }
                        return Promise.resolve(response);
                    }
                },
                error => { return Promise.reject(error); }
            );
        },

        /**
         * @author Vladislav Mosnak
         * @description commit, state, obj => commit(SET_SIDEBAR_LIST || PUSH_SIDEBAR_HISTORY || POP_SIDEBAR_HISTORY)
         */
        sidebar({commit, state}, mutatedElement = null){
            const sidebarChoices = {
                loan_type: state.loan_type,
                propertyType: state.propertyType
            }

            const updatedList = Deal.sidebar.replaceElement(mutatedElement, sidebarChoices)
            commit('SET_SIDEBAR_LIST', updatedList)

            if(mutatedElement.prevRef && mutatedElement.prevRef != 'prev') {
                const prevRef =  mutatedElement.prevRef
                commit('PUSH_SIDEBAR_HISTORY', prevRef)
            }

            if(mutatedElement.prevRef === 'prev'){
                commit('POP_SIDEBAR_HISTORY', {})
            }

            if(mutatedElement.openSidebar === undefined) {
                const history = state.sidebar.history;
                if(history.length !== 0) {
                    if(mutatedElement.reference !== history[history.length - 1]) {
                        const index = history.findIndex(ele => ele === mutatedElement.reference);
                        if(index > -1) {
                            history.length = index;
                        }
                    }
                    commit('SET_SIDEBAR_HISTORY', history);
                }
            }

            return CreateDeal.setLastStepStatus({
                id: state.id,
                status: state.sidebar
            })

        },
        /**
         * @author Vladislav Mosnak
         * @description commit, state, obj => commit(SET_UI_OVERLAY)
         */
        ui({commit, state}, obj) {
            commit('SET_UI_OVERLAY', obj.overlay)
        }

    },
    getters: {
        getBlockAndLot(state){
            return state.block_and_lot;
        },
        getProportyInfo(state){
            return state.proportyInfo;
        },
        getPurchase(state){
            return state.purchase;
        },
        getSponsor(state){
            return state.sponsor;
        },
        getId(state){
            return state.id;
        },
        getLoanType(state) {
            return state.loan_type;
        },
        getShowAddressPurchaseState(state) {
            return state.show_address_purchase;
        },
        getConstruction(state) {
            return state.construction;
        },
        getPropertyType(state) {
            return state.propertyType;
        },
        getSidebar(state) {
            return state.sidebar.state;
        },
        sidebarHistory(state) {
            return state.sidebar.history
        },
        getFinishedStatus(state) {
          return state.finished
        },
        overlay(state) {
          return state.UI.overlay
        },
        getInvestment(state) {
            return state.investment;
        },
        getPropertyIncam(state) {
            return state.propertyIncam;
        },
        getRefinance(state) {
            return state.refinance;
        },
        getExpenses(state) {
            return state.expenses;
        },
        getExisting(state) {
            return state.existing;
        },
        getTypeConstruction(state) {
            return state.type_construction;
        },
        getOwner(state) {
            return state.owner;
        },
        getSensitivity(state) {
            return state.sensitivity;
        },
        getSonsorNames(state) {
            return state.sponsorNames;
        },
        getFinishApproved(state) {
            return state.finishApproved
        },
        getTypeOfLoans(state) {
            return state.type_of_loans
        }
    }
};