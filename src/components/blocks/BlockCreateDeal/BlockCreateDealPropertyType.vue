<template>
  <div class="cd-form-inner cd-form-inner--full">
    <h4 class="title-extra-small cf-form__sub-title">Choose property type</h4>
    <div class="error-message-holder error-message-holder--block">   
      <div class="rdb-box-items input-holder-wrap">
        <div class="rdb-box-item">
          <label class="rdb-box rdb-box-with-img rdb-box--without-circle">
            <img
              src="@/assets/images/checkbox_icons/investment.png"
              alt="Investment"
            >
            <input
              v-model="propertyType"
              type="radio"
              name="property-type"
              value="INVESTMENT"
              @change="change = true; validationError = false"
            >
            <span class="rdb-box-text">Investment</span>
            <span class="rdb-box-hv" />
          </label>
        </div>
        <div class="rdb-box-item">
          <label class="rdb-box rdb-box-with-img rdb-box--without-circle">
            <img
              src="@/assets/images/checkbox_icons/owner-occupied.png"
              alt="owner-occupied"
            >
            <input
              v-model="propertyType"
              type="radio"
              name="property-type"
              value="OWNER_OCCUPIED"
              @change="change = true; validationError = false"
            >
            <span class="rdb-box-text">Owner Occupied</span>
            <span class="rdb-box-hv" />
          </label>
        </div>
        <div class="rdb-box-item">
          <label class="rdb-box rdb-box-with-img rdb-box--without-circle">
            <img
              src="@/assets/images/checkbox_icons/construction.png"
              alt="Construction"
            >
            <input
              v-model="propertyType"
              type="radio"
              name="property-type"
              value="CONSTRUCTION"
              @change="change = true; validationError = false"
            >
            <span class="rdb-box-text">Construction</span>
            <span class="rdb-box-hv" />
          </label>
        </div>
      </div>
      <span
        v-show="validationError"
        class="error-message"
      >You must select a property type</span>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    interface Data {
        title: string
        change: boolean
        propertyType: string
        validationError: boolean
    }

    export default Vue.extend({
        props: {
            dealID: {
                type: Number,
                default: 0,
            },
            nextAction: {
                type: String,
                default: '',
            },
            prevAction: {
                type: String,
                default: '',
            },
            skipAction: {
                type: String,
                default: '',
            },
        },

        data(): Data {
            return {
                title: 'This is title of "BlockCreateDealPropertyType"!',
                change: false,
                propertyType: '',
                validationError: false,
            }
        },

        computed: {
            property_type() {
                return this.$store.getters.getPropertyType
            },
            id() {
                return this.$store.getters.getId
            },
        },

        mounted() {
            this.setField()
            this.$store.dispatch('ui', {overlay: false})
        },

        methods: {
            async next() {
                if(this.change){
                    const obj = this.createObject()
                    await this.$store.dispatch('setBrokerDealPropertyType', obj)
                    await this.$store.dispatch('getDealById', {id:this.$route.params.deal})
                    return this.whatToReturn()
                } else {
                    if(this.property_type) {
                        return this.whatToReturn()
                    } else {
                        this.validationError = true
                    }                        
                }
            },
            whatToReturn(){
                switch (this.propertyType) {
                    case 'INVESTMENT':
                        return 'dealPropertyTypeInvestment'
                    case 'OWNER_OCCUPIED':
                        return 'dealPropertyTypeOwnerOccupied'
                    case 'CONSTRUCTION':
                        return 'dealPropertyTypeConstruction'
                    default:
                        break
                }
            },
            skip() {
                return this.skipAction
            },
            prev() {
                return this.prevAction
            },
            createObject() {
                return {
                    property_type: this.propertyType,
                    step: 'dealPropertyType',
                }
            },

            /** on reload page get from VUEX if exsist */
            setField() {
                this.propertyType = this.property_type
            },

            /** on change form field set tu true */
            changeform(){
                this.change = true
            },
        },
    })
</script>

<style lang="scss" scoped>
    .cf-form__sub-title {
        margin-bottom: 13px;
    }
</style>
