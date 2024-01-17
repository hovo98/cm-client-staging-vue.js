import FilterQuotes from '@/services/graphql/FilterQuotes'
import FilterDeals from '@/services/graphql/FilterDeals'
/**
 * @author Nikola Popov
 * Vuex store Deals
 *
 */

export default{
	namespaced: false,
	state: {
        quotesBroker: null,
        lender: null,
        deal: null,
        quote: null,
        allQuotes: null,
        quotesBrokerPagination: null,
        dealSheet: null,
        dealSheetStatus: null,
        finished_at_individual: '',

        sort: 'GENERAL',
        by: 'DESC',
        search: '',
        sponsorNames: [],
        checkedSponsorNames: [],
        companyName: '',
	},
	mutations: {
        SET_QUOTE_SORT(state, data) {
            state.sort = data
        },
        SET_QUOTE_BY(state, data) {
            state.by = data
        },
        SET_QUOTE_SEARCH(state, data) {
            state.search = data
        },
        SET_QUOTES(state, data) {
            state.quotesBroker = data
        },
        SET_QUOTE(state, data) {
            state.quote = data
        },
        SET_LENDER(state, data) {
            state.lender = data
        },
        SET_DEAL(state, data) {
            state.deal = data
        },
        SET_ALL_QUOTES(state, data) {
            if(state.allQuotes === null) {
                state.allQuotes = data
            } else {
                state.allQuotes = state.allQuotes.concat(data)
            }
        },
        SET_ALL_QUOTES_FILTER(state, data) {
            state.allQuotes = data
        },
        SET_QUOTES_BROKER_PAGINATION(state, data) {
            state.quotesBrokerPagination = data
        },
        SET_DEAL_SHEET(state, data) :void {
            state.dealSheet = data
        },
        REMOVE_DEAL(state) {
            state.deal = null
        },
        REMOVE_DEAL_SHEET(state) :void {
            state.dealSheet = null
        },
        REMOVE_QUOTES_BROKER(state) :void {
            state.quotesBroker = null
        },
        REMOVE_LENDER(state) :void {
            state.lender = null
        },
        SET_SPONSOR_NAMES(state, data) :void {
            state.sponsorNames = data
        },
        SET_CHECKED_SPONSOR_NAME(state, data) :void {
            state.checkedSponsorNames = data
        },
        SET_BROKER_COMPANY_NAME(state, data) :void {
            state.companyName = data
        },
        CHANGE_QUOTE_STATUS(state, data) :void {
            state.quotesBroker.map((quote) => {
                const index = data.quotes.findIndex(
                  (ele) => ele.id === quote.id,
                )

                if(index !== -1) {
                    quote.status = data.quotes[index].status
                    quote.button = data.quotes[index].button
                }
                quote.secondAccept = data.anyQuoteAccepted
            })
        },
        SET_DEAL_SHEET_STATUS(state, data) :void {
            state.dealSheetStatus = data
        },
        SET_INDIVIDUAL_DATE(state, data) {
            state.finished_at_individual = data
        },
	},
	actions: {
        async individualQuoteBroker({commit}, obj){
            return await FilterQuotes.individualQuoteBroker(obj).then(
                response => {
                    commit('SET_QUOTES', response?.data?.data?.brokerQuotesIndividual?.quotes)
                    commit('SET_LENDER', response?.data?.data?.brokerQuotesIndividual?.lender)
                    return response
                },
                error => {
                    return error
                },
            )
        },
        async individualQuoteBrokerGetDeal({commit}, obj){
            await commit('REMOVE_DEAL')
            await commit('REMOVE_DEAL_SHEET')
            await commit('REMOVE_QUOTES_BROKER')
            await commit('REMOVE_LENDER')
            return await FilterDeals.getDealById(obj).then(
                response => {
                    commit('SET_DEAL', response.data.data.dealObject.deal)
                    commit('SET_DEAL_SHEET', response.data.data.dealObject.terms)
                    commit('SET_DEAL_SHEET_STATUS', response.data.data.dealObject.termsheet_status)
                    commit('SET_INDIVIDUAL_DATE', response.data.data.dealObject.finished_at_individual)
                    return response
                },
                error => {
                    return error
                },
            )
        },
        async individualQuoteLender({commit}, obj){
            return await FilterQuotes.individualQuoteLender(obj).then(
                response => {
                    commit('SET_QUOTE', response.data.data.lenderQuotesIndividual.quote)
                    commit('SET_BROKER_COMPANY_NAME', response.data.data.lenderQuotesIndividual.broker.companyName)
                    return response
                },
                error => {
                    return error
                },
            )
        },

        async getQuotesBroker({commit}, obj){
            return FilterQuotes.getQuotesBroker(obj).then(
                response => {
                    if(!response.data.errors){
                        commit('SET_ALL_QUOTES', response.data.data.brokerGetAllQuotes.data)
                        commit('SET_QUOTES_BROKER_PAGINATION', response.data.data.brokerGetAllQuotes.paginatorInfo)
                        commit('SET_SPONSOR_NAMES', response.data.data.brokerGetAllQuotes.sponsorNames)
                    }
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.resolve(error)
                },
            )
        },
        async getQuotesBrokerFilter({commit}, obj){
            return FilterQuotes.getQuotesBroker(obj).then(
                response => {
                    if(!response.data.errors){
                        commit('SET_ALL_QUOTES_FILTER', response.data.data.brokerGetAllQuotes.data)
                        commit('SET_QUOTES_BROKER_PAGINATION', response.data.data.brokerGetAllQuotes.paginatorInfo)
                        commit('SET_SPONSOR_NAMES', response.data.data.brokerGetAllQuotes.sponsorNames)
                    }
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.resolve(error)
                },
            )
        },
        async acceptQuoteBroker({commit}, quote){
            const data = await FilterQuotes.acceptQuote(quote)

            if (data.data?.errors?.length) {
              return data
            }

            commit('CHANGE_QUOTE_STATUS', data.data.data.setQuoteStatus)
            return data
		},
        async declineQuoteBroker({commit}, quote){
            const data = await FilterQuotes.declineQuote(quote)
            commit('CHANGE_QUOTE_STATUS', data.data.data.setQuoteStatus)
            return data
		},
    },
    getters: {

        getDealSheetStatus(state) {
            return state.dealSheetStatus
        },
    },
}
