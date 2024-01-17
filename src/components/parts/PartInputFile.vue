<template>
  <div class="input-upload error-message-holder">
    <div class="input-upload__container">
      <input
        :id="id"
        ref="file"
        class="input-upload__file"
        type="file"
        @change="previewFile($event)"
      >
      <label
        tabindex="0"
        :for="id"
        class="input-upload__trigger"
      ><SvgIcon
        v-if="icon"
        class="input-upload__icon"
        :icon-name="icon"
      />{{ label }}</label>
    </div>
    <p class="input-upload__return">{{ fileName }}</p>
    <span
      v-if="errorUpload"
      class="error-message"
    >Uploaded file must have column labeled 'email'</span>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from "@/components/base/SvgIcon/SvgIcon.vue"
    import Papa from 'papaparse'

    interface Data {
        title: string
        fileName: string
        errorUpload: boolean
    }

    export default Vue.extend({

        components: {
            SvgIcon,
        },
        props: {
            label: {
                type: String,
                default: 'Select a file',
            },
            icon: String,
            id: String,
        },

        data(): Data {
            return {
                title: 'This is title of "PartInputFile"!',
                fileName: '',
                errorUpload: false,
            }
        },

        methods: {
            previewFile(event) {
                let count = 0
                let flag = false
                let rowNum = undefined
                const arr = []
                let csvHeader = true
                // eslint-disable-next-line
                const self = this;
                this.filename = event.target.files[0].name
                Papa.parse(event.target.files[0], {
                    step: function(row) {
                        if(count === 0) {
                            row.data.forEach((element, index) => {
                                if(element === 'Email') {
                                    flag = true
                                    rowNum = index
                                }
                            })
                            count++
                        } else {
                            if(flag) {
                                const email = row.data[rowNum]
                                // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                // const flag = re.test(String(email).toLowerCase())
                                arr.push(email)
                            } else {
                                csvHeader = false
                            }
                        }
                    },
                    complete: function() {
                        if(!csvHeader) {
                            self.errorUpload = true
                        } else {
                            self.errorUpload = false
                            self.$emit('addToEmails', arr)
                        }
                    },
                })
                event.target.value = ''
            },
        },
    })
</script>

<style lang="scss" scoped>
    .input-upload__container {
        position: relative;

        @include mq(1024px) {
            max-width: 225px;
            margin: 0 auto;
        }

        @include mq($sm) {
           margin-bottom: 20px;
        }
    }

    .input-upload {
        position: relative;
    }

    .input-upload__trigger {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 15px;
        background: $azure;
        color: $mosque;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.08px;
        transition: $dur $ease;
        cursor: pointer;
        border-radius: 6px;

        @include mq($lap-small) {
           font-size: 14px;
        }
    }

    .input-upload__icon {
        font-size: 20px;
        margin-right: 14px;
    }

    .input-upload__file {
        display: none;
    }

    .input-upload__file:hover + .input-upload__trigger,
    .input-upload__file:focus + .input-upload__trigger,
    .input-upload__trigger:hover,
    .input-upload__trigger:focus {
        color: $azure;
        background-color: $mosque;
        outline: none;
    }

    .input-upload__return {
        font-size: 14px;
        line-height: 1.7;
        font-style: italic;
    }
</style>
