import Api from '@/services/Api'
const URL_API = 'graphql'
import $store from "@/store"

export default {
    
    /**
     * @author Nikola Popov
     * @description 
     * 
     * @param id int
     */

    async getLenderProfileData(){
        const obj: any = {
            'query': `query {
                getFit(type:PERFECT){
                    areas {
                        area {
                            formatted_address
                            place_id
                            long_name
                            lat
                            long
                            polygon_location
                            county
                            sublocality
                            city
                            country
                            state
                            zip_code
                            fips_code
                        }
                        exclusions {
                            formatted_address
                            place_id
                            long_name
                            lat
                            long
                            polygon_location
                            county
                            sublocality
                            city
                            country
                            state
                            zip_code
                            fips_code
                        }
                    }
                    loan_size{
                        max
                        min
                    }
                    asset_types
                    other_asset_types
                    multifamily{
                        min_amount
                        max_amount
                    }
                    type_of_loans
                }
                getProfileInfoLender{
                    biography
                    specialty
                    linkedin_url                  
                }
            }`,
        }
		return await Api.post(URL_API, obj)
    },

    async hasLenderCompletedSignup(){
        const obj: any = {
            'query': `query {
                getFit(type:PERFECT){
                    loan_size{
                        max
                        min
                    }
                    show_type_of_loans
                }
            }`,
        }
        const response = await Api.post(URL_API, obj)
        const hasLoanSize = response?.data?.data?.getFit?.loan_size?.min || response?.data?.data?.getFit?.loan_size?.max
        if (hasLoanSize)
            $store.dispatch('changeSettingLoanOfType', response?.data?.data?.getFit?.show_type_of_loans)
        return hasLoanSize
    },

    /**
     * @author Nikola Popov
     * @description 
     *  create new meta field
     * @param metaObj object
     */

    async setMetaFieldForLender(metaObj){
        const obj: any = {
            'query': `mutation {
                setProfileInfoLender (
                    input: {
                        biography: "${metaObj.biography}"
                        specialty: "${metaObj.specialty}"
                        linkedin_url: "${metaObj.linkedin_url}"
                   }
                ){
                    biography
                    specialty
                    linkedin_url
                }
            }`,
        }
        return await Api.post(URL_API, obj)
    },

    async activeQuote(token) {
        const obj: any = {
            'query': `mutation {
                activeQuote (
                    token: "${token}"
                ){
                    status
                    message
                }
            }`,
        }
        return await Api.post(URL_API, obj)
    },

    async chooseQuote(token) {
        const obj: any = {
            'query': `mutation {
                chooseQuote (
                    token: "${token}"
                ){
                    status
                    message
                }
            }`,
        }
        return await Api.post(URL_API, obj)
    },
}