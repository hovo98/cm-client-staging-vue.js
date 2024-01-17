<template>
  <div class="choose-quote">
    <div class="choose-quote__icon">
      <img
        :src="quoteIcon"
        alt=""
      >
    </div>
    <span class="choose-quote__message">{{ message }}</span>
    <router-link
      class="btn"
      to="/"
    >
      Back to Homepage
    </router-link>
    <div
      v-if="loader"
      class="submit-btn-loader-wrapper"
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
                quoteIcon: getImagesAsset('accepted/broker-success.png'),
                message: '',
                loader: false,
            }
        },
        async mounted() {
            if(this.$route.params.token) {
                this.loader = true
                const res = await this.$store.dispatch('chooseQuote', this.$route.params.token)
                this.message = res.data.data.chooseQuote.message
                this.loader = false
            } else {
                this.$router.push({path: '/login'})
            }
        },

	})
</script>

<style lang="scss" scoped>
    .choose-quote {
        padding-top: 74px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100%;
    }

    .choose-quote__icon {
        width: 140px;
        margin-bottom: 30px;
    }

    .choose-quote__message {
        font-size: 26px;
        font-weight: 600;
        margin-bottom: 20px;
        text-align: center;
        max-width: 480px;
        a {
            color: $yellow-orange;
            text-decoration: underline;
            transition: $dur;

            &:hover {
                color: $blue-chill;
            }
        }
    }

    .submit-btn-loader-wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: $white;
        display: flex;
        align-items: center;
        justify-content: center;

        .submit-btn-loader {
            width: 75px;
            position: static;
            transform: translate(0, 0);
        }
    }

    .btn {
        margin-top: 10px;
    }
</style>