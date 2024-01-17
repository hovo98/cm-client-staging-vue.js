<template>
  <div class="pills__wrap">
    <ul class="pills__list">
      <template v-for="(pill, index) in pills">
        <li
          :key="index"
          class="pills__list-item input-holder"
        >
          <label
            :for="`btn-pill${index}`"
            class="radio-btn--pill"
          >
            <input
              :id="`btn-pill${index}`"
              v-model="value"
              type="radio"
              name="option"
            >
            <span
              class="radio-btn-text"
              v-html="pill.text"
            />
          </label>
          <a
            class="pills__list-item-btn"
            href="javascript:;"
          >Change</a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    interface Data {
        pills
        value: string
    }

    export default Vue.extend({

        components: {
        },

        data(): Data {
            return {
                pills: [
                    {
                        text: 'View Only Perfect Fit Deals',
                    },
                    {
                        text: 'View Only Close Fit Deals',
                    },
                ],
                value: '',
            }
        },
    })
</script>

<style lang="scss" scoped>
    .pills__wrap {
        margin-left: 86px;
        padding-top: 2px;
        padding-right: 10px;

        @include mq($lap-l) {
            margin-left: 40px;
        }

        @include mq($lg) {
            padding-top: 0;
            padding-right: 0;
        }

        @include mq($md) {
            margin-left: 0;
        }

        @include mq($sm) {
            max-width: 100%;
            width: 100%;
        }
    }

    .pills__list {
        display: flex;

        @include mq($sm) {
            max-width: 100%;
            width: 100%;
            justify-content: space-between;
        }

        @include mq(450px) {
            // flex-direction: column;
            flex-wrap: wrap;
        }
    }

    .pills__list-item {
        margin-right: 50px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        @include mq($lap-small) {
            margin-right: 20px;
        }

        @include mq($sm) {
            margin-right: 0;
            padding-right: 5px;
        }

        &:last-of-type {
            margin-right: 0;
        }
    }

    .radio-btn-text {
        font-family: $font-main;
        font-size: 14px;
        color: $shark;
        font-weight: 600;
        left: .07px;
        padding-left: 39px;
    }

    .pills__list-item-btn {
        font-family: $font-main;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: .07px;
        color: $mosque;
        position: relative;
        transition: $dur $ease;
        cursor: pointer;
        margin-left: 39px;
        margin-top: 9px;

        &:hover {
            color: $yellow-orange;
            transition: $dur $ease;

            &::after {
                background-color: $yellow-orange;
                transition: $dur $ease;
            }
        }

        &::after {
            content: '';
            position: absolute;
            bottom: 4px;
            left: 0;
            display: inline-block;
            background-color: $mosque;
            height: 1px;
            width: 100%;
            transition: $dur $ease;
        }
    }
</style>
