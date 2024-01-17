import Api from '@/services/Api'
import { mapMultipartFormData } from "@/config/util"
import { jsonToGraphQLQuery } from "json-to-graphql-query"

const URL_API = 'graphql'

export default {
    
    /**
     * @author Nikola Popov
     * @description 
     * 
     * @param id int
     */

    async getProfileData(objForm){
        let str = ''
        if(objForm.role === 'lender'){
            str += `lender(id: "${objForm.id}"){
                first_name
                last_name
                email
                phone
                email_verified_at
                timezone
            }`
        } else {
            str += `broker(id:"${objForm.id}"){
                first_name
                last_name
                email
                phone
                email_verified_at
                timezone
            }`
        }
        const obj: any = {
            'query': `query {
                ${str}
                getCompany{
                    company_data{
                        company_name
                        company_address
                        company_city
                        company_state
                        company_zip_code
                        company_phone
                    }
                }
                getCompanyLogo{
                    company_logo_url
                } 
            }`,
        }
		return await Api.post(URL_API, obj)
    },

    async getProfileImage(){
        const obj: any = {
            'query': `query {
                getProfileImage{
                    image
                }
            }`,
        }
		return await Api.post(URL_API, obj)
    },

    async updateProfileImage(File){
        const query: any = {
            'query': `mutation($file: Upload!){
                updateProfileImage(
                    profile_image: $file
                ){
                    success
                    message
                    image
                }
            }`,
        }

		return await Api.post(URL_API, mapMultipartFormData(query, File))
    },

    async deleteProfileImage() {
        const query: any = {
            'query': `mutation{
                deleteProfileImage{
                    success
                    message
                }
            }`,
        }

        return await Api.post(URL_API, query)
    },

    async updateProfile(str){
        const obj: any = {
            'query': str,
        }
		return await Api.post(URL_API, obj)
    },

    async updateCompanyLogo(File){
        const query: any = {
            'query': `mutation($file: Upload!){
                updateCompanyLogo(
                    company_logo: $file
                ){
                    success
                    message
                    company_logo_url
                }
            }`,
        }

        return await Api.post(URL_API, mapMultipartFormData(query, File))
    },

    async deleteCompanyLogo() {
        const query: any = {
            'query': `mutation{
                deleteCompanyLogo{
                    success
                    message
                }
            }`,
        }

        return await Api.post(URL_API, query)
    },

    async sendVerifyEmailFromDashboard(){
        const query: any = {
            'query': `query {
                getVerificationMail{
                    message
                    success
                }
            }`,
        }

        return await Api.post(URL_API, query)
    },

    async sendInvitationEmail(obj){
        const objectForm = {
            query: {
                invitationEmail: {
                    __args: {
                        input: {
                            inviteLender: obj.inviteLender,
                            inviteBroker: obj.inviteBroker,
                        },
                    },
                    errorsResponseBroker: {
                        email: true,
                        message: true,
                    },
                    errorsResponseLender: {
                        email: true,
                        message: true,
                    },
                },
            },
        }

        const query = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

        return await Api.post(URL_API, query)
    },
}