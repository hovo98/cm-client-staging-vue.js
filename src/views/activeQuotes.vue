<template>
  <div class="active-quote">
    <div class="active-quote__icon">
      <img
        :src="quoteIcon"
        alt=""
      >
    </div>
    <div class="active-quote__content">
      <h4 v-if="message === 'The Quote is active and accepted.'">Thanks for confirming!</h4>
      <h4 v-if="message === 'Your quote is no longer available.'">Thanks for letting us know</h4>
      <span
        v-if="message === 'The Quote is active and accepted.'"
        class="active-quote__message"
      >We’ve notified the broker, and you’ll receive an email shortly with their contact information so you two can bring the deal to the finish line.</span>
      <span
        v-if="message === 'Your quote is no longer available.'"
        class="active-quote__message"
      >We’ll notify the broker on your behalf.</span><br>
      <span
        v-if="message === 'Your quote is no longer available.'"
        class="active-quote__message"
      ><router-link to="/">View your open perfect-fit deals</router-link></span>
      <router-link
        v-if="message === 'The Quote is active and accepted.'"
        class="btn"
        to="/"
      >
        Go to Deals
      </router-link>
    </div>
    <div
      v-if="loader"
      class="active-quote__loader-wrapper"
    >
      <img
        src="@/assets/images/loader.gif"
        alt="loader"
        class="submit-btn-loader"
      >
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {getImagesAsset} from '@/config/util'
	export default Vue.extend({

        data() {
            return {
                quoteIcon: getImagesAsset('accepted/accepted.png'),
                message: '',
                loader: false,
            }
        },

        async mounted() {
            if(this.$route.params.token) {
                this.loader = true
                const res = await this.$store.dispatch('activeQuote', this.$route.params.token)
                this.message = res.data.data.activeQuote.message
                this.loader = false
            } else {
                this.$router.push({path: '/login'})
            }
        },

	})
</script>

<style lang="scss" scoped>
    .active-quote {
        padding-top: 74px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100%;
    }

    .active-quote__content {
        text-align: center;
        max-width: 690px;
        h4 {
            font-size: 20px;
            font-weight: 600;
        }
    }

    .active-quote__icon {
        width: 140px;
        margin-bottom: 30px;
    }

    .active-quote__message {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 20px;

        a {
            color: $yellow-orange;
            text-decoration: underline;
            transition: $dur;

            &:hover {
                color: $blue-chill;
            }
        }
    }

    .active-quote__loader-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: $white;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .submit-btn-loader {
            position: static;
            transform: translate(-0, 0);
            width: 60px;
        }
    }

    .btn {
        margin-top: 40px;
    }
</style>