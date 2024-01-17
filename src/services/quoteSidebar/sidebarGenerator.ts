import references from '@/services/quoteSidebar/references'
import $store from '@/store'

const generate = (element, args) => {
    if(args.type === 'construction') {
        return getConstructionSidebar(element)
    }

    if(args.type === 'combined') {
        return getCombinedSidebar(element)
    }

    if(args.type === 'pr') {
        return getPRSidebar(element)
    }
}

const getPRSidebar = (element) => {
    const quoteStart = references.quoteStart()
    const prLoansStepOne = references.prLoansStepOne()
    const prLoansStepTwo = references.prLoansStepTwo()
    const prLoansStepThree = references.prLoansStepThree()
    const prLoansStepFour = references.prLoansStepFour()
    const quoteSummary = references.quoteSummary()
    const quoteFinish = references.quoteFinish()
    
    if(element.reference === 'quoteStart') {
        quoteStart.currentStep = true
        quoteStart.percentage = 0
        return [
            quoteStart,
            prLoansStepOne,
            prLoansStepTwo,
            prLoansStepThree,
            prLoansStepFour,
            quoteSummary,
            quoteFinish,
        ]
    }

    if(element.reference === 'prLoansStepOne') {
        quoteStart.stepStatus = true
        prLoansStepOne.currentStep = true
        prLoansStepOne.percentage = 15
        return [
            quoteStart,
            prLoansStepOne,
            prLoansStepTwo,
            prLoansStepThree,
            prLoansStepFour,
            quoteSummary,
            quoteFinish,
        ]
    }

    if(element.reference === 'prLoansStepTwo') {
        quoteStart.stepStatus = true
        prLoansStepOne.stepStatus = true
        prLoansStepTwo.currentStep = true
        prLoansStepTwo.percentage = 30
        return [
            quoteStart,
            prLoansStepOne,
            prLoansStepTwo,
            prLoansStepThree,
            prLoansStepFour,
            quoteSummary,
            quoteFinish,
        ]
    }

    if(element.reference === 'prLoansStepThree') {
        quoteStart.stepStatus = true
        prLoansStepOne.stepStatus = true
        prLoansStepTwo.stepStatus = true
        prLoansStepThree.currentStep = true
        prLoansStepThree.percentage = 45
        return [
            quoteStart,
            prLoansStepOne,
            prLoansStepTwo,
            prLoansStepThree,
            prLoansStepFour,
            quoteSummary,
            quoteFinish,
        ]
    }

    if(element.reference === 'prLoansStepFour') {
        quoteStart.stepStatus = true
        prLoansStepOne.stepStatus = true
        prLoansStepTwo.stepStatus = true
        prLoansStepThree.stepStatus = true
        prLoansStepFour.currentStep = true
        prLoansStepFour.percentage = 60
        return [
            quoteStart,
            prLoansStepOne,
            prLoansStepTwo,
            prLoansStepThree,
            prLoansStepFour,
            quoteSummary,
            quoteFinish,
        ]
    }

    if(element.reference === 'quoteSummary') {
        quoteStart.stepStatus = true
        prLoansStepOne.stepStatus = true
        prLoansStepTwo.stepStatus = true
        prLoansStepThree.stepStatus = true
        prLoansStepFour.stepStatus = true
        quoteSummary.currentStep = true
        quoteSummary.percentage = 75
        return [
            quoteStart,
            prLoansStepOne,
            prLoansStepTwo,
            prLoansStepThree,
            prLoansStepFour,
            quoteSummary,
            quoteFinish,
        ]
    }

    if(element.reference === 'quoteFinish') {
        quoteStart.stepStatus = true
        prLoansStepOne.stepStatus = true
        prLoansStepTwo.stepStatus = true
        prLoansStepThree.stepStatus = true
        prLoansStepFour.stepStatus = true
        quoteSummary.stepStatus = true
        quoteFinish.currentStep = true
        quoteFinish.percentage = 100
        return [
            quoteStart,
            prLoansStepOne,
            prLoansStepTwo,
            prLoansStepThree,
            prLoansStepFour,
            quoteSummary,
            quoteFinish,
        ]
    }
}

const getCombinedSidebar = (element) => {
    const quoteStart = references.quoteStart()
    const quoteInfo = references.quoteInfo()
    const quoteInterest = references.quoteInterest()
    const quoteStepThree = references.quoteStepThree()
    const prLoansStepOne = references.prLoansStepOne()
    const prLoansStepTwo = references.prLoansStepTwo()
    const prLoansStepThree = references.prLoansStepThree()
    const prLoansStepFour = references.prLoansStepFour()
    const quoteSummary = references.quoteSummary()
    const quoteFinish = references.quoteFinish()

    const data = $store.getters.getStepThree

    prLoansStepOne.title = 'Permanent ' + prLoansStepOne.title
    prLoansStepTwo.title = 'Permanent ' + prLoansStepTwo.title
    prLoansStepThree.title = 'Permanent ' + prLoansStepThree.title
    prLoansStepFour.title = 'Permanent ' + prLoansStepFour.title

    if(element.reference === 'quoteStart') {
        if(!data || data?.permanentLoanOptionType !== null || data?.permanentLoanOptionType === 'NO') {
            quoteStart.currentStep = true
            quoteStart.percentage = 0
            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                quoteSummary,
                quoteFinish,
            ]
        } else {
            quoteStart.currentStep = true
            quoteStart.percentage = 0
            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                prLoansStepOne,
                prLoansStepTwo,
                prLoansStepThree,
                prLoansStepFour,
                quoteSummary,
                quoteFinish,
            ]
        }
    }

    if(element.reference === 'quoteInfo') {
        if(!data || data?.permanentLoanOptionType !== null || data?.permanentLoanOptionType === 'NO') {
            quoteStart.stepStatus = true
            quoteInfo.currentStep = true
            quoteInfo.percentage = 20

            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                quoteSummary,
                quoteFinish,
            ]
        } else {
            quoteStart.stepStatus = true
            quoteInfo.currentStep = true
            quoteInfo.percentage = 10
            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                prLoansStepOne,
                prLoansStepTwo,
                prLoansStepThree,
                prLoansStepFour,
                quoteSummary,
                quoteFinish,
            ]
        }
    }

    if(element.reference === 'quoteInterest') {
        if(!data || data?.permanentLoanOptionType !== null || data?.permanentLoanOptionType === 'NO') {
            quoteStart.stepStatus = true
            quoteInfo.stepStatus = true
            quoteInterest.currentStep = true
            quoteInterest.percentage = 40

            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                quoteSummary,
                quoteFinish,
            ]
        } else {
            quoteStart.stepStatus = true
            quoteInfo.stepStatus = true
            quoteInterest.currentStep = true
            quoteInterest.percentage = 20
            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                prLoansStepOne,
                prLoansStepTwo,
                prLoansStepThree,
                prLoansStepFour,
                quoteSummary,
                quoteFinish,
            ]
        }
    }

    if(element.reference === 'quoteStepThree') {
        if(!data || data?.permanentLoanOptionType !== null || data?.permanentLoanOptionType === 'NO') {
            quoteStart.stepStatus = true
            quoteInfo.stepStatus = true
            quoteInterest.stepStatus = true
            quoteStepThree.currentStep = true
            quoteStepThree.percentage = 60

            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                quoteSummary,
                quoteFinish,
            ]
        } else {
            quoteStart.stepStatus = true
            quoteInfo.stepStatus = true
            quoteInterest.stepStatus = true
            quoteStepThree.currentStep = true
            quoteStepThree.percentage = 30
            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                prLoansStepOne,
                prLoansStepTwo,
                prLoansStepThree,
                prLoansStepFour,
                quoteSummary,
                quoteFinish,
            ]
        }
    }

    if(element.reference === 'prLoansStepOne') {
        quoteStart.stepStatus = true
        quoteInfo.stepStatus = true
        quoteInterest.stepStatus = true
        quoteStepThree.stepStatus = true
        prLoansStepOne.currentStep = true
        prLoansStepOne.percentage = 50
        return [
            quoteStart,
            quoteInfo,
            quoteInterest,
            quoteStepThree,
            prLoansStepOne,
            prLoansStepTwo,
            prLoansStepThree,
            prLoansStepFour,
            quoteSummary,
            quoteFinish,
        ]
    }

    if(element.reference === 'prLoansStepTwo') {
        quoteStart.stepStatus = true
        quoteInfo.stepStatus = true
        quoteInterest.stepStatus = true
        quoteStepThree.stepStatus = true
        prLoansStepOne.stepStatus = true
        prLoansStepTwo.currentStep = true
        prLoansStepTwo.percentage = 60
        return [
            
            quoteStart,
            quoteInfo,
            quoteInterest,
            quoteStepThree,
            prLoansStepOne,
            prLoansStepTwo,
            prLoansStepThree,
            prLoansStepFour,
            quoteSummary,
            quoteFinish,
        ]
    }

    if(element.reference === 'prLoansStepThree') {
        quoteStart.stepStatus = true
        quoteInfo.stepStatus = true
        quoteInterest.stepStatus = true
        quoteStepThree.stepStatus = true
        prLoansStepOne.stepStatus = true
        prLoansStepTwo.stepStatus = true
        prLoansStepThree.currentStep = true
        prLoansStepThree.percentage = 70
        return [
            
            quoteStart,
            quoteInfo,
            quoteInterest,
            quoteStepThree,
            prLoansStepOne,
            prLoansStepTwo,
            prLoansStepThree,
            prLoansStepFour,
            quoteSummary,
            quoteFinish,
        ]
    }

    if(element.reference === 'prLoansStepFour') {
        quoteStart.stepStatus = true
        quoteInfo.stepStatus = true
        quoteInterest.stepStatus = true
        quoteStepThree.stepStatus = true
        prLoansStepOne.stepStatus = true
        prLoansStepTwo.stepStatus = true
        prLoansStepThree.stepStatus = true
        prLoansStepFour.currentStep = true
        prLoansStepFour.percentage = 80
        return [
            quoteStart,
            quoteInfo,
            quoteInterest,
            quoteStepThree,
            prLoansStepOne,
            prLoansStepTwo,
            prLoansStepThree,
            prLoansStepFour,
            quoteSummary,
            quoteFinish,
        ]
    }

    if(element.reference === 'quoteSummary') {
        const data = $store.getters.getStepThree

        if(data.permanentLoanOptionType === 'NO') {
            quoteStart.stepStatus = true
            quoteInfo.stepStatus = true
            quoteInterest.stepStatus = true
            quoteStepThree.stepStatus = true
            quoteSummary.currentStep = true
            quoteSummary.percentage = 90
            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                quoteSummary,
                quoteFinish,
            ]
        } else {
            quoteStart.stepStatus = true
            quoteInfo.stepStatus = true
            quoteInterest.stepStatus = true
            quoteStepThree.stepStatus = true
            prLoansStepOne.stepStatus = true
            prLoansStepTwo.stepStatus = true
            prLoansStepThree.stepStatus = true
            prLoansStepFour.stepStatus = true
            quoteSummary.currentStep = true
            quoteSummary.percentage = 90
            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                prLoansStepOne,
                prLoansStepTwo,
                prLoansStepThree,
                prLoansStepFour,
                quoteSummary,
                quoteFinish,
            ]
        }
    }

    if(element.reference === 'quoteFinish') {
        quoteStart.stepStatus = true
        quoteInfo.stepStatus = true
        quoteInterest.stepStatus = true
        quoteStepThree.stepStatus = true
        prLoansStepOne.stepStatus = true
        prLoansStepTwo.stepStatus = true
        prLoansStepThree.stepStatus = true
        prLoansStepFour.stepStatus = true
        quoteSummary.stepStatus = true
        quoteFinish.currentStep = true
        quoteFinish.percentage = 100
        return [
            
            quoteStart,
            quoteInfo,
            quoteInterest,
            quoteStepThree,
            prLoansStepOne,
            prLoansStepTwo,
            prLoansStepThree,
            prLoansStepFour,
            quoteSummary,
            quoteFinish,
        ]
    }
}

const getConstructionSidebar = (element) => {
    const quoteStart = references.quoteStart()
    const quoteInfo = references.quoteInfo()
    const quoteInterest = references.quoteInterest()
    const quoteStepThree = references.quoteStepThree()
    const quoteSummary = references.quoteSummary()
    const quoteFinish = references.quoteFinish()
    const prLoansStepOne = references.prLoansStepOne()
    const prLoansStepTwo = references.prLoansStepTwo()
    const prLoansStepThree = references.prLoansStepThree()
    const prLoansStepFour = references.prLoansStepFour()

    const data = $store.getters.getStepThree

    if(element.reference === 'quoteStart') {
        if(!data || data?.permanentLoanOptionType !== null || data?.permanentLoanOptionType === 'NO') {
            quoteStart.currentStep = true
            quoteStart.percentage = 0
            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                quoteSummary,
                quoteFinish,
            ]
        } else {
            quoteStart.currentStep = true
            quoteStart.percentage = 0
            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                prLoansStepOne,
                prLoansStepTwo,
                prLoansStepThree,
                prLoansStepFour,
                quoteSummary,
                quoteFinish,
            ]
        }
    }

    if(element.reference === 'quoteInfo') {
        if(!data || data?.permanentLoanOptionType !== null || data?.permanentLoanOptionType === 'NO') {
            quoteStart.stepStatus = true
            quoteInfo.currentStep = true
            quoteInfo.percentage = 20

            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                quoteSummary,
                quoteFinish,
            ]
        } else {
            quoteStart.stepStatus = true
            quoteInfo.currentStep = true
            quoteInfo.percentage = 10
            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                prLoansStepOne,
                prLoansStepTwo,
                prLoansStepThree,
                prLoansStepFour,
                quoteSummary,
                quoteFinish,
            ]
        }
    }

    if(element.reference === 'quoteInterest') {
        if(!data || data?.permanentLoanOptionType !== null || data?.permanentLoanOptionType === 'NO') {
            quoteStart.stepStatus = true
            quoteInfo.stepStatus = true
            quoteInterest.currentStep = true
            quoteInterest.percentage = 40

            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                quoteSummary,
                quoteFinish,
            ]
        } else {
            quoteStart.stepStatus = true
            quoteInfo.stepStatus = true
            quoteInterest.currentStep = true
            quoteInterest.percentage = 20
            return [
                quoteStart,
                quoteInfo,
                quoteInterest,
                quoteStepThree,
                prLoansStepOne,
                prLoansStepTwo,
                prLoansStepThree,
                prLoansStepFour,
                quoteSummary,
                quoteFinish,
            ]
        }
    }

    if(element.reference === 'quoteStepThree') {
        quoteStart.stepStatus = true
        quoteInfo.stepStatus = true
        quoteInterest.stepStatus = true
        quoteStepThree.currentStep = true
        quoteStepThree.percentage = 60
        return [
            quoteStart,
            quoteInfo,
            quoteInterest,
            quoteStepThree,
            quoteSummary,
            quoteFinish,
        ]
    }

    if(element.reference === 'quoteSummary') {
        quoteStart.stepStatus = true
        quoteInfo.stepStatus = true
        quoteInterest.stepStatus = true
        quoteStepThree.stepStatus = true
        quoteSummary.currentStep = true
        quoteSummary.percentage = 80
        return [
            quoteStart,
            quoteInfo,
            quoteInterest,
            quoteStepThree,
            quoteSummary,
            quoteFinish,
        ]
    }


    if(element.reference === 'quoteFinish') {
        quoteStart.stepStatus = true
        quoteInfo.stepStatus = true
        quoteInterest.stepStatus = true
        quoteStepThree.stepStatus = true
        quoteSummary.stepStatus = true
        quoteFinish.currentStep = true
        quoteFinish.percentage = 100
        return [
            quoteStart,
            quoteInfo,
            quoteInterest,
            quoteStepThree,
            quoteSummary,
            quoteFinish,
        ]
    }
}


export default {
    generate: generate,
}