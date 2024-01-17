<template>
  <div class="thank-you-wrapper">
    <div class="thank-you-img">
      <img
        src="@/assets/images/sign-up/thank_you_image.png"
        alt="Thank You image"
      >
    </div>
    <div
      v-if="useRoleBroker"
      class="thank-you-content"
    >
      <h2 class="thank-you-title block-title">One more step to secure the best terms for clients</h2>
      <div class="txt-with-link thank-you-text">Check your inbox for a 1-click verification email.</div>
      <div class="txt-with-link thank-you-text">Verify your account and get to deal-posting.</div>
      <div class="txt-with-link text-with-link--bold">Never miss an important email from us: Add hello@financelobby.com to your trusted list of senders, contacts, or address book.</div>
      <div class="txt-with-link text-with-link--bold">
        Didn't receive a verification email? <router-link
          class="text-with-link--bold-link"
          to="/verify?id="
        >
          Resend
        </router-link>
      </div>
    </div>
    <div
      v-else
      class="thank-you-content"
    >
      <h2 class="thank-you-title block-title">Thanks! <br>We've saved your deal preferences.</h2>
      <div class="txt-with-link thank-you-text">You'll get a verification email shortly.</div>
      <div class="txt-with-link thank-you-text">Once you verify your account, we'll begin searching for the best deals that match <br>your preferences and notify you by email when we've found one.</div>
      <div class="txt-with-link text-with-link--bold">To ensure you never miss an important email from us, please add hello@financelobby.com <br> to your trusted list of senders, contacts, or address book.</div>
      <div class="txt-with-link text-with-link--bold">
        Didn't receive a verification email? <router-link
          class="text-with-link--bold-link"
          to="/verify?id="
        >
          Resend
        </router-link>
      </div>
    </div>
    <!--        TODO add button to lead on Landing Page for Pre-MVP -->
    <!--        <div class="thank-you-btn-holder">-->
    <!--            &lt;!&ndash; TODO replace text in to the View Deals for MVP &ndash;&gt;-->
    <!--            <router-link to="/profile-settings" class="btn thank-you-btn">Profile Settings</router-link>-->
    <!--        </div>-->
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    //TODO remove comment in MVP
    export default Vue.extend({
        props: {
            useRoleBroker: {
                type: Boolean,
            },
        },

        mounted: function() {
            // setTimeout(() => {
            //     this.$router.push('/login');
            // }, 4000);
        },
    })
</script>

<style lang="scss" scoped>
    .thank-you-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        @include mq($lg) {
            // min-height: calc(100vh - 200px);
        }
    }

    .thank-you-img {
        margin-bottom: 47px;
        
        img {
            max-width: 100%;
        }

        @include mq($lg) {
            max-width: 150px;
            margin-bottom: 30px;
        }

        @include mq($sm) {
            max-width: 130px;
        }
    }


    .thank-you-content {
        text-align: center;
        margin-bottom: 35px;
    }

    .thank-you-title {
        margin-bottom: 20px;
    }

    .thank-you-text {
        color: $blue-chill;
        font-size: 22px;
        margin-bottom: 27px;

        @include mq(640px) {
            font-size: 20px;
        }
    }

    .text-with-link--bold {
        font-weight: 600;
    }

    .text-with-link--bold-link {
        color: $blue-chill;
        text-decoration: underline;
        transition: $dur $ease;

        &:hover {
            color: $yellow-orange;
        }
    }

    .thank-you-btn {
        min-width: 238px;
    }
</style>
