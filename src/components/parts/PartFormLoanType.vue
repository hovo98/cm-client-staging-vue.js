<template>
  <div>
    <!-- <h2 class="title-extra-small loan-type-title">What type of lender do you want this deal to go? Select all that apply</h2> -->
    <div class="loan-type-wrapper">
      <div class="loan-type__checkbox">
        <label>
          <input
            v-model="type_of_loans"
            class="loan-type__hidden-input"
            type="checkbox"
            value="1"
            @change="isCheck()"
          >
          <span class="loan-type__title">Hard Money/Bridge</span>
        </label>
      </div>
      <div
        v-if="hideCNBS"
        class="loan-type__checkbox"
      >
        <label>
          <input
            v-model="type_of_loans"
            class="loan-type__hidden-input"
            type="checkbox"
            value="3"
            @change="isCheck()"
          >
          <span class="loan-type__title">CMBS</span>
        </label>
      </div>
      <div class="loan-type__checkbox">
        <label>
          <input
            v-model="type_of_loans"
            class="loan-type__hidden-input"
            type="checkbox"
            value="2"
            @change="isCheck()"
          >
          <span class="loan-type__title">Agency</span>
        </label>
      </div>
      <div class="loan-type__checkbox">
        <label>
          <input
            v-model="type_of_loans"
            class="loan-type__hidden-input"
            type="checkbox"
            value="4"
            @change="isCheck()"
          >
          <span class="loan-type__title">Balance Sheet</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: {
            typeOfLoanCheck: {
                type: Function,
            },
        },

        data() {
            return {
                type_of_loans: [],
                hideCNBS: true,
            }
        },

        watch: {
            // type_of_loans() {
            //     this.isCheck();
            // }
        },

        methods: {
            isCheck() {
                this.$emit('typeOfLoanCheck')
            },
            getTypeOfLoans() {
                if (this.type_of_loans.length === 0)
                    return false
                
                return this.type_of_loans.map(ele => {
                    return parseInt(ele)
                })
            },
            setTypeOfLoans(arr) {
                this.type_of_loans = arr
            },
            showCNBS(flag) {
                this.hideCNBS = flag
            },
        },
    })
</script>

<style lang="scss" scoped>

    .loan-type-title {  
        margin-top: 40px;
        margin-bottom: 20px;
    }

    .loan-type-wrapper {
        display: flex;
        flex-wrap: wrap;
        max-width: 630px;
        width: 100%;
        justify-content: space-between;
    }

    .loan-type__checkbox {
        max-width: 305px;
        width: 100%;
        margin-bottom: 20px;

        &:nth-child(odd) {
            margin-right: 5px;
        }

        @include mq(656px) {
            max-width: 100%;
            &:nth-child(odd) {
                margin-right: 0;
            }
        }
        
        input {
            display: none;
        }

        label {
            width: 100%;
            height: 100%;
            display: block;
            
        }
    }

    .loan-type__title {
        border: 1px solid $athens-gray;
        background-color: $athens-gray;
        max-width: 305px;
        width: 100%;
        height: 100%;
        cursor: pointer;
        transition: $dur $ease;
        padding: 15px 45px;
        position: relative;
        display: flex;
        align-items: center;

        @include mq(656px) {
            max-width: 100%;
        }

        &:hover {
            border: 1px solid $blue-chill;
        }

        &::before {
            content: '';
            display: block;
            width: 15px;
            height: 15px;
            border: 1px solid $santas-gray;
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
        }

        &::after {
            content: '';
            display: inline-block;
            transform: rotate(45deg);
            height: 10px;
            width: 5px;
            border-bottom: 2px solid $blue-chill;
            border-right: 2px solid $blue-chill;
            position: absolute;
            left: 25px;
            top: 22px;
            display: none;
        }
    }

    .loan-type__hidden-input:checked + .loan-type__title {
        border: 1px solid $blue-chill;
        background-color: rgba($blue-chill, 0.1);
        &::after {
            display: inline-block;
        }

        &::before {
            border: 1px solid $blue-chill;
        }
    }
</style>
