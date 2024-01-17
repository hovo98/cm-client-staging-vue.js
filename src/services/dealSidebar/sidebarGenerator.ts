import references from '@/services/dealSidebar/references'
import sublists from '@/services/dealSidebar/sublists'

const generate = (element, args) => {
    /*
    * This is hack, because we don't have state updated from the component
    * */
    //
    if(element.reference === 'dealPropertyTypeConstruction') {
        args.propertyType = 'CONSTRUCTION'
    }

    const propertyInfo = references.propertyInfo()
    const dealLoanType = references.dealLoanType()
    const dealPropertyType = references.dealPropertyType()
    const dealSponsor = references.dealSponsor()
    const dealFinishManagePriority = references.dealFinishManagePriority()

    if(element.reference === 'propertyInfo') {
        propertyInfo.currentStep = true
        return [
            propertyInfo,
            dealLoanType,
            dealPropertyType,
            dealSponsor,
            dealFinishManagePriority,
        ]
    }
    /*
    * Loan Type
    * */
    if(element.reference === 'dealLoanType') {
        propertyInfo.currentStep = false
        propertyInfo.stepStatus = true
        dealLoanType.currentStep = true
        return [
            propertyInfo,
            dealLoanType,
            dealPropertyType,
            dealSponsor,
            dealFinishManagePriority,
        ]
    }
    if(args.loan_type === 'PURCHASE') {
        if(element.reference === 'dealLoanTypePurchase') {
            propertyInfo.stepStatus = true
            dealLoanType.currentStep = true
            dealLoanType.openSidebar = true
            dealLoanType.subList = sublists.components.dealLoanType(args, element.reference)
            return [
                propertyInfo,
                dealLoanType,
                dealPropertyType,
                dealSponsor,
                dealFinishManagePriority,
            ]
        }
    }
    if(args.loan_type === 'REFINANCE') {
        if(element.reference === 'dealLoanTypeRefinance') {
            propertyInfo.stepStatus = true
            dealLoanType.currentStep = true
            dealLoanType.openSidebar = true
            dealLoanType.subList = sublists.components.dealLoanType(args, element.reference)
            return [
                propertyInfo,
                dealLoanType,
                dealPropertyType,
                dealSponsor,
                dealFinishManagePriority,
            ]
        }
        if(element.reference === 'dealLoanExisting') {
            propertyInfo.stepStatus = true
            dealLoanType.currentStep = true
            dealLoanType.openSidebar = true
            dealLoanType.subList = sublists.components.dealLoanType(args, element.reference)
            return [
                propertyInfo,
                dealLoanType,
                dealPropertyType,
                dealSponsor,
                dealFinishManagePriority,
            ]
        }
    }
    if(args.loan_type === 'CONSTRUCTION') {
        if(element.reference === 'dealLoanTypeConstruction') {
            propertyInfo.stepStatus = true
            dealLoanType.currentStep = true
            dealLoanType.openSidebar = true
            dealLoanType.subList = sublists.components.dealLoanType(args, element.reference)
            return [
                propertyInfo,
                dealLoanType,
                dealPropertyType,
                dealSponsor,
                dealFinishManagePriority,
            ]
        }
    }

    /*
    * Property Type
    * */
    if(element.reference === 'dealPropertyType') {
        propertyInfo.stepStatus = true
        dealLoanType.stepStatus = true
        dealPropertyType.currentStep = true
        return [
            propertyInfo,
            dealLoanType,
            dealPropertyType,
            dealSponsor,
            dealFinishManagePriority,
        ]
    }
    /*
    * Property Type Investment
    * */
    if(args.propertyType === 'INVESTMENT'){
        if(element.reference === 'dealPropertyTypeInvestment') {
            propertyInfo.stepStatus = true
            dealLoanType.stepStatus = true
            dealPropertyType.currentStep = true
            dealPropertyType.openSidebar = true
            dealPropertyType.subList = sublists.components.dealPropertyType(args, element.reference)
            return [
                propertyInfo,
                dealLoanType,
                dealPropertyType,
                dealSponsor,
                dealFinishManagePriority,
            ]
        }
        if(element.reference === 'dealPropertyIncome') {
            propertyInfo.stepStatus = true
            dealLoanType.stepStatus = true
            dealPropertyType.currentStep = true
            dealPropertyType.openSidebar = true
            dealPropertyType.subList = sublists.components.dealPropertyType(args, element.reference)
            return [
                propertyInfo,
                dealLoanType,
                dealPropertyType,
                dealSponsor,
                dealFinishManagePriority,
            ]
        }
        if(element.reference === 'dealPropertyExpenses') {
            propertyInfo.stepStatus = true
            dealLoanType.stepStatus = true
            dealPropertyType.currentStep = true
            dealPropertyType.openSidebar = true
            dealPropertyType.subList = sublists.components.dealPropertyType(args, element.reference)
            return [
                propertyInfo,
                dealLoanType,
                dealPropertyType,
                dealSponsor,
                dealFinishManagePriority,
            ]
        }
    }

    /*
    * Property Type OwnerOccupier
    * */
    if(args.propertyType === 'OWNER_OCCUPIED' || args.propertyType === 'OWNER_OCUPIED') {
        if(element.reference === 'dealPropertyTypeOwnerOccupied') {
            propertyInfo.stepStatus = true
            dealLoanType.stepStatus = true
            dealPropertyType.currentStep = true
            dealPropertyType.openSidebar = true
            dealPropertyType.subList = sublists.components.dealPropertyType(args, element.reference)
            return [
                propertyInfo,
                dealLoanType,
                dealPropertyType,
                dealSponsor,
                dealFinishManagePriority,
            ]
        }
        if(element.reference === 'dealPropertyExpenses2') {
            propertyInfo.stepStatus = true
            dealLoanType.stepStatus = true
            dealPropertyType.currentStep = true
            dealPropertyType.openSidebar = true
            dealPropertyType.subList = sublists.components.dealPropertyType(args, element.reference)
            return [
                propertyInfo,
                dealLoanType,
                dealPropertyType,
                dealSponsor,
                dealFinishManagePriority,
            ]
        }
    }

    /*
    * Propert Type Construction
    * */
    if(args.propertyType === 'CONSTRUCTION') {
        if(element.reference === 'dealPropertyTypeConstruction') {
            propertyInfo.stepStatus = true
            dealLoanType.stepStatus = true
            dealPropertyType.currentStep = true
            dealPropertyType.openSidebar = true
            dealPropertyType.subList = sublists.components.dealPropertyType(args, element.reference)
            return [
                propertyInfo,
                dealLoanType,
                dealPropertyType,
                dealSponsor,
                dealFinishManagePriority,
            ]
        }

        if(element.reference === 'dealPropertyExpenses2') {
            propertyInfo.stepStatus = true
            dealLoanType.stepStatus = true
            dealPropertyType.currentStep = true
            dealPropertyType.openSidebar = true
            dealPropertyType.subList = sublists.components.dealPropertyType(args, element.reference)
            return [
                propertyInfo,
                dealLoanType,
                dealPropertyType,
                dealSponsor,
                dealFinishManagePriority,
            ]
        }
    }

    /*
    * Sponsor
    * */

    if(element.reference === 'dealSponsor') {
        propertyInfo.stepStatus = true
        dealLoanType.stepStatus = true
        dealPropertyType.stepStatus = true
        dealSponsor.currentStep = true
        return [
            propertyInfo,
            dealLoanType,
            dealPropertyType,
            dealSponsor,
            dealFinishManagePriority,
        ]
    }

    /*
    * Finish Manage Priority
    * */
    if(element.reference === 'dealFinishManagePriority') {
        propertyInfo.stepStatus = true
        dealLoanType.stepStatus = true
        dealPropertyType.stepStatus = true
        dealSponsor.stepStatus = true
        dealFinishManagePriority.openSidebar = true
        dealFinishManagePriority.currentStep = true
        dealFinishManagePriority.subList = sublists.components.dealFinishManagePriority(args, element.reference)
        return [
            propertyInfo,
            dealLoanType,
            dealPropertyType,
            dealSponsor,
            dealFinishManagePriority,
        ]
    }

    if(element.reference === 'dealFinishDealSummary') {
        propertyInfo.stepStatus = true
        dealLoanType.stepStatus = true
        dealPropertyType.stepStatus = true
        dealSponsor.stepStatus = true
        dealFinishManagePriority.openSidebar = true
        dealFinishManagePriority.currentStep = true
        dealFinishManagePriority.subList = sublists.components.dealFinishManagePriority(args, element.reference)
        return [
            propertyInfo,
            dealLoanType,
            dealPropertyType,
            dealSponsor,
            dealFinishManagePriority,
        ]
    }

    if(element.reference === 'dealFinishManageLenders') {
        propertyInfo.stepStatus = true
        dealLoanType.stepStatus = true
        dealPropertyType.stepStatus = true
        dealSponsor.stepStatus = true
        dealFinishManagePriority.openSidebar = true
        dealFinishManagePriority.currentStep = true
        dealFinishManagePriority.subList = sublists.components.dealFinishManagePriority(args, element.reference)
        return [
            propertyInfo,
            dealLoanType,
            dealPropertyType,
            dealSponsor,
            dealFinishManagePriority,
        ]
    }

    if(element.reference === 'dealFinish') {
        // alert('da')
        propertyInfo.stepStatus = true
        dealLoanType.stepStatus = true
        dealPropertyType.stepStatus = true
        dealSponsor.stepStatus = true
        dealFinishManagePriority.openSidebar = false
        dealFinishManagePriority.currentStep = false
        dealFinishManagePriority.stepStatus = true
        dealFinishManagePriority.subList = sublists.components.dealFinishManagePriority(args, element.reference)
        return [
            propertyInfo,
            dealLoanType,
            dealPropertyType,
            dealSponsor,
            dealFinishManagePriority,
        ]
    }

}


export default {
    generate: generate,
}