import $store from '@/store'
// import User from '@/services/graphql/User';
window.Pusher = require('pusher-js')
// const push = require('pusher-js');

class Pusher {
    constructor() {
        this.location = 'chat'
        this.init()
    }

    init() {
      window.Pusher.logToConsole = true
      if (!process.env.VUE_APP_PUSHER_KEY) {
        return
      }
        const pusher = new window.Pusher(process.env.VUE_APP_PUSHER_KEY, {
            cluster: process.env.VUE_APP_PUSHER_CLUSTER || 'mt1',
        })
        const userId = $store.getters.getUserId
        const channel = pusher.subscribe(process.env.VUE_APP_PUSHER_CHANNEL+userId.toString())

        channel.bind('MessageSent', function(data) {
            $store.dispatch('setMsgFromPusher', data)
        })

        channel.bind('FirstMessageSent', function(data) {
            $store.dispatch('firstMessageSentLender', data)
        })

        const betaChannel = pusher.subscribe('beta-user')
        betaChannel.bind('BetaUser', function(data) {
            if (Number(userId) === data.user_id) {
                $store.dispatch('logout').then(() => {
                    localStorage.removeItem('auth')
                    localStorage.removeItem('chatbot')
                    window.location.href = '/login'
                })
            }
        })
    }
}

export default Pusher
