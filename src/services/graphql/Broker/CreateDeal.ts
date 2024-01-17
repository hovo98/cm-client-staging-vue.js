import Api from '@/services/Api'
import { jsonToGraphQLQuery, EnumType } from "json-to-graphql-query"
const URL_API = 'graphql'

export default {
  async setLastStepStatus(objG) {
    if (!objG.id) return
    const objectForm = {
      mutation: {
        dealStepStatus: {
          __args: {
            input: {
              id: objG.id,
              status: JSON.stringify(objG.status),
            },
          },
          id: true,
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
   *  create location and block and lot
   */
  async setBrokerDealInfo(objG) {
    let obj: any = {}
    if (objG.id) {
      obj = {
        query: `mutation {
                    deal(input: {
                        id: ${objG.id}
                        step: "${objG.step}"
                        location: {
                            street_address: "${objG.address}",
                            street_address_2: "${objG.address1}",
                            city: "${objG.city}",
                            state: "${objG.state}",
                            zip_code: "${objG.postal_code}",
                            place_id: "${objG.place_id}",
                            sublocality: "${objG.sublocality}",
                            lat: ${objG.lat},
                            long: ${objG.long},
                            country: "United States",
                            county: "${objG.county}",
                            street: "${objG.street}",
                        },
                        block_and_lot: {
                            blockAndLot: "${objG.blockAndLot}"
                            block: "${objG.block}",
                            lot: "${objG.lot}"
                        }
                    }) {
                        id
                        property_type
                        location {
                            street_address
                            street_address_2
                            city
                            state
                            zip_code
                            sublocality
                            county
                            lat
                            long
                        }
                        block_and_lot {
                            blockAndLot
                            block
                            lot
                        }
                    }
                }`,
      }
    } else {
      obj = {
        query: `mutation {
                    deal(input: {
                        step: "${objG.step}"
                        location: {
                            street_address: "${objG.address}",
                            street_address_2: "${objG.address1}",
                            city: "${objG.city}",
                            state: "${objG.state}",
                            zip_code: "${objG.postal_code}",
                            place_id: "${objG.place_id}",
                            sublocality: "${objG.sublocality}",
                            lat: ${objG.lat},
                            long: ${objG.long},
                            country: "United States",
                            county: "${objG.county}",
                            street: "${objG.street}",
                        },
                        block_and_lot: {
                            blockAndLot: "${objG.blockAndLot}"
                            block: "${objG.block}",
                            lot: "${objG.lot}"
                        }
                    }) {
                        id
                        property_type
                        location {
                            street_address
                            street_address_2
                            city
                            state
                            zip_code
                            sublocality
                            county
                            lat
                            long
                        }
                        block_and_lot {
                            blockAndLot
                            block
                            lot
                        }
                    }
                }`,
      }
    }

    return await Api.post(URL_API, obj)
  },

  /**
   * @author Nikola Popov
   * @description
   *  create sponsor
   */
  async setBrokerSponsor(objG) {
    const objectForm = {
      mutation: {
        deal: {
          __args: {
            input: {
              id: objG.id,
              step: objG.step,
              sponsor: {
                sponsorInfo: objG.sponsorInfo,
              },
            },
          },
          id: true,
          property_type: true,
          sponsor: {
            sponsorInfo: {
              name: true,
              ownership: true,
              years_experience: true,
              family_experience: true,
              annual_income: true,
              annual_expenses: true,
              assets_real_estate: true,
              assets_companies: true,
              assets_other: true,
              assets_liquid: true,
              liabilities: true,
              net_worth: true,
              net_income: true,
              total_assets: true,
            },
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
   *  create loan type
   */
  async setBrokerDealLoanType(objG) {
    const obj: any = {
      query: `mutation{
                deal(input: {
                    id: ${objG.id}
                    step: "${objG.step}"
                    loan_type: ${objG.loan_type}
                    show_address_purchase: "${objG.show_address_purchase}"
                }) {
                    property_type
                    loan_type
                }
              }`,
    }
    return await Api.post(URL_API, obj)
  },

  /**
   * @author Nikola Popov
   * @description
   *  create Purchase
   */
  async setBrokerDealPurchase(objG) {
    const obj: any = {
      query: `mutation{
                deal(input: {
                    id: ${objG.id}
                    step: "${objG.step}"
                    purchase_loan: {
                        price: ${objG.price_purchase}
                        estimated_value: "${objG.estimated_value_purchase}"
                        estimated_cap_rate: "${objG.estimated_cap_rate_purchase}"
                        days_to_close: "${objG.days_to_close_purchase}"
                        loan_amount: ${objG.loan_amount_requested_purchase}
                        ltc_purchase: "${objG.ltc_purchase}"
                    }
                }) {
                    property_type
                    purchase_loan {
                        price
                        estimated_value
                        estimated_cap_rate
                        days_to_close
                        loan_amount
                    }
                }
              }`,
    }
    return await Api.post(URL_API, obj)
  },

  /**
   * @author Nikola Popov
   * @description
   *  create Construction
   */
  async setBrokerDealConstruction(objG) {
    const obj: any = {
      query: `mutation {
                deal(input: {
                    id: ${objG.id}
                    step: "${objG.step}"
                    construction_loan: {
                        buying_land: "${objG.buying_land}"
                        debt_on_property: "${objG.debt_on_property}"
                        purchase_price: "${objG.purchase_price}"
                        purchase_date: "${objG.purchase_date}"
                        debt_amount: "${objG.debt_amount}"
                        lender_name: "${objG.lender_name}"
                        loanAmount: ${objG.loanAmount}
                        show_address_construction: "${objG.show_address_construction}"
                    }
                }) {
                    property_type
                    construction_loan {
                        buying_land
                        debt_on_property
                        purchase_price
                        purchase_date
                        debt_amount
                        lender_name
                        loanAmount
                        show_address_construction
                    }
                }
            }`,
    }
    return await Api.post(URL_API, obj)
  },

  /**
   * @author Nikola Popov
   * @description
   *  create proporty Type
   */
  async setBrokerDealPropertyType(objG) {
    const obj: any = {
      query: `mutation{
                deal(input: {
                    id: ${objG.id}
                    step: "${objG.step}"
                    property_type: ${objG.property_type}
                }) {
                    property_type
                }
            }`,
    }
    return await Api.post(URL_API, obj)
  },

  /**
   * @author Nikola Popov
   * @description
   *  create Property Income
   */
  async setBrokerDealInvestment(objG) {
    const arr = []
    if (objG.mixedUse.length > 0) {
      objG.mixedUse.forEach((element) => {
        arr.push(new EnumType(element))
      })
    }
    const enums = new EnumType(objG.propType)

    const objectForm = {
      mutation: {
        deal: {
          __args: {
            input: {
              id: objG.id,
              step: objG.step,
              investment_details: {
                mixedUse: arr,
                propType: enums,
                retailAmount: objG.retailAmount,
                retailSquare: objG.retailSquare,
                retailType: objG.retailType,
                retailNumberOfUnitsOccupied: objG.retailNumberOfUnitsOccupied,
                retailSquareFootageOccupied: objG.retailSquareFootageOccupied,
                multiAmount: objG.multiAmount,
                multiSquare: objG.multiSquare,
                multiNumberOfUnitsOccupied: objG.multiNumberOfUnitsOccupied,
                multiSquareFootageOccupied: objG.multiSquareFootageOccupied,
                officeAmount: objG.officeAmount,
                officeSquare: objG.officeSquare,
                officeNumberOfUnitsOccupied: objG.officeNumberOfUnitsOccupied,
                officeSquareFootageOccupied: objG.officeSquareFootageOccupied,
                warehouseAmount: objG.warehouseAmount,
                warehouseSquare: objG.warehouseSquare,
                warehouseNumberOfUnitsOccupied:
                  objG.warehouseNumberOfUnitsOccupied,
                warehouseSquareFootageOccupied:
                  objG.warehouseSquareFootageOccupied,
                numberUnit: objG.numberUnit,
                numberUnitOccupied: objG.numberUnitOccupied,
                squareFootage: objG.squareFootage,
                squareFootageOccupied: objG.squareFootageOccupied,
                proposedUse: objG.proposedUse,
                noteToLender: objG.noteToLender,
              },
            },
          },
          id: true,
          property_type: true,
          investment_details: {
            propType: true,
            mixedUse: true,
            retailAmount: true,
            retailSquare: true,
            retailType: true,
            multiAmount: true,
            multiSquare: true,
            officeAmount: true,
            officeSquare: true,
            warehouseAmount: true,
            warehouseSquare: true,
            numberUnit: true,
            numberUnitOccupied: true,
            squareFootage: true,
            squareFootageOccupied: true,
            proposedUse: true,
            noteToLender: true,
            retailNumberOfUnitsOccupied: true,
            retailSquareFootageOccupied: true,
            multiNumberOfUnitsOccupied: true,
            multiSquareFootageOccupied: true,
            officeNumberOfUnitsOccupied: true,
            officeSquareFootageOccupied: true,
            warehouseNumberOfUnitsOccupied: true,
            warehouseSquareFootageOccupied: true,
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
   *  create Property Income
   */
  async setBrokerDealPropertyIncome(objG) {
    const objectForm = {
      mutation: {
        deal: {
          __args: {
            input: {
              id: objG.id,
              step: objG.form.step,
              rent_roll: {
                table: objG.form.table,
                annual_income: objG.form.annual_income,
                potential_income: objG.form.potential_income,
                increaseProjection: objG.form.increaseProjection,
                increasedNotes: objG.form.increasedNotes,
                betterNotes: objG.form.betterNotes,
                capExBudget: objG.form.capExBudget,
                tiBudget: objG.form.tiBudget,
                lcBudget: objG.form.lcBudget,
                timeFrame: objG.form.timeFrame,
                plannedImprovements: objG.form.plannedImprovements,
                enterCopy: objG.form.enterCopy,
                other_income: objG.form.other_income,
                vacancy: objG.form.vacancy,
                occupiedGroos: objG.form.occupiedGroos,
              },
            },
          },
          id: true,
          property_type: true,
          rent_roll: {
            table: {
              occupied: true,
              unit_type: true,
              name: true,
              unit: true,
              bedroom: true,
              lease_start: true,
              lease_end: true,
              sf: true,
              monthle_rent: true,
              annual_rent: true,
              annual_rent_sf: true,
            },
            vacancy: true,
            occupiedGroos: true,
            annual_sf_total: true,
            annual_income: true,
            potential_income: true,
            increaseProjection: true,
            increasedNotes: true,
            betterNotes: true,
            capExBudget: true,
            tiBudget: true,
            lcBudget: true,
            timeFrame: true,
            plannedImprovements: true,
            enterCopy: true,
            other_income: {
              type: true,
              amount: true,
            },
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
   *  create Property Income
   */
  async setBrokerDealRefinance(objG) {
    const obj: any = {
      query: `mutation{
                deal(input: {
                    id: ${objG.id}
                    step: "${objG.step}"
                    refinance_loan: {
                        date: "${objG.date}"
                        purchasePrice: "${objG.purchasePrice}"
                        currentValue: "${objG.currentValue}"
                        list: "${objG.list}"
                        loanAmount: ${objG.loanAmount}
                    }
                }) {
                    property_type
                    refinance_loan {
                        date
                        purchasePrice
                        currentValue
                        list
                        loanAmount
                    }
                }
              }`,
    }
    return await Api.post(URL_API, obj)
  },

  /**
   * @author Nikola Popov
   * @description
   *  create Property Expenses
   */
  async setBrokerDealPropertyExpenses(objG) {
    const objectForm = {
      mutation: {
        deal: {
          __args: {
            input: {
              id: objG.id,
              step: objG.step,
              expenses: {
                taxNumber: objG.taxNumber,
                tax: objG.tax,
                expDate: objG.expDate,
                phaseStructure: objG.phaseStructure,
                payroll: objG.payroll,
                insurance: objG.insurance,
                repairs: objG.repairs,
                payrollAmount: objG.payrollAmount,
                electricity: objG.electricity,
                electricityAmount: objG.electricityAmount,
                gas: objG.gas,
                gasAmount: objG.gasAmount,
                commonArea: objG.commonArea,
                commonAreaAmount: objG.commonAreaAmount,
                water: objG.water,
                waterAmount: objG.waterAmount,
                management: objG.management,
                managementAmount: objG.managementAmount,
                legal: objG.legal,
                triple: objG.triple,
                reimbursement: objG.reimbursement,
                otherExpenses: objG.otherExpenses,
                additionalNotes: objG.additionalNotes,
                elevatorMaintenanceAmount: objG.elevatorMaintenanceAmount,
                elevatorMaintenance: objG.elevatorMaintenance,
                ooSewerAmount: objG.ooSewerAmount,
                gasSeparatelyMetered: objG.gasSeparatelyMetered,
                managementCompanyName: objG.managementCompanyName,
                ooWaterAmount: objG.ooWaterAmount,
                waterSeparatelyMetered: objG.waterSeparatelyMetered,
                electricitySeparatelyMetered: objG.electricitySeparatelyMetered,
              },
            },
          },
          id: true,
          property_type: true,
          expenses: {
            taxNumber: true,
            tax: true,
            expDate: true,
            phaseStructure: true,
            payroll: true,
            insurance: true,
            repairs: true,
            payrollAmount: true,
            electricity: true,
            electricityAmount: true,
            gas: true,
            gasAmount: true,
            commonArea: true,
            commonAreaAmount: true,
            water: true,
            waterAmount: true,
            management: true,
            managementAmount: true,
            legal: true,
            triple: true,
            reimbursement: true,
            otherExpenses: {
              type: true,
              amount: true,
            },
            additionalNotes: true,
            elevatorMaintenanceAmount: true,
            elevatorMaintenance: true,
            ooSewerAmount: true,
            gasSeparatelyMetered: true,
            managementCompanyName: true,
            ooWaterAmount: true,
            waterSeparatelyMetered: true,
            electricitySeparatelyMetered: true,
            totalExpenses: true,
            netOperatingIncome: true,
            totalBusinessOperatingIncome: true,
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
   *  create Loan Existing
   */
  async setBrokerDealLoanExisting(objG) {
    const obj: any = {
      query: `mutation{
                deal(input: {
                    id: ${objG.id}
                    step: "${objG.step}"
                    existing: {
                        propertyType: "${objG.propertyType}"
                        free: "${objG.free}"
                        warehouse: "${objG.warehouse}"
                        lender: "${objG.lender}"
                    }
                }) {
                    id
                    property_type
                    existing {
                        propertyType
                        free
                        warehouse
                        lender
                    }
                }
              }`,
    }
    return await Api.post(URL_API, obj)
  },

  /**
   * @author Nikola Popov
   * @description
   *  create type construction
   */
  async setBrokerDealPropertyTypeConstruction(objG) {
    const arr = []
    if (objG.investment.mixedUse.length > 0) {
      objG.investment.mixedUse.forEach((element) => {
        arr.push(new EnumType(element))
      })
    }
    const enums = new EnumType(objG.investment.propType)

    const objectForm = {
      mutation: {
        deal: {
          __args: {
            input: {
              id: objG.id,
              step: objG.construction.step,
              construction: {
                date: objG.construction.date,
                land_cost: objG.construction.land_cost,
                current_value: objG.construction.current_value,
                hard_cost: objG.construction.hard_cost,
                soft_cost: objG.construction.soft_cost,
                contractor_name: objG.construction.contractor_name,
                amount_units: objG.construction.amount_units,
                square_footage: objG.construction.square_footage,
                floors: objG.construction.floors,
                plans: objG.construction.plans,
                second_projection: objG.construction.second_projection,

                projections: objG.construction.projections,
                projections_sales: objG.construction.projections_sales,
                projections_per_units: objG.construction.projections_per_units,
                projections_per_sf: objG.construction.projections_per_sf,

                rental_per: objG.construction.rental_per,
                rental_amount: objG.construction.rental_amount,
                rental_projections_per_units:
                  objG.construction.rental_projections_per_units,
                rental_projections_per_sf:
                  objG.construction.rental_projections_per_sf,
                  projectionMixedUse: objG.construction.projectionMixedUse,
              },
              investment_details: {
                mixedUse: arr,
                propType: enums,
                retailAmount: objG.investment.retailAmount,
                retailSquare: objG.investment.retailSquare,
                retailType: objG.investment.retailType,
                multiAmount: objG.investment.multiAmount,
                multiSquare: objG.investment.multiSquare,
                officeAmount: objG.investment.officeAmount,
                officeSquare: objG.investment.officeSquare,
                warehouseAmount: objG.investment.warehouseAmount,
                warehouseSquare: objG.investment.warehouseSquare,
                numberUnit: objG.investment.numberUnit,
                numberUnitOccupied: objG.investment.numberUnitOccupied,
                squareFootage: objG.investment.squareFootage,
                squareFootageOccupied: objG.investment.squareFootageOccupied,
                proposedUse: objG.investment.proposedUse,
                noteToLender: objG.investment.noteToLender,
                retailNumberOfUnitsOccupied:
                  objG.investment.retailNumberOfUnitsOccupied,
                retailSquareFootageOccupied:
                  objG.investment.retailSquareFootageOccupied,
                multiNumberOfUnitsOccupied:
                  objG.investment.multiNumberOfUnitsOccupied,
                multiSquareFootageOccupied:
                  objG.investment.multiSquareFootageOccupied,
                officeNumberOfUnitsOccupied:
                  objG.investment.officeNumberOfUnitsOccupied,
                officeSquareFootageOccupied:
                  objG.investment.officeSquareFootageOccupied,
                warehouseNumberOfUnitsOccupied:
                  objG.investment.warehouseNumberOfUnitsOccupied,
                warehouseSquareFootageOccupied:
                  objG.investment.warehouseSquareFootageOccupied,

                // New fields for construction mixed type
                amountOfUnits: objG.investment.amountOfUnits,
                rentableSellable: objG.investment.rentableSellable,
                retailFloors: objG.investment.retailFloors,
                multiAmountOfUnits: objG.investment.multiAmountOfUnits,
                multiRentableSellable: objG.investment.multiRentableSellable,
                multiFloors: objG.investment.multiFloors,
                officeAmountOfunits: objG.investment.officeAmountOfunits,
                officeRentableSellable: objG.investment.officeRentableSellable,
                officeFloors: objG.investment.officeFloors,
                industrialAmountOfUnits:
                  objG.investment.industrialAmountOfUnits,
                industrialRentableSellable:
                  objG.investment.industrialRentableSellable,
                industrialFloors: objG.investment.industrialFloors,
              },
            },
          },
          id: true,
          property_type: true,
          construction: {
            date: true,
            land_cost: true,
            current_value: true,
            hard_cost: true,
            soft_cost: true,
            contractor_name: true,
            amount_units: true,
            square_footage: true,
            floors: true,
            plans: true,
            second_projection: true,
            projections: true,
            projections_sales: true,
            projections_per_units: true,
            projections_per_sf: true,
            rental_per: true,
            rental_amount: true,
            rental_projections_per_units: true,
            rental_projections_per_sf: true,
            projectionMixedUse: {
              tag: true,
              projections: true,
              projections_sales: true,
              projections_per_units: true,
              projections_per_sf: true,
              rental_per: true,
              rental_amount: true,
              rental_projections_per_units: true,
              rental_projections_per_sf: true,
              plans: true,
              second_projection: true,
              plansOrder: true,
            },
          },
          investment_details: {
            propType: true,
            mixedUse: true,
            retailAmount: true,
            retailSquare: true,
            retailType: true,
            multiAmount: true,
            multiSquare: true,
            officeAmount: true,
            officeSquare: true,
            warehouseAmount: true,
            warehouseSquare: true,
            numberUnit: true,
            numberUnitOccupied: true,
            squareFootage: true,
            squareFootageOccupied: true,
            proposedUse: true,
            noteToLender: true,
            retailNumberOfUnitsOccupied: true,
            retailSquareFootageOccupied: true,
            multiNumberOfUnitsOccupied: true,
            multiSquareFootageOccupied: true,
            officeNumberOfUnitsOccupied: true,
            officeSquareFootageOccupied: true,
            warehouseNumberOfUnitsOccupied: true,
            warehouseSquareFootageOccupied: true,

            // New fields for construction mixed type
            amountOfUnits: true,
            rentableSellable: true,
            retailFloors: true,
            multiAmountOfUnits: true,
            multiRentableSellable: true,
            multiFloors: true,
            officeAmountOfunits: true,
            officeRentableSellable: true,
            officeFloors: true,
            industrialAmountOfUnits: true,
            industrialRentableSellable: true,
            industrialFloors: true,
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
   *  create owner
   */
  async setBrokerDealOwner(objG) {
    const obj: any = {
      query: `mutation{
                deal(input: {
                    id: ${objG.id}
                    step: "${objG.step}"
                    owner_occupied: {
                        business_name: "${objG.business_name}"
                        business_description: "${objG.business_description}"
                        sales_amount: "${objG.sales_amount}"
                        profit_amount: "${objG.profit_amount}"
                        borrower_own: "${objG.borrower_own}"
                        business_age: "${objG.business_age}"
                        sales_amount_YTD: "${objG.sales_amount_YTD}"
                        profit_amount_YTD: "${objG.profit_amount_YTD}"
                        employees: "${objG.employees}"
                    }
                }) {
                    id
                    property_type
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
                }
              }`,
    }
    return await Api.post(URL_API, obj)
  },

  /**
   * @author Nikola Popov
   * @description
   *  create sensitivity
   */
  async setBrokerDealLevelSensitivity(objG) {
    const objectForm = {
      mutation: {
        deal: {
          __args: {
            input: {
              id: objG.id,
              step: objG.step,
              sensitivity: {
                timeToClose: parseInt(objG.timeToClose),
                recourse: parseInt(objG.recourse),
                leverage: parseInt(objG.leverage),
                interestRate: parseInt(objG.interestRate),
                fees: parseInt(objG.fees),
                interestOnlyPeriod: parseInt(objG.interestOnlyPeriod),
                nonPrepaymentPenalty: parseInt(objG.nonPrepaymentPenalty),
              },
              type_of_loans: objG.type_of_loans,
            },
          },
          id: true,
          property_type: true,
          sensitivity: {
            timeToClose: true,
            recourse: true,
            leverage: true,
            interestRate: true,
            fees: true,
            interestOnlyPeriod: true,
            nonPrepaymentPenalty: true,
          },
          type_of_loans: true,
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
   *  create sensitivity
   */
  async setBrokerFinish(objG, force) {
    const objectForm = {
      mutation: {
        deal: {
          __args: {
            input: {
              id: objG.id,
              finished: true,
              force: force,
            },
          },
          id: true,
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
   *  get deal by id
   */
  async getDealById(objG) {
    const obj: any = {
      query: `mutation{
                deal(input: {
                    id: ${objG.id}
                }) {
                    id
                    show_address_purchase,
                    step,
                    finished,
                    finishApproved,
                    lastStepStatus,
                    property_type
                    sensitivity {
                        timeToClose
                        recourse
                        leverage
                        interestRate
                        fees
                    }
                    type_of_loans
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
                        show_address_construction
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
                        county
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
                        annual_sf_total
                        annual_income
                        potential_income
                        increaseProjection
                        increasedNotes
                        betterNotes

                        capExBudget
                        tiBudget
                        lcBudget

                        timeFrame
                        plannedImprovements
                        enterCopy
                        other_income {
                            type
                            amount
                        }
                    }
                }
            }`,
    }
    return await Api.post(URL_API, obj)
  },
}