 /* eslint-disable */ 

import sidebarGenerator from "@/services/quoteSidebar/sidebarGenerator";

 /**
 * @author Vladislav Mosnak
 * @description Generate sidebar list
 * 
 * Please forgive me for the next 431 line of garbage
 */

const sidebar_init = (a, b) => {
    let construction = [
        {
            title: 'Start',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            reference: 'quoteStart',
            percentage: 0,
        },
        {
            title: 'Loan Amount',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            reference: 'quoteInfo',
            percentage: 25,
        },
        {
            title: 'Interest rate',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            reference: 'quoteInterest',
            percentage: 50,
        },
        {
            title: 'Loan Details',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            reference: 'quoteStepThree',
            percentage: 75,
        },
        {
            title: 'Review Quote Summary',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            reference: 'quoteSummary',
            percentage: a && b ? 93.75 : 75,
        },
        {
            title: 'Quote Submitted',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            reference: 'quoteFinish',
            percentage: 100,
        },
    ]

    let purchaseAndRefinance = [
        {
            title: 'Permanent Loan Amount',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            reference: 'prLoansStepOne',
            percentage: a && b ? 75 : 0,
        },
        {
            title: 'Permanent Loan Rate',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            reference: 'prLoansStepTwo',
            percentage: a && b ? 81.25 : 25,
        },
        {
            title: 'Permanent Penalty Details',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            reference: 'prLoansStepThree',
            percentage: a && b ? 87.5 : 50,
        },
        {
            title: 'Permanent Interest Details',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            reference: 'prLoansStepFour',
            percentage: a && b ? 93.75 : 75,
        },
        {
            title: 'Review Quote Summary',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            reference: 'quoteSummary',
            percentage: a && b ? 93.75 : 75,
        },
        {
            title: 'Quote Submitted',
            stepStatus: false,
            currentStep: false,
            openSidebar: false,
            reference: 'quoteFinish',
            percentage: 100,
        },
    ]

    let result = []
    if(a) {
        result = result.concat(construction)
    }
    if(b) {
        result = result.concat(purchaseAndRefinance)
    }

    return result
}

const findByReference = (list, reference) => {
    for(let i=0; i < list.length; i++) {
        if(list[i].reference === reference) {
            return list[i]
        } else if(list[i].subList !== undefined) {
            for(let j=0; j<list[i].subList.length; j++) {
                if(list[i].subList[j].reference === reference) {
                    return list[i].subList[j]
                }
            }
        }
    }
}

const findUnitReference = (ref, list = []) => {
    if(list.length === 0) {
        let a = false;
        let b= false;
        if(ref === 'prLoansStepOne') {
            b = true;
        }
        if(ref === 'quoteStart') {
            a = true;
        }
        return findByReference(sidebar_init(a, b), ref)
    }
    return findByReference(list, ref)
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
        init: sidebar_init,

        replaceElement: (element, sidebarChoices) => {

            return sidebarGenerator.generate(element, sidebarChoices);
        }
    }
}                     