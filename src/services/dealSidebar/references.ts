const propertyInfo = () => {
    return {
        reference: 'propertyInfo',
        stepStatus: false,
        currentStep: false,
        openSidebar: false,
        subList: [],
        title: 'Property Information',
        percentage: 0,
    }

}

const dealLoanType = () => {
    return {
        reference: 'dealLoanType',
        stepStatus: false,
        currentStep: false,
        openSidebar: false,
        subList: [],
        title: 'Loan Type',
        percentage: 25,
    }
}

const dealPropertyType = () => {
    return {
        reference: 'dealPropertyType',
        stepStatus: false,
        currentStep: false,
        openSidebar: false,
        subList: [],
        title: 'Property Type',
        percentage: 50,
    }
}

const dealSponsor = () => {
    return {
        reference: 'dealSponsor',
        stepStatus: false,
        currentStep: false,
        openSidebar: false,
        subList: [],
        title: 'Sponsor',
        percentage: 75,
    }
}

const dealFinishManagePriority = () => {
    return {
        reference: 'dealFinishManagePriority',
        stepStatus: false,
        currentStep: false,
        openSidebar: false,
        subList: [],
        title: 'Deal Priorities',
        percentage: 100,
    }
}

export default {
    propertyInfo: propertyInfo,
    dealLoanType: dealLoanType,
    dealPropertyType: dealPropertyType,
    dealSponsor: dealSponsor,
    dealFinishManagePriority: dealFinishManagePriority,
}

