<template>
  <div class="popup__wrap">
    <div class="popup">
      <a
        class="popup__close"
        href="javascript:;"
      />
      <h3 class="title-extra-small popup__title">Choose how to save filters</h3>
      <ul class="popup__option-list">
        <template v-for="(item, index) in items">
          <li
            :key="index"
            class="popup__option-list-item input-holder"
          >
            <label
              :for="`btn-${index}`"
              class="radio-btn"
            >
              <input
                :id="`btn-${index}`"
                type="radio"
                name="option"
              >
              <span
                class="radio-btn-text"
                v-html="item.option"
              />
            </label>
          </li>
        </template>
      </ul>
      <div class="popup__btn-wrap">
        <a
          class="btn popup__btn"
          href="javascript:;"
        >Submit</a>
        <a
          class="btn btn--alt popup__btn"
          href="javascript:;"
        >Cancel</a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        option: 'Change my account preferences to the selected filters',
                    },
                    {
                        option: 'Save filters as a search (You can access them under the Filters dropdown)',
                    },
                ],
            }
        },
    }
</script>

<style lang="scss" scoped>
    .popup__title {
        margin-bottom: 30px;

        @include mq($sm) {
            margin-bottom: 20px;
        }
    }

    .popup__option-list {
        margin-bottom: 50px;

        @include mq($sm) {
            margin-bottom: 20px;
        }
    }

    .input-holder {
        margin-bottom: 14px;
    }
</style>