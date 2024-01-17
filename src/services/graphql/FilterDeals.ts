import Api from '@/services/Api'
import { jsonToGraphQLQuery, EnumType } from "json-to-graphql-query"

const URL_API = 'graphql'

export default {
  /**
   * @author Nikola Popov
   * @description
   *
   * @param obj int
   */

  async getDealsBroker(objG) {
    // {context: 'GENERAL', filterName: 'GENERAL', searchTerms: '', loanSize: this.loanSize, assetTypes: [], sortBy: 'GENERAL'}

    objG.pagination.perPage = 10
    objG.obj.context = new EnumType(objG.obj.context)
    objG.obj.filterName = new EnumType(objG.obj.filterName)

    objG.obj.sortBy = {
      sort: new EnumType(objG.obj.sort),
      by: new EnumType(objG.obj.by),
    }

    delete objG.obj.sort
    delete objG.obj.by

    if (objG.obj.assetTypes.length === 0) {
      objG.obj.assetTypes = ["GENERAL"]
    }
    const arr = []
    objG.obj.assetTypes.forEach((element) => {
      arr.push(new EnumType(element))
    })
    objG.obj.assetTypes = arr
    const objectForm = {
      query: {
        dealsFilter: {
          __args: {
            pagination: objG.pagination,
            input: objG.obj,
          },
          paginatorInfo: {
            count: true,
            currentPage: true,
            firstItem: true,
            hasMorePages: true,
            lastItem: true,
            lastPage: true,
            perPage: true,
            total: true,
          },
          data: {
            id: true,
            step: true,
            show_address: true,
            finished_at: true,
            loan_type: true,
            property_type: true,
            deal_type: true,
            is_premium: true,
            type: true,
            location: {
              street_address: true,
              street_address_2: true,
              city: true,
              state: true,
              zip_code: true,
              place_id: true,
              sublocality: true,
              lat: true,
              long: true,
            },
            investment_details: {
              propType: true,
            },
            purchase_loan: {
              loan_amount: true,
            },
            sensitivity: {
              timeToClose: true,
              recourse: true,
              leverage: true,
              interestRate: true,
              fees: true,
              interestOnlyPeriod: true,
              nonPrepaymentPenalty: true,
            },
            total_quotes: true,
            has_new_quotes: true,
            loan_amount: true,
            messages: true,
          },
          tags: {
            context: true,
            filterName: true,
            searchTerms: true,
            loanSize: {
              min: true,
              max: true,
            },
            assetTypes: true,
            sortBy: {
              sort: true,
              by: true,
            },
          },
          assetTypes: true,
          dollarAmount: {
            max: true,
            min: true,
          },
        },
      },
    }

    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)
  },

  /**
   * @author Nikola Popov
   * @description
   *
   * @param obj int
   */

  async getDealsLender(objG) {
    objG.pagination.perPage = 10
    objG.obj.context = new EnumType(objG.obj.context)
    objG.obj.filterName = new EnumType(objG.obj.filterName)

    objG.obj.sortBy = {
      sort: new EnumType(objG.obj.sort),
      by: new EnumType(objG.obj.by),
    }

    delete objG.obj.sort
    delete objG.obj.by

    if (objG.obj.assetTypes.length === 0) {
      objG.obj.assetTypes = ["GENERAL"]
    }
    const arr = []
    objG.obj.assetTypes.forEach((element) => {
      arr.push(new EnumType(element))
    })
    objG.obj.assetTypes = arr
    const objectForm = {
      query: {
        dealsFilter: {
          __args: {
            pagination: objG.pagination,
            input: objG.obj,
          },
          paginatorInfo: {
            count: true,
            currentPage: true,
            firstItem: true,
            hasMorePages: true,
            lastItem: true,
            lastPage: true,
            perPage: true,
            total: true,
          },
          data: {
            id: true,
            step: true,
            finished_at: false,
            show_address: true,
            loan_type: true,
            property_type: true,
            type: true,
            quoted: true,
            location: {
              street_address: true,
              city: true,
              state: true,
              zip_code: true,
              place_id: true,
              sublocality: true,
              lat: true,
              long: true,
            },
            investment_details: {
              propType: true,
            },
            purchase_loan: {
              loan_amount: true,
            },
            sensitivity: {
              timeToClose: true,
              recourse: true,
              leverage: true,
              interestRate: true,
              fees: true,
              interestOnlyPeriod: true,
              nonPrepaymentPenalty: true,
            },
            total_quotes: true,
            has_new_quotes: true,
            loan_amount: true,
            messages: true,
            quotes: {
              id: true,
              seen: true,
              lenderID: true,
              status: true,
              lenderFirstName: true,
              lenderLastName: true,
              lenderPhone: true,
              lenderEmail: true,
              lenderProfileImage: true,
              lenderBiography: true,
              lenderSpecialty: true,
              lenderLinkedin_url: true,
            },
          },
          tags: {
            context: true,
            filterName: true,
            searchTerms: true,
            loanSize: {
              min: true,
              max: true,
            },
            assetTypes: true,
            sortBy: {
              sort: true,
              by: true,
            },
          },
          assetTypes: true,
          dollarAmount: {
            max: true,
            min: true,
          },
        },
      },
    }

    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)
  },

  /**
   * @author Nikola Popov
   * @description
   *
   * @param obj int
   */
  async sendToLenders(obj) {
    const objectForm = {
      mutation: {
        shareDeals: {
          __args: {
            input: {
              id: obj.ids,
              email: obj.emails,
            },
          },
          errorMessage: {
            message: true,
          },
        },
      },
    }

    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)
  },

  /**
   * @author Nikola Popov
   * @description
   *
   * @param obj int
   */
  async blockALenders(/*arr*/) {
    /** TODO @nikola for post-mvp */
    const query: any = {
      query: `query {

            }`,
    }

    return await Api.post(URL_API, query)
  },

  /**
   * @author Nikola Popov
   * @description
   *
   * @param array
   */
  async deleteDeal(arr) {
    const objectForm = {
      mutation: {
        deleteDeals: {
          __args: {
            input: arr,
          },
          status: true,
        },
      },
    }
    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)
  },

  /**
   * @author Nikola Popov
   * @description
   *
   * @param array
   */
  async saveDeal(arr) {
    const objectForm = {
      mutation: {
        saveDeals: {
          __args: {
            input: arr,
          },
          status: true,
          message: true,
        },
      },
    }
    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)
  },

  async editDeal(id) {
    const objectForm = {
      mutation: {
        DealEdit: {
          __args: {
            input: id,
          },
          status: true,
          message: true,
          finished: true,
        },
      },
    }
    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)
  },

  /**
   * @author Nikola Popov
   * @description
   *
   * @param array
   */
  async archiveDeal(arr) {
    const objectForm = {
      mutation: {
        archiveDeals: {
          __args: {
            input: arr,
          },
          status: true,
          message: true,
        },
      },
    }
    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)
  },

  async unarchivedDeal(arr) {
    const objectForm = {
      mutation: {
        unarchivedDeals: {
          __args: {
            input: arr,
          },
          status: true,
        },
      },
    }
    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)
  },

  async unsavedDeal(arr) {
    const objectForm = {
      mutation: {
        unsavedDeals: {
          __args: {
            input: arr,
          },
          status: true,
        },
      },
    }
    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)
  },

  async changeDealStatus(obj) {
    const objectForm = {
      query: {
        brokerDealsSetTermsheet: {
          __args: {
            input: {
              deal: obj.deal,
              term: obj.id,
            },
          },
          status: true,
        },
      },
    }
    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }
    return await Api.post(URL_API, query)
  },

  async skipDealChange(obj) {
    const objectForm = {
      mutation: {
        ignoreDealIndividual: {
          __args: {
            deal_id: obj.id,
          },
          status: true,
          message: true,
        },
      },
    }
    const query: any = {
      query: jsonToGraphQLQuery(objectForm, { pretty: true }),
    }

    return await Api.post(URL_API, query)
  },

  async getQuoteByDealFilter(obj) {
    const query: any = {
      query: `query {
                lenderDealsIndividualQuotes(
                    input: {
                        deal: ${obj.id}
                    }
                ) {
                    quotes {
                        id
                        dollarAmount
                        interestRate
                        rateTerm
                        origFee
                        company
                        status
                    }
                    quoteLink
                }
            }`,
    }

    return await Api.post(URL_API, query)
  },

  async brokerQuoteByDealId(obj) {
    const query: any = {
      query: `query {
                brokerDealsIndividual(
                    input: {
                        deal: ${obj.id}
                    }
                ) {
                    lender {
                        ${obj.showLenderName ? 'firstName' : ''}
                        ${obj.showLenderName ? 'lastName' : ''}
                        id
                        company
                    }
                    quotes {
                        id
                        dollarAmount
                        interestRate
                        rateTerm
                        origFee
                        status
                    }
                }
            }`,
    }

    return await Api.post(URL_API, query)
  },

  /**
   * @author Nikola Popov
   * @description
   *
   */
  async getDealById(objG) {
    const query: any = {
      query: `query {
                dealObject(
                    input: {
                        id: ${objG.id}
                    }
                ) {
                    status
                    finished_at_individual
                    name
                    quoted
                    deal {
                        type_of_loans
                        id
                        termsheet
                        property_type
                        show_address
                        updated_at
                        finished
                        step
                        deal_type
                        is_premium
                        sensitivity {
                            timeToClose
                            recourse
                            leverage
                            interestRate
                            fees
                            interestOnlyPeriod
                            nonPrepaymentPenalty
                        }
                        owner_occupied {
                            business_name
                            business_description
                            sales_amount
                            profit_amount
                            borrower_own
                            business_age
                            sales_amount_YTD
                            profit_amount_YTD
                            employees
                        }
                        investment_details {
                            propType
                            mixedUse
                            retailAmount
                            retailSquare
                            retailType
                            retailNumberOfUnitsOccupied
                            retailSquareFootageOccupied
                            multiAmount
                            multiSquare
                            multiNumberOfUnitsOccupied
                            multiSquareFootageOccupied
                            officeAmount
                            officeSquare
                            officeNumberOfUnitsOccupied
                            officeSquareFootageOccupied
                            warehouseAmount
                            warehouseSquare
                            warehouseNumberOfUnitsOccupied
                            warehouseSquareFootageOccupied
                            numberUnit
                            numberUnitOccupied
                            squareFootage
                            squareFootageOccupied
                            proposedUse
                            noteToLender

                            amountOfUnits
                            rentableSellable
                            retailFloors
                            multiAmountOfUnits
                            multiRentableSellable
                            multiFloors
                            officeAmountOfunits
                            officeRentableSellable
                            officeFloors
                            industrialAmountOfUnits
                            industrialRentableSellable
                            industrialFloors
                        }
                        construction {
                            date
                            land_cost
                            current_value
                            hard_cost
                            soft_cost
                            contractor_name
                            amount_units
                            square_footage
                            floors
                            plans
                            second_projection
                            projections
                            projections_sales
                            projections_per_units
                            projections_per_sf
                            rental_per
                            rental_amount
                            rental_projections_per_units
                            rental_projections_per_sf
                            projectionMixedUse {
                              tag
                              projections
                              projections_sales
                              projections_per_units
                              projections_per_sf
                              rental_per
                              rental_amount
                              rental_projections_per_units
                              rental_projections_per_sf
                              plans
                              second_projection
                              plansOrder
                            }
                        }
                        existing {
                            propertyType
                            free
                            warehouse
                            lender
                        }
                        expenses {
                            taxNumber
                            tax
                            expDate
                            phaseStructure
                            payroll
                            insurance
                            repairs
                            payrollAmount
                            electricity
                            electricityAmount
                            gas
                            gasAmount
                            commonArea
                            commonAreaAmount
                            water
                            waterAmount
                            management
                            managementAmount
                            legal
                            triple
                            reimbursement
                            otherExpenses {
                                type
                                amount
                            }
                            additionalNotes
                            elevatorMaintenanceAmount
                            elevatorMaintenance
                            ooSewerAmount
                            gasSeparatelyMetered
                            managementCompanyName
                            ooWaterAmount
                            waterSeparatelyMetered
                            electricitySeparatelyMetered
                            totalExpenses
                            netOperatingIncome
                            totalBusinessOperatingIncome
                        }
                        refinance_loan {
                            date
                            purchasePrice
                            currentValue
                            list
                            loanAmount
                        }
                        construction_loan {
                            buying_land
                            debt_on_property
                            purchase_price
                            purchase_date
                            debt_amount
                            lender_name
                            loanAmount
                        }
                        purchase_loan {
                            price
                            estimated_value
                            estimated_cap_rate
                            days_to_close
                            loan_amount
                        }
                        sponsor {
                            sponsorInfo {
                                name
                                ownership
                                years_experience
                                family_experience
                                annual_income
                                annual_expenses
                                liabilities
                                assets_real_estate
                                assets_companies
                                assets_other
                                assets_liquid
                                net_worth
                                net_income
                                total_assets
                            }
                        }
                        loan_type
                        location {
                            street_address
                            street_address_2
                            city
                            state
                            zip_code
                            place_id
                            lat
                            long
                        }
                        block_and_lot {
                            blockAndLot
                            block
                            lot
                        }
                        rent_roll {
                            table {
                                occupied
                                unit_type
                                name
                                unit
                                bedroom
                                lease_start
                                lease_end
                                sf
                                monthle_rent
                                annual_rent
                                annual_rent_sf
                            },
                            vacancy
                            occupiedGroos
                            annual_income
                            annual_sf_total
                            potential_income
                            increaseProjection
                            increasedNotes
                            betterNotes

                            tiBudget
                            lcBudget
                            capExBudget

                            timeFrame
                            plannedImprovements
                            annual_total
                            monthle_total
                            other_income {
                                type
                                amount
                            }
                            totalIncome
                        }
                    },
                    terms {
                        id
                        title
                    }
                    termsheet_status
                    is_skipped

                    deal_editable
                    until_next_edit
                }
            }`,
    }
    return await Api.post(URL_API, query)
  },
}
