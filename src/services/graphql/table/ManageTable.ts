import Api from '@/services/Api'
import { jsonToGraphQLQuery } from "json-to-graphql-query"
const URL_API = 'graphql'

export default {
    async getDealManageTableBroker(flag) {
        const objectForm = {
            query: {
                getManageTable: {
                    __args: {
                        table: flag,
                    },
                    manageTable: true,
                    table: true,
                },
            },
        }
        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

        return await Api.post(URL_API, query)
    },

    async setManageTable(obj) {
        const objectForm = {
            mutation : {
                setManageTable: {
                    __args: {
                        input: {
                            manageTable: obj.arr,
                            table: obj.flag,
                        },
                    },
                    manageTable: true,
                    table: true,
                },
            },
        }
        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

        return await Api.post(URL_API, query)
    },
}