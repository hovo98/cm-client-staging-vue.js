<template>
  <div class="cd-form-inner cd-form-inner--full">
    <div class="cd-form-wrap">
      <div class="cd-form-wrap__form">
        <PartLocationForm
          ref="locationForm"
          :proporty-info="proportyInfo"
          @changeform="changeform"
          @shownotice="shownotice"
          @hidenotice="hidenotice"
        />
        <div class="form-highlight">
          <div class="form-split">
            <!-- show this if yes is checked -->
            <h4 class="title-extra-small form-split__title">What’s the block &amp; lot number?</h4>
            <div class="form-split__inner-box">
              <div class="form-split__holder">
                <div class="input-holder form-split__input-holder form-split__input-holder--align-top">
                  <div class="form-split__input-holder-col">
                    <label
                      class="input-label"
                      for="block"
                    >Block</label>
                    <input
                      id="block"
                      v-model="block"
                      type="text"
                      name="block"
                      @change="change = true"
                    >
                  </div>
                  <div class="form-split__input-holder-col">
                    <label
                      class="input-label"
                      for="lot"
                    >Lot</label>
                    <input
                      id="lot"
                      v-model="lot"
                      type="text"
                      name="Lot"
                      @change="change = true"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cd-form-wrap__aside">
        <transition name="fade-in-right">
          <BlockNoteMsg
            v-show="showMessage"
            :data="notice"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import PartLocationForm from '@/components/parts/PartLocationForm.vue'
    import BlockNoteMsg from '@/components/blocks/BlockNoteMsg.vue'

    interface Data {
        title: string
        block: string
        lot: string
        change: boolean
        notice,
        showMessage: boolean,
    }

    export default Vue.extend({

        components: {
            // SvgIcon,
            PartLocationForm,
            BlockNoteMsg,
        },
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
                title: 'CreateDealPropertyInfo',
                block: '',
                lot: '',
                change: false,
                showMessage: false,
                notice: {
                    title: ' ',
                    text: '<p>We won\'t share your deal\'s address with a lender until they\'ve sent you a quote.</p>',
                },
            }
        },

        computed: {
            proportyInfo() {
                return this.$store.getters.getProportyInfo
            },
            blockAndLot() {
                return this.$store.getters.getBlockAndLot
            },
            id() {
                return this.$store.getters.getId
            },
        },

        watch: {
            block: function(newValue) {
                if(newValue) {
                    const result = newValue.replace(/\D/g, "")
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    Vue.nextTick(() => this.block = result)
                }
            },

            lot: function(newValue) {
                if(newValue) {
                    const result = newValue.replace(/\D/g, "")
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    Vue.nextTick(() => this.lot = result)
                }
            },
        },

        async mounted() {
            this.setField()
            await this.$store.dispatch('ui', {overlay: false})
        },
        
        methods: {
            /**
             * @author Nikola Popov
             * @description
             * on form change save change on BE and VUEX
             */
            async next() {
                const obj = this.$refs.locationForm.createObject()
                const valid = await this.$refs.locationForm.formValidation()

                if(obj.city === '') {
                    this.$refs.locationForm.cityErrorVal()
                    return false
                }

                if (!valid) {
                    return
                }

                if(this.change){
                    obj.block = this.block
                    obj.lot = this.lot
                    obj.step = 'propertyInfo'
                    if(this.$route.params.deal) {
                        obj.id = this.$route.params.deal
                    }
                    // send object to VUEX and BE
                    await this.$store.dispatch('setBrokerDealInfo', obj)
                    return this.nextAction
                } else {
                    if(this.proportyInfo) 
                        return this.nextAction
                }
            },
            skip() {
                return this.skipAction
            },
            prev() {
                return this.prevAction
            },
            /** on reload page get from VUEX if exsist */
            setField() {
                if(this.blockAndLot){
                    this.block = this.blockAndLot.block
                    this.lot = this.blockAndLot.lot
                }
            },
            /** on change form field set tu true */
            changeform(){
                this.change = true
            },

            shownotice() {
                this.showMessage = true
            },

            hidenotice() {
                setTimeout(() => {
                    this.showMessage = false
                }, 2000)
            },
        },
    })
</script>

<style lang="scss" scoped>
    .cf-form__sub-title {
        margin-bottom: 15px;
    }

    .cd-form-wrap {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 50px;

        @include mq($lap-small) {
            flex-direction: column-reverse;
        }
    }

    .cd-form-wrap__form {
        // max-width: 630px;
        width: 100%;

        // @include mq($lap-l) {
        //     max-width: 550px;
        // }
    }

    .cd-form-wrap__aside {
        flex: 1;
        max-width: 390px;
        margin: 0 auto;
        padding: 0 0 0 15px;

        

        @include mq($lap-small) {
           width: 100%;
           margin: 0 0 20px 0;
           padding-left: 0;
           max-width: 550px;
        }

        // @include mq($lap-l) {
        //     margin: 0 0 20px;
        // }

        @include mq($lap-xs) {
            max-width: 100%;
            margin: 0 0 20px;
        }


        @include mq($lg) {
            display: none;
        }
    }
</style>
