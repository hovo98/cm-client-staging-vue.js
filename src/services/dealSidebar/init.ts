const sidebarInit = () => {
    return [
        {
            reference: 'propertyInfo',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            subList: [],
            title: 'Property Information',
            percentage: 0,
        },
        {
            reference: 'dealLoanType',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            subList: [],
            title: 'Loan Type',
            percentage: 25,
        },
        {
            reference: 'dealPropertyType',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            subList: [],
            title: 'Property Type',
            percentage: 50,
        },
        {
            reference: 'dealSponsor',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            subList: [],
            title: 'Sponsor',
            percentage: 75,
        },
        {
            reference: 'dealFinishManagePriority',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            subList: [],
            title: 'Deal Priorities',
            percentage: 100,
        },
    ]
}

export default {
    init: sidebarInit,
}