import FilterDeals from '@/services/graphql/FilterDeals'
import {changeData} from '@/config/util'

/**
 * @author Nikola Popov
 * Vuex store Deals 
 * 
 */

export default{
	namespaced: false,
	state: {
        dealsBroker: null,
        dealsBrokerPagination: null,
        dealsDraftBroker: null,
        dealsDraftBrokerPagination: null,
        dealsLender: null,
        dealsLenderPagination: null,
        savedDeals: null,
        editDeal: null,
        savedDealsPagination: null,
        archivedDeals: null,
        archivedDealsPagination: null,
        deal: null,
        dealQuotes: null,
        dealSheet: null,
        quoteStatus: false,
        dealSheetStatus: false,
        is_skipped: false,
        finished_at_individual: '',
        sort: 'GENERAL',
        by: 'DESC',
        propertyType: [],
        search: '',
        filterName: 'GENERAL',
        loanSize: [0, 200000000],
        assetTypes: [],
        context: 'GENERAL',
        loanSizeApply: false,
        acceptedDealRedirect: false,
        dealDoesntExist: false,

        personalSettingsChange: true,
        companySettingsChange: true,
        profileSettingsChange: true,

        quotedStatus: false,
	},
	mutations: {
        SET_LOAN_SIZE_APPLY(state, data): void{
            state.loanSizeApply = data
        },
        SET_DEALS_LENDER_SAVED_PAGINATION(state, data): void{
            state.savedDealsPagination = data
        },
        SET_DEALS_LENDER_SAVED(state, data): void{
            if(state.savedDeals === null) {
                state.savedDeals = data
            } else {
                const arr = []
                data.forEach(row => {
                    const id = row.id
                    const ele = state.savedDeals.filter(element => element.id === id)
                    if(ele.length === 0) {
                        arr.push(row)
                    }
                })
                state.savedDeals = state.savedDeals.concat(arr)
            }
        },
        SET_DEALS_BROKER_SEARCH(state, data): void{
            state.search = data
        },
        SET_DEALS_LENDER_ARCHIVED(state, data): void{
            if(state.archivedDeals === null) {
                state.archivedDeals = data
            } else {
                state.archivedDeals = state.archivedDeals.concat(data)
            }
        },
        SET_DEALS_LENDER_ARCHIVED_PAGINATION(state, data): void{
            state.archivedDealsPagination = data
        },
        SET_DEALS_LENDER(state, data): void{
            if(state.dealsLender === null) {
                state.dealsLender = data
            } else {
                state.dealsLender = state.dealsLender.concat(data)
            }
        },
        CHANGE_DEAL_QUOTED(state, id) {
            if(state.dealsLender) {
                state.dealsLender.forEach(element => {
                    if(element.id === id) {
                        element.quoted = true
                    }
                })
            }
        },
        SET_DEALS_LENDER_PAGINATION(state, data): void{
            state.dealsLenderPagination = data
        },
        SET_DEALS_LENDER_PAGINATION_TOTAL(state, data): void{
            state.dealsLenderPagination.total -= data
        },
        SET_DEALS_BROKER(state, data): void{
            if(state.dealsBroker === null) {
                state.dealsBroker = data
            } else {
                state.dealsBroker = state.dealsBroker.concat(data)
            }
        },
        SET_DEALS_BROKER_FILTER(state, data): void{
            state.dealsBroker = data
        },
        SET_DEALS_LENDER_FILTER(state, data): void{
            state.dealsLender = data
        },
        SET_DEALS_BROKER_PAGINATION(state, data): void{
            state.dealsBrokerPagination = data
        },
        SET_DEAL(state, data): void{
            data = changeData(data)
            state.deal = data
        },
        SET_FILTER_PROPERTY_TYPE(state, data): void{
            state.propertyType = data
        },
        SET_FILTER_LOAN_SIZE(state, data): void{
            state.loanSize = data
        },
        SET_DEALS_DRAFT_BROKER(state, data): void{
            if(state.dealsDraftBroker === null) {
                state.dealsDraftBroker = data
            } else {
                state.dealsDraftBroker = state.dealsDraftBroker.concat(data)
            }
        },
        SET_DEALS_DRAFT_BROKER_PAGINATION(state, data): void{
            state.dealsDraftBrokerPagination = data
        },
        REMOVE_ROW(state, data) :void {
            state[data.str] = data.arr
        },
        SET_DEAL_QUOTES(state, data) :void {
            state.dealQuotes = data
        },
        REMOVE_DEAL_QUOTES(state) :void {
            state.dealQuotes = null
        },
        REMOVE_DEAL_AND_DRAFT(state) :void {
            state.dealsBroker = null
            state.dealsBrokerPagination = null
            state.dealsDraftBroker = null
            state.dealsDraftBrokerPagination = null
        },
        REMOVE_DEAL(state) {
            state.deal = null
        },
        SET_DEAL_SHEET(state, data) :void {
            state.dealSheet = data
        },
        REMOVE_DEAL_SHEET(state) :void {
            state.dealSheet = null
        },
        SET_DEALS_BROKER_ASSET_TYPE(state, data) :void {
            state.assetTypes = data
        },
        SET_DEAL_CONTEXT(state, data) {
            state.context = data
        },
        SET_DEAL_SORT(state, data) {
            state.sort = data
        },
        SET_DEAL_BY(state, data) {
            state.by = data
        },
        RESET_FILTER(state) {
            state.dealsLender = null,
            state.sort = 'GENERAL',
            state.by = 'DESC',
            state.propertyType = [],
            state.searchTerms = '',
            state.search = '',
            state.filterName = 'PERFECT_FIT',
            state.loanSize = [0, 200000000],
            state.assetTypes = ['GENERAL'],
            state.context = 'GENERAL',
            state.loanSizeApply = false
        },
        RESET_FILTER_BROKER(state) {
            state.dealsBroker = null
            state.dealsBrokerPagination = null
            state.dealsDraftBroker = null
            state.dealsDraftBrokerPagination = null
        },
        RESET_FILTER_LENDER(state) {
            state.dealsLender = null
            state.dealsLenderPagination = null
            state.savedDeals = null
            state.savedDealsPagination = null
            state.archivedDeals = null
            state.archivedDealsPagination = null
        },
        SET_QUOTE_ACCEPTED(state, data) :void {
            let flag = false
            data.map(ele => {
                if(ele.status === 'ACCEPTED') {
                    flag = true
                } 
            })
            state.quoteStatus = flag
        },
        SET_DEAL_SHEET_STATUS(state, data) :void {
            state.dealSheetStatus = data
        },
        SET_IS_SKIPPED(state, data) {
            state.is_skipped = data
        },
        SET_INDIVIDUAL_DATE(state, data) {
            state.finished_at_individual = data
        },
        SET_DRAFT_DEAL(state) {
            state.deal.finished = false
        },
        SET_ARCHIVE_DEALS_NULL(state) {
            state.archivedDeals = null
        },
        SET_FAVORITE_DEALS_NULL(state) {
            state.savedDeals = null
        },
        ACCEPTED_DEAL_REDIRECT_CHANGE(state, data) {
            state.acceptedDealRedirect = data
        },
        DEAL_DOESNT_EXIST(state, data) {
            state.dealDoesntExist = data
        },
        SEEN_MESSAGE_DEAL_TABLE_LENDER(state, id) {
            if(state.dealsLender) {
                const index = state.dealsLender.findIndex(ele => ele.id === id)
                if(index >= 0)
                    state.dealsLender[index].messages = 0
            }

            if(state.savedDeals) {
                const index = state.savedDeals.findIndex(ele => ele.id === id)
                if(index >= 0)
                    state.savedDeals[index].messages = 0
            }

            if(state.archivedDeals) {
                const index = state.archivedDeals.findIndex(ele => ele.id === id)
                if(index >= 0)
                    state.archivedDeals[index].messages = 0
            }
        },
        SEEN_MESSAGE_DEAL_TABLE_BROKER(state, obj) {
            if(state.dealsBroker) {
                const index = state.dealsBroker.findIndex(ele => ele.id === obj.id)
                if(index >= 0)
                    state.dealsBroker[index].messages = parseInt(state.dealsBroker[index].messages) - parseInt(obj.count)
            }
        },
        SET_NEW_MESSAGE_TABLE_BROKER(state, id) {
            if(state.dealsBroker) {
                const index = state.dealsBroker.findIndex(ele => ele.id === id)
                if(index >= 0)
                    state.dealsBroker[index].messages += 1
            }
        },
        SET_NEW_MESSAGE_TABLE_LENDER(state, id) {
            if(state.dealsLender) {
                const index = state.dealsLender.findIndex(ele => ele.id === id)
                if(index >= 0)
                    state.dealsLender[index].messages += 1
            }

            if(state.savedDeals) {
                const index = state.savedDeals.findIndex(ele => ele.id === id)
                if(index >= 0)
                    state.savedDeals[index].messages += 1
            }

            if(state.archivedDeals) {
                const index = state.archivedDeals.findIndex(ele => ele.id === id)
                if(index >= 0)
                    state.archivedDeals[index].messages += 1
            }
        },

        PERSONAL_SETTINGS_CHANGED(state, data) {
            state.personalSettingsChange = data
        },

        COMPANY_SETTINGS_CHANGED(state, data) {
            state.companySettingsChange = data
        },

        PROFILE_SETTINGS_CHANGED(state, data) {
            state.profileSettingsChange = data
        },

        SET_QUOTED_STATUS(state, data) {
            state.quotedStatus = data
        },
	},
    
	actions: {
        profileSettingsChanged({commit}, data) {
            commit('PROFILE_SETTINGS_CHANGED', data)
        },
        companySettingsChanged({commit}, data) {
            commit('COMPANY_SETTINGS_CHANGED', data)
        },
        personalSettingsChanged({commit}, data) {
            commit('PERSONAL_SETTINGS_CHANGED', data)
        },
        acceptedDealRedirectChange({commit}, data) {
            commit('ACCEPTED_DEAL_REDIRECT_CHANGE', data)
        },
        dealDoesntExistChange({commit}, data) {
            commit('DEAL_DOESNT_EXIST', data)
        },
        seenMessagesDealTableLender({commit}, id) {
            commit('SEEN_MESSAGE_DEAL_TABLE_LENDER', id)
        },
        seenMessagesDealTableBroker({commit}, obj) {
            commit('SEEN_MESSAGE_DEAL_TABLE_BROKER', obj)
        },
        removeAllDeals({commit}){
            commit('REMOVE_DEAL_AND_DRAFT')
        },
        getDealsBroker({commit}, obj){
            return FilterDeals.getDealsBroker(obj).then(
                response => {
                    if(!response.data.errors){
                        if(obj.obj.context.value === 'GENERAL') {
                            commit('SET_DEALS_BROKER', response.data.data.dealsFilter.data)
                            commit('SET_DEALS_BROKER_PAGINATION', response.data.data.dealsFilter.paginatorInfo)
                            commit('SET_DEALS_BROKER_ASSET_TYPE', response.data.data.dealsFilter.assetTypes)
                        } else {
                            commit('SET_DEALS_DRAFT_BROKER', response.data.data.dealsFilter.data)
                            commit('SET_DEALS_DRAFT_BROKER_PAGINATION', response.data.data.dealsFilter.paginatorInfo)
                        }
                    }
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.resolve(error)
                },
            )
        },
        getDealsBrokerFilter({commit}, obj){
            return FilterDeals.getDealsBroker(obj).then(
                response => {
                    if(!response.data.errors){
                        commit('SET_DEALS_BROKER_FILTER', response.data.data.dealsFilter.data)
                        commit('SET_DEALS_BROKER_PAGINATION', response.data.data.dealsFilter.paginatorInfo)
                        commit('SET_DEALS_BROKER_ASSET_TYPE', response.data.data.dealsFilter.assetTypes)
                    }
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.resolve(error)
                },
            )
        },
        getDealsLender({commit}, obj){
            return FilterDeals.getDealsLender(obj).then(
                response => {
                    if(!response.data.errors){
                        if(obj.obj.context.value === 'GENERAL') {
                            commit('SET_DEALS_LENDER', response.data.data.dealsFilter.data)
                            commit('SET_DEALS_LENDER_PAGINATION', response.data.data.dealsFilter.paginatorInfo)
                            commit('SET_DEALS_BROKER_ASSET_TYPE', response.data.data.dealsFilter.assetTypes)
                        } else if (obj.obj.context.value === 'SAVED') {
                            commit('SET_DEALS_LENDER_SAVED', response.data.data.dealsFilter.data)
                            commit('SET_DEALS_LENDER_SAVED_PAGINATION', response.data.data.dealsFilter.paginatorInfo)
                        } else if (obj.obj.context.value === 'ARCHIVED') {
                            commit('SET_DEALS_LENDER_ARCHIVED', response.data.data.dealsFilter.data)
                            commit('SET_DEALS_LENDER_ARCHIVED_PAGINATION', response.data.data.dealsFilter.paginatorInfo)
                        }
                    }
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.resolve(error)
                },
            )
        },
        getDealsLenderFilter({commit}, obj){
            return FilterDeals.getDealsLender(obj).then(
                response => {
                    if(!response.data.errors){
                        commit('SET_DEALS_LENDER_FILTER', response.data.data.dealsFilter.data)
                        commit('SET_DEALS_LENDER_PAGINATION', response.data.data.dealsFilter.paginatorInfo)
                        commit('SET_DEALS_BROKER_ASSET_TYPE', response.data.data.dealsFilter.assetTypes)
                    }
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.resolve(error)
                },
            )
        },
        async getDealByIdFilter({commit}, obj){
            await commit('REMOVE_DEAL')
            await commit('REMOVE_DEAL_SHEET')
            await commit('REMOVE_DEAL_QUOTES')
            return await FilterDeals.getDealById(obj).then(
                response => {
                    if(response.data.data.dealObject.status) {
                        commit('SET_DEAL', response.data.data.dealObject.deal)
                        commit('SET_DEAL_SHEET', response.data.data.dealObject.terms)
                        commit('SET_DEAL_SHEET_STATUS', response.data.data.dealObject.termsheet_status)
                        commit('SET_IS_SKIPPED', response.data.data.dealObject.is_skipped)
                        commit('SET_INDIVIDUAL_DATE', response.data.data.dealObject.finished_at_individual)
                        commit('SET_QUOTED_STATUS', response.data.data.dealObject.quoted)
                    }
                    
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.resolve(error)
                },
            )
        },
        async getQuoteByDealFilter({commit}, obj){
            return await FilterDeals.getQuoteByDealFilter(obj).then(
                response => {
                    commit('SET_DEAL_QUOTES', response.data.data.lenderDealsIndividualQuotes)
                    commit('SET_QUOTE_ACCEPTED', response.data.data.lenderDealsIndividualQuotes.quotes)
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.resolve(error)
                },
            )
        },
        async skipDealChange({commit}, obj){
            const data = await FilterDeals.skipDealChange(obj)
            if(data.data.data.ignoreDealIndividual.status) {
                commit('SET_IS_SKIPPED', false)
            }
            return data.data.data.ignoreDealIndividual
        },
        brokerQuoteByDealId({commit}, obj){
            return FilterDeals.brokerQuoteByDealId(obj).then(
                response => {
                    commit('SET_DEAL_QUOTES', response.data.data.brokerDealsIndividual)
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.resolve(error)
                },
            )
        },
        sendToLenders(context, obj){
            return FilterDeals.sendToLenders(obj).then(
                response => {
                    return Promise.resolve(response.data.data.shareDeals)
                },
                error => { return Promise.resolve(error) },
            )
        },
        blockALenders(){
            return FilterDeals.blockALenders(/*ids*/).then(
                response => {
                    return Promise.resolve(response)
                },
                error => { return Promise.resolve(error) },
            )
        },
        deleteDeal(context, ids){
            return FilterDeals.deleteDeal(ids).then(
                response => {
                    return Promise.resolve(response.data.data.deleteDeals)
                },
                error => { return Promise.resolve(error) },
            )
        },
        saveDeal(context, ids){
            return FilterDeals.saveDeal(ids).then(
                response => {
                    return Promise.resolve(response.data.data.saveDeals)
                },
                error => { return Promise.resolve(error) },
            )
        },
        editDeal({commit}, ids){
            return FilterDeals.editDeal(ids).then(
                response => {
                    commit('SET_DRAFT_DEAL')
                    return Promise.resolve(response.data.data.DealEdit)
                },
                error => { return Promise.resolve(error) },
            )
        },
        archiveDeal(context, ids){
            return FilterDeals.archiveDeal(ids).then(
                response => {
                    return Promise.resolve(response.data.data.archiveDeals)
                },
                error => { return Promise.resolve(error) },
            )
        },
        unarchivedDeal(context, ids){
            return FilterDeals.unarchivedDeal(ids).then(
                response => {
                    return Promise.resolve(response.data.data.unarchivedDeals)
                },
                error => { return Promise.resolve(error) },
            )
        },
        unsavedDeal(context, ids){
            return FilterDeals.unsavedDeal(ids).then(
                response => {
                    return Promise.resolve(response.data.data.unsavedDeals)
                },
                error => { return Promise.resolve(error) },
            )
        },
        changeDealStatus(context, obj){
            return FilterDeals.changeDealStatus(obj).then(
                () => { console.log('changeDealStatus')},
                error => { return Promise.resolve(error) },
            )
        },
    },
    getters: {
        getDeal(state) {
            return state.deal
        },
        getFilterPropertyType(state) {
            return state.propertyType
        },
        getDealSheet(state) {
            return state.dealSheet
        },
        getQuoteStatus(state) {
            return state.quoteStatus
        },
        getDealSheetStatus(state) {
            return state.dealSheetStatus
        },
        getPersonalSettingsChanged(state) {
            return state.personalSettingsChange
        },
        getCompanySettingsChanged(state) {
            return state.companySettingsChange
        },
        getProfileSettingsChanged(state) {
            return state.profileSettingsChange
        },
    },
}