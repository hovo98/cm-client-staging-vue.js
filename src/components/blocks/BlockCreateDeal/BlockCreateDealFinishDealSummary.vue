<template>
  <div class="cd-form-inner">
    <div class="deal-summary">
      <div class="deal-summary__head">
        <h2 class="title-small deal-summary__title">
          Review the details of your deal
        </h2>
      </div>

      <div class="deal-summary__body">
        <!-- dealFinishDealSummary -->
        <!-- LOCATION -->
        <div class="table-edit">
          <div class="table-edit__row">
            <div class="table-edit__col">
              <span class="table-edit__head">Address</span>
            </div>
            <div class="table-edit__col">
              <div
                v-if="proportyInfo"
                class="table-edit__data"
              >
                <span>Street Address: {{ proportyInfo.street_address }} <br /></span>
                <span v-if="proportyInfo.street_address_2">Address Line 2: {{ proportyInfo.street_address_2 }} <br /></span>
                <span>City: {{ proportyInfo.city }} <br /></span>
                <span>State: {{ proportyInfo.state }} <br /></span>
                <span>Postal / Zip Code: {{ proportyInfo.zip_code }}</span>
              </div>
            </div>
          </div>
          <div
            v-if="checkBlockAndLot(blockAndLot)"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Block and lot</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                <span v-if="blockAndLot.block !== ''">Block: {{ blockAndLot.block }}</span>
                <br v-if="blockAndLot.block !== '' && blockAndLot.lot !== ''" />
                <span v-if="blockAndLot.lot !== ''">Lot: {{ blockAndLot.lot }}</span>
              </div>
            </div>
          </div>

          <!-- Purchase -->

          <div
            v-if="purchase && purchase.price"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Purchase Price</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(purchase.price) }}
              </div>
            </div>
          </div>
          <div
            v-if="purchase && purchase.loan_amount"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Loan amount requested</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(purchase.loan_amount) }}
              </div>
            </div>
          </div>
          <div
            v-if="purchase && purchase.estimated_value"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Estimated Value</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(purchase.estimated_value) }}
              </div>
            </div>
          </div>
          <div
            v-if="purchase && purchase.estimated_cap_rate"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Estimated Cap Rate</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{ formatPercent(purchase.estimated_cap_rate) }} %
              </div>
            </div>
          </div>
          <div
            v-if="purchase && purchase.days_to_close"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Days To Close</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">{{ purchase.days_to_close }}</div>
            </div>
          </div>
          <div
            v-if="purchase && purchase.loan_amount && purchase.price"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">LTC</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{ checkLTC(purchase.loan_amount, purchase.price) }}
              </div>
            </div>
          </div>

          <!-- Refinance -->

          <div
            v-if="refinance && refinance.loanAmount"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Loan Amount Requested</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(refinance.loanAmount) }}
              </div>
            </div>
          </div>
          <div
            v-if="refinance && refinance.date"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Initial Purchase Date</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">{{ changeDateData(refinance.date) }}</div>
            </div>
          </div>
          <div
            v-if="refinance && refinance.purchasePrice"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Initial purchase price</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(refinance.purchasePrice) }}
              </div>
            </div>
          </div>
          <div
            v-if="refinance && refinance.currentValue"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Current value</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(refinance.currentValue) }}
              </div>
            </div>
          </div>
          <div
            v-if="refinance && refinance.list"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">List improvements</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div
                class="table-edit__data"
                v-html="refinance.list"
              />
            </div>
          </div>

          <!-- Loan Type -->

          <div
            v-if="loan_type && propertyType !== 'UNDEFINED'"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Loan type</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{ changeSomeEnum(loan_type) }}
              </div>
            </div>
          </div>

          <div
            v-if="typeOfLoan"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Lender Type</span>
            </div>
            <div class="table-edit__data-list-holder">
              <template v-for="(num, index) in typeOfLoan">
                <div
                  :key="index"
                  class="table-edit__data-list"
                >
                  <div
                    v-if="num === 1"
                    class="table-edit__data-list-item"
                  >
                    <span>Hard Money/Bridge</span>
                  </div>
                  <div
                    v-if="num === 3"
                    class="table-edit__data-list-item"
                  >
                    <span>CMBS</span>
                  </div>
                  <div
                    v-if="num === 2"
                    class="table-edit__data-list-item"
                  >
                    <span>Agency</span>
                  </div>
                  <div
                    v-if="num === 4"
                    class="table-edit__data-list-item"
                  >
                    <span>Balance Sheet</span>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <!-- Property Type -->
          <div
            v-if="propertyType && propertyType !== 'UNDEFINED'"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Property type</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{ changeSomeEnum(propertyType) }}
              </div>
            </div>
          </div>

          <!-- Owner -->

          <div
            v-if="owner && owner.business_name"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Business name</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{ owner.business_name }}
              </div>
            </div>
          </div>
          <div
            v-if="owner && owner.business_description"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Business description</span>
            </div>
            <div class="table-edit__col">
              <div
                class="table-edit__data"
                v-html="owner.business_description"
              />
            </div>
          </div>
          <div
            v-if="owner && owner.sales_amount"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Sales amount</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                $ {{ formatDollars(owner.sales_amount) }}
              </div>
            </div>
          </div>
          <div
            v-if="owner && owner.profit_amount"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Profits amount</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                $ {{ formatDollars(owner.profit_amount) }}
              </div>
            </div>
          </div>
          <div
            v-if="owner && owner.borrower_own"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Percent Borrower owns</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{ owner.borrower_own + "%" }}
              </div>
            </div>
          </div>
          <div
            v-if="owner && owner.business_age"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Business age</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{ owner.business_age }}
              </div>
            </div>
          </div>
          <div
            v-if="owner && owner.sales_amount_YTD"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Sales amount YTD</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                $ {{ formatDollars(owner.sales_amount_YTD) }}
              </div>
            </div>
          </div>
          <div
            v-if="owner && owner.profit_amount_YTD"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Profits amount YTD</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                $ {{ formatDollars(owner.profit_amount_YTD) }}
              </div>
            </div>
          </div>
          <div
            v-if="owner && owner.employees"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Employees</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{ owner.employees }}
              </div>
            </div>
          </div>

          <!-- Investment -->

          <div
            v-if="investment && investment.propType !== 'UNDEFINED'"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Type</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div
                v-if="investment.propType === 'MIXEDUSE'"
                class="table-edit__data"
              >
                Mixed use
              </div>
              <div
                v-else
                class="table-edit__data"
              >
                {{ changeSomeEnum(investment.propType) }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.mixedUse.length > 0"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Mixed use type</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{ arrayToStringCommaUppercaseFirst(investment.mixedUse) }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.retailType"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Retail type</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">{{ investment.retailType }}</div>
            </div>
          </div>
          <div
            v-if="investment && investment.retailAmount"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Retail units</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.retailAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.retailNumberOfUnitsOccupied"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Retail number of units occupied</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.retailNumberOfUnitsOccupied.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.retailSquare"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Retail square footage</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.retailSquare.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.retailSquareFootageOccupied"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Retail square footage occupied</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.retailSquareFootageOccupied.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>

          <div
            v-if="investment && investment.multiAmount"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Multifamily units</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.multiAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.multiNumberOfUnitsOccupied"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Multifamily number of units occupied</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.multiNumberOfUnitsOccupied.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.multiSquare"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Multifamily square footage</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.multiSquare.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.multiSquareFootageOccupied"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Multifamily square footage occupied</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.multiSquareFootageOccupied.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.officeAmount"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Office units</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.officeAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.officeNumberOfUnitsOccupied"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Office number of units occupied</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.officeNumberOfUnitsOccupied.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.officeSquare"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Office square footage</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.officeSquare.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.officeSquareFootageOccupied"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Office square footage occupied</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.officeSquareFootageOccupied.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>

          <div
            v-if="investment && investment.warehouseAmount"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Industrial units</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.warehouseAmount.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.warehouseNumberOfUnitsOccupied"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Industrial number of units occupied</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.warehouseNumberOfUnitsOccupied.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.warehouseSquare"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Industrial square footage</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.warehouseSquare.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.warehouseSquareFootageOccupied"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Industrial square footage occupied</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.warehouseSquareFootageOccupied.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>

          <!-- // Newly added fields -->
          <div
            v-if="investment && investment.amountOfUnits"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Retail Amount of units</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.amountOfUnits.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>

          <div
            v-if="investment && investment.rentableSellable"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Retail Rentable/Sellable SF</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.rentableSellable.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>

          <div
            v-if="investment && investment.retailFloors"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Retail Floors</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.retailFloors.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>

          <div
            v-if="investment && investment.multiAmountOfUnits"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Multifamily Amount of units</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.multiAmountOfUnits.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>

          <div
            v-if="investment && investment.multiRentableSellable"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Multifamily Rentable/Sellable SF</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.multiRentableSellable.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>

          <div
            v-if="investment && investment.multiFloors"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Multifamily Floors</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.multiFloors.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>

          <div
            v-if="investment && investment.officeAmountOfunits"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Office Amount of units</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.officeAmountOfunits.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>

          <div
            v-if="investment && investment.officeRentableSellable"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Office Rentable/Sellable SF</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.officeRentableSellable.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>

          <div
            v-if="investment && investment.officeFloors"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Office Floors</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.officeFloors.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>

          <div
            v-if="investment && investment.industrialAmountOfUnits"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Industrial Amount of units</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.industrialAmountOfUnits.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>

          <div
            v-if="investment && investment.industrialRentableSellable"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Industrial Rentable/Sellable SF</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.industrialRentableSellable.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>

          <div
            v-if="investment && investment.industrialFloors"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Industrial Floors</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  investment.industrialFloors.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>



          <div
            v-if="investment && investment.numberUnit"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Number of units</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{
                  investment.numberUnit.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.numberUnitOccupied"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Number of units occupied</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{
                  investment.numberUnitOccupied.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.squareFootage"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Square footage</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{
                  investment.squareFootage.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.squareFootageOccupied"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Square footage occupied</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{
                  investment.squareFootageOccupied.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>
          <div
            v-if="investment && investment.proposedUse"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Proposed use</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">{{ investment.proposedUse }}</div>
            </div>
          </div>
          <div
            v-if="investment && investment.noteToLender"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Note to lender</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">{{ investment.noteToLender }}</div>
            </div>
          </div>

          <!-- Construction -->

          <div
            v-if="construction && construction.loanAmount"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Loan Amount Requested</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                $ {{ formatDollars(construction.loanAmount) }}
              </div>
            </div>
          </div>
          <div
            v-if="
              construction &&
                construction.buying_land &&
                construction.buying_land !== ''
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">New Purchase</span>
            </div>
            <div class="table-edit__col">
              <div
                v-if="
                  construction.buying_land === 'true' ||
                    construction.buying_land === true
                "
                class="table-edit__data"
              >
                Yes
              </div>
              <div
                v-else
                class="table-edit__data"
              >
                No
              </div>
            </div>
          </div>
          <div
            v-if="
              construction &&
                construction.debt_on_property &&
                construction.debt_on_property !== ''
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Property Debt</span>
            </div>
            <div class="table-edit__col">
              <div
                v-if="
                  construction.debt_on_property === 'true' ||
                    construction.debt_on_property === true
                "
                class="table-edit__data"
              >
                Yes
              </div>
              <div
                v-else
                class="table-edit__data"
              >
                No (free & clear)
              </div>
            </div>
          </div>
          <div
            v-if="construction && construction.purchase_price"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Initial purchase price</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                $ {{ formatDollars(construction.purchase_price) }}
              </div>
            </div>
          </div>
          <div
            v-if="construction && construction.purchase_date"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Initial purchase date</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{ changeDateData(construction.purchase_date) }}
              </div>
            </div>
          </div>
          <div
            v-if="construction && construction.debt_amount"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Debt amount</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                $ {{ formatDollars(construction.debt_amount) }}
              </div>
            </div>
          </div>
          <div
            v-if="construction && construction.lender_name"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Lender name</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{ construction.lender_name }}
              </div>
            </div>
          </div>

          <!-- Type Construction -->

          <div
            v-if="type_construction && type_construction.land_cost"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Land cost</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                $ {{ formatDollars(type_construction.land_cost) }}
              </div>
            </div>
          </div>
          <div
            v-if="type_construction && type_construction.date"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Date Purchased</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{ changeDateData(type_construction.date) }}
              </div>
            </div>
          </div>
          
          <div
            v-if="type_construction && type_construction.hard_cost"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Hard costs</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                $ {{ formatDollars(type_construction.hard_cost) }}
              </div>
            </div>
          </div>
          <div
            v-if="type_construction && type_construction.soft_cost"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Soft costs</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                $ {{ formatDollars(type_construction.soft_cost) }}
              </div>
            </div>
          </div>

          <div
            v-if="type_construction && type_construction.current_value"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Current Land Value</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                $ {{ formatDollars(type_construction.current_value) }}
              </div>
            </div>
          </div>
          <div
            v-if="type_construction && type_construction.contractor_name"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Contractor name</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{ type_construction.contractor_name }}
              </div>
            </div>
          </div>
          <div
            v-if="type_construction && type_construction.amount_units"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Amount of units</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  type_construction.amount_units.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>
          <div
            v-if="type_construction && type_construction.square_footage"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span
                v-if="type_construction"
                class="table-edit__head"
              >Rentable/Sellable SF</span>
              <span
                v-else
                class="table-edit__head"
              >Square footage</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  type_construction.square_footage.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )
                }}
              </div>
            </div>
          </div>
          <div
            v-if="type_construction && type_construction.floors"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Number of Floors</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{
                  type_construction.floors.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </div>
            </div>
          </div>


          <template v-if="investment.propType === 'MIXEDUSE' && type_construction.projectionMixedUse.length > 0">
            <div
              v-for="(projection, ind) in type_construction.projectionMixedUse"
              :key="'b'+ind"
            >
              <div
                v-for="(plansOr, index) in projection.plansOrder"
                :key="'b'+index"
                class="projections-wrapper"
              >
                <template v-if="plansOr === 'sell'">
                  <template v-if="index === 0">
                    <div
                      v-if="projection.projections === 'both' && projection.projections_per_units"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Sales Projections per unit <br>(primary option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $ {{ formatDollars(projection.projections_per_units) }}
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="projection.projections === 'both' && projection.projections_per_sf"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Sales Projections per s/f <br>(primary option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $ {{ formatDollars(projection.projections_per_sf) }}
                        </div>
                      </div>
                    </div>


                    <div
                      v-if="projection.projections === 'unit' && projection.projections_sales"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Sales Projections per unit <br>(primary option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $ {{ formatDollars(projection.projections_sales) }}
                        </div>
                      </div>
                    </div>


                    <div
                      v-if="projection.projections === 'sf' && projection.projections_sales"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Sales Projections per s/f <br>(primary option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $ {{ formatDollars(projection.projections_sales) }}
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
                <template v-if="plansOr === 'rent'">
                  <template v-if="index === 0">
                    <div
                      v-if="projection.rental_per === 'both' && projection.rental_projections_per_units"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Rental Projections per unit <br>(primary option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $
                          {{
                            formatDollars(projection.rental_projections_per_units)
                          }}
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="projection.rental_per === 'both' && projection.rental_projections_per_sf"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Rental Projections per s/f <br>(primary option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $
                          {{ formatDollars(projection.rental_projections_per_sf) }}
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="projection.rental_per === 'unit' && projection.rental_amount"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Rental Projections per unit <br> (primary option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $ {{ formatDollars(projection.rental_amount) }}
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="projection.rental_per === 'sf' && projection.rental_amount"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Rental Projections per s/f <br>(primary option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $ {{ formatDollars(projection.rental_amount) }}
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
              </div>
            </div>

            <div
              v-for="(projection, ind) in type_construction.projectionMixedUse"
              :key="'a'+ind"
            >
              <div
                v-for="(plansOr, index) in projection.plansOrder"
                :key="'a'+index"
                class="projections-wrapper"
              >
                <template v-if="plansOr === 'sell'">
                  <template v-if="index === 1">
                    <div
                      v-if="projection.projections === 'both' && projection.projections_per_units"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Sales Projections per unit <br>(fallback option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $ {{ formatDollars(projection.projections_per_units) }}
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="projection.projections === 'both' && projection.projections_per_sf"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Sales Projections per s/f <br>(fallback option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $ {{ formatDollars(projection.projections_per_sf) }}
                        </div>
                      </div>
                    </div>


                    <div
                      v-if="projection.projections === 'unit' && projection.projections_sales"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Sales Projections per unit <br>(fallback option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $ {{ formatDollars(projection.projections_sales) }}
                        </div>
                      </div>
                    </div>


                    <div
                      v-if="projection.projections === 'sf' && projection.projections_sales"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Sales Projections per s/f <br>(fallback option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $ {{ formatDollars(projection.projections_sales) }}
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
                <template v-if="plansOr === 'rent'">
                  <template v-if="index === 1">
                    <div
                      v-if="projection.rental_per === 'both' && projection.rental_projections_per_units"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Rental Projections per unit <br>(fallback option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $
                          {{
                            formatDollars(projection.rental_projections_per_units)
                          }}
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="projection.rental_per === 'both' && projection.rental_projections_per_sf"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Rental Projections per s/f <br>(fallback option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $
                          {{ formatDollars(projection.rental_projections_per_sf) }}
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="projection.rental_per === 'unit' && projection.rental_amount"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Rental Projections per unit <br>(fallback option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $ {{ formatDollars(projection.rental_amount) }}
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="projection.rental_per === 'sf' && projection.rental_amount"
                      class="table-edit__row"
                    >
                      <div class="table-edit__col">
                        <span class="table-edit__head">{{ projection.tag }} Rental Projections per s/f <br>(fallback option)</span>
                      </div>
                      <div class="table-edit__col">
                        <div class="table-edit__data">
                          $ {{ formatDollars(projection.rental_amount) }}
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
              </div>
            </div>
          </template>


          <div
            v-for="(plansOr, index) in plansOrder"
            :key="'c'+index"
            class="projections-wrapper"
          >
            <template v-if="plansOr === 'sell'">
              <div
                v-if="
                  type_construction &&
                    type_construction.projections === 'both' &&
                    type_construction.projections_per_units
                "
                class="table-edit__row"
              >
                <div class="table-edit__col">
                  <span
                    v-if="index === 0"
                    class="table-edit__head"
                  >Sales Projections per unit<br> (primary option)</span>
                  <span
                    v-else
                    class="table-edit__head"
                  >Sales Projections per unit<br> (fallback option)</span>
                </div>
                <div class="table-edit__col">
                  <div class="table-edit__data">
                    $ {{ formatDollars(type_construction.projections_per_units) }}
                  </div>
                </div>
              </div>
              <div
                v-if="
                  type_construction &&
                    type_construction.projections === 'both' &&
                    type_construction.projections_per_sf
                "
                class="table-edit__row"
              >
                <div class="table-edit__col">
                  <span
                    v-if="index === 0"
                    class="table-edit__head"
                  >Sales Projections per s/f<br> (primary option)</span>
                  <span
                    v-else
                    class="table-edit__head"
                  >Sales Projections per s/f<br> (fallback option)</span>
                </div>
                <div class="table-edit__col">
                  <div class="table-edit__data">
                    $ {{ formatDollars(type_construction.projections_per_sf) }}
                  </div>
                </div>
              </div>
              <div
                v-if="
                  type_construction &&
                    type_construction.projections_sales &&
                    type_construction.projections === 'unit'
                "
                class="table-edit__row"
              >
                <div class="table-edit__col">
                  <span
                    v-if="index === 0"
                    class="table-edit__head"
                  >Sales Projections per unit<br> (primary option)</span>
                  <span
                    v-else
                    class="table-edit__head"
                  >Sales Projections per unit<br> (fallback option)</span>
                </div>
                <div class="table-edit__col">
                  <div class="table-edit__data">
                    $ {{ formatDollars(type_construction.projections_sales) }}
                  </div>
                </div>
              </div>
              <div
                v-if="
                  type_construction &&
                    type_construction.projections_sales &&
                    type_construction.projections === 'sf'
                "
                class="table-edit__row"
              >
                <div class="table-edit__col">
                  <span
                    v-if="index === 0"
                    class="table-edit__head"
                  >Sales Projections per s/f<br> (primary option)</span>
                  <span
                    v-else
                    class="table-edit__head"
                  >Sales Projections per s/f<br> (fallback option)</span>
                </div>
                <div class="table-edit__col">
                  <div class="table-edit__data">
                    $ {{ formatDollars(type_construction.projections_sales) }}
                  </div>
                </div>
              </div>
            </template>




            
            <template v-if="plansOr === 'rent'">
              <div
                v-if="
                  type_construction &&
                    type_construction.rental_per === 'both' &&
                    type_construction.rental_projections_per_units
                "
                class="table-edit__row"
              >
                <div class="table-edit__col">
                  <span
                    v-if="index === 0"
                    class="table-edit__head"
                  >Rental Projections per unit<br> (primary option)</span>
                  <span
                    v-else
                    class="table-edit__head"
                  >Rental Projections per unit<br> (fallback option)</span>
                </div>
                <div class="table-edit__col">
                  <div class="table-edit__data">
                    $
                    {{
                      formatDollars(type_construction.rental_projections_per_units)
                    }}
                  </div>
                </div>
              </div>
              <div
                v-if="
                  type_construction &&
                    type_construction.rental_per === 'both' &&
                    type_construction.rental_projections_per_sf
                "
                class="table-edit__row"
              >
                <div class="table-edit__col">
                  <span
                    v-if="index === 0"
                    class="table-edit__head"
                  >Rental Projections per s/f<br> (primary option)</span>
                  <span
                    v-else
                    class="table-edit__head"
                  >Rental Projections per s/f<br> (fallback option)</span>
                </div>
                <div class="table-edit__col">
                  <div class="table-edit__data">
                    $
                    {{ formatDollars(type_construction.rental_projections_per_sf) }}
                  </div>
                </div>
              </div>
              <div
                v-if="
                  type_construction &&
                    type_construction.rental_amount &&
                    type_construction.rental_per === 'unit'
                "
                class="table-edit__row"
              >
                <div class="table-edit__col">
                  <span
                    v-if="index === 0"
                    class="table-edit__head"
                  >Rental Projections per unit<br> (primary option)</span>
                  <span
                    v-else
                    class="table-edit__head"
                  >Rental Projections per unit<br> (fallback option)</span>
                </div>
                <div class="table-edit__col">
                  <div class="table-edit__data">
                    $ {{ formatDollars(type_construction.rental_amount) }}
                  </div>
                </div>
              </div>
              <div
                v-if="
                  type_construction &&
                    type_construction.rental_amount &&
                    type_construction.rental_per === 'sf'
                "
                class="table-edit__row"
              >
                <div class="table-edit__col">
                  <span
                    v-if="index === 0"
                    class="table-edit__head"
                  >Rental Projections per s/f<br> (primary option)</span>
                  <span
                    v-else
                    class="table-edit__head"
                  >Rental Projections per s/f<br> (fallback option)</span>
                </div>
                <div class="table-edit__col">
                  <div class="table-edit__data">
                    $ {{ formatDollars(type_construction.rental_amount) }}
                  </div>
                </div>
              </div>
            </template>
          </div>









          <!-- Existing -->

          <div
            v-if="existing && existing.free && existing.free !== ''"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Existing loans on this property</span>
            </div>
            <div class="table-edit__col">
              <div
                v-if="existing.free === 'true' || existing.free === true"
                class="table-edit__data"
              >
                Free and Clear - no loans
              </div>
              <div
                v-else
                class="table-edit__data"
              >
                Yes
              </div>
            </div>
          </div>
          <div
            v-if="existing && existing.payroll && existing.payroll !== ''"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Existing loans on this property</span>
            </div>
            <div class="table-edit__col">
              <div
                v-if="existing.payroll === 'true' || existing.payroll === true"
                class="table-edit__data"
              >
                Yes
              </div>
              <div
                v-else
                class="table-edit__data"
              >
                No
              </div>
            </div>
          </div>
          <div
            v-if="existing && existing.lender"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Lender name</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                {{ existing.lender }}
              </div>
            </div>
          </div>
          <div
            v-if="existing && existing.warehouse"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Amount</span>
            </div>
            <div class="table-edit__col">
              <div class="table-edit__data">
                $ {{ formatDollars(existing.warehouse) }}
              </div>
            </div>
          </div>

          <!-- Expenses -->

          <div
            v-if="expenses && expenses.taxNumber"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Real Estate taxes</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.taxNumber) }}
              </div>
            </div>
          </div>
          <div
            v-if="expenses && expenses.tax"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Tax abatement</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div
                v-if="expenses.tax === 'true'"
                class="table-edit__data"
              >
                Yes
              </div>
              <div
                v-else
                class="table-edit__data"
              >
                No
              </div>
            </div>
          </div>
          <div
            v-if="expenses && expenses.expDate"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Expiration date</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{ changeDateData(expenses.expDate) }}
              </div>
            </div>
          </div>
          <div
            v-if="expenses && expenses.phaseStructure"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Phase out structure</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">{{ expenses.phaseStructure }}</div>
            </div>
          </div>
          <div
            v-if="expenses && expenses.insurance"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Insurance</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.insurance) }}
              </div>
            </div>
          </div>
          <div
            v-if="expenses && expenses.repairs"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Repairs and Maintenance</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.repairs) }}
              </div>
            </div>
          </div>
          <div
            v-if="
              expenses &&
                expenses.payroll === 'false' &&
                expenses.payrollAmount !== ''
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Payroll and reserves</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.payrollAmount) }}
              </div>
            </div>
          </div>
          <div
            v-if="expenses && expenses.payroll === 'true'"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Payroll and reserves</span>
            </div>
            <div
              v-if="expenses.payroll === 'true'"
              class="table-edit__col table-edit__col--data"
            >
              <div class="table-edit__data">n/a</div>
            </div>
          </div>
          <div
            v-if="
              expenses &&
                expenses.electricity === '' &&
                expenses.electricityAmount !== ''
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Electricity</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.electricityAmount) }}
              </div>
            </div>
          </div>
          <div
            v-if="
              expenses &&
                expenses.electricity === 'false' &&
                expenses.electricityAmount !== ''
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Electricity</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.electricityAmount) }}
              </div>
            </div>
          </div>
          <div
            v-if="expenses && expenses.electricity === 'true'"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Electricity</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">Paid by tenant</div>
            </div>
          </div>
          <div
            v-if="
              expenses &&
                expenses.electricity === 'true' &&
                expenses.electricitySeparatelyMetered
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Electricity separately metered</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div
                v-if="expenses.electricitySeparatelyMetered === 'true'"
                class="table-edit__data"
              >
                Yes
              </div>
              <div
                v-else
                class="table-edit__data"
              >
                No
              </div>
            </div>
          </div>

          <div
            v-if="expenses && expenses.gas === '' && expenses.gasAmount !== ''"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Gas</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.gasAmount) }}
              </div>
            </div>
          </div>
          <div
            v-if="
              expenses && expenses.gas === 'false' && expenses.gasAmount !== ''
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Gas</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.gasAmount) }}
              </div>
            </div>
          </div>

          <div
            v-if="expenses && expenses.gas === 'true'"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Gas</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">Paid by tenant</div>
            </div>
          </div>
          <div
            v-if="
              expenses &&
                expenses.gas === 'true' &&
                expenses.gasSeparatelyMetered
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Gas separately metered</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div
                v-if="expenses.gasSeparatelyMetered === 'true'"
                class="table-edit__data"
              >
                Yes
              </div>
              <div
                v-else
                class="table-edit__data"
              >
                No
              </div>
            </div>
          </div>

          <div
            v-if="
              expenses && expenses.water === '' && expenses.waterAmount !== ''
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Water and Sewer</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.waterAmount) }}
              </div>
            </div>
          </div>
          <div
            v-if="
              expenses &&
                expenses.water === 'false' &&
                expenses.waterAmount !== ''
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Water and Sewer</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.waterAmount) }}
              </div>
            </div>
          </div>
          <div
            v-if="expenses && expenses.water === 'true'"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Water and Sewer</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">Paid by tenant</div>
            </div>
          </div>
          <div
            v-if="
              expenses &&
                expenses.water === 'true' &&
                expenses.waterSeparatelyMetered
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Water and Sewer separately metered</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div
                v-if="expenses.waterSeparatelyMetered === 'true'"
                class="table-edit__data"
              >
                Yes
              </div>
              <div
                v-else
                class="table-edit__data"
              >
                No
              </div>
            </div>
          </div>
          <div
            v-if="expenses && expenses.ooWaterAmount"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Water</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.ooWaterAmount) }}
              </div>
            </div>
          </div>
          <div
            v-if="expenses && expenses.ooSewerAmount"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Sewer</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.ooSewerAmount) }}
              </div>
            </div>
          </div>

          <div
            v-if="
              expenses &&
                expenses.commonArea === 'false' &&
                expenses.commonAreaAmount !== ''
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Common Area Utilities</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.commonAreaAmount) }}
              </div>
            </div>
          </div>
          <div
            v-if="expenses && expenses.commonArea === 'true'"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Common Area Utilities</span>
            </div>
            <div
              v-if="expenses.commonArea === 'true'"
              class="table-edit__col table-edit__col--data"
            >
              <div class="table-edit__data">Paid by tenant</div>
            </div>
          </div>

          <div
            v-if="expenses && expenses.legal"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Legal and professional</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.legal) }}
              </div>
            </div>
          </div>
          <div
            v-if="
              expenses && expenses.management && expenses.management === 'true'
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Management</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">Self management</div>
            </div>
          </div>
          <div
            v-if="
              expenses &&
                expenses.management &&
                expenses.management === 'false' &&
                expenses.managementAmount !== ''
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Management</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.managementAmount) }}
              </div>
            </div>
          </div>
          <div
            v-if="expenses && expenses.managementCompanyName"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Management company name</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{ expenses.managementCompanyName }}
              </div>
            </div>
          </div>
          <div
            v-if="
              expenses &&
                expenses.elevatorMaintenance === 'false' &&
                expenses.elevatorMaintenanceAmount !== ''
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Elevator Maintenance</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.elevatorMaintenanceAmount) }}
              </div>
            </div>
          </div>
          <div
            v-if="expenses && expenses.elevatorMaintenance === 'true'"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Elevator Maintenance</span>
            </div>
            <div
              v-if="expenses.elevatorMaintenance === 'true'"
              class="table-edit__col table-edit__col--data"
            >
              <div class="table-edit__data">Paid by tenant</div>
            </div>
          </div>

          <template v-if="expenses && expenses.otherExpenses[0].type !== ''">
            <template v-for="(expe, index) in expenses.otherExpenses">
              <div
                :key="index + 88"
                class="table-edit__row"
              >
                <div class="table-edit__col">
                  <span class="table-edit__head">{{ expe.type }}</span>
                </div>
                <div class="table-edit__col table-edit__col--data">
                  <div class="table-edit__data">
                    $ {{ formatDollars(expe.amount) }}
                  </div>
                </div>
              </div>
            </template>
          </template>

          <div
            v-if="expenses && expenses.additionalNotes"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Additional notes to lenders</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">{{ expenses.additionalNotes }}</div>
            </div>
          </div>

          <!-- Property Incam -->

          <div
            v-if="propertyIncam && propertyIncam.table[0].monthle_rent"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">RENT ROLL</span>
            </div>
            <div
              v-if="propertyIncam.table"
              class="table-edit__data-list-holder"
            >
              <template v-for="(row, index) in propertyIncam.table">
                <div
                  v-if="row.monthle_rent"
                  :key="'d'+index"
                  class="table-edit__data-list"
                >
                  <div class="table-edit__data-list-item">
                    <span>Status:</span> <span>{{ row.occupied ? 'Occupied' : 'Vacant' }}</span>
                  </div>
                  <div
                    v-if="row.unit_type"
                    class="table-edit__data-list-item"
                  >
                    <span>Unit Type:</span> <span>{{ row.unit_type }}</span>
                  </div>
                  <div
                    v-if="row.name"
                    class="table-edit__data-list-item"
                  >
                    <span>Tenant's name:</span> <span>{{ row.name }}</span>
                  </div>
                  <div
                    v-if="row.unit"
                    class="table-edit__data-list-item"
                  >
                    <span>Unit:</span> <span>{{ row.unit }}</span>
                  </div>
                  <div
                    v-if="row.bedroom"
                    class="table-edit__data-list-item"
                  >
                    <span>Bedroom/Bathroom:</span>
                    <span>{{ row.bedroom }}</span>
                  </div>
                  <div
                    v-if="row.lease_start"
                    class="table-edit__data-list-item"
                  >
                    <span>Lease Start:</span> <span>{{ row.lease_start }}</span>
                  </div>
                  <div
                    v-if="row.lease_end"
                    class="table-edit__data-list-item"
                  >
                    <span>Lease End:</span> <span>{{ row.lease_end }}</span>
                  </div>
                  <div
                    v-if="row.sf"
                    class="table-edit__data-list-item"
                  >
                    <span>SF:</span>
                    <span>{{
                      row.sf.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}</span>
                  </div>
                  <div class="table-edit__data-list-item">
                    <span>Monthly Rent:</span>
                    <span>$ {{ formatDollars(row.monthle_rent) }}</span>
                  </div>
                  <div class="table-edit__data-list-item">
                    <span>Annual Rent:</span>
                    <span>$ {{ formatDollars(row.annual_rent) }}</span>
                  </div>
                  <div
                    v-if="row.annual_rent_sf !== ''"
                    class="table-edit__data-list-item"
                  >
                    <span>Annual Rent/SF:</span>
                    <span>$ {{ formatDollars(row.annual_rent_sf) }}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <div
            v-if="propertyIncam && propertyIncam.annual_income"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span
                v-if="propertyIncam.vacancy === ''"
                class="table-edit__head"
              >Total In-Place Rental Income</span>
              <span
                v-else
                class="table-edit__head"
              >Gross Potential Rents</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(propertyIncam.annual_income) }}
              </div>
            </div>
          </div>

          <div
            v-if="propertyIncam && propertyIncam.vacancy"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Vacancy</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ -{{ formatDollars(propertyIncam.vacancy) }}
              </div>
            </div>
          </div>

          <div
            v-if="propertyIncam && propertyIncam.vacancy"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Total In-Place Rental Income</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div
                v-if="propertyIncam.occupiedGroos !== ''"
                class="table-edit__data"
              >
                $ {{ formatDollars(propertyIncam.occupiedGroos) }}
              </div>
              <div
                v-else
                class="table-edit__data"
              >
                $ 0
              </div>
            </div>
          </div>

          <template
            v-if="propertyIncam && propertyIncam.other_income[0].type !== ''"
          >
            <template v-for="(expe, index) in propertyIncam.other_income">
              <div
                :key="index + 1254"
                class="table-edit__row"
              >
                <div class="table-edit__col">
                  <span class="table-edit__head">{{ expe.type }}</span>
                </div>
                <div class="table-edit__col table-edit__col--data">
                  <div class="table-edit__data">
                    $ {{ formatDollars(expe.amount) }}
                  </div>
                </div>
              </div>
            </template>
          </template>

          <div
            v-if="
              expenses &&
                expenses.triple &&
                expenses.triple !== '' &&
                !expenses.reimbursement
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Expense Recoveries</span>
            </div>
            <div class="table-edit__col">
              <div
                v-if="expenses.triple === 'true' || expenses.triple === true"
                class="table-edit__data"
              >
                Yes
              </div>
              <div
                v-else
                class="table-edit__data"
              >
                No
              </div>
            </div>
          </div>

          <div
            v-if="expenses && expenses.reimbursement"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Expense Recoveries</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(expenses.reimbursement) }}
              </div>
            </div>
          </div>

          <div
            v-if="propertyIncam && propertyIncam.potential_income"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Potential annual income</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(propertyIncam.potential_income) }}
              </div>
            </div>
          </div>

          <div
            v-if="
              propertyIncam && propertyIncam.increaseProjection
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Reasons for increased projections</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{ propertyIncam.increaseProjection }}
              </div>
            </div>
          </div>

          <div
            v-if="propertyIncam && propertyIncam.increasedNotes"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Details regarding increased occupancy</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{ propertyIncam.increasedNotes }}
              </div>
            </div>
          </div>
          <div
            v-if="propertyIncam && propertyIncam.betterNotes"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Details regarding better leases</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{ propertyIncam.betterNotes }}
              </div>
            </div>
          </div>

          <div
            v-if="
              propertyIncam && propertyIncam.capExBudget
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">CapEx Budget</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{ "$" + formatDollars(propertyIncam.capExBudget) }}
              </div>
            </div>
          </div>

          <div
            v-if="
              propertyIncam && propertyIncam.tiBudget
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">TI Budget</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{ "$" + formatDollars(propertyIncam.tiBudget) }}
              </div>
            </div>
          </div>

          <div
            v-if="
              propertyIncam && propertyIncam.lcBudget
            "
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">LC Budget</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{ "$" + formatDollars(propertyIncam.lcBudget) }}
              </div>
            </div>
          </div>

          <!-- <div
            class="table-edit__row"
            v-if="propertyIncam && propertyIncam.renovationsBudget"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Renovations budget</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                $ {{ formatDollars(propertyIncam.renovationsBudget) }}
              </div>
            </div>
          </div> -->

          <div
            v-if="propertyIncam && propertyIncam.timeFrame"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Time frame</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div
                v-if="propertyIncam.timeFrame !== '1'"
                class="table-edit__data"
              >
                {{ propertyIncam.timeFrame }} months
              </div>
              <div
                v-else
                class="table-edit__data"
              >
                {{ propertyIncam.timeFrame }} month
              </div>
            </div>
          </div>

          <div
            v-if="propertyIncam && propertyIncam.plannedImprovements"
            class="table-edit__row"
          >
            <div class="table-edit__col">
              <span class="table-edit__head">Details regarding planned improvements</span>
            </div>
            <div class="table-edit__col table-edit__col--data">
              <div class="table-edit__data">
                {{ propertyIncam.plannedImprovements }}
              </div>
            </div>
          </div>
          
          <!-- Sponsor -->

          <template v-if="sponsor && sponsor.sponsorInfo">
            <template v-for="(sponsor, index) in sponsor.sponsorInfo">
              {{ sponsor.sponsorInfo }}
              <span :key="index">
                <div class="table-edit__row border-top">
                      
                  <div class="table-edit__col">
                    <span
                      v-if="checkSponsorLength()"
                      class="table-edit__head"
                    >Sponsor {{ index + 1 }} name</span>

                    <span
                      v-else
                      class="table-edit__head"
                    >Sponsor Name</span>
                  </div>
                  <div class="table-edit__col table-edit__col--data">
                    <div class="table-edit__data">{{ sponsor.name }}</div>
                  </div>
                </div>

                <div
                  v-if="sponsor.ownership"
                  class="table-edit__row"
                >
                  <div class="table-edit__col">
                    <span class="table-edit__head">Sponsor {{ index + 1 }} ownership</span>
                  </div>
                  <div class="table-edit__col table-edit__col--data">
                    <div class="table-edit__data">{{ sponsor.ownership }} %</div>
                  </div>
                </div>

                <div
                  v-if="sponsor.years_experience"
                  class="table-edit__row"
                >
                  <div class="table-edit__col">
                    <span class="table-edit__head">Years of experience?</span>
                  </div>
                  <div class="table-edit__col table-edit__col--data">
                    <div class="table-edit__data">{{ sponsor.years_experience }}</div>
                  </div>
                </div>


                <div
                  v-if="sponsor && sponsor.family_experience && sponsor.family_experience !== ''"
                  class="table-edit__row"
                >
                  <div class="table-edit__col">
                    <span class="table-edit__head">Family experience?</span>
                  </div>
                  <div class="table-edit__col table-edit__col--data">
                    <div
                      v-if="sponsor.family_experience === 'true'"
                      class="table-edit__data"
                    >
                      Yes
                    </div>
                    <div
                      v-else
                      class="table-edit__data"
                    >No</div>
                  </div>
                </div>

                <div
                  v-if="sponsor && sponsor.annual_income"
                  class="table-edit__row"
                >
                  <div class="table-edit__col">
                    <span class="table-edit__head">Sponsor annual income</span>
                  </div>
                  <div class="table-edit__col table-edit__col--data">
                    <div class="table-edit__data">
                      $ {{ formatDollars(sponsor.annual_income) }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="sponsor && sponsor.annual_expenses"
                  class="table-edit__row"
                >
                  <div class="table-edit__col">
                    <span class="table-edit__head">Sponsor annual expenses</span>
                  </div>
                  <div class="table-edit__col table-edit__col--data">
                    <div class="table-edit__data">
                      $ {{ formatDollars(sponsor.annual_expenses) }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="sponsor"
                  class="table-edit__row"
                >
                  <div class="table-edit__col">
                    <span class="table-edit__head">Sponsor assets</span>
                  </div>
                  <div class="table-edit__col table-edit__col--data">
                    <div class="table-edit__data">
                      <div v-if="sponsor.assets_real_estate">
                        Real estate: $ {{ formatDollars(sponsor.assets_real_estate) }}
                      </div>
                      <div v-if="sponsor.assets_companies">
                        Companies/Corporations: ${{
                          formatDollars(sponsor.assets_companies)
                        }}
                      </div>
                      <div v-if="sponsor.assets_other">
                        Other Assets: $ {{ formatDollars(sponsor.assets_other) }}
                      </div>
                      <div v-if="sponsor.assets_liquid">
                        Liquid Assets: $ {{ formatDollars(sponsor.assets_liquid) }}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="sponsor && sponsor.liabilities"
                  class="table-edit__row"
                >
                  <div class="table-edit__col">
                    <span class="table-edit__head">Sponsor liabilities</span>
                  </div>
                  <div class="table-edit__col table-edit__col--data">
                    <div class="table-edit__data">
                      $ {{ formatDollars(sponsor.liabilities) }}
                    </div>
                  </div>
                </div>
              </span>
            </template>
          </template>
        </div>
      </div>
    </div>
    <BlockPopupUnapprovedFinishDeal
      v-if="unapprovedFinishDealPopup"
      @close="unapprovedFinishDealPopup = false"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {
  formatNumber,
  arrayToStringCommaUppercaseFirst,
  changeEnum,
  changeDate,
} from "@/config/util"
import BlockPopupUnapprovedFinishDeal from "@/components/blocks/BlockPopup/BlockPopupUnapprovedFinishDeal.vue"

interface Data {
  title: string;
  change: boolean;
  unapprovedFinishDealPopup: boolean;
  plansOrder;
}

export default Vue.extend({
  components: {
    BlockPopupUnapprovedFinishDeal,
  },
  props: {
    dealID: {
      type: Number,
      default: 0,
    },
    nextAction: {
      type: String,
      default: "",
    },
    prevAction: {
      type: String,
      default: "",
    },
    skipAction: {
      type: String,
      default: "",
    },
  },

  data(): Data {
    return {
      title: 'This is title of "BlockCreateDealFinishDealSummary"!',
      change: false,
      unapprovedFinishDealPopup: false,
      plansOrder: [],
    }
  },

  computed: {
    blockAndLot() {
      return this.$store.getters.getBlockAndLot
    },
    proportyInfo() {
      return this.$store.getters.getProportyInfo
    },
    purchase() {
      return this.$store.getters.getPurchase
    },
    sponsor() {
      return this.$store.getters.getSponsor
    },
    loan_type() {
      return this.$store.getters.getLoanType
    },
    construction() {
      return this.$store.getters.getConstruction
    },
    propertyType() {
      return this.$store.getters.getPropertyType
    },
    sidebarList() {
      return this.$store.getters.getSidebar
    },
    investment() {
      return this.$store.getters.getInvestment
    },
    propertyIncam() {
      return this.$store.getters.getPropertyIncam
    },
    refinance() {
      return this.$store.getters.getRefinance
    },
    expenses() {
      return this.$store.getters.getExpenses
    },
    existing() {
      return this.$store.getters.getExisting
    },
    type_construction() {
      return this.$store.getters.getTypeConstruction
    },
    owner() {
      return this.$store.getters.getOwner
    },
    finishApproved() {
      return this.$store.getters.getFinishApproved
    },
    typeOfLoan() {
      return this.$store.getters.getTypeOfLoans
    },
  },

  async mounted() {
    this.$store.dispatch("ui", { overlay: false })
    await this.$store.dispatch("getDealById", { id: this.$route.params.deal });

    (this.type_construction.plans === 'sell')
				? this.plansOrder = ['sell', 'rent']
				: this.plansOrder = ['rent', 'sell']
  },

  methods: {
    checkSponsorLength() {
      if(this.sponsor.sponsorInfo.length > 1) {
        return true
      }
      return false
    },

    formatPercent(num) {
      const zero = num.toString().slice(-1)
      const zeros = num.toString().slice(-2)
      if (zeros === "00") {
        return num.toString().slice(0, -3)
      } else if (zeros === ".0") {
        return num.toString().slice(0, -2)
      }
      if (zero === "0" || zero === ".") {
        return num.toString().slice(0, -1)
      }
      return num
    },
    checkBlockAndLot(data) {
      if (data) {
        if (data.block === "" && data.lot === "") {
          return false
        } else {
          return true
        }
      }
    },
    async next() {
      if (this.finishApproved) {
        return this.nextAction
      }

      this.unapprovedFinishDealPopup = true
      return false
    },
    skip() {
      return this.skipAction
    },
    prev() {
      return this.prevAction
    },

    /** on change form field set tu true */
    changeform() {
      this.change = true
    },

    formatDollars(field) {
      return formatNumber(field)
    },

    changeSomeEnum(str) {
      return changeEnum(str)
    },

    changeDateData(date) {
      return changeDate(date)
    },

    checkLTC(x, y) {
      const sum = (parseInt(x) / parseInt(y)) * 100
      return sum.toFixed(2) + " %"
    },

    arrayToStringCommaUppercaseFirst: arrayToStringCommaUppercaseFirst,
  },
})
</script>

<style lang="scss" scoped>
.deal-summary__head {
  margin-bottom: 30px;
}

.table-edit {
  background-color: $azure;
  padding: 30px;

  @include mq($sm) {
    padding: 15px;
  }
}

.table-edit__row {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 2px solid $azure;
  background-color: $white;

  &:last-of-type {
    border-bottom: none;
  }

  @include mq($sm) {
    display: block;
  }
}

.projections-wrapper {
  .table-edit__row:last-of-type {
    border-bottom: 2px solid $azure;
  }

  .table-edit__head {
    line-height: 1.5;
  }
}

.border-top {
  border-top: 2px solid $azure;
}

.table-edit__col {
  flex: 0 0 50%;
  max-width: 50%;
  border-right: 2px solid $azure;
  display: flex;
  align-items: center;

  &:last-of-type {
    border-right: none;
  }

  @include mq($sm) {
    flex: 0 0 100%;
    max-width: 100%;
    border-right: none;
  }
}

.table-edit__head {
  color: $shark;
  font-size: 14px;
  text-transform: uppercase;
  line-height: 2.1;
  padding: 10px 20px;
  display: block;
  width: 100%;

  @include mq($sm) {
    background-color: $azure;
    padding: 7px 0;
  }
}

.table-edit__data {
  color: $shark;
  font-size: 14px;
  font-weight: 600;
  line-height: 2.1;
  padding: 10px 7px 10px 20px;
  position: relative;
  width: 100%;
  // transition: $dur $ease;

  // @include hover {
  //     background-color: $ghost-white;
  // }

  @include mq($sm) {
    min-height: 49px;
  }
}

.table-edit__data-list-holder {
  flex-grow: 1;
}

.table-edit__data-list {
  padding: 8px 0;

  &:nth-child(even) {
    background-color: rgba($athens-gray, 0.5);
  }
}

.table-edit__data-list-item {
  color: $shark;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  padding: 6px 20px;
  position: relative;
  width: 100%;
}
</style>
