<template>
  <div class="upload-image-wrap">
    <div class="upload-image-holder">
      <div
        class="upload-image__img"
        :style="{backgroundImage: 'url(' + (image ? image : placeholderImage) + ')'}"
      />
      <div class="upload-image__options-wrap">
        <a
          href="javascript:;"
          class="svg-icon upload-image__icon-holder"
          @click="active = !active"
        ><SvgIcon
          class="upload-image__icon"
          icon-name="ico-camera"
        /></a>
        <div
          v-click-outside="hide"
          :class="['upload-image__options', active ? 'opened' : null]"
        >
          <a
            href="javascript:;"
            class="upload-image__option upload-image__option--upload"
          >
            <input
              ref="userImageUpload"
              type="file"
              name="user-image"
              class="upload-image__option-upload-file"
              accept="image/*"
              @change="onFileChange"
            />
            <label>Upload New Image</label></a>
          <a
            v-if="image !== ''"
            href="javascript:;"
            class="upload-image__option"
            @click="removeFile"
          >Remove Image</a>
        </div>
      </div>
    </div>
    <div class="upload-image__info">
      <h4
        v-if="data.first_name"
        class="upload-image__info-title"
      >
        {{ data.first_name }} {{ data.last_name }}
      </h4>
      <div
        v-if="data.position"
        class="upload-image__info-txt"
      >
        {{ data.position }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SvgIcon from '@/components/base/SvgIcon/SvgIcon.vue'
    import {getImagesAsset} from '@/config/util'
    import ClickOutside from 'vue-click-outside'

    interface Data {
        placeholderImage: string
        active: boolean
    } 

    export default Vue.extend({

        components: {
            SvgIcon,
        },

        directives: {
            ClickOutside,
        },
        props: {
            data: {
                required: true,
            },
        },

        data(): Data {
            return {
                placeholderImage: getImagesAsset('placeholders/user_placeholder.png'),
                active: false,
            }
        },

        computed: {
            image() {
                return this.$store.getters.getProfileImage
            },
		},

        methods: {
            dataURLToBlob(dataURL) {
                const BASE64_MARKER = ';base64,'
                if (dataURL.indexOf(BASE64_MARKER) == -1) {
                    let parts = dataURL.split(',')
                    let contentType = parts[0].split(':')[1]
                    let raw = parts[1]

                    return new Blob([raw], {type: contentType})
                }

                const parts = dataURL.split(BASE64_MARKER)
                const contentType = parts[0].split(':')[1]
                const raw = window.atob(parts[1])
                const rawLength = raw.length

                const uInt8Array = new Uint8Array(rawLength)

                for (let i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i)
                }

                return new Blob([uInt8Array], {type: contentType})
            },

            onFileChange(e) {
                // Read in file
                const file = e.target.files[0]

                // Ensure it's an image
                if(file.type.match(/image.*/)) {
                    // Load the image
                    const reader = new FileReader()
                    reader.onload = (readerEvent) => {
                        const image = new Image()
                        image.onload = () => {
                            // Resize the image
                            const canvas = document.createElement('canvas')
                            const max_size = 200 // TODO : pull max size from a site config
                            let width = image.width
                            let height = image.height
                            if (width > height) {
                                if (width > max_size) {
                                    height *= max_size / width
                                    width = max_size
                                }
                            } else {
                                if (height > max_size) {
                                    width *= max_size / height
                                    height = max_size
                                }
                            }
                            canvas.width = width
                            canvas.height = height
                            canvas.getContext('2d').drawImage(image, 0, 0, width, height)
                            const dataUrl = canvas.toDataURL('image/jpeg')
                            const resizedImage = this.dataURLToBlob(dataUrl)
                            this.$store.dispatch('updateProfileImage', resizedImage)
                        }
                        image.src = readerEvent.target.result as string
                    }
                    reader.readAsDataURL(file)
                }

                // const file = e.target.files[0];
                // let size = file.size / 1024;
                // if (size > 2000) {
                //     new GlobalNot('Image is too big. Maximum 2 MB images are allowed.', 'error');

                //     return;
                // }

                // this.$store.dispatch('updateProfileImage', file);
                // document.querySelector('.upload-image-holder').classList.add('show-preloader');
            },
            removeFile() {
                this.$refs.userImageUpload.value = ''
                this.$store.dispatch('deleteProfileImage')
            },
            hide() {
                this.active = false
            },
        },
    })
</script>

<style lang="scss" scoped>
    .upload-image-wrap {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }

    .upload-image-holder {
        width: 100%;
        max-width: 150px;
        margin: 0 auto;
        position: relative;
        margin-bottom: 30px;

        @include mq($lap-l) {
            max-width: 120px;
            margin-bottom: 20px;
        }
    }

    .upload-image__img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        border: 1px solid $aqua-haze;

        @include mq($lap-l) {
            width: 120px;
            height: 120px;
        }
    }

    .upload-image__icon-holder {
        color: $white;
        width: 32px;
        height: 32px;
        border-radius: 50px;
        border: 2px solid $white;
        background-color: $yellow-orange;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .upload-image__options-wrap {
        position: absolute;
        right: 9px;
        bottom: 8px;
        width: 32px;
        height: 32px;

        @include hover {
            .upload-image__options {
                visibility: visible;
                opacity: 1;
                transform: translateX(100%);
            }
        }
    }

    .upload-image__options {
        position: absolute;
        background-color: $white;
        bottom: 23px;
        transform: translateX(calc(100% + 25px));
        padding: 27px 22px;
        box-shadow: 0 2px 20px rgba($black, 0.05);
        min-width: 290px;
        opacity: 0;
        visibility: hidden;
        transition: $dur $ease;
        border-radius: 4px;
        box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.1);
        z-index: 2;

        @include mq($lg + 1, min) {
            right: 11px;
        }

        @include mq($lg) {
            padding: 17px 20px;
            min-width: 220px;
            left: -50%;
            bottom: 0;
            transform: translate(-50%, calc(100% + 25px));
            
            &.opened {
                visibility: visible;
                opacity: 1;
                transform: translate(-50%, 115%);
            }
        }
    }

    .upload-image__option {
        font-size: 16px;
        color: $shark;
        font-weight: 400;
        letter-spacing: 0.08px;
        line-height: 1.2;
        margin-bottom: 20px;
        display: inline-block;
        transition: $dur $ease;
        position: relative;

        &:last-of-type {
            margin-bottom: 0;
        }

        @include hover {
            color: $yellow-orange;
        }

        @include mq($lg) {
            text-align: center;
            margin-bottom: 10px;
        }
    }

    .upload-image__info-title {
        font-size: 20px;
        line-height: 1.3;
        color: $shark;
        font-weight: 700;
        letter-spacing: 0.1px;
        margin-bottom: 4px;
        text-align: center;

        @include mq($lap-l) {
            font-size: 18px;
        }
    }

    .upload-image__info-txt {
        font-size: 16px;
        color: $santas-gray;
        font-weight: 400;
        letter-spacing: 0.08px;
        line-height: 1.35;
        text-align: center;

        @include mq($lap-l) {
            font-size: 15px;
        }
    }

    .upload-image__option-upload-file {
        position: absolute;
        height: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        z-index: 10;
        font-size: 0;
        cursor: pointer !important;
        & + label {
            position: relative;
            cursor: pointer;
        }
    }
</style>
