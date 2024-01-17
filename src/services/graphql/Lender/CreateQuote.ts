import Api from '@/services/Api'
import { jsonToGraphQLQuery, EnumType } from "json-to-graphql-query"
const URL_API = 'graphql'

export default {
    async setLastStepStatus(objG) {
        if (!objG.id) return
        const objectForm = {
            mutation: {
                quoteStepStatus: {
                    __args: {
                        input: {
                            id: objG.id,
                            status: JSON.stringify(objG.status),
                        },
                    },
                    id: true,
                },
            },
        }
        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

        return await Api.post(URL_API, query)
    },

    async getQuote(objG) {
        const objectForm = {
            query: {
                quoteObject: {
                    __args: {
                        input: {
                            id: parseInt(objG.id),
                        },
                    },
                        id: true,
                        lastStepStatus: true,
                        seen:true,
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
        }

        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

        return await Api.post(URL_API, query)
    },

    async setOffer(objG, id, dealId) {
        const objectForm = {
            mutation: {
                quote: {
                    __args: {
                        input: {
                            id: id,
                            deal: {
                                id:dealId,
                            },
                            purchaseAndRefinanceLoans: {
                                offer: objG,
                            },
                        },
                    },
                    id: true,
                    lastStepStatus: true,
                    purchaseAndRefinanceLoans: {
                        offer: {
                            amount: true,
                            loanToValueRatio: true,
                            loanToCostRatio: true,
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

    async setPageTwo(objG, id, dealId) {
        if(objG.amountOfYearsReset === '') {
            objG.amountOfYearsReset = new EnumType('UNDEFINED')
        } else {
            objG.amountOfYearsReset = new EnumType(objG.amountOfYearsReset)
        }
        objG.interestRateType = new EnumType(objG.interestRateType)
        const objectForm = {
            mutation: {
                quote: {
                    __args: {
                        input: {
                            id: parseInt(id),
                            deal: {
                                id:dealId,
                            },
                            purchaseAndRefinanceLoans: objG,
                        },
                    },
                    id: true,
                    lastStepStatus: true,
                    purchaseAndRefinanceLoans: {
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
                    },
                },
            },
        }
        
        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

		return await Api.post(URL_API, query)
    },

    async setPageThree(objG, id, dealId) {
        
        (objG.interestPeriodType === undefined)
            ? objG.interestPeriodType = new EnumType('UNDEFINED')
            : objG.interestPeriodType = new EnumType(objG.interestPeriodType);

        (objG.recourseType === undefined)
            ? objG.recourseType = new EnumType('UNDEFINED')
            : objG.recourseType = new EnumType(objG.recourseType);

        (objG.collectingOriginationFeeType === undefined)
            ? objG.collectingOriginationFeeType = new EnumType('UNDEFINED')
            : objG.collectingOriginationFeeType = new EnumType(objG.collectingOriginationFeeType)

        if(objG.recourseOptions.length > 0) {
            const newArr = []
            objG.recourseOptions.forEach(element => {
                newArr.push(new EnumType(element))
            })
            objG.recourseOptions = newArr
        }
        
        const objectForm = {
            mutation: {
                quote: {
                    __args: {
                        input: {
                            id: parseInt(id),
                            deal: {
                                id:dealId,
                            },
                            purchaseAndRefinanceLoans: objG,
                        },
                    },
                    id: true,
                    lastStepStatus: true,
                    purchaseAndRefinanceLoans: {
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
                    },
                },
            },
        }

        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

		return await Api.post(URL_API, query)
    },

    async setPageFour(objG, id, dealId) {
        const objectForm = {
            mutation: {
                quote: {
                    __args: {
                        input: {
                            id: parseInt(id),
                            deal: {
                                id:dealId,
                            },
                            purchaseAndRefinanceLoans: objG,
                        },
                    },
                    id: true,
                    lastStepStatus: true,
                    purchaseAndRefinanceLoans: {
                        prePaymentYears: true,
                        prePaymentCustomYear: true,
                    },
                },
            },
        }
        
        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

		return await Api.post(URL_API, query)
    },

    async setInfo(objG, id, dealId) {
        const objectForm = {
            mutation: {
                quote: {
                    __args: {
                        input: {
                            id: parseInt(id),
                            deal: {
                                id:dealId,
                            },
                            constructionLoans: objG,
                        },
                    },
                    id: true,
                    lastStepStatus: true,
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
                    },
                },
            },
        }
        
        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

		return await Api.post(URL_API, query)
    },

    async setInterest(objG, id, dealId) {
        objG.interestRateType = new EnumType(objG.interestRateType)
        const objectForm = {
            mutation: {
                quote: {
                    __args: {
                        input: {
                            id: parseInt(id),
                            deal: {
                                id:dealId,
                            },
                            constructionLoans: objG,
                        },
                    },
                    id: true,
                    lastStepStatus: true,
                    constructionLoans: {
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
                    },
                },
            },
        }
        
        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

		return await Api.post(URL_API, query)
    },

    async setQuoteStepThree(objG, id, dealId) {
        objG.extensionOptionType = new EnumType(objG.extensionOptionType)
        objG.recourseOptionType = new EnumType(objG.recourseOptionType)
        objG.collectingFeeType = new EnumType(objG.collectingFeeType)
        objG.exitFeeType = new EnumType(objG.exitFeeType)
        objG.permanentLoanOptionType = new EnumType(objG.permanentLoanOptionType)

        if(objG.recourseType.length > 0) {
            const newArr = []
            objG.recourseType.forEach(element => {
                newArr.push(new EnumType(element))
            })
            objG.recourseType = newArr
        }
        
        const objectForm = {
            mutation: {
                quote: {
                    __args: {
                        input: {
                            id: parseInt(id),
                            deal: {
                                id:dealId,
                            },
                            constructionLoans: objG,
                        },
                    },
                    id: true,
                    lastStepStatus: true,
                    constructionLoans: {
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
        }
        
        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

		return await Api.post(URL_API, query)
    },

    async getDealByIdQuote(objG){
        const obj: any = {
            'query': `query{
                dealObject(input: {
                    id: ${objG.id}
                }) {
                    deal {
                        id
                        property_type
                        loan_type
                        finished
                    }
                }
            }`,
        }
		return await Api.post(URL_API, obj)
    },

    async getDealForCreateQuote(objG) {
        const obj: any = {
            'query': `query{
                getDealForCreateQuote(input: {
                    id: ${objG.id}
                }) {
                    property_type
                    loan_type
                    loan_amount
                    land_cost
                    hard_cost
                    soft_cost
                }
            }`,
        }
        return await Api.post(URL_API, obj)
    },

    async quoteErrorMessage(objG) {
        const objectForm = {
            mutation: {
                quoteErrorMessage: {
                    __args: {
                        input: objG,
                    },
                    status: true,
                },
            },
        }
        
        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

		return await Api.post(URL_API, query)
    },

    async finishQuote(objG, id, dealId) {
        const objectForm = {
            mutation: {
                quote: {
                    __args: {
                        input: {
                            id: id,
                            deal: {
                                id:dealId,
                            },
                            finished: true,
                            message: objG.msg,
                        },
                    },
                    id: true,
                },
            },
        }
        
        const query: any = {
            query: jsonToGraphQLQuery(objectForm, {pretty: true}),
        }

		return await Api.post(URL_API, query)
    },
}