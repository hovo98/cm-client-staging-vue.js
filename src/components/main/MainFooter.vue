<template>
  <footer
    v-if="(!loggedIn || $route.name === 'Sign Up') && $route.name !== '404'"
    class="site-footer"
  >
    <div class="site-footer__container container-wide">
      <ul
        v-if="menuItems"
        class="site-footer__nav"
      >
        <li
          v-for="item in menuItems"
          :key="item.id"
          class="site-footer__nav-item"
        >
          <router-link
            :to="item.url"
            class="site-footer__nav-link"
          >
            {{ item.label }}
          </router-link>
        </li>
      </ul>

      <div class="site-footer__copy">
        &copy; Finance Lobby {{ new Date().getFullYear() }}
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
    import Vue from 'vue'

    interface Data {
        menuItems,
    }

    export default Vue.extend({
        data(): Data {
            return {
                menuItems: [
                    {
                        url: '/terms-of-service',
                        label: 'Terms of Service',
                    },
					{
						url: '/privacy-policy',
						label: 'Privacy Policy',
                    },
                ],
            }
        },
        // if user logedin show header and footer
        computed: {
            loggedIn() {
                return this.$store.getters.getLoggedIn
            },
        },
    })
</script>

<style lang="scss" scoped>
    .site-footer {
        padding: 30px 0;
        position: relative;
        z-index: 1;

        @include mq($lg) {
            padding: 30px 0 20px;
        }
    }

    .site-footer__container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include mq($lg) {
            flex-direction: column;
            justify-content: center;
            width: 100%;
        }
    }

    .site-footer__nav {
        display: flex;
        align-items: center;

        @include mq($lg) {
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 15px;
        }

        @include mq($sm) {
            flex-direction: column;
        }
    }

    .site-footer__nav-item {
        margin-right: 30px;

        &:last-of-type {
            margin-right: 0;
        }

        @include mq($lg) {
            margin: 0 10px;

            &:last-of-type {
                margin-right: 10px;
            }
        }

        @include mq($sm) {
            margin-bottom: 5px;
        }
    }

    .site-footer__nav-link {
        font-size: 16px;
        color: $mosque;
        font-weight: 400;
        letter-spacing: 0.08px;
        line-height: 1.25;
        border-bottom: 1px solid transparent;
        transition: 0.2s ease-in-out;

        @include hover {
            color: $yellow-orange;
        }

        @include mq($sm) {
            font-size: 15px;
        }
    }

    .site-footer__copy {
        font-size: 16px;
        font-weight: 40;
        line-height: 1.25;
        color: $santas-gray;
        letter-spacing: 0.08px;

        @include mq($lg) {
            border-top: 1px solid rgba($santas-gray, 0.3);
            padding-top: 15px;
            text-align: center;
        }

        @include mq($sm) {
            font-size: 15px;
        }
    }
</style>
