import Subscriptions from "@/services/graphql/Broker/BrokerSubscription"

export default {
  namespaced: false,
  state: {
    subscriptions: [],
  },
  mutations: {
    SET_SUBSCRIPTIONS(state, data) {
      state.lenders = data
    },
  },
  actions: {
    getSubscriptions({ commit }) {
      return Subscriptions.getSubscriptions().then((response) => {
        commit("SET_SUBSCRIPTIONS", response)
        return Promise.resolve(response)
      })
    },

    getSparkUrl(store, options) {
      return Subscriptions.getSparkUrl(options).then((response) => {
        return Promise.resolve(response)
      })
    },

    getOneTimePaymentLinkForQuote(store, { quote, options }) {
      return Subscriptions.getOneTimePaymentLinkForQuote(quote, options).then((response) => {
          return Promise.resolve(response)
        })
    },

    getOneTimePaymentLinkForDeal(store, { deal, options }) {
      return Subscriptions.getOneTimePaymentLinkForDeal(deal, options).then((response) => {
          return Promise.resolve(response)
        })
    },

    checkPaymentStatus(store, checkoutId) {
      return Subscriptions.checkPaymentStatus(checkoutId).then((response) => {
          return Promise.resolve(response)
        })
    },
  },
}
