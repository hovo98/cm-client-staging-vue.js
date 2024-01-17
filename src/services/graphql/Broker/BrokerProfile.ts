import Api from "@/services/Api"
import { jsonToGraphQLQuery } from "json-to-graphql-query"
const URL_API = "graphql"

export default {
  /**
   * @author Nikola Popov
   * @description
   *
   * @param id int
   */

  async getBrokerLender(id) {
    const obj: any = {
      query: `query {
                broker(id:"${id}"){
                    lenders{
                        id
                        first_name
                        last_name
                        email
                        profile_image
                    }
                    lender_emails {
                        lender_email
                    }
                }
                profileInfoBroker{
                    dealsPosted
                    quotesReceived
                    pairedDeals
                }
            }`,
    }
    return await Api.post(URL_API, obj)
  },

  async getPlan() {
    const objectForm = {
      query: {
        plan: {
          name: true,
          success: true,
          status: true,
          stripe_id: true,
          ends_at: true,
          downgraded_message: true,
          next_billing_date: true,
          next_billing_amount: true,
        },
      },
    }

    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)
  },

  async addLender(arr) {
    const objectForm = {
      mutation: {
        addLender: {
          __args: {
            input: {
              emails: arr,
            },
          },
          email: true,
          message: true,
        },
      },
    }
    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)
  },

  async removeLender(id) {
    const obj: any = {
      query: `mutation {
                removeLender(
                    lender_email: "${id}"
                ){
                    message
                    success
                }
            }`,
    }
    return await Api.post(URL_API, obj)
  },
}
