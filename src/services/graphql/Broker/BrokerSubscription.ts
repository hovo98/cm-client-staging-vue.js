import Api from '@/services/Api'
import { jsonToGraphQLQuery } from "json-to-graphql-query"

const URL_API = 'graphql'

export default {
  async getSubscriptions(){
    const query: any = {
        'query': `query {
            plans {
              name
              id
              price
              features
              description
              price_id
              type
              ends_at
              status
          }
        }`,
    }

    return await Api.post(URL_API, query)
  },
  async getSparkUrl(options) {
    const objectForm = {
      mutation: {
        sparkLogin: {
           __args: {
             input: {
               return_url: options.return_url,
             },
           },
          success: true,
        },
      },
    }
    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)
  },
  async getOneTimePaymentLinkForQuote(quote, options) {
    const objectForm = {
      mutation: {
        buyQuote: {
          __args: {
            input: {
              quote_id: quote.id,
              success_path: options.success_path,
              cancel_path: options.cancel_path,
            },
          },
          quote_price: true,
          checkout_url: true,
        },
      },
    }
    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)

  },
  async getOneTimePaymentLinkForDeal(deal, options) {
    const objectForm = {
      mutation: {
        buyDeal: {
          __args: {
            input: {
              deal_id: deal,
              success_path: options.success_path,
              cancel_path: options.cancel_path,
            },
          },
          deal_price: true,
          checkout_url: true,
        },
      },
    }
    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)

  },
  async checkPaymentStatus(checkoutId) {
    const objectForm = {
      query: {
        checkPaymentStatus: {
          __args: {
            input: {
              checkout_id: checkoutId,
            },
          },
          status: true,
        },
      },
    }
    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)

  },
}