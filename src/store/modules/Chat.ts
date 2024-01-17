/**
 * @author Nikola Popov
 */

import Chat from '@/services/graphql/Chat'


export default{
    namespaced: false,
    state: {
        chat: null,
        chatCountNewMsg: null,
        currentChatId: null,
        lenderOpenClosedChat: null,
    },
    mutations: {
        IS_CHAT_OPENED(state, data) {
            state.lenderOpenClosedChat = data
        },
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        SET_CHAT(state, data) {
            if(data) {
                state.chat = data
            } else {
                state.chat = {
                    name: '',
                    room_id: 0,
                    messages: [],
                }
            }
        },
        RESET_CHAT(state) {
            state.chat = null
        },
        SET_CHAT_NEW_MSG_COUNT(state, data) {
            if(state.chat) {
                let num = 0
                if(data.length > 0) {
                    data.forEach(room => {
                        room.messages.forEach(msg => {
                            if(msg.role === 'lender') {
                                if(!msg.seen)
                                    num += 1
                            }
                        })
                    })
                    state.chatCountNewMsg = num
                } else {
                    state.chat.rooms.forEach(room => {
                        room.messages.forEach(msg => {
                            if(msg.role === 'lender') {
                                if(!msg.seen)
                                    num += 1
                            }
                        })
                    })
                    state.chatCountNewMsg = num
                }
            }
        },
        SET_NEW_MESSAGE_LENDER(state, data) {
            if(state.chat) {
                if(state.chat.room_id === 0) {
                    state.chat.room_id = data.room_id
                    state.chat.messages.push(data.chat)
                } else {
                    state.chat.messages.push(data.chat)
                }
            }
        },
        SET_NEW_MESSAGE_LENDER_AFTER_FAKE(state, data) {
            if(state.chat) {
                if(state.chat.room_id === 0) {
                    state.chat.room_id = data.data.room_id
                }
                const indexMsg = state.chat.messages.findIndex(msg => msg.id === data.fake)
                if(indexMsg >= 0) {
                    state.chat.messages.splice(indexMsg, 1)
                    state.chat.messages.push(data.data.chat)
                }
            }
        },
        SET_NEW_MESSAGE_BROKER(state, data) {
            if(state.chat) {
                const index = state.chat.rooms.findIndex(room => room.room_id === data.room_id)
                if(index >= 0)
                    state.chat.rooms[index].messages.push(data.chat)
            }
        },
        SET_NEW_MESSAGE_BROKER_AFTER_FAKE(state, data) {
            if(state.chat) {
                const index = state.chat.rooms.findIndex(room => room.room_id === data.data.room_id)
                if(index >= 0) {
                    const indexMsg = state.chat.rooms[index].messages.findIndex(msg => msg.id === data.fake)
                    if(indexMsg >= 0) {
                        state.chat.rooms[index].messages.splice(indexMsg, 1)
                        state.chat.rooms[index].messages.push(data.data.chat)
                    }
                } 
            }
        },
        SET_NEW_FIRST_MESSAGE_BROKER(state, data) {
            if(state.chat) {
                state.chat.rooms.push(data)
            } else {
                state.chat = {
                    rooms: [data],
                }
            }
        },
        CHANGE_SEEN_MESSAGES(state, obj) {
            state.chat.rooms[obj.index].messages.forEach(msg => {
                if(obj.arr.includes(msg.id)) {
                    msg.seen = true
                }
            })
        },
        CHANGE_SEEN_MESSAGES_LENDER(state, arr) {
            state.chat.messages.forEach(msg => {
                if(arr.includes(msg.id)) {
                    msg.seen = true
                }
            })
        },
        SET_CURRENT_CHAT(state, data) {
            state.currentChatId = data
        },
        SET_BROKER_FIRST_CHAT(state, obj) {
            (state.chat)
                ? state.chat.rooms.push(obj)
                : state.chat.rooms = [obj]
        },
    },
    actions: {
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        async initialChatLender({commit}, dealId) {
            const res = await Chat.initialChatLender(dealId)
            commit('SET_CHAT', res.data.data.chatLender)
            if(res.data.data.chatLender)
                commit('SET_CURRENT_CHAT', res.data.data.chatLender.room_id)
            return res
        },

        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        async initialChatBroker({commit}, dealId) {
            const res = await Chat.initialChatBroker(dealId)
            commit('SET_CHAT', res.data.data.chatBroker)
            commit('SET_CHAT_NEW_MSG_COUNT', res.data.data.chatBroker.rooms)
            return res
        },

        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        async sendMessageLender({commit}, obj) {
            const fakeIdMsg = Math.trunc(Math.random()*20651161)
            const fakeData = {
                room_id: obj.room_id,
                chat: {
                    id: fakeIdMsg,
                    message: obj.msg,
                    role: 'lender',
                    seen: false,
                    time: '',
                    forbidden_msg: obj.forbidden_msg,
                },
            }
            commit('SET_NEW_MESSAGE_LENDER', fakeData)

            Chat.sendMessageLender(obj).then(
                response => {
                    commit('SET_NEW_MESSAGE_LENDER_AFTER_FAKE', {data: response.data.data.chatSendMessageLender, fake: fakeIdMsg})
                },
                error => {
                    return Promise.reject(error)
                },
            )
        },

        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        async sendMessageBroker({commit}, obj) {
            const fakeIdMsg = Math.trunc(Math.random()*20651161)
            const fakeData = {
                room_id: obj.room_id,
                chat: {
                    id: fakeIdMsg,
                    message: obj.msg,
                    role: 'broker',
                    seen: false,
                    time: '',
                    forbidden_msg: obj.forbidden_msg,
                },
            }
            commit('SET_NEW_MESSAGE_BROKER', fakeData)

            Chat.sendMessageBroker(obj).then(
                response => {
                    commit('SET_NEW_MESSAGE_BROKER_AFTER_FAKE', {data: response.data.data.chatSendMessageBroker, fake: fakeIdMsg})
                },
                error => {
                    return Promise.reject(error)
                },
            )
        },

        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        seenMessages({commit}, obj) {
            const res = Chat.seenMessages(obj)
            if(obj.index !== -1) {
                commit('CHANGE_SEEN_MESSAGES', obj)
                commit('SET_CHAT_NEW_MSG_COUNT', [])
            } else {
                commit('CHANGE_SEEN_MESSAGES_LENDER', obj.arr)
            }
            return res
        },

        setMsgFromPusher({commit, state}, obj) {
            if(obj.chat.role === 'broker') {
                if(state.currentChatId && state.currentChatId === obj.room_id) {
                    if(state.lenderOpenClosedChat) {
                        obj.chat.seen = true
                        Chat.seenMessages({arr: [obj.chat.id]})
                    } else {
                        commit('SET_NEW_MESSAGE_TABLE_LENDER', obj.deal_id)
                    }
                    commit('SET_NEW_MESSAGE_LENDER', obj)
                } else {
                    commit('SET_NEW_MESSAGE_TABLE_LENDER', obj.deal_id)
                }
            } else {
                if(state.currentChatId && state.currentChatId === obj.room_id) {
                    obj.chat.seen = true
                    Chat.seenMessages({arr: [obj.chat.id]})
                } else {
                    commit('SET_NEW_MESSAGE_TABLE_BROKER', obj.deal_id)
                }
                commit('SET_NEW_MESSAGE_BROKER', obj)
                commit('SET_CHAT_NEW_MSG_COUNT', [])
            }
        },

        firstMessageSentLender({commit}, obj) {
            commit('SET_NEW_FIRST_MESSAGE_BROKER', obj)
            commit('SET_NEW_MESSAGE_TABLE_BROKER', obj.deal_id)
            commit('SET_CHAT_NEW_MSG_COUNT', [])
        },

        currentChatId({commit}, id) {
            commit('SET_CURRENT_CHAT', id)
        },

        resetChat({commit}) {
            commit('RESET_CHAT')
        },

        setBrokerFirstChat({commit}, obj) {
            commit('SET_BROKER_FIRST_CHAT', obj)
        },

        isChatOpen({commit}, data) {
            commit('IS_CHAT_OPENED', data)
        },

        getZoomUrl(store, options) {
            return Chat.getZoomUrl(options).then((response) => {
                return Promise.resolve(response)
            })
        },

        sendZoomLinks({ dispatch }, { start_url, join_url, room_id, deal_id }) {
            dispatch('sendMessageBroker', {
                msg: `startzoomlink-${start_url}`,
                room_id,
                deal_id,
                forbidden_msg: false,
                lender_id: 0,
            })

            dispatch('sendMessageBroker', {
                msg: `joinzoomlink-${join_url}`,
                room_id,
                deal_id,
                forbidden_msg: false,
                lender_id: 0,
            })
        },
    },
}