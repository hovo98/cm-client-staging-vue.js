import { jsonToGraphQLQuery } from "json-to-graphql-query"
import Api from '@/services/Api'
import {AxiosResponse} from "axios"

const URL_API = 'graphql'

export interface contactFormData {
    firstName: string
    lastName: string
    email: string
    subject: string
    message: string
    recaptcha: string
}

export default {

    /**
     * @author Boris Djemrovski
     * @description query to send contact form data
     * @param data contactFormData
     */
    async sendForm(data:contactFormData): Promise<AxiosResponse>{

        const objectForm = {
            query: {
                contactForm: {
                    __args: {
                        input: data,
                    },
                    message: true,
                    success: true,
                },
            },
        }

        const query = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

        return await Api.post(URL_API, query)
    },
}