
import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/store/modules/User'
import Lender from '@/store/modules/lender/LenderProfile'
import Broker from '@/store/modules/broker/BrokerProfile'
import Subscription from '@/store/modules/broker/BrokerSubscription'
import Profile from '@/store/modules/Profile'
import CreateDeal from '@/store/modules/broker/CreateDeal'
import CreateQuote from '@/store/modules/lender/CreateQuote'
import FilterDeal from '@/store/modules/FilterDeals'
import FilterQuotes from '@/store/modules/FilterQuotes'
import ManageTable from '@/store/modules/table/ManageTable'
import Chat from '@/store/modules/Chat'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
	modules: {
		Profile: Profile,
		User: User,
		Lender: Lender,
		Broker: Broker,
		CreateDeal: CreateDeal,
		CreateQuote: CreateQuote,
		FilterDeal: FilterDeal,
		FilterQuotes: FilterQuotes,
		ManageTable: ManageTable,
    Chat: Chat,
    Subscription: Subscription,
	},
	strict: debug,
	plugins: debug? [createLogger()] : [],
})

export default store