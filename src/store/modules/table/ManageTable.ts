/**
 * @author Nikola Popov
 */

import ManageTable from '@/services/graphql/table/ManageTable'

export default{
	namespaced: false,
	state: {
        dealDefaultColumns: [
            {
                label: 'Address',
                field: 'location',
                type: 'String',
                sortable: false,
            },
            {
                label: 'Date posted',
                field: 'finished_at',
                sortable: false,
                type: 'date',
                dateInputFormat: 'Pp',
                dateOutputFormat: 'Pp',
            },
            {
                label: 'Property type',
                field: 'type',
                sortable: false,
            },
            {
                label: 'Deal Priorities',
                field: 'sensitivity',
                sortable: false,
            },
            {
                label: 'Quotes',
                field: 'quotes',
                sortable: false,
            },
            {
              label: 'Deal Type',
              field: 'deal_type',
              sortable: false,
          },
        ],
        dealDefault: [
            'location',
            'finished_at',
            'type',
            'sensitivity',
            'deal_type',
        ],
        dealDefaultLenderColumns: [
            {
                label: 'Address',
                field: 'location',
                sortable: false,
            },
            {
                label: 'Type',
                field: 'type',
                sortable: false,
            },
            {
                label: 'Loan amount',
                field: 'loan_amount',
                type: 'number',
                sortable: false,
            },
            {
                label: 'Loan type',
                field: 'loan_type',
                sortable: false,
            },
            {
                label: 'Deal Priorities',
                field: 'sensitivity',
                sortable: false,
            },
            {
                label: 'Quoted',
                field: 'quoted',
                sortable: false,
            },
        ],
        dealDefaultLender: [
            'location',
            'type',
            'loan_amount',
            'loan_type',
            'sensitivity',
            'quoted',
        ],
        quoteDefaultBrokerColumns: [
            {
                label: 'Address',
                field: 'location',
                sortable: false,
            },
            {
                label: 'Type',
                field: 'deal_type',
                sortable: false,
            },
            {
                label: 'Dollar amount',
                field: 'dollarAmount',
                sortable: false,
            },
            {
                label: 'Interest rate',
                field: 'interestRate',
                sortable: false,
            },
            {
                label: 'Origination fee',
                field: 'origFee',
                sortable: false,
            },
            {
                label: 'Rate term',
                field: 'rateTerm',
                sortable: false,
            },
        ],
        quoteDefaultBroker: [
            'location',
            'deal_type',
            'dollarAmount',
            'interestRate',
        ],
	},
	mutations: {
        SET_DEAL_BROKER_MANAGE(state, data) {
            state.dealDefault = data
        },
        SET_DEAL_LENDER_MANAGE(state, data) {
            state.dealDefaultLender = data
        },
        SET_QUOTE_BROKER_MANAGE(state, data) {
            state.quoteDefaultBroker = data
        },
        SET_MANAGE_TABLE(state, data) {
            state[data.title] = data.res.data.data.setManageTable.manageTable
        },
	},
	actions: {
        async getDealManageTableBroker({commit}) {
            const res = await ManageTable.getDealManageTableBroker('deals')
            if (res?.data?.data?.getManageTable?.manageTable?.length > 0) {
                commit('SET_DEAL_BROKER_MANAGE', res?.data?.data?.getManageTable?.manageTable)
            }
        },

        async getDealManageTableLender({commit}) {
            const res = await ManageTable.getDealManageTableBroker('deals')
            if(res.data.data.getManageTable.manageTable.length > 0) {
                commit('SET_DEAL_LENDER_MANAGE', res.data.data.getManageTable.manageTable)
            }
        },

        async getQuoteManageTableBroker({commit}) {
            const res = await ManageTable.getDealManageTableBroker('quotes')
            if(res.data.data.getManageTable.manageTable.length > 0) {
                commit('SET_QUOTE_BROKER_MANAGE', res.data.data.getManageTable.manageTable)
            }
        },

        async setManageTable({commit}, obj) {
            (obj.title === 'quoteDefaultBroker' || obj.title === 'quoteDefaultLender')
                ? obj.flag = 'quotes'
                : obj.flag = 'deals'
            const res = await ManageTable.setManageTable(obj)
            obj.res = res
            commit('SET_MANAGE_TABLE', obj)
        },
    },
    getters: {
        dealDefault(state) {
            return state.dealDefault
        },
        dealDefaultColumns(state) {
            return state.dealDefaultColumns
        },
        dealDefaultLender(state) {
            return state.dealDefaultLender
        },
        dealDefaultLenderColumns(state) {
            return state.dealDefaultLenderColumns
        },
        quoteDefaultBroker(state) {
            return state.quoteDefaultBroker
        },
        quoteDefaultBrokerColumns(state) {
            return state.quoteDefaultBrokerColumns
        },
    },
}