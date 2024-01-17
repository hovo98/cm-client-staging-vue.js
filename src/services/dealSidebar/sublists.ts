const dealLoanType = (choices, activeReference) => {
    if(choices.loan_type === 'PURCHASE') {
        return [
            {
                reference: 'dealLoanTypePurchase',
                stepStatus: false,
                currentStep: activeReference === 'dealLoanTypePurchase',
                title: 'Purchase Loan',
                percentage: 25,
            },
        ]
    }
    if(choices.loan_type === 'REFINANCE') {
        return [
            {
                reference: 'dealLoanTypeRefinance',
                stepStatus: activeReference === 'dealLoanExisting',
                currentStep: activeReference === 'dealLoanTypeRefinance',
                title: 'Refinance Loans',
                percentage: 25,
            },
            {
                reference: 'dealLoanExisting',
                stepStatus: false,
                currentStep: activeReference === 'dealLoanExisting',
                title: 'Existing Loans',
                percentage: 25,
            },
        ]
    }
    if(choices.loan_type === 'CONSTRUCTION') {
        return [
            {
                reference: 'dealLoanTypeConstruction',
                stepStatus: false,
                currentStep: activeReference === 'dealLoanTypeConstruction',
                title: 'Construction Loan',
                percentage: 25,
            },
        ]
    }
}

const dealPropertyType = (choices, activeReference) => {
    if(choices.propertyType === 'INVESTMENT') {
        return [
            {
                reference: 'dealPropertyTypeInvestment',
                stepStatus: activeReference === 'dealPropertyIncome' || activeReference === 'dealPropertyExpenses',
                currentStep: activeReference === 'dealPropertyTypeInvestment',
                title: 'Property Type Investment',
                percentage: 50,
            },
            {
                reference: 'dealPropertyIncome',
                stepStatus: activeReference === 'dealPropertyExpenses',
                currentStep: activeReference === 'dealPropertyIncome',
                title: 'Property Income',
                percentage: 50,
            },
            {
                reference: 'dealPropertyExpenses',
                stepStatus: false,
                currentStep: activeReference === 'dealPropertyExpenses',
                title: 'Property Expenses',
                percentage: 50,
            },
        ]
    }
    if(choices.propertyType === 'OWNER_OCCUPIED' || choices.propertyType === 'OWNER_OCUPIED') {
        return [
            {
                reference: 'dealPropertyTypeOwnerOccupied',
                stepStatus: activeReference === 'dealPropertyExpenses2',
                currentStep: activeReference === 'dealPropertyTypeOwnerOccupied',
                title: 'Owner Occupied',
                percentage: 50,
            },
            {
                reference: 'dealPropertyExpenses2',
                stepStatus: false,
                currentStep: activeReference === 'dealPropertyExpenses2',
                title: 'Property Expenses',
                percentage: 50,
            },
        ]
    }
    if(choices.propertyType === 'CONSTRUCTION') {
        return [
            {
                reference: 'dealPropertyTypeConstruction',
                stepStatus: activeReference === 'dealPropertyExpenses2',
                currentStep: activeReference === 'dealPropertyTypeConstruction',
                title: 'Construction',
                percentage: 50,
            },
            {
                reference: 'dealPropertyExpenses2',
                stepStatus: false,
                currentStep: activeReference === 'dealPropertyExpenses2',
                title: 'Property Expenses',
                percentage: 50,
            },
        ]
    }
}

const dealFinishManagePriority = (choices, activeReference) => {
    return [
        {
            reference: 'dealFinishDealSummary',
            stepStatus:
                activeReference === 'dealFinishManageLenders' ||
                activeReference === 'dealFinish',
            currentStep: activeReference === 'dealFinishDealSummary',
            title: 'Deal Summary',
            percentage: 100,
        },
        {
            reference: 'dealFinishManageLenders',
            stepStatus: activeReference === 'dealFinish',
            currentStep: activeReference === 'dealFinishManageLenders',
            title: 'Preferred Lenders',
            percentage: 100,
        },
        {
            reference: 'dealFinish',
            stepStatus: false,
            currentStep: activeReference === 'dealFinish',
            title: 'Finish',
            percentage: 100,
        },

    ]
}

export default {
    components: {
        dealLoanType: dealLoanType,
        dealPropertyType: dealPropertyType,
        dealFinishManagePriority: dealFinishManagePriority,
    },

}