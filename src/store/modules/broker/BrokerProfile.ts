import Broker from "@/services/graphql/Broker/BrokerProfile"

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

export default {
  namespaced: false,
  state: {
    lenders: [],
    profileInfoBroker: null,
    subscription: null,
    forceDeal: false,
  },
  mutations: {
    SET_LENDER_LIST(state, data) {
      state.lenders = data
    },
    SET_PROFILE_INFO(state, data) {
      state.profileInfoBroker = data
    },
    SET_SUBSCRIPTION(state, data) {
      state.subscription = data
    },
    SET_FORCE_DEAL(state, status) {
      state.forceDeal = status
    },
  },
  actions: {
    getBrokerLender({ commit }, id) {
      return Broker.getBrokerLender(id).then((response) => {
        const lenders = response.data.data.broker.lenders
        const lendersEmail = response.data.data.broker.lender_emails
        const newArr = []
        if (lendersEmail.length > 0) {
          lendersEmail.forEach((element) => {
            const obj = {
              email: element.lender_email,
            }
            newArr.push(obj)
          })
        }
        const arr = lenders.concat(newArr)
        commit("SET_LENDER_LIST", arr)
        const profileInfoBroker = response.data.data.profileInfoBroker
        commit("SET_PROFILE_INFO", profileInfoBroker)
        return Promise.resolve(response)
      })
    },
    addLender(context, arr) {
      return Broker.addLender(arr).then((response) => {
        return Promise.resolve(response)
      })
    },
    removeLender(context, id) {
      return Broker.removeLender(id).then((response) => {
        return Promise.resolve(response)
      })
    },
    getSubscriptionPlan({ commit }) {
      return Broker.getPlan().then((response) => {
        commit("SET_SUBSCRIPTION", response.data.data.plan)
        return Promise.resolve(response)
      })
    },
    setForceDeal({ commit }, status) {
      commit("SET_FORCE_DEAL", status)
    },
  },
  getters: {
    getBrokerLenders(state) {
      return state.lenders
    },
    getProfileInfoBroker(state) {
      return state.profileInfoBroker
    },
    hasSubscription(state) {
      return state.subscription?.status === 'trialing' || state.subscription?.status === 'active'
    },
    subscriptionIsTrial(state) {
      return state.subscription?.status === 'trialing'
    },
  },
}
