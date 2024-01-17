/* eslint-disable */

import sidebarInit from "@/services/dealSidebar/init";
import sidebarGenerator from "@/services/dealSidebar/sidebarGenerator";

const sidebar_init = (withHistory = false) => {
    const state = [
        {
            title: 'Property Information',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            reference: 'propertyInfo',
            percentage: 0,
        },
        {
            title: 'Loan Type',
            stepStatus: false,
            currentStep: false,
            reference: 'dealLoanType',
            openSidebar: false,
            percentage: 25,
            subList: [
                {
                    title: 'Purchase Loan',
                    stepStatus: false,
                    currentStep: false,
                    reference: 'dealLoanTypePurchase',
                    percentage: 25,
                },
                {
                    title: 'Refinance Loans',
                    stepStatus: false,
                    currentStep: false,
                    reference: 'dealLoanTypeRefinance',
                    percentage: 25,
                },
                {
                    title: 'Construction Loan',
                    stepStatus: false,
                    currentStep: false,
                    reference: 'dealLoanTypeConstruction',
                    percentage: 25,
                },
                {
                    title: 'Existing Loans',
                    stepStatus: false,
                    currentStep: false,
                    reference: 'dealLoanExisting',
                    percentage: 25,
                },
            ]
        },
        {
            title: 'Property Type',
            stepStatus: false,
            currentStep: false,
            reference: 'dealPropertyType',
            openSidebar: false,
            percentage: 50,
            subList: [
                {
                    title: 'Property Type Investment',
                    stepStatus: false,
                    currentStep: false,
                    reference: 'dealPropertyTypeInvestment',
                    percentage: 50,
                },
                {
                    title: 'Property Income',
                    stepStatus: false,
                    currentStep: false,
                    reference: 'dealPropertyIncome',
                    percentage: 50,
                },
                {
                    title: 'Property Expenses',
                    stepStatus: false,
                    currentStep: false,
                    reference: 'dealPropertyExpenses',
                    percentage: 50,
                },
                {
                    title: 'Property Expenses',
                    stepStatus: false,
                    currentStep: false,
                    reference: 'dealPropertyExpenses2',
                    percentage: 50,
                },
                {
                    title: 'Property Type Owner Occupied',
                    stepStatus: false,
                    currentStep: false,
                    reference: 'dealPropertyTypeOwnerOccupied',
                    percentage: 50,
                },
                {
                    title: 'Property Type Construction',
                    stepStatus: false,
                    currentStep: false,
                    reference: 'dealPropertyTypeConstruction',
                    percentage: 50,
                },
            ]
        },

        {
            title: 'Sponsor',
            stepStatus: false,
            currentStep: false,
            reference: 'dealSponsor',
            openSidebar: false,
            percentage: 75,
        },
        {
            title: 'Deal Priorities',
            stepStatus: false,
            currentStep: false,
            reference: 'dealFinishManagePriority',
            openSidebar: false,
            percentage: 100,
            subList: [
                {
                    title: 'Deal Priorities',
                    stepStatus: false,
                    currentStep: false,
                    reference: 'dealFinishManagePriority',
                    percentage: 100
                },
                {
                    title: 'Deal Summary',
                    stepStatus: false,
                    currentStep: false,
                    reference: 'dealFinishDealSummary',
                    percentage: 100
                },
                {
                    title: 'Finish',
                    stepStatus: false,
                    currentStep: false,
                    reference: 'dealFinish',
                    percentage: 100
                },
                {
                    title: 'Preferred Lenders',
                    stepStatus: false,
                    currentStep: false,
                    reference: 'dealFinishManageLenders',
                    percentage: 100
                },
            ]
        },
    ]
    if (withHistory) {
        return {
            state: state,
            history: []
        }
    } else {
        return state
    }
}
const findByReference = (list, reference) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].reference === reference) {
            return list[i]
        } else if (list[i].subList !== undefined) {
            for (let j = 0; j < list[i].subList.length; j++) {
                if (list[i].subList[j].reference === reference) {
                    return list[i].subList[j]
                }
            }
        }
    }
}
const findUnitReference = ref => {
    return findByReference(sidebar_init(), ref)
}

// ref => fn string
const command = ref_in => {
    // string => fn string
    return command => {
        // string => command
        return {
            // command.run => async callback => callback (ref, int)
            run: async (success, fail = null) => {
                let ref_out = ''
                switch (command) {
                    case 'next':
                        ref_out = await ref_in.next()
                        if (ref_out) {
                            success(ref_out, 1)
                        } else {
                            if (fail) {
                                fail(ref_in, 0)
                            }
                        }
                        break;
                    case 'prev':
                        ref_out = 'prev'
                        if (ref_out) {
                            success(ref_out, 0)
                        }
                        break;
                    case 'skip':
                        ref_out = await ref_in.skip()
                        if (ref_out) {
                            success(ref_out, 0)
                        }
                        break;
                    default:
                        success('', 0);
                }
            }
        }
    }
}

export default {

  stepper: {
    command: command
  },

  sidebar: {
    helpers: {
      getUnitReference: findUnitReference
    },
    init: sidebarInit.init,

    replaceElement: (element, sidebarChoices) => {
      return sidebarGenerator.generate(element, sidebarChoices);
    }
  }
}