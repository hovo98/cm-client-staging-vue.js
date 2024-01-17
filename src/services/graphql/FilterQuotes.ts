import Api from '@/services/Api'
import { jsonToGraphQLQuery, EnumType } from "json-to-graphql-query"

const URL_API = 'graphql'

export default {

    async getQuotesBroker(objG){
        objG.pagination.perPage = 10

        objG.obj.sortBy = {
            sort: new EnumType(objG.obj.sort),
            by: new EnumType(objG.obj.by),
        }

        delete objG.obj.sort
        delete objG.obj.by

        const objectForm = {
            query: {
                brokerGetAllQuotes: {
                    __args: {
                        pagination: objG.pagination,
                        input: objG.obj,
                    },
                    paginatorInfo: {
                        count: true,
                        currentPage: true,
                        firstItem: true,
                        hasMorePages: true,
                        lastItem: true,
                        lastPage: true,
                        perPage: true,
                        total: true,
                    },
                    data: {
                        quote_id: true,
                        lender_id: true,
                        dollarAmount: true,
                        // lastStepStatus: true,
                        deal: {
                            id: true,
                            address: {
                                street_address: true,
                                street_address_2: true,
                                city: true,
                                state: true,
                                zip_code: true,
                                place_id: true,
                                sublocality: true,
                                lat: true,
                                long: true,
                            },
                            deal_type: true,
                        },
                        interestRate: true,
                        rateTerm: true,
                        origFee: true,
                    },
                    sponsorNames: true,
                    tags: {
                        searchLocation: true,
                        sponsorNames: true,
                        sortBy: {
                            sort: true,
                            by: true,
                        },
                    },
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
     *
     * @param obj int
     */
    async individualQuoteLender(objG){
        const objectForm = {
            query: {
                lenderQuotesIndividual: {
                    __args: {
                        input: {
                            id: parseInt(objG.quote_id),
                        },
                    },
                    quote: {
                        id: true,
                        status: true,
                        purchaseAndRefinanceLoans: {
                            offer: {
                                amount: true,
                                loanToValueRatio: true,
                                loanToCostRatio: true,
                            },
                            amountOfYears: true,
                            amountOfYearsReset: true,
                            interestRateType: true,
                            interestRate: {
                                fixedRateAmount: true,
                                yieldText: true,
                                spread: true,
                                floor_rate: true,
                                yield_second: true,
                                spread_second: true,
                                floor_rate_second: true,
                                swap_value: true,
                            },
                            interestPeriod: true,
                            interestPeriodType: true,
                            amortizationPeriod: true,
                            recourseType: true,
                            recourseOptions: true,
                            recourseNote: true,
                            collectingOriginationFeeType: true,
                            collectingOrigination: {
                                costAmount: true,
                                costPercent: true,
                            },
                            prePaymentYears: true,
                            prePaymentCustomYear: true,
                        },
                        constructionLoans: {
                            requestedLoan: {
                                dollarAmount: true,
                                loanValue: true,
                                loanCost: true,
                            },
                            landCosts: {
                                costAmount: true,
                                costPercent: true,
                            },
                            softCosts: {
                                costAmount: true,
                                costPercent: true,
                            },
                            hardCosts: {
                                costAmount: true,
                                costPercent: true,
                            },
                            lendTowardsCosts: {
                                costAmount: true,
                                costPercent: true,
                            },
                            interestRateType: true,
                            interestRate: {
                                fixedRateAmount: true,
                                yieldText: true,
                                spread: true,
                                floor_rate: true,
                                yield_second: true,
                                spread_second: true,
                                floor_rate_second: true,
                                swap_value: true,
                            },
                            constructionTerm: true,
                            extensionOptionType: true,
                            extensionOption: {
                                duration: true,
                                feeAmount: true,
                                feePercentage: true,
                                allowed: true,
                            },
                            recourseOptionType: true,
                            recourseType: true,
                            recourseNote: true,
                            collectingFeeType: true,
                            collectingFee: {
                                feePercent: true,
                                feeAmount: true,
                            },
                            exitFeeType: true,
                            exitFee: {
                                fee: {
                                    feePercent: true,
                                    feeAmount: true,
                                },
                                comment: true,
                            },
                            permanentLoanOptionType: true,
                        },
                    },
                    broker: {
                        companyName: true,
                    },
                },
            },
        }

        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

		return await Api.post(URL_API, query)
    },

    async individualQuoteBroker(objG){
        const objectForm = {
            query: {
                brokerQuotesIndividual: {
                    __args: {
                        input: {
                            lender: objG.lender_id,
                            deal: objG.deal_id,
                        },
                    },
                    lender: {
                        company: true,
                        profile_img: true,
                    },
                    quotes: {
                        id: true,
                        status: true,
                        olderThanTwoWeeks: true,
                        button: true,
                        secondAccept: true,
                        purchaseAndRefinanceLoans: {
                            offer: {
                                amount: true,
                                loanToValueRatio: true,
                                loanToCostRatio: true,
                            },
                            amountOfYears: true,
                            amountOfYearsReset: true,
                            interestRateType: true,
                            interestRate: {
                                fixedRateAmount: true,
                                yieldText: true,
                                spread: true,
                                floor_rate: true,
                                yield_second: true,
                                spread_second: true,
                                floor_rate_second: true,
                                swap_value: true,
                            },
                            interestPeriod: true,
                            interestPeriodType: true,
                            amortizationPeriod: true,
                            recourseType: true,
                            recourseOptions: true,
                            recourseNote: true,
                            collectingOriginationFeeType: true,
                            collectingOrigination: {
                                costAmount: true,
                                costPercent: true,
                            },
                            prePaymentYears: true,
                            prePaymentCustomYear: true,
                        },
                        constructionLoans: {
                            requestedLoan: {
                                dollarAmount: true,
                                loanValue: true,
                                loanCost: true,
                            },
                            landCosts: {
                                costAmount: true,
                                costPercent: true,
                            },
                            softCosts: {
                                costAmount: true,
                                costPercent: true,
                            },
                            hardCosts: {
                                costAmount: true,
                                costPercent: true,
                            },
                            lendTowardsCosts: {
                                costAmount: true,
                                costPercent: true,
                            },
                            interestRateType: true,
                            interestRate: {
                                fixedRateAmount: true,
                                yieldText: true,
                                spread: true,
                                floor_rate: true,
                                yield_second: true,
                                spread_second: true,
                                floor_rate_second: true,
                                swap_value: true,
                            },
                            constructionTerm: true,
                            extensionOptionType: true,
                            extensionOption: {
                                duration: true,
                                feeAmount: true,
                                feePercentage: true,
                                allowed: true,
                            },
                            recourseOptionType: true,
                            recourseType: true,
                            recourseNote: true,
                            collectingFeeType: true,
                            collectingFee: {
                                feePercent: true,
                                feeAmount: true,
                            },
                            exitFeeType: true,
                            exitFee: {
                                fee: {
                                    feePercent: true,
                                    feeAmount: true,
                                },
                                comment: true,
                            },
                            permanentLoanOptionType: true,
                        },
                    },
                },
            },
        }

        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

		return await Api.post(URL_API, query)
    },


    async acceptQuote(quote) {
        const status = new EnumType('ACCEPTED')
        const objectForm = {
            mutation: {
                setQuoteStatus: {
                    __args: {
                        input: {
                            id: quote.id,
                            status: status,
                        },
                    },
                    status: true,
                    deal_termsheet_status: true,
                    message: true,
                    quotes: {
                        id: true,
                        status: true,
                        button: true,
                    },
                    anyQuoteAccepted: true,
                },
            },
        }
        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

		return await Api.post(URL_API, query)
    },

    async declineQuote(quote) {
        const status = new EnumType('OPENED')
        const objectForm = {
            mutation: {
                setQuoteStatus: {
                    __args: {
                        input: {
                            id: quote.id,
                            status: status,
                            unacceptMessage: quote.unacceptMessage,
                        },
                    },
                    status: true,
                    deal_termsheet_status: false,
                    message: true,
                    quotes: {
                        id: true,
                        status: true,
                        button: true,
                    },
                    anyQuoteAccepted: true,
                },
            },
        }
        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }
		return await Api.post(URL_API, query)
    },

}