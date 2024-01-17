const quoteStart = () => {
    return {
        reference: 'quoteStart',
        stepStatus: false,
        currentStep: false,
        openSidebar: false,
        subList: [],
        title: 'Start',
        percentage: 0,
    }

}

const quoteInfo = () => {
    return {
        reference: 'quoteInfo',
        stepStatus: false,
        currentStep: false,
        openSidebar: false,
        subList: [],
        title: 'Loan Amount',
        percentage: 25,
    }
}

const quoteInterest = () => {
    return {
        reference: 'quoteInterest',
        stepStatus: false,
        currentStep: false,
        openSidebar: false,
        subList: [],
        title: 'Interest rate',
        percentage: 50,
    }
}

const quoteStepThree = () => {
    return {
        reference: 'quoteStepThree',
        stepStatus: false,
        currentStep: false,
        openSidebar: false,
        subList: [],
        title: 'Loan Details',
        percentage: 75,
    }
}


/**/
const prLoansStepOne = () => {
    return {
        reference: 'prLoansStepOne',
        stepStatus: false,
        currentStep: false,
        openSidebar: false,
        subList: [],
        title: 'Loan Amount',
        percentage: 100,
    }
}

const prLoansStepTwo = () => {
    return {
        reference: 'prLoansStepTwo',
        stepStatus: false,
        currentStep: false,
        openSidebar: false,
        subList: [],
        title: 'Loan Rate',
        percentage: 100,
    }
}

const prLoansStepThree = () => {
    return {
        reference: 'prLoansStepThree',
        stepStatus: false,
        currentStep: false,
        openSidebar: false,
        subList: [],
        title: 'Penalty Details',
        percentage: 100,
    }
}

const prLoansStepFour = () => {
    return {
        reference: 'prLoansStepFour',
        stepStatus: false,
        currentStep: false,
        openSidebar: false,
        subList: [],
        title: 'Interest Details',
        percentage: 100,
    }
}

const quoteSummary = () => {
    return {
        reference: 'quoteSummary',
        stepStatus: false,
        currentStep: false,
        openSidebar: false,
        subList: [],
        title: 'Review Your Soft Quote',
        percentage: 100,
    }
}

const quoteFinish = () => {
    return {
        reference: 'quoteFinish',
        stepStatus: false,
        currentStep: false,
        openSidebar: false,
        subList: [],
        title: 'Soft Quote Submitted',
        percentage: 100,
    }
}

export default {
    quoteStart: quoteStart,
    quoteInfo: quoteInfo,
    quoteInterest: quoteInterest,
    quoteStepThree: quoteStepThree,
    prLoansStepOne: prLoansStepOne,
    prLoansStepTwo: prLoansStepTwo,
    prLoansStepThree: prLoansStepThree,
    prLoansStepFour: prLoansStepFour,
    quoteSummary: quoteSummary,
    quoteFinish: quoteFinish,
}

