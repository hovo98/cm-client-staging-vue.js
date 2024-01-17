import Api from '@/services/Api'

const URL_API = 'graphql'

export default {

    /**
     * @author Boris Djemrovski
     * @description
     * Query to get the Loan Size settings
     */

    async loanSize(){
        const obj: any = {
            'query': `query {
                getLoanSize {
                    loan_size_min
                    loan_size_max
                    loan_size_step
                }
            }`,
        }
        return await Api.post(URL_API, obj)
    },
}