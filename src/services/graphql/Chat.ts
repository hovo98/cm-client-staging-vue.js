import Api from '@/services/Api'
import { jsonToGraphQLQuery } from 'json-to-graphql-query'

const URL_API = 'graphql'

export default {

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async initialChatLender(dealId) {
        const objectForm = {
            query: {
                chatLender: {
                    __args: {
                        deal_id: parseInt(dealId),
                    },
                    name: true,
                    room_id: true,
                    chat_response_time: true,
                    messages: {
                        id: true,
                        role: true,
                        time: true,
                        message: true,
                        seen: true,
                        forbidden_msg: true,
                    },
                },
            },
        }

        const query = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

        return await Api.post(URL_API, query)
    },

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async initialChatBroker(dealId) {
        const objectForm = {
            query: {
                chatBroker: {
                    __args: {
                        deal_id: parseInt(dealId),
                    },
                    rooms: {
                        chat_response_time: true,
                        room_id: true,
                        name: true,
                        messages: {
                            id: true,
                            role: true,
                            time: true,
                            message: true,
                            seen: true,
                            forbidden_msg: true,
                        },
                    },
                },
            },
        }

        const query = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

        return await Api.post(URL_API, query)
    },

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async sendMessageLender(obj) {
        const objectForm = {
            mutation: {
                chatSendMessageLender: {
                    __args: {
                        input: obj,
                    },
                    room_id: true,
                    chat: {
                        id: true,
                        role: true,
                        time: true,
                        message: true,
                        seen: true,
                        forbidden_msg: true,
                    },
                },
            },
        }

        const query = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

        return await Api.post(URL_API, query)
    },

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async sendMessageBroker(obj) {
        const objectForm = {
            mutation: {
                chatSendMessageBroker: {
                    __args: {
                        input: obj,
                    },
                    room_id: true,
                    chat: {
                        id: true,
                        role: true,
                        time: true,
                        message: true,
                        seen: true,
                        forbidden_msg: true,
                    },
                },
            },
        }

        const query = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

        return await Api.post(URL_API, query)
    },

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    seenMessages(obj) {
        const objectForm = {
            mutation: {
                chatSeenMsg: {
                    __args: {
                        input: {
                            seen: obj.arr,
                        },
                    },
                    status: true,
                    message: true,
                },
            },
        }

        const query = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

        return Api.post(URL_API, query)
    },

    async getZoomUrl(options) {
        const objectForm = {
          query: {
            chatVideoCall: {
               __args: {
                  deal_id: options.deal_id,
               },
               start_url: true,
              join_url: true,
            },
          },
        }
        const query: any = {
          query: jsonToGraphQLQuery(objectForm, { pretty: true }),
        }

        return await Api.post(URL_API, query)
    },
}