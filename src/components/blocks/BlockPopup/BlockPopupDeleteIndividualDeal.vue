<template>
  <div class="popup__wrap">
    <div class="popup">
      <a
        class="popup__close"
        href="javascript:;"
        @click="cancelForm()"
      />
      <div class="entry-content">
        <p>Are you sure you want to delete this deal?</p>
        <p>Once it’s deleted, it’s gone forever.</p>
      </div>
      <div class="popup__btn-wrap">
        <div class="submit-btn-holder popup__btn-holder popup__btn">
          <a
            class="btn popup__btn"
            href="javascript:;"
            @click="confirmDelete()"
          >Delete</a>
          <img
            v-if="showLoader"
            src="@/assets/images/loader.gif"
            alt="loader"
            class="submit-btn-loader submit-btn-loader--inline"
          >
        </div>
        <a
          class="btn btn--alt popup__btn"
          href="javascript:;"
          @click="cancelForm()"
        >Cancel</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import ClickOutside from 'vue-click-outside'

    interface Data {
        emails,
        showLoader: boolean
    }

    export default Vue.extend({

        components: {
            // SvgIcon
        },

        directives: {
            ClickOutside,
        },
        props: {
            sendLoaderState: {
                type: String,
            },  
        },

        data(): Data {
            return {
                emails: [''],
                showLoader: false,
            }
        },

        methods: {
            cancelForm() {
                this.showLoader = false
                this.$emit('closePopupDelete')
            },
            confirmDelete() {
                if(!this.showLoader) {
                    this.showLoader = true
                    this.$emit('confirmDeleteDeal')
                }
            },
        },
    })
</script>

<style lang="scss" scoped>
</style>