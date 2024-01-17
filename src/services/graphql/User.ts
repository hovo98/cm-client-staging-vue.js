import { jsonToGraphQLQuery, EnumType } from "json-to-graphql-query"
import { escapeSingleDoubleQuotes } from '@/config/util'
import Api from '@/services/Api'

const URL_API = 'graphql'

export default {

    /**
     * @author Nikola Popov
     * @description
     * mutation login with email and password
     * return user info
     * @param userInfo object
     */
  async login(userInfo: { email: string; password: string; }) {
        const obj: any = {
            'query': `mutation {
                login(input: {username: "${userInfo.email}" password: "${escapeSingleDoubleQuotes(userInfo.password)}"}) {
                    access_token
                    refresh_token
                    expires_in
                    tempToken
                    show_type_of_loans
                    non_beta_user
                    user {
                        role
                        id
                        first_name
                        last_name
                        email
                        status
                        company_id
                        profile_image
                        plan {
                          name
                          status
                          ends_at
                          stripe_id
                          downgraded_message
                          next_billing_date
                          next_billing_amount
                        }
                        company {
                           company_name
                           domain
                        }
                    }
                }
            }`,
        }
		return await Api.post(URL_API, obj)
    },

    /**
     * @author Nikola Popov
     * @description
     * check email if exsist and send email with new password
     * @param emailInfo object
     */
    async resetPassword(emailInfo){
        const obj: any = {
            'query': `mutation {
                forgotPassword(
                    input: {
                        email: "${emailInfo.email}"
                        recaptcha: "${emailInfo.recaptcha}"
                    }
                ){
                    status
                    message
                }
            }`,
        }
        return await Api.post(URL_API, obj)
    },

    /**
     * @author Nikola Popov
     * @description
     * register users
     * @param user object
     */
    async registerUser(user){
        const obj: any = {
            'query': `mutation {
                register(
                    input: {
                        role : "${user.role}",
                        first_name: "${user.first_name}",
                        last_name: "${user.last_name}",
                        email: "${user.email}",
                        password: "${escapeSingleDoubleQuotes(user.password)}",
                        token_track_referral: "${user.token_track_referral}",
                        timezone: "${Intl.DateTimeFormat().resolvedOptions().timeZone}"
                        recaptcha: "${user.recaptcha}",
                        gtm_hidden_id: "${user.gtm_hidden_id}"
                        invited_by: ${user.invited_by}
                    }
                ){
                    token
                    status
                }
            }`,
        }
        return await Api.post(URL_API, obj)
    },

    /**
     * @author Nikola Popov
     * @description
     * check if email exists
     * @param objInfoEmail object with email
     */
    async checkRegisterEmail(objInfoEmail){
        const obj: any = {
            'query': `query {
                checkEmail(
                    email: "${objInfoEmail.email}"
                ){
                    success
                    message
                }
            }`,
        }
        return await Api.post(URL_API, obj)
    },

    /**
     * @author Nikola Popov
     * @description
     *
     * @param obj object form
     * @param token
     */
    async lenderSignUp (obj, token){
        const mutationName = token ? 'createFit' : 'updateFit'
        if (token) {
            obj.token = token
        }
        //Remove recaptch if user is logged in
        if(mutationName === 'updateFit') {
            delete obj.recaptcha
        }

        obj.type = new EnumType(obj.type)

        const objectForm = {
            mutation: {
                [mutationName]: {
                    __args: {
                        input: obj,
                    },
                    message: true,
                    success: true,
                },
            },
        }

        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }
        return await Api.post(URL_API, query)
    },

    /**
     * @author Nikola Popov
     * @description
     *  verify email
     * @param obj object hash key
     */
    async userVerify (obj){
        const objectForm: any = {
            'query': `mutation {
                verifyEmail(
                    input: {
                        email: "${obj.email}",
                        recaptcha: "${obj.recaptcha}",
                    }
                ){
                    access_token
                }
            }`,
        }
        return await Api.post(URL_API, objectForm)
    },

    /**
     * @author Nikola Popov
     * @description
     *  restart password
     * @param obj object
     */
    async userRestartPassword(obj) {
        const objectForm: any = {
            'query': `mutation {
                updateForgottenPassword(
                    input: {
                        token: "${obj.token}",
                        password: "${escapeSingleDoubleQuotes(obj.password)}"
                        recaptcha: "${obj.recaptcha}"
                    }
                ){
                    message
                    status
                }
            }`,
        }
        return await Api.post(URL_API, objectForm)
    },

    /**
     * @author Nikola Popov
     * @description
     *  send new email for verify
     * @param obj object
     */
    async sendNewVerify(obj) {
        const objectForm: any = {
            'query': `query {
                getVerificationMailByEmail(
                    email: "${obj.email}"
                ){
                    success
                    message
                }
            }`,
        }
        return await Api.post(URL_API, objectForm)
    },

    /**
     * @author Nikola Popov
     * @description
     *  send refresh token
     * @param obj object
     */
    async refreshToken(obj){
        const objectForm: any = {
            'query': `mutation {
                refreshToken(
                    input: {
                        refresh_token: "${obj.refresh_token}",
                    }
                ){
                    access_token
                    refresh_token
                    expires_in
                    token_type
                }
            }`,
        }
        return await Api.post(URL_API, objectForm)
    },

    /**
     * @author Nikola Popov
     * @description
     *  Logout destroy session and token
     */
    async logout(){
        const objectForm: any = {
            'query': `mutation {
                logout{
                    status
                    message
                }
            }`,
        }
        return await Api.post(URL_API, objectForm)
    },

    /**
     * @author Milica Mihajlovic
     * @description
     *  ignore deal
     * @param obj object
     */
    async lenderIgnoreDeal(obj) {
        const objectForm: any = {
            'query': `mutation {
                ignoreDeal(
                   token: "${obj.token}",
                   recaptcha: "${obj.recaptcha}",
                ){
                    status
                    message
                }
            }`,
        }
        return await Api.post(URL_API, objectForm)
    },


    async settingLoanOfType(arr) {
        const objectForm = {
            mutation: {
                updateTypeOfLoans: {
                    __args: {
                        input: {
                            type_of_loans: arr,
                        },
                    },
                    success: true,
                    message: true,
                },
            },
        }

        const query = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

        return await Api.post(URL_API, query)
    },

}