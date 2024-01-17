const parentReference = child => {
    if(
        child === 'dealLoanTypePurchase' ||
        child === 'dealLoanTypeRefinance' ||
        child === 'dealLoanTypeConstruction'
    ) {
        return 'dealLoanType'
    }
    if(
        child === 'dealPropertyTypeInvestment' ||
        child === 'dealPropertyIncome' ||
        child === 'dealPropertyExpenses' ||
        child === 'dealPropertyTypeOwnerOccupied' ||
        child === 'dealPropertyExpenses2' ||
        child === 'dealPropertyTypeConstruction' ||
        child === 'dealPropertyExpenses'
    ) {
        return 'dealPropertyType'
    }

    return ''
}

export default {
    parent: parentReference,
}